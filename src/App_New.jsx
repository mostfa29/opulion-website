import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Slide,
  CircularProgress,
  Alert,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Bolt,
  Security,
  AccessTime,
  SmartToy,
  ArrowForward,
  Star,
  Rocket,
  AutoAwesome,
  TrendingUp,
  Schedule,
  AttachMoney,
  Groups,
  Verified,
  Home,
  Phone,
  Email
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Custom animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.6); }
`;

const App = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phone: ''
  });

  // Floating elements for background
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10
    }));
    setFloatingElements(elements);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitToGoogleSheets = async (data) => {
    // Replace with your actual Google Sheets Web App URL
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwyiov4FmmWk5BE1_uRND7Wtr-djJXUPW59QAh4xqjsc9H_BvN-hdn-Eyxp06Il032_/exec';
    
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit to Google Sheets
    await submitToGoogleSheets({
      ...formData,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setFormData({ name: '', email: '', role: '', phone: '' });
      }, 2000);
    }, 2000);
  };

  const painPoints = [
    {
      icon: <AttachMoney sx={{ fontSize: 40, color: '#ff4444' }} />,
      title: "Deals Falling Apart at the Finish Line",
      description: "That sinking feeling when your $15K commission vanishes because the inspection deadline passed or financing fell through - and you only found out after it was too late"
    },
    {
      icon: <Schedule sx={{ fontSize: 40, color: '#ff4444' }} />,
      title: "Living in Your Phone 24/7",
      description: "Constantly checking contracts, setting reminders, and losing sleep over what you might be forgetting. Your phone buzzes at 11 PM and your heart skips a beat"
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: '#ff4444' }} />,
      title: "Clients Calling You 'Unprofessional'",
      description: "When buyers and sellers don't know what's happening next, they blame YOU. Those awkward conversations when you realize you forgot to order the appraisal"
    }
  ];

  const solutions = [
    {
      icon: <Bolt sx={{ fontSize: 40, color: '#00ffff' }} />,
      title: "Your Personal Transaction Assistant",
      description: "The moment DocuSign pings 'executed,' DealGuard springs into action - automatically creating your timeline, setting critical deadlines, and keeping every party informed"
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#00ffff' }} />,
      title: "Never Miss Another Deadline",
      description: "Smart alerts for inspection periods, loan contingencies, appraisal deadlines, and title work. Get notifications days before deadlines, not after they've passed"
    },
    {
      icon: <Verified sx={{ fontSize: 40, color: '#00ffff' }} />,
      title: "Look Like the Most Organized Agent",
      description: "Clients get instant welcome emails, timeline updates, and proactive communication. They'll tell everyone you're the most professional realtor they've worked with"
    }
  ];

  const benefits = [
    "Save every deal that would normally fall through the cracks",
    "Get back 8-12 hours per transaction to focus on new listings and showings",
    "Turn stressed clients into raving fans who refer everyone they know",
    "Position yourself as the 'tech-savvy' agent all the lenders want to work with",
    "Finally sleep through the night without worrying about forgotten deadlines",
    "Close more deals per month without hiring expensive support staff",
    "Build a reputation as the agent who 'never lets anything slip through the cracks'",
    "Stop living in constant fear of blown deadlines and lost commissions"
  ];

  const testimonials = [
    {
      name: "Jennifer Walsh",
      role: "Top 5% Producer, Austin MLS",
      quote: "I closed 3 more deals last month just because I wasn't drowning in transaction management. This is a game-changer."
    },
    {
      name: "Marcus Rodriguez",
      role: "Million Dollar Producer, Phoenix",
      quote: "My clients keep commenting on how 'on top of everything' I am. Little do they know it's all automated now!"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 25%, #000066 50%, #1a0033 75%, #0a0a0a 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating Background Elements */}
      {floatingElements.map((element) => (
        <Box
          key={element.id}
          sx={{
            position: 'absolute',
            width: element.size,
            height: element.size,
            background: 'linear-gradient(45deg, rgba(0,255,255,0.1), rgba(255,0,255,0.1))',
            borderRadius: '50%',
            left: `${element.x}%`,
            top: `${element.y}%`,
            animation: `${float} ${element.duration}s ease-in-out infinite, ${pulse} 3s ease-in-out infinite`,
            backdropFilter: 'blur(10px)',
            zIndex: 0
          }}
        />
      ))}

      {/* Header */}
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'rgba(0,0,0,0.3)', 
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,255,255,0.2)',
          zIndex: 10
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Home sx={{ color: '#00ffff', mr: 2, fontSize: 32 }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              DealGuard AI
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            endIcon={<ArrowForward />}
            sx={{
              background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
              borderRadius: '25px',
              px: 3,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              animation: `${glow} 2s ease-in-out infinite`,
              '&:hover': {
                background: 'linear-gradient(45deg, #00cccc, #cc00cc)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Get Early Access
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Fade in timeout={1000}>
          <Box textAlign="center">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${pulse} 3s ease-in-out infinite`
              }}
            >
              Stop Losing Comissions Over Transaction Deadlines
            </Typography>
            
            <Typography variant="h4" sx={{ color: '#cccccc', mb: 3, fontWeight: 300, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              The AI Assistant That Watches Your Deals 24/7 So You Don't Have To
            </Typography>
            
            {/* <Typography variant="h6" sx={{ color: '#00ffff', mb: 6, fontWeight: 600 }}>
              Built by realtors who've been there - checking contracts at midnight, stressed about what they forgot
            </Typography> */}

            {/* Problem Statement */}
            <Card
              sx={{
                maxWidth: 800,
                mx: 'auto',
                mb: 6,
                background: 'rgba(255,0,0,0.1)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255,100,100,0.3)',
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ color: '#ff6b6b', mb: 3, fontWeight: 'bold' }}>
                  Sound Familiar?
                </Typography>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2, lineHeight: 1.6 }}>
                  It's Sunday night. You're scrolling through your active deals, double-checking dates, setting phone reminders...
                </Typography>
                <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.6 }}>
                  That nagging feeling that you're forgetting something important. Because last month, you almost lost a $12K commission to a missed inspection deadline.
                </Typography>
              </CardContent>
            </Card>

            {/* Solution CTA */}
            <Card
              sx={{
                maxWidth: 700,
                mx: 'auto',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(0,255,255,0.3)',
                borderRadius: 4,
                animation: `${glow} 3s ease-in-out infinite`,
                position: 'relative'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Chip
                  label="🚀 PRE-LAUNCH SPECIAL - EARLY ACCESS"
                  sx={{
                    background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    mb: 3
                  }}
                />
                
                <Typography variant="h4" sx={{ color: '#00ffff', fontWeight: 'bold', mb: 2 }}>
                  What if you NEVER had to worry again?
                </Typography>
                
                <Typography variant="h6" sx={{ color: '#cccccc', mb: 2 }}>
                  Join our early access program for just $285
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#00ff00', mb: 4, fontWeight: 'bold' }}>
                  That's less than half of ONE saved commission • Full year access included
                </Typography>
                
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => setIsModalOpen(true)}
                  endIcon={<Rocket />}
                  sx={{
                    background: 'linear-gradient(45deg, #00ff00, #00ffff)',
                    color: '#000',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    py: 2,
                    borderRadius: 3,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00cc00, #00cccc)',
                      transform: 'scale(1.02)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  GET EARLY ACCESS - $285/YEAR
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>

      {/* Pain Points Section */}
      <Box sx={{ background: 'rgba(255,0,0,0.05)', py: 8 }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              color: '#ff6b6b',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Every Realtor's Worst Nightmare
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 6, color: '#ccc', maxWidth: 600, mx: 'auto' }}
          >
            You know these moments. We've all been there. Here's how DealGuard makes them disappear forever.
          </Typography>
          
          <Grid container spacing={4}>
            {painPoints.map((point, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide in direction="up" timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255,0,0,0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,100,100,0.3)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        border: '1px solid rgba(255,100,100,0.6)',
                        boxShadow: '0 20px 40px rgba(255,100,100,0.2)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ mb: 3 }}>
                        {point.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#ff6b6b' }}>
                        {point.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.6 }}>
                        {point.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Solutions Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Your AI Transaction Watchdog
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ mb: 6, color: '#ccc', maxWidth: 700, mx: 'auto' }}
        >
          From signed contract to keys in hand - DealGuard monitors every deadline, tracks every task, and keeps everyone in the loop.
        </Typography>
        
        <Grid container spacing={4}>
          {solutions.map((solution, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Slide in direction="up" timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,255,255,0.2)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      border: '1px solid rgba(0,255,255,0.6)',
                      boxShadow: '0 20px 40px rgba(0,255,255,0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      {solution.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
                      {solution.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#ccc', lineHeight: 1.6 }}>
                      {solution.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ background: 'rgba(0,255,255,0.05)', py: 8 }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              mb: 6,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            What Changes When You Have DealGuard
          </Typography>
          
          <Card
            sx={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,0,255,0.3)',
              borderRadius: 4
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <List>
                {benefits.map((benefit, index) => (
                  <Fade in timeout={1000 + index * 100} key={index}>
                    <ListItem sx={{ py: 1 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: '#00ff00' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={benefit}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: '#fff',
                            fontSize: '16px',
                            lineHeight: 1.5
                          }
                        }}
                      />
                    </ListItem>
                  </Fade>
                ))}
              </List>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Social Proof Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 6, fontWeight: 'bold', color: '#00ffff' }}
        >
          What Beta Users Are Saying
        </Typography>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,0,0.3)',
                  borderRadius: 3,
                  height: '100%'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ color: '#fff', mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                    "{testimonial.quote}"
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#00ffff', fontWeight: 'bold' }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    {testimonial.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pricing/Value Section */}
      <Box sx={{ background: 'rgba(0,255,0,0.05)', py: 8 }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: '#00ff00' }}>
            Early Access Investment
          </Typography>
          
          <Card
            sx={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(0,255,0,0.3)',
              borderRadius: 4,
              maxWidth: 500,
              mx: 'auto',
              mb: 4
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h2" sx={{ color: '#00ff00', fontWeight: 'bold', mb: 1 }}>
                $285
              </Typography>
              <Typography variant="h6" sx={{ color: '#ccc', mb: 3 }}>
                Full Year Access • Early Access Price
              </Typography>
              
              <Typography variant="body1" sx={{ color: '#fff', mb: 2, lineHeight: 1.6 }}>
                That's less than half of what you'd lose on ONE blown deal
              </Typography>
              
              <Typography variant="body2" sx={{ color: '#999', fontStyle: 'italic' }}>
                Regular pricing will be $89/month when we launch publicly
              </Typography>
            </CardContent>
          </Card>
          
          <Typography variant="h6" sx={{ color: '#ccc', mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
            Skip the stress, save your deals, and get back to what you do best - selling real estate.
          </Typography>
        </Container>
      </Box>

      {/* Final CTA */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: '#00ffff' }}>
          Ready to Get Your Evenings Back?
        </Typography>
        <Typography variant="h6" sx={{ color: '#ccc', mb: 4, maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
          Join hundreds of realtors who never worry about missed deadlines anymore. Early access starts at just $285 for the full year.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsModalOpen(true)}
          endIcon={<AutoAwesome />}
          sx={{
            background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
            fontSize: '20px',
            fontWeight: 'bold',
            px: 6,
            py: 2,
            borderRadius: 4,
            animation: `${glow} 2s ease-in-out infinite`,
            '&:hover': {
              transform: 'scale(1.05)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          GET EARLY ACCESS NOW - $285
        </Button>
        
        <Typography variant="body1" sx={{ color: '#999', mt: 3, fontStyle: 'italic' }}>
          30-day money-back guarantee • Cancel anytime • No setup fees
        </Typography>
      </Container>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(0,255,255,0.3)',
            borderRadius: 4,
            color: 'white'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          color: '#00ffff', 
          fontSize: '24px', 
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(0,255,255,0.2)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Get Early Access - $285/Year
            <IconButton onClick={() => setIsModalOpen(false)} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          {!isSubmitted ? (
            <>
              <Typography variant="body1" sx={{ color: '#ccc', mb: 1, textAlign: 'center' }}>
                Join the early access program and never lose sleep over transaction deadlines again.
              </Typography>
              <Typography variant="body2" sx={{ color: '#00ff00', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                Full year access • 30-day money-back guarantee
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(0,255,255,0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#00ffff' }
                    },
                    '& .MuiInputLabel-root': { color: '#ccc' }
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                  type="email"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(0,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(0,255,255,0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#00ffff' }
                    },
                    '& .MuiInputLabel-root': { color: '#ccc' }
                  }}
                />
              </Box>
            </>
          ) : (
            <Box textAlign="center" sx={{ py: 4 }}>
              <CheckCircle sx={{ fontSize: 60, color: '#00ff00', mb: 2 }} />
              <Alert severity="success" sx={{ background: 'rgba(0,255,0,0.1)', color: '#00ff00' }}>
                Welcome to DealGuard AI! Check your email for payment instructions and early access details.
              </Alert>
            </Box>
          )}
        </DialogContent>
        
        {!isSubmitted && (
          <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(0,255,255,0.2)' }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                background: 'linear-gradient(45deg, #00ff00, #00ffff)',
                color: '#000',
                fontSize: '16px',
                fontWeight: 'bold',
                py: 1.5,
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc00, #00cccc)'
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: '#000' }} />
                  Processing...
                </>
              ) : (
                'SECURE MY EARLY ACCESS - $285'
              )}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

export default App