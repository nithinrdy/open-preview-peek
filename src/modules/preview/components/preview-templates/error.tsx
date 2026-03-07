export const PreviewError = ({ error }: { error: string }) => {
  return (
    <div className="max-w-[540px] max-h-80 overflow-y-auto font-rajdhani rounded-sm border border-error-primary bg-error-secondary text-error-primary p-4 flex flex-col gap-2">
      <h2 className="font-[700] text-2xl">Error loading preview :(</h2>
      <p className="text-lg">
        Refreshing the webpage and re-opening the extension may fix the issue.
        <br />
        <br />
        The following error message was returned:{" "}
        <span className="font-[700]">{error}</span>
      </p>
    </div>
  );
};
