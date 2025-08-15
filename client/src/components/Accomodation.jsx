import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Card, CardContent, CardMedia, Typography, Chip, Stack, Box
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Accomodation() {
  const [showForm, setShowForm] = useState(false);
  const [accomodations, setAccomodations] = useState([]);
  const [form, setForm] = useState({
    location: '',
    category: '',
    imageUrl: '',
    priceRange: '',
    rating: '',
    reviews: '',
    title: '',
    description: '',
    tags: '',
    uniqueFeatures: '',
    whatsapp: '',
    bookingLink: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/accomodations')
      .then(res => setAccomodations(res.data))
      .catch(() => setAccomodations([]));
  }, [showForm]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      uniqueFeatures: form.uniqueFeatures.split(',').map(f => f.trim())
    };
    await axios.post('http://localhost:5000/api/accomodations', payload);
    setShowForm(false);
    setForm({
      location: '', category: '', imageUrl: '', priceRange: '', rating: '', reviews: '', title: '', description: '', tags: '', uniqueFeatures: '', whatsapp: '', bookingLink: ''
    });
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5" gutterBottom>Accomodation</Typography>
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{ mt: 1 }}>
          Add New Accomodation
        </Button>
      </Box>
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Accomodation</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField name="location" label="Location" value={form.location} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="category" label="Category" value={form.category} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="imageUrl" label="Image URL" value={form.imageUrl} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="priceRange" label="Price Range" value={form.priceRange} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="rating" label="Rating" type="number" inputProps={{ step: 0.1 }} value={form.rating} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="reviews" label="Number of Reviews" type="number" value={form.reviews} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth multiline required /></Grid>
              <Grid item xs={12}><TextField name="tags" label="Tags (comma separated)" value={form.tags} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="uniqueFeatures" label="Unique Features (comma separated)" value={form.uniqueFeatures} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="whatsapp" label="WhatsApp Link" value={form.whatsapp} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="bookingLink" label="Booking Link" value={form.bookingLink} onChange={handleChange} fullWidth /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)}>Close</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Grid container spacing={3} mt={2}>
        {accomodations.map(acc => (
          <Grid item xs={12} sm={6} md={4} key={acc._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="160"
                image={acc.imageUrl}
                alt={acc.title}
              />
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>{acc.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{acc.description}</Typography>
                <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                  {acc.tags && acc.tags.map((tag, i) => <Chip key={i} label={tag} size="small" color="success" />)}
                </Stack>
                <Typography variant="subtitle2" color="text.secondary">{acc.location} | {acc.category}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{acc.priceRange} per night</Typography>
                <Typography variant="subtitle2" color="text.secondary">Rating: {acc.rating} ({acc.reviews} reviews)</Typography>
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {acc.uniqueFeatures && acc.uniqueFeatures.map((f, i) => <Chip key={i} label={f} size="small" color="info" />)}
                </Stack>
                <Box mt={2} display="flex" alignItems="center" gap={1}>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    startIcon={<WhatsAppIcon />}
                    href={acc.whatsapp}
                    target="_blank"
                  >WhatsApp</Button>
                  {acc.bookingLink && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      href={acc.bookingLink}
                      target="_blank"
                    >Booking</Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Accomodation;