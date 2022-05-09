import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faFile, faCode } from '@fortawesome/fontawesome-free-solid';
import { faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const MORE_OPTIONS = [
  {
    id: 1,
    title: 'Email',
    icon: <FontAwesomeIcon icon={faEnvelopeSquare} />,
    href: 'mailto:derekrdrill@gmail.com',
    target: '',
  },
  {
    id: 2,
    title: 'LinkedIn',
    icon: <FontAwesomeIcon icon={faLinkedin} />,
    href: 'https://www.linkedin.com/in/derek-drill',
    target: '_blank',
  },
  {
    id: 3,
    title: 'Github',
    icon: <FontAwesomeIcon icon={faGithubAlt} />,
    href: 'https://github.com/derekrdrill',
    target: '_blank',
    divider: true,
  },
  {
    id: 4,
    title: 'Resume',
    icon: <FontAwesomeIcon icon={faFile} />,
    target: '',
    href: '',
    modal: {
      modalTitle: 'Select one',
      modalDescription: 'Would you like to download a copy or be sent to the Google doc?',
      modalButton1: 'Download .DOCX',
      modalButton2: 'Go to Google Doc',
      modalCloseButton: 'Cancel',
    },
  },
  {
    id: 5,
    title: 'Source Code',
    icon: <FontAwesomeIcon icon={faCode} />,
    target: '',
    href: '',
  },
];
