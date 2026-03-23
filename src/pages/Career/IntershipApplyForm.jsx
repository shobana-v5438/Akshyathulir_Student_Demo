import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, Typography, Button, TextField, Card, Stack, Container, IconButton, Grid, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}><ArrowBackIcon /></IconButton>
        
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a3e2f', mb: 1 }}>
            Complete Your Application
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            We've already got your basic details. Please provide the following professional info.
          </Typography>

          <form>
            <Stack spacing={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField label="LinkedIn Profile URL" placeholder="https://linkedin.com/in/..." fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="GitHub/Portfolio URL" placeholder="https://github.com/..." fullWidth variant="outlined" />
                </Grid>
              </Grid>

              <TextField 
                label="Key Skills" 
                placeholder="e.g. React, Python, UI Design" 
                fullWidth 
                variant="outlined" 
                helperText="Separate skills with commas"
              />

              <TextField 
                label="Why are you interested in this internship?" 
                multiline 
                rows={4} 
                fullWidth 
                variant="outlined" 
                required 
              />

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#1a3e2f' }}>
                  Upload Resume (PDF)
                </Typography>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ color: '#1a3e2f', borderColor: '#1a3e2f', textTransform: 'none' }}
                >
                  Choose File
                  <input type="file" hidden accept=".pdf" />
                </Button>
              </Box>

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
                Submit Application
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default ApplyForm;