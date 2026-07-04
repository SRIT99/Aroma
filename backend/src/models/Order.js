const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        specialInstructions: {
          type: String,
          trim: true,
        },
        options: [
          {
            name: String,
            price: Number,
          },
        ],
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    serviceCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    orderType: {
      type: String,
      enum: ["dine_in", "takeaway", "delivery"],
      default: "takeaway",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "pending",
            "confirmed",
            "preparing",
            "ready",
            "out_for_delivery",
            "delivered",
            "cancelled",
          ],
        },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: String,
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "khalti", "esewa", "online"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentDetails: {
      transactionId: String,
      paymentDate: Date,
      paymentGateway: String,
      paymentResponse: mongoose.Schema.Types.Mixed,
    },
    deliveryAddress: {
      type: {
        type: String,
        enum: ["home", "work", "other"],
        default: "home",
      },
      street: {
        type: String,
        required: function () {
          return this.orderType === "delivery";
        },
      },
      city: {
        type: String,
        required: function () {
          return this.orderType === "delivery";
        },
      },
      area: {
        type: String,
        required: function () {
          return this.orderType === "delivery";
        },
      },
      landmark: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff",
    },
    deliveryTime: {
      type: Date,
    },
    estimatedTime: {
      type: Date,
    },
    actualTime: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      createdAt: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Generate order number before saving
orderSchema.pre("save", function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    this.orderNumber = `AR${year}${month}${day}${random}`;
  }
  next();
});

// Update total amount before saving
orderSchema.pre("save", function (next) {
  this.totalAmount =
    this.subtotal -
    this.discount +
    this.deliveryFee +
    this.serviceCharge +
    this.tax;
  next();
});

// Indexes for better performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ status: 1, orderType: 1 });
orderSchema.index({ assignedTo: 1, status: 1 });

module.exports = mongoose.model("Order", orderSchema);
