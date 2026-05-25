const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/** Characters and patterns that must not appear in user input */
const FORBIDDEN_CHARS = /[<>{}[\]\\/`]/;
const FORBIDDEN_PATTERNS =
  /javascript:|data:|vbscript:|on\w+\s*=|<\s*\/?\s*script|&#x?[\da-f]+;?/i;

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const NAME_REGEX = /^[\p{L}\p{M}'.\-\s]{2,80}$/u;

export type ContactField = "name" | "email" | "message";

export type ContactValidationError =
  | "required"
  | "invalidChars"
  | "invalidName"
  | "invalidEmail"
  | "messageTooShort"
  | "messageTooLong"
  | "nameTooShort"
  | "nameTooLong";

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

function normalizeWhitespace(value: string) {
  return value.replace(/\0/g, "").trim().replace(/\s+/g, " ");
}

export function containsUnsafeInput(value: string) {
  if (!value) return false;
  return FORBIDDEN_CHARS.test(value) || FORBIDDEN_PATTERNS.test(value);
}

export function sanitizeContactField(
  value: string,
  field: ContactField
): { ok: true; value: string } | { ok: false; error: ContactValidationError } {
  const normalized = normalizeWhitespace(value);

  if (!normalized) {
    return { ok: false, error: "required" };
  }

  if (containsUnsafeInput(normalized)) {
    return { ok: false, error: "invalidChars" };
  }

  if (field === "name") {
    if (normalized.length < LIMITS.name.min) {
      return { ok: false, error: "nameTooShort" };
    }
    if (normalized.length > LIMITS.name.max) {
      return { ok: false, error: "nameTooLong" };
    }
    if (!NAME_REGEX.test(normalized)) {
      return { ok: false, error: "invalidName" };
    }
    return { ok: true, value: normalized };
  }

  if (field === "email") {
    if (normalized.length > LIMITS.email.max) {
      return { ok: false, error: "invalidEmail" };
    }
    const lower = normalized.toLowerCase();
    if (!EMAIL_REGEX.test(lower)) {
      return { ok: false, error: "invalidEmail" };
    }
    return { ok: true, value: lower };
  }

  if (normalized.length < LIMITS.message.min) {
    return { ok: false, error: "messageTooShort" };
  }
  if (normalized.length > LIMITS.message.max) {
    return { ok: false, error: "messageTooLong" };
  }

  return { ok: true, value: normalized };
}

export type ContactFieldErrors = Partial<
  Record<ContactField, ContactValidationError>
>;

export function validateAllContactFields(values: ContactFormValues): {
  errors: ContactFieldErrors;
  data: ContactFormValues | null;
} {
  const fields: ContactField[] = ["name", "email", "message"];
  const errors: ContactFieldErrors = {};
  const sanitized: Partial<ContactFormValues> = {};

  for (const field of fields) {
    const result = sanitizeContactField(values[field], field);
    if (!result.ok) {
      errors[field] = result.error;
    } else {
      sanitized[field] = result.value;
    }
  }

  const hasErrors = Object.keys(errors).length > 0;
  return {
    errors,
    data: hasErrors ? null : (sanitized as ContactFormValues),
  };
}

export async function submitContactForm(
  data: ContactFormValues,
  honeypot: string
): Promise<{ ok: true } | { ok: false; reason: "bot" | "notConfigured" | "network" }> {
  if (honeypot.trim().length > 0) {
    return { ok: false, reason: "bot" };
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { ok: false, reason: "notConfigured" };
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name,
        email: data.email,
        message: data.message,
        subject: "New portfolio contact message",
        from_name: "Portfolio Contact Form",
      }),
    });

    const json = (await res.json()) as { success?: boolean };

    if (!res.ok || !json.success) {
      return { ok: false, reason: "network" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
