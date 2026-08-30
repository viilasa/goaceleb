import { useMemo, useState, type FormEvent } from 'react';
import { Button } from '../components/ui/Button';
import { SelectableOption } from '../components/ui/SelectableOption';
import { useCelebration } from '../context/CelebrationContext';
import {
  consultationTypes,
  formatDisplayDate,
  formatDisplayTime,
  getAvailableDates,
  getAvailableSlots,
  saveBooking,
} from '../data/consultation';
import { generateLeadId, getLeadById, saveLead, updateLead } from '../lib/leadStorage';
import { computeLeadScore } from '../lib/pricing';
import type { Lead } from '../lib/types';
import './BookConsultation.css';

export function BookConsultation() {
  const { contact, selections, estimate, leadId, updateContact, updateSelections, setLeadId } =
    useCelebration();
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const dates = useMemo(() => getAvailableDates(), []);
  const slots = useMemo(() => (date ? getAvailableSlots(date) : []), [date]);

  const selectedType = consultationTypes.find((t) => t.id === consultationType);

  const onConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!consultationType || !date || !time || !contact.name || !contact.email || !contact.phone) {
      return;
    }

    const booking = {
      consultationType: selectedType?.name || consultationType,
      date,
      time,
      meetingLink: 'Video meeting link will be shared by email',
    };

    let id = leadId;
    if (id) {
      const existing = getLeadById(id);
      if (existing) {
        const { score, category } = computeLeadScore(existing.wedding, existing.estimate, true);
        updateLead(id, {
          status: 'consultation_booked',
          score,
          category,
          booking,
          contact: { ...existing.contact, ...contact },
        });
      }
    } else {
      id = generateLeadId();
      const { score, category } = computeLeadScore(selections, estimate, true);
      const lead: Lead = {
        id,
        createdAt: new Date().toISOString(),
        status: 'consultation_booked',
        score,
        category,
        contact: { ...contact },
        wedding: { ...selections },
        estimate,
        booking,
        notes: 'Source: Book a Consultation',
      };
      saveLead(lead);
      setLeadId(id);
    }

    saveBooking({ date, time, leadId: id || undefined });
    setConfirmed(true);
  };

  if (confirmed && selectedType) {
    return (
      <div className="page book-page">
        <div className="container-narrow book-confirm">
          <p className="eyebrow">Confirmed</p>
          <h1>You&apos;re Booked.</h1>
          <p className="lede">We&apos;re looking forward to hearing about your celebration.</p>

          <dl className="confirm-details">
            <div>
              <dt>Consultation</dt>
              <dd>{selectedType.name}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{formatDisplayDate(date)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{formatDisplayTime(time)}</dd>
            </div>
            <div>
              <dt>Meeting</dt>
              <dd>Video meeting link will be shared by email</dd>
            </div>
          </dl>

          <p className="confirm-note">
            A confirmation email and reminder will be sent to {contact.email}. Our team will also be
            notified.
          </p>

          <div className="btn-group" style={{ marginTop: '2rem' }}>
            <Button to="/" variant="primary">
              Back to Home
            </Button>
            <Button to="/plan/build" variant="secondary">
              Build Your Celebration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page book-page">
      <header className="page-header container">
        <p className="eyebrow">Let&apos;s Talk</p>
        <h1>Book a Consultation</h1>
        <p className="lede">
          Choose a time that works for you. We&apos;ll listen to your vision and share how we can
          help.
        </p>
      </header>

      <div className="container book-shell">
        <ol className="book-steps" aria-label="Booking progress">
          {['Consultation Type', 'Date & Time', 'Your Details', 'Confirmation'].map((label, i) => (
            <li key={label} className={step === i + 1 ? 'is-active' : step > i + 1 ? 'is-done' : ''}>
              <span>{String(i + 1).padStart(2, '0')}</span> {label}
            </li>
          ))}
        </ol>

        {step === 1 && (
          <section>
            <h2 className="step-title">Consultation Type</h2>
            <div className="selectable-grid">
              {consultationTypes.map((type) => (
                <SelectableOption
                  key={type.id}
                  title={type.name}
                  description={`${type.duration}. ${type.description}`}
                  selected={consultationType === type.id}
                  onClick={() => setConsultationType(type.id)}
                />
              ))}
            </div>
            <div className="book-nav">
              <span />
              <Button
                variant="primary"
                disabled={!consultationType}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="step-title">Choose Date and Time</h2>
            <p className="step-help">Times shown in IST (Asia/Kolkata).</p>

            <fieldset className="build-fieldset">
              <legend>Available dates</legend>
              <div className="date-scroll">
                {dates.slice(0, 21).map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`date-chip ${date === d ? 'is-active' : ''}`}
                    onClick={() => {
                      setDate(d);
                      setTime('');
                    }}
                  >
                    {new Date(d + 'T12:00:00').toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </button>
                ))}
              </div>
            </fieldset>

            {date && (
              <fieldset className="build-fieldset">
                <legend>Available times</legend>
                <div className="selectable-grid cols-3">
                  {slots.map((slot) => (
                    <SelectableOption
                      key={slot}
                      title={formatDisplayTime(slot)}
                      selected={time === slot}
                      onClick={() => setTime(slot)}
                    />
                  ))}
                </div>
                {slots.length === 0 && (
                  <p className="step-help">No slots left this day — please choose another date.</p>
                )}
              </fieldset>
            )}

            <div className="book-nav">
              <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                ← Back
              </button>
              <Button variant="primary" disabled={!date || !time} onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="step-title">Quick Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(4);
              }}
            >
              <div className="field-row">
                <div className="field">
                  <label htmlFor="bName">Name</label>
                  <input
                    id="bName"
                    required
                    value={contact.name}
                    onChange={(e) => updateContact({ name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="bPartner">Partner&apos;s Name</label>
                  <input
                    id="bPartner"
                    value={contact.partnerName}
                    onChange={(e) => updateContact({ partnerName: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="bPhone">Phone</label>
                  <input
                    id="bPhone"
                    type="tel"
                    required
                    value={contact.phone}
                    onChange={(e) => updateContact({ phone: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="bEmail">Email</label>
                  <input
                    id="bEmail"
                    type="email"
                    required
                    value={contact.email}
                    onChange={(e) => updateContact({ email: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="bMonth">Wedding month</label>
                  <input
                    id="bMonth"
                    value={
                      selections.month && selections.year
                        ? `${selections.month} ${selections.year}`
                        : selections.month
                    }
                    onChange={(e) => updateSelections({ month: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="bGuests">Guest count</label>
                  <input
                    id="bGuests"
                    value={selections.guestRange}
                    onChange={(e) =>
                      updateSelections({
                        guestRange: e.target.value as typeof selections.guestRange,
                      })
                    }
                    placeholder="e.g. 100–200"
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="bLoc">Current location</label>
                  <input
                    id="bLoc"
                    value={contact.location}
                    onChange={(e) =>
                      updateContact({
                        location: e.target.value as typeof contact.location,
                      })
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="bBudget">Estimated budget</label>
                  <input
                    id="bBudget"
                    defaultValue={
                      estimate
                        ? `${estimate.minimum}–${estimate.maximum} L`
                        : ''
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="book-nav">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
                  ← Back
                </button>
                <Button type="submit" variant="primary">
                  Review Booking
                </Button>
              </div>
            </form>
          </section>
        )}

        {step === 4 && selectedType && (
          <section>
            <h2 className="step-title">Confirm</h2>
            <dl className="confirm-details">
              <div>
                <dt>Consultation</dt>
                <dd>{selectedType.name}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{formatDisplayDate(date)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{formatDisplayTime(time)}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>
                  {contact.name}
                  {contact.partnerName ? ` & ${contact.partnerName}` : ''}
                </dd>
              </div>
            </dl>

            <form onSubmit={onConfirm}>
              <div className="book-nav">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(3)}>
                  ← Back
                </button>
                <Button type="submit" variant="primary">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
