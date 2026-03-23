import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Grid, Card, Stack, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Central Database for Projects
const PROJECT_DETAILS_DB = [
  {
    id: 1,
    title: 'E-Commerce AI Chatbot',
    startup: 'TechNexus',
    duration: '3 Months',
    type: 'Paid',
    domain: 'IT',
    tech: ['React', 'Node.js', 'OpenAI API'],
    description: 'Develop an intelligent customer support chatbot that integrates with existing e-commerce platforms to handle order tracking and basic FAQs.',
    tasks: ['Design conversation flows', 'Integrate NLP models', 'Create a React-based chat widget'],
    benefits: ['Stipend provided', 'Mentorship from senior devs', 'Work on live production code']
  },
  {
    id: 2,
    title: 'Autonomous Drone Navigator',
    startup: 'SkyBots',
    duration: '6 Months',
    type: 'Non-Paid',
    domain: 'Robotics/AI',
    tech: ['Python', 'ROS', 'OpenCV'],
    description: 'Help build a navigation system that allows drones to fly through cluttered indoor environments without GPS support.',
    tasks: ['Implement obstacle avoidance', 'Sensor fusion (Lidar + Camera)', 'Real-time path planning'],
    benefits: ['Certificate of Excellence', 'Hands-on hardware experience', 'Potential for future hiring']
  },
  {
    id: 3,
    title: 'Blockchain Auth System',
    startup: 'CipherGuard',
    duration: '4 Months',
    type: 'Paid',
    domain: 'Cybersecurity',
    tech: ['Solidity', 'Web3.js', 'Ethereum'],
    description: 'Building a decentralized identity management system to prevent credential theft and ensure secure logins.',
    tasks: ['Smart contract development', 'Frontend Web3 integration', 'Security auditing of code'],
    benefits: ['Monthly Stipend', 'Blockchain certification', 'Equity options for top performers']
  },
  {
    id: 4,
    title: 'Predictive Health Monitor',
    startup: 'BioPulse',
    duration: '2 Months',
    type: 'Non-Paid',
    domain: 'Robotics/AI',
    tech: ['TensorFlow', 'IoT', 'C++'],
    description: 'Create an AI model that analyzes wearable sensor data to predict potential health anomalies before they occur.',
    tasks: ['Anomaly detection modeling', 'IoT data cleaning', 'Mobile dashboard integration'],
    benefits: ['Research publication credit', 'Social impact project', 'Expert AI guidance']
  },
  {
    id: 5,
    title: 'Inventory Management SaaS',
    startup: 'FlowState',
    duration: '5 Months',
    type: 'Paid',
    domain: 'IT',
    tech: ['Next.js', 'PostgreSQL', 'Prisma'],
    description: 'A cloud-based solution for small businesses to track real-time stock levels across multiple warehouse locations.',
    tasks: ['Database schema design', 'Real-time inventory sync', 'Reporting dashboard'],
    benefits: ['Competitive Stipend', 'Full-stack experience', 'Flexible remote hours']
  },
  {
    id: 6,
    title: 'Network Intrusion Detector',
    startup: 'WallSecure',
    duration: '3 Months',
    type: 'Paid',
    domain: 'Cybersecurity',
    tech: ['C++', 'Linux', 'Wireshark'],
    description: 'Developing a lightweight agent that monitors server traffic and flags suspicious patterns using heuristic analysis.',
    tasks: ['Traffic sniffing module', 'Alerting system backend', 'Heuristic algorithm tuning'],
    benefits: ['Performance-based bonus', 'Advanced Linux networking skills', 'Secure-coding certification']
  }
];

const ProjectDetail = () => {
    
  const { id } = useParams();
  const navigate = useNavigate();

  const project = PROJECT_DETAILS_DB.find((item) => item.id === parseInt(id));

  if (!project) return <Typography sx={{ p: 5, textAlign: 'center' }}>Project not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      {/* Navigation */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ color: '#1a3e2f', mb: 3, fontWeight: 'bold', textTransform: 'none' }}
      >
        Back to Projects
      </Button>

      <Grid container spacing={4}>
        {/* Left Column: Project Scope */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',width:'700px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a3e2f', mb: 1 }}>
                  {project.title}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {project.startup} • {project.domain}
                </Typography>
              </Box>
              <Chip 
                label={project.type} 
                sx={{ 
                  bgcolor: project.type === 'Paid' ? '#e8f5e9' : '#f5f5f5', 
                  color: project.type === 'Paid' ? '#2e7d32' : '#757575', 
                  fontWeight: 'bold' 
                }} 
              />
            </Stack>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Project Overview</Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 4 }}>
              {project.description}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Key Tasks</Typography>
            <List sx={{ mb: 4 }}>
              {project.tasks.map((task, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 35 }}><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                  <ListItemText primary={task} sx={{ color: '#555' }} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Tech Stack</Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {project.tech.map((t) => (
                <Chip key={t} label={t} icon={<CodeIcon fontSize="small" />} variant="outlined" sx={{ borderRadius: 2 }} />
              ))}
            </Stack>
          </Card>
        </Grid>

        {/* Right Column: Project Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 24, border: '1px solid #e0e6e2', boxShadow: '0px 10px 30px rgba(0,0,0,0.04)',width:'300px'}}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1a3e2f' }}>Collaboration Details</Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><AccessTimeIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">TIMELINE</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{project.duration}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><PaymentsIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">COMPENSATION</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {project.type === 'Paid' ? 'Stipend Included' : 'Unpaid (Certificate)'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><RocketLaunchIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">STARTUP</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{project.startup}</Typography>
                </Box>
              </Box>
            </Stack>

            <Button 
              fullWidth 
              variant="contained" 
              size="large"
              onClick={() => navigate(`/project-apply/${id}`)}
              sx={{ 
                mt: 4, 
                bgcolor: '#1a3e2f', 
                borderRadius: 3, 
                py: 1.5, 
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { bgcolor: '#122b21' } 
              }}
            >
              Apply to Project
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetail;