const {
  getTask,
  createTask,
  updateTask,
  dateteTask,
} = require("../controllers/task.js");
const express = require("express");

const router = express.Router();

router.get("/", getTask);
router.post("/create", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", dateteTask);

module.exports = router;
