import React from 'react';
import { Container, Typography } from '@mui/material';
import ChartComponent from './ChartComponent';

function App() {
  // Insérez vos données ici
  const data = [
    { "block_height": "17595510", "tier_name": "HERO", "value": 1676 },
    { "block_height": "17595510", "tier_name": "VETERAN", "value": 818 },
    { "block_height": "17595510", "tier_name": "LEGEND", "value": 283 },
    { "block_height": "17595510", "tier_name": "GOAT", "value": 352 },
    { "block_height": "17595510", "tier_name": "RESEARCHER", "value": 0 },
    { "block_height": "17595510", "tier_name": "EXPLORER", "value": 0 },
    { "block_height": "17595510", "tier_name": "ADVENTURER", "value": 0 },

    { "block_height": "17859346", "tier_name": "HERO", "value": 1728 },
    { "block_height": "17859346", "tier_name": "VETERAN", "value": 837 },
    { "block_height": "17859346", "tier_name": "LEGEND", "value": 285 },
    { "block_height": "17859346", "tier_name": "GOAT", "value": 358 },
    { "block_height": "17859346", "tier_name": "RESEARCHER", "value": 0 },
    { "block_height": "17859346", "tier_name": "EXPLORER", "value": 0 },
    { "block_height": "17859346", "tier_name": "ADVENTURER", "value": 0 },

    { "block_height": "17866488", "tier_name": "HERO", "value": 1641 },
    { "block_height": "17866488", "tier_name": "VETERAN", "value": 809 },
    { "block_height": "17866488", "tier_name": "LEGEND", "value": 285 },
    { "block_height": "17866488", "tier_name": "GOAT", "value": 358 },
    { "block_height": "17866488", "tier_name": "RESEARCHER", "value": 921 },
    { "block_height": "17866488", "tier_name": "EXPLORER", "value": 665 },
    { "block_height": "17866488", "tier_name": "ADVENTURER", "value": 1657 },

    { "block_height": "17873631", "tier_name": "HERO", "value": 1647 },
    { "block_height": "17873631", "tier_name": "VETERAN", "value": 808 },
    { "block_height": "17873631", "tier_name": "LEGEND", "value": 280 },
    { "block_height": "17873631", "tier_name": "GOAT", "value": 351 },
    { "block_height": "17873631", "tier_name": "RESEARCHER", "value": 926 },
    { "block_height": "17873631", "tier_name": "EXPLORER", "value": 671 },
    { "block_height": "17873631", "tier_name": "ADVENTURER", "value": 1661 },

    { "block_height": "17880777", "tier_name": "HERO", "value": 1655 },
    { "block_height": "17880777", "tier_name": "VETERAN", "value": 810 },
    { "block_height": "17880777", "tier_name": "LEGEND", "value": 283 },
    { "block_height": "17880777", "tier_name": "GOAT", "value": 351 },
    { "block_height": "17880777", "tier_name": "RESEARCHER", "value": 943 },
    { "block_height": "17880777", "tier_name": "EXPLORER", "value": 686 },
    { "block_height": "17880777", "tier_name": "ADVENTURER", "value": 1672 },

    { "block_height": "17887923", "tier_name": "HERO", "value": 1663 },
    { "block_height": "17887923", "tier_name": "VETERAN", "value": 813 },
    { "block_height": "17887923", "tier_name": "LEGEND", "value": 280 },
    { "block_height": "17887923", "tier_name": "GOAT", "value": 352 },
    { "block_height": "17887923", "tier_name": "RESEARCHER", "value": 964 },
    { "block_height": "17887923", "tier_name": "EXPLORER", "value": 701 },
    { "block_height": "17887923", "tier_name": "ADVENTURER", "value": 1678 },

    { "block_height": "17895071", "tier_name": "HERO", "value": 1671 },
    { "block_height": "17895071", "tier_name": "VETERAN", "value": 815 },
    { "block_height": "17895071", "tier_name": "LEGEND", "value": 283 },
    { "block_height": "17895071", "tier_name": "GOAT", "value": 350 },
    { "block_height": "17895071", "tier_name": "RESEARCHER", "value": 989 },
    { "block_height": "17895071", "tier_name": "EXPLORER", "value": 708 },
    { "block_height": "17895071", "tier_name": "ADVENTURER", "value": 1684 },

    { "block_height": "17902217", "tier_name": "HERO", "value": 1680 },
    { "block_height": "17902217", "tier_name": "VETERAN", "value": 816 },
    { "block_height": "17902217", "tier_name": "LEGEND", "value": 281 },
    { "block_height": "17902217", "tier_name": "GOAT", "value": 348 },
    { "block_height": "17902217", "tier_name": "RESEARCHER", "value": 1010 },
    { "block_height": "17902217", "tier_name": "EXPLORER", "value": 724 },
    { "block_height": "17902217", "tier_name": "ADVENTURER", "value": 1691 },

    { "block_height": "17909374", "tier_name": "HERO", "value": 1671 },
    { "block_height": "17909374", "tier_name": "VETERAN", "value": 817 },
    { "block_height": "17909374", "tier_name": "LEGEND", "value": 283 },
    { "block_height": "17909374", "tier_name": "GOAT", "value": 348 },
    { "block_height": "17909374", "tier_name": "RESEARCHER", "value": 1011 },
    { "block_height": "17909374", "tier_name": "EXPLORER", "value": 725 },
    { "block_height": "17909374", "tier_name": "ADVENTURER", "value": 1699 },

    { "block_height": "17916526", "tier_name": "HERO", "value": 1670 },
    { "block_height": "17916526", "tier_name": "VETERAN", "value": 816 },
    { "block_height": "17916526", "tier_name": "LEGEND", "value": 281 },
    { "block_height": "17916526", "tier_name": "GOAT", "value": 349 },
    { "block_height": "17916526", "tier_name": "RESEARCHER", "value": 1015 },
    { "block_height": "17916526", "tier_name": "EXPLORER", "value": 730 },
    { "block_height": "17916526", "tier_name": "ADVENTURER", "value": 1702 },

    { "block_height": "17923680", "tier_name": "HERO", "value": 1665 },
    { "block_height": "17923680", "tier_name": "VETERAN", "value": 812 },
    { "block_height": "17923680", "tier_name": "LEGEND", "value": 279 },
    { "block_height": "17923680", "tier_name": "GOAT", "value": 349 },
    { "block_height": "17923680", "tier_name": "RESEARCHER", "value": 1025 },
    { "block_height": "17923680", "tier_name": "EXPLORER", "value": 737 },
    { "block_height": "17923680", "tier_name": "ADVENTURER", "value": 1709 },

    { "block_height": "17930836", "tier_name": "HERO", "value": 1663 },
    { "block_height": "17930836", "tier_name": "VETERAN", "value": 810 },
    { "block_height": "17930836", "tier_name": "LEGEND", "value": 280 },
    { "block_height": "17930836", "tier_name": "GOAT", "value": 349 },
    { "block_height": "17930836", "tier_name": "RESEARCHER", "value": 1035 },
    { "block_height": "17930836", "tier_name": "EXPLORER", "value": 744 },
    { "block_height": "17930836", "tier_name": "ADVENTURER", "value": 1716 }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Plutus Chart
      </Typography>
      <ChartComponent data={data} />
    </Container>
  );
}

export default App;
