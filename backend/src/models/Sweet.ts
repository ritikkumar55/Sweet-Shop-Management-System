import { Schema, model, Document } from 'mongoose';

export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

const sweetSchema = new Schema<ISweet>({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 0 },
  description: { type: String }
}, { timestamps: true });

export const Sweet = model<ISweet>('Sweet', sweetSchema);
