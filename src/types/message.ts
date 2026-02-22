export enum MessageType {
  RequestPreviewData = "requestPreviewData",
}

export type PreviewDataResponse = {
  metaTags: {
    property?: string;
    content?: string;
  }[];
  faviconUrl?: string | undefined;
  // ogImageBase64?: string | undefined;
};
