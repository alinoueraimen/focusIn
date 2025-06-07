import { createContext, useContext,  useState } from "react";
import { useTaskManagementContext } from "../taskManagement/taskManagementContext";
import { usePomodoroContext } from "../pomodoro/pomodoroContext";
import { TasksType } from "../taskManagement/useTaskManagement";

interface DeepFocusContextType {
  checkedTasks: number[];
  expandedSections: {
    missed: boolean;
    current: boolean;
    upcoming: boolean;
    general: boolean;
  };
  toggleCheck: (id: number) => void;
  toggleSection: (section: keyof DeepFocusContextType["expandedSections"]) => void;
  currentSessionTasks: TasksType[];
  missedTasks: TasksType[];
  upcomingTasks: TasksType[];
  generalTasks: TasksType[];
}

const DeepFocusContext = createContext<DeepFocusContextType | undefined>(undefined);

export const DeepFocusProvider = ({ children }: { children: React.ReactNode }) => {
  const { tasks,updateTask } = useTaskManagementContext();
  const { currentSession } = usePomodoroContext();

  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    missed: true,
    current: true,
    upcoming: false,
    general: false,
  });

  const toggleCheck = (id: number) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  // Update checkedTasks state
  setCheckedTasks((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );

  // Lakukan update isDone
  updateTask(id, { isDone: !task.isDone });
};

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const currentSessionTasks = tasks.filter((task) => task.sessionId === currentSession);
  const missedTasks = tasks.filter(
    (task) => !task.isDone && task.sessionId && task.sessionId > 0 && task.sessionId < currentSession
  );
  const upcomingTasks = tasks.filter((task) => task.sessionId && task.sessionId > currentSession);
  const generalTasks = tasks.filter((task) => !task.sessionId || task.sessionId <= 0);

  return (
    <DeepFocusContext.Provider
      value={{
        checkedTasks,
        expandedSections,
        toggleCheck,
        toggleSection,
        currentSessionTasks,
        missedTasks,
        upcomingTasks,
        generalTasks,
      }}
    >
      {children}
    </DeepFocusContext.Provider>
  );
};

export const useDeepFocusContext = () => {
  const context = useContext(DeepFocusContext);
  if (!context) {
    throw new Error("useDeepFocusContext must be used within a DeepFocusProvider");
  }
  return context;
};
