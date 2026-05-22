export const GITHUB_URL = "https://github.com/sandeepkumarpal";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sandeeppal894";

/** E.164 without + — used for wa.me links */
export const WHATSAPP_PHONE = "916268283648";

export function buildWhatsAppUrl(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_PHONE}?${params.toString()}`;
}

/** Served from /public — URL is root-relative, not /public/... */
export const RESUME_URL = "/Sandeep_kumar_Resume.pdf";
export const RESUME_FILENAME = "Sandeep_kumar_Resume.pdf";

/** Hero profile photo — add this file under public/ */
export const PROFILE_IMAGE = "/profile.png";
