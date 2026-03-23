import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  Stack,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Tooltip, // <--- ADD THIS LINE
  IconButton, // <--- ADD THIS TOO if you are using it
  Divider
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

export const HackathonsPage = () => {
  const [openApply, setOpenApply] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("All");
  const [hackathons, setHackathons] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const [openSubmissions, setOpenSubmissions] = useState(false);
  const [myApplications, setMyApplications] = useState([]);



  const handleViewSubmissions = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return alert("Please log in first to view applications");

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/my-applications/${email}`);
      setMyApplications(response.data);
      setOpenSubmissions(true);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      alert("Could not load your applications.");
    }
  };



  const [formData, setFormData] = useState({
    reason: "",
    teamSize: 1,
    memberDetails: ""
  });



  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/hackathons");
        setHackathons(response.data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    };

    fetchHackathons();
  }, []);


  const handleApplyClick = async (hackathon) => {
    setSelectedHackathon(hackathon);
    setOpenApply(true);

    const email = localStorage.getItem("userEmail");

    if (email) {
      try {
        const response = await axios.get(`http://localhost:8000/user/${email}`);
        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("Autofetch failed.");
      }
    }
  };

  const handleClose = () => {
    setOpenApply(false);
    setOpenDetails(false);
    setOpenSubmissions(false);   // closes "My Applications" dialog
    setUserProfile(null);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedHackathon) return alert("No hackathon selected");

      const payload = {
        email: userProfile?.email || localStorage.getItem("userEmail"),
        hackathon_title: selectedHackathon.title,
        organizing_college: selectedHackathon.college_name,
        reason: formData.reason,
        teamSize: parseInt(formData.teamSize),
        memberDetails: formData.memberDetails,
        applied_at: new Date().toISOString()
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/apply-hackathon",
        payload
      );

      console.log("API Response →", response.data);

      alert(
        response.data.message ||
        response.data.status ||
        "Application submitted successfully"
      );

      /* Reset form */
      setFormData({
        reason: "",
        teamSize: 1,
        memberDetails: ""
      });

      handleClose();
    } catch (error) {
      alert("Failed: " + (error.response?.data?.detail || "Error"));
    }
  };

  const handleViewDetails = (hackathon) => {
    setSelectedHackathon(hackathon);
    setOpenDetails(true);
  };


  const filteredHackathons = hackathons.filter(
    (h) =>
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterMode === "All" || h.mode === filterMode)
  );

  console.log("Current Applications:", myApplications);



  return (
    <Box sx={{ p: 4, bgcolor: "#f9fbfb", minHeight: "100vh" }}>


      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }} // Reduced bottom margin to close the gap
      >
        {/* Left: Search */}
        <TextField
          variant="outlined"
          placeholder="Search hackathons..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "380px", bgcolor: "#f1f3f4", borderRadius: "50px", "& .MuiOutlinedInput-root": { borderRadius: "50px", "& fieldset": { border: "none" } } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#5f6368", ml: 1 }} />
              </InputAdornment>
            )
          }}
        />

        {/* Right: Filter + Icon (Grouped together) */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Filter By</Typography>
            <FormControl size="small">
              <Select value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Tooltip title="View My Applications">
            <IconButton
              onClick={handleViewSubmissions}
              sx={{ bgcolor: "#163f36", color: "white", "&:hover": { bgcolor: "#0d2621" } }}
            >
              <HistoryEduIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>


      <Grid container spacing={3}>
        {filteredHackathons.map((hackathon, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 5, p: 2, height: "100%" }}>
              <CardContent>

                <Box display="flex" justifyContent="space-between">
                  <SchoolIcon />
                  <Chip label={hackathon.status} size="small" />
                </Box>

                <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
                  {hackathon.title}
                </Typography>

                <Typography variant="body2">
                  {hackathon.college_name}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Mode: {hackathon.mode}
                </Typography>

                <Typography>
                  Deadline: {hackathon.deadline}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  {hackathon.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{ mr: 1, mt: 1 }}
                    />
                  ))}
                </Box>

                <Stack spacing={1.5} sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewDetails(hackathon)}
                    sx={{
                      borderRadius: "10px",
                      borderColor: "#163f36",
                      color: "#163f36",
                      textTransform: "none",
                      fontWeight: 700,
                      py: 1
                    }}
                  >
                    Details
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleApplyClick(hackathon)}
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

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* DETAILS DIALOG */}
      <Dialog open={openDetails} onClose={handleClose}>
        <DialogTitle>
          About {selectedHackathon?.title}
        </DialogTitle>

        <DialogContent>
          <Typography>
            {selectedHackathon?.description}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

          <Button
            variant="contained"
            onClick={() => {
              setOpenDetails(false);
              setOpenApply(true);
            }}
          >
            Apply Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* APPLICATION FORM */}
      <Dialog open={openApply} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Application Form</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>

            <TextField
              name="reason"
              label="Why do you want to participate?"
              multiline
              rows={3}
              value={formData.reason}
              onChange={handleChange}
            />

            <TextField
              name="teamSize"
              label="Team Size"
              type="number"
              value={formData.teamSize}
              onChange={handleChange}
              helperText={`Allowed: ${selectedHackathon?.team}`}
            />

            <TextField
              name="memberDetails"
              label="Team Member Details"
              multiline
              rows={2}
              value={formData.memberDetails}
              onChange={handleChange}
              placeholder="Name, Email, Role"
            />

          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openSubmissions}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 4, bgcolor: "#f0f7f4" } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#163f36" }}>
          My Submitted Applications
        </DialogTitle>

        <DialogContent dividers sx={{ bgcolor: "#f0f7f4" }}>
          <Grid container spacing={3}>
            {Array.isArray(myApplications) && myApplications.length > 0 ? (
              myApplications.map((app, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      p: 2,
                      borderLeft: "8px solid #1b5e20",
                      bgcolor: "white",
                      transition: "0.3s",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
                        bgcolor: "#f1fff3"
                      }
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ color: "#1b5e20", fontWeight: 800, mb: 1 }}
                      >
                        {app?.hackathon_title ?? "Hackathon"}
                      </Typography>

                      <Divider sx={{ mb: 1.5 }} />

                      <Typography variant="body2">
                        <b>Host College:</b> {app?.host_college ?? "N/A"}
                      </Typography>

                      <Typography variant="body2">
                        <b>Name:</b> {app?.name ?? "N/A"}
                      </Typography>

                      <Typography variant="body2">
                        <b>Team Size:</b> {app?.teamSize ?? "N/A"}
                      </Typography>

                      <Typography variant="body2">
                        <b>Team Members:</b> {app?.memberDetails ?? "N/A"}
                      </Typography>

                      <Typography variant="body2">
                        <b>Reason:</b> {app?.reason ?? "N/A"}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: "#2e7d32", fontWeight: 600 }}
                      >
                        <b>Applied on:</b>{" "}
                        {app?.applied_at
                          ? new Date(app.applied_at).toLocaleString()
                          : "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ p: 3, textAlign: "center", opacity: 0.7 }}>
                  No applications found. Go apply for some!
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};