import { createElement, type MouseEventHandler, type SVGProps } from "react";

type IconButtonProps = {
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  iconProps?: SVGProps<SVGSVGElement>;
  /** `style` and not `className` because class order in `className` doesn't guarantee precedence: https://stackoverflow.com/a/72892190. */
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  disabled?: boolean;
};

export const IconButton = ({
  icon: Icon,
  iconProps,
  style,
  onClick,
  ariaLabel,
  disabled,
}: IconButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`bg-transparent text-content-primary hover:bg-button-hover h-button rounded-medium py-[6px] px-[6px] duration-150 transition-colors`}
      onClick={onClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer", ...style }}
      disabled={disabled}
    >
      {createElement(Icon, {
        ...iconProps,
        style: {
          height: "16px",
          width: "16px",
          cursor: disabled ? "not-allowed" : "pointer",
          ...iconProps?.style,
        },
      })}
    </button>
  );
};
