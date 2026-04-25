import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SEED_SPONSORS = [
  {
    name: "Nike",
    slug: "nike",
    instagram_handle: "nike",
    industry: "Sportswear",
    country: "US",
  },
  {
    name: "Adidas",
    slug: "adidas",
    instagram_handle: "adidas",
    industry: "Sportswear",
    country: "DE",
  },
  {
    name: "Red Bull",
    slug: "redbull",
    instagram_handle: "redbull",
    industry: "Beverages",
    country: "AT",
  },
  {
    name: "Macron",
    slug: "macron",
    instagram_handle: "macronsports",
    industry: "Sportswear",
    country: "IT",
  },
  {
    name: "Emirates",
    slug: "emirates",
    instagram_handle: "emirates",
    industry: "Aviation",
    country: "AE",
  },
];

function isAuthorized(req: Request): boolean {
  const auth = req.headers.get("authorization") ?? "";
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("sponsors")
    .upsert(SEED_SPONSORS, { onConflict: "slug" })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inserted: data?.length ?? 0, sponsors: data });
}
