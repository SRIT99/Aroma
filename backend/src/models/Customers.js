const mongoose = require("mongoose");
const User = require("./User");

const customerSchema = new mongoose.Schema(
  {
    // Extended fields for customers
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    loyaltyTier: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum"],
      default: "Bronze",
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    addresses: [
      {
        type: {
          type: String,
          enum: ["home", "work", "other"],
          default: "home",
        },
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        area: {
          type: String,
          required: true,
        },
        landmark: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
    ],
    preferences: {
      dietaryRestrictions: [
        {
          type: String,
          enum: ["vegetarian", "vegan", "gluten-free", "dairy-free", "halal"],
        },
      ],
      favoriteItems: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
      ],
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: false,
        },
      },
    },
    // Referral system
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    referrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Update loyalty tier based on points
customerSchema.methods.updateLoyaltyTier = function () {
  const points = this.loyaltyPoints;
  if (points >= 1000) this.loyaltyTier = "Platinum";
  else if (points >= 500) this.loyaltyTier = "Gold";
  else if (points >= 200) this.loyaltyTier = "Silver";
  else this.loyaltyTier = "Bronze";
  return this.loyaltyTier;
};

// Add points from order
customerSchema.methods.addLoyaltyPoints = async function (orderTotal) {
  // 1 point per Rs. 50 spent
  const pointsToAdd = Math.floor(orderTotal / 50);
  this.loyaltyPoints += pointsToAdd;
  this.totalOrders += 1;
  this.totalSpent += orderTotal;
  this.updateLoyaltyTier();
  return await this.save();
};

// Generate referral code
customerSchema.methods.generateReferralCode = function () {
  const prefix = "AROMA";
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  this.referralCode = `${prefix}${random}`;
  return this.referralCode;
};

module.exports = User.discriminator("customer", customerSchema);
