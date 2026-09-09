export interface WeddingMoment {
  id: string;
  title: string;
  description: string;
  image: string;
  size?: 'large' | 'medium' | 'small';
}

/** Home gallery — real celebration moments with short captions (no story pages). */
export const weddingMoments: WeddingMoment[] = [
  {
    id: '1',
    title: 'Beachside Floral Mandap',
    description:
      'A pastel floral mandap on the sand — white, blush and peach blooms framed by the Goa shoreline.',
    image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1788104303/1_copty_foqajm.jpg',
    size: 'large',
  },
  {
    id: '2',
    title: 'Ceremony Under the Mandap',
    description:
      'Garlanding at the seaside mandap — soft florals, falling petals and the ocean as backdrop.',
    image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1788103958/coppopyf_mpfazc.jpg',
    size: 'medium',
  },
  {
    id: '3',
    title: 'Haldi Celebration',
    description:
      'A joyful outdoor Haldi in yellow and gold — family, florals and festive energy under the palms.',
    image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1788103994/DSC_9221_xg1o0m.jpg',
    size: 'medium',
  },
  {
    id: '4',
    title: 'Venue by the Sea, Goa',
    description:
      'Coastal light and open sand — the kind of Goa venue made for destination celebrations.',
    image: 'https://res.cloudinary.com/ddhhlkyut/image/upload/v1788103862/2_duarq2.jpg',
    size: 'small',
  },
];
