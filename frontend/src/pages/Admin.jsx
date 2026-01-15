import React, { useEffect, useState, useMemo } from "react";
import "../styles/admin.css";
import { toast } from "react-hot-toast";

const ITEMS_PER_PAGE = 50;

const Admin = () => {
  const [selectedGame, setSelectedGame] = useState("ALL");
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔒 Auth check + fetch registrations
  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      window.location.href = "/admin-login";
      return;
    }

    fetch("http://localhost:5000/api/admin/registrations", {
      headers: {
        "x-admin-password": "supersecretadmin123",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTeams(data.registrations);
        }
      })
      .catch(() => {
        alert("Failed to fetch admin data");
      });
  }, []);

  // 🔄 Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGame]);

  // 🎯 Filter logic
  const filteredTeams = useMemo(() => {
    return selectedGame === "ALL"
      ? teams
      : teams.filter((t) => t.game === selectedGame);
  }, [teams, selectedGame]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);

  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredTeams.slice(start, end);
  }, [filteredTeams, currentPage]);

  // 📊 CSV download
  const downloadCSV = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/registrations/csv",
        {
          headers: {
            "x-admin-password": "supersecretadmin123",
          },
        }
      );

      if (!res.ok) {
        alert("CSV download failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "registrations.csv";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Error downloading CSV");
    }
  };

  // 🚪 Logout
 const handleLogout = () => {
  localStorage.removeItem("admin");

  toast.success("Logged out successfully", {
    duration: 2000,
  });

  setTimeout(() => {
    window.location.href = "/admin-login";
  }, 600);
};


  return (
    <div className="admin-container page-container">
      <div className="admin-header">
        <div className="filter-bar">
          <label>Filter by Game:</label>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="ALL">All Games</option>
            <option value="Valorant">Valorant</option>
            <option value="BGMI">BGMI</option>
            <option value="Free Fire MAX">Free Fire MAX</option>
            <option value="Call of Duty Mobile">
              Call of Duty Mobile
            </option>
          </select>
        </div>

        <h2>Admin Dashboard</h2>

        <div className="admin-actions">
          <button onClick={downloadCSV}>Download CSV</button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {filteredTeams.length === 0 ? (
        <p style={{color:"white"}}>No registrations found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Leader</th>
                <th>Game</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTeams.map((t, index) => (
                <tr key={t._id}>
                  <td>
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td>{t.teamName}</td>
                  <td>{t.teamLeaderName}</td>
                  <td>{t.game}</td>
                  <td>{t.contactEmail}</td>
                  <td>{t.contactPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
