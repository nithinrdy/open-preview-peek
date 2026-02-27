import {
  MetaNamesForTwitter,
  MetaPropertiesForOpenGraph,
} from "@src/utils/constants";
import type { SUPPORTED_PREVIEWS } from "./constants";

export type PreviewKeys = (typeof SUPPORTED_PREVIEWS)[number]["id"];

type OgMetaPropertyKeys = (typeof MetaPropertiesForOpenGraph)[number];
type TwitterMetaNameKeys = (typeof MetaNamesForTwitter)[number];

export type PreviewData = Partial<
  Record<OgMetaPropertyKeys, string> & Record<TwitterMetaNameKeys, string>
> & {
  faviconIcoUrl: string;
  url: string;
};
