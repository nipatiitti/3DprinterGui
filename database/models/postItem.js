import mongoose from 'mongoose';

// Add Schema
export const itemSchema = mongoose.Schema({
  title:  String,
  author: String,
  body:   String,
  tags: Array,
  createdAt: Number
})
