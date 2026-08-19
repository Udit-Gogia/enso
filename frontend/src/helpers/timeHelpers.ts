function formatDate(timestamp: string): string {
  const [year, month, day] = timestamp.split("T")[0].split("-");

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getMinutesFromTime(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getCurrentMinutes(): number {
  const now = new Date();

  return now.getHours() * 60 + now.getMinutes();
}

function getMinutesUntil(time: string): number {
  const targetMinutes = getMinutesFromTime(time);
  const currentMinutes = getCurrentMinutes();

  return targetMinutes - currentMinutes;
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${String(formattedHour).padStart(2, "0")}:${minutes} ${period}`;
}

formatTime("08:00:00"); // "08:00 AM"
formatTime("21:00:00"); // "09:00 PM"
formatTime("00:30:00"); // "12:30 AM"
formatTime("12:45:00"); // "12:45 PM"

export {
  formatDate,
  getMinutesFromTime,
  getCurrentMinutes,
  getMinutesUntil,
  formatTime,
};
