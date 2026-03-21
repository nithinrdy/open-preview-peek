import { IconButton } from "@src/components/icon-button";
import { GithubIcon } from "@src/icons/social/github";

export const GithubButton = () => {
  const handleClick = () => {
    window
      .open("https://github.com/nithinrdy/open-preview-peek", "_blank")
      ?.focus();
  };

  return (
    <IconButton
      id="github-button"
      tooltip="View on GitHub"
      onClick={handleClick}
      icon={GithubIcon}
    />
  );
};
