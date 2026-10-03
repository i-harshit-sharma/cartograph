"use client";

import { useEffect } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";

export function OrgSync({ targetOrgId }: { targetOrgId: string | null }) {
  const { orgId, isLoaded } = useAuth();
  const { setActive } = useClerk();

  useEffect(() => {
    if (isLoaded && targetOrgId && orgId !== targetOrgId && setActive) {
      setActive({ organization: targetOrgId }).catch((err) => {
        console.error("Failed to set active organization in session:", err);
      });
    }
  }, [isLoaded, orgId, targetOrgId, setActive]);

  return null;
}
