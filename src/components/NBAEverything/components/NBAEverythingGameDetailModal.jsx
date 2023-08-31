import React from 'react';
import styled from 'styled-components';
import { Grid, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid';

import { BasicModal as Modal } from '../../Modals/BasicModal';
import { DynamicDataTable } from '../../DynamicDataTable/components/DynamicDataTable';

import { NBAEverythingContext } from '../context/NBAEverythingContext';
import { DarkLightModeContext } from '../../DarkLightMode/context/DarkLightModeContext';

import { setScoreLogo } from '../context/NBAEverythingActions';

import { nbaEverythingGameDetailHeadersFull } from '../assets/data/nbaEverythingGameDetailHeadersFull';
import { nbaEverythingGameDetailHeadersShort } from '../assets/data/nbaEverythingGameDetailHeadersShort';

const NBAEverythingGameDetailModal = () => {
  const { darkMode } = React.useContext(DarkLightModeContext);
  const { logoType, selectedNBAGameDetailData } = React.useContext(NBAEverythingContext);

  const [isBoxScoreDataFull, setIsBoxScoreDataFull] = React.useState(false);

  const [isGameDetailModalOpen, setIsGameDetailModalOpen] = React.useState(
    selectedNBAGameDetailData.length > 0,
  );

  const [boxScoreData, setBoxScoreData] = React.useState({
    home: selectedNBAGameDetailData[0]?.boxScoreData,
    visitor: selectedNBAGameDetailData[1]?.boxScoreData,
  });

  const [boxScoreDataShort, setBoxScoreDataShort] = React.useState({
    home: selectedNBAGameDetailData[0]?.boxScoreDataShort,
    visitor: selectedNBAGameDetailData[1]?.boxScoreDataShort,
  });

  const [gameDetailSelectedTeam, setGameDetailSelectedTeam] = React.useState('visitor');

  const [selectedBoxScoreData, setSelectedBoxScoreData] = React.useState(boxScoreDataShort);

  console.log(selectedNBAGameDetailData);

  React.useEffect(() => {
    setSelectedBoxScoreData(isBoxScoreDataFull ? boxScoreData : boxScoreDataShort);
  }, [isBoxScoreDataFull, boxScoreData, boxScoreDataShort]);

  React.useEffect(() => {
    setIsGameDetailModalOpen(selectedNBAGameDetailData.length > 0);

    setBoxScoreData({
      home: selectedNBAGameDetailData[0]?.boxScoreData,
      visitor: selectedNBAGameDetailData[1]?.boxScoreData,
    });

    setBoxScoreDataShort({
      home: selectedNBAGameDetailData[0]?.boxScoreDataShort,
      visitor: selectedNBAGameDetailData[1]?.boxScoreDataShort,
    });
  }, [selectedNBAGameDetailData]);

  const handleNbaEverythingModalClose = (setIsGameDetailModalOpen, setIsBoxScoreDataFull) => {
    setIsGameDetailModalOpen(false);
    setIsBoxScoreDataFull(false);
    setGameDetailSelectedTeam('visitor');
  };

  const handleNbaEverythingBoxScoreToggle = (isBoxScoreDataFull, setIsBoxScoreDataFull) => {
    setIsBoxScoreDataFull(!isBoxScoreDataFull);
  };

  const handleNbaEverythingSelectedDetailTeam = (e, setGameDetailSelectedTeam) => {
    setGameDetailSelectedTeam(e.target.value);
  };

  return (
    <Modal
      handleClose={() =>
        handleNbaEverythingModalClose(setIsGameDetailModalOpen, setIsBoxScoreDataFull)
      }
      isActionButtonsHidden
      marginLeftXS={'3vw'}
      marginLeftSM={'12vw'}
      marginLeftMD={'20vw'}
      marginRightXS={'3vw'}
      marginRightSM={'12vw'}
      marginRightMD={'20vw'}
      marginTop={8}
      open={isGameDetailModalOpen}
    >
      {isGameDetailModalOpen && (
        <Grid container>
          <Grid item xs={1} display={{ xs: 'none', md: 'inline-block' }} />
          <Grid item xs={4} md={2}>
            <NBAEverythingGameDetailLogo
              src={setScoreLogo('', selectedNBAGameDetailData[1].fullName, null, null, logoType)}
            />
            <Grid container display={{ xs: 'none', md: 'inline-block' }}>
              <Typography variant='subtitle1'>{selectedNBAGameDetailData[1].abbrName}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={1} display={{ xs: 'none', md: 'inline-block' }} />
          <Grid item xs={2} md={1}>
            <Typography
              color={
                selectedNBAGameDetailData[1].score > selectedNBAGameDetailData[0].score
                  ? 'black'
                  : darkMode
                  ? '#363636 !important'
                  : '#737373 !important'
              }
              darkMode={darkMode}
              fontWeight={
                selectedNBAGameDetailData[1].score > selectedNBAGameDetailData[0].score && 'bold'
              }
              variant='h5'
            >
              {selectedNBAGameDetailData[1].score}
            </Typography>
          </Grid>
          <Grid item xs={2} display={{ xs: 'none', md: 'inline-flex' }}>
            <Grid container>
              <Grid item xs={1} md={2} lg={1} />
              <Grid item xs={2} display={{ xs: 'none', lg: 'inline-flex' }}>
                {selectedNBAGameDetailData[1].score > selectedNBAGameDetailData[0].score && (
                  <NBAEverythingFinalArrowIcon color='black' icon={faArrowLeft} />
                )}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={4} md={6} lg={4}>
                <Typography
                  fontWeight='bold'
                  textAlign='center'
                  variant='subtitle1'
                >{`Final`}</Typography>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2} display={{ xs: 'none', lg: 'inline-flex' }}>
                {selectedNBAGameDetailData[1].score < selectedNBAGameDetailData[0].score && (
                  <NBAEverythingFinalArrowIcon color='black' icon={faArrowRight} />
                )}
              </Grid>
              <Grid item xs={1} md={2} lg={1} />
            </Grid>
          </Grid>
          <Grid item xs={2} md={1}>
            <Typography
              color={
                selectedNBAGameDetailData[1].score < selectedNBAGameDetailData[0].score
                  ? 'black'
                  : darkMode
                  ? '#363636 !important'
                  : '#737373 !important'
              }
              darkMode={darkMode}
              fontWeight={
                selectedNBAGameDetailData[1].score < selectedNBAGameDetailData[0].score && 'bold'
              }
              textAlign='right'
              variant='h5'
            >
              {selectedNBAGameDetailData[0].score}
            </Typography>
          </Grid>
          <Grid item xs={1} display={{ xs: 'none', md: 'inline-block' }} />
          <Grid item xs={4} md={2}>
            <Grid container justifyContent='flex-end'>
              <NBAEverythingGameDetailLogo
                src={setScoreLogo('', selectedNBAGameDetailData[0].fullName, null, null, logoType)}
              />
            </Grid>
            <Grid container display={{ xs: 'none', md: 'inline-block' }}>
              <Typography variant='subtitle1' textAlign='right'>
                {selectedNBAGameDetailData[0].abbrName}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display={{ sm: 'inline-block', md: 'none' }}>
            <Grid container justifyContent='center'>
              <ToggleButtonGroup
                color='standard'
                exclusive
                onChange={e => handleNbaEverythingSelectedDetailTeam(e, setGameDetailSelectedTeam)}
                size='small'
                value={gameDetailSelectedTeam}
              >
                <ToggleButton value='visitor'>{selectedNBAGameDetailData[1].abbrName}</ToggleButton>
                <ToggleButton value='home'>{selectedNBAGameDetailData[0].abbrName}</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={1} display={{ xs: 'none', md: 'inline-block' }} />
          <NBAEverythingDetailStatsContainer item xs={12}>
            <Typography textAlign='center' variant='h6'>
              Stat leaders
            </Typography>
            <Grid container justifyContent='space-around' rowSpacing={2}>
              <Grid item xs={2} md={1} display={{ xs: 'none', md: 'inline-block' }} />
              <Grid item xs={3} md={4} display={{ xs: 'none', md: 'inline-block' }}>
                {selectedNBAGameDetailData[1].statLeaders.map(stat => (
                  <Grid key={`home-${stat.type}`} container justifyContent='flex-start'>
                    <Typography variant='subtitle2'>
                      {`${stat.total} ${
                        stat.type === 'turnover' ? 'TO' : stat.type.toUpperCase()
                      } - ${stat.player.first_name.substring(0, 1)}.  ${stat.player.last_name}`}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={1} md={2} display={{ xs: 'none', md: 'inline-block' }} />
              <Grid item xs={3} md={4} display={{ xs: 'none', md: 'inline-block' }}>
                {selectedNBAGameDetailData[0].statLeaders.map(stat => (
                  <Grid key={`visitor-${stat.type}`} container justifyContent='flex-end'>
                    <Typography variant='subtitle2'>
                      {`${stat.player.first_name.substring(0, 1)}. ${stat.player.last_name} -  ${
                        stat.total
                      } ${stat.type === 'turnover' ? 'TO' : stat.type.toUpperCase()}`}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={2} sm={1} display={{ xs: 'none', md: 'inline-block' }} />
              <Grid item xs={12} display={{ xs: 'inline-block', md: 'none' }}>
                {selectedNBAGameDetailData[
                  gameDetailSelectedTeam === 'home' ? 0 : 1
                ].statLeaders.map(stat => (
                  <Grid key={`visitor-${stat.type}`} container justifyContent='center'>
                    <Typography variant='subtitle2'>
                      {`${stat.player.first_name.substring(0, 1)}. ${stat.player.last_name} -  ${
                        stat.total
                      } ${stat.type === 'turnover' ? 'TO' : stat.type.toUpperCase()}`}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <NBAEverythingDetailBoxScoreContainer container>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Grid container justifyContent='center'>
                  <Typography variant='h6'>Box score</Typography>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container justifyContent='flex-end'>
                  <Typography variant='subtitle2' fontWeight='bold'>
                    Full box score
                  </Typography>
                  <Switch
                    onChange={() =>
                      handleNbaEverythingBoxScoreToggle(isBoxScoreDataFull, setIsBoxScoreDataFull)
                    }
                    size='small'
                  />
                </Grid>
              </Grid>
            </NBAEverythingDetailBoxScoreContainer>
            <Grid container>
              <Grid item xs={6} display={{ xs: 'none', md: 'inline-block' }}>
                <DynamicDataTable
                  checkAllColor='primary'
                  checkOneColor='secondary'
                  headers={
                    isBoxScoreDataFull
                      ? nbaEverythingGameDetailHeadersFull
                      : nbaEverythingGameDetailHeadersShort
                  }
                  loadedDataRows={selectedBoxScoreData.visitor}
                  size='small'
                />
              </Grid>
              <Grid item xs={6} display={{ xs: 'none', md: 'inline-block' }}>
                <DynamicDataTable
                  checkAllColor='primary'
                  checkOneColor='secondary'
                  headers={
                    isBoxScoreDataFull
                      ? nbaEverythingGameDetailHeadersFull
                      : nbaEverythingGameDetailHeadersShort
                  }
                  loadedDataRows={selectedBoxScoreData.home}
                  size='small'
                />
              </Grid>
              <Grid item xs={12} display={{ xs: 'inline-block', sm: 'inline-block', md: 'none' }}>
                <DynamicDataTable
                  checkAllColor='primary'
                  checkOneColor='secondary'
                  headers={
                    isBoxScoreDataFull
                      ? nbaEverythingGameDetailHeadersFull
                      : nbaEverythingGameDetailHeadersShort
                  }
                  loadedDataRows={
                    gameDetailSelectedTeam === 'home'
                      ? selectedBoxScoreData.home
                      : selectedBoxScoreData.visitor
                  }
                  size='small'
                />
              </Grid>
            </Grid>
          </NBAEverythingDetailStatsContainer>
        </Grid>
      )}
    </Modal>
  );
};

export default NBAEverythingGameDetailModal;

export const NBAEverythingGameDetailLogo = styled.img({
  height: 65,
  minWidth: 52,
});

export const NBAEverythingFinalArrowIcon = styled(FontAwesomeIcon)({
  padding: 6,
});

export const NBAEverythingDetailStatsContainer = styled(Grid)({
  maxHeight: 400,
  overflowY: 'auto',
});

export const NBAEverythingDetailBoxScoreContainer = styled(Grid)({
  margin: '25px 0 20px 0',
});
