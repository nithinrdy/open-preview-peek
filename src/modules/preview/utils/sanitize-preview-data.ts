import DOMPurify from "dompurify";

import type { PreviewData } from "@src/modules/preview/types";
import {
  MandatoryPreviewDataProperties,
  MetaNamesForTwitter,
  MetaPropertiesForOpenGraph,
} from "@src/utils/constants";
import {
  INSECURE_URL_BLOCKED_MESSAGE,
  INVALID_PREVIEW_DATA_PAYLOAD_MESSAGE,
} from "../constants";

/**
 * Sanitizes the preview data object or error string, also filters out insecure URLs (the latter only for URL properties).
 * @param previewData The data object or the error string
 * @returns sanitized data object or error string (or undefined)
 */
export const sanitizePreviewData = (previewData: unknown) => {
  if (typeof previewData === "string") return DOMPurify.sanitize(previewData);
  if (typeof previewData === "undefined") return undefined;
  if (!isPreviewData(previewData)) return INVALID_PREVIEW_DATA_PAYLOAD_MESSAGE;

  return Object.fromEntries(
    Object.entries(previewData).map(([k, v]) => [
      k,
      filterInsecureUrls(k, typeof v === "string" ? DOMPurify.sanitize(v) : v),
    ]),
  ) as PreviewData;
};

// Assume nothing is known about previewData
const isPreviewData = (data: unknown): data is PreviewData => {
  const allowedProperties = [
    ...MetaNamesForTwitter,
    ...MetaPropertiesForOpenGraph,
    ...MandatoryPreviewDataProperties,
  ];

  const isAllowedValue = (value: unknown) =>
    typeof value === "string" || value === undefined;

  return (
    typeof data === "object" &&
    data !== null &&
    Object.entries(data).every(
      ([key, value]) =>
        allowedProperties.some((p) => p === key) && isAllowedValue(value),
    )
  );
};

// Only allow https URLs (unless the origin is localhost, which is cool as well)
const PropertiesToValidateAsUrls = [
  "og:image",
  "twitter:image",
  "og:url",
  "faviconIcoUrl",
  "url",
];
const filterInsecureUrls = (
  key: string,
  str: string | undefined,
): string | undefined => {
  if (!str) return str;
  if (!PropertiesToValidateAsUrls.some((p) => p === key)) return str; // Don't validate if it's not a URL property

  try {
    const url = new URL(str);
    if (
      url.protocol === "https:" ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1"
    ) {
      return str;
    }

    return INSECURE_URL_BLOCKED_MESSAGE;
  } catch {
    return str; // Ignore if not a URL (sanitization alone should suffice)
  }
};
