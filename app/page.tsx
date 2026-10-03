import { getCurrentOrg } from "@/lib/org";
import { OrgSync } from "@/components/org-sync";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function WorkspacePage() {
  const currentOrg = await getCurrentOrg();

  // Construct database client with token attached
  const supabase = await createSupabaseServerClient();
  void supabase;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-4xl font-sans">
      <OrgSync targetOrgId={currentOrg?.id || null} />

      <div className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-lg font-mono font-semibold tracking-tight">Workspace</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          Phase 1 — Auth & Organization Context
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 font-mono text-xs">
          <div className="text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
            Current Organization (Server Rendered)
          </div>
          {currentOrg ? (
            <div className="flex flex-col gap-1.5">
              <div>
                <span className="text-zinc-400">Name:</span>{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{currentOrg.name}</span>
              </div>
              <div>
                <span className="text-zinc-400">ID:</span>{" "}
                <span className="text-zinc-700 dark:text-zinc-300">{currentOrg.id}</span>
              </div>
              <div>
                <span className="text-zinc-400">Slug:</span>{" "}
                <span className="text-zinc-700 dark:text-zinc-300">{currentOrg.slug || "—"}</span>
              </div>
              {currentOrg.role && (
                <div>
                  <span className="text-zinc-400">Role:</span>{" "}
                  <span className="text-zinc-700 dark:text-zinc-300">{currentOrg.role}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-amber-500">No active organization resolved.</div>
          )}
        </div>

        <div className="rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 font-mono text-xs">
          <div className="text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider text-[10px]">
            Database Client Connection
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">
            ✓ Supabase client initialized
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
            Identity JWT carrying organization claims is attached to headers on every request.
          </p>
        </div>
      </div>
    </div>
  );
}
