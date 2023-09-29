import React from 'react';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

function FullScreenChartButton({ onClick }) {
    const iconStyle = {
        fontSize: '28px',
    };

    const buttonStyle = {
        position: 'absolute',
    };

    return (
        <div style={{ position: 'relative' }}>
            <IconButton onClick={onClick} style={buttonStyle}>
                <FullscreenIcon style={iconStyle} />
            </IconButton>
        </div>
    );
}

export default FullScreenChartButton;
