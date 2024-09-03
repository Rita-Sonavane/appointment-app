const express = require("express");
const Task = require("../models/taskModel.js");

// Get all tasks
const getTask = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, priority, deadline, reminder } = req.body;
  const task = new Task({
    userId: req.user.userId,
    title,
    description,
    priority,
    deadline,
    reminder,
  });
  await task.save();
  res.json(task);
};

// Update a task
const updateTask = async (req, res) => {
  const { title, description, priority, deadline, reminder } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, priority, deadline, reminder },
    { new: true }
  );
  res.json(task);
};

// Delete a task
const dateteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

module.exports = { getTask, createTask, updateTask, dateteTask };
