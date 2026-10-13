"use client";

import { useEffect } from "react";

// Le layout racine du site declare lang="en" ; les pages sponsor sont en francais.
export function LangueFr() {
  useEffect(() => {
    const racine = document.documentElement;
    const avant = racine.lang;
    racine.lang = "fr";
    return () => {
      racine.lang = avant;
    };
  }, []);
  return null;
}
