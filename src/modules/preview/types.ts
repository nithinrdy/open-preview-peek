import type { SUPPORTED_PREVIEWS } from "./constants";

export type PreviewKeys = (typeof SUPPORTED_PREVIEWS)[number]["id"];

export type PreviewTemplateProps = Partial<{
  domain: string;
  title: string;
  description: string;
  faviconUrl: string;
  imageUrl: string;
}>;
