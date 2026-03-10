import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import {
  MetaNamesForTwitter,
  MetaPropertiesForOpenGraph,
} from "@src/utils/constants";
import { copyToClipboard } from "@src/utils/copy-to-clipboard";
import type { PreviewData } from "../../types";
import { INSECURE_URL_BLOCKED_MESSAGE } from "../../constants";

export const CodePreview = ({
  faviconIcoUrl,
  ...completePreviewData
}: PreviewData) => {
  const [faviconLoadable, setFaviconLoadable] = useState(false);
  const [justCopied, setJustCopied] = useState<"success" | "failure" | false>(
    false,
  );

  useEffect(() => {
    const imgElement = document.createElement("img");
    imgElement.onload = () => setFaviconLoadable(true);
    imgElement.onerror = () => setFaviconLoadable(false);
    imgElement.src = faviconIcoUrl ?? "";
  }, [faviconIcoUrl]);

  const handleCopyValue = (value: string) => {
    copyToClipboard(value)
      .then(() => {
        setJustCopied("success");
        setTimeout(() => setJustCopied(false), 2000);
      })
      .catch(() => {
        setJustCopied("failure");
        setTimeout(() => setJustCopied(false), 2000);
      });
  };

  return (
    <div
      className="max-w-[600px] max-h-100 overflow-y-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      <table className="table-auto border-collapse border border-divider text-content-primary">
        {[...MetaPropertiesForOpenGraph, ...MetaNamesForTwitter].map((key) => {
          const trueValue = completePreviewData[key];

          // if the value for this property is either undefined (missing), or has been blocked due to being an insecure URL
          const isErrorValue =
            typeof trueValue === "undefined" ||
            trueValue === INSECURE_URL_BLOCKED_MESSAGE;

          const prettyValue =
            !isErrorValue && typeof trueValue === "string"
              ? `"${trueValue}"`
              : String(trueValue);

          return (
            <>
              <tr key={key} className="border-b border-divider">
                <td className="font-bold pr-2 text-right px-2 py-1">
                  <code>{key}</code>
                </td>
                <td
                  data-tooltip-id={`tooltip-${key}`}
                  data-tooltip-content={
                    justCopied === "success"
                      ? "Copied!"
                      : justCopied === "failure"
                        ? "Failed to copy :("
                        : "Click to copy"
                  }
                  className={
                    "italic px-2 py-1 break-all " +
                    (!isErrorValue
                      ? "hover:underline underline-offset-3 decoration-text-underline cursor-pointer"
                      : "")
                  }
                  onClick={() => handleCopyValue(String(trueValue))}
                >
                  <code
                    style={{
                      ...(isErrorValue && { color: "var(--color-red-400)" }),
                    }}
                  >
                    {prettyValue}
                  </code>
                </td>
              </tr>
              {!isErrorValue && (
                <Tooltip id={`tooltip-${key}`} place="top" opacity={1} />
              )}
            </>
          );
        })}
        <tr className="border-b border-divider">
          <td className="font-bold pr-2 text-right px-2 py-1">
            <code className="whitespace-nowrap">/favicon.ico</code>
          </td>
          <td className="italic px-2 py-1 wrap-break-word break-all">
            <code
              style={{
                ...(!faviconLoadable && { color: "var(--color-red-400)" }),
              }}
            >
              {faviconLoadable ? "Accessible" : "Not accessible"}
            </code>
          </td>
        </tr>
      </table>
    </div>
  );
};
