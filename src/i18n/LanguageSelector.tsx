import React, { useState } from "react";
import { Tooltip, IconButton, Menu, MenuItem } from "@mui/material";

type LanguageSelectorProps = {
  currentLanguage: "eng" | "vie"; // Chỉ cho phép "eng" hoặc "vie"
  onLanguageChange: (lang: "eng" | "vie") => void; 
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (selectedLanguage: "eng" | "vie" | null) => {
    setAnchorEl(null);
    if (selectedLanguage && selectedLanguage !== currentLanguage) {
      onLanguageChange(selectedLanguage);
    }
  };

  return (
    <>
      <Tooltip title="Select Language">
        <IconButton onClick={handleLanguageClick} color="inherit">
          <img
            src={
              currentLanguage === "eng"
                ? "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                : "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
            }
            alt={currentLanguage === "eng" ? "English" : "Vietnamese"}
            style={{ width: 24, height: 16 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleLanguageClose(null)}
      >
        <MenuItem onClick={() => handleLanguageClose("eng")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            alt="English"
            style={{ width: 24, height: 16, marginRight: 8 }}
          />
          English
        </MenuItem>
        <MenuItem onClick={() => handleLanguageClose("vie")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
            alt="Vietnamese"
            style={{ width: 24, height: 16, marginRight: 8 }}
          />
          Vietnamese
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector;
