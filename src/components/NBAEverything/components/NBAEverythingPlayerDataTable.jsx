import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';

import { NBAEverythingContext } from '../context/NBAEverythingContext';

import { DynamicDataTable } from '../../DynamicDataTable/components/DynamicDataTable';

const headers = [
  { headerID: 'player', headerName: 'Player', headerTooltip: 'Player' },
  { headerID: 'games_played', headerName: 'GP', headerTooltip: 'Games played' },
  { headerID: 'min', headerName: 'MIN', headerTooltip: 'Minutes played' },
  { headerID: 'pts', headerName: 'PPG', headerTooltip: 'Points per game' },
  { headerID: 'reb', headerName: 'RPG', headerTooltip: 'Rebounds per game' },
  { headerID: 'ast', headerName: 'APG', headerTooltip: 'Assists per game' },
  { headerID: 'stl', headerName: 'SPG', headerTooltip: 'Steals per game' },
  { headerID: 'blk', headerName: 'BPG', headerTooltip: 'Blocks per game' },
  { headerID: 'turnover', headerName: 'TOPG', headerTooltip: 'Turnovers per game' },
  { headerID: 'pf', headerName: 'FPG', headerTooltip: 'Fouls per game' },
];

const NBAEverythingPlayerDataTable = () => {
  let tableDataRows = [];

  const { selectedNBATeamPlayerStats } = React.useContext(NBAEverythingContext);

  selectedNBATeamPlayerStats.forEach(playerStat => {
    let statLine = {};

    headers.forEach(header => {
      let statData = null;
      const headerID = header.headerID;

      if (headerID === 'player') {
        statData = `${playerStat.last_name}, ${playerStat.first_name} ${
          playerStat.position && `(${playerStat.position})`
        }`;
      } else if (headerID === 'min') {
        const min1 = Number(playerStat.min.substring(0, playerStat.min.indexOf(':')));
        const min2 =
          Number(playerStat.min.substring(playerStat.min.length - 2, playerStat.min.length)) / 60;

        statData = Number((min1 + min2).toFixed(2));
      } else {
        statData = playerStat[headerID];
      }

      statLine[headerID] = statData;
    });

    tableDataRows = [...tableDataRows, ...[statLine]];
  });

  return (
    selectedNBATeamPlayerStats &&
    selectedNBATeamPlayerStats.length > 0 && (
      <NBAEverythingPlayerDataTableRootContainer container>
        <TeamStatsTitleGridItem item xs={10}>
          <Typography variant='h5'>Team stats</Typography>
        </TeamStatsTitleGridItem>
        <Grid item xs={12}>
          <DynamicDataTable
            checkAllColor='primary'
            checkOneColor='secondary'
            headers={headers}
            loadedDataRows={tableDataRows}
            size='small'
            tableBodyColorDark='gainsboro'
          />
        </Grid>
      </NBAEverythingPlayerDataTableRootContainer>
    )
  );
};

export default NBAEverythingPlayerDataTable;

export const NBAEverythingPlayerDataTableRootContainer = styled(Grid)({
  marginTop: 15,
});

export const TeamStatsTitleGridItem = styled(Grid)({
  paddingLeft: '5%',
});
