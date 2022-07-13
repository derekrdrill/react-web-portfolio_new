import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Menu, MenuItem, Divider, IconButton, Grid } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';

import { MoreOptionsModal } from './MoreOptionsModal';
import { FileQuickView } from '../../FileQuickView/FileQuickView';
import { LoaderSpinner } from '../../LoaderSpinner/LoaderSpinner';
import { DarkLightMode } from '../../DarkLightMode/components/DarkLightMode';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import resumePDF from '../../../assets/Resume_DRD.pdf';

const Option = props => {
  const { title, icon, href, target, divider, modal } = props.option;

  const menuItem = (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs={9}>
        {title}
      </Grid>
    </Grid>
  );

  return (
    <>
      <StyledMenuItem darkMode={props.darkMode} onClick={modal ? props.handleModalOpen : props.handleClose}>
        {href ? (
          <StyledMenuLink href={href} target={target}>
            {menuItem}
          </StyledMenuLink>
        ) : (
          menuItem
        )}
      </StyledMenuItem>
      {divider && <Divider />}
    </>
  );
};

export const MoreOptions = MoreOptionsProps => {
  const { darkMode } = useContext(DarkLightModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quickViewVisibility, setQuickViewVisibility] = useState(null);
  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);
  const openModal = Boolean(modalOpen);
  const openQuickView = Boolean(quickViewVisibility);

  const handleClose = () => setAnchorEl(null);
  const handleClick = event => setAnchorEl(event.currentTarget);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(null);

  const handleQuickViewOpen = () => {
    setLoading(true);
    setTimeout(() => {
      handleModalClose();
      setLoading(null);
      setQuickViewVisibility(true);
    }, 500);
  };

  const handleQuickViewClose = () => {
    handleModalClose();
    setQuickViewVisibility(null);
  };

  return (
    <MoreOptionsButtonContainer>
      <IconButton>
        <DarkLightMode />
      </IconButton>
      <IconButton onClick={handleClick}>
        <StyledIcon darkMode={darkMode} />
      </IconButton>
      <StyledMenu darkMode={darkMode} anchorEl={anchorEl} open={open} onClick={handleClose}>
        {MoreOptionsProps.moreOptions.map(option => (
          <Option
            darkMode={darkMode}
            key={option.id}
            option={option}
            handleClose={handleClose}
            handleModalOpen={handleModalOpen}
          />
        ))}
      </StyledMenu>
      <MoreOptionsModal open={openModal} handleModalClose={handleModalClose} quickViewOpen={handleQuickViewOpen} />
      <FileQuickView
        open={openQuickView}
        onClose={handleQuickViewClose}
        fileType='pdf'
        filePath={resumePDF}
        onlineLink='https://drive.google.com/file/d/1S1MgI2aJGHlXGDBgNwIKs_78_BsnskzV/view?usp=sharing'
      />
      <LoaderSpinner open={loading} />
    </MoreOptionsButtonContainer>
  );
};

const MoreOptionsButtonContainer = styled.div({
  marginRight: 20,
  display: 'inline-block',
});

const StyledMenu = styled(Menu)(({ darkMode }) => ({
  '.MuiPaper-root': {
    width: 150,
    backgroundColor: darkMode ? 'grey' : 'white',
    opacity: 0.7,
  },
}));

const StyledIcon = styled(MenuIcon)(({ darkMode }) => ({
  ':hover': {
    opacity: darkMode ? 0.4 : 1.0,
  },
  color: darkMode ? 'gainsboro' : 'gray',
}));

const StyledMenuLink = styled.a(({ darkMode }) => ({
  color: 'black',
  textDecoration: 'none',
  ':hover': {
    color: 'white',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ darkMode }) => ({
  ':hover': {
    backgroundColor: darkMode ? 'black' : 'slategrey',
    color: 'white',
    a: {
      color: 'white',
    },
  },
}));
