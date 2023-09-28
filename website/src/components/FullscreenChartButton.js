import React from 'react';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function FullScreenChartButton({ onClick }) {
    const iconStyle = {
        fontSize: '28px',
    };

    return (
        <div>
            <IconButton onClick={onClick}>
                <FullscreenIcon style={iconStyle} />
            </IconButton>
        </div>
    );
}

export default FullScreenChartButton;
