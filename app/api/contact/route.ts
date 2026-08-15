import { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateContactForm } from "@/lib/sanitize";
import { sendContactEmail } from "@/lib/email";
import { captureError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "127.0.0.1";

  // 1. Rate limiting: 5 requests per 15 minutes per IP
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2. Zod validation + sanitization
  const result = validateContactForm(body);
  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString() ?? "unknown";
      fields[key] = issue.message;
    }
    return Response.json(
      { error: "Validation failed.", fields },
      { status: 400 }
    );
  }

  // 3. Send email (data is already sanitized by the Zod transform)
  try {
    await sendContactEmail(result.data);
    return Response.json({ success: true });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    await captureError(error, { ip, step: "sendContactEmail" });
    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
