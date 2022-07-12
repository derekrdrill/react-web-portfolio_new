import React from 'react';
import styled from 'styled-components';
import { HeaderMenuOptions } from './HeaderMenuOptions';
import { HEADER_MENU_OPTIONS } from '../constants/HEADER_MENU_OPTIONS';

export const HeaderMenu = ({ headerType }) => (
  <HeaderMenuContainer>
    {HEADER_MENU_OPTIONS.map(OPTION => (
      <HeaderMenuOptions
        key={OPTION.id}
        menuTitle={OPTION.menuTitle}
        menuOptions={OPTION.menuOptions}
        menuIcon={OPTION.menuIcon}
        mainTo={OPTION.mainTo}
        secondaryTo={OPTION.secondaryTo}
        headerType={headerType}
      />
    ))}
  </HeaderMenuContainer>
);
export default HeaderMenu;

const HeaderMenuContainer = styled.div({
  margin: '0 auto',
});
