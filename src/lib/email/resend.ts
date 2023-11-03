"use server";
import type { SendVerificationRequestParams } from "next-auth/providers/email";
import { Resend } from "resend";

import MagicLinkEmail from "./MagicLinkEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  try {
    await resend.emails.send({
      from: "no-reply@vladli.dev",
      to: [identifier],
      subject: `Sign in to Movie App | vladli.dev`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url }),
    });
  } catch (error) {
    throw new Error("Failed to send the verification Email.");
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
