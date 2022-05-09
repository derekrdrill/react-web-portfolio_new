import FontAwesomeIcon from '@fortawesome/fontawesome';
import { faFileAlt, faTable, faSpaceShuttle, faDatabase } from '@fortawesome/fontawesome-free-solid';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

export const PROJECTS = [
  {
    id: 1,
    title: 'Job Applications',
    description: `A simple concept used to show different levels of web-form building with React`,
    icon: faFileAlt,
    to: '/job-apps-page',
  },
  {
    id: 2,
    title: 'Data Sorter',
    description: `A dynamic reporting tool that will accept an uploaded excel or csv file to 
                      parse over and re-report that data in a dynamic, user-friendly manner`,
    icon: faTable,
    to: '/data-reporting-tool',
  },
  // {
  //     id: 3,
  //     title: 'Spotify API Project',
  //     description: `A dynamic reporting tool that will accept an uploaded excel or csv file to
  //                   parse over and re-report that data in a dynamic, user-friendly manner`,
  //     icon: faSpotify,
  //     to: '/',
  // },
  {
    id: 3,
    title: 'Lead Input Form/Report',
    description: `A simple input form that reads from and writes to a MongoDB. 
                      Included is a dynamic reporting table to track the input data.`,
    icon: faDatabase,
    to: '/lead-input-page',
  },
  {
    id: 4,
    title: 'NASA API Project',
    description: `A dynamic reporting tool that will accept an uploaded excel or csv file to 
                      parse over and re-report that data in a dynamic, user-friendly manner`,
    icon: faSpaceShuttle,
    to: '/',
  },
];
