import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProgressSteps } from '../components/ui/ProgressSteps';
import { SelectableOption } from '../components/ui/SelectableOption';
import { useCelebration } from '../context/CelebrationContext';
import {
  ACCOMMODATION_OPTIONS,
  CALCULATOR_STEPS,
  DAY_OPTIONS,
  DECOR_LEVELS,
  DECOR_STYLES,
  ENTERTAINMENT_OPTIONS,
  EVENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  FOOD_OPTIONS,
  GUEST_EXPERIENCE_OPTIONS,
  GUEST_OPTIONS,
  MONTHS,
  PHOTOGRAPHY_OPTIONS,
  VENUE_OPTIONS,
  YEARS,
} from '../data/calculatorConfig';
import { generateLeadId, saveLead } from '../lib/leadStorage';
import { submitLeadToFormSubmit } from '../lib/formSubmit';
import { computeLeadScore, formatLakhs, formatLakhsRange } from '../lib/pricing';
import type {
  ContactMethod,
  ContactTime,
  DayCount,
  DecorLevel,
  GuestRange,
  Lead,
  LocationType,
} from '../lib/types';
import './BuildCelebration.css';

const BREAKDOWN_LABELS: Record<string, string> = {
  venue: 'Venue & Accommodation',
  decor: 'Décor & Design',
  food: 'Food & Beverage',
  planning: 'Planning & Management',
  photography: 'Photography & Film',
  hospitality: 'Hospitality & Logistics',
  entertainment: 'Entertainment',
};

