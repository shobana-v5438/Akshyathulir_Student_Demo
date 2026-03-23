import React, { useState, useEffect } from 'react';


// 1. CORE IMPORTS
import {
  Box, Grid, Paper, Typography, Button, Avatar, Chip,
  Card, CardContent, TextField, IconButton,
  List, ListItem, ListItemAvatar, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem,
  ThemeProvider, createTheme, CssBaseline,
  InputAdornment, Stack, Snackbar, Alert,
  Divider, Badge, Container
} from '@mui/material';


// 2. ICON IMPORTS
import {
  School, ConnectWithoutContact, ChatBubbleOutline,
  Search, LocationOn, AppRegistration,
  Notifications, Logout, ArrowBack,
  Code, Groups, AccessTime, Business,
  Send, Add, Visibility, Person,
  ThumbUpAlt, MoreVert, Reply,
  Email, Phone, CalendarToday, Language, Map, Verified // <--- Added Verified Icon
} from '@mui/icons-material';


// --- PROFESSIONAL THEME ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#1b3a2f',
      light: '#2d5c4b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffc107',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h5: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiPaper: { styleOverrides: { root: { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' } } }
  }
});


// --- REUSABLE COMPONENTS ---


// 2. Modern Card Component (UPDATED TO REQUESTED STYLE)
// Find this component
const ModernCard = ({
  icon,
  title,
  subtitle,
  badgeText,
  badgeColor = "default",
  metaItems = [],
  tags = [],
  buttonText = "View Details",
  onButtonClick,
  secondaryText,
  onSecondaryAction
}) => (
  <Card
    sx={{
      height: "350px",
      width: "350px",   // 🔥 FIXED WIDTH LIKE YOUR REFERENCE
      display: "flex",
      flexDirection: "column",
      borderRadius: 4,
      transition: "all 0.3s ease",
      border: "1px solid #eef2f0",
      boxShadow: "none",
      "&:hover": {
        transform: "translateY(-5px)",
        borderColor: "#1b3a2f",
        boxShadow: "0px 12px 30px rgba(27, 58, 47, 0.15)"
      }
    }}
  >
    <CardContent sx={{ p: 3, flexGrow: 1 }}>
      {/* Top Row */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: "#e8f5e9",
            color: "#1b3a2f",
            width: 48,
            height: 48
          }}
        >
          {icon}
        </Avatar>

        {badgeText && (
          <Chip
            label={badgeText}
            size="small"
            sx={{
              bgcolor:
                badgeColor === "success"
                  ? "#e8f5e9"
                  : badgeColor === "warning"
                  ? "#fff3cd"
                  : "#f0f4f2",
              color:
                badgeColor === "success"
                  ? "#1b5e20"
                  : badgeColor === "warning"
                  ? "#856404"
                  : "#1b3a2f",
              fontWeight: 600,
              borderRadius: 1
            }}
          />
        )}
      </Stack>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#1b3a2f",
          mb: 0.5,
          lineHeight: 1.2
        }}
        noWrap
      >
        {title}
      </Typography>

      {/* Subtitle */}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
          noWrap
        >
          {subtitle}
        </Typography>
        <Verified sx={{ fontSize: 16, color: "#2e7d32" }} />
      </Stack>

      {/* Meta Items */}
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        {metaItems.slice(0, 3).map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {React.cloneElement(item.icon, {
              sx: { fontSize: 18, color: "#666" }
            })}
            <Typography variant="body2" color="#444">
              {item.text}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Tags */}
      <Box display="flex" flexWrap="wrap" gap={0.5} mt="auto">
        {tags.slice(0, 3).map((tag, idx) => (
          <Chip
            key={idx}
            label={tag}
            size="small"
            sx={{
              borderRadius: 1,
              bgcolor: "#f1f3f5",
              fontSize: "0.7rem"
            }}
          />
        ))}
      </Box>
    </CardContent>

    {/* Buttons */}
    <Box sx={{ p: 2, pt: 0 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={onButtonClick}
        sx={{
          borderRadius: 2,
          color: "#1b3a2f",
          borderColor: "#1b3a2f",
          textTransform: "none",
          fontWeight: "bold",
          mb: secondaryText ? 1 : 0,
          "&:hover": {
            bgcolor: "#1b3a2f",
            color: "#fff",
            borderColor: "#1b3a2f"
          }
        }}
      >
        {buttonText}
      </Button>

      {secondaryText && (
        <Button
          fullWidth
          variant="contained"
          onClick={onSecondaryAction}
          sx={{
            borderRadius: 2,
            bgcolor: "#1b3a2f",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#122b21"
            }
          }}
        >
          {secondaryText}
        </Button>
      )}
    </Box>
  </Card>
);


