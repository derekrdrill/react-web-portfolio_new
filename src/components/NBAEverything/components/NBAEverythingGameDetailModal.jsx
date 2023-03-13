import React from 'react';
import styled from 'styled-components';
import { Grid, Switch, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid';

import { BasicModal } from '../../Modals/BasicModal';
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

  const [selectedBoxScoreData, setSelectedBoxScoreData] = React.useState(boxScoreDataShort);

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
  };

  const handleNbaEverythingBoxScoreToggle = (isBoxScoreDataFull, setIsBoxScoreDataFull) => {
    setIsBoxScoreDataFull(!isBoxScoreDataFull);
  };

  return (
    <BasicModal
      handleClose={() =>
        handleNbaEverythingModalClose(setIsGameDetailModalOpen, setIsBoxScoreDataFull)
      }
      isActionButtonsHidden
      marginLeft={'15%'}
      marginRight={'15%'}
      marginTop={75}
      open={isGameDetailModalOpen}
    >
      {isGameDetailModalOpen && (
        <Grid container>
          <Grid item xs={12}>
            <Grid container justifyContent='space-around'>
              <Grid item>
                <NBAEverythingGameDetailLogo
                  src={setScoreLogo(
                    '',
                    selectedNBAGameDetailData[1].fullName,
                    null,
                    null,
                    logoType,
                  )}
                />
                <Grid container justifyContent='center'>
                  <Typography variant='subtitle1'>
                    {selectedNBAGameDetailData[1].abbrName}
                  </Typography>
                </Grid>
              </Grid>
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
              <Grid item display={{ xs: 'none', md: 'inline-block' }}>
                <Grid container justifyContent='space-around'>
                  {selectedNBAGameDetailData[1].score > selectedNBAGameDetailData[0].score && (
                    <NBAEverythingFinalArrowIcon color='black' icon={faArrowLeft} />
                  )}
                  <Typography fontWeight='bold' variant='subtitle1'>{`Final`}</Typography>
                  {selectedNBAGameDetailData[1].score < selectedNBAGameDetailData[0].score && (
                    <NBAEverythingFinalArrowIcon color='black' icon={faArrowRight} />
                  )}
                </Grid>
              </Grid>
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
                variant='h5'
              >
                {selectedNBAGameDetailData[0].score}
              </Typography>
              <Grid item>
                <NBAEverythingGameDetailLogo
                  src={setScoreLogo(
                    '',
                    selectedNBAGameDetailData[0].fullName,
                    null,
                    null,
                    logoType,
                  )}
                />
                <Grid container justifyContent='center'>
                  <Typography variant='subtitle1'>
                    {selectedNBAGameDetailData[0].abbrName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <NBAEverythingDetailStatsContainer item xs={12}>
            <Grid container justifyContent='center'>
              <Typography variant='h6'>Stat leaders</Typography>
            </Grid>
            <Grid container justifyContent='space-around' rowSpacing={2}>
              <Grid item xs={1} />
              <Grid item xs={4}>
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
              <Grid item xs={2} />
              <Grid item xs={4}>
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
              <Grid item xs={1} />
            </Grid>
            <NBAEverythingDetailBoxScoreContainer container>
              <Grid item xs={5} />
              <Grid item xs={5}>
                <Typography variant='h6'>Box score</Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container>
                  <Typography variant='subtitle2' fontWeight='bold'>
                    Full box score
                  </Typography>
                  <Switch
                    size='small'
                    onChange={() =>
                      handleNbaEverythingBoxScoreToggle(isBoxScoreDataFull, setIsBoxScoreDataFull)
                    }
                  />
                </Grid>
              </Grid>
            </NBAEverythingDetailBoxScoreContainer>
            <Grid container>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
            </Grid>
          </NBAEverythingDetailStatsContainer>
        </Grid>
      )}
    </BasicModal>
  );
};

export default NBAEverythingGameDetailModal;

export const NBAEverythingGameDetailLogo = styled.img({
  height: 75,
  minWidth: 60,
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
