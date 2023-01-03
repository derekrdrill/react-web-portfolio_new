import {
  faFileAlt,
  faDatabase,
  faBuilding,
  faGlassMartini,
  faBasketballBall,
} from '@fortawesome/fontawesome-free-solid';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
// import nbaSVG from '../../../assets/nba2.svg';

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
    title: 'Lead Input App',
    description: `A simple input form that writes to a MongoDB.
                      Included is a dynamic reporting table to track the input data.`,
    icon: faDatabase,
    to: '/lead-input-page',
  },
  {
    id: 3,
    title: 'Github Finder Project',
    description: `A tool that pulls data from the Github API and cleanly presents it in a user-friendly React UI`,
    icon: faGithubSquare,
    to: '/github-finder',
  },
  {
    id: 4,
    title: 'Housing Marketplace',
    description: `An app that shows listings, current offers on listings and allows to create new listings. All data is pulled from a MongoDB via an Express backend.`,
    icon: faBuilding,
    to: '/housing-marketplace/auth',
  },
  {
    id: 5,
    title: 'Cocktail App',
    description: `Users can search by drink name or ingredients to return data on over 635 different cocktails! 🥂🍻`,
    icon: faGlassMartini,
    to: '/drink-up',
  },
  {
    id: 6,
    title: 'NBA Everything',
    description: `An all things NBA data, sourced from the Ball Don't Lie API`,
    icon: faBasketballBall,
    to: '/nba-everything',
  },
];
