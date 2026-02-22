import { useDataForPreview } from "./hooks/use-data-for-preview";
import { UsePreviewSelect } from "./hooks/use-preview-select";
import { TabSelect } from "./components/tab-select";
import { SlackPreview } from "./components/preview-templates";

const PREVIEW_COMPONENTS = {
  slack: SlackPreview,
  whatsapp: () => <></>,
  facebook: () => <></>,
  linkedin: () => <></>,
  discord: () => <></>,
};

export const Preview = () => {
  const { selectedPreview, savePreviewSelection } = UsePreviewSelect();
  const SelectedPreviewComponent = PREVIEW_COMPONENTS[selectedPreview];
  const { previewData } = useDataForPreview();

  return (
    <div className="p-[16px] flex flex-col justify-center items-center gap-[16px]">
      <TabSelect
        selected={selectedPreview}
        setSelected={savePreviewSelection}
      />
      {/* TODO: Validate previewData before previewing */}
      <SelectedPreviewComponent {...previewData} />
    </div>
  );
};
