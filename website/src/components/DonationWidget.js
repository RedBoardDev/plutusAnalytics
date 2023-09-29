import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function DonateButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const buttonStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: 'transparent',
        border: '1px solid #ccc',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: '#333',
        borderRadius: '5px',
        transition: 'border-color 0.3s ease-in-out, right 0.3s ease-in-out',
        fontWeight: 'bold',
        fontSize: '14px',
        outline: 'none',
        padding: '6px 20px 6px 20px',
    };

    const svgStyle = {
        fill: 'none',
        stroke: '#ff69b4',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        width: '24px',
        height: '24px',
        marginRight: '5px',
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '400px',
        bgcolor: '#fff',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
        textAlign: 'center',
    };

    const donateTextStyle = {
        fontSize: '16px',
        color: '#555',
    };

    const donateInputStyle = {
        width: '100%',
        marginTop: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
    };

    const handleCopyClick = () => {
        const evmAddress = document.getElementById('evm-address');
        evmAddress.select();
        navigator.clipboard.writeText(evmAddress.value)
            .then(() => {
                alert('Adresse copiée dans le presse-papiers !');
            })
            .catch(err => {
                console.error('Erreur lors de la copie de l\'adresse :', err);
            });
    };

    return (
        <div>
            <button onClick={openModal} style={buttonStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" style={svgStyle}>
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                </svg>
                <span>Donate</span>
            </button>
            <Modal
                disableScrollLock
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                onEnter={() => {
                    const button = document.querySelector('.donate-button');
                    if (button) {
                        button.style.right = 'calc(10px + 400px)';
                    }
                }}
                onExit={() => {
                    const button = document.querySelector('.donate-button');
                    if (button) {
                        button.style.right = '10px';
                    }
                }}
            >
                <Box sx={modalStyle}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={closeModal}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <div className="modal-body text-center py-4">
                        <Typography variant="h5" component="h2" sx={{ mt: 2, fontWeight: 'bold', color: '#ff69b4' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" style={svgStyle}>
                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                            </svg>
                            Donation
                        </Typography>
                        <div style={donateTextStyle}>
                            <p>If you want to support me in the development and maintenance of this project, here is my address compatible with most blockchains:</p>
                        </div>
                        <TextField
                            id="evm-address"
                            style={donateInputStyle}
                            label="EVM"
                            variant="outlined"
                            defaultValue="-"
                            InputProps={{
                                readOnly: true,
                                onClick: handleCopyClick,
                                style: { cursor: 'pointer' },
                            }}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default DonateButton;
