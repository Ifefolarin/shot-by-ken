import { sendErrorAlert } from "./email";

export async function captureError(
  error: Error,
  context?: Record<string, unknown>
): Promise<void> {
  console.error("[captureError]", error.message, context ?? "");

  try {
    await sendErrorAlert(error, context);
  } catch (alertError) {
    // Never let the alert mechanism propagate — just log
    console.error("[captureError] Failed to send alert email:", alertError);
  }
}
