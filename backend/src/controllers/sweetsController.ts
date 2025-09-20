import { Request, Response } from 'express';
import { Sweet } from '../models/Sweet';

export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity, description } = req.body;
    const exists = await Sweet.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Sweet with this name already exists' });
    const sweet = await Sweet.create({ name, category, price, quantity, description });
    res.status(201).json(sweet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const listSweets = async (req: Request, res: Response) => {
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  res.json(sweets);
};

export const searchSweets = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query as any;
  const q: any = {};
  if (name) q.name = { $regex: new RegExp(name, 'i') };
  if (category) q.category = { $regex: new RegExp(category, 'i') };
  if (minPrice || maxPrice) {
    q.price = {};
    if (minPrice) q.price.$gte = Number(minPrice);
    if (maxPrice) q.price.$lte = Number(maxPrice);
  }
  const results = await Sweet.find(q);
  res.json(results);
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const removed = await Sweet.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findOneAndUpdate(
      { _id: req.params.id, quantity: { $gt: 0 } },
      { $inc: { quantity: -1 } },
      { new: true }
    );
    if (!sweet) return res.status(400).json({ message: 'Out of stock or not found' });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, { $inc: { quantity: Number(amount) } }, { new: true });
    if (!sweet) return res.status(404).json({ message: 'Not found' });
    res.json(sweet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
