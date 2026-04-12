// ============================================================
// models/Order.js — Order Schema
// ============================================================
// Stores every placed order with:
//   - Reference to the user who placed it
//   - Array of ordered items (name, qty, image, price, product ID)
//   - Shipping address details
//   - Payment method (Cash on Delivery)
//   - Total price, paid status, and timestamps
// ============================================================

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: { type: Number, required: true }, // Product ID from our frontend data
  },
  { _id: false } // No need for separate _id on sub-documents
);

const orderSchema = new mongoose.Schema(
  {
    // Reference to the User who placed this order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    // Array of items in this order
    orderItems: [orderItemSchema],

    // Shipping address collected at checkout
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: 'India' },
    },

    // Payment method — currently only COD
    paymentMethod: {
      type: String,
      required: true,
      default: 'Cash on Delivery',
    },

    // Order pricing
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    // Payment & delivery status
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
