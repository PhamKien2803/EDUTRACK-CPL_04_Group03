import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu cho Settings
interface Settings {
    sidenavColor: string;
    sidenavType: string;
    navbarFixed: boolean;
    lightMode: boolean;
    updateSetting: (key: keyof Settings, value: any) => void;
}

// Giá trị mặc định của Context
const defaultSettings: Settings = {
    sidenavColor: "pink",
    sidenavType: "dark",
    navbarFixed: false,
    lightMode: false,
    updateSetting: () => { },
};

const SettingsContext = createContext<Settings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [settings, setSettings] = useState<Omit<Settings, "updateSetting">>({
        sidenavColor: "pink",
        sidenavType: "dark",
        navbarFixed: false,
        lightMode: false,
    });

    const updateSetting = (key: keyof Settings, value: any) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <SettingsContext.Provider value={{ ...settings, updateSetting }}>
            {children}
        </SettingsContext.Provider>
    );
};
