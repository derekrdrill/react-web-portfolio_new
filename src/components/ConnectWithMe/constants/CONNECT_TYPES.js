import React from 'react';
import { faEnvelopeSquare } from '@fortawesome/fontawesome-free-solid';
import { faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const CONNECT_TYPES = [
  {
    id: 1,
    title: 'Email',
    icon: faEnvelopeSquare,
    href: 'mailto:derekrdrill@gmail.com',
    target: '',
    labelLeft: 'Email me',
  },
  {
    id: 2,
    title: 'LinkedIn',
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/derek-drill',
    target: '_blank',
    labelRight: 'Connect with my LinkedIn',
  },
  {
    id: 3,
    title: 'Github',
    icon: faGithubAlt,
    href: 'https://github.com/derekrdrill',
    target: '_blank',
    labelLeft: 'See this project on Github',
  },
];
