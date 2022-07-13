import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { AppBar, Toolbar, Button, Tooltip, Typography } from '@mui/material';

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
      <LeadInputPageHeader>
        <Toolbar>
          <Container fluid>
            <Row>
              <ButtonContainer xs={12}>
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
            </Row>
          </Container>
        </Toolbar>
      </LeadInputPageHeader>
      <LeadInputPageContent>
        {page === 'form' && <LeadInputForm />}
        {page === 'table' && <LeadInputDataTable />}
      </LeadInputPageContent>
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

const LeadInputPageHeader = styled(AppBar)({
  top: 80,
  boxShadow: 'none',
  backgroundColor: 'inherit',
});

const LeadInputPageContent = styled.div({
  marginTop: '10%',
});

const ButtonContainer = styled(Col)({
  textAlign: 'right',
});
