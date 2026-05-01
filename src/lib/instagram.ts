/**
 * Instagram public profile fetcher via RapidAPI Instagram Scraper Stable API.
 * Replaces the unofficial web_profile_info endpoint (Vercel IPs were blocked).
 */

const RAPIDAPI_HOST = "instagram-scraper-stable-api.p.rapidapi.com";
const PROFILE_URL = `https://${RAPIDAPI_HOST}/ig_get_fb_profile.php`;
const POSTS_URL = `https://${RAPIDAPI_HOST}/get_ig_user_posts.php`;

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
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error("RAPIDAPI_KEY env var is missing");
  }

  const profileJson = await rapidPost(PROFILE_URL, clean, apiKey);
  const u = extractUser(profileJson);
  if (!u || !(u.username || u.full_name || u.follower_count != null)) {
    throw new Error(`Instagram user @${clean} not found`);
  }

  const recent_posts = await fetchRecentPosts(clean, apiKey).catch(() => []);

  return {
    username: u.username ?? clean,
    full_name: u.full_name ?? "",
    is_verified: Boolean(u.is_verified ?? u.verified),
    followers: u.follower_count ?? u.followers_count ?? u.followers ?? 0,
    following: u.following_count ?? u.following ?? 0,
    posts: u.media_count ?? u.posts_count ?? u.posts ?? 0,
    profile_pic_url:
      u.profile_pic_url_hd ??
      u.hd_profile_pic_url_info?.url ??
      u.profile_pic_url ??
      null,
    recent_posts,
  };
}

async function fetchRecentPosts(
  username: string,
  apiKey: string
): Promise<IgProfile["recent_posts"]> {
  const json = await rapidPost(POSTS_URL, username, apiKey);
  const items = extractPosts(json);
  return items.slice(0, 12).map((p) => {
    const captionText =
      typeof p.caption === "string"
        ? p.caption
        : p.caption?.text ?? "";
    return {
      id: String(p.id ?? p.pk ?? p.code ?? p.shortcode ?? ""),
      shortcode: String(p.code ?? p.shortcode ?? ""),
      likes: p.like_count ?? p.likes ?? 0,
      comments: p.comment_count ?? p.comments ?? 0,
      is_video: Boolean(p.is_video ?? p.media_type === 2),
      timestamp: p.taken_at ?? p.taken_at_timestamp ?? 0,
      caption: captionText.slice(0, 280),
    };
  });
}

async function rapidPost(
  url: string,
  username: string,
  apiKey: string
): Promise<unknown> {
  const body = new URLSearchParams({
    username_or_url: `https://www.instagram.com/${username}/`,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-rapidapi-host": RAPIDAPI_HOST,
      "x-rapidapi-key": apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `RapidAPI ${url} failed (${res.status}) for @${username}: ${text.slice(0, 200)}`
    );
  }

  return res.json();
}

function extractUser(json: unknown): RapidIgUser | null {
  if (!json || typeof json !== "object") return null;
  const j = json as Record<string, unknown>;
  if (j.user && typeof j.user === "object") return j.user as RapidIgUser;
  if (j.data && typeof j.data === "object") {
    const d = j.data as Record<string, unknown>;
    if (d.user && typeof d.user === "object") return d.user as RapidIgUser;
    return d as RapidIgUser;
  }
  return j as RapidIgUser;
}

function extractPosts(json: unknown): RapidIgPost[] {
  if (!json || typeof json !== "object") return [];
  const j = json as Record<string, unknown>;
  const candidates: unknown[] = [
    j.items,
    j.posts,
    j.data && (j.data as Record<string, unknown>).items,
    j.data && (j.data as Record<string, unknown>).posts,
    j.data && (j.data as Record<string, unknown>).edges,
    j.edges,
  ];
  for (const c of candidates) {
    if (Array.isArray(c)) {
      return c.map((e) => {
        if (e && typeof e === "object" && "node" in (e as object)) {
          return (e as { node: RapidIgPost }).node;
        }
        return e as RapidIgPost;
      });
    }
  }
  return [];
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

type RapidIgUser = {
  username?: string;
  full_name?: string;
  is_verified?: boolean;
  verified?: boolean;
  follower_count?: number;
  followers_count?: number;
  followers?: number;
  following_count?: number;
  following?: number;
  media_count?: number;
  posts_count?: number;
  posts?: number;
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
  hd_profile_pic_url_info?: { url?: string };
};

type RapidIgPost = {
  id?: string | number;
  pk?: string | number;
  code?: string;
  shortcode?: string;
  like_count?: number;
  likes?: number;
  comment_count?: number;
  comments?: number;
  is_video?: boolean;
  media_type?: number;
  taken_at?: number;
  taken_at_timestamp?: number;
  caption?: string | { text?: string };
};
