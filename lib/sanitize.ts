import { z } from "zod";

const SERVICE_OPTIONS = ["studio", "events", "weddings", "other"] as const;

// Strips HTML tags and entities; trims whitespace
function sanitizeString(value: string): string {
  return value
    .trim()
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/&[a-zA-Z0-9#]{1,10};/g, ""); // strip HTML entities
}

const sanitizedString = (maxLength: number) =>
  z
    .string()
    .min(1)
    .max(maxLength)
    .transform(sanitizeString);

export const contactSchema = z.object({
  name:    sanitizedString(100),
  email:   z.string().email().max(254).transform((v) => v.trim().toLowerCase()),
  phone:   z.string()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long")
    .transform(sanitizeString)
    .refine(
      (v) => /^\+?[\d\s\-().]{7,20}$/.test(v),
      "Please enter a valid phone number"
    ),
  service: z.enum(SERVICE_OPTIONS),
  date:    z.string().max(200).optional().transform((v) => (v ? sanitizeString(v) : undefined)),
  message: sanitizedString(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function validateContactForm(body: unknown) {
  return contactSchema.safeParse(body);
}
