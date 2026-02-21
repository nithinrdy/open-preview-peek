import { XIcon } from "@src/icons/social/x";
import { SlackIcon } from "@src/icons/social/slack";
import { FacebookIcon } from "@src/icons/social/facebook";
import { LinkedinIcon } from "@src/icons/social/linkedin";
import { DiscordIcon } from "@src/icons/social/discord";
import { WhatsappIcon } from "@src/icons/social/whatsapp";

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
  {
    id: "facebook" as const,
    name: "Facebook",
    icon: FacebookIcon,
  },
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
];
