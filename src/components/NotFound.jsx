import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Box textAlign="center" mt={10}>
    <Typography variant="h3" gutterBottom>404 - Page Not Found</Typography>
    <Button variant="contained" component={Link} to="/">Go to Home</Button>
  </Box>
);

export default NotFound;
