import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import { ApplicationBreadcrumb } from './components/ApplicationBreadcrumb';
import { ApplicationButtons } from './components/ApplicationButtons';
import { ApplicationContent } from './components/ApplicationContent';
import { ApplicationProgressBar } from './components/ApplicationProgressBar';

import { DarkLightModeContext } from '../../../DarkLightMode/context/DarkLightModeContext';

import { ADVANCED_JOB_APP_INPUTS } from '../../constants/ADVANCED_JOB_APP_INPUTS';

export const goForward = (maxPage, page, setPage, setProgress) => {
  let returnData;

  if (page < maxPage) {
    setPage(page + 1);
    setProgress(((page + 1) / maxPage) * 100);

    returnData = [page + 1, ((page + 1) / maxPage) * 100];
  } else {
    setPage(maxPage + 1);

    returnData = maxPage + 1;
  }

  return returnData;
};

export const goBackward = (maxPage, page, setPage, setProgress) => {
  setPage(page - 1);
  setProgress(((page - 1) / maxPage) * 100);

  return [page - 1, ((page - 1) / maxPage) * 100];
};

export const setPageByBreadcrumb = (e, maxPage, setPage, setProgress) => {
  let breadcrumbPage = Number(e.target.id);
  setPage(breadcrumbPage);
  setProgress((breadcrumbPage / maxPage) * 100);

  return [breadcrumbPage, (breadcrumbPage / maxPage) * 100];
};

export const toggleEditMode = (editMode, setEditMode) => {
  setEditMode(!editMode);
  return !editMode;
};

export const MultiPageJobApplication = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);

  const [editMode, setEditMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(0);
  const maxPage = 8;

  return (
    <div>
      <PageBodyStyle darkMode={darkMode} page={page} maxpage={maxPage} />
      <ApplicationProgressBar page={page} maxPage={maxPage} progress={progress} />
      <ApplicationBreadcrumb
        breadcrumbs={ADVANCED_JOB_APP_INPUTS}
        breadcrumbClick={e => setPageByBreadcrumb(e, maxPage, page, setPage, setProgress)}
        endCrumb={'Review'}
        maxPage={maxPage}
        page={page}
        separator={'|'}
      />
      <ApplicationButtons
        goBackward={() => goBackward(maxPage, page, setPage, setProgress)}
        goForward={() => goForward(maxPage, page, setPage, setProgress)}
        inputs={ADVANCED_JOB_APP_INPUTS}
        maxPage={maxPage}
        page={page}
      />
      <ApplicationContent
        inputs={ADVANCED_JOB_APP_INPUTS}
        page={page}
        maxPage={maxPage}
        goForward={() => goForward(maxPage, page, setPage, setProgress)}
        editMode={editMode}
        toggleEditMode={() => toggleEditMode(editMode, setEditMode)}
      />
    </div>
  );
};

export const PageBodyStyle = createGlobalStyle(({ darkMode, page }) => [
  page < 1 && {
    body: {
      backgroundImage: 'linear-gradient(to right, #851e38 , #e68fa4)',
    },
    'h1, h2, h3, h4, h5, h6': {
      color: 'beige',
    },
  },
  page >= 1 && {
    backgroundColor: darkMode ? 'black' : 'white',
  },
]);
