import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Grid, Card, Stack, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Central Database for All 6 Part-time Jobs
const JOB_DETAILS_DB = [
  {
    id: 1,
    title: 'Technical Support',
    company: 'Global IT Solutions',
    location: 'Chennai',
    pay: '₹500/hr',
    domain: 'IT',
    shift: 'Evening',
    description: 'Provide technical assistance regarding software installation and troubleshooting for international clients.',
    tasks: ['Respond to customer queries', 'Document technical issues', 'Escalate complex bugs'],
    requirements: ['Good communication', 'Basic hardware knowledge', 'Evening shift availability']
  },
  {
    id: 2,
    title: 'AI Data Labeler',
    company: 'InnoBotics Corp',
    location: 'Remote',
    pay: '₹300/hr',
    domain: 'Robotics/AI',
    shift: 'Flexible',
    description: 'Work with our AI team to annotate and label image datasets for training computer vision models.',
    tasks: ['Identify objects in images', 'Maintain labeling accuracy', 'Collaborate with data scientists'],
    requirements: ['Attention to detail', 'Stable internet', 'Basic computer literacy']
  },
  {
    id: 3,
    title: 'Network Monitor',
    company: 'SecureNet',
    location: 'Bangalore',
    pay: '₹600/hr',
    domain: 'Cybersecurity',
    shift: 'Night',
    description: 'Monitor server logs and network traffic for a 24/7 security operations center (SOC).',
    tasks: ['Real-time traffic monitoring', 'Flag suspicious logins', 'Generate nightly reports'],
    requirements: ['Networking basics', 'Comfortable with night shifts', 'Reliability']
  },
  {
    id: 4,
    title: 'Junior Web Dev',
    company: 'Thulir Labs',
    location: 'Remote',
    pay: '₹450/hr',
    domain: 'IT',
    shift: 'Flexible',
    description: 'Assist in maintaining and updating small-scale web applications for local startups.',
    tasks: ['Update HTML/CSS layouts', 'Fix minor JavaScript bugs', 'Perform cross-browser testing'],
    requirements: ['Basic React knowledge', 'Understanding of Git', 'Flexible availability']
  },
  {
    id: 5,
    title: 'Lab Assistant',
    company: 'RoboTech Univ',
    location: 'Hyderabad',
    pay: '₹400/hr',
    domain: 'Robotics/AI',
    shift: 'Morning',
    description: 'Help organize the robotics lab, maintain hardware components, and assist students with basic soldering.',
    tasks: ['Inventory of electronic parts', 'Battery maintenance for drones', 'Clean and organize workstations'],
    requirements: ['Interest in Electronics', 'Morning availability', 'Hand-on tool skills']
  },
  {
    id: 6,
    title: 'Security Auditor',
    company: 'WallSecure',
    location: 'Chennai',
    pay: '₹700/hr',
    domain: 'Cybersecurity',
    shift: 'Weekend',
    description: 'Perform scheduled security audits for office networks to ensure compliance with safety protocols.',
    tasks: ['Check firewall configurations', 'Update security software', 'Conduct physical security checks'],
    requirements: ['Understanding of Firewalls', 'Available on Weekends', 'Cybersecurity certification is a plus']
  }
];

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = JOB_DETAILS_DB.find((item) => item.id === parseInt(id));

  if (!job) return <Typography sx={{ p: 5, textAlign: 'center' }}>Job not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ color: '#1a3e2f', mb: 3, fontWeight: 'bold', textTransform: 'none' }}
      >
        Back to Jobs
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',width:'700px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a3e2f', mb: 1 }}>{job.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6" color="textSecondary">{job.company}</Typography>
                  <VerifiedIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                </Stack>
              </Box>
              <Chip label={job.domain} sx={{ bgcolor: '#e8f5e9', color: '#1a3e2f', fontWeight: 'bold' }} />
            </Stack>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Role Overview</Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 4 }}>{job.description}</Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Responsibilities</Typography>
            <List sx={{ mb: 4 }}>
              {job.tasks.map((task, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 35 }}><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                  <ListItemText primary={task} sx={{ color: '#555' }} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Requirements</Typography>
            <List>
              {job.requirements.map((req, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#1a3e2f' }} />
                  </ListItemIcon>
                  <ListItemText primary={req} sx={{ color: '#555' }} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 24, border: '1px solid #e0e6e2', boxShadow: '0px 10px 30px rgba(0,0,0,0.04)',width:'300px' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1a3e2f' }}>Summary</Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><PaymentsIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">PAY</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{job.pay}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><AccessTimeIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">SHIFT</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{job.shift}</Typography>
                </Box>
              </Box>
            </Stack>
            <Button fullWidth variant="contained" onClick={() => navigate(`/job-apply/${id}`)}sx={{ mt: 4, bgcolor: '#1a3e2f', py: 1.5, borderRadius: 3, fontWeight: 'bold' }}>Quick Apply</Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetail;