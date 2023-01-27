import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import md5 from "md5";

import { addFolder, setModal } from "../../store/Actions";
import { folderProps, modalProps, State } from "../../utils/types";
import "./AddFolder.css";
import { FILE, FOLDER } from "../../utils/constants";

function AddFolder(props: folderProps) {
  const [name, setName] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [file, setFile] = useState<boolean>(false);
  const [redundant, setRedundant] = useState<boolean>(false);
  const [folder, setFolder] = useState<boolean>(true);
  const [type, setType] = useState<string>("folder");

  const state = useSelector((state: State) => state);
  const array = state.addedFolder.array;
  const dispatch = useDispatch();

  const handleClick = () => {
    if (name.length > 0 && creator.length > 0) {
      const concatname = name.substring(0, 8);
      const concatcreator = name.substring(0, 8);

      const data: folderProps = {
        id: md5(name),
        type: type,
        name: concatname,
        path: props.path + "/" + concatname,
        creator: concatcreator,
        parentId: props.id,
        parentPath: props.path,
        childFolder: [],
        array: [],
      };

      const status: modalProps = {
        active: false,
      };
      // find parent and check for redundant
      let val = false;
      array.map((element: folderProps) => {
        console.log(data.parentPath);
        if (element.path === data.path) {
          val = true;
        }
      });
      setRedundant(val);
      if (val === false) {
        dispatch(addFolder(data));
        dispatch(setModal(status));
      }
    }
  };

  const clicked = () => {
    dispatch(setModal({ active: false }));
  };

  const FileToggle = () => {
    setFile(true);
    setFolder(false);
    setType(FILE);
  };

  const FolderToggle = () => {
    setFile(false);
    setFolder(true);
    setType(FOLDER);
  };

  return (
    <div>
      <>
        <div className="folder55main">
          <div className="modal88circularbtn" onClick={clicked}>
            X
          </div>
          <br />
          Create New File/Folder
          <div className="toggle">
            <button
              onClick={FileToggle}
              id="file"
              className={file ? "dark" : "light"}
            >
              File
            </button>
            <button
              id="folder"
              onClick={FolderToggle}
              className={folder ? "dark" : "light"}
            >
              Folder
            </button>
          </div>
          <input
            type="text"
            value={name}
            placeholder="Folder's name"
            id="input"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={creator}
            placeholder="Creator's name"
            id="input"
            onChange={(e: any) => setCreator(e.target.value)}
            required
          />
          <button className="modal88btn" onClick={handleClick}>
            Create
          </button>
          {redundant ? (
            <>
              <span>already present</span>
            </>
          ) : (
            <> </>
          )}
        </div>
      </>
    </div>
  );
}

export default AddFolder;
