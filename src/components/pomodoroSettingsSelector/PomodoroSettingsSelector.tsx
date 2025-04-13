import React from 'react';

type OptionSelectorProps = {
  label: string;
  options: number[];
  selected: number | null;
  onSelect: (value: number | null) => void;
};

const PomodoroSettingsSelector: React.FC<OptionSelectorProps> = ({
  label,
  options,
  selected,
  onSelect
}) => {
  return (
    <div>
      <p className="mb-2 font-semibold">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(selected === option ? null : option)}
            className={`px-4 py-2 rounded-md border transition-all
              ${selected === option
                ? "bg-green-600 text-white border-green-700"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PomodoroSettingsSelector;
