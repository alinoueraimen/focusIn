import { Plus } from "lucide-react"; // contoh icon, kamu bisa ganti

const TaskSection = ({ sessionTitle, tasks }: { sessionTitle: string; tasks: string[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-primary text-white text-xs px-3 py-1 rounded-full">
          {sessionTitle}
        </div>
        {/* Bisa tambahin jam kecil kalau mau */}
      </div>

      <div className="flex flex-col gap-2">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between bg-container rounded-md px-3 py-2">
            <p className="text-sm text-text">{task}</p>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-1 text-primary text-xs mt-2 hover:underline">
        <Plus size={14} /> Add Task
      </button>

      <hr className="my-4 border-gray-200" />
    </div>
  );
};

export default function TasksList() {
  return (
    <div className="w-full p-4">
      <TaskSection sessionTitle="Session 1" tasks={["Math Homework", "Review Biology Notes"]} />
      <TaskSection sessionTitle="Session 2" tasks={["Finish Essay Draft", "Chemistry Practice"]} />
      <TaskSection sessionTitle="Session 3" tasks={["History Reading", "Prepare Presentation"]} />
    </div>
  );
}
