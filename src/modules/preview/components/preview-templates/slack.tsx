import type { PreviewTemplateProps } from "../../types";

export const SlackPreview = ({
  domain,
  title,
  description,
  faviconUrl,
  imageUrl,
}: PreviewTemplateProps) => {
  return (
    <div className="w-[600px] max-w-[600px] flex bg-slack-background">
      <div className="min-h-full min-w-1 rounded-lg bg-slack-left-edge" />
      <div className="grow px-3 py-1 flex flex-col gap-1">
        <span className="flex gap-2 items-center text-slack-domain-text text-slack-domain">
          {faviconUrl && <img className="h-4 w-4" src={faviconUrl} />}
          <span className="max-w-[360px] font-[900] whitespace-nowrap text-ellipsis overflow-hidden">
            {domain}
          </span>
        </span>
        <p className="max-w-[360px] font-[700] whitespace-nowrap text-ellipsis overflow-hidden text-slack-title-text text-slack-title">
          {title}
        </p>
        <p className="text-content-primary text-ellipsis overflow-hidden line-clamp-3">
          {description}
        </p>
        <img
          className="max-h-[240px] max-w-[360px] rounded-lg mt-1"
          style={{ objectFit: "contain", objectPosition: "left" }}
          src={imageUrl}
        />
      </div>
    </div>
  );
};
