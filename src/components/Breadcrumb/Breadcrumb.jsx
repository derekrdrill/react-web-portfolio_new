import React from 'react';
import styled from 'styled-components';
import { Breadcrumbs, Typography } from '@mui/material';

export const Breadcrumb = ({
  breadcrumbs,
  breadcrumbClick,
  page,
  maxPage,
  separator,
  activePageColor,
  prevPagesColor,
  prevPagesHoverColor,
  nextPagesColor,
  endCrumb,
}) => {
  const breadcrumbsArr = breadcrumbs.map(breadcrumb => {
    return (
      <BreadcrumbText
        id={breadcrumb.id}
        key={breadcrumb.id}
        variant='caption'
        component='h1'
        page={page}
        onClick={breadcrumbClick || null}
        activepagecolor={activePageColor}
        prevpagescolor={prevPagesColor}
        prevpageshovercolor={prevPagesHoverColor}
        nextpagescolor={nextPagesColor}
      >
        {breadcrumb.title}
      </BreadcrumbText>
    );
  });

  return (
    <StyledBreadcrumbs separator={`\u00A0\u00A0\u00A0${separator || '/'}\u00A0\u00A0\u00A0`}>
      {breadcrumbsArr}
      {endCrumb && (
        <BreadcrumbText
          id={maxPage}
          variant='caption'
          component='h1'
          page={page}
          activepagecolor={activePageColor}
          prevpagescolor={prevPagesColor}
          prevpageshovercolor={prevPagesHoverColor}
          nextpagescolor={nextPagesColor}
        >
          {endCrumb}
        </BreadcrumbText>
      )}
    </StyledBreadcrumbs>
  );
};

export const BreadcrumbText = styled(Typography)(
  ({ id, page, activepagecolor, prevpagescolor, prevpageshovercolor, nextpagescolor }) => [
    id === page && {
      color: activepagecolor || '#900C3F',
      pointerEvents: 'none',
      textTransform: 'uppercase',
    },
    id < page && {
      color: prevpagescolor || '#191970',
      ':hover': {
        color: prevpageshovercolor || 'royalblue',
      },
    },
    id > page && {
      color: nextpagescolor || 'grey',
      pointerEvents: 'none',
    },
    {
      cursor: 'pointer',
    },
  ],
);

export const StyledBreadcrumbs = styled(Breadcrumbs)({
  backgroundColor: 'gainsboro',
});
