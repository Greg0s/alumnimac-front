import { useState, useEffect } from "react";
import "app/styles/filters.scss";

export default function Filters({ onFiltersChange }) {
  const [filterType, setFilterType] = useState("all");
  const [filterDomain, setFilterDomain] = useState("all");
  const [filterPaid, setFilterPaid] = useState("all");
  const [filterAbroad, setFilterAbroad] = useState("all");
  const [filterWorkMode, setFilterWorkMode] = useState("all");

  useEffect(() => {
    const filters = {
      filterType,
      filterDomain,
      filterPaid,
      filterAbroad,
      filterWorkMode,
    };
    onFiltersChange(filters);
  }, [filterType, filterDomain, filterPaid, filterAbroad, filterWorkMode]);

  return (
    <div className="search-filters">
      {/* TYPE */}
      <div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tout type</option>
          <option value="internship">Stage</option>
          <option value="job">Emploi</option>
          <option value="other">Autre</option>
        </select>
      </div>

      {/* DOMAIN */}
      <div>
        <select
          value={filterDomain}
          onChange={(e) => setFilterDomain(e.target.value)}
        >
          <option value="all">Tout domaine</option>
          <option value="audiovisual">Audiovisuel</option>
          <option value="graphic-design">Graphisme</option>
          <option value="project-management">Gestion de projet</option>
          <option value="programming">Programmation</option>
          <option value="web-dev">Dev web / mobile</option>
          <option value="other">Autre</option>
        </select>
      </div>

      {/* PAID? */}
      <div>
        <select
          value={filterPaid}
          onChange={(e) => setFilterPaid(e.target.value)}
        >
          <option value="all">Tout</option>
          <option value="true">Rémunérée</option>
          <option value="false">Non-rémunérée</option>
        </select>
      </div>

      {/* ABROAD? */}
      <div>
        <select
          value={filterAbroad}
          onChange={(e) => setFilterAbroad(e.target.value)}
        >
          <option value="all">Partout</option>
          <option value="true">À l'étranger</option>
          <option value="false">En France</option>
        </select>
      </div>

      {/* WORK MODE */}
      <div>
        <select
          value={filterWorkMode}
          onChange={(e) => setFilterWorkMode(e.target.value)}
        >
          <option value="all">Tout</option>
          <option value="on_site">Présentiel</option>
          <option value="remote">Distantiel</option>
          <option value="hybrid">Hybride</option>
        </select>
      </div>
    </div>
  );
}
