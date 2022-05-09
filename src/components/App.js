import React from 'react';
import { Homepage } from './Homepage/Homepage';
import { Projects } from './Projects/components/Projects';
import { ConnectWithMe } from './ConnectWithMe/components/ConnectWithMe';
import { AboutMe } from './AboutMe/components/AboutMe';

export const App = () => (
  <div className='App'>
    <Homepage id='home' />
    <AboutMe id='about-me' />
    <Projects id='projects' />
    <ConnectWithMe id='connect-with-me' />
  </div>
);
