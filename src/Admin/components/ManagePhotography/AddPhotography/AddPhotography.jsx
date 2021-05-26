import { useState, useEffect } from "react";
import { Dropdown, Modal, Button } from "semantic-ui-react";
import { isEmpty } from "lodash";

import PhotographyForm from "../PhotographyForm/PhotographyForm.jsx";
import { getDraftPhotos } from "../../../../api.js";

import "./AddPhotography.scss";

function AddPhotography(props) {
  const [draftPhotos, setDraftPhotos] = useState([]);
  const [photoSrc, setPhotoSrc] = useState("");
  const [title, setTitle] = useState("");
  const [photoDate, setPhotoDate] = useState("");
  const [location, setLocation] = useState("");
  const [orientation, setOrientation] = useState("");
  const [selectedDraft, setSelectedDraft] = useState({});
  const [tempDropdownSelectedDraft, setTempDropdownSelectedDraft] = useState(
    {}
  );
  const [selectedDropdownDraft, setSelectedDropdownDraft] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    setDraftPhotos(await getDraftPhotos());
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedDraft) && !open) {
      const dateFormat = selectedDraft.date.split("T")[0];
      setPhotoSrc(selectedDraft.src);
      setTitle(selectedDraft.title);
      setPhotoDate(dateFormat);
      setLocation(selectedDraft.location);
      setOrientation(selectedDraft.orientation);
    }
  }, [selectedDraft]);

  const draftOptions = draftPhotos.map((photo, index) => {
    return {
      key: index,
      value: index,
      text: photo.title,
      ...photo,
    };
  });

  const onDraftOptionClick = (event, data) => {
    if (isEmpty(selectedDraft)) {
      setSelectedDraft(data.options[data.value]);
      setSelectedDropdownDraft(data.value);
    } else {
      setOpen(true);
      setTempDropdownSelectedDraft(data.options[data.value]);
    }
  };

  const onLoadDraftFromModal = () => {
    setSelectedDraft(tempDropdownSelectedDraft);
    setSelectedDropdownDraft(tempDropdownSelectedDraft.value);
    const dateFormat = selectedDraft.date.split("T")[0];
    setPhotoSrc(selectedDraft.src);
    setTitle(selectedDraft.title);
    setPhotoDate(dateFormat);
    setLocation(selectedDraft.location);
    setOrientation(selectedDraft.orientation);
    setOpen(false);
  };

  return (
    <div className="add-photography-container">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>Load a different photo draft?</Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onLoadDraftFromModal} positive>
            Load
          </Button>
        </Modal.Actions>
      </Modal>

      <div className="add-photo-header">Add Photography</div>

      <Dropdown
        placeholder="Load Draft"
        search
        selection
        scrolling
        options={draftOptions}
        onChange={onDraftOptionClick}
        value={selectedDropdownDraft}
      />

      <PhotographyForm
        photoSrc={photoSrc}
        setPhotoSrc={setPhotoSrc}
        title={title}
        setTitle={setTitle}
        photoDate={photoDate}
        setPhotoDate={setPhotoDate}
        location={location}
        setLocation={setLocation}
        orientation={orientation}
        setOrientation={setOrientation}
        selectedPhoto={selectedDraft}
      />
    </div>
  );
}

export default AddPhotography;
