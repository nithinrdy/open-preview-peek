import { UsePreviewSelect } from "./hooks/use-preview-select";
import { TabSelect } from "./components/tab-select";

export const Preview = () => {
  const { selectedPreview, savePreviewSelection } = UsePreviewSelect();

  return (
    <div className="flex justify-center items-center p-[16px]">
      <TabSelect
        selected={selectedPreview}
        setSelected={savePreviewSelection}
      />
    </div>
  );
};
