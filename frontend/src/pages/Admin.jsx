import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { apiUrl } from "../services/api";
import "../styles/admin.css";

const ITEMS_PER_PAGE = 50;

const getAdminPassword = () => localStorage.getItem("adminPassword");

const clearAdminSession = () => {
  localStorage.removeItem("admin");
  localStorage.removeItem("adminPassword");
};

const Admin = () => {
  const [selectedGame, setSelectedGame] = useState("ALL");
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const adminPassword = getAdminPassword();

    if (!localStorage.getItem("admin") || !adminPassword) {
      window.location.href = "/admin-login";
      return;
    }

    fetch(apiUrl("/api/admin/registrations"), {
      headers: {
        "x-admin-password": adminPassword,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch admin data");
        }

        return data;
      })
      .then((data) => {
        setTeams(data.registrations || []);
      })
      .catch(() => {
        clearAdminSession();
        alert("Failed to fetch admin data. Please log in again.");
        window.location.href = "/admin-login";
      });
  }, []);

  const filteredTeams = useMemo(() => {
    return selectedGame === "ALL"
      ? teams
      : teams.filter((team) => team.game === selectedGame);
  }, [teams, selectedGame]);

  const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);

  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredTeams.slice(start, end);
  }, [filteredTeams, currentPage]);

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
    setCurrentPage(1);
  };

  const downloadCSV = async () => {
    const adminPassword = getAdminPassword();

    if (!adminPassword) {
      clearAdminSession();
      window.location.href = "/admin-login";
      return;
    }

    try {
      const res = await fetch(apiUrl("/api/admin/registrations/csv"), {
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      if (!res.ok) {
        alert("CSV download failed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "registrations.csv";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Error downloading CSV");
    }
  };

  const handleLogout = () => {
    clearAdminSession();

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
          <select value={selectedGame} onChange={handleGameChange}>
            <option value="ALL">All Games</option>
            <option value="Valorant">Valorant</option>
            <option value="BGMI">BGMI</option>
            <option value="Free Fire MAX">Free Fire MAX</option>
            <option value="Call of Duty Mobile">Call of Duty Mobile</option>
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
        <p style={{ color: "white" }}>No registrations found.</p>
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
              {paginatedTeams.map((team, index) => (
                <tr key={team._id}>
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>{team.teamName}</td>
                  <td>{team.teamLeaderName}</td>
                  <td>{team.game}</td>
                  <td>{team.contactEmail}</td>
                  <td>{team.contactPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
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
