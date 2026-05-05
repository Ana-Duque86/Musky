import "./SegmentedControl.css";

export interface SegmentedControlOption {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  label: string;
  options: SegmentedControlOption[];
  value: string;
  onChange?: (value: string) => void;
}

export function SegmentedControl({ label, onChange, options, value }: SegmentedControlProps) {
  return (
    <div aria-label={label} className="musky-segmented-control" role="radiogroup">
      {options.map((option, index) => {
        const active = option.value === value;

        return (
          <button
            aria-checked={active}
            aria-posinset={index + 1}
            aria-setsize={options.length}
            className="musky-segmented-control__option"
            data-active={active || undefined}
            disabled={option.disabled}
            key={option.value}
            onClick={() => onChange?.(option.value)}
            role="radio"
            type="button"
          >
            {option.icon ? (
              <span aria-hidden="true" className="musky-segmented-control__icon">
                {option.icon}
              </span>
            ) : null}
            <span className="musky-segmented-control__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
