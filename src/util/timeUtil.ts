function formatTimeAgo(inputDate) {
  // Handle both timestamp numbers and ISO date strings
  const date =
    typeof inputDate === "string" ? new Date(inputDate) : new Date(inputDate);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  // Handle future dates or invalid dates
  if (diffInSeconds < 0 || isNaN(diffInSeconds)) {
    return "just now";
  }

  // Set up the formatter for automatic text (e.g., "yesterday" instead of "1 day ago")
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const intervals = [
    { unit: "year", threshold: 31536000 }, // 365 * 24 * 60 * 60
    { unit: "month", threshold: 2592000 }, // 30 * 24 * 60 * 60
    { unit: "day", threshold: 86400 }, // 24 * 60 * 60
    { unit: "hour", threshold: 3600 }, // 60 * 60
    { unit: "minute", threshold: 60 }, // 60
    { unit: "second", threshold: 1 }, // 1
  ];

  for (const interval of intervals) {
    const value = Math.floor(diffInSeconds / interval.threshold);

    // Return "just now" for very recent times (less than 30 seconds)
    if (interval.unit === "second" && diffInSeconds < 30) {
      return "just now";
    }

    if (value >= 1) {
      return rtf.format(-value, interval.unit);
    }
  }

  // Fallback for edge cases
  return "just now";
}

// Test with your actual data
const testDates = [
  "2025-09-11T23:16:32.398Z", // Should show relative to current time
  "2025-09-11T23:16:05.980Z",
  "2025-09-11T23:10:52.231Z",
  "2025-09-03T08:48:57.526Z", // Should show "10 days ago" or similar
];

console.log("Current time:", new Date().toISOString());
console.log("\nTest results:");
testDates.forEach((date) => {
  console.log(`${date} -> ${formatTimeAgo(date)}`);
});

// // Additional test cases
// const now = Date.now();
// console.log("\nAdditional tests:");
// console.log(formatTimeAgo(now - 15000)); // 15 seconds ago -> "just now"
// console.log(formatTimeAgo(now - 60 * 1000)); // 1 minute ago
// console.log(formatTimeAgo(now - 60 * 60 * 1000)); // 1 hour ago
// console.log(formatTimeAgo(now - 24 * 60 * 60 * 1000)); // 1 day ago -> "yesterday"
// console.log(formatTimeAgo(now - 2 * 24 * 60 * 60 * 1000)); // 2 days ago

export { formatTimeAgo };
