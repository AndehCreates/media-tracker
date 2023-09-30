// MovieList.js

import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Rating,
  Box,
  Button,
  Typography,
} from '@mui/material';

const Movies = ({ movies }) => {
  function secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? ':' : ':') : '0:';
    let mDisplay = m > 0 ? m + (m == 1 ? '' : '') : '';
    let sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay.padStart(2, '0') + sDisplay;
  }

  function MovieCard({ name, duration, image, link, watched, rating }) {
    return (
      <Box
        className='card'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        textAlign='center'
        alignItems='center'
        p='1em'
        gap='.75em'
        borderRadius='.25em'
        sx={{
          //   'backgroundColor': 'primary.dark',
          'opacity': [0.4, 0.4, 0.4],
          '&:hover': {
            backgroundColor: 'success.dark',
            opacity: [0.9, 0.9, 0.9],
          },
        }}
      >
        <a
          href={link}
          target='_blank'
        >
          <img
            src={image}
            alt={name}
          />
        </a>
        <Typography
          fontSize='1.5em'
          fontWeight='600'
          lineHeight='1em'
        >
          {name}
        </Typography>
        {!watched && 'Duration: ' + secondsToHms(duration)}
        {rating && (
          <Rating
            name='read-only'
            value={rating}
            readOnly
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
        {!watched && (
          <Button
            variant='contained'
            color='success'
            href={link}
            target='_blank'
          >
            Watch
          </Button>
        )}
      </Box>
    );
  }

  function MovieGrid() {
    const newMovies = movies.filter((s) => s.Watched !== true);
    const watchedMovies = movies.filter((s) => s.Watched === true);
    // console.log(newMovies);
    // console.log(watchedMovies);
    return (
      <Grid
        container
        spacing={3}
        justifyContent='center'
        p='2em'
      >
        <Box
          display='flex'
          flexDirection='column'
        >
          <Typography
            textAlign='center'
            fontSize='3em'
            fontWeight='700'
          >
            New Movies
          </Typography>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          //   gap='.1em'
        >
          {newMovies.map((movie) => {
            const { Name, Duration, Image, Link, Watched, Rating } = movie;
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                key={Name}
              >
                <MovieCard
                  key={Name + 'new'}
                  name={Name}
                  duration={Duration}
                  //   image={Image}
                  link={Link}
                  watched={Watched}
                  rating={Rating}
                />
              </Grid>
            );
          })}
        </Box>
        <Box
          display='flex'
          flexDirection='column'
        >
          <Typography
            textAlign='center'
            fontSize='3em'
            fontWeight='700'
          >
            Watched Movies
          </Typography>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          //   gap='.1em'
        >
          {watchedMovies.map((movie) => {
            const { Name, Duration, Image, Link, Watched, Rating } = movie;
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                key={Name}
              >
                <MovieCard
                  key={Name + 'watched'}
                  name={Name}
                  duration={Duration}
                  //   image={Image}
                  link={Link}
                  watched={Watched}
                  rating={Rating}
                />
              </Grid>
            );
          })}
        </Box>
      </Grid>
    );
  }

  return <MovieGrid />;
};

const handleMovieHover = (movie) => {
  // display movie info overlay
};

export default Movies;
