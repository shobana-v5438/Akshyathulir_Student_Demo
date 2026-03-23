import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Chip,
  Avatar,
  Collapse,
  Stack,
  useMediaQuery
} from '@mui/material';
import {
  User, LayoutDashboard, FileText, GraduationCap, Coins,
  Menu as MenuIcon, Bell, ChevronRight, Search, MapPin,
  Briefcase, XCircle, ArrowLeft, Users,
  Building, Wallet, UploadCloud, Folder, DollarSign,
  Calendar, CheckCircle, Clock, AlertCircle, PlayCircle, Link as LinkIcon,
  Trophy, BookOpen, ChevronDown, ChevronUp, ArrowUpRight, Sparkles, TrendingUp, Earth
} from 'lucide-react';

// --- Theme Constants ---
const PRIMARY_COLOR = '#0d3926';
const SECONDARY_BG = '#f0fdf4';

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: '#166534',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#171717',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        }
      }
    }
  },
});

// --- Mock Data ---
const APPS_DATA = [
  { id: '#APP-001', type: 'Grant', title: 'AgriTech Innovation Fund', date: 'Jan 02, 2026', status: 'Pending', color: 'warning' },
  { id: '#APP-002', type: 'Internship', title: 'Data Analyst @ GreenCorp', date: 'Dec 28, 2025', status: 'Interview', color: 'info' },
  { id: '#APP-003', type: 'Funding', title: 'Seed Funding Round 1', date: 'Dec 15, 2025', status: 'Approved', color: 'success' },
  { id: '#APP-004', type: 'Grant', title: 'Young Scientist Award', date: 'Nov 10, 2025', status: 'Rejected', color: 'error' },
];

