import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, Typography, Button, TextField, Card, Stack, Container, IconButton, MenuItem 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const JobApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, backgroundColor: '#f4f7f5', minHeight: '100vh' }}>
      <Container maxWidth="sm">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}><ArrowBackIcon /></IconButton>
        
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0px 10px 30px rgba(0,0,0,0.05)' }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <WorkOutlineIcon sx={{ color: '#1a3e2f' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a3e2f' }}>
              Quick Job Apply
            </Typography>
          </Stack>
          
          <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
            Applying for Part-time Position ID: #{id}. Please confirm your availability.
          </Typography>

          <form>
            <Stack spacing={3}>
              <TextField 
                select 
                label="Earliest Start Date" 
                defaultValue="immediately" 
                fullWidth
              >
                <MenuItem value="immediately">Immediately</MenuItem>
                <MenuItem value="1week">In 1 Week</MenuItem>
                <MenuItem value="2weeks">In 2 Weeks</MenuItem>
              </TextField>

              <TextField 
                label="Current Employment Status" 
                placeholder="e.g. Student, Freelancer" 
                fullWidth 
              />

              <TextField 
                label="Total hours available per week" 
                type="number" 
                fullWidth 
              />

              <TextField 
                label="Additional Notes / Shift Preferences" 
                multiline 
                rows={3} 
                fullWidth 
                placeholder="Tell us if you have specific preferred hours..."
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
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#122b21' } 
                }}
              >
                Submit Job Application
              </Button>
            </Stack>
          </form>
        </Card>
      </Container>
    </Box>
  );
};

export default JobApplyForm;