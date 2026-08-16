"use client";

import { useState, useId, useEffect } from "react";

type FormState = "idle" | "loading" | "success" | "error" | "rate-limited";

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  message?: string;
}

const inputClass = `
  w-full font-sans text-base text-[var(--color-primary)]
  bg-transparent
  border border-[var(--color-outline-variant)]
  px-4 py-3
  focus:outline-none focus:border-[var(--color-primary)]
  transition-colors duration-200
  placeholder:text-[var(--color-outline)]
`;

const errorClass = "font-sans text-sm text-[var(--color-error)] mt-2";
const labelClass = "font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-outline)] mb-2 block";

const SERVICE_OPTIONS = [
  { value: "studio",   label: "Studio Sessions" },
  { value: "events",   label: "Events" },
  { value: "weddings", label: "Wedding" },
  { value: "other",    label: "Other" },
];

const SERVICE_VALUES = ["studio", "events", "weddings", "other"];

export function ContactForm() {
  const uid = useId();
  const [state, setFormState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    service: "", date: "", message: "",
  });

  useEffect(() => {
    const prefill = sessionStorage.getItem("prefill_service");
    if (prefill && SERVICE_VALUES.includes(prefill)) {
      setFormData((prev) => ({ ...prev, service: prefill }));
      sessionStorage.removeItem("prefill_service");
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 429) { setFormState("rate-limited"); return; }

      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setFieldErrors(data.fields);
        setFormState("error");
        return;
      }
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (state === "success") {
    return (
      <div role="alert" className="py-16">
        <p className="font-serif text-3xl mb-4">Thank you.</p>
        <p className="font-sans text-[var(--color-on-surface-variant)]">
          Your enquiry has been received. Ken will be in touch within 2–3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Book a session with Ken" className="flex flex-col gap-8">
      {/* Global error banners */}
      {state === "rate-limited" && (
        <div role="alert" className="p-4 border border-[var(--color-error)] text-[var(--color-error)] font-sans text-sm">
          Too many requests. Please wait 15 minutes before trying again.
        </div>
      )}
      {state === "error" && Object.keys(fieldErrors).length === 0 && (
        <div role="alert" className="p-4 border border-[var(--color-error)] text-[var(--color-error)] font-sans text-sm">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>Full Name *</label>
          <input
            id={`${uid}-name`} name="name" type="text" required autoComplete="name"
            value={formData.name} onChange={handleChange}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? `${uid}-name-error` : undefined}
            className={inputClass} placeholder="Enter your full name"
          />
          {fieldErrors.name && <p id={`${uid}-name-error`} role="alert" className={errorClass}>{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelClass}>Email Address *</label>
          <input
            id={`${uid}-email`} name="email" type="email" required autoComplete="email"
            value={formData.email} onChange={handleChange}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? `${uid}-email-error` : undefined}
            className={inputClass} placeholder="Enter your email address"
          />
          {fieldErrors.email && <p id={`${uid}-email-error`} role="alert" className={errorClass}>{fieldErrors.email}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor={`${uid}-phone`} className={labelClass}>Phone Number *</label>
        <input
          id={`${uid}-phone`} name="phone" type="tel" required autoComplete="tel"
          pattern="^\+?[\d\s\-().]{7,20}$"
          title="Enter a valid phone number (e.g. +1 437 227 8884)"
          value={formData.phone} onChange={handleChange}
          aria-invalid={!!fieldErrors.phone}
          aria-describedby={fieldErrors.phone ? `${uid}-phone-error` : undefined}
          className={inputClass} placeholder="+1 (000) 000-0000"
        />
        {fieldErrors.phone && <p id={`${uid}-phone-error`} role="alert" className={errorClass}>{fieldErrors.phone}</p>}
      </div>

      {/* Service type — radio buttons */}
      <fieldset>
        <legend className={labelClass}>Session Type *</legend>
        <div className="flex flex-col gap-3 mt-1">
          {SERVICE_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio" name="service" value={value}
                checked={formData.service === value}
                onChange={handleChange}
                required={formData.service === ""}
                className="w-4 h-4 cursor-pointer accent-[#1a1a1a] border border-[var(--color-outline-variant)]"
              />
              <span className="font-sans text-base text-[var(--color-primary)]">{label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.service && <p role="alert" className={`${errorClass} mt-2`}>{fieldErrors.service}</p>}
      </fieldset>

      {/* Preferred date */}
      <div>
        <label htmlFor={`${uid}-date`} className={labelClass}>Preferred Date &amp; Time</label>
        <input
          id={`${uid}-date`} name="date" type="text"
          value={formData.date} onChange={handleChange}
          className={inputClass} placeholder="e.g. Next Saturday afternoon, June 2025"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor={`${uid}-message`} className={labelClass}>Session Vision *</label>
        <textarea
          id={`${uid}-message`} name="message" required rows={5}
          value={formData.message} onChange={handleChange}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? `${uid}-message-error` : undefined}
          className={`${inputClass} resize-none`}
          placeholder="Tell Ken about your vision, preferred dates, location ideas…"
        />
        {fieldErrors.message && <p id={`${uid}-message-error`} role="alert" className={errorClass}>{fieldErrors.message}</p>}
      </div>

      {/* Submit — full width, no arrow */}
      <div>
        <button
          type="submit"
          disabled={state === "loading"}
          aria-busy={state === "loading"}
          className="
            w-full
            bg-[var(--color-primary)] text-[var(--color-surface)]
            py-4 font-sans text-[13px] font-medium tracking-[0.1em] uppercase
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
            active:scale-[0.99] disabled:active:scale-100
            flex items-center justify-center gap-3
          "
        >
          {state === "loading" ? (
            <>
              <span aria-hidden="true" className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Sending…
            </>
          ) : "Send Enquiry"}
        </button>
        <p className="font-sans text-xs text-[var(--color-outline)] mt-3">* Required fields</p>
      </div>
    </form>
  );
}
