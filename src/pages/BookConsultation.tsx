import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import type { CelebrationSelections, Lead } from '../lib/types';
import './BookConsultation.css';

type PageMode = 'book' | 'enquiry';

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

export function BookConsultation() {
  const [searchParams] = useSearchParams();
  const initialMode: PageMode =
    searchParams.get('mode') === 'enquiry' ? 'enquiry' : 'book';

  const { contact, selections, estimate, leadId, updateContact, updateSelections, setLeadId } =
    useCelebration();
  const [mode, setMode] = useState<PageMode>(initialMode);
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiry, setEnquiry] = useState<{
    name: string;
    partnerName: string;
    phone: string;
    email: string;
    weddingMonth: string;
    guestCount: string;
    estimatedBudget: string;
    message: string;
  }>({
    name: contact.name,
    partnerName: contact.partnerName,
    phone: contact.phone,
    email: contact.email,
    weddingMonth:
      selections.month && selections.year
        ? `${selections.month} ${selections.year}`
        : selections.month,
    guestCount: selections.guestRange || '',
    estimatedBudget: estimate ? `${estimate.minimum}–${estimate.maximum} L` : '',
    message: contact.message || '',
  });

  const dates = useMemo(() => getAvailableDates(), []);
  const slots = useMemo(() => (date ? getAvailableSlots(date) : []), [date]);
  const selectedType = consultationTypes.find((t) => t.id === consultationType);

  const switchMode = (next: PageMode) => {
    setMode(next);
    setStep(1);
    setConfirmed(false);
    setEnquirySubmitted(false);
  };

  const onConfirmBooking = (e: FormEvent) => {
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

  const onSubmitEnquiry = (e: FormEvent) => {
    e.preventDefault();
    const wedding: CelebrationSelections = {
      ...emptyWedding,
      month: enquiry.weddingMonth,
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
        name: enquiry.name,
        partnerName: enquiry.partnerName,
        phone: enquiry.phone,
        email: enquiry.email,
        location: '',
        preferredContactMethod: '',
        preferredContactTime: '',
        message: [
          enquiry.message,
          enquiry.guestCount ? `Guest count: ${enquiry.guestCount}` : '',
          enquiry.estimatedBudget ? `Estimated budget: ${enquiry.estimatedBudget}` : '',
          enquiry.weddingMonth ? `Wedding month: ${enquiry.weddingMonth}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      },
      wedding,
      estimate: null,
      booking: null,
      notes: 'Source: Contact / Enquiry form',
    };

    saveLead(lead);
    updateContact({
      name: enquiry.name,
      partnerName: enquiry.partnerName,
      phone: enquiry.phone,
      email: enquiry.email,
      message: enquiry.message,
    });
    setEnquirySubmitted(true);
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

  if (enquirySubmitted) {
    return (
      <div className="page book-page">
        <div className="container-narrow book-confirm">
          <p className="eyebrow">Received</p>
          <h1>Thank you.</h1>
          <p className="lede">We&apos;ve received your message and will be in touch shortly.</p>
          <div className="btn-group" style={{ marginTop: '2rem' }}>
            <Button variant="primary" onClick={() => switchMode('book')}>
              Book a Consultation
            </Button>
            <Button to="/" variant="secondary">
              Back to Home
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
        <h1>Get in Touch</h1>
        <p className="lede">
          Book a consultation or send a short enquiry — whichever feels right to begin.
        </p>
      </header>

      <div className="container book-shell">
        <div className="mode-switch" role="tablist" aria-label="Contact options">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'book'}
            className={`mode-chip ${mode === 'book' ? 'is-active' : ''}`}
            onClick={() => switchMode('book')}
          >
            Book a Consultation
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'enquiry'}
            className={`mode-chip ${mode === 'enquiry' ? 'is-active' : ''}`}
            onClick={() => switchMode('enquiry')}
          >
            Send an Enquiry
          </button>
        </div>

        {mode === 'book' && (
          <>
            <ol className="book-steps" aria-label="Booking progress">
              {['Consultation Type', 'Date & Time', 'Your Details', 'Confirmation'].map(
                (label, i) => (
                  <li
                    key={label}
                    className={step === i + 1 ? 'is-active' : step > i + 1 ? 'is-done' : ''}
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span> {label}
                  </li>
                ),
              )}
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
                      <p className="step-help">
                        No slots left this day — please choose another date.
                      </p>
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
                          estimate ? `${estimate.minimum}–${estimate.maximum} L` : ''
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

                <form onSubmit={onConfirmBooking}>
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
          </>
        )}

        {mode === 'enquiry' && (
          <section>
            <h2 className="step-title">Send an Enquiry</h2>
            <p className="step-help">
              Prefer a short note? Share a few details and we&apos;ll start the conversation.
            </p>

            <form onSubmit={onSubmitEnquiry} noValidate>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="eName">Name</label>
                  <input
                    id="eName"
                    required
                    autoComplete="name"
                    value={enquiry.name}
                    onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="ePartner">Partner&apos;s Name</label>
                  <input
                    id="ePartner"
                    value={enquiry.partnerName}
                    onChange={(e) => setEnquiry({ ...enquiry, partnerName: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="ePhone">Phone</label>
                  <input
                    id="ePhone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="eEmail">Email</label>
                  <input
                    id="eEmail"
                    type="email"
                    required
                    autoComplete="email"
                    value={enquiry.email}
                    onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="eMonth">Wedding Date / Month</label>
                  <input
                    id="eMonth"
                    placeholder="e.g. December 2026"
                    value={enquiry.weddingMonth}
                    onChange={(e) => setEnquiry({ ...enquiry, weddingMonth: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="eGuests">Guest Count</label>
                  <input
                    id="eGuests"
                    placeholder="e.g. 150"
                    value={enquiry.guestCount}
                    onChange={(e) => setEnquiry({ ...enquiry, guestCount: e.target.value })}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="eBudget">Estimated Budget</label>
                <input
                  id="eBudget"
                  placeholder="Optional"
                  value={enquiry.estimatedBudget}
                  onChange={(e) => setEnquiry({ ...enquiry, estimatedBudget: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="eMessage">Message</label>
                <textarea
                  id="eMessage"
                  required
                  value={enquiry.message}
                  onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                />
              </div>

              <Button type="submit" variant="primary">
                Start the Conversation
              </Button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
