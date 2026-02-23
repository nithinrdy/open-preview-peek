export type SlackPreviewProps = Partial<{
  domain: string;
  title: string;
  description: string;
  imageUrl: string;
  /** The Favicon could be specified within the `<head>` tags as one or more `<link>` tag(s), or be located at `{origin}/favicon.ico`. Slack relies on the latter. */
  faviconIcoUrl: string;
}>;

export const SlackPreview = ({
  domain,
  title,
  description,
  faviconIcoUrl,
  imageUrl,
}: SlackPreviewProps) => {
  return (
    <div className="w-[600px] max-w-[600px] flex bg-slack-background">
      <div className="min-h-full min-w-1 rounded-lg bg-slack-left-edge" />
      <div className="grow px-3 py-1 flex flex-col gap-1">
        <span className="flex gap-2 items-center text-slack-domain-text text-slack-primary">
          {faviconIcoUrl && (
            <img
              className="h-4 w-4"
              src={faviconIcoUrl}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <span className="max-w-[360px] font-[900] truncate">{domain}</span>
        </span>
        <p className="max-w-[360px] font-[700] text-slack-title-text text-slack-primary truncate">
          {title}
        </p>
        <p className="text-content-primary line-clamp-3 text-ellipsis overflow-hidden">
          {description}
        </p>
        {imageUrl && (
          <img
            className="max-h-[240px] max-w-[360px] rounded-lg mt-1"
            style={{ objectFit: "contain", objectPosition: "left" }}
            src={imageUrl}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
    </div>
  );
};
