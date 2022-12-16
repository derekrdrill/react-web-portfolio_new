import React from 'react';

const App = React.lazy(() => import('./components/App'));

const AboutMe = React.lazy(() => import('./components/AboutMe/components/AboutMe'));
const ApplicationComplete = React.lazy(() => import('./components/JobApplications/components/Common/ApplicationComplete'));
const Category = React.lazy(() => import('./components/HousingMarketplace/components/Category'));
const Cocktail = React.lazy(()=> import('./components/Cocktail/components/Cocktail'));
const CocktailProvider = React.lazy(()=> import('./components/Cocktail/context/CocktailContext'));
const ConnectWithMe = React.lazy(() => import('./components/ConnectWithMe/components/ConnectWithMe'));
const CreateListing = React.lazy(() => import('./components/HousingMarketplace/components/CreateListing'));
const DarkLightMode = React.lazy(() => import('./components/DarkLightMode/components/DarkLightMode'));
const DataReportingTool = React.lazy(() => import('./components/DataReportingTool/components/DataReportingTool'));
const Explore = React.lazy(() => import('./components/HousingMarketplace/components/Explore'));
const Feedback = React.lazy(() => import('./components/Feedback/Feedback'));
const FileUploader = React.lazy(() => import('./components/FileUploader/FileUploader'));
const GithubFinder = React.lazy(() => import('./components/GithubFinder/components/GithubFinder'));
const GithubProvider = React.lazy(() => import('./components/GithubFinder/context/GithubContext'));
const JobApplicationsPage = React.lazy(() => import('./components/JobApplications/components/JobApplicationPage/JobApplicationsPage'));
const LeadInputPage = React.lazy(() => import('./components/LeadInputForm/components/LeadInputPage'));
const LeadInputProvider = React.lazy(() => import('./components/LeadInputForm/context/LeadInputContext'));
const ListingInfo = React.lazy(() => import('./components/HousingMarketplace/components/ListingInfo'));
const ListingsProvider = React.lazy(() => import('./components/HousingMarketplace/context/ListingsContext'));
const Navbar = React.lazy(() => import('./components/HousingMarketplace/components/Navbar'));
const Offer = React.lazy(() => import('./components/HousingMarketplace/components/Offer'));
const Profile = React.lazy(() => import('./components/HousingMarketplace/components/Profile'));
const Projects = React.lazy(() => import('./components/Projects/components/Projects'));
const Sandbox = React.lazy(() => import('./components/Sandbox/Sandbox'));
const UserAuthenticationProvider = React.lazy(() => import('./components/HousingMarketplace/context/UserAuthenticationContext'));
const UserLogin = React.lazy(() => import('./components/HousingMarketplace/components/UserLogin'));
const UserPasswordReset = React.lazy(() => import('./components/HousingMarketplace/components/UserPasswordReset'));

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
    render: <GithubProvider><GithubFinder /></GithubProvider>,
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
    {
    id: 25,
    path: '/drink-up',
    render: <CocktailProvider><Cocktail /></CocktailProvider>,
  },
];
