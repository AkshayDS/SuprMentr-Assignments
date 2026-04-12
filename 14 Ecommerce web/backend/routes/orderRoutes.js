// ============================================================
// routes/orderRoutes.js — Order API Endpoints
// ============================================================
// POST /api/orders        → Create a new order (protected)
// GET  /api/orders/myorders → Get logged-in user's orders (protected)
// GET  /api/orders/:id    → Get single order by ID (protected)
//
// All routes require authentication via the protect middleware.
// After creating an order, an email confirmation is sent
// asynchronously (won't block the response).
// ============================================================

import express from 'express';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import sendOrderConfirmation from '../utils/sendEmail.js';

const router = express.Router();

// ---- POST /api/orders — Create New Order ----
// Expects: orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice
router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

    // Validate that cart isn't empty
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    // Create the order document in MongoDB
    const order = new Order({
      user: req.user._id,          // From auth middleware
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Send confirmation email asynchronously (don't await — don't block response)
    sendOrderConfirmation({
      to: req.user.email,
      userName: req.user.name,
      orderId: createdOrder._id.toString().slice(-8).toUpperCase(),
      items: orderItems,
      total: totalPrice,
      address: shippingAddress,
    });

    // Return the created order
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// ---- GET /api/orders/myorders — Get Current User's Orders ----
// Returns all orders for the logged-in user, newest first
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// ---- GET /api/orders/:id — Get Single Order ----
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure user can only view their own orders
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});
// ---- PUT /api/orders/:id/deliver — Mark Order as Delivered (Admin Only) ----
router.put('/:id/deliver', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
});

export default router;
