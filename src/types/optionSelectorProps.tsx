export type OptionSelectorProps = {
    label: string;
    options: number[];
    selected: number | null;
    onSelect: (value: number | null) => void;
  };