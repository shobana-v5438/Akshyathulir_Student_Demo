import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Grid, Card, Stack, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const INTERNSHIP_DETAILS_DB = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'CropSmile Tech',
    location: 'Remote',
    stipend: '₹ 10,000 /month',
    duration: '6 Months',
    domain: 'IT',
    description: 'Build modern agricultural dashboards using React.js and MUI.',
    responsibilities: ['UI Component development', 'API Integration'],
    requirements: ['React Knowledge', 'JavaScript']
  },
  {
    id: 2,
    title: 'AI Research Intern',
    company: 'InnoBotics Corp',
    location: 'Chennai',
    stipend: '₹ 15,000 /month',
    duration: '3 Months',
    domain: 'Robotics/AI',
    description: 'Researching computer vision algorithms for industrial robots.',
    responsibilities: ['Data Annotation', 'Python Scripting'],
    requirements: ['Python', 'Machine Learning basics']
  },
  {
    id: 3,
    title: 'Security Analyst Intern',
    company: 'SecureNet Solutions',
    location: 'Bangalore',
    stipend: '₹ 12,000 /month',
    duration: '4 Months',
    domain: 'Cybersecurity',
    description: 'Monitoring network traffic and identifying vulnerabilities.',
    responsibilities: ['Log Analysis', 'Network Auditing'],
    requirements: ['Networking', 'Linux']
  },
  {
    id: 4,
    title: 'React Native Developer',
    company: 'Thulir Labs',
    location: 'Remote',
    stipend: '₹ 8,000 /month',
    duration: '6 Months',
    domain: 'IT',
    description: 'Work on cross-platform mobile applications for rural education initiatives.',
    responsibilities: ['Build performant mobile UI components', 'Integrate push notifications', 'Debug mobile performance issues'],
    requirements: ['Strong React Native foundation', 'JavaScript/TypeScript', 'Firebase']
  },
  {
    id: 5,
    title: 'Robotics Software Intern',
    company: 'Automation Labs',
    location: 'Hyderabad',
    stipend: '₹ 14,000 /month',
    duration: '5 Months',
    domain: 'Robotics/AI',
    description: 'Help develop software controllers for autonomous warehouse robots.',
    responsibilities: ['Write control algorithms (Python/C++)', 'Simulate in Gazebo/ROS', 'Optimize sensor data processing'],
    requirements: ['Proficiency in Python/C++', 'Basic ROS', 'Linear Algebra']
  },
  {
    id: 6,
    title: 'Cloud Security Intern',
    company: 'CyberShield',
    location: 'Remote',
    stipend: '₹ 18,000 /month',
    duration: '4 Months',
    domain: 'Cybersecurity',
    description: 'Ensure the safety of cloud-based infrastructure and manage identity access.',
    responsibilities: ['Configure AWS/Azure security groups', 'Automate security checks', 'Assist in incident response'],
    requirements: ['AWS or Azure basics', 'IAM and Firewalls', 'Python scripting']
  }
];

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = INTERNSHIP_DETAILS_DB.find((item) => item.id === parseInt(id));

  if (!job) return <Typography sx={{ p: 5, textAlign: 'center' }}>Internship not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)} 
        sx={{ color: '#1a3e2f', mb: 3, fontWeight: 'bold', textTransform: 'none' }}
      >
        Back to Listings
      </Button>

      <Grid container spacing={4}>
        {/* Left Column: Role Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',width:'700px'}}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a3e2f', mb: 1 }}>
                  {job.title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6" color="textSecondary">{job.company}</Typography>
                  <VerifiedIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                </Stack>
              </Box>
              <Chip label={job.domain} sx={{ bgcolor: '#e8f5e9', color: '#1a3e2f', fontWeight: 'bold' }} />
            </Stack>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>About the Role</Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, mb: 4 }}>{job.description}</Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Responsibilities</Typography>
            <List sx={{ mb: 4 }}>
              {job.responsibilities?.map((item, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 35 }}><CheckCircleOutlineIcon color="success" /></ListItemIcon>
                  <ListItemText primary={item} sx={{ color: '#555' }} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a3e2f', mb: 2 }}>Requirements</Typography>
            <List>
              {job.requirements?.map((item, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 35 }}><Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#1a3e2f' }} /></ListItemIcon>
                  <ListItemText primary={item} sx={{ color: '#555' }} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Right Column: Sticky Action Card */}
        <Grid item xs={12} md={4}>
           <Card sx={{ p: 3, borderRadius: 4, position: 'sticky', top: 24, border: '1px solid #e0e6e2', boxShadow: '0px 10px 30px rgba(0,0,0,0.04)',width:'300px' }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1a3e2f' }}>Summary</Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><LocationOnIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">LOCATION</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{job.location}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><PaymentsIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">STIPEND</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{job.stipend}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#f0f4f2', color: '#1a3e2f' }}><CalendarTodayIcon /></Avatar>
                <Box>
                  <Typography variant="caption" color="textSecondary">DURATION</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{job.duration}</Typography>
                </Box>
              </Box>
            </Stack>

            <Button 
              fullWidth 
              variant="contained" 
              size="large"
              onClick={() => navigate(`/apply/${id}`)}
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
              Apply Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InternshipDetail;