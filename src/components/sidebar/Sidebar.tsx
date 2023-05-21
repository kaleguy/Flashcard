import "./Sidebar.scss";
import { useState, useEffect } from "react";
const { spawn } = require("child_process");

const Sidebar = ({ _sidebarIsOpen }: { _sidebarIsOpen: any }) => {
  const [currentDeck, setCurrentDeck] = useState({});
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(-1);

  function executePythonScript(filePath: String) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "./src/utils/parseAnki.py",
        filePath,
      ]);

      let output = "";

      pythonProcess.stdout.on("data", (data: any) => {
        output += data.toString();
      });
      pythonProcess.stderr.on("data", (data: any) => {
        reject(data.toString());
      });
      pythonProcess.on("close", (code: Number) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(`Python script exited with code ${code}`);
        }
      });
      pythonProcess.on("error", (error: any) => {
        reject(error);
      });
    });
  }

  const fileUploadHandler = async (event: any) => {
    if (event.target.files.length > 0) {
      const filePath = event?.target?.files[0].path;
      executePythonScript(filePath)
        .then((jsonResult: any) => {
          let deckInfo: any = JSON.parse(jsonResult);
          setCurrentDeck(deckInfo);
          setSelectedDeckIndex(-1);
        })
        .catch((error) => console.error(error));
    } else {
      console.log("User didn't select a file");
    }
  };

  return (
    <div className={`sidebar-container ${_sidebarIsOpen ? "open" : "close"}`}>
      <div className={`sidebar-frame ${_sidebarIsOpen ? "open" : "close"}`}>
        <div
          className={`sidebar-frame-inner ${_sidebarIsOpen ? "open" : "close"}`}
        >
          {Object.keys(currentDeck).map((deckName, i) => {
            return (
              <div
                className={`selectable-deck ${
                  selectedDeckIndex === i ? "selected-deck" : ""
                }`}
                onClick={() => setSelectedDeckIndex(i)}
                key={i}
              >
                {deckName}
              </div>
            );
          })}
        </div>
      </div>
      <label className={`import-btn ${_sidebarIsOpen ? "open" : "close"}`}>
        {_sidebarIsOpen ? "Import Deck" : ""}
        <input
          type="file"
          style={{ display: "none" }}
          onChange={fileUploadHandler}
        />
      </label>
    </div>
  );
};

export default Sidebar;
