import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CelebrationSelections, EstimateResult, LeadContact } from '../lib/types';
import { calculateEstimate } from '../lib/pricing';

const defaultSelections: CelebrationSelections = {
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
  accommodationNights: 2,
  guestExperience: [],
  photography: '',
  entertainment: [],
  foodAndBeverage: '',
  experiences: [],
  packagePreference: '',
};

const defaultContact: LeadContact = {
  name: '',
  partnerName: '',
  phone: '',
  email: '',
  location: '',
  preferredContactMethod: '',
  preferredContactTime: '',
  message: '',
};

interface CelebrationContextValue {
  step: number;
  setStep: (n: number) => void;
  selections: CelebrationSelections;
  updateSelections: (patch: Partial<CelebrationSelections>) => void;
  toggleArrayItem: (
    key: 'events' | 'guestExperience' | 'entertainment' | 'experiences',
    value: string,
  ) => void;
  estimate: EstimateResult | null;
  contact: LeadContact;
  updateContact: (patch: Partial<LeadContact>) => void;
  reset: () => void;
  leadId: string | null;
  setLeadId: (id: string | null) => void;
}

const CelebrationContext = createContext<CelebrationContextValue | null>(null);

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<CelebrationSelections>(defaultSelections);
  const [contact, setContact] = useState<LeadContact>(defaultContact);
  const [leadId, setLeadId] = useState<string | null>(null);

  const estimate = useMemo(() => {
    if (!selections.guestRange || !selections.numberOfDays) return null;
    return calculateEstimate(selections);
  }, [selections]);

  const updateSelections = (patch: Partial<CelebrationSelections>) => {
    setSelections((prev) => ({ ...prev, ...patch }));
  };

  const toggleArrayItem = (
    key: 'events' | 'guestExperience' | 'entertainment' | 'experiences',
    value: string,
  ) => {
    setSelections((prev) => {
      const list = prev[key];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [key]: next };
    });
  };

  const updateContact = (patch: Partial<LeadContact>) => {
    setContact((prev) => ({ ...prev, ...patch }));
  };

  const reset = () => {
    setStep(1);
    setSelections(defaultSelections);
    setContact(defaultContact);
    setLeadId(null);
  };

  return (
    <CelebrationContext.Provider
      value={{
        step,
        setStep,
        selections,
        updateSelections,
        toggleArrayItem,
        estimate,
        contact,
        updateContact,
        reset,
        leadId,
        setLeadId,
      }}
    >
      {children}
    </CelebrationContext.Provider>
  );
}

export function useCelebration() {
  const ctx = useContext(CelebrationContext);
  if (!ctx) throw new Error('useCelebration must be used within CelebrationProvider');
  return ctx;
}
