export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  names: string;
  title: string;
  quote: string;
}

export interface Milestone {
  date: string;
  label: string;
  detail: string;
}

/** FAQs adapted from current Goa Celebrations site topics. */
export const faqs: FaqItem[] = [
  {
    question: 'Why choose Goa Celebrations?',
    answer:
      'We are a personalised, end-to-end planning partner for destination and beach weddings in Goa — covering venue selection, décor and logistics so you can enjoy the celebration without the planning burden.',
  },
  {
    question: 'What services are included?',
    answer:
      'Destination wedding support can include venue selection, décor, catering coordination, entertainment, guest management and related planning services, tailored to your celebration.',
  },
  {
    question: 'How much does a destination wedding cost?',
    answer:
      'There is no single fixed price. Cost varies with venue, guest count and selected services. Use Build Your Celebration for an estimated range, then request a customised proposal.',
  },
  {
    question: 'Can you help with venue selection?',
    answer:
      'Yes. We help shortlist beachside resorts, luxury hotels and scenic venues across Goa, matched to your guest count, style and celebration shape.',
  },
  {
    question: 'Are wedding packages customisable?',
    answer:
      'Yes. Packages are tailored to your vision, style and budget — from intimate beach ceremonies to larger multi-day celebrations.',
  },
  {
    question: 'How early should we book?',
    answer:
      'We recommend approximately 6–12 months in advance. Shorter timelines may be accommodated subject to venue and vendor availability.',
  },
  {
    question: 'Do you manage guest accommodation and logistics?',
    answer:
      'Yes. Guest management can cover accommodation coordination, transportation and itineraries for destination wedding guests.',
  },
  {
    question: 'How experienced is the team?',
    answer:
      'Goa Celebrations has been planning events since 2010, with extensive destination-wedding experience and 1000+ events successfully managed.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    names: 'Priya & Arun Sharma',
    title: 'Beach wedding, Goa',
    quote:
      'Our beach wedding felt flawless — every detail was considered, personal and calm from start to finish.',
  },
  {
    id: '2',
    names: 'Meera & Rajiv Patel',
    title: 'Destination celebration',
    quote:
      'They understood our vision and turned it into a seamless destination celebration our guests still talk about.',
  },
  {
    id: '3',
    names: 'Ananya & Sameer Desai',
    title: 'Multi-day wedding',
    quote:
      'Attention to detail, warm hospitality and expert coordination made our Goa wedding feel effortless.',
  },
];

export const milestones: Milestone[] = [
  {
    date: 'October 2010',
    label: 'Founded',
    detail: 'Goa Celebrations begins as a destination and beach wedding planning studio.',
  },
  {
    date: 'August 2015',
    label: 'Recognition',
    detail: 'Recognised as a promising upcoming event-management agency.',
  },
  {
    date: 'May 2023',
    label: '1000+ Events',
    detail: 'Successfully managed over a thousand celebrations across Goa.',
  },
];

export const aboutContent = {
  headline: 'We turn your ideas into unforgettable events.',
  story: [
    'Goa Celebrations is a premium destination wedding planner focused on beach and destination weddings in Goa. Our experience helps turn your vision into reality — with particular expertise in seaside celebrations and an emphasis on a seamless, elegant and personalised experience.',
    'Our hospitality-experienced team enjoys the craft of celebration: conceiving, designing and executing events that feel considered for you and memorable for your guests.',
  ],
  mission:
    'To be one of India’s most reliable event-management teams — creating a genuine wow experience for clients and guests.',
  vision:
    'Provide 360-degree event-management solutions with complete client satisfaction, designing and executing celebrations that exceed objectives.',
};
