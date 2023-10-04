// app.js
import './App.css';
import Shows from './scenes/Shows';
import Movies from './scenes/Movies';
import { getShows, getMovies, updateShow } from './api/apiRequest';
import EditDialog from './components/EditDialog';
import { MovieData, ShowData } from './data/data';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Box, Typography, Container } from '@mui/material';

function App() {
  const [view, setView] = useState('shows');
  const [shows, setShows] = useState([]);
  // const [shows, setShows] = useState(ShowData);
  const [movies, setMovies] = useState(MovieData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editShow, setEditShow] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rerender, setRerender] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getShows();
        // if (!response.ok) throw Error('Did not recieve expected data');
        const showItems = await response;
        console.log(showItems);
        setShows(showItems);
        setFetchError(null);
      } catch (err) {
        console.log(err.stack);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
        console.log('Loaded: isLoading is False');
        console.log(shows);
      }
    };
    fetchItems();
    // setTimeout(() => {
    // }, 1000);
  }, []);

  const handleOpen = (show) => {
    setEditShow(show);
    setOpenDialog(true);
    console.log('handleOpen triggered');
    console.log(show);
  };

  const handleClose = (show) => {
    setOpenDialog(false);
    setEditShow(null);
    console.log('handleClose triggered');
  };

  const handleSaveEdit = async (record) => {
    // save + FETCH logic

    console.log('handleSaveEdit triggered');
    const { id, ...fields } = record;
    console.log('record: ' + record.id);
    // console.log(record.fields);
    await updateShow(id, fields);

    // Update show
    const updatedShows = shows.map((show) => {
      if (show.id === id) {
        // Return updated show fields
        return { ...show, ...fields };
      } else {
        return show;
      }
    });

    sortShows(updatedShows); // resort shows

    // update shows state
    setShows(updatedShows);

    setRerender({}); // force re-render

    // await updateShow(editedShow.id, editedShow);

    // const updatedShows = shows.map((s) => {
    //   if (s.id === editedShow.id) {
    //     return editedShow;
    //   } else {
    //     return s;
    //   }
    // });

    // setShows(updatedShows);

    // setOpenDialog(false);
    // setEditShow(null);
  };

  const sortShows = (shows) => {
    const sortedShows = shows.map((show) => {
      let status;

      if (show.NewEpisodes && show.Production) {
        status = 'new';
      } else if (show.NewEpisodes && !show.Production) {
        status = 'backlog';
      } else if (!show.NewEpisodes && show.Production) {
        status = 'updated';
      } else {
        status = 'archive';
      }

      return {
        ...show,
        status,
      };
    });
  };

  return (
    <>
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

            {isLoading && <>Loading Items...</>}
            {fetchError && (
              <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
            )}
            {!fetchError && !isLoading && 'loaded!'}

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
