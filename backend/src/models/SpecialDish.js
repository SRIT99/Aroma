const mongoose = require("mongoose");

const specialDishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isTodaySpecial: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["starter", "main", "dessert", "beverage"],
      default: "main",
    },
    cuisine: {
      type: String,
      enum: ["nepali", "indian", "chinese", "continental", "fusion"],
      default: "nepali",
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    isSpicy: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    preparationTime: {
      type: Number,
      default: 20, // minutes
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  {
    timestamps: true,
  },
);

// Ensure only 3 dishes can be today's special at a time
specialDishSchema.pre("save", async function (next) {
  if (this.isTodaySpecial && this.isActive) {
    const count = await this.constructor.countDocuments({
      isTodaySpecial: true,
      isActive: true,
      _id: { $ne: this._id },
    });
    if (count >= 3) {
      throw new Error("Only 3 dishes can be marked as today's special");
    }
  }
  next();
});

// Index for faster queries
specialDishSchema.index({ isTodaySpecial: 1, isActive: 1 });
specialDishSchema.index({ category: 1, isActive: 1 });
specialDishSchema.index({ displayOrder: 1 });

module.exports = mongoose.model("SpecialDish", specialDishSchema);
