# Derek Drill's React web portfolio

This is the repository for the front end source code for my web portfolio.

This app is heavily dependent on React JS, while also relying on the following libraries and technologies to enhace code quality, the overall UI and the development lifecycle:

  * Material UI
  * Styled Components
  * Font Awesome
  * Axios
  * Prettier
  * ES Lint
  * Jest
  * Enzyme
  * Vercel
  * Yarn

This application is currently comprised of 27 total components that are thoughtfully created to handle the many states a user may experience within the app. React Context is utilized to handle the global state of this app.

<br />

## Access

### Website

To see this app, navigate to <a href='https://derekdrill.com' target='_blank'>derekdrill.com</a>

### Running locally
If you would like to run this repository locally, it can be cloned, but be sure to run ```yarn install``` before running ```yarn start```

* You will need the backend to be running locally for some functionality, which is detailed below

<br />


## Features

Here is the breakdown of completed and pending features:

### Completed
<ul>
  <li>
    Homepage
    <ul>
      <li>
        With navigation to things like About Me, Projects, a 'Let's Connect' page and several functionalities to access my Resume, LinkedIn and GitHub
      </li> 
    </ul>
  </li>
  <li>
    Job Applications
    <ul>
      <li>
        A basic, advanced and multi-page job applications to display skills in building React components
      </li> 
      <li>
        This feature only displays the ability to build simple, but effective React apps
      </li> 
    </ul>
  </li>
  <li>
    Resume quick view
    <ul>
      <li>
        A dynamic file viewer component that allows the user to view my resume right in this application, with the options to also download a copy or navigate to the Google Doc
      </li> 
    </ul>
  </li>
  <li>
    Lead Input form
    <ul>
      <li>
        A simple web-form that allows users to enter their information, as if they were looking to store the data and retain leads
      </li> 
      <li>
        This lead data is stored in a MongoDB collection, and a reporting table tool is included to dynamically report, update and delete the lead data 
      </li>
    </ul>
  </li>
  <li>
    Github Finder Project
    <ul>
      <li>
        A tool that pulls data from the Github API and cleanly presents it in a user-friendly UI
      </li> 
    </ul>
  </li>
  <li>
    Housing marketplace app
    <ul>
      <li>
        An app that allows users to see current listings, current offers on listings and create new listings
        This app pulls all data from a MongoDB via an Express backend
      </li> 
    </ul>
  </li>
  <li>
    Cocktail app
    <ul>
      <li>
        An app that retrieves data from <a href='https://rapidapi.com/thecocktaildb/api/the-cocktail-db/' target='_blank'>The Cocktail DB API<a/>, and presents it in a clean, simple manner for an easy user experience. Users can search by drink names, glass type or upt to 3 ingredients to quickly find awesome drink options!
      </li> 
    </ul>
  </li>
  <li>
    Dark/Light mode
    <ul>
      <li>
        A global functionality that toggles the entire app between light and dark mode at a click
      </li> 
    </ul>
  </li>
</ul>
  
### Pending
<ul>
<li>
    NBA Everything
    <ul>
      <li>
        An app that will display current and historical data of the NBA, in a dynamic reporting data table with simple and advanced filtering capabilities
      </li> 
      <li>
        The <a href='https://www.balldontlie.io/#introduction' target='_blank'>Ball Don't Lie API</a> is leveraged for all data
      </li> 
      <li>
        Status: <em>In Progress</em>
      </li> 
    </ul>
  </li>
  <li>
    Data Reporting Tool
    <ul>
      <li>
        A tool that will allow a user to upload an excel or csv file, or pull data directly from a current database, to then report this data in a tool that allows
        for functionality such as sorting, filtering, downloading, or even updating or deleting data from this tool.
      </li> 
      <li>
        Status: <em>In Progress</em>
      </li> 
    </ul>
  </li>
  <li>
    The George App
    <ul>
      <li>
        An app that holds tons of content of the cutest dog you've ever seen in your life. A user-friendly experience will allow for the viewing of George
        photos and videos, as well as sharing and downloading desired content. A link to George's Instagram will be easily accesible.
      </li> 
      <li>
        Status: <em>Not Started</em>
      </li> 
    </ul>
  </li>
</ul>

While the above breakdown of these projects is very simple and to-the-point, there are several dynamic, powerful components that needed to be developed
to support the overall functionality and enhance the UX of these
features. Some of these components include:

  * Modals
  * Spinner loaders
  * Progress bars
  * Breadcrumbs
  * Dynamic header to handle all navigation about the app
  * Dynamic form input generator
  * Dynamic data table
  * Dynamic list (allows users to add and delete options to a visual list)


<br />

## Testing

Jest, Enzyme and the React testing library are all utilized to unit this application. The goal will be to maintain a coverage threshold above 85%. Currently, the overall threshold is a little below 50%, and the initiative to improve this is currently in progress.

<br />

## Backend

This application relies on an Express backend to handle any heavy lifting. This backend points to a MongoDB to handle any data manipulation that can occur within this app. <a href='https://github.com/derekrdrill/react-web-portfolio-backend' target='_blank'>Click here</a> to navigate to the backend repository.

