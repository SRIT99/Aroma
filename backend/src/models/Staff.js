const mongoose = require("mongoose");
const User = require("./User");

const staffSchema = new mongoose.Schema(
  {
    // Extended fields for staff
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      enum: ["kitchen", "waiter", "delivery", "manager", "cashier"],
      required: true,
    },
    department: {
      type: String,
      enum: ["kitchen", "front_of_house", "delivery", "management", "admin"],
      required: true,
    },
    hireDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    salary: {
      type: Number,
      min: 0,
    },
    shift: {
      type: String,
      enum: ["morning", "evening", "night", "flexible"],
      default: "flexible",
    },
    workSchedule: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String },
    },
    // Permissions specific to staff
    permissions: {
      canProcessOrders: {
        type: Boolean,
        default: false,
      },
      canViewOrders: {
        type: Boolean,
        default: true,
      },
      canUpdateOrderStatus: {
        type: Boolean,
        default: false,
      },
      canAccessReports: {
        type: Boolean,
        default: false,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    notes: String,
  },
  {
    timestamps: true,
  },
);

// Generate employee ID
staffSchema.methods.generateEmployeeId = function () {
  const prefix = "EMP";
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  this.employeeId = `${prefix}${year}${random}`;
  return this.employeeId;
};

module.exports = User.discriminator("staff", staffSchema);
