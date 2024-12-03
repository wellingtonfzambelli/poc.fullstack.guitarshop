import React, { useState } from 'react';
import { toast } from "react-toastify";
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
        toast.warning('All the fields are required');
        return;
    }

    toast.success('FAKE message has sent with success');

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <Container component={Paper}>
        <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
            Contact Page
        </Typography>

        <form onSubmit={handleSubmit}>
            <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
            <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
            <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={4}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
            Send
            </Button>
        </form>
        </Box>
    </Container>
  );
};