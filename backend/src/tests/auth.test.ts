import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Auth', () => {
  it('registers and logs in', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 't@example.com', password: 'password' });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 't@example.com', password: 'password' });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
