import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePomodoroSessionContext } from "../../../hooks/sessionType/usePomodoroSession";
import { useTaskManagementContext } from "../../../hooks/taskManagement/taskManagementContext";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function SetTasksBtn() {
  const { showSection } = useTaskManagementContext();
  const { selectedSession } = usePomodoroSessionContext();
  const [shake, setShake] = useState(false);

  const isSessionValid =
    selectedSession &&
    selectedSession.sessionCount !== 0 &&
    selectedSession.id !== 0;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Reset animasi shake
  };

  return (
    <AnimatePresence mode="wait">
      {isSessionValid ? (
        <motion.div
          key="valid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className=" flex gap-x-3 items-center ml-auto my-auto xl:absolute xl:bottom-0 xl:right-3 lg:absolute lg:bottom-0 lg:right-3 md:absolute md:bottom-0 md:right-3
          sm:absolute sm:bottom-0 sm:right-3"
        >
          <p className="capitalize font-light text-text text-sm transition-all duration-300">
            set tasks
          </p>
          <div
            onClick={showSection}
            className="w-10 h-10 rounded-full grid place-items-center bg-accent text-white font-bold hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} size="xl" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="invalid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-3 right-0 flex gap-x-3 items-center hover:cursor-block"
        >
          <p className="capitalize font-light text-red-500 text-sm transition-all duration-300">
            set your session first
          </p>
          <motion.div
            onClick={triggerShake}
            animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-10 h-10 rounded-full grid place-items-center bg-slate-500 text-white font-bold cursor-not-allowed pointer-events-none"
          >
            <FontAwesomeIcon icon={faPlus} size="xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SetTasksBtn;
