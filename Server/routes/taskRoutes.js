const {
  getTask,
  createTask,
  updateTask,
  dateteTask,
  getTaskById,
} = require("../controllers/task.js");
const express = require("express");
const authenticateToken = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getTask);
router.get("/:id", getTaskById);
router.post("/create", authenticateToken, createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", dateteTask);

module.exports = router;
