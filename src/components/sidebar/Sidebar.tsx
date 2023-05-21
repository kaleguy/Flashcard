import "./Sidebar.scss";
const { spawn } = require("child_process");

const Sidebar = ({ _sidebarIsOpen }: { _sidebarIsOpen: any }) => {
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
    const filePath = event.target.files[0].path;
    executePythonScript(filePath)
      .then((jsonResult: any) => {
        console.log(JSON.parse(jsonResult));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={`sidebar-container ${_sidebarIsOpen ? "open" : "close"}`}>
      <div className={`sidebar-frame ${_sidebarIsOpen ? "open" : "close"}`}>
        <div
          className={`sidebar-frame-inner ${_sidebarIsOpen ? "open" : "close"}`}
          draggable="true"
          id="drag"
        ></div>
      </div>
      <label className={`import-btn ${_sidebarIsOpen ? "open" : "close"}`}>
        {_sidebarIsOpen ? "Import Deck" : ""}
        <input
          type="file"
          name="fileUpload"
          style={{ display: "none" }}
          onChange={fileUploadHandler}
        />
      </label>
    </div>
  );
};

export default Sidebar;
