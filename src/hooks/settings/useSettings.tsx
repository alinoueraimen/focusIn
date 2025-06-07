import { createContext, useContext, useState, useEffect } from "react";

// Tipe data untuk settings
export interface SettingsType {
  volume: number;
  darkMode: boolean;
  notificationsEnabled: boolean;
}

// Konteks
interface SettingsContextType {
  settings: SettingsType;
  updateSettings: (newSettings: Partial<SettingsType>) => void;
}

// Default settings awal
const defaultSettings: SettingsType = {
  volume: 1.0,
  darkMode: false,
  notificationsEnabled: true,
};

// Buat konteks
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [isInitialize, setIsInitialize] = useState(true);

  // Load dari localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("focusin-settings");
    try {
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (err) {
      console.error( err);
    } finally {
      setIsInitialize(false);
    }
  }, []);

  // Simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    if (!isInitialize) {
      localStorage.setItem("focusin-settings", JSON.stringify(settings));
    }
  }, [settings, isInitialize]);

  const updateSettings = (newSettings: Partial<SettingsType>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook custom
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
