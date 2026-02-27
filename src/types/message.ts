import type { PreviewData } from "@src/modules/preview/types";

export enum MessageType {
  RequestPreviewData = "requestPreviewData",
}

export type PreviewDataResponse = PreviewData;
