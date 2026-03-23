import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Divider,
  Grid,
  Checkbox,
  Autocomplete,
  FormHelperText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CheckCircle, UploadCloud } from 'lucide-react';

const theme = createTheme({
  palette: {
    primary: { main: "#163f36" },
    secondary: { main: "#163f36" },
    error: { main: "#d32f2f" }
  },
  typography: {
    h1: { fontSize: '34px', fontWeight: 'bold' },
    h5: { fontSize: '20px', fontWeight: 'bold' },
    h6: { fontSize: '16px', fontWeight: '600' },
    body1: { fontSize: '16px' },
    button: { fontSize: '15px', fontWeight: 'bold' },
  },
  components: {
    MuiTextField: { styleOverrides: { root: { width: '100%' } } },
    MuiInputBase: { styleOverrides: { input: { fontSize: '16px' } } },
    MuiInputLabel: { styleOverrides: { root: { fontSize: '14px' } } },
    MuiCard: { styleOverrides: { root: { border: '2px solid #163f36', borderRadius: '8px' } } }
  },
});

const FormRow = ({ children }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
    {React.Children.map(children, (child) => (
      child ? <Box sx={{ flex: 1, minWidth: '200px' }}>{child}</Box> : null
    ))}
  </Box>
);

const SectionHeader = ({ title }) => (
  <Box sx={{ backgroundColor: "#163f36", color: 'white', p: 2 }}>
    <Typography variant="h5">{title}</Typography>
  </Box>
);

const initialFormState = {
  firstName: '', lastName: '', email: '',
  mobileCountryCode: { code: '+91', label: 'India', flag: 'https://flagcdn.com/in.svg' },
  mobile: '', dob: '', gender: '', community: '',
  institutionType: '',
  schoolCountry: '', schoolState: '', schoolDistrict: '', schoolArea: '', schoolPincode: '',
  schoolName: '', classGrade: '', medium: '', board: '', stayType: '', transportMode: '',
  collegeCountry: '', collegeState: '', collegeDistrict: '', collegeArea: '', collegePincode: '',
  collegeName: '', department: '', degree: '', startYear: '', endYear: '',
  isAkshayaStudent: '', akshayaCollegeType: '', currentSemester: '',
  familyType: '', fatherName: '', fatherOccupation: '', fatherIncome: '',
  motherName: '', motherOccupation: '', motherIncome: '',
  guardianName: '', guardianOccupation: '', guardianIncome: '',
  headOfFamily: '', siblings: [],
  pincode: '', addrCountry: '', addrState: '', addrDistrict: '', addrTaluk: '', address: '',
  langEnglishRead: false, langEnglishWrite: false, langEnglishSpeak: false,
  langTamilRead: false, langTamilWrite: false, langTamilSpeak: false,
  langOtherRead: false, langOtherWrite: false, langOtherSpeak: false,
  otherLangName: '',
  declaration: false
};

