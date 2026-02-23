import type { DiscordPreviewProps } from "./components/preview-templates/discord";
import type { SlackPreviewProps } from "./components/preview-templates/slack";
import type { WhatsappPreviewProps } from "./components/preview-templates/whatsapp";
import type { SUPPORTED_PREVIEWS } from "./constants";

export type PreviewKeys = (typeof SUPPORTED_PREVIEWS)[number]["id"];
export type PreviewData = SlackPreviewProps &
  DiscordPreviewProps &
  WhatsappPreviewProps;
