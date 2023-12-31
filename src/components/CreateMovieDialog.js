import {
  Dialog,
  Button,
  TextField,
  Switch,
  Box,
  FormControlLabel,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';

export default function CreateMovieDialog({ open, onCreate, onCancel }) {
  // form state and handlers

  const [form, setForm] = useState({
    Name: '',
    Duration: '',
    Link: '',
    Image: '',
    Rating: '',
    Watched: false,
  });

  const handleInputChange = (field) => (evt) => {
    setForm({ ...form, [field]: evt.target.value });
  };

  const handleSwitchChange = (field) => (checked) => {
    setForm({ ...form, [field]: checked });
  };

  const handleSubmit = () => {
    onCreate(form);
    setForm({
      Name: '',
      Duration: '',
      Link: '',
      Image: '',
      Rating: '',
      Watched: false,
    });
  };

  return (
    <Dialog open={open}>
      <Box
        display='flex'
        flexDirection='column'
        gap='.5em'
        padding='1em'
      >
        <TextField
          label='Name'
          value={form.Name}
          onChange={handleInputChange('Name')}
        />

        <TextField
          label='Duration (m)'
          value={form.Duration}
          onChange={handleInputChange('Duration')}
          type='number'
        />

        <TextField
          label='Link'
          value={form.Link}
          onChange={handleInputChange('Link')}
        />

        <TextField
          label='Image URL'
          value={form.Image}
          onChange={handleInputChange('Image')}
        />

        <TextField
          label='Rating'
          value={form.Rating}
          onChange={handleInputChange('Rating')}
          type='number'
        />

        {/* <Switch
        checked={form.Watched}
        onChange={handleChange('Watched')}
      /> */}
        <FormControlLabel
          control={
            <Switch
              checked={form.Watched}
              onClick={() => handleSwitchChange('Watched')(!form.Watched)}
            />
          }
          label='Watched'
        />
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Movie</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