// 3. Filter Bar
const FilterBar = ({ 
  onSearch, searchValue, placeholder, 
  filterOptions = [], selectedFilter, onFilterChange,
  actionLabel, onAction 
}) => (
  <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" justifyContent="space-between" mb={3}>
    <TextField
      size="small"
      placeholder={placeholder || "Search..."}
      value={searchValue}
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: <InputAdornment position="start"><Search color="action" /></InputAdornment>,
      }}
      sx={{ 
        width: { xs: '100%', md: 320 }, 
        bgcolor: 'white', 
        borderRadius: 2, 
        '& .MuiOutlinedInput-root': { borderRadius: 2 } 
      }}
    />


    <Box display="flex" gap={2} flexWrap="wrap" sx={{ width: { xs: '100%', md: 'auto' } }}>
      {filterOptions.length > 0 && (
        <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'white', borderRadius: 2 }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={selectedFilter} label="Filter By" onChange={(e) => onFilterChange(e.target.value)} sx={{ borderRadius: 2 }}>
            <MenuItem value="All">All</MenuItem>
            {filterOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </FormControl>
      )}


      {actionLabel && (
        <Button 
          startIcon={<Add />} 
          variant="contained" 
          color="primary"
          onClick={onAction}
          sx={{ px: 3, boxShadow: 'none' }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  </Box>
);


// 4. NEW COMPONENT: Item Detail View
const ItemDetailView = ({ item, type, onBack }) => {
  if (!item) return null;


  // Helper to get generic fields based on type
  const getHeaderIcon = () => {
    if (type === 'Mentorship') return <School fontSize="large" />;
    if (type === 'Events') return <Code fontSize="large" />;
    return <Person fontSize="large" />;
  };


  const getSubHeader = () => {
    if (type === 'Mentorship') return item.role + ' at ' + item.org;
    if (type === 'Events') return item.type + ' • ' + item.date;
    return item.course + ' • ' + item.location;
  };


  return (
    <Box maxWidth={1000} mx="auto" pb={4} sx={{ animation: 'fadeIn 0.3s ease-in' }}>
       {/* Back Button */}
       <Button 
          startIcon={<ArrowBack />} 
          onClick={onBack} 
          sx={{ mb: 2, color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
        >
          Back to List
        </Button>


        <Grid container spacing={3} >
          {/* Header Card */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e0e0e0', display: 'flex', flexDirection: {xs:'column', md:'row'}, alignItems: 'center', gap: 3, bgcolor: '#fff' }}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40 }}>
                {item.image ? <img src={item.image} alt={item.name || item.title} style={{width:'100%'}}/> : getHeaderIcon()}
              </Avatar>
              <Box flexGrow={1} textAlign={{xs:'center', md:'left'}}>
                <Box display="flex" alignItems="center" gap={1} justifyContent={{xs:'center', md:'flex-start'}} mb={1}>
                  <Typography variant="h4" fontWeight="800">{item.name || item.title}</Typography>
                  {item.available !== undefined && (
                     <Chip label={item.available ? "Available" : "Busy"} color={item.available ? "success" : "default"} size="small" />
                  )}
                  {item.status && <Chip label={item.status} color="primary" size="small" />}
                </Box>
                <Typography variant="h6" color="text.secondary" fontWeight="500">{getSubHeader()}</Typography>
                <Box mt={2} display="flex" gap={1} justifyContent={{xs:'center', md:'flex-start'}}>
                  {item.skills && item.skills.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                  {item.expertise && item.expertise.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" gap={1} minWidth={150}>
                <Button variant="contained" size="large" startIcon={<ConnectWithoutContact />}>
                  {type === 'Events' ? 'Register Now' : 'Connect'}
                </Button>
                <Button variant="outlined" size="large" startIcon={<ChatBubbleOutline />}>Message</Button>
              </Box>
            </Paper>
          </Grid>


          {/* Left Column: Description */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0', height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">About</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph lineHeight={1.8} color="text.secondary">
                {item.description || "No description provided for this item."}
              </Typography>


              {/* Specific Content based on Type */}
              {type === 'Events' && item.agenda && (
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">Agenda</Typography>
                   <List dense>
                     {item.agenda.map((slot, i) => (
                       <ListItem key={i}>
                         <ListItemAvatar><Avatar sx={{ width: 24, height: 24, fontSize: 12, bgcolor: 'primary.light' }}>{i+1}</Avatar></ListItemAvatar>
                         <ListItemText primary={slot} />
                       </ListItem>
                     ))}
                   </List>
                </Box>
              )}
            </Paper>
          </Grid>


          {/* Right Column: Key Details */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">Key Details</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                {item.email && (
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#f5f5f5', color: '#555' }}><Email fontSize="small" /></Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography variant="body2" fontWeight="500">{item.email}</Typography>
                    </Box>
                  </Box>
                )}
                 {item.location && (
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#f5f5f5', color: '#555' }}><LocationOn fontSize="small" /></Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Location</Typography>
                      <Typography variant="body2" fontWeight="500">{item.location}</Typography>
                    </Box>
                  </Box>
                )}
                 {item.date && (
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#f5f5f5', color: '#555' }}><CalendarToday fontSize="small" /></Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Date</Typography>
                      <Typography variant="body2" fontWeight="500">{item.date}</Typography>
                    </Box>
                  </Box>
                )}
                 {item.venue && (
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#f5f5f5', color: '#555' }}><Map fontSize="small" /></Avatar>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Venue</Typography>
                      <Typography variant="body2" fontWeight="500">{item.venue}</Typography>
                    </Box>
                  </Box>
                )}
              </Stack>


              <Box mt={3} p={2} bgcolor="#f8f9fa" borderRadius={2}>
                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                  {type === 'Mentorship' ? 'Response Time' : type === 'Events' ? 'Seats Left' : 'Availability'}
                </Typography>
                <Typography variant="h6" color="primary.main">
                   {type === 'Mentorship' ? 'Usually replies in 24h' : type === 'Events' ? `${item.seats} Seats Remaining` : 'Open for projects'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
    </Box>
  );
};



// --- MOCK DATA (ENHANCED) ---
const initialMentors = [
  { 
    id: 1, name: "Dr. Anjali Deshmukh", role: "Senior Researcher", org: "AgriTech India", expertise: ["Sustainable Farming"], available: true,
    email: "anjali.d@agritech.in", description: "Dr. Anjali has over 15 years of experience in sustainable agricultural practices. She specializes in soil health management and organic farming transitions for small-scale farmers." 
  },
  { 
    id: 2, name: "Rajesh Kumar", role: "Social Worker", org: "Rural Trust", expertise: ["Mental Health"], available: false,
    email: "rajesh@ruraltrust.org", description: "Rajesh works closely with rural communities to address mental health challenges faced by farmers. He advocates for community-led support groups and wellness programs." 
  },
  { 
    id: 3, name: "Vikram Singh", role: "Supply Chain Lead", org: "FreshExports", expertise: ["Logistics"], available: true,
    email: "vikram@freshexports.com", description: "Vikram manages a cold-chain logistics network spanning 3 states. He mentors students on supply chain optimization and reducing post-harvest losses." 
  },
  { 
    id: 4, name: "Sarah Jenkins", role: "AI Specialist", org: "TechFarm", expertise: ["AI/ML"], available: true,
    email: "sarah.j@techfarm.io", description: "Sarah is a lead engineer developing computer vision models for crop disease detection. She is passionate about applying AI to solve real-world agricultural problems." 
  },
];


const initialEvents = [
  { 
    id: 1, title: "Smart Irrigation Conference", type: "Conference", date: "Oct 24", venue: "Innovation Hub", seats: 100, isRegistered: false,
    description: "A conference focused on building IoT-based irrigation solutions. Participants will have access to sensor kits and cloud platforms to prototype their ideas.",
    agenda: ["Day 1: Policy & Governance", "Day 2: Technology & Innovation", "Day 3: Farmer Interaction"]
  },
  { 
    id: 2, title: "Future of Agri-Tech", type: "Webinar", date: "Nov 02", venue: "Google Meet", seats: 500, isRegistered: false,
    description: "Join industry leaders as they discuss the roadmap for agricultural technology in India for the next decade.",
    agenda: ["10:00 AM - Keynote Speech", "11:00 AM - Panel Discussion", "12:00 PM - Q&A"]
  },
  { 
    id: 3, title: "National Agri Summit", type: "Conference", date: "Dec 15", venue: "Exhibition Center", seats: 10, isRegistered: true,
    description: "The largest gathering of agricultural professionals, policy makers, and students. Featuring 50+ stalls and 20+ speakers.",
    agenda: ["Day 1: Policy & Governance", "Day 2: Technology & Innovation", "Day 3: Farmer Interaction"]
  },
  { 
    id: 4, title: "Drone Pilot Workshop", type: "Workshop", date: "Jan 10", venue: "Campus Field", seats: 20, isRegistered: false,
    description: "Hands-on training for operating agricultural drones for spraying and mapping. Certification provided upon completion.",
    agenda: ["09:00 AM - Safety Briefing", "10:00 AM - Flight Simulator", "01:00 PM - Live Flight Training"]
  },
];


const initialForumData = [
  { 
    id: 1, title: "How to apply for 'Green Future' scholarship?", category: "Career Help", author: "Amit S.", date: "2h ago", views: 120,
    content: "I've heard about the Green Future scholarship but can't find the official link. Does anyone know the deadline?",
    replies: [
      { id: 101, author: "Dr. Anjali", time: "1h ago", text: "The deadline is next Friday. Check the gov portal under 'Grants'.", likes: 5 },
      { id: 102, author: "Rahul V.", time: "45m ago", text: "I applied yesterday! Make sure you have your income certificate ready.", likes: 2 },
      { id: 103, author: "Admin", time: "10m ago", text: "We will also post a guide on the Events page shortly.", likes: 10 }
    ]
  },
  { 
    id: 2, title: "Looking for team: IoT Smart Sensor Project", category: "Project Ideas", author: "Priya M.", date: "1d ago", views: 340,
    content: "Building a team for the upcoming Hackathon. Need backend devs familiar with Node.js.",
    replies: []
  },
];


export default function ProfessionalDashboard({ initialView }) {
  const [currentView, setCurrentView] = useState(initialView || 'Mentorship'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (initialView) {
      setCurrentView(initialView);
      setSelectedItem(null); // Reset detail view when switching categories
      setSelectedThread(null);
    }
  }, [initialView]);


  const [mentors, setMentors] = useState(initialMentors);
  const [events, setEvents] = useState(initialEvents);
  const [forumThreads, setForumThreads] = useState(initialForumData);
  
  const [selectedThread, setSelectedThread] = useState(null); 
  const [replyText, setReplyText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [newTopic, setNewTopic] = useState({ title: '', category: 'General', content: '' });
  const [toast, setToast] = useState({ open: false, msg: '' });


  const handleAction = (msg) => setToast({ open: true, msg });


  // Forum Handlers
  const handleCreateTopic = () => {
    if (!newTopic.title || !newTopic.content) return;
    setForumThreads([{ id: Date.now(), ...newTopic, author: "You", date: "Just now", views: 0, replies: [] }, ...forumThreads]);
    setIsDialogOpen(false);
    setNewTopic({ title: '', category: 'General', content: '' });
    setToast({ open: true, msg: "Topic posted!" });
  };


  const handleReply = () => {
    if (!replyText.trim()) return;
    const newReply = { id: Date.now(), author: "You", time: "Just now", text: replyText, likes: 0 };
    const updatedThread = { ...selectedThread, replies: [...selectedThread.replies, newReply] };
    setSelectedThread(updatedThread);
    setForumThreads(prev => prev.map(t => t.id === selectedThread.id ? updatedThread : t));
    setReplyText('');
    setToast({ open: true, msg: "Reply posted successfully!" });
  };


  const handleLikeReply = (replyId) => {
    const updatedReplies = selectedThread.replies.map(r => 
       r.id === replyId ? { ...r, likes: (r.likes || 0) + 1 } : r
    );
    const updatedThread = { ...selectedThread, replies: updatedReplies };
    setSelectedThread(updatedThread);
  };


  const switchView = (viewName) => {
    setCurrentView(viewName);
    setSearchQuery('');
    setFilterValue('All');
    setSelectedThread(null);
    setSelectedItem(null); // Clear detail selection on view switch
  };


  const gridSettings = { xs: 12, sm: 6, lg: 4 };


  const renderContent = () => {
    // 1. GLOBAL DETAIL VIEW CHECK
    // If an item is selected, show the detail view regardless of the specific category logic below
    // (Excluding Discussion Forum which has its own logic)
    if (selectedItem && currentView !== 'Discussion Forum') {
      return (
        <ItemDetailView 
          item={selectedItem} 
          type={currentView} 
          onBack={() => setSelectedItem(null)} 
        />
      );
    }


    // --- MENTORSHIP ---
    if (currentView === 'Mentorship') {
        const filtered = mentors.filter(m => (filterValue === 'All' || (filterValue === 'Available' ? m.available : !m.available)) && m.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return (
          <Box>
            <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 700 }}>Mentors</Typography>
            <FilterBar onSearch={setSearchQuery} searchValue={searchQuery} placeholder="Search mentors..." filterOptions={["Available", "Busy"]} selectedFilter={filterValue} onFilterChange={setFilterValue} />
            <Grid container spacing={3} justifyContent="flex-start">{filtered.map(m => 
              <Grid item {...gridSettings} key={m.id}>
                <ModernCard 
                  icon={<School/>} title={m.name} subtitle={m.role} badgeText={m.available?"Available":"Busy"} badgeColor={m.available?"success":"default"} metaItems={[{icon:<Business fontSize='small'/>,text:m.org}]} tags={m.expertise} 
                  buttonText="View Profile"
                  onButtonClick={() => setSelectedItem(m)} // <--- SET SELECTED ITEM
                  secondaryText={m.available?"Request":"Notify"} onSecondaryAction={()=>handleAction('Request sent')} 
                />
              </Grid>)}
            </Grid>
          </Box>
        );
    }
    // --- EVENTS ---
    if (currentView === 'Events') {
        const filtered = events.filter(e => (filterValue === 'All' || e.type === filterValue) && e.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return (
          <Box>
            <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 700 }}>Upcoming Events</Typography>
            <FilterBar onSearch={setSearchQuery} searchValue={searchQuery} placeholder="Search events..." filterOptions={["Webinar", "Conference"]} selectedFilter={filterValue} onFilterChange={setFilterValue} />
            <Grid container spacing={3} justifyContent="flex-start">{filtered.map(e => 
              <Grid item {...gridSettings} key={e.id}>
                <ModernCard 
                  icon={<Code/>} title={e.title} subtitle={e.type} badgeText={`${e.seats} Seats`} badgeColor="warning" metaItems={[{icon:<AccessTime fontSize='small'/>,text:e.date}]} tags={[e.type]} 
                  buttonText="Event Details"
                  onButtonClick={() => setSelectedItem(e)} // <--- SET SELECTED ITEM
                  secondaryText={e.isRegistered?"Registered":"Register"} onSecondaryAction={()=>handleAction('Registered')} 
                />
              </Grid>)}
            </Grid>
          </Box>
        );
    }


    // --- DISCUSSION FORUM (Existing Logic) ---
    if (currentView === 'Discussion Forum') {
      // 1. DETAIL VIEW (Single Thread)
      if (selectedThread) {
        return (
          <Box maxWidth={900} mx="auto" pb={4}>
            {/* Back Button */}
            <Button 
              startIcon={<ArrowBack />} 
              onClick={() => setSelectedThread(null)} 
              sx={{ mb: 2, color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
            >
              Back to Discussions
            </Button>


            {/* Main Thread Post */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, border: '1px solid #e0e0e0' }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                 <Box>
                    <Chip label={selectedThread.category} color="primary" size="small" variant="filled" sx={{ borderRadius: 1, mb: 1 }} />
                    <Typography variant="h4" fontWeight="800" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>{selectedThread.title}</Typography>
                 </Box>
                 <IconButton size="small"><MoreVert /></IconButton>
              </Box>
              
              <Box display="flex" alignItems="center" gap={1.5} mb={3} pb={3} borderBottom="1px solid #f0f0f0">
                <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>{selectedThread.author[0]}</Avatar>
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold">{selectedThread.author}</Typography>
                    <Typography variant="caption" color="text.secondary">{selectedThread.date} • {selectedThread.views} views</Typography>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#333', fontSize: '1.05rem' }}>
                {selectedThread.content}
              </Typography>
            </Paper>


            {/* Replies Section */}
            <Box mb={2} display="flex" alignItems="center" gap={1}>
                <Typography variant="h6" fontWeight="bold">Replies</Typography>
                <Chip label={selectedThread.replies.length} size="small" sx={{ bgcolor: '#e0e0e0', fontWeight: 'bold' }} />
            </Box>
            
            <Stack spacing={2.5} mb={5}>
              {selectedThread.replies.length === 0 ? (
                  <Typography color="text.secondary" sx={{ fontStyle: 'italic', py: 2 }}>No replies yet. Be the first to start the conversation!</Typography>
              ) : (
                  selectedThread.replies.map((reply) => (
                    <Paper key={reply.id} elevation={0} sx={{ p: 3, bgcolor: 'white', borderRadius: 3, border: '1px solid #f0f0f0' }}>
                      <Box display="flex" justifyContent="space-between" mb={1.5}>
                        <Box display="flex" gap={1.5} alignItems="center">
                           <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: reply.author === 'You' ? 'secondary.main' : '#e0e0e0', color: reply.author === 'You' ? '#000' : '#555' }}>{reply.author[0]}</Avatar>
                           <Box>
                               <Typography variant="subtitle2" fontWeight="bold">{reply.author} {reply.author === 'You' && <Chip label="You" size="small" sx={{ height: 16, fontSize: '0.6rem', ml: 0.5 }} />}</Typography>
                               <Typography variant="caption" color="text.secondary">{reply.time}</Typography>
                           </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ ml: 5.5, mb: 2, color: '#444' }}>{reply.text}</Typography>
                      
                      {/* Interaction Actions */}
                      <Box display="flex" gap={2} ml={5.5}>
                          <Button 
                            startIcon={<ThumbUpAlt sx={{ fontSize: 16 }} />} 
                            size="small" 
                            onClick={() => handleLikeReply(reply.id)}
                            sx={{ color: 'text.secondary', minWidth: 'auto', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
                          >
                            {reply.likes || 0} Likes
                          </Button>
                          <Button 
                            startIcon={<Reply sx={{ fontSize: 18 }} />} 
                            size="small" 
                            sx={{ color: 'text.secondary', minWidth: 'auto', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
                          >
                            Reply
                          </Button>
                      </Box>
                    </Paper>
                  ))
              )}
            </Stack>


            {/* Reply Input Box */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, border: '1px solid #e0e0e0' }}>
              <Box display="flex" gap={2} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>Y</Avatar>
                  <Box flexGrow={1}>
                      <TextField 
                        fullWidth 
                        multiline 
                        rows={2} 
                        placeholder="Write a meaningful reply..." 
                        value={replyText} 
                        onChange={(e) => setReplyText(e.target.value)} 
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{ mb: 1 }} 
                      />
                      <Divider sx={{ mb: 1.5 }} />
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" gap={1}>
                              {/* Placeholder for text formatting tools if needed later */}
                          </Box>
                          <Button 
                            variant="contained" 
                            endIcon={<Send />} 
                            onClick={handleReply} 
                            disabled={!replyText.trim()}
                            sx={{ color: 'white', borderRadius: 4, px: 3 }}
                          >
                            Post Reply
                          </Button>
                      </Box>
                  </Box>
              </Box>
            </Paper>
          </Box>
        );
      }


      // 2. LIST VIEW (Default)
      const filteredThreads = forumThreads.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return (
        <Box maxWidth={1000} mx="auto">
          <Typography variant="h5" color="text.primary" sx={{ mb: 2, fontWeight: 700 }}>Community Discussions</Typography>
          <FilterBar 
            onSearch={setSearchQuery} searchValue={searchQuery} placeholder="Search topics..."
            filterOptions={["Career Help", "Project Ideas"]} selectedFilter={filterValue} onFilterChange={setFilterValue}
            actionLabel="New Topic" onAction={() => setIsDialogOpen(true)}
          />
          <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            <List disablePadding>
              {filteredThreads.map((thread, index) => (
                <React.Fragment key={thread.id}>
                  <ListItem button alignItems="flex-start" onClick={() => setSelectedThread(thread)} sx={{ py: 3, transition: '0.2s', '&:hover': { bgcolor: '#f8f9fa' } }}>
                    <ListItemAvatar><Avatar sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.primary.main }}><ChatBubbleOutline /></Avatar></ListItemAvatar>
                    <ListItemText
                      primary={<Box display="flex" alignItems="center" gap={1} mb={0.5}><Typography variant="h6" sx={{ fontSize: '1rem', color: 'primary.main' }}>{thread.title}</Typography><Chip label={thread.category} size="small" sx={{ height: 20, fontSize: '0.7rem', bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 'bold' }} /></Box>}
                      secondary={<Box><Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1, maxWidth: '90%' }}>{thread.content}</Typography><Box display="flex" gap={2}><Typography variant="caption">By <b>{thread.author}</b> • {thread.date}</Typography><Box display="flex" alignItems="center" gap={0.5}><Visibility sx={{ fontSize: 14 }} /><Typography variant="caption">{thread.views}</Typography></Box><Box display="flex" alignItems="center" gap={0.5}><ChatBubbleOutline sx={{ fontSize: 14 }} /><Typography variant="caption">{thread.replies.length} replies</Typography></Box></Box></Box>}
                    />
                  </ListItem>
                  {index < filteredThreads.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      );
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        


        {/* MAIN AREA */}
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', p: { xs: 2, md: 4 } }}>
          {/* <DashboardHeader /> */}
          {renderContent()}
        </Box>
        
        {/* DIALOGS */}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>New Discussion</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} mt={1}>
              <TextField label="Title" fullWidth value={newTopic.title} onChange={(e) => setNewTopic({...newTopic, title: e.target.value})} />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={newTopic.category} label="Category" onChange={(e) => setNewTopic({...newTopic, category: e.target.value})}>
                  <MenuItem value="Career Help">Career Help</MenuItem>
                  <MenuItem value="Project Ideas">Project Ideas</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Content" fullWidth multiline rows={4} value={newTopic.content} onChange={(e) => setNewTopic({...newTopic, content: e.target.value})} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleCreateTopic} sx={{ color: 'white' }}>Post</Button>
          </DialogActions>
        </Dialog>


        <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
          <Alert severity="success" variant="filled" sx={{ width: '100%' }}>{toast.msg}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}





