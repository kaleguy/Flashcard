import { useEffect, useState } from "react";
import "./Sidebar.scss";
const { spawn } = require("child_process");

const Sidebar = (props: any) => {
  const [currentDeck, setCurrentDeck] = useState<Deck>({});
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(-1);

  interface Deck {
    [key: string]: Array<Record<string, any>>;
  }

  function executePythonScript(filePath: String) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("./src/utils/parseAnki/parseAnki.exe", [
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
          let deckInfo: Deck = JSON.parse(jsonResult);
          setCurrentDeck(deckInfo);
          debugger;
          setSelectedDeckIndex(-1);
          props.setSelectedSubdeck(null);
        })
        .catch((error) => console.error(error));
    } else {
      console.log("User didn't select a file");
    }
  };

  const handleSubdeckSelection = (deckName: string, i: number) => {
    setSelectedDeckIndex(i);
    if (currentDeck !== undefined) {
      let subDeck: any = { [deckName]: currentDeck[deckName] };
      props.setSelectedSubdeck(subDeck);
    }
  };

  return (
    <div
      className={`sidebar-container ${props._sidebarIsOpen ? "open" : "close"}`}
    >
      <div
        className={`sidebar-frame ${props._sidebarIsOpen ? "open" : "close"}`}
      >
        <div
          className={`sidebar-frame-inner ${
            props._sidebarIsOpen ? "open" : "close"
          }`}
        >
          {Object.keys(currentDeck as Deck).map((deckName, i) => {
            return (
              <div
                className={`selectable-deck ${
                  selectedDeckIndex === i ? "selected-deck" : ""
                }`}
                onClick={() => handleSubdeckSelection(deckName, i)}
                key={i}
              >
                {deckName}
              </div>
            );
          })}
        </div>
      </div>
      <label
        className={`import-btn ${props._sidebarIsOpen ? "open" : "close"}`}
      >
        {props._sidebarIsOpen ? "Import Deck" : ""}
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
