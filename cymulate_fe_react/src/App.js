import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, TextField, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Card, CardContent, InputAdornment, Chip, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton, Snackbar, Alert } from '@mui/material';
import { Search as SearchIcon, X as CloseIcon, ExternalLink } from 'lucide-react';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
  },
});

// Use environment variables for API base URL
const API_BASE_URL = `http://${process.env.REACT_APP_API_HOST || 'localhost'}:${'3005' || '5001'}`;
console.log(API_BASE_URL)
const App = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [scrapes, setScrapes] = useState([]);
  const [selectedScrape, setSelectedScrape] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

  const fetchScrapes = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scrape/all`);
      setScrapes(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching scrapes:', error);
      setError('Failed to fetch scrapes. Please try again.');
      return null;
    }
  }, []);

  useEffect(() => {
    fetchScrapes();
  }, [fetchScrapes]);

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/scrape/start_scraping`, { url });
      pollForCompletion();
    } catch (error) {
      console.error('Error starting scrape:', error);
      setError('Failed to start scraping. Please try again.');
      setLoading(false);
    }
  };

  const pollForCompletion = useCallback(async () => {
    const poll = async () => {
      const data = await fetchScrapes();
      if (data) {
        const lastScrape = data[data.length - 1];
        if (lastScrape.status === 'finished' || lastScrape.status === 'failed') {
          setLoading(false);
          if (lastScrape.status === 'failed') {
            setError('Scraping process failed. Please try again.');
          }
        } else {
          setTimeout(poll, 2000); // Poll every 2 seconds
        }
      } else {
        setLoading(false);
      }
    };
    poll();
  }, [fetchScrapes]);

  const handleOpenDialog = (scrape) => {
    setSelectedScrape(scrape);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Card elevation={3} sx={{ mb: 4, overflow: 'hidden' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
                Web Scraping Dashboard
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Website URL"
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  fullWidth
                  sx={{ mr: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleScrape}
                  disabled={loading}
                  sx={{ height: 56, minWidth: 100 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Scrape'}
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, color: 'text.secondary' }}>
                Scraping Results
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Base URL</TableCell>
                      <TableCell>Execution Time</TableCell>
                      <TableCell>URLs Found</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scrapes.map((scrape) => (
                      <TableRow key={scrape._id}>
                        <TableCell>{scrape._id}</TableCell>
                        <TableCell>{scrape.base_url}</TableCell>
                        <TableCell>{new Date(scrape.execution_time).toLocaleString()}</TableCell>
                        <TableCell>{scrape.list_of_urls.length}</TableCell>
                        <TableCell>
                          <Chip
                            label={scrape.status}
                            color={scrape.status === 'finished' ? 'success' : scrape.status === 'failed' ? 'error' : 'warning'}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenDialog(scrape)}
                            disabled={scrape.status !== 'finished'}
                          >
                            View URLs
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {scrapes.length === 0 && (
                <Paper elevation={0} sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                  No scrapes performed yet. Start scraping to see results.
                </Paper>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">URLs for {selectedScrape?.base_url}</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {selectedScrape?.list_of_urls.map((url, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={url} />
                <IconButton href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={20} />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;