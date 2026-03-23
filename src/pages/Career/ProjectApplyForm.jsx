import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, Typography, Button, TextField, Card, Stack, Container, IconButton, Grid, Divider 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const ProjectApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}><ArrowBackIcon /></IconButton>
        
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <RocketLaunchIcon sx={{ color: '#1a3e2f' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a3e2f' }}>
              Project Proposal
            </Typography>
          </Stack>
          
          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            Submit your interest for Project ID: #{id}. Since you're already registered, just fill in your project-specific goals.
          </Typography>

          <form>
            <Stack spacing={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField label="Portfolio/GitHub URL" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Weekly Availability (Hours)" type="number" fullWidth variant="outlined" />
                </Grid>
              </Grid>

              <TextField 
                label="Relevant Technical Experience" 
                placeholder="List similar projects you've worked on..."
                multiline 
                rows={3} 
                fullWidth 
                variant="outlined" 
              />

              <TextField 
                label="Why do you want to join this project?" 
                multiline 
                rows={4} 
                fullWidth 
                variant="outlined" 
                required 
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#1a3e2f', 
                  py: 1.5, 
                  fontWeight: 'bold', 
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#122b21' } 
                }}
              >
                Submit Proposal
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default ProjectApplyForm;