import { AIRTABLE_KEY, AIRTABLE_BASE } from './airtable.config';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: AIRTABLE_KEY }).base(AIRTABLE_BASE);

const getShows = async () => {
  return new Promise((resolve, reject) => {
    base('Shows')
      .select()
      .firstPage((err, records) => {
        if (err) {
          reject(err);
        } else {
          const shows = records.map((record) => record.fields);
          console.log(shows);
          resolve(shows);
        }
      });
  });
};

const getMovies = async () => {
  return new Promise((resolve, reject) => {
    base('Movies')
      .select()
      .firstPage((err, records) => {
        if (err) {
          reject(err);
        } else {
          const movies = records.map((record) => record.fields);
          console.log(movies);
          resolve(movies);
        }
      });
  });
};

// Export functions
export { getShows, getMovies };
