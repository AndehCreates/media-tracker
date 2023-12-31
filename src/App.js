// app.js
import './App.css';
import Shows from './scenes/Shows';
import Movies from './scenes/Movies';
import {
  getShows,
  getMovies,
  updateShow,
  updateMovie,
  createShow,
  createMovie,
} from './api/apiRequest';
import EditShowDialog from './components/EditShowDialog';
import EditMovieDialog from './components/EditMovieDialog';
// import { MovieData, ShowData } from './data/data';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Box, Typography, Container } from '@mui/material';
import CreateShowDialog from './components/CreateShowDialog';
import CreateMovieDialog from './components/CreateMovieDialog';

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
  const [rerender, setRerender] = useState(0);
  const [openCreateShow, setOpenCreateShow] = useState(false);
  const [openCreateMovie, setOpenCreateMovie] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const showResponse = getShows();
        const movieResponse = getMovies();
        // if (!response.ok) throw Error('Did not recieve expected data');
        // const showItemsPromise = await showResponse;
        // const movieItemsPromise = await movieResponse;

        //update to parallel request
        const [showItems, movieItems] = await Promise.all([
          showResponse,
          movieResponse,
        ]);
        // console.log(showItems);
        // console.log(movieItems);
        setShows(showItems);
        setMovies(movieItems);
        console.log(shows);
        console.log(movies);
        setFetchError(null);
      } catch (err) {
        console.log(err.stack);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
        console.log('Loaded: isLoading is False');
      }
    };
    fetchItems();
    // setTimeout(() => {
    // }, 1000);
  }, [rerender]);

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

  const handleCloseCreateDialog = () => {
    setOpenCreateShow(false);
    setOpenCreateMovie(false);
    console.log('handleCloseCreateDialog triggered');
  };

  const handleCreateShow = async (newShow) => {
    console.log(newShow);
    await createShow(newShow); // API call

    setShows([...shows, newShow]); // add to state
    setOpenCreateShow(false); // close dialog
    setRerender(rerender + 1); // force re-render
  };

  const handleCreateMovie = async (newMovie) => {
    console.log(newMovie);
    await createMovie(newMovie); // API call

    setMovies([...movies, newMovie]); // add to state
    setOpenCreateMovie(false); // close dialog
    setRerender(rerender + 1); // force re-render
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

    // setRerender(rerender + 1); // force re-render
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

    // setRerender(rerender + 1); // force re-render
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
            // maxWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Shows or Movies */}
          {/* Show/Movie View: {view} */}
          {/* <ButtonGroup>
            <Button onClick={(e) => getShows()}>Get Shows</Button>
            <Button onClick={(e) => getMovies()}>Get Movies</Button>
          </ButtonGroup> */}
          <Box
            // sx={{ p: 2 }}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            width='95vw'
            alignItems='center'
            gap='.5em'
          >
            <Typography
              fontWeight='900'
              fontSize='3em'
            >
              Media Tracker
            </Typography>
            <Box
              display='flex'
              gap='.5em'
            >
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
              <ButtonGroup>
                <Button onClick={() => setOpenCreateShow(true)}>
                  Add Show
                </Button>
                <Button onClick={() => setOpenCreateMovie(true)}>
                  Add Movie
                </Button>
              </ButtonGroup>
            </Box>

            {isLoading && <>Loading Items...</>}
            {fetchError && (
              <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
            )}
            {/* {!fetchError && !isLoading && 'loaded!'} */}

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
            <CreateShowDialog
              open={openCreateShow}
              onCreate={handleCreateShow}
              onCancel={handleCloseCreateDialog}
            />
            <CreateMovieDialog
              open={openCreateMovie}
              onCreate={handleCreateMovie}
              onCancel={handleCloseCreateDialog}
            />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