const GRANTS_DATA = [
  // Tech & Innovation
  { id: 1, category: 'Tech & Innovation', title: 'AI Innovation Fund', amount: '₹5,00,000', deadline: 'Jan 30, 2026', location: 'Bangalore', tags: ['AI', 'Tech', 'Innovation'] },
  { id: 2, category: 'Tech & Innovation', title: 'SaaS Startup Grant', amount: '₹3,00,000', deadline: 'Feb 15, 2026', location: 'Remote', tags: ['SaaS', 'Startup'] },
  { id: 3, category: 'Tech & Innovation', title: 'CyberSecurity Shield', amount: '₹2,50,000', deadline: 'Mar 01, 2026', location: 'Hyderabad', tags: ['Security', 'Cyber'] },
  { id: 4, category: 'Tech & Innovation', title: 'Hardware Accelerator', amount: '₹10,00,000', deadline: 'Mar 20, 2026', location: 'Chennai', tags: ['Hardware', 'DeepTech'] },
  { id: 5, category: 'Tech & Innovation', title: 'Blockchain Seed Fund', amount: '₹4,00,000', deadline: 'Apr 05, 2026', location: 'Pune', tags: ['Web3', 'Blockchain'] },
  { id: 6, category: 'Tech & Innovation', title: 'DevTools Fellowship', amount: '₹1,50,000', deadline: 'Apr 20, 2026', location: 'Remote', tags: ['DevTools', 'Coding'] },
  { id: 7, category: 'Tech & Innovation', title: 'Mobile App Award', amount: '₹2,00,000', deadline: 'May 10, 2026', location: 'Delhi', tags: ['Mobile', 'Consumer'] },
  { id: 8, category: 'Tech & Innovation', title: 'VR/AR Creator Fund', amount: '₹6,00,000', deadline: 'Jun 01, 2026', location: 'Mumbai', tags: ['VR', 'AR', 'Metaverse'] },
  { id: 9, category: 'Tech & Innovation', title: 'Green Tech Prize', amount: '₹7,50,000', deadline: 'Jun 15, 2026', location: 'Bangalore', tags: ['Green', 'Sustainable'] },
  { id: 10, category: 'Tech & Innovation', title: 'Future of Work Grant', amount: '₹3,00,000', deadline: 'Jul 01, 2026', location: 'Remote', tags: ['Remote', 'Productivity'] },
  { id: 11, category: 'Tech & Innovation', title: '5G Solutions Hackathon', amount: '₹1,00,000', deadline: 'Nov 15, 2026', location: 'Hyderabad', tags: ['5G', 'Telecom', 'Coding'] },
  { id: 12, category: 'Tech & Innovation', title: 'IoT Smart City Grant', amount: '₹8,00,000', deadline: 'Dec 01, 2026', location: 'Ahmedabad', tags: ['IoT', 'SmartCity', 'Hardware'] },
  // Women Empowerment
  { id: 13, category: 'Women Empowerment', title: 'Women in Coding Scholarship', amount: '₹3,50,000', deadline: 'Mar 01, 2026', location: 'Remote', tags: ['Tech', 'Women', 'Diversity'] },
  { id: 14, category: 'Women Empowerment', title: 'Female Tech Leader Award', amount: '₹1,50,000', deadline: 'Mar 08, 2026', location: 'Mumbai', tags: ['Tech', 'Women'] },
  { id: 15, category: 'Women Empowerment', title: 'Women in Science Grant', amount: '₹5,00,000', deadline: 'May 30, 2026', location: 'Kolkata', tags: ['Research', 'Women'] },
  { id: 16, category: 'Women Empowerment', title: 'SheCodes Fellowship', amount: '₹2,00,000', deadline: 'Apr 01, 2026', location: 'Chennai', tags: ['Coding', 'Education'] },
  { id: 17, category: 'Women Empowerment', title: 'Women Founder Grant', amount: '₹10,00,000', deadline: 'Apr 15, 2026', location: 'Bangalore', tags: ['Startup', 'Founder'] },
  { id: 18, category: 'Women Empowerment', title: 'Girls in STEM Initiative', amount: '₹1,00,000', deadline: 'May 01, 2026', location: 'Delhi', tags: ['STEM', 'School'] },
  { id: 19, category: 'Women Empowerment', title: 'Diversity Tech Award', amount: '₹5,00,000', deadline: 'May 20, 2026', location: 'Hyderabad', tags: ['Corporate', 'Diversity'] },
  { id: 20, category: 'Women Empowerment', title: 'Mompreneur Fund', amount: '₹4,00,000', deadline: 'Jun 05, 2026', location: 'Remote', tags: ['Business', 'Home'] },
  { id: 21, category: 'Women Empowerment', title: 'LeadHerShip Grant', amount: '₹2,50,000', deadline: 'Jul 10, 2026', location: 'Pune', tags: ['Leadership', 'Mgmt'] },
  { id: 22, category: 'Women Empowerment', title: 'Digital Inclusion Fund', amount: '₹1,50,000', deadline: 'Jul 30, 2026', location: 'Remote', tags: ['Digital', 'Social'] },
  { id: 23, category: 'Women Empowerment', title: 'Tech Diversity Grant', amount: '₹2,00,000', deadline: 'Aug 15, 2026', location: 'Hyderabad', tags: ['Tech', 'Diversity'] },
  { id: 24, category: 'Women Empowerment', title: 'Future Leaders Scholarship', amount: '₹4,00,000', deadline: 'Sep 01, 2026', location: 'Delhi', tags: ['Leadership', 'Education'] },
  // Research & Science
  { id: 25, category: 'Research & Science', title: 'Junior Research Fellowship (JRF)', amount: '₹31,000/mo', deadline: 'Feb 20, 2026', location: 'New Delhi', tags: ['Govt', 'Research'] },
  { id: 26, category: 'Research & Science', title: 'Biotech Innovation Grant', amount: '₹10,00,000', deadline: 'Apr 10, 2026', location: 'Chennai', tags: ['BioTech', 'Science'] },
  { id: 27, category: 'Research & Science', title: 'Space Tech Research Fund', amount: '₹25,00,000', deadline: 'Jun 01, 2026', location: 'Bangalore', tags: ['Space', 'ISRO'] },
  { id: 28, category: 'Research & Science', title: 'Clean Energy Research Initiative', amount: '₹15,00,000', deadline: 'Jun 20, 2026', location: 'Hyderabad', tags: ['Energy', 'Green'] },
  { id: 29, category: 'Research & Science', title: 'Nano Science Mission', amount: '₹12,00,000', deadline: 'Jul 05, 2026', location: 'Mumbai', tags: ['NanoTech', 'Science'] },
  { id: 30, category: 'Research & Science', title: 'AI in Healthcare Research', amount: '₹8,00,000', deadline: 'Jul 25, 2026', location: 'Pune', tags: ['AI', 'Medical'] },
  { id: 31, category: 'Research & Science', title: 'Marine Ecosystem Grant', amount: '₹5,00,000', deadline: 'Aug 10, 2026', location: 'Kochi', tags: ['Marine', 'Bio'] },
  { id: 32, category: 'Research & Science', title: 'Climate Change Resilience', amount: '₹20,00,000', deadline: 'Aug 30, 2026', location: 'Remote', tags: ['Climate', 'Earth'] },
  { id: 33, category: 'Research & Science', title: 'Robotics & Automation Fellowship', amount: '₹6,00,000', deadline: 'Sep 15, 2026', location: 'Bangalore', tags: ['Robotics', 'Tech'] },
  { id: 34, category: 'Research & Science', title: 'Quantum Frontier Mission', amount: '₹18,00,000', deadline: 'Oct 01, 2026', location: 'Delhi', tags: ['Quantum', 'Physics'] },
  { id: 35, category: 'Research & Science', title: 'Sustainable Agriculture Grant', amount: '₹7,50,000', deadline: 'Oct 20, 2026', location: 'Punjab', tags: ['Agri', 'Science'] },
  { id: 36, category: 'Research & Science', title: 'Data Science Research Award', amount: '₹4,00,000', deadline: 'Nov 05, 2026', location: 'Hyderabad', tags: ['Data', 'Tech'] },
  // Govt. Schemes
  { id: 37, category: 'Govt. Schemes', title: 'National Scholarship Portal', amount: 'Variable', deadline: 'Mar 31, 2026', location: 'India', tags: ['Education', 'Govt'] },
  { id: 38, category: 'Govt. Schemes', title: 'PM Yuva Yojana', amount: '₹50,000', deadline: 'Jun 15, 2026', location: 'India', tags: ['Startups', 'Mentorship'] },
  { id: 39, category: 'Govt. Schemes', title: 'Stand Up India Scheme', amount: '₹10L - ₹1Cr', deadline: 'Rolling', location: 'India', tags: ['Loans', 'SC/ST/Women'] },
  { id: 40, category: 'Govt. Schemes', title: 'Startup India Seed Fund', amount: '₹20,00,000', deadline: 'Apr 15, 2026', location: 'India', tags: ['Startup', 'Seed'] },
  { id: 41, category: 'Govt. Schemes', title: 'Atal Innovation Mission', amount: '₹10,00,000', deadline: 'May 01, 2026', location: 'India', tags: ['Innovation', 'School'] },
  { id: 42, category: 'Govt. Schemes', title: 'MUDRA Yojana', amount: 'Up to ₹10L', deadline: 'Rolling', location: 'India', tags: ['SME', 'Loans'] },
  { id: 43, category: 'Govt. Schemes', title: 'Digital India Internship', amount: '₹10,000/mo', deadline: 'May 20, 2026', location: 'New Delhi', tags: ['Internship', 'Digital'] },
  { id: 44, category: 'Govt. Schemes', title: 'PM Kaushal Vikas Yojana', amount: 'Training', deadline: 'Rolling', location: 'State-wise', tags: ['Skill', 'Training'] },
  { id: 45, category: 'Govt. Schemes', title: 'NIDHI-EIR Support', amount: '₹30,000/mo', deadline: 'Jun 30, 2026', location: 'Incubators', tags: ['Entrepreneur', 'Stipend'] },
  { id: 46, category: 'Govt. Schemes', title: 'FAME India Scheme', amount: 'Subsidy', deadline: 'Jul 15, 2026', location: 'India', tags: ['EV', 'Green'] },
  { id: 47, category: 'Govt. Schemes', title: 'Aspire Scheme', amount: 'Variable', deadline: 'Aug 01, 2026', location: 'Rural India', tags: ['Rural', 'Agri'] },
  { id: 48, category: 'Govt. Schemes', title: 'Single Girl Child Scholarship', amount: '₹2,000/mo', deadline: 'Oct 31, 2026', location: 'India', tags: ['Education', 'Women'] },
  // Social Impact
  { id: 49, category: 'Social Impact', title: 'Clean Water Initiative', amount: '₹4,50,000', deadline: 'Feb 10, 2026', location: 'Remote', tags: ['Sustainability', 'Water'] },
  { id: 50, category: 'Social Impact', title: 'Rural Education Fund', amount: '₹3,00,000', deadline: 'Feb 25, 2026', location: 'Village-based', tags: ['Education', 'Rural'] },
  { id: 51, category: 'Social Impact', title: 'Elderly Care Grant', amount: '₹2,00,000', deadline: 'Mar 15, 2026', location: 'Mumbai', tags: ['Healthcare', 'Social'] },
  { id: 52, category: 'Social Impact', title: 'Zero Hunger Mission', amount: '₹6,00,000', deadline: 'Apr 01, 2026', location: 'Delhi', tags: ['Food Tech', 'Impact'] },
  { id: 53, category: 'Social Impact', title: 'Mental Health Awareness', amount: '₹1,50,000', deadline: 'Apr 20, 2026', location: 'Remote', tags: ['Healthcare', 'Youth'] },
  { id: 54, category: 'Social Impact', title: 'Eco-Friendly Housing', amount: '₹12,00,000', deadline: 'May 05, 2026', location: 'Bangalore', tags: ['Green', 'Housing'] },
  { id: 55, category: 'Social Impact', title: 'Skill India Fellowship', amount: '₹2,50,000', deadline: 'May 30, 2026', location: 'Hyderabad', tags: ['Vocational', 'Skills'] },
  { id: 56, category: 'Social Impact', title: 'Disability Tech Support', amount: '₹5,00,000', deadline: 'Jun 12, 2026', location: 'Pune', tags: ['AssistiveTech', 'Social'] },
  { id: 57, category: 'Social Impact', title: 'Renewable Village Power', amount: '₹8,50,000', deadline: 'Jul 01, 2026', location: 'Remote', tags: ['Solar', 'Energy'] },
  { id: 58, category: 'Social Impact', title: 'Animal Welfare Grant', amount: '₹1,00,000', deadline: 'Aug 10, 2026', location: 'Kolkata', tags: ['Animals', 'Conservation'] },
  { id: 59, category: 'Social Impact', title: 'Youth Crime Prevention', amount: '₹4,00,000', deadline: 'Sep 20, 2026', location: 'Chennai', tags: ['Community', 'Safety'] },
  { id: 60, category: 'Social Impact', title: 'Digital Literacy Campaign', amount: '₹3,50,000', deadline: 'Oct 05, 2026', location: 'India', tags: ['Digital', 'Education'] },
  // Entrepreneurship
  { id: 61, category: 'Entrepreneurship', title: 'Student Startup Seed Fund', amount: '₹5,00,000', deadline: 'Feb 05, 2026', location: 'Incubators', tags: ['Startup', 'Seed'] },
  { id: 62, category: 'Entrepreneurship', title: 'Incubator Growth Grant', amount: '₹10,00,000', deadline: 'Mar 01, 2026', location: 'Tier-1 Cities', tags: ['Scaling', 'Tech'] },
  { id: 63, category: 'Entrepreneurship', title: 'Young Founder Award', amount: '₹2,00,000', deadline: 'Mar 25, 2026', location: 'Remote', tags: ['Founder', 'Individual'] },
  { id: 64, category: 'Entrepreneurship', title: 'B2B SaaS Fellowship', amount: '₹4,00,000', deadline: 'Apr 10, 2026', location: 'Bangalore', tags: ['SaaS', 'B2B'] },
  { id: 65, category: 'Entrepreneurship', title: 'E-Commerce Entry Grant', amount: '₹1,50,000', deadline: 'May 01, 2026', location: 'Hyderabad', tags: ['D2C', 'Retail'] },
  { id: 66, category: 'Entrepreneurship', title: 'Social Venture Capital', amount: '₹20,00,000', deadline: 'May 20, 2026', location: 'Mumbai', tags: ['Social', 'Business'] },
  { id: 67, category: 'Entrepreneurship', title: 'Marketplace Innovation', amount: '₹7,00,000', deadline: 'Jun 15, 2026', location: 'Remote', tags: ['Platform', 'Startup'] },
  { id: 68, category: 'Entrepreneurship', title: 'Hardware Prototype Fund', amount: '₹15,00,000', deadline: 'Jul 10, 2026', location: 'Pune', tags: ['IoT', 'Hardware'] },
  { id: 69, category: 'Entrepreneurship', title: 'FinTech Disruptor Grant', amount: '₹8,00,000', deadline: 'Aug 05, 2026', location: 'Ahmedabad', tags: ['FinTech', 'Payments'] },
  { id: 70, category: 'Entrepreneurship', title: 'Creative Economy Fund', amount: '₹3,00,000', deadline: 'Sep 01, 2026', location: 'Chennai', tags: ['Design', 'Art'] },
  { id: 71, category: 'Entrepreneurship', title: 'EdTech Scaler Grant', amount: '₹12,50,000', deadline: 'Oct 15, 2026', location: 'Delhi', tags: ['EdTech', 'Learning'] },
  { id: 72, category: 'Entrepreneurship', title: 'Bootstrapped Support Fund', amount: '₹2,50,000', deadline: 'Nov 30, 2026', location: 'Remote', tags: ['Equity-free', 'Grant'] }
];

