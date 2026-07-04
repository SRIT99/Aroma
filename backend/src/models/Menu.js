const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "meal_items",
        "chicken_platter",
        "burger_value_meal",
        "sizzler",
        "popular_fast_foods",
        "momo",
      ],
    },
    subCategory: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
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
    isPopular: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
      default: 20, // minutes
    },
    calories: {
      type: Number,
      min: 0,
    },
    image: {
      type: String,
      default: "/images/default-menu.jpg",
    },
    images: [String],
    tags: [String],
    options: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    allergens: [
      {
        type: String,
        enum: [
          "dairy",
          "eggs",
          "fish",
          "shellfish",
          "tree_nuts",
          "peanuts",
          "wheat",
          "soy",
        ],
      },
    ],
    nutritionalInfo: {
      servingSize: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
      sugar: Number,
      sodium: Number,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for discounted price
menuItemSchema.virtual("discountedPrice").get(function () {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount) / 100;
  }
  return this.price;
});

// Index for search
menuItemSchema.index({ name: "text", description: "text", tags: "text" });

module.exports = mongoose.model("Menu", menuItemSchema);
