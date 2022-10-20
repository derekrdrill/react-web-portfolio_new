import React from 'react';

const AboutMe = React.lazy(() => import('./AboutMe/components/AboutMe'));
const ConnectWithMe = React.lazy(() => import('./ConnectWithMe/components/ConnectWithMe'));
const Homepage = React.lazy(() => import('./Homepage/Homepage'));
const Projects = React.lazy(() => import('./Projects/components/Projects'));

const App = () => (
  <div className='App'>
    <Homepage id='home' />
    <AboutMe id='about-me' />
    <Projects id='projects' />
    <ConnectWithMe id='connect-with-me' />
  </div>
);

export default App;
