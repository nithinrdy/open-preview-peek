import { FooterToolbar } from "@src/modules/footer-toolbar";
import { Preview } from "@src/modules/preview";

function App() {
  return (
    <div className="w-extension-body bg-background flex flex-col">
      <Preview />
      <FooterToolbar />
    </div>
  );
}

export default App;
