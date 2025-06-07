import { Check } from 'lucide-react'
import { useDeepFocusContext as useDeepFocus } from '../../../hooks/deepFocus/useDeepFocus'

const styleMap = {
  missed: {
    container: "border-l-4 border-red-400 bg-red-50",
    dot: "bg-red-400",
    badge: "bg-red-200 text-red-700",
    badgeText: "Missed",
    border: "border-red-400",
  },
  current: {
    container: "border-l-4 border-blue-400 bg-blue-50",
    dot: "bg-blue-400",
    badge: "bg-blue-200 text-blue-700",
    badgeText: "Now",
    border: "border-blue-400",
  },
  upcoming: {
    container: "border-l-4 border-yellow-400 bg-yellow-50",
    dot: "bg-yellow-400",
    badge: "bg-yellow-200 text-yellow-700",
    badgeText: "Upcoming",
    border: "border-yellow-400",
  },
  general: {
    container: "border-l-4 border-emerald-400 bg-emerald-50",
    dot: "bg-emerald-400",
    badge: "bg-emerald-200 text-emerald-700",
    badgeText: "Anytime",
    border: "border-emerald-400",
  },
} as const;


function TaskUnit({
  id,
  isChecked,
  content,
  type,
}: {
  id: number;
  isChecked: boolean;
  content: string;
  type: 'missed' | 'current' | 'upcoming' | 'general';
}) {
  const { toggleCheck } = useDeepFocus();

  const style = styleMap[type];

  return (
    <div
      key={`${type}-${id}`}
      className={`
        bg-white rounded-xl w-full h-[50px] my-2 flex items-center px-4 relative transition-all duration-300
        ${isChecked ? 'bg-green-500 sparkle' : ''}
        ${style.container}
      `}
    >
      <button
        onClick={() => toggleCheck(id)}
        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200
          ${isChecked ? 'bg-green-500 border-green-500' : style.border}
        `}
      >
        {isChecked && <Check size={14} color="white" strokeWidth={3} />}
      </button>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span
            className={`text-base flex items-center gap-2 ${
              isChecked ? 'line-through' : 'text-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
            {content}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.badge}`}>
            {style.badgeText}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskUnit;
