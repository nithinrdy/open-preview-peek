import { XIcon } from "@src/icons/social/x";
import { SlackIcon } from "@src/icons/social/slack";
// import { FacebookIcon } from "@src/icons/social/facebook";
import { LinkedinIcon } from "@src/icons/social/linkedin";
import { DiscordIcon } from "@src/icons/social/discord";
import { WhatsappIcon } from "@src/icons/social/whatsapp";
import { CodeIcon } from "@src/icons/code";

export const SUPPORTED_PREVIEWS = [
  {
    id: "x" as const,
    name: "X (Twitter)",
    icon: XIcon,
  },
  {
    id: "slack" as const,
    name: "Slack",
    icon: SlackIcon,
  },
  // {
  //   id: "facebook" as const,
  //   name: "Facebook",
  //   icon: FacebookIcon,
  // },
  {
    id: "linkedin" as const,
    name: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    id: "discord" as const,
    name: "Discord",
    icon: DiscordIcon,
  },
  {
    id: "whatsapp" as const,
    name: "WhatsApp",
    icon: WhatsappIcon,
  },
  {
    id: "code" as const,
    name: "Code",
    icon: CodeIcon,
  },
];
/** Message to be shown in the code preview tab, to indicate why (for example) images won't render in other previews in case of accidental insecure URLs */
export const INSECURE_URL_BLOCKED_MESSAGE = "INSECURE_URL_BLOCKED_BY_EXTENSION";

/** Message to be shown in the preview when the data received from content script is invalid (not the right shape) */
export const INVALID_PREVIEW_DATA_PAYLOAD_MESSAGE =
  "Invalid preview data received from content script";
