import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Stack,
  Divider,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const PROJECT_DATA = [
  { id: 1, title: 'E-Commerce AI Chatbot', startup: 'TechNexus', duration: '3 Months', type: 'Paid', domain: 'IT', tech: ['React', 'Node.js'] },
  { id: 2, title: 'Autonomous Drone Navigator', startup: 'SkyBots', duration: '6 Months', type: 'Non-Paid', domain: 'Robotics/AI', tech: ['Python', 'ROS'] },
  { id: 3, title: 'Blockchain Auth System', startup: 'CipherGuard', duration: '4 Months', type: 'Paid', domain: 'Cybersecurity', tech: ['Solidity', 'Web3'] },
  { id: 4, title: 'Predictive Health Monitor', startup: 'BioPulse', duration: '2 Months', type: 'Non-Paid', domain: 'Robotics/AI', tech: ['TensorFlow', 'IoT'] },
  { id: 5, title: 'Inventory Management SaaS', startup: 'FlowState', duration: '5 Months', type: 'Paid', domain: 'IT', tech: ['Next.js', 'PostgreSQL'] },
  { id: 6, title: 'Network Intrusion Detector', startup: 'WallSecure', duration: '3 Months', type: 'Paid', domain: 'Cybersecurity', tech: ['C++', 'Linux'] },
];

const StartupProjects = () => {
  // 2. Initialize the navigate function inside the component
  const navigate = useNavigate(); 
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    return PROJECT_DATA.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.startup.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      
      <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a3e2f', mb: 1 }}>
        Projects
      </Typography>
      <Typography variant="body1" sx={{ color: '#555', mb: 3}}>
          Contribute to real-world projects and earn rewards or certificates.
        </Typography>

      {/* Slim Search Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 5, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search Projects..."
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
          value={typeFilter}
          size="small"
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ width: { xs: '100%', md: 180 }, '& .MuiOutlinedInput-root': { borderRadius: 10, bgcolor: '#fff',fontSize: '0.85rem' } }}
          
        >
          <MenuItem value="All">All Projects</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Non-Paid">Non-Paid</MenuItem>
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

      {/* Project Cards Grid */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} lg={4} key={project.id}>
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
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Avatar 
                
                  sx={{ bgcolor: '#1a3e2f', color: '#fff', width: 48, height: 48 }}>
                    <RocketLaunchIcon fontSize="small" />
                  </Avatar>
                  <Chip 
                    label={project.type} 
                    size="small" 
                    sx={{ bgcolor: project.type === 'Paid' ? '#e8f5e9' : '#f5f5f5', color: project.type === 'Paid' ? '#2e7d32' : '#757575', fontWeight: 700 }} 
                  />
                </Stack>

                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a3e2f', mb: 0.5 }}>
                  {project.title}
                </Typography>
                
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                   {project.startup} • {project.domain}
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon sx={{ fontSize: 18, color: '#666' }} />
                    <Typography variant="body2">{project.duration}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                    <CodeIcon sx={{ fontSize: 18, color: '#666', mr: 0.5 }} />
                    {project.tech.map((t) => (
                      <Chip key={t} label={t} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                    ))}
                  </Box>
                </Stack>
              </CardContent>
              <Box sx={{ p: 2, pt: 5 }}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  onClick={() => navigate(`/project/${project.id}`)}
                  sx={{ 
                    borderRadius: 2, 
                    color: '#1a3e2f', 
                    borderColor: '#1a3e2f',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#1a3e2f', color: '#fff' }
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

export default StartupProjects;