// Shows.js

import React, { useState } from 'react';
import { Badge, Grid, Box, Typography, Button, Tooltip } from '@mui/material';
import './cards.css';

const Shows = ({ shows, onOpen, editShow }) => {
  function ShowCard({
    id,
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

    // hover display code before switching to tooltip
    // const [displayShowDetails, setDisplayShowDetails] = useState(null);
    // const handleShowHover = (e) => {
    //   setDisplayShowDetails(e.currentTarget);
    //   // display show info overlay
    //   console.log(Name + ' hovered: ' + displayShowDetails);
    // };
    // const handleShowHoverClose = () => {
    //   setDisplayShowDetails(null);
    // };
    // const open = Boolean(displayShowDetails);

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
      >
        <Badge
          badgeContent={remainingEpisodes}
          color='success'
        >
          <Box className='poster'>
            <img
              src={Image}
              alt={Name}
              //   onMouseEnter={handleShowHover}
              //   onMouseLeave={handleShowHoverClose}
              show={show}
            />
          </Box>
        </Badge>
        {/* <Box className=''> */}
        <Box
          className='details'
          // display='flex'
          // flexDirection='column'
          // justifyContent='center'
          // textAlign='center'
          // alignItems='center'
          // p='1.25em'
          // gap='.35em'
          // borderRadius='.25em'
          // backgroundColor='#000000b0'
          // minWidth='200px'
        >
          <Typography
            fontSize='1.5em'
            fontWeight='600'
            lineHeight='1em'
          >
            {Name}
          </Typography>
          <Typography
            fontSize='1.25em'
            fontWeight='500'
            // lineHeight='1.5em'
          >
            Current: S {CurrentSeason} Ep {CurrentEpisode}
            <br />
            {remainingSeasons + remainingEpisodes == 0
              ? status !== 'archive' && 'Caught Up!'
              : 'Remaining: '}
            {remainingSeasons == 0 ? '' : 'S ' + remainingSeasons + ' '}
            {remainingEpisodes == 0 ? '' : 'Ep ' + remainingEpisodes}
          </Typography>
          {/* <br /> */}

          <Box
            display='flex'
            gap='.5em'
          >
            <Button
              onClick={() => onOpen(show)}
              variant='contained'
              color='success'
              editShow={editShow}
              show={show}
            >
              Edit
            </Button>
            {!Archive && (
              <Button
                variant='contained'
                color='success'
                href={Link}
                target='_blank'
              >
                Watch
              </Button>
            )}
            {/* </Box> */}
          </Box>
        </Box>

        {/* {displayShowDetails && ( */}
        {/* //   <Popover
          //     anchorOrigin={{
          //       vertical: 'center',
          //       horizontal: 'center',
          //     }}
          //     transformOrigin={{
          //       vertical: 'center',
          //       horizontal: 'center',
          //     }}
          //     sx={{
          //     //   pointerEvents: 'none',
          //     }}
          //     open={open}
          //     onClose={handleShowHoverClose}
          //     disableRestoreFocus
          //     anchorEl={displayShowDetails}
          //     slotProps={{
          //       sx: {
          //         backgroundColor: 'none', // Set your desired background color here
          //       },
          //     }}
          //   > */}

        {/* 
          </Popover>
        )} */}
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
        pt='1em'
        flexGrow='0'
      >
        <Typography
          textAlign='center'
          fontSize='2em'
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
          justifyContent='center'
          //   gap='.1em'
        >
          {shows.map((show) => (
            // <Grid
            //   // item
            //   xs={12}
            //   sm
            //   md
            //   lg
            //   //   p='.05em'
            // >
            <ShowCard
              key={show.id}
              show={show}
              {...show}
              onOpen={onOpen}
            />
            // </Grid>
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
        // container
        spacing={4}
        justifyContent='center'
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

export default Shows;
