import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import "./App.scss";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);

  return (
    <div className="App">
      <div className="flex horizontal fill">
        <Sidebar _sidebarIsOpen={sidebarIsOpen} />
        <section>
          <h1>Electron + Vite + React</h1>
          <button
            onClick={() => {
              setSidebarIsOpen(!sidebarIsOpen);
            }}
          >
            Close Sidebar
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
