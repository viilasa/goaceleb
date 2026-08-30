import type { Lead } from './types';

const STORAGE_KEY = 'gc_leads';

export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function saveLead(lead: Lead): Lead {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === lead.id);
  if (index >= 0) leads[index] = lead;
  else leads.unshift(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return lead;
}

export function getLeadById(id: string): Lead | undefined {
  return getLeads().find((l) => l.id === id);
}

export function updateLead(id: string, patch: Partial<Lead>): Lead | null {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index < 0) return null;
  leads[index] = { ...leads[index], ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  return leads[index];
}
