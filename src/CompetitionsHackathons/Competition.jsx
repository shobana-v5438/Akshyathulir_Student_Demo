import React, { useState } from "react";
import { Box, Grid, Card, Button, TextField, Stack, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

export const CompetitionsPage = () => {
  const [openApply, setOpenApply] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedComp, setSelectedComp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [openSubmissions, setOpenSubmissions] = useState(false);
  const [myApplications, setMyApplications] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  // Add these functions inside the CompetitionsPage component
  const handleViewDetails = (comp) => {
    setSelectedComp(comp);
    setOpenDetails(true);
  };

  const handleApplyClick = (comp) => {
    setSelectedComp(comp);
    setOpenApply(true);
  };

  const handleClose = () => {
    setOpenDetails(false);
    setOpenApply(false);
    setOpenSubmissions(false); // ✅ ADDED
    setSelectedComp(null);
  };

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/competitions")
      .then(res => res.json())
      .then(data => {
        setCompetitions(data);
      });

  }, []);

  // const competitions = [
  //   { name: "CodeSprint", category: "Coding", level: "National", deadline: "10 Sep 2026", reward: "Internship", status: "Open", description: "A national level coding competition focused on algorithms and data structures." },
  //   { name: "Designathon", category: "Design", level: "State", deadline: "5 Sep 2026", reward: "Certificate", status: "Upcoming", description: "Showcase your UI/UX skills by solving real-world design challenges." },
  //   { name: "Quiz Mania", category: "Quiz", level: "College", deadline: "15 Sep 2026", reward: "Cash Prize", status: "Open", description: "A fast-paced technical and general knowledge quiz competition." },
  //   { name: "Innovation Challenge", category: "Tech", level: "International", deadline: "20 Sep 2026", reward: "Scholarship", status: "Open", description: "International platform to present innovative tech solutions for sustainability." },
  // ];

  const [competitions, setCompetitions] = useState([]);

  const [formData, setFormData] = useState({
    participantType: "",
    skillCategory: "",
    experienceLevel: "",
    portfolio: "",
    tools: "",
    strategy: ""
  });


  const handleViewSubmissions = async () => {
    const email = localStorage.getItem("email") || localStorage.getItem("userEmail");

    if (!email) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/my-competition-applications/${email}`
      );

      const data = await response.json();

      setMyApplications(data);
      setOpenSubmissions(true);

    } catch (error) {
      console.error(error);
      alert("Error fetching applications");
    }
  };

  const filteredCompetitions = competitions.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) && (filterCategory === "All" || c.category === filterCategory));

  const handleSubmitApplication = async () => {
    const userEmail = localStorage.getItem("email") || localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login first");
      return;
    }

    const payload = {
      email: userEmail,
      competition_name: selectedComp.name,
      participantType: formData.participantType,
      skillCategory: formData.skillCategory,
      experienceLevel: formData.experienceLevel,
      portfolio: formData.portfolio,
      tools: formData.tools,
      strategy: formData.strategy
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/apply-competition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.message === "Already applied") {
        alert("⚠️ You already applied for this competition!");
        handleClose();
        return;
      }

      if (response.ok) {
        alert("✅ Application submitted successfully!");
        handleClose();
      } else {
        alert(data.detail || "Error");
      }

    } catch (error) {
      console.error(error);
      alert("❌ Backend error. Please try again.");
    }
  };
  return (
    <Box sx={{ p: 4, bgcolor: "#f9fbfb", minHeight: "100vh" }}>

      {/* Search and Filter Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
        <TextField
          variant="outlined"
          placeholder="Search competitions..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "380px",
            bgcolor: "#f1f3f4",
            borderRadius: "50px",
            '& .MuiOutlinedInput-root': {
              borderRadius: "50px",
              '& fieldset': { border: 'none' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#5f6368", ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />

        {/* ✅ MODIFIED (added button) */}
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small">
            <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Coding">Coding</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="Quiz">Quiz</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="View My Applications">
            <IconButton
              onClick={handleViewSubmissions}
              sx={{
                bgcolor: "#163f36",
                color: "white",
                "&:hover": { bgcolor: "#0d2621" }
              }}
            >
              <HistoryEduIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredCompetitions.map((comp, index) => (
          /* md={3} creates a 4-column layout on medium screens and up */
          <Grid item xs={12} sm={6} md={3} size={3} key={index}>
            <Card
              sx={{
                borderRadius: 6,
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                border: "1px solid #eef2f2",
                bgcolor: "white",
                p: 2.5,
                transition: "0.3s",
                // CRITICAL: Fixed height and flex column layout
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "380px", // Adjust this value to your preferred card height
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
                },
              }}
            >
              {/* Top Section: Status & Icon */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box sx={{ bgcolor: "#f0f4f4", p: 1, borderRadius: "12px" }}>
                  <EmojiEventsIcon sx={{ color: "#163f36", fontSize: 28 }} />
                </Box>
                <Box
                  sx={{
                    bgcolor: comp.status === 'Upcoming' ? "#fff4e5" : "#e8f2ef",
                    px: 1.5, py: 0.5, borderRadius: "20px"
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700, color: comp.status === 'Upcoming' ? "#b26b00" : "#163f36" }}>
                    {comp.status || 'Open'}
                  </Typography>
                </Box>
              </Box>

              {/* Middle Section: Content */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: "#163f36",
                    mb: 0.5,
                    // Forces text to wrap/behave consistently
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.2em"
                  }}
                >
                  {comp.name}
                </Typography>

                <Typography variant="body2">
                  {comp.College_Name}
                </Typography>

                <Typography variant="body2" sx={{ color: "#5f6368", fontWeight: 600, mb: 2 }}>
                  {comp.category} | {comp.level} ⭐
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <ApartmentIcon sx={{ fontSize: 18, color: "#9aa0a6" }} />
                    <Typography variant="caption" sx={{ color: "#5f6368", fontWeight: 600 }}>
                      Deadline: <strong>{comp.deadline}</strong>
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmojiEventsIcon sx={{ fontSize: 18, color: "#163f36" }} />
                    <Typography variant="caption" sx={{ color: "#163f36", fontWeight: 700 }}>
                      Reward: {comp.reward}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Bottom Section: Buttons */}
              <Stack spacing={1} sx={{ mt: 'auto' }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleViewDetails(comp)}
                  sx={{
                    borderRadius: "10px",
                    borderColor: "#163f36",
                    color: "#163f36",
                    textTransform: "none",
                    fontWeight: 700,
                    py: 1
                  }}
                >
                  View Details
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleApplyClick(comp)}
                  sx={{
                    borderRadius: "10px",
                    bgcolor: "#163f36",
                    textTransform: "none",
                    fontWeight: 700,
                    py: 1,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#0d2621" }
                  }}
                >
                  Apply Now
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={openDetails}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 5 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#163f36", pt: 3 }}>
          About {selectedComp?.name}
        </DialogTitle>

        <DialogContent dividers>
          <Typography
            variant="body1"
            sx={{ color: "#5f6368", lineHeight: 1.6, mb: 2 }}
          >
            {selectedComp?.description}
          </Typography>

          <Typography variant="body2">
            <strong>Category:</strong> {selectedComp?.category}
          </Typography>

          <Typography variant="body2">
            <strong>Level:</strong> {selectedComp?.level}
          </Typography>

          <Typography variant="body2">
            <strong>Deadline:</strong> {selectedComp?.deadline}
          </Typography>

          <Typography variant="body2">
            <strong>Reward:</strong> {selectedComp?.reward}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#5f6368", fontWeight: 700 }}
          >
            Close
          </Button>

          <Button
            variant="contained"
            sx={{ bgcolor: "#163f36", borderRadius: "50px", px: 3 }}
            onClick={() => {
              setOpenDetails(false);
              setOpenApply(true);
            }}
          >
            Apply Now
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openApply} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 5 } }}>
        <DialogTitle sx={{ fontWeight: 800, color: "#163f36", pt: 3 }}>
          Competition Registration
        </DialogTitle>

        <DialogContent dividers sx={{ py: 3 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Registering for <strong>{selectedComp?.name}</strong>
          </Typography>

          <Stack spacing={3}>

            {/* Participant Type */}
            <FormControl fullWidth>
              <Select
                value={formData.participantType}
                onChange={(e) =>
                  setFormData({ ...formData, participantType: e.target.value })
                }
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Participant Type
                </MenuItem>
                <MenuItem value="individual">Individual</MenuItem>
                <MenuItem value="team">Team</MenuItem>
              </Select>
            </FormControl>

            {/* Skill Category */}
            <FormControl fullWidth>
              <Select
                value={formData.skillCategory}
                onChange={(e) =>
                  setFormData({ ...formData, skillCategory: e.target.value })
                }
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Skill Category
                </MenuItem>
                <MenuItem value="coding">Coding</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="ai">AI / ML</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
              </Select>
            </FormControl>

            {/* Experience Level */}
            <FormControl fullWidth>
              <Select
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({ ...formData, experienceLevel: e.target.value })
                }
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Experience Level
                </MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>

            {/* Portfolio */}
            <TextField
              label="Portfolio / Project Link"
              fullWidth
              placeholder="GitHub / Behance / Kaggle link"
              value={formData.portfolio}
              onChange={(e) =>
                setFormData({ ...formData, portfolio: e.target.value })
              }
            />

            {/* Tools */}
            <TextField
              label="Tools / Technologies you will use"
              fullWidth
              placeholder="React, Python, Figma, etc."
              value={formData.tools}
              onChange={(e) =>
                setFormData({ ...formData, tools: e.target.value })
              }
            />

            {/* Strategy */}
            <TextField
              label="Your Strategy / Idea"
              multiline
              rows={3}
              fullWidth
              placeholder="Briefly explain how you plan to approach this competition"
              value={formData.strategy}
              onChange={(e) =>
                setFormData({ ...formData, strategy: e.target.value })
              }
            />

          </Stack>
        </DialogContent>


        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: "#5f6368", fontWeight: 700 }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#163f36", borderRadius: "50px", px: 4 }}
            onClick={handleSubmitApplication}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ ADDED VIEW APPLICATIONS DIALOG */}
      <Dialog open={openSubmissions} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>My Competition Applications</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {myApplications.length > 0 ? (
              myApplications
                .filter(app =>
                  app.participantType ||
                  app.skillCategory ||
                  app.experienceLevel ||
                  app.tools ||
                  app.strategy
                )
                .map((app, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        bgcolor: "#f5f5f5",
                        borderLeft: "8px solid #2e7d32",
                        boxShadow: "none"
                      }}
                    >
                      {/* Title */}
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#1b5e20" }}>
                        {app.competition_name}
                      </Typography>

                      {/* Details */}
                      <Typography variant="body2">
                        Participant: {app.participantType}
                      </Typography>

                      <Typography variant="body2">
                        Skill: {app.skillCategory}
                      </Typography>

                      <Typography variant="body2">
                        Level: {app.experienceLevel}
                      </Typography>

                      <Typography variant="body2">
                        Tools: {app.tools}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Strategy: {app.strategy}
                      </Typography>

                      {/* ✅ ADD THIS NEW LINE (DATE) */}
                      <Typography
                        sx={{
                          mt: 1,
                          display: "inline-block",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "20px",
                          bgcolor: "transparent",
                          color: "#2e7d32",
                          fontWeight: 700,
                          fontSize: "12px"
                        }}
                      >
                        Applied On: {app.applied_at || "Not available"}
                      </Typography>
                    </Card>
                  </Grid>
                ))
            ) : (
              <Typography>No applications found</Typography>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};   