// --- Sub-Components ---

const CustomInput = ({ label, placeholder, type = "text", required = false, value, onChange, readOnly = false, icon: Icon, select, children, multiline, rows }) => (
  <Box sx={{ mb: 2, width: '100%' }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </Typography>
    <TextField
      fullWidth
      select={select}
      placeholder={placeholder}
      type={!select ? type : undefined}
      value={value}
      onChange={onChange}
      disabled={readOnly}
      size="medium"
      multiline={multiline} // This allows it to expand
      rows={rows}           // This sets the height
      InputProps={{
        startAdornment: Icon ? (
          <InputAdornment position="start">
            <Icon size={18} color="#9ca3af" />
          </InputAdornment>
        ) : null,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: PRIMARY_COLOR,
            borderWidth: 2,
          },
        },
      }}
    >
      {children}
    </TextField>
  </Box>
);

const renderApplicationList = (setActiveTab, setSelectedItem, setViewState) => (
    <Card sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 3, bgcolor: PRIMARY_COLOR, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="white" fontWeight="bold">My Applications History</Typography>
        {/* <Button
          variant="outlined"
          startIcon={<ArrowLeft size={16} />}
          onClick={() => setActiveTab('Applications')}
          sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
        >
          Back to Dashboard
        </Button> */}
      </Box>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {/* Added index 'i' as key here to fix the warning */}
              {['ID', 'Type', 'Title', 'Date', 'Status', 'Action'].map((h, i) => (
                <th key={i} style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPS_DATA.map((app) => (
              <tr key={app.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '16px', fontSize: '13px', fontFamily: 'monospace', color: '#6b7280' }}>{app.id}</td>
                <td style={{ padding: '16px' }}><Chip label={app.type} size="small" variant="outlined" sx={{ fontWeight: 'bold' }} /></td>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>{app.title}</td>
                <td style={{ padding: '16px', color: '#6b7280' }}>{app.date}</td>
                <td style={{ padding: '16px' }}><Chip label={app.status} color={app.color} size="small" /></td>
                <td style={{ padding: '16px' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => { setSelectedItem(app); setViewState('detail'); }}
                    sx={{
                      bgcolor: 'transparent',
                      color: 'primary.main',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      borderRadius: '16px',
                      px: 2,
                      textTransform: 'none',
                      fontWeight: 700,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderColor: 'primary.main',
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Card>
  );
const renderApplicationDetail = (selectedItem, setViewState) => { 
    if (!selectedItem) return null;
    const activeStep = selectedItem.status === 'Approved' ? 4 : selectedItem.status === 'Interview' ? 2 : 1;
    const TOP_BOX_HEIGHT = '340px';

    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <IconButton
            onClick={() => setViewState('list')}
            sx={{
              bgcolor: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '50%',
              p: 1.5,
              transition: 'all 0.2s',
              '&:hover': { bgcolor: '#f8fafc', transform: 'translateX(-4px)' }
            }}
          >
            <ArrowLeft size={24} color={PRIMARY_COLOR} />
          </IconButton>

          <Box>
            <Typography variant="h3" fontWeight={600} color={PRIMARY_COLOR} sx={{ letterSpacing: -1 }}>
              {selectedItem.title}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} mt={6}>
            <Paper elevation={0} sx={{
              height: TOP_BOX_HEIGHT, borderRadius: 6, border: '2px solid #191b21', p: 3,
              display: 'flex', flexDirection: 'column', bgcolor: 'white'
            }}>
              <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', letterSpacing: 1.5 }}>Verification</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Avatar sx={{ width: 50, height: 50, bgcolor: '#f0fdf4', color: PRIMARY_COLOR, border: `2px solid ${PRIMARY_COLOR}`, fontWeight: 900 }}>AS</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800} lineHeight={1}>Prof. A. Sharma</Typography>
                    <Typography variant="caption" color="text.secondary">Review Committee</Typography>
                  </Box>
                </Stack>
                <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 4, border: '1px solid #f1f5f9' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', lineHeight: 1.5 }}>
                    "Document integrity verified. Awaiting department head signature for final clearance."
                  </Typography>
                </Box>
                <Button fullWidth variant="contained" startIcon={<FileText size={16} />} sx={{ mt: 3, bgcolor: PRIMARY_COLOR, borderRadius: 2, fontWeight: 700, py: 1.2 }}>
                  View Full PDF
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} mt={6}>
            <Paper elevation={0} sx={{
              height: TOP_BOX_HEIGHT, borderRadius: 6, border: '2px solid #191b21', p: 3,
              display: 'flex', flexDirection: 'column', bgcolor: 'white'
            }}>
              <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', letterSpacing: 1.5 }}>Milestones</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack spacing={2}>
                  {['Submitted', 'Under Review', 'Interview', 'Final Decision'].map((step, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{
                        width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: i + 1 <= activeStep ? '#4ade80' : '#f1f5f9',
                        color: i + 1 <= activeStep ? 'white' : '#94a3b8'
                      }}>
                        {i + 1 <= activeStep ? <CheckCircle size={14} /> : <Typography variant="caption" fontWeight={900}>{i + 1}</Typography>}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: i + 1 === activeStep ? 800 : 500, color: i + 1 <= activeStep ? 'text.primary' : 'text.disabled' }}>
                        {step}
                      </Typography>
                      {i + 1 === activeStep && <Chip label="ACTIVE" size="small" sx={{ ml: 'auto', height: 16, fontSize: '0.6rem', fontWeight: 900, bgcolor: '#fef2f2', color: '#ef4444' }} />}
                    </Box>
                  ))}
                </Stack>
                <Button fullWidth variant="outlined" color="error" sx={{ mt: 3, borderRadius: 2, fontWeight: 700, borderColor: '#fee2e2' }}>
                  Withdraw Application
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };

const renderApplicationModal = (viewState, setViewState, selectedItem) => (
    <Dialog open={viewState === 'apply' || viewState === 'request'} >
      <Box sx={{ bgcolor: PRIMARY_COLOR, color: 'white', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Coins size={24} />
          <Box>
            <Typography variant="h6" fontWeight="bold">{selectedItem ? `Apply for ${selectedItem.title}` : 'Request Funding'}</Typography>
            {selectedItem && (
              <Typography variant="caption" sx={{ opacity: 0.8, fontFamily: 'monospace' }}>
                {selectedItem.investor ? `Investor: ${selectedItem.investor}` : `Category: ${selectedItem.category}`}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton onClick={() => setViewState('list')} sx={{ color: 'white' }}><XCircle /></IconButton>
      </Box>
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ bgcolor: '#fff7ed', color: '#9a3412', p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <AlertCircle size={18} />
          <Typography variant="caption" fontWeight="bold">Ensure your pitch deck is up to date.</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}><CustomInput label="Project / Startup Name" required icon={Building} /></Grid>
          <Grid item xs={6}>
            <CustomInput
              label="Amount (₹)"
              value={selectedItem?.amount || ''}
              readOnly={!!selectedItem?.amount}
              icon={DollarSign}
            />
          </Grid>
          {!selectedItem?.category && <Grid item xs={6}><CustomInput label="Equity Offer (%)" /></Grid>}
          <Grid item xs={12}>
            <CustomInput label="Short Pitch"><TextField multiline rows={3} fullWidth placeholder="Describe in 2 sentences..." /></CustomInput>
          </Grid>
          <Grid item xs={6}><CustomInput label="Video Pitch URL" icon={PlayCircle} /></Grid>
          <Grid item xs={6}><CustomInput label="Website" icon={LinkIcon} /></Grid>
        </Grid>

        <input
          type="file"
          id="file-upload-modal"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload-modal" style={{ width: '100%', display: 'block' }}>
          <Box
            sx={{
              border: '2px dashed #d1d5db', bgcolor: '#f9fafb', borderRadius: 3, p: 4, mt: 2,
              display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
              '&:hover': { bgcolor: '#f0fdf4', borderColor: '#4ade80' }
            }}
          >
            <UploadCloud size={32} color="#9ca3af" />
            <Typography variant="subtitle2" color="text.secondary" mt={1}>Upload Deck (PDF)</Typography>
            <Typography variant="caption" color="text.secondary">Drag & drop or click to browse</Typography>
          </Box>
        </label>
      </DialogContent>
      <DialogActions sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
        <Button onClick={() => setViewState('list')} size="large" sx={{ color: 'text.secondary' }}>Cancel</Button>
        <Button variant="contained" size="large" sx={{ bgcolor: PRIMARY_COLOR }}>Submit Proposal</Button>
      </DialogActions>
    </Dialog>
  );
  

const renderGrants = (selectedGrantCategory, setSelectedGrantCategory, searchQuery, setSearchQuery, setSelectedItem, setViewState, setActiveTab) => {
    const filtered = selectedGrantCategory
      ? GRANTS_DATA.filter(g => g.category === selectedGrantCategory && (!searchQuery || g.title.toLowerCase().includes(searchQuery.toLowerCase())))
      : [];

    const CATEGORIES = [
      { id: 'Tech & Innovation', desc: 'AI, Coding, SaaS, and Hardware grants', icon: Sparkles },
      { id: 'Research & Science', desc: 'Fellowships for Medical, Space & Bio-Sciences', icon: GraduationCap },
      { id: 'Women Empowerment', desc: 'Exclusive scholarships & leadership awards', icon: Users },
      { id: 'Govt. Schemes', desc: 'National and State financial aid programs', icon: Building },
      { id: 'Social Impact', desc: 'Grants for NGOs and community development', icon: TrendingUp },
      { id: 'Entrepreneurship', desc: 'Seed funding for student-led startups', icon: Briefcase },
    ];

    return (
      <Box height="100%" display="flex" flexDirection="column">
        {!selectedGrantCategory ? (
          <>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <IconButton onClick={() => setActiveTab('Applications')} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb' }}>
                <ArrowLeft size={20} />
              </IconButton>
              <Typography variant="h4" fontWeight={1000} color="primary">
                Grant Categories
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              wrap="nowrap"
              sx={{
                overflowX: 'auto',
                pb: 2,
                mt: 12
              }}
            >
              {CATEGORIES.map((cat) => (
                <Grid item xs={3} key={cat.id} sx={{ display: 'flex', minWidth: '280px' }}>
                  <Card
                    onClick={() => { setSelectedGrantCategory(cat.id); setSearchQuery(''); }}
                    elevation={0}
                    sx={{
                      bgcolor: 'white',
                      border: `2px solid ${PRIMARY_COLOR}`,
                      p: 4,
                      borderRadius: 10,
                      cursor: 'pointer',
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      transition: 'all 0.3s ease-in-out',
                      '& .MuiTypography-root, & .lucide': {
                        color: PRIMARY_COLOR,
                        transition: 'color 0.3s ease'
                      },
                      '&:hover': {
                        bgcolor: PRIMARY_COLOR,
                        '& .MuiTypography-root, & .lucide': {
                          color: 'white',
                        },
                        '& .icon-circle': {
                          bgcolor: 'rgba(255,255,255,0.2)'
                        }
                      }
                    }}
                  >
                    <Box
                      className="icon-circle"
                      sx={{
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: '#f0fdf4',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease'
                      }}
                    >
                      <cat.icon size={32} />
                    </Box>
                    <Typography variant="h6" fontWeight={800} sx={{ mb: 1, textTransform: 'uppercase', lineHeight: 1.2 }}>
                      {cat.id}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {cat.desc}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <IconButton onClick={() => setSelectedGrantCategory(null)} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb' }}>
                <ArrowLeft size={20} />
              </IconButton>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="primary">{selectedGrantCategory}</Typography>
                <Typography variant="caption" color="text.secondary">Showing {filtered.length} opportunities</Typography>
              </Box>
            </Box>

            <TextField
              fullWidth
              placeholder={`Search in ${selectedGrantCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search size={20} /></InputAdornment> }}
              sx={{ mb: 4, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />

            <Stack spacing={2} sx={{ overflowY: 'auto', pr: 1 }}>
              {filtered.map(grant => (
                <Paper
                  key={grant.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: PRIMARY_COLOR,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box sx={{ minWidth: '150px' }}>
                    <Typography variant="h5" color="primary" fontWeight={900} sx={{ lineHeight: 1 }}>
                      {grant.amount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>
                      GRANT VALUE
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Box display="flex" gap={1} mb={1}>
                      <Chip label={grant.location} size="small" icon={<MapPin size={12} />} sx={{ fontSize: 10, height: 20 }} />
                      <Chip label={`Due: ${grant.deadline}`} size="small" sx={{ fontSize: 10, height: 20, bgcolor: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, lineHeight: 1.2 }}>
                      {grant.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {grant.tags?.map(t => (
                        <Typography key={t} variant="caption" sx={{ color: 'text.secondary', bgcolor: '#f3f4f6', px: 1, py: 0.2, borderRadius: 1 }}>
                          #{t}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Button
                      variant="outlined"
                      sx={{
                        bgcolor: 'transparent',
                        color: PRIMARY_COLOR,
                        border: `1px solid ${PRIMARY_COLOR}`,
                        borderRadius: '20px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: PRIMARY_COLOR,
                          color: 'white',
                          border: `2px solid ${PRIMARY_COLOR}`,
                          transform: 'scale(1.02)'
                        }
                      }}
                      onClick={() => { setSelectedItem(grant); setViewState('apply'); }}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </Paper>
              ))}

              {filtered.length === 0 && (
                <Box textAlign="center" py={8}>
                  <Typography variant="body1" color="text.secondary">No grants found matching your search.</Typography>
                </Box>
              )}
            </Stack>
          </>
        )}
      </Box>
    );
  };

const renderFunding = (setSelectedItem, setViewState) => (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <IconButton
          onClick={() => setActiveTab('Applications')}
          sx={{
            bgcolor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '50%',
            p: 1.5
          }}
        >
          <ArrowLeft size={24} color={PRIMARY_COLOR} />
        </IconButton>
        <Typography variant="h4" fontWeight={800} color="primary">
          Project Funding
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #1a593e 100%)`,
            borderRadius: 8,
            p: { xs: 4, md: 6 },
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            width: '100%'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Wallet size={54} color="#86efac" style={{ marginBottom: 16 }} />
            <Typography variant="h4" fontWeight="900" gutterBottom sx={{ letterSpacing: -1 }}>
              Launch Your Startup
            </Typography>
            <Typography variant="body1" sx={{ color: '#dcfce7', mb: 4, maxWidth: 500, mx: 'auto', opacity: 0.9 }}>
              Connect with our network of verified investors and secure seed capital for your innovative ideas.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: PRIMARY_COLOR,
                fontWeight: 800,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                '&:hover': { bgcolor: '#f8fafc' }
              }}
              onClick={() => { setSelectedItem(null); setViewState('request'); }}
            >
              Create Funding Request
            </Button>
          </Box>
          <Box sx={{ position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, bgcolor: 'white', opacity: 0.05, borderRadius: '50%' }} />
          <Box sx={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, bgcolor: 'white', opacity: 0.05, borderRadius: '50%' }} />
        </Box>
      </Container>
    </Box>
  );

// --- Main Application Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Applications'); // DEFAULT TAB CHANGED TO APPLICATIONS
  const [expandedMenu, setExpandedMenu] = useState({ Applications: true });
  const [viewState, setViewState] = useState('list');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedGrantCategory, setSelectedGrantCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = (menuId) => {
    setExpandedMenu(prev => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setViewState('list');
    setSelectedItem(null);
    setSelectedGrantCategory(null);
    setSearchQuery('');
  };

  const handleAppClick = (app) => {
    setSelectedItem(app);
    setViewState('detail');
  };

  // --- Render Functions ---

  const renderApplicationsDashboard = () => (
    <Container maxWidth="lg" sx={{ pt: 3, pb: 8 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#0d3926',
            mb: 1.5
          }}
        >
          Applications Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Manage your funding, grants, and application status in one place.
        </Typography>
      </Box>

      <Grid container spacing={3} wrap="nowrap" sx={{ overflowX: 'auto', pb: 2, mt: 10 }}>
        {[
          {
            title: 'My Applications',
            icon: Folder,
            color: '#0d3926',
            tab: 'ApplicationsList',
            desc: 'Track status, view history, and manage submissions.',
            action: 'Open Dashboard',
          },
          {
            title: 'Student Grants',
            icon: GraduationCap,
            color: '#0d3926',
            tab: 'Grants',
            desc: 'Explore scholarships, research aid, and merit grants.',
            action: 'Explore Grants',
          },
          {
            title: 'Project Funding',
            icon: Coins,
            color: '#0d3926',
            tab: 'Funding',
            desc: 'Secure seed capital and investor connections for startups.',
            action: 'Request Funding',
          },
        ].map((item, index) => (
          <Grid
            item
            xs={4}
            key={item.title}
            sx={{ display: 'flex', minWidth: { xs: '300px', md: 'auto' } }}
          >
            <Card
              elevation={0}
              sx={{
                height: '100%',
                width: '100%',
                borderRadius: 10,
                bgcolor: 'white',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                border: `2px solid ${PRIMARY_COLOR}`,
                boxShadow: '0px 10px 40px rgba(0,0,0,0.06)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
                '&:hover': {
                  bgcolor: item.color,
                  borderColor: item.color,
                  '& .card-text': {
                    color: '#fff',
                  },
                  '& .card-icon': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                  },
                },
              }}
              onClick={() => handleNavClick(item.tab)}
            >
              <CardContent
                sx={{
                  p: 4,
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  className="card-icon"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    bgcolor: `${item.color}08`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    mb: 4,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <item.icon size={32} />
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  className="card-text"
                  sx={{ color: '#1e293b', mb: 1.5 }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  className="card-text"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    lineHeight: 1.6,
                    flexGrow: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  {item.desc}
                </Typography>

                <Box display="flex" alignItems="center">
                  <Typography
                    variant="button"
                    className="card-text"
                    sx={{
                      color: item.color,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.9rem',
                    }}
                  >
                    {item.action} <ChevronRight size={18} />
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  // const renderApplicationList = () => (
  //   <Card sx={{ overflow: 'hidden' }}>
  //     <Box sx={{ p: 3, bgcolor: PRIMARY_COLOR, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //       <Typography variant="h6" color="white" fontWeight="bold">My Applications History</Typography>
  //       <Button
  //         variant="outlined"
  //         startIcon={<ArrowLeft size={16} />}
  //         onClick={() => setActiveTab('Applications')}
  //         sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
  //       >
  //         Back to Dashboard
  //       </Button>
  //     </Box>
  //     <Box sx={{ overflowX: 'auto' }}>
  //       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  //         <thead>
  //           <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
  //             {/* Added index 'i' as key here to fix the warning */}
  //             {['ID', 'Type', 'Title', 'Date', 'Status', 'Action'].map((h, i) => (
  //               <th key={i} style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>{h}</th>
  //             ))}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {APPS_DATA.map((app) => (
  //             <tr key={app.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
  //               <td style={{ padding: '16px', fontSize: '13px', fontFamily: 'monospace', color: '#6b7280' }}>{app.id}</td>
  //               <td style={{ padding: '16px' }}><Chip label={app.type} size="small" variant="outlined" sx={{ fontWeight: 'bold' }} /></td>
  //               <td style={{ padding: '16px', fontWeight: 'bold' }}>{app.title}</td>
  //               <td style={{ padding: '16px', color: '#6b7280' }}>{app.date}</td>
  //               <td style={{ padding: '16px' }}><Chip label={app.status} color={app.color} size="small" /></td>
  //               <td style={{ padding: '16px' }}>
  //                 <Button
  //                   size="small"
  //                   variant="outlined"
  //                   onClick={() => { setSelectedItem(app); setViewState('detail'); }}
  //                   sx={{
  //                     bgcolor: 'transparent',
  //                     color: 'primary.main',
  //                     border: '1px solid',
  //                     borderColor: 'primary.main',
  //                     borderRadius: '16px',
  //                     px: 2,
  //                     textTransform: 'none',
  //                     fontWeight: 700,
  //                     transition: 'all 0.3s ease',
  //                     '&:hover': {
  //                       bgcolor: 'primary.main',
  //                       color: 'white',
  //                       borderColor: 'primary.main',
  //                       transform: 'scale(1.05)'
  //                     }
  //                   }}
  //                 >
  //                   View
  //                 </Button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </Box>
  //   </Card>
  // );

  const renderApplicationDetail = () => {
    if (!selectedItem) return null;
    const activeStep = selectedItem.status === 'Approved' ? 4 : selectedItem.status === 'Interview' ? 2 : 1;
    const TOP_BOX_HEIGHT = '340px';

    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <IconButton
            onClick={() => setViewState('list')}
            sx={{
              bgcolor: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '50%',
              p: 1.5,
              transition: 'all 0.2s',
              '&:hover': { bgcolor: '#f8fafc', transform: 'translateX(-4px)' }
            }}
          >
            <ArrowLeft size={24} color={PRIMARY_COLOR} />
          </IconButton>

          <Box>
            <Typography variant="h3" fontWeight={600} color={PRIMARY_COLOR} sx={{ letterSpacing: -1 }}>
              {selectedItem.title}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} mt={6}>
            <Paper elevation={0} sx={{
              height: TOP_BOX_HEIGHT, borderRadius: 6, border: '2px solid #191b21', p: 3,
              display: 'flex', flexDirection: 'column', bgcolor: 'white'
            }}>
              <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', letterSpacing: 1.5 }}>Verification</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Avatar sx={{ width: 50, height: 50, bgcolor: '#f0fdf4', color: PRIMARY_COLOR, border: `2px solid ${PRIMARY_COLOR}`, fontWeight: 900 }}>AS</Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800} lineHeight={1}>Prof. A. Sharma</Typography>
                    <Typography variant="caption" color="text.secondary">Review Committee</Typography>
                  </Box>
                </Stack>
                <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 4, border: '1px solid #f1f5f9' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', lineHeight: 1.5 }}>
                    "Document integrity verified. Awaiting department head signature for final clearance."
                  </Typography>
                </Box>
                <Button fullWidth variant="contained" startIcon={<FileText size={16} />} sx={{ mt: 3, bgcolor: PRIMARY_COLOR, borderRadius: 2, fontWeight: 700, py: 1.2 }}>
                  View Full PDF
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} mt={6}>
            <Paper elevation={0} sx={{
              height: TOP_BOX_HEIGHT, borderRadius: 6, border: '2px solid #191b21', p: 3,
              display: 'flex', flexDirection: 'column', bgcolor: 'white'
            }}>
              <Typography variant="overline" sx={{ fontWeight: 900, color: 'text.secondary', letterSpacing: 1.5 }}>Milestones</Typography>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack spacing={2}>
                  {['Submitted', 'Under Review', 'Interview', 'Final Decision'].map((step, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{
                        width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: i + 1 <= activeStep ? '#4ade80' : '#f1f5f9',
                        color: i + 1 <= activeStep ? 'white' : '#94a3b8'
                      }}>
                        {i + 1 <= activeStep ? <CheckCircle size={14} /> : <Typography variant="caption" fontWeight={900}>{i + 1}</Typography>}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: i + 1 === activeStep ? 800 : 500, color: i + 1 <= activeStep ? 'text.primary' : 'text.disabled' }}>
                        {step}
                      </Typography>
                      {i + 1 === activeStep && <Chip label="ACTIVE" size="small" sx={{ ml: 'auto', height: 16, fontSize: '0.6rem', fontWeight: 900, bgcolor: '#fef2f2', color: '#ef4444' }} />}
                    </Box>
                  ))}
                </Stack>
                <Button fullWidth variant="outlined" color="error" sx={{ mt: 3, borderRadius: 2, fontWeight: 700, borderColor: '#fee2e2' }}>
                  Withdraw Application
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };

  const renderApplicationModal = () => (
    <Dialog
      open={viewState === 'apply' || viewState === 'request'}
      onClose={() => setViewState('list')}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <Box sx={{ bgcolor: PRIMARY_COLOR, color: 'white', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Coins size={24} />
          <Box>
            <Typography variant="h6" fontWeight="bold">{selectedItem ? `Apply for ${selectedItem.title}` : 'Request Funding'}</Typography>
            {selectedItem && (
              <Typography variant="caption" sx={{ opacity: 0.8, fontFamily: 'monospace' }}>
                {selectedItem.investor ? `Investor: ${selectedItem.investor}` : `Category: ${selectedItem.category}`}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton onClick={() => setViewState('list')} sx={{ color: 'white' }}><XCircle /></IconButton>
      </Box>
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ bgcolor: '#fff7ed', color: '#9a3412', p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <AlertCircle size={18} />
          <Typography variant="caption" fontWeight="bold">Ensure your pitch deck is up to date.</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}><CustomInput label="Project / Startup Name" required icon={Building} /></Grid>
          <Grid item xs={6}>
            <CustomInput
              label="Amount (₹)"
              value={selectedItem?.amount || ''}
              readOnly={!!selectedItem?.amount}
              icon={DollarSign}
            />
          </Grid>
          {!selectedItem?.category && <Grid item xs={6}><CustomInput label="Equity Offer (%)" /></Grid>}
          <Grid item xs={12}>
            <CustomInput
              label="Short Pitch"
              placeholder="Describe in 2 sentences..."
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6}><CustomInput label="Video Pitch URL" icon={PlayCircle} /></Grid>
          <Grid item xs={6}><CustomInput label="Website" icon={LinkIcon} /></Grid>
        </Grid>

        <input
          type="file"
          id="file-upload-modal"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload-modal" style={{ width: '100%', display: 'block' }}>
          <Box
            sx={{
              border: '2px dashed #d1d5db', bgcolor: '#f9fafb', borderRadius: 3, p: 4, mt: 2,
              display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
              '&:hover': { bgcolor: '#f0fdf4', borderColor: '#4ade80' }
            }}
          >
            <UploadCloud size={32} color="#9ca3af" />
            <Typography variant="subtitle2" color="text.secondary" mt={1}>Upload Deck (PDF)</Typography>
            <Typography variant="caption" color="text.secondary">Drag & drop or click to browse</Typography>
          </Box>
        </label>
      </DialogContent>
      <DialogActions sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
        <Button onClick={() => setViewState('list')} size="large" sx={{ color: 'text.secondary' }}>Cancel</Button>
        <Button variant="contained" size="large" sx={{ bgcolor: PRIMARY_COLOR }}>Submit Proposal</Button>
      </DialogActions>
    </Dialog>
  );

  // const renderGrants = () => {
  //   const filtered = selectedGrantCategory
  //     ? GRANTS_DATA.filter(g => g.category === selectedGrantCategory && (!searchQuery || g.title.toLowerCase().includes(searchQuery.toLowerCase())))
  //     : [];

  //   const CATEGORIES = [
  //     { id: 'Tech & Innovation', desc: 'AI, Coding, SaaS, and Hardware grants', icon: Sparkles },
  //     { id: 'Research & Science', desc: 'Fellowships for Medical, Space & Bio-Sciences', icon: GraduationCap },
  //     { id: 'Women Empowerment', desc: 'Exclusive scholarships & leadership awards', icon: Users },
  //     { id: 'Govt. Schemes', desc: 'National and State financial aid programs', icon: Building },
  //     { id: 'Social Impact', desc: 'Grants for NGOs and community development', icon: TrendingUp },
  //     { id: 'Entrepreneurship', desc: 'Seed funding for student-led startups', icon: Briefcase },
  //   ];

  //   return (
  //     <Box height="100%" display="flex" flexDirection="column">
  //       {!selectedGrantCategory ? (
  //         <>
  //           <Box display="flex" alignItems="center" gap={2} mb={4}>
  //             <IconButton onClick={() => setActiveTab('Applications')} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb' }}>
  //               <ArrowLeft size={20} />
  //             </IconButton>
  //             <Typography variant="h4" fontWeight={1000} color="primary">
  //               Grant Categories
  //             </Typography>
  //           </Box>

  //           <Grid
  //             container
  //             spacing={2}
  //             wrap="nowrap"
  //             sx={{
  //               overflowX: 'auto',
  //               pb: 2,
  //               mt: 12
  //             }}
  //           >
  //             {CATEGORIES.map((cat) => (
  //               <Grid item xs={3} key={cat.id} sx={{ display: 'flex', minWidth: '280px' }}>
  //                 <Card
  //                   onClick={() => { setSelectedGrantCategory(cat.id); setSearchQuery(''); }}
  //                   elevation={0}
  //                   sx={{
  //                     bgcolor: 'white',
  //                     border: `2px solid ${PRIMARY_COLOR}`,
  //                     p: 4,
  //                     borderRadius: 10,
  //                     cursor: 'pointer',
  //                     height: '100%',
  //                     width: '100%',
  //                     display: 'flex',
  //                     flexDirection: 'column',
  //                     alignItems: 'center',
  //                     justifyContent: 'center',
  //                     textAlign: 'center',
  //                     transition: 'all 0.3s ease-in-out',
  //                     '& .MuiTypography-root, & .lucide': {
  //                       color: PRIMARY_COLOR,
  //                       transition: 'color 0.3s ease'
  //                     },
  //                     '&:hover': {
  //                       bgcolor: PRIMARY_COLOR,
  //                       '& .MuiTypography-root, & .lucide': {
  //                         color: 'white',
  //                       },
  //                       '& .icon-circle': {
  //                         bgcolor: 'rgba(255,255,255,0.2)'
  //                       }
  //                     }
  //                   }}
  //                 >
  //                   <Box
  //                     className="icon-circle"
  //                     sx={{
  //                       p: 2,
  //                       borderRadius: '50%',
  //                       bgcolor: '#f0fdf4',
  //                       mb: 2,
  //                       display: 'flex',
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                       transition: 'background-color 0.3s ease'
  //                     }}
  //                   >
  //                     <cat.icon size={32} />
  //                   </Box>
  //                   <Typography variant="h6" fontWeight={800} sx={{ mb: 1, textTransform: 'uppercase', lineHeight: 1.2 }}>
  //                     {cat.id}
  //                   </Typography>
  //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
  //                     {cat.desc}
  //                   </Typography>
  //                 </Card>
  //               </Grid>
  //             ))}
  //           </Grid>
  //         </>
  //       ) : (
  //         <>
  //           <Box display="flex" alignItems="center" gap={2} mb={4}>
  //             <IconButton onClick={() => setSelectedGrantCategory(null)} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb' }}>
  //               <ArrowLeft size={20} />
  //             </IconButton>
  //             <Box>
  //               <Typography variant="h5" fontWeight="bold" color="primary">{selectedGrantCategory}</Typography>
  //               <Typography variant="caption" color="text.secondary">Showing {filtered.length} opportunities</Typography>
  //             </Box>
  //           </Box>

  //           <TextField
  //             fullWidth
  //             placeholder={`Search in ${selectedGrantCategory}...`}
  //             value={searchQuery}
  //             onChange={(e) => setSearchQuery(e.target.value)}
  //             InputProps={{ startAdornment: <InputAdornment position="start"><Search size={20} /></InputAdornment> }}
  //             sx={{ mb: 4, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
  //           />

  //           <Stack spacing={2} sx={{ overflowY: 'auto', pr: 1 }}>
  //             {filtered.map(grant => (
  //               <Paper
  //                 key={grant.id}
  //                 elevation={0}
  //                 sx={{
  //                   p: 3,
  //                   borderRadius: 4,
  //                   border: '1px solid #e5e7eb',
  //                   display: 'flex',
  //                   alignItems: 'center',
  //                   gap: 3,
  //                   transition: 'all 0.2s ease',
  //                   '&:hover': {
  //                     borderColor: PRIMARY_COLOR,
  //                     boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  //                     transform: 'translateY(-2px)'
  //                   }
  //                 }}
  //               >
  //                 <Box sx={{ minWidth: '150px' }}>
  //                   <Typography variant="h5" color="primary" fontWeight={900} sx={{ lineHeight: 1 }}>
  //                     {grant.amount}
  //                   </Typography>
  //                   <Typography variant="caption" color="text.secondary" fontWeight={700}>
  //                     GRANT VALUE
  //                   </Typography>
  //                 </Box>

  //                 <Box sx={{ flexGrow: 1 }}>
  //                   <Box display="flex" gap={1} mb={1}>
  //                     <Chip label={grant.location} size="small" icon={<MapPin size={12} />} sx={{ fontSize: 10, height: 20 }} />
  //                     <Chip label={`Due: ${grant.deadline}`} size="small" sx={{ fontSize: 10, height: 20, bgcolor: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2' }} />
  //                   </Box>
  //                   <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, lineHeight: 1.2 }}>
  //                     {grant.title}
  //                   </Typography>
  //                   <Stack direction="row" spacing={1}>
  //                     {grant.tags?.map(t => (
  //                       <Typography key={t} variant="caption" sx={{ color: 'text.secondary', bgcolor: '#f3f4f6', px: 1, py: 0.2, borderRadius: 1 }}>
  //                         #{t}
  //                       </Typography>
  //                     ))}
  //                   </Stack>
  //                 </Box>

  //                 <Box>
  //                   <Button
  //                     variant="outlined"
  //                     sx={{
  //                       bgcolor: 'transparent',
  //                       color: PRIMARY_COLOR,
  //                       border: `1px solid ${PRIMARY_COLOR}`,
  //                       borderRadius: '20px',
  //                       px: 4,
  //                       py: 1,
  //                       textTransform: 'none',
  //                       fontWeight: 800,
  //                       fontSize: '0.95rem',
  //                       transition: 'all 0.3s ease',
  //                       '&:hover': {
  //                         bgcolor: PRIMARY_COLOR,
  //                         color: 'white',
  //                         border: `2px solid ${PRIMARY_COLOR}`,
  //                         transform: 'scale(1.02)'
  //                       }
  //                     }}
  //                     onClick={() => { setSelectedItem(grant); setViewState('apply'); }}
  //                   >
  //                     Apply Now
  //                   </Button>
  //                 </Box>
  //               </Paper>
  //             ))}

  //             {filtered.length === 0 && (
  //               <Box textAlign="center" py={8}>
  //                 <Typography variant="body1" color="text.secondary">No grants found matching your search.</Typography>
  //               </Box>
  //             )}
  //           </Stack>
  //         </>
  //       )}
  //     </Box>
  //   );
  // };

  // const renderFunding = () => (
  //   <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
  //     <Box display="flex" alignItems="center" gap={2} mb={4}>
  //       <IconButton
  //         onClick={() => setActiveTab('Applications')}
  //         sx={{
  //           bgcolor: 'white',
  //           border: '1px solid #e5e7eb',
  //           borderRadius: '50%',
  //           p: 1.5
  //         }}
  //       >
  //         <ArrowLeft size={24} color={PRIMARY_COLOR} />
  //       </IconButton>
  //       <Typography variant="h4" fontWeight={800} color="primary">
  //         Project Funding
  //       </Typography>
  //     </Box>

  //     <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //       <Box
  //         sx={{
  //           background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #1a593e 100%)`,
  //           borderRadius: 8,
  //           p: { xs: 4, md: 6 },
  //           color: 'white',
  //           textAlign: 'center',
  //           position: 'relative',
  //           overflow: 'hidden',
  //           boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  //           width: '100%'
  //         }}
  //       >
  //         <Box sx={{ position: 'relative', zIndex: 1 }}>
  //           <Wallet size={54} color="#86efac" style={{ marginBottom: 16 }} />
  //           <Typography variant="h4" fontWeight="900" gutterBottom sx={{ letterSpacing: -1 }}>
  //             Launch Your Startup
  //           </Typography>
  //           <Typography variant="body1" sx={{ color: '#dcfce7', mb: 4, maxWidth: 500, mx: 'auto', opacity: 0.9 }}>
  //             Connect with our network of verified investors and secure seed capital for your innovative ideas.
  //           </Typography>
  //           <Button
  //             variant="contained"
  //             size="large"
  //             sx={{
  //               bgcolor: 'white',
  //               color: PRIMARY_COLOR,
  //               fontWeight: 800,
  //               px: 4,
  //               py: 1.5,
  //               borderRadius: 3,
  //               '&:hover': { bgcolor: '#f8fafc' }
  //             }}
  //             onClick={() => { setSelectedItem(null); setViewState('request'); }}
  //           >
  //             Create Funding Request
  //           </Button>
  //         </Box>
  //         <Box sx={{ position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, bgcolor: 'white', opacity: 0.05, borderRadius: '50%' }} />
  //         <Box sx={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, bgcolor: 'white', opacity: 0.05, borderRadius: '50%' }} />
  //       </Box>
  //     </Container>
  //   </Box>
  // );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>

        {/* SIDEBAR - CLEANED UP FOR APPLICATIONS ONLY */}
        <Drawer
          variant="permanent"
          sx={{
            width: 260,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box', bgcolor: PRIMARY_COLOR, color: 'white' },
          }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="h6" fontWeight="bold" letterSpacing={2}>STUDENT</Typography>
          </Box>
          <List component="nav" sx={{ px: 2, pt: 2 }}>
            <Box>
              <ListItemButton
                onClick={() => { toggleMenu('Applications'); handleNavClick('Applications'); }}
                selected={activeTab === 'Applications'}
                sx={{ borderRadius: 2, mb: 1, color: 'white' }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}><FileText size={20} /></ListItemIcon>
                <ListItemText primary="Applications" primaryTypographyProps={{ fontWeight: 500 }} />
                {expandedMenu['Applications'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </ListItemButton>

              <Collapse in={expandedMenu['Applications']} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {[
                    { id: 'ApplicationsList', label: 'My Applications' },
                    { id: 'Grants', label: 'Student Grants' },
                    { id: 'Funding', label: 'Project Funding' }
                  ].map((sub) => (
                    <ListItemButton
                      key={sub.id}
                      onClick={() => handleNavClick(sub.id)}
                      sx={{ pl: 9, borderRadius: 2, mb: 0.5, bgcolor: activeTab === sub.id ? '#1a593e' : 'transparent' }}
                    >
                      <ListItemText primary={sub.label} primaryTypographyProps={{ fontSize: 13, color: activeTab === sub.id ? 'white' : '#9ca3af' }} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          </List>
        </Drawer>

        {/* MAIN CONTENT */}
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
          <AppBar position="static" elevation={0} sx={{ bgcolor: PRIMARY_COLOR, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box />
              <Box display="flex" alignItems="center" gap={3}>
                <IconButton sx={{ color: 'white' }}>
                  <Bell size={20} />
                  <Box sx={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, bgcolor: 'error.main', borderRadius: '50%', border: `2px solid ${PRIMARY_COLOR}` }} />
                </IconButton>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="body2" fontWeight="bold" sx={{ display: { xs: 'none', md: 'block' } }}>Welcome!</Typography>
                  <Avatar sx={{ bgcolor: '#dcfce7', color: PRIMARY_COLOR, fontWeight: 'bold', width: 36, height: 36 }}>ST</Avatar>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 4, position: 'relative' }}>
            {activeTab === 'Applications' && renderApplicationsDashboard()}
            {activeTab === 'ApplicationsList' && (viewState === 'list' ? renderApplicationList() : renderApplicationDetail())}
            {activeTab === 'Grants' && renderGrants()}
            {activeTab === 'Funding' && renderFunding()}
            {(viewState === 'apply' || viewState === 'request') && renderApplicationModal()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export const ApplicationsListPage = (props) => {
  // We take setActiveTab from props and pass it to the render function
  return renderApplicationList(props.setActiveTab, props.setSelectedItem, props.setViewState);
};
export const GrantsPage = (props) => {
  return renderGrants(
    props.selectedGrantCategory, 
    props.setSelectedGrantCategory, 
    props.searchQuery, 
    props.setSearchQuery, 
    props.setSelectedItem, 
    props.setViewState
  );
};

export const FundingPage = (props) => {
  return renderFunding(props.setSelectedItem, props.setViewState);
};
export const ApplicationDetailPage = (props) => {
  // We pass props here so the function can access selectedItem and setViewState
  return renderApplicationDetail(props.selectedItem, props.setViewState);
};

export const ApplicationModal = (props) => {
  return renderApplicationModal(props.viewState, props.setViewState, props.selectedItem);
};
