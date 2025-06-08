import { createContext, useContext, useEffect, useState } from "react";
import {
  faClock, faBook, faLaptop, faBullseye, faFire, faBolt, faPalette,
  faRunning, faTree, faLightbulb, faMusic, faCoffee
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Utility: Mapping icon string ke objek icon FontAwesome
// Definisikan union type untuk key-key valid
export type IconName =
  | 'clock'
  | 'book'
  | 'laptop'
  | 'bullseye'
  | 'fire'
  | 'bolt'
  | 'palette'
  | 'running'
  | 'tree'
  | 'lightbulb'
  | 'music'
  | 'coffee'

// Tambahkan type annotation ke iconMap
export const iconMap: Record<IconName, IconDefinition> = {
  clock: faClock,
  book: faBook,
  laptop: faLaptop,
  bullseye: faBullseye,
  fire: faFire,
  bolt: faBolt,
  palette: faPalette,
  running: faRunning,
  tree: faTree,
  lightbulb: faLightbulb,
  music: faMusic,
  coffee: faCoffee,
}

// Parameter dibatasi hanya bisa string dari union `IconName`
export const getIconElement = (icon: string): IconDefinition => {
  if (icon in iconMap) {
    return iconMap[icon as IconName]
  }
  return faClock // fallback
}

// Tipe sesi Pomodoro
export interface PomodoroSessionType {
  id: number |string;
  title: string;
  icon: string; // simpan sebagai string
  sessionCount: number;
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  isSelected : boolean;
}

// Tipe konteks
interface DeepFocusContextType {
  sessions: PomodoroSessionType[];
  addSession: (session: PomodoroSessionType) => void;
  selectedSession: PomodoroSessionType;
  selectSession: (session: PomodoroSessionType) => void;
   deleteSession: (id: number | string) => void;
   toggleSessionSelection: (session: PomodoroSessionType) => void;
}

// Buat konteks
const DeepFocusContext = createContext<DeepFocusContextType | undefined>(undefined);

// Default sesi
const blankSession = {
    id: 0,
    title: "",
    icon: "",
    sessionCount: 0,
    workDuration: 0,
    shortBreak: 0,
    longBreak: 0,
    isSelected : false
}
const SessionDefault: PomodoroSessionType[] = [
 
  {
    id: 1,
    title: "Classic",
    icon: "clock",
    sessionCount: 4,
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    isSelected : false
  },
  {
    id: 2,
    title: "Sprint",
    icon: "bolt",
    sessionCount: 2,
    workDuration: 15,
    shortBreak: 3,
    longBreak: 8,
    isSelected : false
  },
];

// Provider konteks
export const PomodoroSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessions, setSessions] = useState<PomodoroSessionType[]>([]);
  const [selectedSession, setSelectedSession] = useState<PomodoroSessionType >(blankSession)
  const [isInitialize, setIsInitialize] = useState(true);

  const addSession = (session: PomodoroSessionType) => {
    setSessions((prev) => [...prev, session]);
  };

  const selectSession = (session: PomodoroSessionType) => {
    const makeOtherSessionFalse = sessions.map((item) => ({
  ...item,
  isSelected: item.id === session.id ? !session.isSelected : false,
}));

setSessions(makeOtherSessionFalse);

setSelectedSession((prev) => ({
  ...session,
  isSelected: !prev.isSelected,
}));
  };
  const deleteSession = (id: number | string) => {
  setSessions((prev) => prev.filter((session) => session.id !== id));
    
  // Jika session yang dihapus adalah session yang sedang dipilih
  if (selectedSession.id === id) {
    // Pilih sesi default jika masih ada, atau kosongkan
    const remainingSessions = sessions.filter((s) => s.id !== id);
    const newSelected = remainingSessions[0] || SessionDefault[0];
    setSelectedSession(newSelected);
  }
};
  // Load dari localStorage saat pertama kali
  useEffect(() => {
     if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
    const savedSessions = localStorage.getItem("pomodoro-sessions");
    const savedSelectedSession = localStorage.getItem("pomodoro-selectedSession");

    try {
      const parsedSessions = savedSessions ? JSON.parse(savedSessions) : null;
      const parsedSelected = savedSelectedSession ? JSON.parse(savedSelectedSession) : null;

      if (parsedSessions && parsedSelected) {
        setSessions(parsedSessions);
        setSelectedSession(parsedSelected);
      } else {
        setSessions(SessionDefault);
        setSelectedSession(blankSession);
      }
    } catch (err) {
      console.error("Failed to parse Pomodoro localStorage:", err);
      setSessions(SessionDefault);
      setSelectedSession(blankSession);
    } finally {
      setIsInitialize(false);
    }
  }, []);

  // Simpan ke localStorage saat sesi berubah
  useEffect(() => {
    if (!isInitialize) {
      localStorage.setItem("pomodoro-sessions", JSON.stringify(sessions));
    }
  }, [sessions, isInitialize]);

  useEffect(() => {
    if (!isInitialize) {
      localStorage.setItem("pomodoro-selectedSession", JSON.stringify(selectedSession));
    }
  }, [selectedSession, isInitialize]);

  return (
    <DeepFocusContext.Provider
      value={{
        sessions,
        addSession,
        selectedSession,
        selectSession,
        deleteSession
      }}
    >
      {children}
    </DeepFocusContext.Provider>
  );
};

// Hook custom
export const usePomodoroSessionContext = () => {
  const context = useContext(DeepFocusContext);
  if (!context) {
    throw new Error("usePomodoroSessionContext must be used within a PomodoroSessionProvider");
  }
  return context;
};
