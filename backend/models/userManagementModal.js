// users.model.js
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const usersSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  employerNumber: { type: String, required: true, unique: true, trim: true },
  nationalId: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['client', 'deptmanager', 'hr', 'itmanagement'], 
    required: true 
  },
  department: { 
    type: String, 
    enum: ['finance', 'operations', 'sales', 'itdepartment', 'retailshops', 'nec'], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });

export default model('users', usersSchema);
