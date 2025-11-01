"use client";

import { FilterPanel } from "@/components/FilterPanel";
import { LeadResults } from "@/components/LeadResults";
import { useLeadStore } from "@/lib/useLeadStore";

export default function Page() {
  const regenerate = useLeadStore((state) => state.regenerate);

  return (
    <main>
      <section className="app-shell">
        <header className="header">
          <div>
            <h1 className="title">Instagram Lead Scout</h1>
            <p className="lead">
              Autonomous B2B lead generation for early-stage founders on
              Instagram. Set your filters and receive a prioritized short-list
              of cinematic storytelling prospects ready for brand, campaign, and
              content support.
            </p>
          </div>
          <div className="supporting" style={{ maxWidth: "260px" }}>
            <strong>Scout heuristics</strong>
            <br />
            Founder signals · Reel consistency · Campaign readiness · Active
            CTA touchpoints
          </div>
        </header>
        <FilterPanel />
        <LeadResults />
      </section>
      <section style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <p className="supporting">
          Need a bespoke scouting sprint? Adjust filters, export the CSV, and
          reach out to pitch cinematic storytelling packages.
        </p>
        <button
          className="button secondary"
          style={{ marginTop: "1rem" }}
          onClick={regenerate}
        >
          Refresh Signal Scan
        </button>
      </section>
    </main>
  );
}
