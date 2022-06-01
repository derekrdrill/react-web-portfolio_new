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
import { UserAuthenticationProvider } from './components/HousingMarketplace/context/UserAuthenticationContext';
import { HousingMarketplace } from './components/HousingMarketplace/HousingMarketplace';
import { Navbar } from './components/HousingMarketplace/components/Navbar';
import { Explore } from './components/HousingMarketplace/components/Explore';
import { Offer } from './components/HousingMarketplace/components/Offer';
import { Profile } from './components/HousingMarketplace/components/Profile';
import { UserLogin } from './components/HousingMarketplace/components/UserLogin';
import { UserPasswordReset } from './components/HousingMarketplace/components/UserPasswordReset';
import { Category } from './components/HousingMarketplace/components/Category';
import { AlertProvider } from './components/Alert/context/AlertContext';
import { CreateListing } from './components/HousingMarketplace/components/CreateListing';
import { FileUploader } from './components/FileUploader/FileUploader';
import { ListingInfo } from './components/HousingMarketplace/components/ListingInfo';

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
        <AlertProvider>
          <UserLogin />
        </AlertProvider>
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
        <AlertProvider>
          <Navbar>
            <Explore />
          </Navbar>
        </AlertProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 16,
    path: '/housing-marketplace/offers',
    render: (
      <UserAuthenticationProvider>
        <AlertProvider>
          <Navbar>
            <Offer />
          </Navbar>
        </AlertProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 17,
    path: '/housing-marketplace/profile',
    render: (
      <UserAuthenticationProvider>
        <AlertProvider>
          <Navbar>
            <Profile />
          </Navbar>
        </AlertProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 18,
    path: '/housing-marketplace/create-listing',
    render: (
      <UserAuthenticationProvider>
        <AlertProvider>
          <Navbar>
            <CreateListing />
          </Navbar>
        </AlertProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 19,
    path: '/housing-marketplace/reset-password/:token',
    render: (
      <UserAuthenticationProvider>
        <AlertProvider>
          <UserPasswordReset />
        </AlertProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 20,
    path: '/housing-marketplace/category/:category',
    render: (
      <UserAuthenticationProvider>
        <AlertProvider>
          <Navbar>
            <Category />
          </Navbar>
        </AlertProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 21,
    path: '/housing-marketplace/listing/:listingID',
    render: (
      <UserAuthenticationProvider>
        <AlertProvider>
          <Navbar>
            <ListingInfo />
          </Navbar>
        </AlertProvider>
      </UserAuthenticationProvider>
    ),
  },
  {
    id: 22,
    path: '/file-uploader',
    render: <FileUploader />,
  },
];
