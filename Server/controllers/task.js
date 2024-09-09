const express = require("express");
const Task = require("../models/taskModel.js");

// Get all tasks
const getTask = async (req, res) => {
  // console.log("Request user:", req.user);

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, priority, deadline, reminder, status } = req.body;

  // req.user should be populated by the middleware
  const userId = req.user.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Proceed with task creation
  const task = new Task({
    userId,
    title,
    description,
    priority,
    deadline,
    reminder,
    status,
  });
  await task.save();
  res.json(task);
};

// Update a task
const updateTask = async (req, res) => {
  const { title, description, priority, deadline, reminder, status } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, priority, deadline, status, reminder },
    { new: true }
  );
  res.json(task);
};

// Get a task
const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    // const profile = await ProfileModel.findOne({ userId: id });

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a task
const dateteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

module.exports = { getTask, createTask, updateTask, dateteTask, getTaskById };
