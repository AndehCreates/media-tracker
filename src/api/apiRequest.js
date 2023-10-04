import { AIRTABLE_KEY, AIRTABLE_BASE } from './airtable.config';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: AIRTABLE_KEY }).base(AIRTABLE_BASE);

const getShows = async () => {
  return new Promise((resolve, reject) => {
    base('Shows')
      .select()
      .all()
      .then((records) => {
        const shows = records.map((record) => ({
          id: record.id,
          ...record.fields,
        }));

        resolve(shows);
        console.log(shows);
      })
      .catch((err) => reject(err));
  });
};

//old getShows request ommits ID and maps the show fields as an array
// const getShows = async () => {
//   return new Promise((resolve, reject) => {
//     base('Shows')
//       .select()
//       .firstPage((err, records) => {
//         if (err) {
//           reject(err);
//         } else {
//           const shows = records.map((record) => record.fields);
//           console.log(shows);
//           resolve(shows);
//         }
//       });
//   });
// };

// const getMovies = async () => {
//   return new Promise((resolve, reject) => {
//     base('Movies')
//       .select()
//       .firstPage((err, records) => {
//         if (err) {
//           reject(err);
//         } else {
//           const movies = records.map((record) => record.fields);
//           console.log(movies);
//           resolve(movies);
//         }
//       });
//   });
// };

const getMovies = async () => {
  return new Promise((resolve, reject) => {
    base('Movies')
      .select()
      .all()
      .then((records) => {
        const movies = records.map((record) => ({
          id: record.id,
          ...record.fields,
        }));

        resolve(movies);
        console.log(movies);
      })
      .catch((err) => reject(err));
  });
};

const updateShow = async (id, fields) => {
  await base('Shows').update(
    [
      {
        id,
        fields,
      },
    ],
    { typecast: true }
  );
};

const updateMovie = async (id, fields) => {
  await base('Movies').update(
    [
      {
        id,
        fields,
      },
    ],
    { typecast: true }
  );
};

// Export functions
export { getShows, getMovies, updateShow, updateMovie };
