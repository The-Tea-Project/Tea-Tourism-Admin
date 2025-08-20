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
    brochureUrl: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get(`https://theteaprojbackend-5vt20eep9-someshjoygurus-projects.vercel.app/api/accomodations`)
      .then(res => setAccomodations(res.data))
      .catch(() => setAccomodations([]));
  }, [showForm]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Cloudinary upload for image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned upload preset');
    const res = await axios.post('https://api.cloudinary.com/v1_1/dqsh1wxc6/image/upload', formData);
    setForm({ ...form, imageUrl: res.data.secure_url });
  };

  // Cloudinary upload for brochure
  const handleBrochureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned upload preset');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dqsh1wxc6/raw/upload',
      formData
    );
    setForm({ ...form, brochureUrl: res.data.secure_url });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      uniqueFeatures: form.uniqueFeatures.split(',').map(f => f.trim())
    };
    if (editId) {
      await axios.put(`https://theteaprojbackend-5vt20eep9-someshjoygurus-projects.vercel.app/api/accomodations/${editId}`, payload);
      setAccomodations(accomodations.map(acc => acc._id === editId ? { ...acc, ...payload } : acc));
    } else {
      const res = await axios.post(`https://theteaprojbackend-5vt20eep9-someshjoygurus-projects.vercel.app/api/accomodations`, payload);
      setAccomodations([...accomodations, res.data]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({
      location: '', category: '', imageUrl: '', priceRange: '', rating: '', reviews: '', title: '', description: '', tags: '', uniqueFeatures: '', whatsapp: '', brochureUrl: ''
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://theteaprojbackend-5vt20eep9-someshjoygurus-projects.vercel.app/api/accomodations/${id}`);
    setAccomodations(accomodations.filter(acc => acc._id !== id));
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h5" gutterBottom>Accomodation</Typography>
        <Button variant="contained" color="primary" onClick={() => { setShowForm(true); setEditId(null); setForm({ location: '', category: '', imageUrl: '', priceRange: '', rating: '', reviews: '', title: '', description: '', tags: '', uniqueFeatures: '', whatsapp: '', brochureUrl: '' }); }} sx={{ mt: 1 }}>
          Add New Accomodation
        </Button>
      </Box>
      <Dialog open={showForm} onClose={() => { setShowForm(false); setEditId(null); }} maxWidth="md" fullWidth>
        <DialogTitle>{editId ? 'Edit Accomodation' : 'Add New Accomodation'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField name="location" label="Location" value={form.location} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="category" label="Category" value={form.category} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Image
                  <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                </Button>
                {form.imageUrl && <Typography variant="caption" color="success.main">Image uploaded</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}><TextField name="priceRange" label="Price Range" value={form.priceRange} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="rating" label="Rating" type="number" inputProps={{ step: 0.1 }} value={form.rating} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="reviews" label="Number of Reviews" type="number" value={form.reviews} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="description" label="Description" value={form.description} onChange={handleChange} fullWidth multiline required /></Grid>
              <Grid item xs={12}><TextField name="tags" label="Tags (comma separated)" value={form.tags} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField name="uniqueFeatures" label="Unique Features (comma separated)" value={form.uniqueFeatures} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField name="whatsapp" label="WhatsApp Link" value={form.whatsapp} onChange={handleChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Brochure (PDF)
                  <input type="file" accept="application/pdf" hidden onChange={handleBrochureUpload} />
                </Button>
                {form.brochureUrl && <Typography variant="caption" color="success.main">Brochure uploaded</Typography>}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setShowForm(false); setEditId(null); }}>Close</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Grid container spacing={3} mt={2}>
        {accomodations.map(acc => (
          <Grid item xs={12} sm={6} md={4} key={acc._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
                  {acc.tags && acc.tags.map((tag, i) => (
                    <Box key={i} sx={{ p: 0.5 }}>
                      <Chip label={tag} size="small" color="success" />
                    </Box>
                  ))}
                </Stack>
                <Typography variant="subtitle2" color="text.secondary">{acc.location} | {acc.category}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{acc.priceRange} per night</Typography>
                <Typography variant="subtitle2" color="text.secondary">Rating: {acc.rating} ({acc.reviews} reviews)</Typography>
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {acc.uniqueFeatures && acc.uniqueFeatures.map((f, i) => (
                    <Box key={i} sx={{ p: 0.5 }}>
                      <Chip label={f} size="small" color="info" />
                    </Box>
                  ))}
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
                  {acc.brochureUrl && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      href={acc.brochureUrl}
                      target="_blank"
                    >Download Brochure</Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleDelete(acc._id)}
                  >Delete</Button>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      setShowForm(true);
                      setEditId(acc._id);
                      setForm({
                        location: acc.location || '',
                        category: acc.category || '',
                        imageUrl: acc.imageUrl || '',
                        priceRange: acc.priceRange || '',
                        rating: acc.rating || '',
                        reviews: acc.reviews || '',
                        title: acc.title || '',
                        description: acc.description || '',
                        tags: Array.isArray(acc.tags) ? acc.tags.join(', ') : acc.tags || '',
                        uniqueFeatures: Array.isArray(acc.uniqueFeatures) ? acc.uniqueFeatures.join(', ') : acc.uniqueFeatures || '',
                        whatsapp: acc.whatsapp || '',
                        brochureUrl: acc.brochureUrl || ''
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

export default Accomodation;