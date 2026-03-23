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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate } from 'react-router-dom';

const PART_TIME_DATA = [
  { id: 1, title: 'Technical Support', company: 'Global IT Solutions', location: 'Chennai', pay: '₹500/hr', domain: 'IT', shift: 'Evening' },
  { id: 2, title: 'AI Data Labeler', company: 'InnoBotics Corp', location: 'Remote', pay: '₹300/hr', domain: 'Robotics/AI', shift: 'Flexible' },
  { id: 3, title: 'Network Monitor', company: 'SecureNet', location: 'Bangalore', pay: '₹600/hr', domain: 'Cybersecurity', shift: 'Night' },
  { id: 4, title: 'Junior Web Dev', company: 'Thulir Labs', location: 'Remote', pay: '₹450/hr', domain: 'IT', shift: 'Flexible' },
  { id: 5, title: 'Lab Assistant', company: 'RoboTech Univ', location: 'Hyderabad', pay: '₹400/hr', domain: 'Robotics/AI', shift: 'Morning' },
  { id: 6, title: 'Security Auditor', company: 'WallSecure', location: 'Chennai', pay: '₹700/hr', domain: 'Cybersecurity', shift: 'Weekend' },
];

const PartTimeJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState('All');

  const filteredJobs = useMemo(() => {
    return PART_TIME_DATA.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesShift = shiftFilter === 'All' || item.shift === shiftFilter;
      return matchesSearch && matchesShift;
    });
  }, [searchTerm, shiftFilter]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a3e2f', mb: 1 }}>
          Part-time Jobs
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
          Earn while you learn with flexible opportunities in your domain.
        </Typography>

        {/* --- SLIM SEARCH BAR SECTION --- */}
         <Stack direction="row" spacing={2} sx={{ mb: 5, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search roles or companies..."
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
            value={shiftFilter}
            size="small"
            onChange={(e) => setShiftFilter(e.target.value)}
            sx={{ 
              width: { xs: '100%', md: 180 }, 
              '& .MuiOutlinedInput-root': { borderRadius: 10, bgcolor: '#fff', fontSize: '0.85rem' } 
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon fontSize="small" sx={{ color: '#1a3e2f' }} />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="All">All Shifts</MenuItem>
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
            <MenuItem value="Night">Night</MenuItem>
            <MenuItem value="Flexible">Flexible</MenuItem>
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
            Find Jobs
          </Button>
        </Stack>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} lg={4} key={job.id}>
            <Card 
              sx={{ 
                height: '350px',
                width:'350px',
                display: 'flex',
                flexDirection: 'column',
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
                    sx={{ bgcolor: '#e8f5e9', color: '#1a3e2f', width: 48, height: 48 }}
                  >
                    <BusinessCenterIcon />
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
                    <Typography variant="body2" color="#444" sx={{ fontWeight: 700 }}>{job.pay}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#666' }} />
                    <Typography variant="body2" color="#444">{job.shift} Shift</Typography>
                  </Box>
                </Stack>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => navigate(`/job/${job.id}`)}
                  sx={{ 
                    borderRadius: 2, 
                    color: '#1a3e2f', 
                    borderColor: '#1a3e2f',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#1a3e2f', color: '#fff', borderColor: '#1a3e2f' }
                  }}
                >
                  Quick Apply
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PartTimeJobs;