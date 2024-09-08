const cron = require("node-cron");
const Task = require("../models/taskModel"); // Update this path based on your project structure
const sendNotification = require("../utils/sendNotification"); // Utility function to send notifications

// Schedule to run every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const reminderThreshold = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now

  // Find tasks with reminders within the next 5 minutes
  const upcomingReminders = await Task.find({
    reminder: { $gte: now, $lt: reminderThreshold },
  });

  // Send notifications for these tasks
  upcomingReminders.forEach((task) => {
    sendNotification(task);
  });
});
