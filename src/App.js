// app.js
import './App.css';
import Shows from './scenes/Shows';
import Movies from './scenes/Movies';
import { getShows, getMovies } from './api/apiRequest';
import EditDialog from './components/EditDialog';
import { MovieData, ShowData } from './data/data';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import React, { useState } from 'react';
import { ButtonGroup, Button, Box, Typography, Container } from '@mui/material';

function App() {
  const [view, setView] = useState('shows');
  // const [shows, setShows] = useState(JSON.parse(ShowData) || []);
  const [shows, setShows] = useState(ShowData);
  const [movies, setMovies] = useState(MovieData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editShow, setEditShow] = useState(null);
  // const shows = ShowData;
  // const movies = MovieData;
  // console.log(shows);

  const handleOpen = (show) => {
    setOpenDialog(true);
    setEditShow(show);
    console.log('handleOpen triggered');
    console.log(show);
  };

  const handleClose = (show) => {
    setOpenDialog(false);
    setEditShow(null);
    console.log('handleClose triggered');
  };

  const handleSaveEdit = (editShow) => {
    // save + FETCH logic
    console.log('handleSaveEdit triggered');
    setOpenDialog(false);
    setEditShow(null);
  };

  return (
    <>
      <head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          sx={{
            backgroundColor: '#000',
            height: '100vh',
            maxWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Shows or Movies */}
          Show/Movie View: {view}
          <ButtonGroup>
            <Button onClick={(e) => getShows()}>Get Shows</Button>
            <Button onClick={(e) => getMovies()}>Get Movies</Button>
          </ButtonGroup>
          <Box
            sx={{ p: 2 }}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            width='90vw'
            alignItems='center'
            gap='1em'
          >
            <Typography
              fontWeight='900'
              fontSize='3.5em'
            >
              Media Tracker
            </Typography>
            <ButtonGroup>
              <Button
                color='success'
                variant={view === 'shows' ? 'contained' : 'outlined'}
                onClick={() => setView('shows')}
              >
                Shows
              </Button>
              <Button
                color='success'
                variant={view === 'movies' ? 'contained' : 'outlined'}
                onClick={() => setView('movies')}
              >
                Movies
              </Button>
            </ButtonGroup>

            {view === 'shows' && (
              <Shows
                shows={shows}
                onOpen={handleOpen}
                editShow={editShow}
                onSave={handleSaveEdit}
                onClose={handleClose}
                openDialog={openDialog}
              />
            )}
            {view === 'movies' && <Movies movies={movies} />}
            {openDialog && (
              <EditDialog
                editShow={editShow}
                onSave={handleSaveEdit}
                // onOpen={handleOpen}
                onClose={handleClose}
                openDialog={openDialog}
              />
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
