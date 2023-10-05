import {
  Dialog,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Box,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';

export default function CreateShowDialog({ open, onCreate, onCancel }) {
  // form state and handlers

  const [form, setForm] = useState({
    Name: '',
    CurrentSeason: 1,
    CurrentEpisode: 1,
    AvailableSeason: 1,
    AvailableEpisode: 1,
    Link: '',
    Image: '',
    Production: false,
  });

  const handleChange = (field) => (evt) => {
    setForm({ ...form, [field]: evt.target.value });
  };

  const handleSubmit = () => {
    onCreate(form);
    setForm({
      Name: '',
      CurrentSeason: 1,
      CurrentEpisode: 1,
      AvailableSeason: 1,
      AvailableEpisode: 1,
      Link: '',
      Image: '',
      Production: false,
    });
  };

  return (
    <>
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
            onChange={handleChange('Name')}
          />
          <Box
            display='flex'
            justifyContent='space-between'
          >
            <TextField
              label='Current Season'
              value={form.CurrentSeason}
              onChange={handleChange('CurrentSeason')}
              type='number'
            />

            <TextField
              label='Current Episode'
              value={form.CurrentEpisode}
              onChange={handleChange('CurrentEpisode')}
              type='number'
            />
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
          >
            <TextField
              label='Available Seasons'
              value={form.AvailableSeason}
              onChange={handleChange('AvailableSeason')}
              type='number'
            />

            <TextField
              label='Available Episodes'
              value={form.AvailableEpisode}
              onChange={handleChange('AvailableEpisode')}
              type='number'
            />
          </Box>

          <TextField
            label='Link'
            value={form.Link}
            onChange={handleChange('Link')}
          />

          <TextField
            label='Image URL'
            value={form.Image}
            onChange={handleChange('Image')}
          />

          {/* <Switch
        checked={form.Production}
        onChange={handleChange('Production')}
      />

      <Switch
        checked={form.NewEpisodes}
        onChange={handleChange('NewEpisodes')}
      />

      <Switch
        checked={form.Archive}
        onChange={handleChange('Archive')}
      /> */}
          <FormGroup>
            <Box
              display='flex'
              justifyContent='space-between'
            >
              <FormControlLabel
                control={<Switch />}
                checked={form.Production}
                label='Production'
                onClick={handleChange('Production')}
              />
              <FormControlLabel
                control={<Switch />}
                checked={form.NewEpisodes}
                label='New Episodes'
                onClick={handleChange('NewEpisodes')}
                sx={{ marginRight: '0' }}
              />
              <FormControlLabel
                control={<Switch />}
                checked={form.Archive}
                label='Archive'
                onClick={handleChange('Archive')}
              />
            </Box>
          </FormGroup>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Create Show</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
