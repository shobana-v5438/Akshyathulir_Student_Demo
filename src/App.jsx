import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Box, CssBaseline, Toolbar, List, Typography, ListItemButton, ListItemIcon, ListItemText, Collapse, ThemeProvider, IconButton } from "@mui/material";
import { GraduationCap } from 'lucide-react';
import { ExpandLess, ExpandMore, Dashboard as DashboardIcon, Person, School, Work, EmojiEvents, Groups, Settings, Folder } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import theme from "./theme";
import Dashboard from "./dashboard";
import Profile from "./Profile.jsx";
import { ApplicationsListPage, GrantsPage, FundingPage, ApplicationDetailPage, ApplicationModal } from "./MyApplications";
import StudentNetwork from "./studentNetwork.jsx";
import Internships from "./pages/Career/Internships";
import ApplyForm from './pages/Career/IntershipApplyForm.jsx';
import StartupProjects from "./pages/Career/Projects.jsx";
import ProjectApplyForm from './pages/Career/ProjectApplyForm';
import ProjectDetail from "./pages/Career/ProjectDetail";
import PartTimeJobs from "./pages/Career/PartTimeJobs";
import JobDetail from "./pages/Career/JobDetail";
import JobApplyForm from './pages/Career/JobApplyForm';
import InternshipDetail from "./pages/Career/InternshipDetail";
import { MyCourses, AdditionalSkills, Certifications } from "./learning.jsx";

// CORRECTED IMPORTS
import { HackathonsPage } from "./CompetitionsHackathons/Hackathon.jsx";
import { CompetitionsPage } from "./CompetitionsHackathons/competition.jsx";

const drawerWidth = 280;

const menuStructure = [
  { text: "Dashboard", icon: <DashboardIcon />, type: "single", path: "/dashboard" },
  { text: "Profile", icon: <Person />, type: "single", path: "/profile" },
  { text: "Learning", icon: <School />, type: "nested", children: [{ text: "My Courses", path: "/learning/my-courses" }, { text: "Skill Development", path: "/learning/skills" }, { text: "Certifications", path: "/learning/certifications" }] },
  { text: "Career", icon: <Work />, type: "nested", children: [{ text: "Internships", path: "/career/internships" }, { text: "Projects", path: "/career/startups" }, { text: "Part-time Jobs", path: "/career/jobs" }] },
  { text: 'Applications', icon: <Folder />, type: "nested", children: [{ text: "My Applications", path: "/applications/list" }, { text: "Student Grants", path: "/applications/grants" }, { text: "Project Funding", path: "/applications/funding" }] },
  { text: "Competitions", icon: <EmojiEvents />, type: "nested", children: [{ text: "Hackathons", path: "/competitions/hackathons" }, { text: "Competitions", path: "/competitions/list" }] },
  { text: "Network", icon: <Groups />, type: "nested", children: [{ text: "Mentorship", path: "/network/mentorship" }, { text: "Events", path: "/network/events" }, { text: "Discussion Forum", path: "/network/forum" }] },
  { text: "Settings", icon: <Settings />, type: "single", path: "/settings" },
];

