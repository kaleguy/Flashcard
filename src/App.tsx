import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ViewPanel from "@/components/viewpanel/Viewpanel";
import "./App.scss";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);
  const [selectedSubdeck, setSelectedSubdeck] = useState<any>(null);

  return (
    <div className="App">
      <div className="flex horizontal fill">
        <Sidebar
          _sidebarIsOpen={sidebarIsOpen}
          setSelectedSubdeck={setSelectedSubdeck}
        />
        <section style={{ width: "100%" }}>
          <button
            onClick={() => {
              setSidebarIsOpen(!sidebarIsOpen);
            }}
          >
            {sidebarIsOpen ? "<" : ">"}
          </button>
          <ViewPanel selectedSubdeck={selectedSubdeck} />
        </section>
      </div>
    </div>
  );
}

export default App;
