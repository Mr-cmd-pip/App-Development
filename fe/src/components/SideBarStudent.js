
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Mail as MailIcon,
  Group as GroupIcon,
  CalendarToday as CalendarIcon,
  HelpOutline as HelpIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export default function SideBarStudent() {
  const goTo = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: <HomeIcon />, label: "Home", path: "/student-dashboard" },
    {
      icon: <MailIcon />,
      label: "Book ",
      path: "/student-book",
    },
    { icon: <CalendarIcon />, label: " Appointments" },
    { icon: <SettingsIcon />, label: "Settings" },
    { icon: <LogoutIcon />, label: "Logout", path: "/"}
  ];

  const sidebarStyle = {
    backgroundColor: "#1f2937", // bg-gray-800
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s",
    width: isExpanded ? "16rem" : "5rem",
    height: "100vh",
  };

  const topBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: isExpanded ? "space-between" : "center",
    padding: "1rem",
    borderBottom: "1px solid #374151", // border-gray-700
  };

  const buttonStyle = {
    padding: "0.5rem",
    borderRadius: "9999px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#ccc",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const listItemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1rem",
    color: "#d1d5db", // text-gray-300
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const listItemHoverStyle = {
    backgroundColor: "#374151", // hover:bg-gray-700
  };

  const mainContentStyle = {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#f3f4f6", // bg-gray-100
    height: "100vh",
    overflowY: "auto",
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#1f2937" }}>
      <div style={sidebarStyle}>
        <div style={topBarStyle}>
          {isExpanded ? (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MenuIcon />
              <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                ETOAS
              </span>
            </div>
          ) : (
            <MenuIcon />
          )}
          <button
            onClick={toggleSidebar}
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#374151")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {isExpanded ? (
              <ChevronLeft fontSize="small" />
            ) : (
              <ChevronRight fontSize="small" />
            )}
          </button>
        </div>

        <div style={{ flex: 1, padding: "1rem 0" }}>
          <ul style={listStyle}>
            {menuItems.map((item, index) => (
              <li
                onClick={() => {
                  if (item.path) {
                    goTo(item.path);
                  }
                }}
                key={index}
                style={{
                  ...listItemStyle,
                  justifyContent: isExpanded ? "flex-start" : "center",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#374151")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div>{item.icon}</div>
                {isExpanded && (
                  <span style={{ marginLeft: "0.75rem" }}>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div style={mainContentStyle}>
        <h1
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}
        >
          Main Content
        </h1>
        <p style={{ marginTop: "1rem", color: "#4b5563" }}>
          Click the arrow button in the sidebar to toggle between expanded and
          collapsed views.
        </p>
      </div> */}
    </div>
  );

}
