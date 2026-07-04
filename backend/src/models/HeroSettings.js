const mongoose = require("mongoose");

const heroSettingsSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
      default: "Welcome to Aroma Restaurant",
      trim: true,
    },
    subtitle: {
      type: String,
      default: "Experience the finest cuisine in town",
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    backgroundImage: {
      type: String,
      default: "/images/hero-bg.jpg",
    },
    backgroundVideo: {
      type: String,
    },
    discount: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },
    discountLabel: {
      type: String,
      default: "Special Discount",
      trim: true,
    },
    discountDescription: {
      type: String,
      default: "Get 20% off on your first order",
      trim: true,
    },
    discountExpiry: {
      type: Date,
    },
    specialToday: {
      name: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
      },
      price: {
        type: Number,
        min: 0,
      },
      link: {
        type: String,
      },
    },
    ctaText: {
      type: String,
      default: "Order Now",
      trim: true,
    },
    ctaLink: {
      type: String,
      default: "/menu",
      trim: true,
    },
    secondaryCtaText: {
      type: String,
      default: "Today's Special",
      trim: true,
    },
    secondaryCtaLink: {
      type: String,
      default: "/specials",
      trim: true,
    },
    stats: [
      {
        label: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
        icon: {
          type: String,
        },
      },
    ],
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

// Ensure only one active hero settings
heroSettingsSchema.pre("save", async function (next) {
  if (this.isActive) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id }, isActive: true },
      { isActive: false },
    );
  }
  next();
});

module.exports = mongoose.model("HeroSettings", heroSettingsSchema);
