import { useCallback, useContext, useEffect } from "react";
import { SettingsContext } from "@src/providers/settings";

export const useHotkeys = (hotkeysToListenFor: {
  [actionId: string]: {
    keyCombination: string[];
    onMatch: () => void;
  };
}) => {
  const { settings } = useContext(SettingsContext);

  const checkIfPressedCombinationMatches = (
    event: KeyboardEvent,
    keyCombinationToCheckAgainst: string[],
  ) => {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const pressedKey = event.key.toLowerCase();

    if (["alt", "control", "meta", "shift"].includes(pressedKey)) {
      return false;
    }

    if (
      keyCombinationToCheckAgainst.includes("alt") !== altKey ||
      keyCombinationToCheckAgainst.includes("shift") !== shiftKey ||
      keyCombinationToCheckAgainst.includes("ctrl") !== ctrlKey ||
      keyCombinationToCheckAgainst.includes("meta") !== metaKey
    ) {
      return false;
    }

    if (pressedKey && keyCombinationToCheckAgainst.includes(pressedKey)) {
      return true;
    }

    return false;
  };

  const handler = useCallback(
    (event: KeyboardEvent) => {
      Object.values(hotkeysToListenFor).forEach(
        ({ keyCombination, onMatch }) => {
          if (checkIfPressedCombinationMatches(event, keyCombination)) {
            event.preventDefault();
            onMatch();
          }
        },
      );
    },
    [hotkeysToListenFor],
  );

  useEffect(() => {
    if (settings?.enableHotkeys) {
      document.addEventListener("keydown", handler);
    } else {
      document.removeEventListener("keydown", handler);
    }

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handler, settings?.enableHotkeys]);

  return null;
};
