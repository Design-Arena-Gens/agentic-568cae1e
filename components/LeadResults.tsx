"use client";

import { useMemo } from "react";
import { useLeadStore } from "@/lib/useLeadStore";

function formatFollowers(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
}

function formatDate(dateIso: string | null): string {
  if (!dateIso) return "Not generated yet";
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short"
  }).format(new Date(dateIso));
}

export function LeadResults() {
  const results = useLeadStore((state) => state.results);
  const regenerate = useLeadStore((state) => state.regenerate);
  const lastGeneratedAt = useLeadStore((state) => state.lastGeneratedAt);
  const exportCsv = useLeadStore((state) => state.exportCsv);

  const totalPrime = useMemo(
    () => results.filter((item) => item.scoreLabel === "Prime").length,
    [results]
  );

  if (!results.length) {
    return (
      <section className="empty-state">
        <h3>Calibrate filters to scout new leads</h3>
        <p className="supporting">
          Tighten follower ranges, set the location or search for founder
          signals to surface high-intent early-stage brands.
        </p>
        <button className="button primary" onClick={regenerate}>
          Refresh
        </button>
      </section>
    );
  }

  return (
    <>
      <header className="header" style={{ marginTop: "2.8rem" }}>
        <div>
          <h2 className="title" style={{ fontSize: "1.8rem" }}>
            Qualified Lead Deck
          </h2>
          <p className="lead" style={{ fontSize: "0.92rem" }}>
            Ranked by cinematic storytelling opportunity. {totalPrime} leads
            identified as prime candidates for campaign development.
          </p>
        </div>
        <div>
          <p className="supporting" style={{ marginBottom: "0.6rem" }}>
            Last generated: <strong>{formatDate(lastGeneratedAt)}</strong>
          </p>
          <button
            className="export-button"
            onClick={() => {
              const csv = exportCsv();
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "lead-scout.csv";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }}
          >
            Export CSV
          </button>
        </div>
      </header>
      <div className="results-grid">
        {results.map((lead) => (
          <article key={lead.id} className="lead-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem"
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.9rem",
                    flexWrap: "wrap"
                  }}
                >
                  <h3 style={{ marginBottom: "0.3rem" }}>{lead.brand}</h3>
                  <div className="score-wrap">
                    <ScorePill value={lead.score} />
                    <span>{lead.scoreLabel}</span>
                  </div>
                </div>
                <a
                  className="handle"
                  href={`https://instagram.com/${lead.instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{lead.instagramHandle}
                </a>
              </div>
              <div style={{ textAlign: "right", fontSize: "0.9rem" }}>
                <div>{lead.location}</div>
                <div style={{ color: "var(--text-muted)" }}>
                  {lead.industry}
                </div>
              </div>
            </div>
            <div className="meta-row">
              <div className="meta-chip">
                Followers · {formatFollowers(lead.followers)}
              </div>
              <div className="meta-chip">
                Account age · {lead.ageInMonths.toFixed(1)} months
              </div>
              <div className="meta-chip">
                Posting cadence · {lead.postingCadence}
              </div>
              {lead.email && <div className="meta-chip">Email · {lead.email}</div>}
            </div>
            <ul className="signals">
              {lead.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
            <div className="supporting">
              <strong>Pitch move:</strong> {lead.pitchAngle}
            </div>
            <div className="supporting">
              <strong>Content cues:</strong> {lead.recentContent.join(" · ")}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ScorePill({ value }: { value: number }) {
  const scoreClass =
    value >= 70 ? "good" : value >= 50 ? "medium" : "low";

  return <span className={`score-value ${scoreClass}`}>{value}</span>;
}
