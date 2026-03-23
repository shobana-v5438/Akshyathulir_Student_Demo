import React from 'react';
import { 
  Box, Typography, Grid, Card, Stack, Avatar, LinearProgress, Container 
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; // For Entrepreneurship

const StudentDashboard = () => {
  // Enhanced Mock data
 const stats = [
  { title: 'Projects', path: '/projects', count: 12, total: 15, icon: <AssignmentIcon fontSize="large" />, color: '#1a3e2f' },
  { title: 'Internships', path: '/internships', count: 2, total: 3, icon: <WorkspacePremiumIcon fontSize="large" />, color: '#1a3e2f' },
  { title: 'Courses', path: '/courses', count: 8, total: 10, icon: <SchoolIcon fontSize="large" />, color: '#1a3e2f' },
  { title: 'Hackathons', path: '/hackathons', count: 5, total: 8, icon: <EmojiEventsIcon fontSize="large" />, color: '#1a3e2f' },
  { title: 'Grants', path: '/grants', count: 1, total: 2, icon: <AccountBalanceWalletIcon fontSize="large" />, color: '#1a3e2f' },
  { title: 'Entrepreneur', path: '/entrepreneur', count: 3, total: 5, icon: <RocketLaunchIcon fontSize="large" />, color: '#1a3e2f', isBig: true },
];

  return (
    <Box sx={{ 
      py: 10, 
      backgroundColor: '#f4f7f5', 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.5,
        
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      

        <Grid container spacing={1}>
          {stats.map((item, index) => {
            const progress = (item.count / item.total) * 100;
            
            return (
              <Grid item xs={12} md={item.isBig ? 8 : 4} sm={item.isBig ? 12 : 6} key={index}>
                <Card sx={{ 
      
                  p: 5, // Larger padding for "filled" look
                  height: '100%',
                  borderRadius: 8, 
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 25px 50px -12px rgba(26, 62, 47, 0.12)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  '&:hover': { 
                    transform: 'translateY(-10px)',
                    boxShadow: '0 40px 60px -15px rgba(26, 62, 47, 0.2)',
                    borderColor: '#1a3e2f'
                  }
                }}>
                  <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 4 }}>
                    <Avatar sx={{ 
                      bgcolor: item.color, 
                      width: 72, 
                      height: 72,
                      boxShadow: `0 12px 20px ${item.color}44` 
                    }}>
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: '#1a3e2f' }}>
                        {item.count}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: '#5c7368', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {item.title}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#1a3e2f' }}>
                        Mastery Level
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#1a3e2f' }}>
                        {Math.round(progress)}%
                      </Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress} 
                      sx={{ 
                        height: 12, 
                        borderRadius: 6, 
                        bgcolor: 'rgba(26, 62, 47, 0.08)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: item.color,
                          borderRadius: 6,
                          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)'
                        }
                      }}
                    />
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#99aba1', fontWeight: 500 }}>
                    Projected Goal: {item.total} {item.title} for this semester
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard;