import React from 'react';
import styled from 'styled-components';
import { HeaderMenuOptions } from './HeaderMenuOptions';
import { HEADER_MENU_OPTIONS } from '../constants/HEADER_MENU_OPTIONS';
import { ListItem } from '@mui/material';

export const HeaderMenu = ({ headerType, menuType }) => (
  <HeaderMenuContainer>
    {menuType === 'list' ? (
      <>
        {HEADER_MENU_OPTIONS.map(OPTION => (
          <ListItem className='list-item' style={{ padding: 0, margin: 0 }}>
            <HeaderMenuOptions
              key={OPTION.id}
              menuTitle={OPTION.menuTitle}
              menuOptions={OPTION.menuOptions}
              menuIcon={OPTION.menuIcon}
              mainTo={OPTION.mainTo}
              secondaryTo={OPTION.secondaryTo}
              headerType={headerType}
              menuType={menuType}
            />
          </ListItem>
        ))}
      </>
    ) : (
      <>
        {HEADER_MENU_OPTIONS.map(OPTION => (
          <HeaderMenuOptions
            key={OPTION.id}
            menuTitle={OPTION.menuTitle}
            menuOptions={OPTION.menuOptions}
            menuIcon={OPTION.menuIcon}
            mainTo={OPTION.mainTo}
            secondaryTo={OPTION.secondaryTo}
            headerType={headerType}
            menuType={menuType}
          />
        ))}
      </>
    )}
  </HeaderMenuContainer>
);
export default HeaderMenu;

const HeaderMenuContainer = styled.div({
  margin: '0 auto',
});