/**
 * Instagram public profile fetcher.
 * Uses the unofficial /api/v1/users/web_profile_info endpoint.
 * No auth required — works for public profiles only. Rate-limited per IP.
 * Vercel egress IPs are sometimes blocked; the cron handles failures gracefully.
 */

const IG_APP_ID = "936619743392459";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export type IgProfile = {
  username: string;
  full_name: string;
  is_verified: boolean;
  followers: number;
  following: number;
  posts: number;
  profile_pic_url: string | null;
  recent_posts: Array<{
    id: string;
    shortcode: string;
    likes: number;
    comments: number;
    is_video: boolean;
    timestamp: number;
    caption: string;
  }>;
};

export async function fetchInstagramProfile(handle: string): Promise<IgProfile> {
  const clean = handle.replace(/^@/, "").trim().toLowerCase();
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(
    clean
  )}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      "x-ig-app-id": IG_APP_ID,
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Instagram fetch failed (${res.status}) for @${clean}`);
  }

  const json = (await res.json()) as { data?: { user?: IgUserNode } };
  const u = json?.data?.user;
  if (!u) throw new Error(`Instagram user @${clean} not found`);

  const recent_posts = (u.edge_owner_to_timeline_media?.edges || [])
    .slice(0, 12)
    .map((e) => ({
      id: e.node.id,
      shortcode: e.node.shortcode,
      likes: e.node.edge_liked_by?.count ?? e.node.edge_media_preview_like?.count ?? 0,
      comments: e.node.edge_media_to_comment?.count ?? 0,
      is_video: !!e.node.is_video,
      timestamp: e.node.taken_at_timestamp ?? 0,
      caption:
        e.node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 280) ?? "",
    }));

  return {
    username: u.username,
    full_name: u.full_name ?? "",
    is_verified: !!u.is_verified,
    followers: u.edge_followed_by?.count ?? 0,
    following: u.edge_follow?.count ?? 0,
    posts: u.edge_owner_to_timeline_media?.count ?? 0,
    profile_pic_url: u.profile_pic_url_hd ?? u.profile_pic_url ?? null,
    recent_posts,
  };
}

/**
 * Compute daily KPIs from a freshly fetched profile.
 * EMV uses an industry-standard $0.05–$0.10 per engagement; we pick $0.07.
 */
export function computeKpis(p: IgProfile) {
  const recent = p.recent_posts;
  const totalLikes = recent.reduce((s, r) => s + r.likes, 0);
  const totalComments = recent.reduce((s, r) => s + r.comments, 0);
  const engagements = totalLikes + totalComments;

  const engagement_rate =
    p.followers > 0 && recent.length > 0
      ? +((engagements / recent.length / p.followers) * 100).toFixed(3)
      : 0;

  // EMV ≈ engagements × $0.07 (very rough; UI labels it "estimated")
  const emv = +(engagements * 0.07).toFixed(2);

  return {
    followers: p.followers,
    posts: p.posts,
    likes: totalLikes,
    comments: totalComments,
    engagement_rate,
    emv,
  };
}

type IgUserNode = {
  username: string;
  full_name?: string;
  is_verified?: boolean;
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
  edge_followed_by?: { count: number };
  edge_follow?: { count: number };
  edge_owner_to_timeline_media?: {
    count: number;
    edges?: Array<{ node: IgPostNode }>;
  };
};

type IgPostNode = {
  id: string;
  shortcode: string;
  is_video?: boolean;
  taken_at_timestamp?: number;
  edge_liked_by?: { count: number };
  edge_media_preview_like?: { count: number };
  edge_media_to_comment?: { count: number };
  edge_media_to_caption?: {
    edges?: Array<{ node: { text: string } }>;
  };
};