export function BuildCelebration() {
  const [searchParams] = useSearchParams();
  const {
    step,
    setStep,
    selections,
    updateSelections,
    toggleArrayItem,
    estimate,
    contact,
    updateContact,
    setLeadId,
  } = useCelebration();
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg) updateSelections({ packagePreference: pkg });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const canContinue = (): boolean => {
    switch (step) {
      case 1:
        return !!(selections.month && selections.year && selections.guestRange && selections.numberOfDays);
      case 2:
        return selections.events.length > 0;
      case 3:
        return !!selections.venuePreference && selections.hasExistingVenue !== null;
      case 4:
        return !!(selections.decorStyle && selections.decorLevel);
      case 5:
        return !!selections.accommodation;
      case 6:
        return !!(selections.photography && selections.foodAndBeverage);
      default:
        return true;
    }
  };

  const next = () => {
    if (step < 7 && canContinue()) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitLead = async (e: FormEvent) => {
    e.preventDefault();
    if (!estimate) return;

    const { score, category } = computeLeadScore(selections, estimate, false);
    const id = generateLeadId();

    const lead: Lead = {
      id,
      createdAt: new Date().toISOString(),
      status: 'new',
      score,
      category,
      contact: { ...contact },
      wedding: { ...selections },
      estimate: { ...estimate },
      booking: null,
      notes: 'Source: Build Your Celebration',
    };

    saveLead(lead);
    setLeadId(id);
    await submitLeadToFormSubmit(lead);
    setLeadSubmitted(true);
  };

  return (
    <div className="page build-page">
      <header className="build-app-bar">
        <Link to="/" className="build-app-close" aria-label="Close planner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </Link>
        <div className="build-app-bar-copy">
          <p className="build-app-kicker">Plan Your Wedding</p>
          <h1 className="build-app-title">
            {CALCULATOR_STEPS[step - 1]?.label ?? 'Build Your Celebration'}
          </h1>
        </div>
        <span className="build-app-step">
          {step}/{CALCULATOR_STEPS.length}
        </span>
      </header>

      <header className="page-header container-wide build-desktop-header">
        <p className="eyebrow">Plan Your Wedding</p>
        <h1>Build Your Celebration</h1>
        <p className="lede">
          Tell us what you&apos;re imagining. We&apos;ll help you understand what it could take to
          bring it to life.
        </p>
      </header>

      <div className="container build-shell">
        <div className="build-app-progress">
          <ProgressSteps current={step} />
        </div>

        <div className="build-scroll" ref={scrollRef}>
          <div className="build-panel" key={step}>
          {step === 1 && (
            <section>
              <h2 className="step-title">Your Celebration</h2>

              <fieldset className="build-fieldset">
                <legend>When are you getting married?</legend>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="month">Month</label>
                    <select
                      id="month"
                      value={selections.month}
                      onChange={(e) => updateSelections({ month: e.target.value })}
                    >
                      <option value="">Select</option>
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="year">Year</label>
                    <select
                      id="year"
                      value={selections.year}
                      onChange={(e) => updateSelections({ year: e.target.value })}
                    >
                      <option value="">Select</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              <fieldset className="build-fieldset">
                <legend>How many guests?</legend>
                <div className="selectable-grid cols-2">
                  {GUEST_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt.value}
                      title={opt.label}
                      selected={selections.guestRange === opt.value}
                      onClick={() => updateSelections({ guestRange: opt.value as GuestRange })}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="build-fieldset">
                <legend>How many days?</legend>
                <div className="selectable-grid cols-2">
                  {DAY_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt.value}
                      title={opt.label}
                      selected={selections.numberOfDays === opt.value}
                      onClick={() => updateSelections({ numberOfDays: opt.value as DayCount })}
                    />
                  ))}
                </div>
              </fieldset>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2 className="step-title">Select Your Events</h2>
              <p className="step-help">Choose all that apply.</p>
              <div className="selectable-grid cols-2">
                {EVENT_OPTIONS.map((event) => (
                  <SelectableOption
                    key={event}
                    title={event}
                    multi
                    selected={selections.events.includes(event)}
                    onClick={() => toggleArrayItem('events', event)}
                  />
                ))}
              </div>
              {selections.events.length > 0 && (
                <p className="selected-summary">
                  Selected: {selections.events.join(' · ')}
                </p>
              )}
            </section>
          )}

          {step === 3 && (
            <section>
              <h2 className="step-title">Venue Preference</h2>
              <fieldset className="build-fieldset">
                <legend>What kind of setting do you imagine?</legend>
                <div className="selectable-grid cols-2">
                  {VENUE_OPTIONS.map((v) => (
                    <SelectableOption
                      key={v}
                      title={v}
                      selected={selections.venuePreference === v}
                      onClick={() => updateSelections({ venuePreference: v })}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="build-fieldset">
                <legend>Do you already have a venue?</legend>
                <div className="selectable-grid cols-2">
                  <SelectableOption
                    title="Yes"
                    selected={selections.hasExistingVenue === true}
                    onClick={() => updateSelections({ hasExistingVenue: true })}
                  />
                  <SelectableOption
                    title="No"
                    selected={selections.hasExistingVenue === false}
                    onClick={() =>
                      updateSelections({ hasExistingVenue: false, existingVenueName: '' })
                    }
                  />
                </div>
                {selections.hasExistingVenue && (
                  <div className="field" style={{ marginTop: '1.25rem' }}>
                    <label htmlFor="venueName">Venue name (optional)</label>
                    <input
                      id="venueName"
                      value={selections.existingVenueName}
                      onChange={(e) => updateSelections({ existingVenueName: e.target.value })}
                    />
                  </div>
                )}
              </fieldset>
            </section>
          )}

          {step === 4 && (
            <section>
              <h2 className="step-title">Décor & Design</h2>
              <fieldset className="build-fieldset">
                <legend>Wedding style</legend>
                <div className="selectable-grid cols-2">
                  {DECOR_STYLES.map((style) => (
                    <SelectableOption
                      key={style}
                      title={style}
                      selected={selections.decorStyle === style}
                      onClick={() => updateSelections({ decorStyle: style })}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="build-fieldset">
                <legend>Décor level</legend>
                <div className="selectable-grid">
                  {DECOR_LEVELS.map((level) => (
                    <SelectableOption
                      key={level.value}
                      title={level.title}
                      description={level.description}
                      selected={selections.decorLevel === level.value}
                      onClick={() =>
                        updateSelections({ decorLevel: level.value as DecorLevel })
                      }
                    />
                  ))}
                </div>
              </fieldset>
            </section>
          )}

          {step === 5 && (
            <section>
              <h2 className="step-title">Guest Experience</h2>
              <fieldset className="build-fieldset">
                <legend>Do you need guest accommodation?</legend>
                <div className="selectable-grid cols-3">
                  {ACCOMMODATION_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt}
                      title={opt}
                      selected={selections.accommodation === opt}
                      onClick={() => updateSelections({ accommodation: opt })}
                    />
                  ))}
                </div>
              </fieldset>

              {selections.accommodation === 'Yes' && (
                <div className="field">
                  <label htmlFor="nights">Number of nights</label>
                  <input
                    id="nights"
                    type="number"
                    min={1}
                    max={10}
                    value={selections.accommodationNights}
                    onChange={(e) =>
                      updateSelections({ accommodationNights: Number(e.target.value) || 1 })
                    }
                  />
                </div>
              )}

              <fieldset className="build-fieldset">
                <legend>Hospitality extras</legend>
                <div className="selectable-grid cols-2">
                  {GUEST_EXPERIENCE_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt}
                      title={opt}
                      multi
                      selected={selections.guestExperience.includes(opt)}
                      onClick={() => toggleArrayItem('guestExperience', opt)}
                    />
                  ))}
                </div>
              </fieldset>
            </section>
          )}

          {step === 6 && (
            <section>
              <h2 className="step-title">Add-ons</h2>

              <fieldset className="build-fieldset">
                <legend>Photography</legend>
                <div className="selectable-grid">
                  {PHOTOGRAPHY_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt}
                      title={opt}
                      selected={selections.photography === opt}
                      onClick={() => updateSelections({ photography: opt })}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="build-fieldset">
                <legend>Entertainment</legend>
                <div className="selectable-grid cols-2">
                  {ENTERTAINMENT_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt}
                      title={opt}
                      multi
                      selected={selections.entertainment.includes(opt)}
                      onClick={() => toggleArrayItem('entertainment', opt)}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="build-fieldset">
                <legend>Food & Beverage</legend>
                <div className="selectable-grid">
                  {FOOD_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt}
                      title={opt}
                      selected={selections.foodAndBeverage === opt}
                      onClick={() => updateSelections({ foodAndBeverage: opt })}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="build-fieldset">
                <legend>Additional Experiences</legend>
                <div className="selectable-grid cols-2">
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <SelectableOption
                      key={opt}
                      title={opt}
                      multi
                      selected={selections.experiences.includes(opt)}
                      onClick={() => toggleArrayItem('experiences', opt)}
                    />
                  ))}
                </div>
              </fieldset>
            </section>
          )}

          {step === 7 && estimate && (
            <section className="estimate-section">
              <h2 className="step-title">Your Celebration</h2>
              <p className="estimate-summary">
                {selections.numberOfDays} Day{selections.numberOfDays !== '1' ? 's' : ''} ·{' '}
                {selections.guestRange} Guests · Goa
                {selections.month && selections.year
                  ? ` · ${selections.month} ${selections.year}`
                  : ''}
              </p>

              <div className="estimate-range">
                <p className="eyebrow">Estimated Investment</p>
                <p className="estimate-value">
                  {formatLakhsRange(estimate.minimum, estimate.maximum)}
                </p>
                <p className="estimate-disclaimer">
                  This is an initial planning estimate. Your final proposal will be tailored around
                  your venue, dates, design and specific requirements.
                </p>
              </div>

              <div className="estimate-breakdown">
                {(Object.keys(BREAKDOWN_LABELS) as (keyof typeof estimate.breakdown)[]).map(
                  (key) => {
                    const range = estimate.breakdown[key];
                    if (range.min === 0 && range.max === 0) return null;
                    return (
                      <div key={key} className="breakdown-row">
                        <span>{BREAKDOWN_LABELS[key]}</span>
                        <span>
                          {formatLakhs(range.min)} — {formatLakhs(range.max)}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>

              {!leadSubmitted ? (
                <form className="lead-capture" onSubmit={submitLead}>
                  <h3>Want the detailed version?</h3>
                  <p className="step-help">
                    Share your details and our team will turn your selections into a personalised
                    starting proposal.
                  </p>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="leadName">Your Name</label>
                      <input
                        id="leadName"
                        required
                        value={contact.name}
                        onChange={(e) => updateContact({ name: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="partner">Partner&apos;s Name</label>
                      <input
                        id="partner"
                        value={contact.partnerName}
                        onChange={(e) => updateContact({ partnerName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="leadPhone">Phone Number</label>
                      <input
                        id="leadPhone"
                        type="tel"
                        required
                        value={contact.phone}
                        onChange={(e) => updateContact({ phone: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="leadEmail">Email Address</label>
                      <input
                        id="leadEmail"
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => updateContact({ email: e.target.value })}
                      />
                    </div>
                  </div>

                  <fieldset className="build-fieldset">
                    <legend>Where are you currently based?</legend>
                    <div className="selectable-grid cols-2">
                      {(
                        ['Goa', 'Another Indian City', 'NRI', 'International'] as LocationType[]
                      ).map((loc) => (
                        <SelectableOption
                          key={loc}
                          title={loc}
                          selected={contact.location === loc}
                          onClick={() => updateContact({ location: loc })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="build-fieldset">
                    <legend>Preferred contact method</legend>
                    <div className="selectable-grid cols-3">
                      {(['WhatsApp', 'Phone', 'Email'] as ContactMethod[]).map((m) => (
                        <SelectableOption
                          key={m}
                          title={m}
                          selected={contact.preferredContactMethod === m}
                          onClick={() => updateContact({ preferredContactMethod: m })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="build-fieldset">
                    <legend>Best time to contact</legend>
                    <div className="selectable-grid cols-3">
                      {(['Morning', 'Afternoon', 'Evening'] as ContactTime[]).map((t) => (
                        <SelectableOption
                          key={t}
                          title={t}
                          selected={contact.preferredContactTime === t}
                          onClick={() => updateContact({ preferredContactTime: t })}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <div className="field">
                    <label htmlFor="leadMsg">Tell us anything important about your celebration.</label>
                    <textarea
                      id="leadMsg"
                      value={contact.message || ''}
                      onChange={(e) => updateContact({ message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!contact.location || !contact.preferredContactMethod}
                  >
                    Receive My Wedding Estimate
                  </Button>
                </form>
              ) : (
                <div className="lead-success">
                  <h3>Estimate received.</h3>
                  <p className="lede">
                    Our team will follow up with a personalised starting proposal. You can also book
                    a consultation now.
                  </p>
                  <div className="btn-group" style={{ marginTop: '1.5rem' }}>
                    <Button to="/book" variant="primary">
                      Book a Consultation
                    </Button>
                    <Button to="/" variant="secondary">
                      Back to Home
                    </Button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
        </div>

        {step < 7 && (
          <div className="build-nav">
            {step > 1 ? (
              <button type="button" className="btn btn-ghost build-nav-back" onClick={back}>
                Back
              </button>
            ) : (
              <Link to="/" className="btn btn-ghost build-nav-back">
                Close
              </Link>
            )}
            <Button variant="primary" className="build-nav-continue" onClick={next} disabled={!canContinue()}>
              Continue
            </Button>
          </div>
        )}

        {step === 7 && (
          <div className="build-nav">
            <button type="button" className="btn btn-ghost build-nav-back" onClick={back}>
              Edit
            </button>
            <Button to="/book" variant="primary" className="build-nav-continue">
              Book a Call
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
