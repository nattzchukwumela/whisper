import { categories } from "@/lib/interacts";

const Sidebar = ({ activeFilter, onFilterChange }) => {
  const allCategories = [
    { name: "all", emoji: "🌟", label: "All Messages" },
    ...categories.map((cat) => ({ ...cat, label: cat.name })),
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <span className="app-icon">💭</span>
          Anonymous
        </h2>
        <p className="sidebar-subtitle">Share your thoughts freely</p>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="filter-list">
          {allCategories.map((category) => (
            <button
              key={category.name}
              className={`filter-item ${activeFilter === category.name ? "active" : ""}`}
              onClick={() => onFilterChange(category.name)}
            >
              <span className="filter-emoji">{category.emoji}</span>
              <span className="filter-label">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h3 className="stats-title">Community Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">2.1K</div>
            <div className="stat-label">Messages Today</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">45K</div>
            <div className="stat-label">Total Messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
