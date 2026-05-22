"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  FolderGit,
  Building2,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/social-links";
import {
  type ContactField,
  type ContactFieldErrors,
  type ContactValidationError,
  sanitizeContactField,
  submitContactForm,
  validateAllContactFields,
} from "@/lib/contact-form";
import { FadeIn } from "@/components/ui/fade-in";
import { sectionContent, sectionHeading, sectionInner } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const ERROR_KEYS: Record<ContactValidationError, string> = {
  required: "contact.form.errorRequired",
  invalidChars: "contact.form.errorInvalidChars",
  invalidName: "contact.form.errorInvalidName",
  invalidEmail: "contact.form.errorInvalidEmail",
  messageTooShort: "contact.form.errorMessageTooShort",
  messageTooLong: "contact.form.errorMessageTooLong",
  nameTooShort: "contact.form.errorNameTooShort",
  nameTooLong: "contact.form.errorNameTooLong",
};

function FieldError({
  id,
  error,
  message,
}: {
  id: string;
  error?: ContactValidationError;
  message: string;
}) {
  if (!error) return null;

  return (
    <p id={id} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

export function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [formFeedback, setFormFeedback] = useState("");

  const syncFieldValidation = (field: ContactField, value: string) => {
    if (!hasAttemptedSubmit) return;

    const result = sanitizeContactField(value, field);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (result.ok) {
        delete next[field];
      } else {
        next[field] = result.error;
      }
      return next;
    });
  };

  const handleFieldChange = (
    field: ContactField,
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);
    syncFieldValidation(field, value);
  };

  const errorMessage = (error?: ContactValidationError) =>
    error ? t(ERROR_KEYS[error]) : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setFormFeedback("");
    setHasAttemptedSubmit(true);

    const { errors, data } = validateAllContactFields({ name, email, message });
    if (!data) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("sending");

    const result = await submitContactForm(data, honeypot);

    if (!result.ok) {
      setStatus("error");
      if (result.reason === "notConfigured") {
        setFormFeedback(t("contact.form.errorNotConfigured"));
      } else {
        setFormFeedback(t("contact.form.errorNetwork"));
      }
      return;
    }

    setStatus("success");
    setFormFeedback(t("contact.form.success"));
    setHasAttemptedSubmit(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section
      id="contact"
      className="flex w-full scroll-mt-20 justify-center border-b border-zinc-200/80 dark:border-zinc-800/80"
      aria-labelledby="contact-heading"
    >
      <div className={`py-8 xl:py-20 ${sectionInner}`}>
        <div className={`grid gap-8 xl:grid-cols-[1fr_1.5fr_1fr] xl:gap-12 ${sectionContent}`}>
          {/* Left Column: Contact Info */}
          <FadeIn direction="up" className={`space-y-8 ${sectionHeading}`}>
            <div>
              <p className="font-mono text-xs font-medium tracking-wider text-emerald-600 dark:text-emerald-400">
                {t("contact.subtitle")}
              </p>
              <h2
                id="contact-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
              >
                {t("contact.title")}
              </h2>
            </div>

            <div className="flex flex-col items-center space-y-4 xl:items-start">
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <a href={`mailto:${t("contact.email")}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.email")}
                </a>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Phone className="h-5 w-5" />
                </div>
                <a href={`tel:${t("contact.phone").replace(/\s/g, "")}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.phone")}
                </a>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>{t("contact.location")}</span>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <FolderGit className="h-5 w-5" />
                </div>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.github")}
                </a>
              </div>
              <div className="group/item flex items-center gap-4 text-zinc-600 transition-transform duration-300 hover:translate-x-1 dark:text-zinc-400">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover/item:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {t("contact.linkedin")}
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Middle Column: Contact Form */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group/form relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
            >
            <motion.div
              className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <form
              className="relative space-y-4"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Honeypot — hidden from users, bots often fill it */}
              <input
                type="text"
                name="botcheck"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Input
                    name="name"
                    value={name}
                    onChange={(e) => handleFieldChange("name", e.target.value, setName)}
                    placeholder={t("contact.form.name")}
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                    className={cn(
                      "bg-zinc-50/50 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900",
                      fieldErrors.name && "border-red-500 focus-visible:ring-red-500/30"
                    )}
                  />
                  <FieldError
                    id="contact-name-error"
                    error={fieldErrors.name}
                    message={errorMessage(fieldErrors.name)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value, setEmail)}
                    placeholder={t("contact.form.email")}
                    required
                    maxLength={254}
                    autoComplete="email"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                    className={cn(
                      "bg-zinc-50/50 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900",
                      fieldErrors.email && "border-red-500 focus-visible:ring-red-500/30"
                    )}
                  />
                  <FieldError
                    id="contact-email-error"
                    error={fieldErrors.email}
                    message={errorMessage(fieldErrors.email)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Textarea
                  name="message"
                  value={message}
                  onChange={(e) => handleFieldChange("message", e.target.value, setMessage)}
                  placeholder={t("contact.form.message")}
                  required
                  minLength={10}
                  maxLength={2000}
                  disabled={status === "sending"}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                  className={cn(
                    "min-h-[150px] bg-zinc-50/50 transition-all duration-300 hover:border-emerald-500/40 hover:bg-white dark:bg-zinc-900/50 dark:hover:bg-zinc-900",
                    fieldErrors.message && "border-red-500 focus-visible:ring-red-500/30"
                  )}
                />
                <FieldError
                  id="contact-message-error"
                  error={fieldErrors.message}
                  message={errorMessage(fieldErrors.message)}
                />
              </div>

              {formFeedback ? (
                <p
                  role="status"
                  className={cn(
                    "text-center text-sm font-medium",
                    status === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {formFeedback}
                </p>
              ) : null}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="gap-2 bg-emerald-600 transition-all duration-300 group-hover/form:shadow-lg group-hover/form:shadow-emerald-500/20 hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  {status === "sending" ? (
                    <>
                      {t("contact.form.sending")}
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      {t("contact.form.send")}
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover/form:translate-x-0.5 group-hover/form:-translate-y-0.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
            </motion.div>
          </FadeIn>

          {/* Right Column: Terminal Panel */}
          <FadeIn direction="up" delay={0.4} className="hidden xl:block">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 font-mono text-sm transition-colors hover:border-emerald-500/35 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2">
                <p className="text-emerald-600 dark:text-emerald-400">{">_"}</p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <span className="text-purple-600 dark:text-purple-400">const</span> message = <span className="text-emerald-600 dark:text-emerald-400">&quot;{t("contact.terminal.message")}&quot;</span>;
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  <span className="text-blue-600 dark:text-blue-400">console</span>.<span className="text-yellow-600 dark:text-yellow-400">log</span>(message);
                </p>
                <p className="mt-4 text-zinc-500 dark:text-zinc-500">
                  {t("contact.terminal.message")}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
