// app.js
import './App.css';
import Shows from './scenes/Shows';
import Movies from './scenes/Movies';
import { getShows, getMovies, updateShow, updateMovie } from './api/apiRequest';
import EditShowDialog from './components/EditShowDialog';
import EditMovieDialog from './components/EditMovieDialog';
// import { MovieData, ShowData } from './data/data';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Box, Typography, Container } from '@mui/material';

function App() {
  const [view, setView] = useState('shows');
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  // const [shows, setShows] = useState(ShowData);
  // const [movies, setMovies] = useState(MovieData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editShow, setEditShow] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rerender, setRerender] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const showResponse = await getShows();
        const movieResponse = await getMovies();
        // if (!response.ok) throw Error('Did not recieve expected data');
        const showItems = await showResponse;
        const movieItems = await movieResponse;
        // console.log(showItems);
        // console.log(movieItems);
        setShows(showItems);
        setMovies(movieItems);
        setFetchError(null);
      } catch (err) {
        console.log(err.stack);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
        console.log('Loaded: isLoading is False');
        console.log(movies);
        console.log(shows);
      }
    };
    fetchItems();
    // setTimeout(() => {
    // }, 1000);
  }, []);

  const handleOpenShow = (show) => {
    setEditShow(show);
    setOpenDialog(true);
    console.log('handleOpenShow triggered');
    console.log(show);
  };

  const handleOpenMovie = (movie) => {
    setEditMovie(movie);
    setOpenDialog(true);
    console.log('handleOpenMovie triggered');
    console.log(movie);
  };

  const handleCloseShow = (show) => {
    setOpenDialog(false);
    setEditShow(null);
    console.log('handleCloseShow triggered');
  };

  const handleCloseMovie = (movie) => {
    setOpenDialog(false);
    setEditMovie(null);
    console.log('handleCloseMovie triggered');
  };

  const handleSaveEditedShow = async (record) => {
    // save + FETCH logic

    console.log('handleSaveEditedShow triggered');
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
  };

  const handleSaveEditedMovie = async (record) => {
    // save + FETCH logic
    console.log('handleSaveEditedMovie triggered');
    const { id, ...fields } = record;
    console.log('record: ' + record.id);
    // console.log(record.fields);
    await updateMovie(id, fields);

    // Update Movie
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        // Return updated movie fields
        return { ...movie, ...fields };
      } else {
        return movie;
      }
    });

    filteredMovies(movies);
    // update Movies state
    setMovies(updatedMovies);

    setRerender({}); // force re-render
  };

  function filteredMovies(movies) {
    return {
      newMovies: movies.filter((m) => !m.Watched),
      watchedMovies: movies.filter((m) => m.Watched),
    };
  }

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
                // color='success'
                variant={view === 'shows' ? 'contained' : 'outlined'}
                onClick={() => setView('shows')}
              >
                Shows
              </Button>
              <Button
                // color='success'
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
                onOpen={handleOpenShow}
                editShow={editShow}
                onSave={handleSaveEditedShow}
                onClose={handleCloseShow}
                openDialog={openDialog}
              />
            )}
            {view === 'movies' && (
              <Movies
                movies={movies}
                onOpen={handleOpenMovie}
                editMovie={editMovie}
                onSave={handleSaveEditedMovie}
                onClose={handleCloseMovie}
                openDialog={openDialog}
              />
            )}
            {openDialog && view === 'shows' && (
              <EditShowDialog
                editShow={editShow}
                onSave={handleSaveEditedShow}
                onOpen={handleOpenShow}
                onClose={handleCloseShow}
                openDialog={openDialog}
              />
            )}
            {openDialog && view === 'movies' && (
              <EditMovieDialog
                editMovie={editMovie}
                onSave={handleSaveEditedMovie}
                onOpen={handleOpenMovie}
                onClose={handleCloseMovie}
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
