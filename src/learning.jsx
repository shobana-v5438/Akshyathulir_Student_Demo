import React, { useState } from "react";

import {
  Box,
  Drawer, AppBar, Toolbar, Typography, TextField, Dialog, DialogContent, List, ListItemButton, ListItemText,
  ListItemIcon, Collapse, Card, CardContent, Divider, Grid, IconButton, Avatar, Button, LinearProgress, Chip, Stack
} from "@mui/material";

import { CloudUpload, Add, Close, Verified, WorkspacePremium, ArrowBack } from '@mui/icons-material';

import {
  ExpandLess, ExpandMore, Menu, Dashboard, Person, School, Work, Assignment, EmojiEvents, Group, Notifications, Storage, Settings
} from "@mui/icons-material";

const drawerWidth = 260;
const PRIMARY_COLOR = "#1a3d35";
const BACKGROUND_COLOR = "#f7fff7";

const FIXED_CARD_WIDTH = 350;
const FIXED_CARD_HEIGHT = 330;

export default function App() {

  const [open, setOpen] = useState({
    learning: false,
    career: false,
    applications: false,
    competitions: false,
    network: false
  });

  const [view, setView] = useState("my-courses");

  const [skillEntries, setSkillEntries] = useState([]);

  const toggle = (key) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const addSkill = (newSkills) => {
    setSkillEntries((prev) => [...newSkills, ...prev]);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: BACKGROUND_COLOR, minHeight: "100vh" }}>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            backgroundColor: PRIMARY_COLOR,
            color: "white",
            borderRight: "none"
          }
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight="bold">🎓 Student Panel</Typography>
        </Toolbar>

        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => setView("registration")}>
            <ListItemIcon sx={{ color: "white" }}><Person /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              toggle("learning");
              setView("learning-hub"); // Set the main view to the new Hub
            }}
          >
            <ListItemIcon sx={{ color: "white" }}><School /></ListItemIcon>
            <ListItemText primary="Learning" />
            {open.learning ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.learning} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                "My Courses",
                "Additional Skills",
                "Certifications"
              ].map((text) => (
                <ListItemButton
                  key={text}
                  sx={{ pl: 9 }}
                  onClick={() => {
                    if (text === "My Courses") setView("my-courses");
                    else if (text === "Additional Skills") setView("additional-skills");
                    else if (text === "Certifications") setView("certifications");
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => toggle("career")}>
            <ListItemIcon sx={{ color: "white" }}><Work /></ListItemIcon>
            <ListItemText primary="Career" />
            {open.career ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.career} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["Internships", "Startup Projects", "Part-time Jobs"].map((text) => (
                <ListItemButton key={text} sx={{ pl: 9 }} onClick={() => setView("other")}>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => toggle("applications")}>
            <ListItemIcon sx={{ color: "white" }}><Assignment /></ListItemIcon>
            <ListItemText primary="Applications" />
            {open.applications ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.applications} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["My Applications", "Student Grants", "Project Funding"].map((text) => (
                <ListItemButton key={text} sx={{ pl: 9 }} onClick={() => setView("other")}>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => toggle("competitions")}>
            <ListItemIcon sx={{ color: "white" }}><EmojiEvents /></ListItemIcon>
            <ListItemText primary="Competitions" />
            {open.competitions ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.competitions} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["Hackathons", "Competitions", "Idea Submission"].map((text) => (
                <ListItemButton key={text} sx={{ pl: 9 }} onClick={() => setView("other")}>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={() => toggle("network")}>
            <ListItemIcon sx={{ color: "white" }}><Group /></ListItemIcon>
            <ListItemText primary="Network" />
            {open.network ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open.network} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {["Mentorship", "Student Network", "Events", "Discussion Forum"].map((text) => (
                <ListItemButton key={text} sx={{ pl: 9 }} onClick={() => setView("other")}>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}><Notifications /></ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>

        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: PRIMARY_COLOR }}>
          <Toolbar>
            <IconButton color="inherit"><Menu /></IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Student Dashboard</Typography>
            <Avatar />
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, p: 4 }}>
          {view !== "learning-hub" && view !== "dashboard" && (
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                startIcon={<ArrowBack />} 
                onClick={() => setView("learning-hub")}
                sx={{
                  color: PRIMARY_COLOR,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1.5rem',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(26, 61, 53, 0.05)',
                  }
                }}
              >
              </Button>
            </Box>
          )}

          <Box>
            {view === "learning-hub" && <LearningHub setView={setView} />}
            {view === "my-courses" && <MyCourses />}
            {view === "additional-skills" && <AdditionalSkills entries={skillEntries} onAddSkill={addSkill} />}
            {view === "certifications" && <Certifications skillCertificates={skillEntries} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function LearningHub({ setView }) {
  const modules = [
    { title: "My Courses", desc: "Access your ongoing, completed, and upcoming academic courses.", icon: <School />, target: "my-courses", linkText: "View Courses" },
    { title: "Additional Skills", desc: "Document workshops and manual skill uploads for your portfolio.", icon: <Add />, target: "additional-skills", linkText: "Manage Skills" },
    { title: "Certifications", desc: "View and download your verified digital certificates and IDs.", icon: <WorkspacePremium />, target: "certifications", linkText: "View Certificates" }
  ];

  return (
    <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <Box sx={{ mb: 8, textAlign: 'center', maxWidth: 800 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: PRIMARY_COLOR, mb: 2 }}>
          Learning Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your modules and learning progress in one place.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', maxWidth: 1200 }}>
        {modules.map((mod) => (
          <Grid item key={mod.title}>
            <Card sx={{
              width: FIXED_CARD_WIDTH,
              minHeight: 250,
              p: 4,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              border: "1px solid #f0f0f0",
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: PRIMARY_COLOR,
                transform: 'translateY(-10px)',
                '& .MuiTypography-root': { color: '#ffffff' }, 
                '& .icon-box': { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }, 
                '& .action-btn': { color: '#ffffff' } 
              }
            }}>

              <Avatar className="icon-box" sx={{ 
                bgcolor: "#f0f7f4", 
                color: PRIMARY_COLOR, 
                mb: 3, 
                width: 60, 
                height: 60,
                transition: '0.3s'
              }}>
                {mod.icon}
              </Avatar>

              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: PRIMARY_COLOR, transition: '0.3s' }}>
                {mod.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, flexGrow: 1, transition: '0.3s' }}>
                {mod.desc}
              </Typography>

              <Button
                className="action-btn"
                onClick={() => setView(mod.target)}
                endIcon={<span style={{ fontSize: '1.2rem' }}>→</span>}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  color: PRIMARY_COLOR,
                  transition: '0.3s',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                {mod.linkText}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function MyCourses() {
  const [activeTab, setActiveTab] = useState("ongoing");

  const coursesData = {
    ongoing: [
      { name: "Full Stack Web Development - React, Node & MongoDB", category: "TECHNICAL", instructor: "IBM Academy • 12 Weeks Duration", progress: 60, status: "Ongoing", action: "Continue Learning" },
      { name: "Machine Learning Specialization - Neural Networks & AI", category: "TECHNICAL", instructor: "Stanford University • 8 Weeks Duration", progress: 35, status: "Ongoing", action: "Continue Learning" }
    ],
    completed: [
      { name: "Communication Skills and Professional Workplace Ethics", category: "SOFT SKILL", instructor: "LinkedIn Learning • Verified Certificate", progress: 100, status: "Completed", action: "View Certificate", completed: true }
    ],
    upcoming: [
      { name: "Cloud Architecture and Security - AWS Solutions Architect", category: "TECHNICAL", instructor: "Amazon Web Services • Start Feb 2026", status: "Upcoming", action: "Enroll Now", hideProgress: true },
      { name: "Data Science for Business - Analytics and Strategy", category: "MANAGEMENT", instructor: "Harvard Business School • Start Mar 2026", status: "Upcoming", action: "Enroll Now", hideProgress: true }
    ]
  };

  const tabs = [
    { key: "ongoing", label: "Ongoing Courses", count: coursesData.ongoing.length },
    { key: "completed", label: "Completed Courses", count: coursesData.completed.length },
    { key: "upcoming", label: "Upcoming Courses", count: coursesData.upcoming.length }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mt: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Box sx={{ display: "flex", gap: 6, borderBottom: "2px solid #e0e0e0", width: "95%", justifyContent: "center" }}>
          {tabs.map((tab) => (
            <Box
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              sx={{
                cursor: "pointer", pb: 2.5, px: 2, fontSize: "1.3rem", fontWeight: 700,
                display: "flex", alignItems: "center", gap: 1.5,
                color: activeTab === tab.key ? PRIMARY_COLOR : "text.secondary",
                borderBottom: activeTab === tab.key ? `5px solid ${PRIMARY_COLOR}` : "5px solid transparent",
                transition: "0.25s ease"
              }}
            >
              {tab.label}
              <Box sx={{
                bgcolor: activeTab === tab.key ? PRIMARY_COLOR : "#f0f0f0",
                color: activeTab === tab.key ? "white" : "text.secondary",
                px: 1.2, py: 0.2, borderRadius: "12px", fontSize: "0.9rem"
              }}>
                {tab.count}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {coursesData[activeTab].map((course, index) => (
          <Grid item key={index}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function AdditionalSkills({ entries = [], onAddSkill }) {
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSkillName("");
    setSelectedFile(null);
  };

  const handleSave = () => {
    if (!skillName) return;

    const skillList = skillName.split(',').map(s => s.trim()).filter(s => s !== "");

    const newEntries = skillList.map((skill, index) => ({
     id: Date.now() + index,
    title: skill,               // Needed for UnifiedCertificateCard title
    name: skill,                // Needed for SkillCard name
    org: "Manual Upload",       // Needed for both
    type: "Skill",              // This was missing/causing the crash
    progress: 100,              // Shows a full progress bar
    date: new Date().toLocaleDateString(),
    fileName: selectedFile ? selectedFile.name : "Portfolio_Doc.pdf"
  }));
if (onAddSkill) {
    onAddSkill(newEntries); 
  }
    handleClose();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: PRIMARY_COLOR, mb: 1 }}>
          Professional Competencies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Document your extra-curricular learning, workshops, and verified skills in one place.
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
          sx={{
            mt: 4, bgcolor: PRIMARY_COLOR, px: 4, py: 1.5,
            borderRadius: 2, fontWeight: "bold", textTransform: "none",
            "&:hover": { bgcolor: "#122b25" }
          }}
        >
          Add Additional Skills
        </Button>
      </Box>

      {entries.length === 0 ? (
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Card sx={{
              width: FIXED_CARD_WIDTH, height: 250,
              p: 5, textAlign: 'center', borderRadius: 4,
              border: '2px dashed #e0e0e0', bgcolor: 'transparent', boxShadow: 'none',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
              <Storage sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" color="text.secondary">
                No Skills Added Yet
              </Typography>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {entries.map((item) => (
            <Grid item key={item.id}>
              <SkillCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}>
        <Box sx={{ bgcolor: PRIMARY_COLOR, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Verified fontSize="small" />
            <Typography variant="h6" fontWeight="bold">Add Additional Skills</Typography>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}><Close /></IconButton>
        </Box>
        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, color: PRIMARY_COLOR }}>Skill / Course Name (Separate multiple with commas) *</Typography>
              <TextField fullWidth placeholder="e.g. Python, Java, AR/VR" value={skillName} onChange={(e) => setSkillName(e.target.value)} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1, color: PRIMARY_COLOR }}>Upload certificates if you have</Typography>
              <Box component="label" sx={{ border: "2px dashed #ccc", borderRadius: 3, p: 3, textAlign: 'center', bgcolor: selectedFile ? "rgba(26, 61, 53, 0.05)" : "#fafafa", display: 'block', cursor: 'pointer', "&:hover": { borderColor: PRIMARY_COLOR } }}>
                <input type="file" hidden onChange={(e) => setSelectedFile(e.target.files[0])} />
                <CloudUpload sx={{ fontSize: 40, color: PRIMARY_COLOR, mb: 1, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedFile ? selectedFile.name : "Click to select certificate"}</Typography>
              </Box>
            </Box>
            <Divider />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" fullWidth onClick={handleClose} sx={{ py: 1.2, borderRadius: 2, color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, fontWeight: 'bold' }}>Cancel</Button>
              <Button variant="contained" fullWidth onClick={handleSave} disabled={!skillName} sx={{ py: 1.2, borderRadius: 2, bgcolor: PRIMARY_COLOR, fontWeight: 'bold' }}>Save Achievement</Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function Certifications({ skillCertificates=[] }) {
  const [activeTab, setActiveTab] = useState("earned");

  const earnedFromCourses = [
    { title: "Google Data Analytics Professional - Advanced Path", org: "Google Engineering Center", date: "Jan 26, 2026", type: "Full Course", progress: 100 },
    { title: "Advanced React Patterns - Component Optimization", org: "Meta Engineering Team", date: "Dec 15, 2025", type: "Full Course", progress: 100 },
    { title: "Node.js Performance - Scaling Microservices", org: "Ryan Dahl • Node Team", date: "Nov 10, 2025", type: "Full Course", progress: 100 }
  ];

  const tabs = [
    { key: "earned", label: "Earned Certificates", count: earnedFromCourses.length },
    { key: "skills", label: "Skill Certificates", count: skillCertificates.length }
  ];

  const currentDisplayData = activeTab === "earned" ? earnedFromCourses : skillCertificates;

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mt: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Box sx={{ display: "flex", gap: 6, borderBottom: "2px solid #e0e0e0", width: "90%", justifyContent: "center" }}>
          {tabs.map((tab) => (
            <Box
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              sx={{
                cursor: "pointer", pb: 2.5, px: 2, fontSize: "1.3rem", fontWeight: 700,
                display: "flex", alignItems: "center", gap: 1.5,
                color: activeTab === tab.key ? PRIMARY_COLOR : "text.secondary",
                borderBottom: activeTab === tab.key ? `5px solid ${PRIMARY_COLOR}` : "5px solid transparent",
                transition: "0.25s ease"
              }}
            >
              {tab.label}
              <Box sx={{
                bgcolor: activeTab === tab.key ? PRIMARY_COLOR : "#f0f0f0",
                color: activeTab === tab.key ? "white" : "text.secondary",
                px: 1.2, py: 0.2, borderRadius: "12px", fontSize: "0.9rem"
              }}>
                {tab.count}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {currentDisplayData.map((cert, index) => (
         <Grid item key={cert.id || index}>
            <UnifiedCertificateCard {...cert} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const CourseCard = ({
  name, category, instructor, progress = 0, status, action, hideProgress, PRIMARY_COLOR = "#1a3e35"
}) => {
  return (
    <Card
      sx={{
        width: FIXED_CARD_WIDTH, height: FIXED_CARD_HEIGHT, borderRadius: 3, border: "1px solid #e0e0e0", boxShadow: "none",
        display: "flex", flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-5px)", boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", borderColor: PRIMARY_COLOR }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: PRIMARY_COLOR, textTransform: "uppercase" }}>
            {category}
          </Typography>
          <Chip label={status} size="small" sx={{ height: 20, fontSize: "11px", fontWeight: "bold" }} />
        </Box>

        <Box sx={{ height: 60, mb: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {name}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" noWrap>{instructor}</Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ mb: 2 }}>
          {!hideProgress && (
            <>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 4, bgcolor: "#eee", "& .MuiLinearProgress-bar": { background: PRIMARY_COLOR } }} />
              <Typography variant="caption" sx={{ mt: 0.5, display: "block", textAlign: "right", fontWeight: 600, color: PRIMARY_COLOR }}>
                {progress}% Syllabus Completed
              </Typography>
            </>
          )}
        </Box>

        <Button
          fullWidth variant="outlined"
          sx={{
            height: 42, borderRadius: 2, textTransform: "none", fontWeight: "bold",
            color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, borderWidth: "2px",
            "&:hover": { bgcolor: PRIMARY_COLOR, color: "white", borderWidth: "2px" }
          }}
        >
          {action}
        </Button>
      </CardContent>
    </Card>
  );
};

const SkillCard = ({ item }) => (
  <Card
    sx={{
      width: FIXED_CARD_WIDTH, height: FIXED_CARD_HEIGHT,
      borderRadius: 3,
      border: "1px solid #e0e0e0",
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      transition: "0.3s",
      "&:hover": { transform: "translateY(-5px)", boxShadow: "0px 10px 20px rgba(0,0,0,0.05)", borderColor: PRIMARY_COLOR }
    }}
  >
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <School sx={{ color: PRIMARY_COLOR, fontSize: 35 }} />
      </Box>

      <Box sx={{ height: 60, mb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", color: PRIMARY_COLOR, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.name}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Source: <span style={{ fontWeight: 600 }}>{item.fileName}</span>
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Verified Digital Record on {item.date}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mt: "auto" }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            height: 42, borderRadius: 2, textTransform: "none", fontWeight: "bold",
            color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, borderWidth: "2px",
            "&:hover": { bgcolor: PRIMARY_COLOR, color: "white" }
          }}
        >
          View Full Portfolio
        </Button>
      </Box>
    </CardContent>
  </Card>
);

const UnifiedCertificateCard = ({ title, org, date, type, progress }) => (
  <Card
    sx={{
      width: FIXED_CARD_WIDTH, height: FIXED_CARD_HEIGHT,
      borderRadius: 3,
      border: "1px solid #e0e0e0",
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      transition: "0.2s ease-in-out",
      "&:hover": { transform: "translateY(-5px)", borderColor: PRIMARY_COLOR, boxShadow: "0px 10px 20px rgba(0,0,0,0.05)" }
    }}
  >
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {type === "Webinar" ? <WorkspacePremium sx={{ color: PRIMARY_COLOR, fontSize: 20 }} /> : <School sx={{ color: PRIMARY_COLOR, fontSize: 20 }} />}
          <Typography variant="caption" sx={{ fontWeight: 700, color: PRIMARY_COLOR }}>{type ? type.toUpperCase() : 'SKILL'}</Typography>
        </Box>
        <Chip label="VERIFIED ID" size="small" sx={{ height: 20, fontSize: "10px", fontWeight: "bold", bgcolor: PRIMARY_COLOR, color: "white" }} />
      </Box>

      <Box sx={{ height: 60, mb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary" noWrap>{org}</Typography>
        <Typography variant="caption" color="text.disabled">Secure Digital ID Issued: {date}</Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mb: 2 }}>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 4, bgcolor: "#eee", "& .MuiLinearProgress-bar": { background: PRIMARY_COLOR } }} />
        <Typography variant="caption" sx={{ mt: 0.5, display: "block", textAlign: "right", fontWeight: 600 }}>100% Secure Verification</Typography>
      </Box>

      <Button
        fullWidth variant="outlined"
        sx={{
          height: 42, borderRadius: 2, textTransform: "none", fontWeight: "bold",
          color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, borderWidth: "2px",
          "&:hover": { bgcolor: PRIMARY_COLOR, color: "white" }
        }}
      >
        View Certificate
      </Button>
    </CardContent>
  </Card>
);

export {
  MyCourses,
  AdditionalSkills,
  Certifications
};