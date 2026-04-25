export type Sponsor = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  instagram_handle: string | null;
  tiktok_handle: string | null;
  twitter_handle: string | null;
  industry: string | null;
  country: string | null;
  notes: string | null;
  created_at: string;
};

export type Platform = "instagram" | "tiktok" | "twitter" | "youtube" | "facebook";

export type SponsorKpiDaily = {
  id: string;
  sponsor_id: string;
  platform: Platform;
  date: string;
  followers: number | null;
  posts: number | null;
  likes: number | null;
  comments: number | null;
  shares: number | null;
  reach: number | null;
  impressions: number | null;
  engagement_rate: number | null;
  emv: number | null;
  created_at: string;
};
