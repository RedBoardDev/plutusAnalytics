import { Box, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function CustomLegend({ activeTiers, setActiveTiers, tiersColors }) {

    const handleLegendClick = (tier) => {
        if (activeTiers.includes(tier)) {
            setActiveTiers(prev => prev.filter(t => t !== tier));
        } else {
            setActiveTiers(prev => [...prev, tier]);
        }
    };

    return (
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            {Object.keys(tiersColors).map(tier => (
                <Box key={tier} display="flex" alignItems="center">
                    <IconButton size="small" onClick={() => handleLegendClick(tier)}>
                        {activeTiers.includes(tier) ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </IconButton>
                    <Typography variant="body2" style={{ color: activeTiers.includes(tier) ? tiersColors[tier] : '#ccc' }}>
                        {tier}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

export default CustomLegend;
