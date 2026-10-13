"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function onClick() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button onClick={onClick} variant="outline" size="md" leftIcon={<LogOut size={14} />}>
      Sign out
    </Button>
  );
}
