const Task = require("../models/Task");

// ─────────────────────────────────────────────
// @desc    Fetch all tasks
// @route   GET /api/tasks
// ─────────────────────────────────────────────
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Fetch a single task by ID
// @route   GET /api/tasks/:id
// ─────────────────────────────────────────────
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Create a new task
// @route   POST /api/tasks
// ─────────────────────────────────────────────
const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({ title, description, completed });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    // Mongoose validation errors return 400
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Update a task by ID
// @route   PUT /api/tasks/:id
// ─────────────────────────────────────────────
const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true } // return updated doc & run schema validators
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Delete a task by ID
// @route   DELETE /api/tasks/:id
// ─────────────────────────────────────────────
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
