export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  league: string;
  logoSrc?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Before SponsorTrack, our Monday meeting started with three tabs of Excel. Now it starts with a number.",
    author: "Director, Commercial",
    role: "Commercial Director",
    league: "Top-5 European league (placeholder)",
  },
  {
    quote:
      "The board asked for one defensible number per sponsor, per match. Guillaume shipped four. Each one stands up to the auditor.",
    author: "Head of Sponsorships",
    role: "Head of Sponsorships",
    league: "LaLiga club (placeholder)",
  },
  {
    quote:
      "Renewal cycle used to mean six PDFs and a fight. Now the sponsor opens the portal Monday morning and the conversation is half-done.",
    author: "Partnerships Director",
    role: "Partnerships Director",
    league: "Top-flight European club (placeholder)",
  },
];
