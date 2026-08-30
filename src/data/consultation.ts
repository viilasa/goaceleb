import type { ConsultationType } from '../lib/types';

export const consultationTypes: ConsultationType[] = [
  {
    id: 'discovery',
    name: 'Complimentary Discovery Call',
    duration: '20–30 minutes',
    description: 'For couples who want to discuss their wedding vision.',
  },
  {
    id: 'planning',
    name: 'Wedding Planning Consultation',
    duration: '45–60 minutes',
    description: 'A more detailed planning session for couples ready to go deeper.',
  },
];

/** Configurable business hours (local Asia/Kolkata). */
export const BUSINESS_HOURS = {
  timezone: 'Asia/Kolkata',
  startHour: 10,
  endHour: 18,
  slotMinutes: 30,
  daysOpen: [1, 2, 3, 4, 5, 6], // Mon–Sat
};

const BOOKINGS_KEY = 'gc_consultation_bookings';

export interface StoredBooking {
  date: string;
  time: string;
  leadId?: string;
}

export function getBookings(): StoredBooking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? (JSON.parse(raw) as StoredBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: StoredBooking): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function isSlotTaken(date: string, time: string): boolean {
  return getBookings().some((b) => b.date === date && b.time === time);
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function getAvailableDates(daysAhead = 45): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 2; i <= daysAhead; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (BUSINESS_HOURS.daysOpen.includes(d.getDay())) {
      dates.push(
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      );
    }
  }
  return dates;
}

export function getAvailableSlots(date: string): string[] {
  const slots: string[] = [];
  const { startHour, endHour, slotMinutes } = BUSINESS_HOURS;

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += slotMinutes) {
      if (h === endHour - 1 && m + slotMinutes > 60) break;
      const time = `${pad(h)}:${pad(m)}`;
      if (!isSlotTaken(date, time)) slots.push(time);
    }
  }
  return slots;
}

export function formatDisplayDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDisplayTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${pad(m)} ${period} IST`;
}
