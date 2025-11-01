/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, FormEvent, useEffect } from "react";
import { useLeadStore } from "@/lib/useLeadStore";

const activityOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "any", label: "Any cadence" }
] as const;

export function FilterPanel() {
  const filters = useLeadStore((state) => state.filters);
  const updateFilters = useLeadStore((state) => state.updateFilters);
  const regenerate = useLeadStore((state) => state.regenerate);
  const resetFilters = useLeadStore((state) => state.resetFilters);

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "minFollowers" || name === "maxFollowers") {
      updateFilters({
        [name]: value === "" ? null : Number(value)
      });
      return;
    }

    if (name === "maxAccountAgeMonths") {
      updateFilters({ maxAccountAgeMonths: Number(value) });
      return;
    }

    updateFilters({ [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    regenerate();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="e.g. London, USA, Berlin"
            value={filters.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="industry">Industry</label>
          <input
            id="industry"
            name="industry"
            placeholder="e.g. fashion, wellness, F&B"
            value={filters.industry}
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="minFollowers">Min Followers</label>
          <input
            id="minFollowers"
            name="minFollowers"
            type="number"
            min={0}
            placeholder="e.g. 1000"
            value={filters.minFollowers ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="maxFollowers">Max Followers</label>
          <input
            id="maxFollowers"
            name="maxFollowers"
            type="number"
            min={0}
            placeholder="e.g. 15000"
            value={filters.maxFollowers ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="maxAccountAgeMonths">Account Age (max months)</label>
          <input
            id="maxAccountAgeMonths"
            name="maxAccountAgeMonths"
            type="number"
            min={1}
            max={18}
            value={filters.maxAccountAgeMonths}
            onChange={handleInputChange}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="recentActivity">Recent Activity</label>
          <select
            id="recentActivity"
            name="recentActivity"
            value={filters.recentActivity}
            onChange={handleInputChange}
          >
            {activityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="searchTerm">Keyword Search</label>
          <input
            id="searchTerm"
            name="searchTerm"
            placeholder="Search brand, signal, or pitch angle"
            value={filters.searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="filter-actions">
        <button className="button primary" type="submit">
          Generate Lead List
        </button>
        <button
          className="button secondary"
          type="button"
          onClick={() => {
            resetFilters();
            regenerate();
          }}
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
}
