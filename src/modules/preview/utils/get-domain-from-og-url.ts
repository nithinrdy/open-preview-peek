export const getDomainFromOgUrl = (ogUrl?: string): string | undefined => {
  if (!ogUrl) return undefined;

  return (
    ogUrl?.startsWith("https://")
      ? ogUrl.replace("https://", "")
      : ogUrl?.startsWith("http://")
        ? ogUrl.replace("http://", "")
        : ogUrl
  )?.split("/")[0];
};
