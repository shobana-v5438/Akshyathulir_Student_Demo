import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';


const INTERNSHIP_DATA = [
  { id: 1, title: 'Frontend Developer', company: 'CropSmile Tech', location: 'Remote', stipend: '10k/mo', domain: 'IT', role: 'Engineer' },
  { id: 2, title: 'AI Research Intern', company: 'InnoBotics Corp', location: 'Chennai', stipend: '15k/mo', domain: 'Robotics/AI', role: 'Research' },
  { id: 3, title: 'Security Analyst', company: 'SecureNet Solutions', location: 'Bangalore', stipend: '12k/mo', domain: 'Cybersecurity', role: 'Analyst' },
  { id: 4, title: 'React Native Developer', company: 'Thulir Labs', location: 'Remote', stipend: '8k/mo', domain: 'IT', role: 'Developer' },
  { id: 5, title: 'Robotics Software Intern', company: 'Automation Labs', location: 'Hyderabad', stipend: '14k/mo', domain: 'Robotics/AI', role: 'Engineer' },
  { id: 6, title: 'Cloud Security Intern', company: 'CyberShield', location: 'Remote', stipend: '18k/mo', domain: 'Cybersecurity', role: 'Specialist' },
];

const Internships = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  const filteredInternships = useMemo(() => {
    return INTERNSHIP_DATA.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All' || item.role === roleFilter;
      const matchesLocation = locationFilter === 'All' || item.location === locationFilter;
      return matchesSearch && matchesRole && matchesLocation;
    });
  }, [searchTerm, roleFilter, locationFilter]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>

      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a3e2f', mb: 1 }}>
          Explore Internships
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
          Based on your interest in IT, Robotics/AI, and Cybersecurity
        </Typography>

        {/* --- UPDATED SLIM SEARCH BAR SECTION --- */}
        <Stack direction="row" spacing={2} sx={{ mb: 5, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by title or company..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: '100%', md: 350 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 10,
                bgcolor: '#fff',
                fontSize: '0.85rem'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: '#1a3e2f' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            value={locationFilter}
            size="small"
            onChange={(e) => setLocationFilter(e.target.value)}
            sx={{
              width: { xs: '100%', md: 180 },
              '& .MuiOutlinedInput-root': { borderRadius: 10, bgcolor: '#fff', fontSize: '0.85rem' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon fontSize="small" sx={{ color: '#1a3e2f' }} />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="All">All Locations</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Chennai">Chennai</MenuItem>
            <MenuItem value="Bangalore">Bangalore</MenuItem>
          </TextField>

          <Button
            variant="contained"
            sx={{
              borderRadius: 10,
              bgcolor: '#1a3e2f',
              textTransform: 'none',
              px: 4,
              fontWeight: 'bold',
              height: '40px',
              '&:hover': { bgcolor: '#122b21' }
            }}
          >
            Search
          </Button>
        </Stack>
        {/* --- END OF SLIM SEARCH BAR SECTION --- */}
      </Box>

      {/* Cards Grid - Kept Exactly the Same */}
      <Grid container spacing={3}>
        {filteredInternships.map((job) => (
          <Grid item xs={12} sm={6} lg={4} key={job.id}>
            <Card
              sx={{
               
                display: 'flex',
                flexDirection: 'column',
                width:'350px',
              height: '350px',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                border: '1px solid #eef2f0',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0px 12px 30px rgba(26, 62, 47, 0.15)',
                  borderColor: '#1a3e2f'
                }
              }}
            >
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Avatar
                    variant="rounded"
                    sx={{ bgcolor: '#e8f5e9', color: '#1a3e2f', width: 48, height: 48, fontWeight: 'bold' }}
                  >
                    {job.company.charAt(0)}
                  </Avatar>
                  <Chip
                    label={job.domain}
                    size="small"
                    sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f', fontWeight: 600, borderRadius: 1 }}
                  />
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a3e2f', mb: 0.5, lineHeight: 1.2 }}>
                  {job.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                    {job.company}
                  </Typography>
                  <VerifiedIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
                </Stack>

                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 18, color: '#666' }} />
                    <Typography variant="body2" color="#444">{job.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PaymentsIcon sx={{ fontSize: 18, color: '#666' }} />
                    <Typography variant="body2" color="#444">{job.stipend}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkOutlineIcon sx={{ fontSize: 18, color: '#666' }} />
                    <Typography variant="body2" color="#444">{job.role}</Typography>
                  </Box>
                </Stack>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate(`/internship/${job.id}`)} // This triggers navigation
                  sx={{
                    borderRadius: 2,
                    color: '#1a3e2f',
                    borderColor: '#1a3e2f',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#1a3e2f', color: '#fff', borderColor: '#1a3e2f' }
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Internships;