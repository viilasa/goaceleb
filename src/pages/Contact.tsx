import { useState, type FormEvent } from 'react';
import { Button } from '../components/ui/Button';
import { generateLeadId, saveLead } from '../lib/leadStorage';
import { computeLeadScore } from '../lib/pricing';
import type { CelebrationSelections, Lead } from '../lib/types';
import './Contact.css';

const emptyWedding: CelebrationSelections = {
  month: '',
  year: '',
  guestRange: '',
  numberOfDays: '',
  events: [],
  venuePreference: '',
  hasExistingVenue: null,
  existingVenueName: '',
  decorStyle: '',
  decorLevel: '',
  accommodation: '',
  accommodationNights: 0,
  guestExperience: [],
  photography: '',
  entertainment: [],
  foodAndBeverage: '',
  experiences: [],
  packagePreference: '',
};

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    partnerName: '',
    phone: '',
    email: '',
    weddingMonth: '',
    guestCount: '',
    estimatedBudget: '',
    message: '',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const wedding: CelebrationSelections = {
      ...emptyWedding,
      month: form.weddingMonth,
      guestRange: '',
    };
    const { score, category } = computeLeadScore(wedding, null, false);

    const lead: Lead = {
      id: generateLeadId(),
      createdAt: new Date().toISOString(),
      status: 'new',
      score,
      category,
      contact: {
        name: form.name,
        partnerName: form.partnerName,
        phone: form.phone,
        email: form.email,
        location: '',
        preferredContactMethod: '',
        preferredContactTime: '',
        message: [
          form.message,
          form.guestCount ? `Guest count: ${form.guestCount}` : '',
          form.estimatedBudget ? `Estimated budget: ${form.estimatedBudget}` : '',
          form.weddingMonth ? `Wedding month: ${form.weddingMonth}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      },
      wedding,
      estimate: null,
      booking: null,
      notes: 'Source: Contact form',
    };

    saveLead(lead);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page contact-page">
        <div className="container-narrow contact-success">
          <p className="eyebrow">Received</p>
          <h1>Thank you.</h1>
          <p className="lede">
            We&apos;ve received your message and will be in touch shortly.
          </p>
          <Button to="/book" variant="primary" style={{ marginTop: '2rem' }}>
            Book a Consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page contact-page">
      <header className="page-header container-narrow">
        <p className="eyebrow">Enquiry</p>
        <h1>Contact</h1>
        <p className="lede">
          Prefer a short note over the full planner? Share a few details and we&apos;ll start the
          conversation.
        </p>
      </header>

      <form className="container-narrow contact-form" onSubmit={onSubmit} noValidate>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="partnerName">Partner&apos;s Name</label>
            <input
              id="partnerName"
              autoComplete="off"
              value={form.partnerName}
              onChange={(e) => setForm({ ...form, partnerName: e.target.value })}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="weddingMonth">Wedding Date / Month</label>
            <input
              id="weddingMonth"
              placeholder="e.g. December 2026"
              value={form.weddingMonth}
              onChange={(e) => setForm({ ...form, weddingMonth: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="guestCount">Guest Count</label>
            <input
              id="guestCount"
              placeholder="e.g. 150"
              value={form.guestCount}
              onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="estimatedBudget">Estimated Budget</label>
          <input
            id="estimatedBudget"
            placeholder="Optional"
            value={form.estimatedBudget}
            onChange={(e) => setForm({ ...form, estimatedBudget: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <Button type="submit" variant="primary">
          Start the Conversation
        </Button>
      </form>
    </div>
  );
}
