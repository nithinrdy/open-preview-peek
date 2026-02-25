type CheckboxItemProps = {
  settingId: string;
  settingLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const CheckboxSettingsItem = ({
  settingId,
  settingLabel,
  checked,
  onChange,
  disabled = false,
}: CheckboxItemProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <label
        htmlFor={settingId}
        className="font-rajdhani font-[600] text-content-primary text-xl select-none"
      >
        {settingLabel}
      </label>
      <div className="bg-content-secondary opacity-30 h-0.5 grow" />
      <input
        id={settingId}
        className="h-5 w-5"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
    </div>
  );
};
