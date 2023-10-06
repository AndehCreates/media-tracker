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
    CurrentEpisode: 0,
    AvailableSeason: 1,
    AvailableEpisode: 1,
    Link: '',
    Image: '',
    Production: false,
    NewEpisodes: true,
    Archive: false,
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
      CurrentSeason: 1,
      CurrentEpisode: 0,
      AvailableSeason: 1,
      AvailableEpisode: 1,
      Link: '',
      Image: '',
      Production: false,
      NewEpisodes: true,
      Archive: false,
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
            onChange={handleInputChange('Name')}
          />
          <Box
            display='flex'
            justifyContent='space-between'
          >
            <TextField
              label='Current Season'
              value={form.CurrentSeason}
              onChange={handleInputChange('CurrentSeason')}
              type='number'
            />

            <TextField
              label='Current Episode'
              value={form.CurrentEpisode}
              onChange={handleInputChange('CurrentEpisode')}
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
              onChange={handleInputChange('AvailableSeason')}
              type='number'
            />

            <TextField
              label='Available Episodes'
              value={form.AvailableEpisode}
              onChange={handleInputChange('AvailableEpisode')}
              type='number'
            />
          </Box>

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
                onClick={() =>
                  handleSwitchChange('Production')(!form.Production)
                }
              />
              <FormControlLabel
                control={<Switch />}
                checked={form.NewEpisodes}
                label='New Episodes'
                onClick={() =>
                  handleSwitchChange('NewEpisodes')(!form.NewEpisodes)
                }
                sx={{ marginRight: '0' }}
              />
              <FormControlLabel
                control={<Switch />}
                checked={form.Archive}
                label='Archive'
                onClick={() => handleSwitchChange('Archive')(!form.Archive)}
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
