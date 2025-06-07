import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { useDeepFocusContext as useDeepFocus } from '../../../hooks/deepFocus/useDeepFocus';

import React from 'react';
import { useTaskManagementContext } from '../../../hooks/taskManagement/taskManagementContext';

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  sectionKey: keyof ReturnType<typeof useDeepFocus>['expandedSections'];
  iconColor?: string;
  textColor?: string;
  showPlus?: boolean;
}

function SectionHeader({
  title,
  icon,
  count,
  sectionKey,
  iconColor = "text-slate-500",
  textColor = "text-slate-700",
  showPlus = false,
}: SectionHeaderProps) {
  const { expandedSections, toggleSection } = useDeepFocus();
   const {openModal} = useTaskManagementContext();
  return (
    <div className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200 mb-4">
      <div
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between hover:bg-slate-100 rounded-lg p-3 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className={iconColor}>{icon}</div>
          <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
          <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {showPlus && (
            <button
              title="new task"
              onClick={(e) => {
                e.stopPropagation(); // ⛔ stop bubbling ke parent div
                openModal();
              }}
              className="p-1.5 rounded-full hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-600" />
            </button>
          )}
          <div className="text-slate-400">
            {expandedSections[sectionKey] ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionHeader;
