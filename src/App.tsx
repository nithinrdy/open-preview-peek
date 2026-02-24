import { FooterToolbar } from "@src/modules/footer-toolbar";
import { Preview } from "@src/modules/preview";
import { SettingsProvider } from "./providers/settings";
import { Settings } from "./modules/settings";

function App() {
  return (
    <SettingsProvider>
      <div className="relative w-extension-body bg-background flex flex-col transition-colors duration-500">
        <Preview />
        <Settings />
        <FooterToolbar />
      </div>
    </SettingsProvider>
  );
}

export default App;
