// Shows.js

import React from 'react';
import { Badge, Grid, Box, Typography, Button } from '@mui/material';

const Shows = ({ shows, onOpen, editShow }) => {
  function ShowCard({
    Name,
    CurrentSeason,
    CurrentEpisode,
    Image,
    Link,
    AvailableSeason,
    AvailableEpisode,
    NewEpisodes,
    Production,
    Archive,
    status,
    onOpen,
    show,
    editShow,
  }) {
    let remainingSeasons = AvailableSeason - CurrentSeason;
    let remainingEpisodes = AvailableEpisode - CurrentEpisode;

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
        <Badge
          badgeContent={remainingEpisodes}
          color='success'
        >
          <a
            href={Link}
            target='_blank'
          >
            {/* <img
              src={Image}
              alt={Name}
            /> */}
          </a>
        </Badge>
        <Box
          className='cardText'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          textAlign='center'
          alignItems='center'
          p='1em'
          gap='.75em'
          borderRadius='.25em'
        >
          <Typography
            fontSize='1.5em'
            fontWeight='600'
            lineHeight='1em'
          >
            {Name}
          </Typography>
          Current: S {CurrentSeason} Ep {CurrentEpisode}
          <br />
          {remainingSeasons + remainingEpisodes == 0
            ? status !== 'archive' && 'Caught Up!'
            : 'Remaining: '}
          {remainingSeasons == 0 ? '' : 'S ' + remainingSeasons + ' '}
          {remainingEpisodes == 0 ? '' : 'Ep ' + remainingEpisodes}
          <br />
          <Button
            onClick={() => onOpen(show)}
            variant='contained'
            color='success'
            editShow={editShow}
            show={show}
          >
            Edit
          </Button>
        </Box>
      </Box>
    );
  }

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

  const statuses = ['new', 'backlog', 'updated', 'archive'];

  const Section = ({ status, shows }) => {
    return (
      <Box
        display='flex'
        flexDirection='column'
      >
        <Typography
          textAlign='center'
          fontSize='3em'
          fontWeight='700'
        >
          {status == 'new' && 'Running, Available!'}
          {status == 'backlog' && 'Episodes Available!'}
          {status == 'updated' && 'Running, up to date'}
          {status == 'archive' && 'Archived'}
        </Typography>
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          //   gap='.1em'
        >
          {shows.map((show) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              //   p='.05em'
            >
              <ShowCard
                key={show.id}
                show={show}
                {...show}
                onOpen={onOpen}
              />
            </Grid>
          ))}
        </Box>
      </Box>
    );
  };

  function ShowGrid() {
    const newShows = sortedShows.filter((s) => s.status === 'new');
    const backlogShows = sortedShows.filter((s) => s.status === 'backlog');
    const updatedShows = sortedShows.filter((s) => s.status === 'updated');
    const archiveShows = sortedShows.filter((s) => s.status === 'archive');

    return (
      <Grid
        container
        spacing={3}
        justifyContent='center'
        p='2em'
      >
        {statuses.map((status, i) => {
          const filteredShows = sortedShows.filter(
            (show) => show.status === status
          );
          //   console.log(i);

          return (
            <Section
              key={i}
              status={status}
              shows={filteredShows}
            />
          );
        })}
      </Grid>
    );
  }

  return <ShowGrid />;
};

const handleShowHover = (show) => {
  // display show info overlay
};

export default Shows;
