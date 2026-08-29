import { Period } from "@/components/ui/TimePicker";

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

function parseISO(value?: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function toDisplay(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}-${m}-${date.getFullYear()}`;
}

function getDaysGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay.getDay(); i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function getTodayISO(): string {
  return toISO(new Date());
}

function toYearMonth(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth();
}

function isMonthFullyDisabled(
  year: number,
  month: number,
  minDate?: string,
  maxDate?: string,
): boolean {
  const ym = year * 12 + month;
  if (minDate) {
    const min = parseISO(minDate)!;
    if (ym < toYearMonth(min)) return true;
  }
  if (maxDate) {
    const max = parseISO(maxDate)!;
    if (ym > toYearMonth(max)) return true;
  }
  return false;
}

export function getCurrentTimeHHMM(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function toMinutesSinceMidnight(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function to24Hour(hour12: number, period: Period): number {
  if (period === "AM") return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

function comboMinutes(hour12: number, minute: number, period: Period): number {
  return to24Hour(hour12, period) * 60 + minute;
}

function parseTimeValue(
  value?: string,
): { hour12: number; minute: number; period: Period } | null {
  if (!value) return null;
  const [hStr, mStr] = value.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  const period: Period = h >= 12 ? "PM" : "AM";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, minute: m, period };
}

function toTimeValue(hour12: number, minute: number, period: Period): string {
  const h24 = to24Hour(hour12, period);
  return `${String(h24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function toDisplayTime(hour12: number, minute: number, period: Period): string {
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

const PERIOD_MAX_MINUTES: Record<Period, number> = {
  AM: 11 * 60 + 55,
  PM: 23 * 60 + 55,
};

function getNextHourHHMM(): string {
  const now = new Date();
  const hour =
    now.getMinutes() > 0 ? (now.getHours() + 1) % 24 : now.getHours();
  return `${String(hour).padStart(2, "0")}:00`;
}

export {
  PERIOD_MAX_MINUTES,
  getMinutesUntil,
  formatDate,
  getMinutesFromTime,
  getCurrentMinutes,
  toMinutesSinceMidnight,
  to24Hour,
  parseTimeValue,
  toDisplayTime,
  toTimeValue,
  comboMinutes,
  formatTime,
  toDisplay,
  getDaysGrid,
  toISO,
  parseISO,
  getTodayISO,
  isMonthFullyDisabled,
  toYearMonth,
  getNextHourHHMM,
};