function NavItem({ item, openMenus, handleToggle, sidebarOpen }) {
  const location = useLocation();
  const isNested = item.type === "nested";
  return (
    <>
      <ListItemButton component={!isNested ? Link : "div"} to={!isNested ? item.path : undefined} onClick={() => isNested && sidebarOpen && handleToggle(item.text)} sx={{ justifyContent: sidebarOpen ? "flex-start" : "center", px: 2, mx: 1, borderRadius: 2 }}>
        <ListItemIcon sx={{ color: "white", minWidth: 40 }}>{item.icon}</ListItemIcon>
        {sidebarOpen && <ListItemText primary={item.text} />}
        {isNested && sidebarOpen && (openMenus[item.text] ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {isNested && sidebarOpen && (
        <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children.map((sub) => (
              <ListItemButton key={sub.text} component={Link} to={sub.path} selected={location.pathname === sub.path} sx={{ pl: 7, py: 0.5, mx: 1, borderRadius: 2, "&.Mui-selected": { color: "#81c784" } }}>
                <ListItemText primary={sub.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function Header() {
  return (
    <Box sx={{ bgcolor: "#1f4d3a", color: "white", p: 1, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
      <Typography variant="h5">Student Dashboard</Typography>
      <Box><IconButton color="inherit"><AccountCircleIcon /></IconButton><IconButton color="inherit"><LogoutIcon /></IconButton></Box>
    </Box>
  );
}

export default function App() {
  const [openMenus, setOpenMenus] = useState({});
  const [selectedGrantCategory, setSelectedGrantCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewState, setViewState] = useState('list');
  const [skillEntries, setSkillEntries] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Applications');

  const toggleMenu = (key) => setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  const addSkill = (newSkills) => setSkillEntries((prev) => [...newSkills, ...prev]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box onMouseEnter={() => setSidebarOpen(true)} onMouseLeave={() => setSidebarOpen(false)} sx={{ width: sidebarOpen ? 280 : 70, height: "100vh", bgcolor: "#163f36", color: "white", position: "fixed", top: 0, left: 0, display: "flex", flexDirection: "column", transition: "width 0.3s", zIndex: 1200 }}>
            <Toolbar sx={{ justifyContent: sidebarOpen ? "flex-start" : "center", px: 2 }}><GraduationCap size={32} color="#81c784" />{sidebarOpen && <Typography variant="h6" sx={{ ml: 2 }}>STUDENT</Typography>}</Toolbar>
            <List sx={{ flexGrow: 1, pt: 2 }}>{menuStructure.map((item) => <NavItem key={item.text} item={item} openMenus={openMenus} handleToggle={toggleMenu} sidebarOpen={sidebarOpen} />)}</List>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: "#f5f5f5", ml: sidebarOpen ? "280px" : "70px", transition: "margin 0.3s" }}>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learning/my-courses" element={<MyCourses />} />
              <Route path="/learning/certifications" element={<Certifications skillCertificates={skillEntries} />} />
              <Route path="/learning/skills" element={<AdditionalSkills entries={skillEntries} onAddSkill={addSkill} />} />
              <Route path="/career/internships" element={<Internships />} />
              <Route path="/apply/:id" element={<ApplyForm />} />
              <Route path="/project-apply/:id" element={<ProjectApplyForm />} />
              <Route path="/internship/:id" element={<InternshipDetail />} />
              <Route path="/career/startups" element={<StartupProjects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/career/jobs" element={<PartTimeJobs />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/job-apply/:id" element={<JobApplyForm />} />
              <Route path="/applications/list" element={viewState === 'list' ? <ApplicationsListPage setActiveTab={setActiveTab} setSelectedItem={setSelectedItem} setViewState={setViewState} /> : <ApplicationDetailPage selectedItem={selectedItem} setViewState={setViewState} />} />
              <Route path="/applications/grants" element={<GrantsPage selectedGrantCategory={selectedGrantCategory} setSelectedGrantCategory={setSelectedGrantCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSelectedItem={setSelectedItem} setViewState={setViewState} />} />
              <Route path="/applications/funding" element={<FundingPage setSelectedItem={setSelectedItem} setViewState={setViewState} />} />
              <Route path="/competitions/hackathons" element={<HackathonsPage />} />
              <Route path="/competitions/list" element={<CompetitionsPage />} />
              <Route path="/network/mentorship" element={<StudentNetwork initialView="Mentorship" />} />
              <Route path="/network/events" element={<StudentNetwork initialView="Events" />} />
              <Route path="/network/forum" element={<StudentNetwork initialView="Discussion Forum" />} />
            </Routes>
            {(viewState === 'apply' || viewState === 'request') && <ApplicationModal viewState={viewState} setViewState={setViewState} selectedItem={selectedItem} />}
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}