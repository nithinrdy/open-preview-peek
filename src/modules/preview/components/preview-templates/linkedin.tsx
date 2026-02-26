export type LinkedInPreviewProps = Partial<{
  domain: string;
  title: string;
  imageUrl: string;
}>;

export const LinkedInPreview = ({
  domain,
  title,
  imageUrl,
}: LinkedInPreviewProps) => {
  return (
    <div
      className="w-[520px] min-w-[520px] flex flex-col rounded-xs bg-linkedin-background"
      style={{
        boxShadow:
          "0 0 0 1px var(--color-linkedin-shadow), 0 2px 3px var(--color-linkedin-shadow)",
      }}
    >
      {imageUrl && (
        <img
          className="max-h-[320px] max-w-full rounded-xs"
          style={{ objectFit: "contain" }}
          src={imageUrl}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      <div className="max-w-full flex flex-col p-2.5 gap-0.5">
        <span className="font-[600] text-linkedin-title-text text-linkedin-primary truncate">
          {title}
        </span>
        <span className="text-linkedin-domain-text text-linkedin-secondary truncate">
          {domain}
        </span>
      </div>
    </div>
  );
};
