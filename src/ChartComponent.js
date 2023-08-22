import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Box, Paper } from '@mui/material';
import CustomLegend from './CustomLegend';

function ChartComponent({ data, visiblePoints }) {
    const [activeTiers, setActiveTiers] = useState([
        "HERO", "VETERAN", "LEGEND", "GOAT", "RESEARCHER", "EXPLORER", "ADVENTURER"
    ]);

    const [startIndex, setStartIndex] = useState(17 - 14);

    const [isDragging, setIsDragging] = useState(false);
    const [lastDragX, setLastDragX] = useState(null);

    const handleWheel = (event) => {
        const moveAmount = event.deltaX;
        if (moveAmount > 0) {
            if (startIndex + visiblePoints < data.length) {
                setStartIndex(prevIndex => prevIndex + 1);
            }
        } else {
            if (startIndex > 0) {
                setStartIndex(prevIndex => prevIndex - 1);
            }
        }
    }

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setLastDragX(event.clientX);
    }

    const handleMouseMove = (event) => {
        if (isDragging) {
            const deltaX = lastDragX - event.clientX;
            const moveBy = Math.round(deltaX / 100);
            if (moveBy !== 0) {
                setStartIndex(prevIndex => Math.min(Math.max(0, prevIndex + moveBy), data.length - visiblePoints));
                setLastDragX(event.clientX);
            }
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);

    useEffect(() => {
        if (data.length > visiblePoints) {
            setStartIndex(data.length - visiblePoints);
        }
    }, [data, visiblePoints]);

    return (
        <Box mt={3} onWheel={handleWheel}>
            <Paper elevation={5} style={{ background: '#f5f5f5' }}>
                <Box p={3}>
                    <CustomLegend activeTiers={activeTiers} setActiveTiers={setActiveTiers} />
                    <Box mt={4} display="flex" justifyContent="center" onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}>
                        <LineChart
                            width={800}
                            height={400}
                            data={data.slice(startIndex, startIndex + visiblePoints)}
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                        >
                            <XAxis dataKey="signed_at" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#aaa" strokeDasharray="3 3" />
                            {activeTiers.includes("HERO") && <Line type="monotone" dataKey="HERO" stroke="#ff7300" />}
                            {activeTiers.includes("VETERAN") && <Line type="monotone" dataKey="VETERAN" stroke="#387908" />}
                            {activeTiers.includes("LEGEND") && <Line type="monotone" dataKey="LEGEND" stroke="#f51167" />}
                            {activeTiers.includes("GOAT") && <Line type="monotone" dataKey="GOAT" stroke="#0012f4" />}
                            {activeTiers.includes("RESEARCHER") && <Line type="monotone" dataKey="RESEARCHER" stroke="#650d1b" />}
                            {activeTiers.includes("EXPLORER") && <Line type="monotone" dataKey="EXPLORER" stroke="#0d656e" />}
                            {activeTiers.includes("ADVENTURER") && <Line type="monotone" dataKey="ADVENTURER" stroke="#6e0d44" />}
                        </LineChart>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default ChartComponent;
