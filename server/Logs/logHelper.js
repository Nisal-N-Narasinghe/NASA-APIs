// logHelper.js

const fs = require("fs");
const path = require("path");

// Function to log critical messages to log.txt
const logCritical = (message) => {
  const logFilePath = path.join(__dirname, "log.log");
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - CRITICAL: ${message}\n`;

  // Append message to log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
};

// Middleware to log critical errors
const logCriticalErrors = (err, req, res, next) => {
  // Log the error message
  logCritical(`Error: ${err.message}`);

  // Proceed to the next middleware
  if (next) {
    next(err);
  } else {
    // If next is not defined, send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { logCritical, logCriticalErrors };
