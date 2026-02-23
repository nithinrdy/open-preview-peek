export enum MessageType {
  RequestPreviewData = "requestPreviewData",
}

export type PreviewDataResponse = {
  metaTags: {
    property?: string;
    content?: string;
  }[];
  /** The Favicon could be specified within the `<head>` tags as one or more `<link>` tag(s), or be located at `{origin}/favicon.ico`. This comes from the former. */
  faviconUrlFromLinkTags?: string | undefined;
  /** The Favicon could be specified within the `<head>` tags as one or more `<link>` tag(s), or be located at `{origin}/favicon.ico`. This comes from the latter. */
  faviconIcoUrl?: string | undefined;
  origin: string;
  url: string;
  // ogImageBase64?: string | undefined;
};
