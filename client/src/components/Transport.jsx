import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, Card, CardContent, CardMedia, Typography, Chip, Stack, Box
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function Transport() {
  const { getToken } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [transports, setTransports] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: '',
    imageUrl: '',
    priceRange: '',
    rating: '',
    reviews: '',
    description: '',
    keyFeatures: '',
    departureInfo: '',
    bookingLink: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      axios.get(`https://theteaprojbackend.vercel.app/api/transports`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setTransports(res.data))
        .catch(() => setTransports([]));
    })();
  }, [showForm, getToken]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await getToken();
    const payload = {
      ...form,
      keyFeatures: form.keyFeatures.split(',').map(f => f.trim())
    };
    if (editId) {
      await axios.put(
        `https://theteaprojbackend.vercel.app/api/transports/${editId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransports(transports.map(t => t._id === editId ? { ...t, ...payload } : t));
    } else {
      const res = await axios.post(
        `https://theteaprojbackend.vercel.app/api/transports`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransports([...transports, res.data]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({
      title: '', category: '', imageUrl: '', priceRange: '', rating: '', reviews: '', description: '', keyFeatures: '', departureInfo: '', bookingLink: ''
    });
  };

  const handleDelete = async (id) => {
    const token = await getToken();
    await axios.delete(
      `https://theteaprojbackend.vercel.app/api/transports/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTransports(transports.filter(t => t._id !== id));
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5" gutterBottom>Transport Experiences</Typography>
        <Button variant="contained" color="primary" onClick={() => { setShowForm(true); setEditId(null); setForm({ title: '', category: '', imageUrl: '', priceRange: '', rating: '', reviews: '', description: '', keyFeatures: '', departureInfo: '', bookingLink: '' }); }} sx={{ mt: 1 }}>
          Add New Transport
        </Button>
      </Box>
      <Dialog open={showForm} onClose={() => { setShowForm(false); setEditId(null); }} maxWidth="md" fullWidth>
        <DialogTitle>{editId ? 'Edit Transport Experience' : 'Add New Transport Experience'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="category" label="Category" value={form.category} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="imageUrl" label="Image URL" value={form.imageUrl} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="priceRange" label="Price Range" value={form.priceRange} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="rating" label="Rating" type="number" inputProps={{ step: 0.1 }} value={form.rating} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="reviews" label="Number of Reviews" type="number" value={form.reviews} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth multiline required /></Grid>
              <Grid item xs={12}><TextField name="keyFeatures" label="Key Features (comma separated)" value={form.keyFeatures} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="departureInfo" label="Departure Info" value={form.departureInfo} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="bookingLink" label="Booking Link" value={form.bookingLink} onChange={handleChange} fullWidth /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setShowForm(false); setEditId(null); }}>Close</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Grid container spacing={3} mt={2}>
        {transports.map(t => (
          <Grid item xs={12} sm={6} md={4} key={t._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <CardMedia
                component="img"
                height="160"
                image={t.imageUrl}
                alt={t.title}
              />
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>{t.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{t.description}</Typography>
                <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                  {t.keyFeatures && t.keyFeatures.map((f, i) => (
                    <Box key={i} sx={{ p: 0.5 }}>
                      <Chip label={f} size="small" color="success" />
                    </Box>
                  ))}
                </Stack>
                <Typography variant="subtitle2" color="text.secondary">{t.category}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{t.priceRange} per person</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <StarIcon sx={{ color: 'gold' }} />
                  <Typography variant="subtitle2" color="text.secondary">{t.rating} ({t.reviews} reviews)</Typography>
                </Box>
                <Typography variant="body2" color="success.main" mt={2}>{t.departureInfo}</Typography>
                <Box mt={2} display="flex" alignItems="center" gap={1}>
                  {t.bookingLink && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      href={t.bookingLink}
                      target="_blank"
                    >Book Transport</Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleDelete(t._id)}
                  >Delete</Button>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      setShowForm(true);
                      setEditId(t._id);
                      setForm({
                        title: t.title || '',
                        category: t.category || '',
                        imageUrl: t.imageUrl || '',
                        priceRange: t.priceRange || '',
                        rating: t.rating || '',
                        reviews: t.reviews || '',
                        description: t.description || '',
                        keyFeatures: Array.isArray(t.keyFeatures) ? t.keyFeatures.join(', ') : t.keyFeatures || '',
                        departureInfo: t.departureInfo || '',
                        bookingLink: t.bookingLink || ''
                      });
                    }}
                  >Edit</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Transport;
