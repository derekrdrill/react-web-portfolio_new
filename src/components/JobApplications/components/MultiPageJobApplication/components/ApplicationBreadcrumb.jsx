import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import { Breadcrumb } from '../../../../Breadcrumb/Breadcrumb';

export const ApplicationBreadcrumb = ({
  breadcrumbs,
  breadcrumbClick,
  endCrumb,
  maxPage,
  page,
  separator,
}) =>
  page >= 1 &&
  page <= maxPage && (
    <Grid container display={{ xs: 'none', sm: 'block' }}>
      <Breadcrumb
        breadcrumbs={breadcrumbs}
        breadcrumbClick={breadcrumbClick}
        page={page}
        maxPage={maxPage}
        separator={separator}
        endCrumb={endCrumb}
      />
    </Grid>
  );

ApplicationBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.array,
  breadcrumbClick: PropTypes.func,
  endCrumb: PropTypes.string,
  maxPage: PropTypes.number,
  page: PropTypes.number,
  separator: PropTypes.string,
};
