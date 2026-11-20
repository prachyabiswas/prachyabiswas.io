'use client';

import { Loader2, Send } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { copy } from '@/data/content';

interface FormValues {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot — must stay empty
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
  company: '',
};

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2 || values.name.trim().length > 80) {
    errors.name = copy.form.nameError;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = copy.form.emailError;
  }
  if (values.message.trim().length < 10 || values.message.trim().length > 2000) {
    errors.message = copy.form.messageError;
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const onChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      if (state === 'error' || state === 'success') setState('idle');
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setState('error');
      setFeedback(copy.form.invalidForm);
      return;
    }

    setState('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        if (result.fields) setErrors(result.fields);
        setState('error');
        setFeedback(result.error ?? copy.form.serverError);
        return;
      }

      setValues(initialValues);
      setState('success');
      setFeedback(copy.form.success);
    } catch {
      setState('error');
      setFeedback(copy.form.networkError);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from humans and assistive tech, tempting to bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">{copy.form.honeypot}</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={onChange('company')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            {copy.form.name} <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            className="field-input"
            placeholder={copy.form.namePlaceholder}
            autoComplete="name"
            value={values.name}
            onChange={onChange('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            required
          />
          {errors.name ? (
            <p id="error-name" className="mt-1.5 text-xs text-accent-2">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            {copy.form.email} <span className="text-accent">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="field-input"
            placeholder={copy.form.emailPlaceholder}
            autoComplete="email"
            value={values.email}
            onChange={onChange('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            required
          />
          {errors.email ? (
            <p id="error-email" className="mt-1.5 text-xs text-accent-2">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          {copy.form.message} <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className="field-input resize-y"
          placeholder={copy.form.messagePlaceholder}
          value={values.message}
          onChange={onChange('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          required
        />
        {errors.message ? (
          <p id="error-message" className="mt-1.5 text-xs text-accent-2">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === 'sending' ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
          {state === 'sending' ? copy.form.sending : copy.form.send}
        </button>

        {feedback ? (
          <p
            role={state === 'error' ? 'alert' : 'status'}
            className={`text-sm ${
              state === 'error' ? 'text-accent-2' : 'text-accent'
            }`}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
