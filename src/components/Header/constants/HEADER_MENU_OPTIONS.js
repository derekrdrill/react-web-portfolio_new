import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PetsIcon from '@mui/icons-material/Pets';
import FaceIcon from '@mui/icons-material/Face';

export const HEADER_MENU_OPTIONS = [
  {
    id: 1,
    menuTitle: 'About Me',
    menuIcon: <FaceIcon />,
    mainTo: 'about-me',
    secondaryTo: '/about-me',
  },
  {
    id: 2,
    menuTitle: 'Projects',
    menuIcon: <AppsIcon />,
    mainTo: 'projects',
    secondaryTo: '/projects',
  },
  {
    id: 3,
    menuTitle: 'Connect With Me',
    menuIcon: <ConnectWithoutContactIcon />,
    mainTo: 'connect-with-me',
    secondaryTo: '/connect-with-me',
  },
  {
    id: 4,
    menuTitle: 'George',
    menuIcon: <PetsIcon />,
    mainTo: 'home',
    secondaryTo: '/',
  },
];
