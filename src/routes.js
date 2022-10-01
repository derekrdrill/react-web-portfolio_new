import { App } from './components/App';

import { AboutMe } from './components/AboutMe/components/AboutMe';
import { ApplicationComplete } from './components/JobApplications/components/ApplicationComplete';
import { JobApplicationsPage } from './components/JobApplications/components/JobApplicationsPage';
import { Category } from './components/HousingMarketplace/components/Category';
import { ConnectWithMe } from './components/ConnectWithMe/components/ConnectWithMe';
import { CreateListing } from './components/HousingMarketplace/components/CreateListing';
import { DarkLightMode } from './components/DarkLightMode/components/DarkLightMode';
import { DataReportingTool } from './components/DataReportingTool/components/DataReportingTool';
import { Explore } from './components/HousingMarketplace/components/Explore';
import { Feedback } from './components/Feedback/Feedback';
import { FileUploader } from './components/FileUploader/FileUploader';
import { GithubFinder } from './components/GithubFinder/components/GithubFinder';
import { LeadInputPage } from './components/LeadInputForm/components/LeadInputPage';
import { LeadInputProvider } from './components/LeadInputForm/context/LeadInputContext';
import { ListingsProvider } from './components/HousingMarketplace/context/ListingsContext';
import { ListingInfo } from './components/HousingMarketplace/components/ListingInfo';
import { Navbar } from './components/HousingMarketplace/components/Navbar';
import { Offer } from './components/HousingMarketplace/components/Offer';
import { Profile } from './components/HousingMarketplace/components/Profile';
import { Projects } from './components/Projects/components/Projects';
import { Sandbox } from './components/Sandbox/Sandbox';
import { UserAuthenticationProvider } from './components/HousingMarketplace/context/UserAuthenticationContext';
import { UserLogin } from './components/HousingMarketplace/components/UserLogin';
import { UserPasswordReset } from './components/HousingMarketplace/components/UserPasswordReset';

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
    path: '/housing-marketplace/auth',
    render: (
      <UserAuthenticationProvider>
        <UserLogin />
      </UserAuthenticationProvider>
    ),
  },
  // {
  //   id: 14,
  //   path: '/housing-marketplace',
  //   render: (
  //     <UserAuthenticationProvider>
  //       <AlertProvider>
  //         <HousingMarketplace />
  //       </AlertProvider>
  //     </UserAuthenticationProvider>
  //   ),
  // },
  {
    id: 15,
    path: '/housing-marketplace/explore',
    render: (
      <UserAuthenticationProvider>
        <ListingsProvider>
          <Navbar>
            <Explore />
          </Navbar>
        </ListingsProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 16,
    path: '/housing-marketplace/offers',
    render: (
      <UserAuthenticationProvider>
        <ListingsProvider>
          <Navbar>
            <Offer />
          </Navbar>
        </ListingsProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 17,
    path: '/housing-marketplace/profile',
    render: (
      <UserAuthenticationProvider>
        <ListingsProvider>
          <Navbar>
            <Profile />
          </Navbar>
        </ListingsProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 18,
    path: '/housing-marketplace/create-listing',
    render: (
      <UserAuthenticationProvider>
        <ListingsProvider>
          <Navbar>
            <CreateListing />
          </Navbar>
        </ListingsProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 19,
    path: '/housing-marketplace/update-listing/:listingID',
    render: (
      <UserAuthenticationProvider>
        <ListingsProvider>
          <Navbar>
            <CreateListing />
          </Navbar>
        </ListingsProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 20,
    path: '/housing-marketplace/reset-password/:token',
    render: (
      <UserAuthenticationProvider>
        <UserPasswordReset />
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 21,
    path: '/housing-marketplace/category/:category',
    render: (
      <UserAuthenticationProvider>
        <ListingsProvider>
          <Navbar>
            <Category />
          </Navbar>
        </ListingsProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 22,
    path: '/housing-marketplace/listing/:listingID',
    render: (
      <UserAuthenticationProvider>
        <Navbar>
          <ListingInfo />
        </Navbar>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 23,
    path: '/file-uploader',
    render: <FileUploader />,
  },
  {
    id: 24,
    path: '/dark-light-mode',
    render: <DarkLightMode />,
  },
];
