// MovieList.js

import React from 'react';
import { Grid, Rating, Box, Button, Typography } from '@mui/material';
import './cards.css';

const Movies = ({ movies, onOpen, editMovie }) => {
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

  function MovieCard({ movie, name, duration, image, link, watched, rating }) {
    return (
      <Box
        className='card'
        // sx={{
        //   //   'backgroundColor': 'primary.dark',
        //   'opacity': [0.6, 0.6, 0.6],
        //   '&:hover': {
        //     backgroundColor: '#052202',
        //     opacity: [0.9, 0.9, 0.9],
        //   },
        // }}
        flexBasis='min-content'
      >
        {/* <a
          href={link}
          target='_blank'
          >
          </a> */}
        <Box className='poster'>
          <img
            src={image}
            alt={name}
          />
        </Box>
        <Box className='details'>
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
              name='Rating'
              value={rating}
              readOnly
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          )}
          <Box
            display='flex'
            gap='.5em'
          >
            <Button
              onClick={() => onOpen(movie)}
              variant='contained'
              color='success'
              editMovie={editMovie}
              movie={movie}
            >
              Edit
            </Button>
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
        </Box>
      </Box>
    );
  }

  function MovieGrid({ movies }) {
    const newMovies = movies.filter((s) => s.Watched !== true);
    const watchedMovies = movies.filter((s) => s.Watched === true);
    // console.log(newMovies);
    // console.log(watchedMovies);
    return (
      <Grid
        // container
        spacing={3}
        justifyContent='center'
        // p='1em'
        display='flex'
        flexDirection='column'
      >
        <Box
          display='flex'
          flexDirection='column'
        >
          <Typography
            textAlign='center'
            fontSize='2em'
            fontWeight='700'
          >
            New Movies
          </Typography>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          //   gap='.1em'
        >
          {newMovies.map((movie) => {
            const { Name, Duration, Image, Link, Watched, Rating } = movie;
            return (
              // <Grid
              //   item
              //   xs={12}
              //   sm
              //   md
              //   lg
              //   key={Name}
              // >
              <MovieCard
                key={movie.id}
                movie={movie}
                {...movie}
                onOpen={onOpen}
                name={Name}
                duration={Duration}
                image={Image}
                link={Link}
                watched={Watched}
                rating={Rating}
              />
              // </Grid>
            );
          })}
        </Box>
        <Box
          display='flex'
          flexDirection='column'
        >
          <Typography
            textAlign='center'
            fontSize='2em'
            fontWeight='700'
          >
            Watched Movies
          </Typography>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          //   gap='.1em'
        >
          {watchedMovies.map((movie) => {
            const { Name, Duration, Image, Link, Watched, Rating } = movie;
            return (
              // <Grid
              //   item
              //   xs={12}
              //   sm
              //   md
              //   lg
              //   key={Name}
              // >
              <MovieCard
                key={movie.id}
                movie={movie}
                {...movie}
                onOpen={onOpen}
                name={Name}
                duration={Duration}
                image={Image}
                link={Link}
                watched={Watched}
                rating={Rating}
              />
              // </Grid>
            );
          })}
        </Box>
      </Grid>
    );
  }

  return <MovieGrid movies={movies} />;
};

const handleMovieHover = (movie) => {
  // display movie info overlay
};

export default Movies;
