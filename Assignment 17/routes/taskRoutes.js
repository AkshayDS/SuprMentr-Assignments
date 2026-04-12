const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET  /api/tasks       → Fetch all tasks
// POST /api/tasks       → Create a new task
router.route("/").get(getTasks).post(createTask);

// GET    /api/tasks/:id  → Fetch single task
// PUT    /api/tasks/:id  → Update a task
// DELETE /api/tasks/:id  → Delete a task
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
