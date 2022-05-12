import { App } from './components/App';
import { ApplicationComplete } from './components/JobApplications/components/ApplicationComplete';
import { JobApplicationsPage } from './components/JobApplications/components/JobApplicationsPage';
import { Projects } from './components/Projects/components/Projects';
import { AboutMe } from './components/AboutMe/components/AboutMe';
import { ConnectWithMe } from './components/ConnectWithMe/components/ConnectWithMe';
import { LeadInputProvider } from './components/LeadInputForm/context/LeadInputContext';
import { LeadInputPage } from './components/LeadInputForm/components/LeadInputPage';
import { DataReportingTool } from './components/DataReportingTool/DataReportingTool';
import { Feedback } from './components/Feedback/Feedback';
import { GithubFinder } from './components/GithubFinder/components/GithubFinder';
import { Sandbox } from './components/Sandbox/Sandbox';
import { HousingMarketplace } from './components/HousingMarketplace/HousingMarketplace';

export const routes = [
  {
    id: 1,
    path: '/',
    render: <App />,
    exact: true,
  },
  {
    id: 2,
    path: '/job-apps-page',
    render: <JobApplicationsPage />,
  },
  {
    id: 3,
    path: '/projects',
    render: <Projects />,
  },
  {
    id: 4,
    path: '/about-me',
    render: <AboutMe />,
  },
  {
    id: 5,
    path: '/connect-with-me',
    render: <ConnectWithMe />,
  },
  {
    id: 6,
    path: '/job-apps-page',
    render: <JobApplicationsPage />,
  },
  {
    id: 7,
    path: '/app-complete',
    render: <ApplicationComplete />,
  },
  {
    id: 8,
    path: '/lead-input-page',
    render: (
      <LeadInputProvider>
        <LeadInputPage />,
      </LeadInputProvider>
    ),
  },
  {
    id: 9,
    path: '/data-reporting-tool',
    render: <DataReportingTool />,
  },
  {
    id: 10,
    path: '/feedback-app',
    render: <Feedback />,
  },
  {
    id: 11,
    path: '/github-finder',
    render: <GithubFinder />,
  },
  {
    id: 12,
    path: '/sandbox',
    render: <Sandbox />,
  },
  {
    id: 13,
    path: '/housing-marketplace',
    render: <HousingMarketplace />,
  },
];
