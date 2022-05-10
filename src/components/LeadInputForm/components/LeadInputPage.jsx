import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { AppBar, Toolbar, Button, Tooltip, Typography } from '@mui/material';
import { LeadInputContext } from '../context/LeadInputContext';
import { LeadInputForm } from './LeadInputForm';
import { LeadInputDataTable } from './LeadInputDataTable';

export const LeadInputPage = () => {
  const { leadInputDispatch, page, tooltipOpen } = useContext(LeadInputContext);

  const handlePageButtonClick = () => {
    const newPage = page === 'form' ? 'table' : 'form';
    leadInputDispatch({ type: 'SWITCH_PAGES', payload: { page: newPage, tooltipOpen: false } });
  };

  const handleTooltipToggle = () => leadInputDispatch({ type: 'TOGGLE_TOOLTIP', payload: !tooltipOpen });

  return (
    <>
      <PageBodyStyle />
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

const PageBodyStyle = createGlobalStyle({
  body: {
    backgroundColor: 'tan',
  },
});

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