function App() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [countryCodes, setCountryCodes] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const classOptions = ['6th Std', '7th Std', '8th Std', '9th Std', '10th Std', '11th Std', '12th Std'];
  const schoolOptions = ['Government Higher Secondary School', 'St. Marys Matriculation', 'Kendriya Vidyalaya', 'Delhi Public School', 'Little Flower School'];
  const collegeOptions = ['Anna University', 'IIT Madras', 'PSG College of Technology', 'Amrita Vishwa Vidyapeetham', 'Madras Christian College', 'Loyola College'];
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => currentYear - 5 + index);

  // Comprehensive Validation Logic
  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinRegex = /^[0-9]{6}$/;

    // Personal Info
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";
    if (!emailRegex.test(formData.email)) tempErrors.email = "Valid email is required";
    if (!phoneRegex.test(formData.mobile)) tempErrors.mobile = "10-digit mobile number required";
    if (!formData.dob) tempErrors.dob = "DOB is required";
    if (!formData.gender) tempErrors.gender = "Gender selection required";
    if (!formData.community) tempErrors.community = "Community is required";
    if (!formData.institutionType) tempErrors.institutionType = "Please select institution type";

    // Academic Logic
    if (formData.institutionType === 'school') {
        if (!formData.schoolName) tempErrors.schoolName = "School name required";
        if (!formData.classGrade) tempErrors.classGrade = "Class required";
        if (!formData.medium) tempErrors.medium = "Medium required";
        if (!formData.board) tempErrors.board = "Board required";
        if (!pinRegex.test(formData.schoolPincode)) tempErrors.schoolPincode = "Valid 6-digit pin required";
    } else if (formData.institutionType === 'college') {
        if (!formData.isAkshayaStudent) tempErrors.isAkshayaStudent = "Required";
        if (!formData.collegeName) tempErrors.collegeName = "College name required";
        if (!formData.degree) tempErrors.degree = "Degree required";
        if (!formData.department) tempErrors.department = "Department required";
        if (!formData.currentSemester) tempErrors.currentSemester = "Semester required";
    }

    // Family Logic
    if (!formData.familyType) {
        tempErrors.familyType = "Selection required";
    } else if (formData.familyType === 'parents') {
        if (!formData.fatherName) tempErrors.fatherName = "Father's name required";
        if (!formData.motherName) tempErrors.motherName = "Mother's name required";
    } else {
        if (!formData.guardianName) tempErrors.guardianName = "Guardian's name required";
    }

    // Address Logic
    if (!pinRegex.test(formData.pincode)) tempErrors.pincode = "Valid 6-digit pin required";
    if (!formData.address.trim()) tempErrors.address = "Complete address required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const fetchUserData = useCallback(async (emailToFetch) => {
    if (!emailToFetch || !emailToFetch.includes('@')) return; 
    try {
      const response = await axios.get(`http://localhost:8000/user/${emailToFetch}`);
      if (response.status === 200) {
        setFormData(prev => ({ ...prev, ...response.data, siblings: response.data.siblings || [] }));
      }
    } catch (error) { console.log("User not found in DB."); }
  }, []);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=name,idd,flags")
      .then(res => {
        const formatted = res.data
          .filter(c => c.idd.root)
          .map(c => ({
            label: c.name.common,
            code: `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ''}`,
            flag: c.flags.svg
          })).sort((a, b) => a.label.localeCompare(b.label));
        setCountryCodes(formatted);
      });

    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      fetchUserData(savedEmail);
    }
  }, [fetchUserData]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    
    // Clear error when field is modified
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));

    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'pincode' && value.length === 6) {
      axios.get(`https://api.postalpincode.in/pincode/${value}`).then(res => {
        if (res.data[0]?.Status === "Success") {
          const po = res.data[0].PostOffice[0];
          setFormData(p => ({
            ...p,
            addrCountry: po.Country, addrState: po.State,
            addrDistrict: po.District, addrTaluk: po.Block || po.Taluk
          }));
        }
      });
    }

    if (field === 'email' && value.endsWith('.com')) fetchUserData(value);
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) setFormData(prev => ({ ...prev, mobileCountryCode: newValue }));
  };

  const addSibling = () => {
    setFormData(prev => ({
      ...prev,
      siblings: [...prev.siblings, { id: Date.now(), name: '', age: '', gender: '' }]
    }));
  };

  const removeSibling = (id) => {
    setFormData(prev => ({ ...prev, siblings: prev.siblings.filter(s => s.id !== id) }));
  };

  const handleSiblingChange = (id, field) => (e) => {
    setFormData(prev => ({
      ...prev,
      siblings: prev.siblings.map(s => s.id === id ? { ...s, [field]: e.target.value } : s)
    }));
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) setUploadedFiles(prev => ({ ...prev, [index]: file.name }));
  };

  const handleReset = async () => {
    if (window.confirm("Delete record from database and clear form?")) {
      const emailToDelete = formData.email || localStorage.getItem('userEmail');
      if (emailToDelete) {
        try { await axios.delete(`http://localhost:8000/user/${emailToDelete}`); } 
        catch (error) { console.error("Delete failed."); }
      }
      setFormData(initialFormState);
      setErrors({});
      setUploadedFiles({});
      localStorage.removeItem('userEmail');
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return alert("Please correct the errors in the form.");
    if (!formData.declaration) return alert("Please accept the declaration.");

    try {
      const res = await axios.post("http://localhost:8000/submit", formData);
      if (res.status === 200) {
        localStorage.setItem('userEmail', formData.email);
        alert("Data saved successfully!");
      }
    } catch (e) { alert("Submission failed. Ensure MongoDB is running."); }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h1" sx={{ color: "#163f36", mb: 1 }}>Student Registration Portal</Typography>
          <Typography variant="body1" color="textSecondary">Required fields are marked with *</Typography>
        </Box>

        {/* 1. PERSONAL */}
        <Card sx={{ mb: 4 }}>
          <SectionHeader title="1. Personal Information" />
          <CardContent sx={{ p: 3 }}>
            <FormRow>
              <TextField label="First Name *" value={formData.firstName} onChange={handleInputChange('firstName')} error={!!errors.firstName} helperText={errors.firstName} />
              <TextField label="Last Name *" value={formData.lastName} onChange={handleInputChange('lastName')} error={!!errors.lastName} helperText={errors.lastName} />
            </FormRow>
            <FormRow>
              <TextField label="Email Address *" value={formData.email} onChange={handleInputChange('email')} error={!!errors.email} helperText={errors.email} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Autocomplete options={countryCodes} getOptionLabel={(o) => o.code} value={formData.mobileCountryCode} onChange={handleAutocompleteChange} disableClearable sx={{ width: 140 }} renderInput={(params) => <TextField {...params} label="Code" />} />
                <TextField fullWidth label="Mobile Number *" value={formData.mobile} onChange={handleInputChange('mobile')} error={!!errors.mobile} helperText={errors.mobile} />
              </Box>
            </FormRow>
            <FormRow>
              <TextField type="date" label="Date of Birth *" value={formData.dob} onChange={handleInputChange('dob')} InputLabelProps={{ shrink: true }} error={!!errors.dob} helperText={errors.dob} />
              <FormControl error={!!errors.gender}>
                <FormLabel>Gender *</FormLabel>
                <RadioGroup row value={formData.gender} onChange={handleInputChange('gender')}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
              </FormControl>
              <TextField select label="Community *" value={formData.community} onChange={handleInputChange('community')} error={!!errors.community} helperText={errors.community}>
                <MenuItem value="OC">OC</MenuItem><MenuItem value="BC">BC</MenuItem><MenuItem value="MBC">MBC</MenuItem><MenuItem value="SC/ST">SC/ST</MenuItem>
              </TextField>
            </FormRow>
          </CardContent>
        </Card>

        {/* INSTITUTION TYPE SELECTION */}
        <Card sx={{ mb: 4, borderColor: errors.institutionType ? 'red' : '#163f36' }}>
          <CardContent sx={{ p: 3 }}>
            <FormControl error={!!errors.institutionType}>
              <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Institution Type *</FormLabel>
              <RadioGroup row value={formData.institutionType} onChange={handleInputChange('institutionType')}>
                <FormControlLabel value="school" control={<Radio />} label="School Student" />
                <FormControlLabel value="college" control={<Radio />} label="College Student" />
              </RadioGroup>
              {errors.institutionType && <FormHelperText>{errors.institutionType}</FormHelperText>}
            </FormControl>
          </CardContent>
        </Card>

        {/* 2. ACADEMIC DETAILS */}
        <Card sx={{ mb: 4 }}>
          <SectionHeader title="2. Academic Details" />
          <CardContent sx={{ p: 3 }}>
            {formData.institutionType === 'school' ? (
              <>
                <FormRow>
                  <TextField label="Country" value={formData.schoolCountry} onChange={handleInputChange('schoolCountry')} />
                  <TextField label="State" value={formData.schoolState} onChange={handleInputChange('schoolState')} />
                </FormRow>
                <FormRow>
                  <TextField label="District" value={formData.schoolDistrict} onChange={handleInputChange('schoolDistrict')} />
                  <TextField label="Area" value={formData.schoolArea} onChange={handleInputChange('schoolArea')} />
                  <TextField label="Pincode *" value={formData.schoolPincode} onChange={handleInputChange('schoolPincode')} error={!!errors.schoolPincode} helperText={errors.schoolPincode} />
                </FormRow>
                <FormRow>
                  <Autocomplete freeSolo options={schoolOptions} value={formData.schoolName} onInputChange={(e, v) => setFormData(p=>({...p, schoolName: v}))} renderInput={(params) => <TextField {...params} label="School Name *" error={!!errors.schoolName} helperText={errors.schoolName} />} />
                  <TextField select label="Class *" value={formData.classGrade} onChange={handleInputChange('classGrade')} error={!!errors.classGrade} helperText={errors.classGrade}>
                    {classOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                  </TextField>
                  <TextField select label="Medium *" value={formData.medium} onChange={handleInputChange('medium')} error={!!errors.medium} helperText={errors.medium}>
                    <MenuItem value="English">English</MenuItem><MenuItem value="Tamil">Tamil</MenuItem>
                  </TextField>
                  <TextField select label="Board *" value={formData.board} onChange={handleInputChange('board')} error={!!errors.board} helperText={errors.board}>
                    <MenuItem value="CBSE">CBSE</MenuItem><MenuItem value="State Board">State Board</MenuItem>
                  </TextField>
                </FormRow>
              </>
            ) : formData.institutionType === 'college' ? (
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography color={errors.isAkshayaStudent ? "error" : "inherit"}>Are you an Akshaya Student? *</Typography>
                  <RadioGroup row value={formData.isAkshayaStudent} onChange={handleInputChange('isAkshayaStudent')}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Box>
                <FormRow>
                    <TextField label="Country" value={formData.collegeCountry} onChange={handleInputChange('collegeCountry')} />
                    <TextField label="State" value={formData.collegeState} onChange={handleInputChange('collegeState')} />
                    <TextField label="Pincode" value={formData.collegePincode} onChange={handleInputChange('collegePincode')} />
                </FormRow>
                <FormRow>
                    <Autocomplete freeSolo options={collegeOptions} value={formData.collegeName} onInputChange={(e, v) => setFormData(p=>({...p, collegeName: v}))} renderInput={(params) => <TextField {...params} label="College Name *" error={!!errors.collegeName} helperText={errors.collegeName} />} />
                    <TextField label="Degree *" value={formData.degree} onChange={handleInputChange('degree')} error={!!errors.degree} helperText={errors.degree} />
                    <TextField label="Department *" value={formData.department} onChange={handleInputChange('department')} error={!!errors.department} helperText={errors.department} />
                </FormRow>
                <FormRow>
                    <TextField select label="Current Semester *" value={formData.currentSemester} onChange={handleInputChange('currentSemester')} error={!!errors.currentSemester} helperText={errors.currentSemester}>
                        {[1,2,3,4,5,6,7,8].map(s => <MenuItem key={s} value={s}>Semester {s}</MenuItem>)}
                    </TextField>
                    <TextField select label="Start Year" value={formData.startYear} onChange={handleInputChange('startYear')}>
                        {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                    </TextField>
                </FormRow>
              </>
            ) : <Typography color="textSecondary">Select Institution Type above to reveal details.</Typography>}
            
            {formData.institutionType && (
              <FormRow>
                <TextField select label="Stay Type" value={formData.stayType} onChange={handleInputChange('stayType')}>
                  <MenuItem value="dayscholar">Dayscholar</MenuItem><MenuItem value="hosteller">Hosteller</MenuItem>
                </TextField>
                {formData.stayType === 'dayscholar' && (
                  <TextField select label="Transport Mode" value={formData.transportMode} onChange={handleInputChange('transportMode')}>
                    <MenuItem value="walkable">Walkable</MenuItem><MenuItem value="collegebus">College Bus</MenuItem>
                  </TextField>
                )}
              </FormRow>
            )}
          </CardContent>
        </Card>

        {/* 3. FAMILY DETAILS */}
        <Card sx={{ mb: 4 }}>
          <SectionHeader title="3. Family Details" />
          <CardContent sx={{ p: 3 }}>
            <FormControl error={!!errors.familyType} sx={{ mb: 3 }}>
              <FormLabel>Providing details for *</FormLabel>
              <RadioGroup row value={formData.familyType} onChange={handleInputChange('familyType')}>
                <FormControlLabel value="parents" control={<Radio />} label="Parents" />
                <FormControlLabel value="guardians" control={<Radio />} label="Guardian" />
              </RadioGroup>
              {errors.familyType && <FormHelperText>{errors.familyType}</FormHelperText>}
            </FormControl>

            {formData.familyType === 'parents' ? (
              <>
                <Divider sx={{ my: 1 }}><Typography variant="body2">FATHER DETAILS</Typography></Divider>
                <FormRow>
                  <TextField label="Father Name *" value={formData.fatherName} onChange={handleInputChange('fatherName')} error={!!errors.fatherName} helperText={errors.fatherName} />
                  <TextField label="Occupation" value={formData.fatherOccupation} onChange={handleInputChange('fatherOccupation')} />
                  <TextField label="Income (₹)" value={formData.fatherIncome} onChange={handleInputChange('fatherIncome')} />
                </FormRow>
                <Divider sx={{ my: 1 }}><Typography variant="body2">MOTHER DETAILS</Typography></Divider>
                <FormRow>
                  <TextField label="Mother Name *" value={formData.motherName} onChange={handleInputChange('motherName')} error={!!errors.motherName} helperText={errors.motherName} />
                  <TextField label="Occupation" value={formData.motherOccupation} onChange={handleInputChange('motherOccupation')} />
                  <TextField label="Income (₹)" value={formData.motherIncome} onChange={handleInputChange('motherIncome')} />
                </FormRow>
              </>
            ) : formData.familyType === 'guardians' && (
              <FormRow>
                <TextField label="Guardian Name *" value={formData.guardianName} onChange={handleInputChange('guardianName')} error={!!errors.guardianName} helperText={errors.guardianName} />
                <TextField label="Occupation" value={formData.guardianOccupation} onChange={handleInputChange('guardianOccupation')} />
                <TextField label="Income (₹)" value={formData.guardianIncome} onChange={handleInputChange('guardianIncome')} />
              </FormRow>
            )}

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Siblings Information</Typography>
            {formData.siblings.map((sibling, index) => (
              <Card key={sibling.id} sx={{ mb: 2, bgcolor: '#f9f9f9' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Sibling {index + 1}</Typography>
                    <IconButton color="error" onClick={() => removeSibling(sibling.id)}><DeleteIcon /></IconButton>
                  </Box>
                  <FormRow>
                    <TextField label="Name" value={sibling.name} onChange={handleSiblingChange(sibling.id, 'name')} />
                    <TextField label="Age" type="number" value={sibling.age} onChange={handleSiblingChange(sibling.id, 'age')} />
                    <TextField select label="Gender" value={sibling.gender} onChange={handleSiblingChange(sibling.id, 'gender')}>
                      <MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem>
                    </TextField>
                  </FormRow>
                </CardContent>
              </Card>
            ))}
            <Button startIcon={<AddCircleOutlineIcon />} variant="outlined" onClick={addSibling}>Add Sibling</Button>
          </CardContent>
        </Card>

        {/* 4. PERMANENT ADDRESS */}
        <Card sx={{ mb: 4 }}>
          <SectionHeader title="4. Permanent Address" />
          <CardContent sx={{ p: 3 }}>
            <FormRow>
              <TextField label="Pincode *" value={formData.pincode} onChange={handleInputChange('pincode')} error={!!errors.pincode} helperText={errors.pincode} />
              <TextField label="Country" value={formData.addrCountry} InputProps={{ readOnly: true }} />
            </FormRow>
            <FormRow>
              <TextField label="State" value={formData.addrState} InputProps={{ readOnly: true }} />
              <TextField label="District" value={formData.addrDistrict} InputProps={{ readOnly: true }} />
              <TextField label="Taluk" value={formData.addrTaluk} InputProps={{ readOnly: true }} />
            </FormRow>
            <TextField multiline rows={2} label="Complete Address *" value={formData.address} onChange={handleInputChange('address')} error={!!errors.address} helperText={errors.address} />
          </CardContent>
        </Card>

        {/* 5. LANGUAGES */}
        <Card sx={{ mb: 4 }}>
          <SectionHeader title="5. Languages Known" />
          <CardContent sx={{ p: 3 }}>
            <FormRow sx={{ alignItems: 'center' }}>
                <Typography sx={{ width: 100, fontWeight: 'bold' }}>English</Typography>
                <FormControlLabel control={<Checkbox checked={formData.langEnglishRead} onChange={handleInputChange('langEnglishRead')} />} label="Read" />
                <FormControlLabel control={<Checkbox checked={formData.langEnglishWrite} onChange={handleInputChange('langEnglishWrite')} />} label="Write" />
                <FormControlLabel control={<Checkbox checked={formData.langEnglishSpeak} onChange={handleInputChange('langEnglishSpeak')} />} label="Speak" />
            </FormRow>
            <Divider sx={{ my: 1 }} />
            <FormRow sx={{ alignItems: 'center' }}>
                <Typography sx={{ width: 100, fontWeight: 'bold' }}>Tamil</Typography>
                <FormControlLabel control={<Checkbox checked={formData.langTamilRead} onChange={handleInputChange('langTamilRead')} />} label="Read" />
                <FormControlLabel control={<Checkbox checked={formData.langTamilWrite} onChange={handleInputChange('langTamilWrite')} />} label="Write" />
                <FormControlLabel control={<Checkbox checked={formData.langTamilSpeak} onChange={handleInputChange('langTamilSpeak')} />} label="Speak" />
            </FormRow>
            <Divider sx={{ my: 1 }} />
            <FormRow sx={{ alignItems: 'center' }}>
              <TextField placeholder="Other Language" sx={{ width: 150 }} value={formData.otherLangName} onChange={handleInputChange('otherLangName')} />
              <FormControlLabel control={<Checkbox checked={formData.langOtherRead} onChange={handleInputChange('langOtherRead')} />} label="Read" />
              <FormControlLabel control={<Checkbox checked={formData.langOtherWrite} onChange={handleInputChange('langOtherWrite')} />} label="Write" />
              <FormControlLabel control={<Checkbox checked={formData.langOtherSpeak} onChange={handleInputChange('langOtherSpeak')} />} label="Speak" />
            </FormRow>
          </CardContent>
        </Card>

        {/* 6. DOCUMENT UPLOAD */}
        <Card sx={{ mb: 4 }}>
          <SectionHeader title="6. Document Upload" />
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {['Aadhar Card', 'Resume', 'Student ID Card', 'Mark Sheet'].map((label, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <input type="file" id={`upload-${index}`} hidden onChange={(e) => handleFileChange(index, e)} />
                  <label htmlFor={`upload-${index}`}>
                    <Box sx={{ border: '1px dashed #ccc', p: 2, textAlign: 'center', cursor: 'pointer', borderRadius: 2, bgcolor: uploadedFiles[index] ? '#f0fff0' : 'transparent' }}>
                      {uploadedFiles[index] ? <CheckCircle color="#163f36" /> : <UploadCloud color="#9ca3af" />}
                      <Typography variant="caption" display="block">{uploadedFiles[index] || label}</Typography>
                    </Box>
                  </label>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* DECLARATION & SUBMIT */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <FormControlLabel control={<Checkbox checked={formData.declaration} onChange={handleInputChange('declaration')} />} label="I declare all information provided is true. *" />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleReset} startIcon={<RestartAltIcon />}>Reset / Delete</Button>
            <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: "#163f36", px: 4, py: 1 }} disabled={!formData.declaration}>Submit Registration</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;