import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    ToggleButtonGroup,
    ToggleButton,
    FormControlLabel,
    Switch,
    Box,
} from "@mui/material";

interface SettingsPopupProps {
    onClose: () => void;
    open: boolean;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ onClose, open }) => {
    const [sidenavType, setSidenavType] = useState<string>("dark");
    const [navbarFixed, setNavbarFixed] = useState<boolean>(false);
    const [lightMode, setLightMode] = useState<boolean>(false);
    const [sidenavColor, setSidenavColor] = useState<string>("pink");

    const handleSidenavTypeChange = (_: React.MouseEvent<HTMLElement>, newType: string | null) => {
        if (newType) setSidenavType(newType);
    };

    const handleColorChange = (color: string) => {
        setSidenavColor(color);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Material UI Configurator</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <p>Sidenav Colors</p>
                    <Box display="flex" gap={1}>
                        {["pink", "black", "blue", "green", "orange", "red"].map((color) => (
                            <Box
                                key={color}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "50%",
                                    backgroundColor: color,
                                    cursor: "pointer",
                                    border: sidenavColor === color ? "2px solid black" : "none",
                                }}
                                onClick={() => handleColorChange(color)}
                            />
                        ))}
                    </Box>
                </Box>

                <Box mb={2}>
                    <p>Sidenav Type</p>
                    <ToggleButtonGroup
                        value={sidenavType}
                        exclusive
                        onChange={handleSidenavTypeChange}
                    >
                        <ToggleButton value="dark">Dark</ToggleButton>
                        <ToggleButton value="transparent">Transparent</ToggleButton>
                        <ToggleButton value="white">White</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <FormControlLabel
                    control={
                        <Switch
                            checked={navbarFixed}
                            onChange={(e) => setNavbarFixed(e.target.checked)}
                        />
                    }
                    label="Navbar Fixed"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={lightMode}
                            onChange={(e) => setLightMode(e.target.checked)}
                        />
                    }
                    label="Light / Dark"
                />
            </DialogContent>
        </Dialog>
    );
};

export default SettingsPopup;
