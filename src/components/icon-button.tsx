import { createElement, type MouseEventHandler, type SVGProps } from "react";
import { Tooltip } from "react-tooltip";

type IconButtonProps = {
  id: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  iconProps?: SVGProps<SVGSVGElement>;
  /** `style` and not `className` because class order in `className` doesn't guarantee precedence: https://stackoverflow.com/a/72892190. */
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  disabled?: boolean;
  tooltip?: string;
};

export const IconButton = ({
  id,
  icon: Icon,
  iconProps,
  style,
  onClick,
  ariaLabel,
  disabled,
  tooltip,
}: IconButtonProps) => {
  return (
    <>
      <button
        data-tooltip-id={tooltip ? `tooltip-${id}` : undefined}
        data-tooltip-content={tooltip}
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
      {tooltip && <Tooltip id={`tooltip-${id}`} opacity={1} />}
    </>
  );
};
