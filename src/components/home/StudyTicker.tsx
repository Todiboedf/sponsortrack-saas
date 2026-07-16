import { Ticker } from "@/components/ui/Ticker";

/**
 * Broadcast-style metrics strip under the hero. Every figure comes from
 * the public CA Osasuna study — nothing invented, nothing estimated.
 */
const ITEMS = [
  "283 posts · 90 days",
  "9 accounts tracked",
  "Kosner 62% screen time · one highlight",
  "14× TikTok vs Instagram audience",
  "26:14 logo-seconds · one highlight",
  "€5.84M EMV · 30 days",
  "Report every Monday · 07:00",
  "1 founder · 0 clients · public study",
];

export function StudyTicker() {
  return <Ticker items={ITEMS} />;
}
