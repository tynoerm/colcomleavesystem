import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const leaveApplicationSchema = new Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    jobTitle: { type: String, required: true },
    department: { type: String, required: true },
    leaveType: {
      type: String,
      enum: ['Annual', 'Sick', 'Maternity', 'Paternity', 'Unpaid'],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    hodApproval: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    hrApproval: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
    collection: 'leaveApplications',
  }
);

export default model('leaveApplications', leaveApplicationSchema);
