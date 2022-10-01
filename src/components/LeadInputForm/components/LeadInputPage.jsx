import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Button, Grid, Tooltip, Typography } from '@mui/material';

import { LeadInputForm } from './LeadInputForm';
import { LeadInputDataTable } from './LeadInputDataTable';

import { LeadInputContext } from '../context/LeadInputContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

export const LeadInputPage = () => {
  const { darkMode } = useContext(DarkLightModeContext);
  const { leadInputDispatch, page, tooltipOpen } = useContext(LeadInputContext);

  const handlePageButtonClick = () => {
    const newPage = page === 'form' ? 'table' : 'form';
    leadInputDispatch({ type: 'SWITCH_PAGES', payload: { page: newPage, tooltipOpen: false } });
  };

  const handleTooltipToggle = () => leadInputDispatch({ type: 'TOGGLE_TOOLTIP', payload: !tooltipOpen });

  return (
    <>
      <PageBodyStyle darkMode={darkMode} />
      <Grid container>
        <ButtonContainer item xs={12}>
          <Tooltip
            open={tooltipOpen}
            onClose={handleTooltipToggle}
            onOpen={page === 'form' && handleTooltipToggle}
            title={
              <Typography variant='subtitle2' component='p'>
                This would likely be an admin button in a real-life scenario
              </Typography>
            }
          >
            <Button onClick={handlePageButtonClick}>
              {page === 'form' ? 'See all records' : 'Go back to input form'}
            </Button>
          </Tooltip>
        </ButtonContainer>
      </Grid>
      <Grid container style={{ paddingTop: 75 }}>
        {page === 'form' && <LeadInputForm />}
        {page === 'table' && <LeadInputDataTable />}
      </Grid>
    </>
  );
};

const PageBodyStyle = createGlobalStyle(({ darkMode }) => ({
  body: {
    backgroundColor: darkMode ? '#303030' : '#f2e9de',
  },
  'h1, h2, h3, h4, h5, h6': {
    color: darkMode ? 'grey' : 'inherit',
  },
}));

const ButtonContainer = styled(Grid)({
  textAlign: 'right',
});
