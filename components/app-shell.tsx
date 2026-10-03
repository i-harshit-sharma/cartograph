import { OrganizationSwitcher, UserButton, Show } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased text-sm">
      <header className="h-12 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-4">
          <span className="font-mono font-semibold text-xs tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
            Cartograph
          </span>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <Show when="signed-in">
            <OrganizationSwitcher
              hidePersonal={true}
              afterSelectOrganizationUrl="/"
              afterCreateOrganizationUrl="/"
              afterLeaveOrganizationUrl="/"
              appearance={{
                elements: {
                  rootBox: "flex items-center",
                  organizationSwitcherTrigger: "font-mono text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100",
                },
              }}
            />
          </Show>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                },
              }}
            />
          </Show>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-auto">
        {children}
      </main>
    </div>
  );
}
