import { z } from "zod";
export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a date."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Please select a time."),
  guests: z.coerce.number().int().min(1).max(12),
});
export function validateReservation(input: unknown, now = new Date()) {
  return reservationSchema
    .superRefine((value, ctx) => {
      const chosen = new Date(`${value.date}T${value.time}:00`);
      if (!Number.isFinite(chosen.getTime()) || chosen <= now)
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: "Please choose a future date and time.",
        });
    })
    .safeParse(input);
}
export function demoReservationResult() {
  return { demo: true, booked: false, saved: false } as const;
}
