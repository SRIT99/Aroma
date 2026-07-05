const mongoose = require("mongoose");
const User = require("./User");

const adminSchema = new mongoose.Schema(
  {
    // Extended fields for admin
    adminLevel: {
      type: String,
      enum: ["super_admin", "admin"],
      default: "admin",
    },
    permissions: {
      manageUsers: {
        type: Boolean,
        default: true,
      },
      manageStaff: {
        type: Boolean,
        default: true,
      },
      manageMenu: {
        type: Boolean,
        default: true,
      },
      manageOrders: {
        type: Boolean,
        default: true,
      },
      manageContent: {
        type: Boolean,
        default: true,
      },
      viewAnalytics: {
        type: Boolean,
        default: true,
      },
      manageSettings: {
        type: Boolean,
        default: false, // Only super admin can manage settings
      },
    },
    accessToken: {
      type: String,
      select: false, // Not returned in queries
    },
    refreshToken: {
      type: String,
      select: false,
    },
    lastActive: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Export as discriminator of User
module.exports = User.discriminator("admin", adminSchema);
