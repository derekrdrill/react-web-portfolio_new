import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HeaderMenuOptions } from './HeaderMenuOptions';
import { HEADER_MENU_OPTIONS } from '../constants/HEADER_MENU_OPTIONS';
import { ListItem } from '@mui/material';

export const HeaderMenu = ({ headerType, menuType }) => (
  <HeaderMenuContainer>
    {menuType === 'list' ? (
      <>
        {HEADER_MENU_OPTIONS.map(menuOption => (
          <HeaderListItem key={menuOption.id} className='list-item'>
            <HeaderMenuOptions
              menuTitle={menuOption.menuTitle}
              menuOptions={menuOption.menuOptions}
              menuIcon={menuOption.menuIcon}
              mainTo={menuOption.mainTo}
              secondaryTo={menuOption.secondaryTo}
              headerType={headerType}
              menuType={menuType}
            />
          </HeaderListItem>
        ))}
      </>
    ) : (
      <>
        {HEADER_MENU_OPTIONS.map(menuOption => (
          <HeaderMenuOptions
            key={menuOption.id}
            menuTitle={menuOption.menuTitle}
            menuOptions={menuOption.menuOptions}
            menuIcon={menuOption.menuIcon}
            mainTo={menuOption.mainTo}
            secondaryTo={menuOption.secondaryTo}
            headerType={headerType}
            menuType={menuType}
          />
        ))}
      </>
    )}
  </HeaderMenuContainer>
);

HeaderMenu.propTypes = {
  headerType: PropTypes.string,
  menuType: PropTypes.string,
};

export const HeaderMenuContainer = styled.div({
  margin: '0 auto',
});

export const HeaderListItem = styled(ListItem)({
  padding: 0,
  margin: 0,
});