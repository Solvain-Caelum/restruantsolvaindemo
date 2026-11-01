import { describe, expect, it } from "vitest";
import { demoReservationResult, validateReservation } from "@/lib/reservation";
const valid = {
  name: "Anika Sharma",
  email: "anika@example.com",
  phone: "+91 9876543210",
  date: "2026-11-05",
  time: "19:00",
  guests: 2,
};
const now = new Date("2026-11-01T12:00:00");
describe("Demo reservations", () => {
  it("never makes a real booking", () => {
    expect(demoReservationResult().booked).toBe(false);
  });
  it("does not store personal details", () => {
    expect(demoReservationResult().saved).toBe(false);
  });
  it("validates all reservation fields", () => {
    expect(validateReservation(valid, now).success).toBe(true);
    for (const field of ["name", "email", "phone", "date", "time", "guests"])
      expect(validateReservation({ ...valid, [field]: "" }, now).success).toBe(false);
  });
  it("rejects a past reservation", () => {
    expect(validateReservation({ ...valid, date: "2026-10-31" }, now).success).toBe(false);
  });
});
