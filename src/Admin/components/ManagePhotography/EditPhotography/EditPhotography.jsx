import { useState, useEffect } from "react";
import { Dropdown, Modal, Button } from "semantic-ui-react";
import { isEmpty } from "lodash";

import PhotographyForm from "../PhotographyForm/PhotographyForm.jsx";
import { getPhotos } from "../../../../api.js";

import "./EditPhotography.scss";

function EditPhotography(props) {
  const [publishedPhotos, setPublishedPhotos] = useState([]);
  const [photoSrc, setPhotoSrc] = useState("");
  const [title, setTitle] = useState("");
  const [photoDate, setPhotoDate] = useState("");
  const [location, setLocation] = useState("");
  const [orientation, setOrientation] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [tempDropdownSelectedPhoto, setTempDropdownSelectedPhoto] = useState(
    {}
  );
  const [selectedDropdownPhoto, setSelectedDropdownPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    setPublishedPhotos(await getPhotos());
  }, []);

  useEffect(() => {
    if (!isEmpty(selectedPhoto) && !open) {
      const dateFormat = selectedPhoto.date.split("T")[0];
      setPhotoSrc(selectedPhoto.src);
      setTitle(selectedPhoto.title);
      setPhotoDate(dateFormat);
      setLocation(selectedPhoto.location);
      setOrientation(selectedPhoto.orientation);
    }
  }, [selectedPhoto]);

  const publishedPhotoOptions = publishedPhotos.map((photo, index) => {
    return {
      key: index,
      value: index,
      text: photo.title,
      ...photo,
    };
  });

  const onPhotoOptionClick = (event, data) => {
    if (isEmpty(selectedPhoto)) {
      setSelectedPhoto(data.options[data.value]);
      setSelectedDropdownPhoto(data.value);
    } else {
      setOpen(true);
      setTempDropdownSelectedPhoto(data.options[data.value]);
    }
  };

  const onLoadPhotoFromModal = () => {
    setSelectedPhoto(tempDropdownSelectedPhoto);
    setSelectedDropdownPhoto(tempDropdownSelectedPhoto.value);
    const dateFormat = selectedPhoto.date.split("T")[0];
    setPhotoSrc(selectedPhoto.src);
    setTitle(selectedPhoto.title);
    setPhotoDate(dateFormat);
    setLocation(selectedPhoto.location);
    setOrientation(selectedPhoto.orientation);
    setOpen(false);
  };

  return (
    <div className="edit-photography-container">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Content>Load a different uploaded photo?</Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onLoadPhotoFromModal} positive>
            Load
          </Button>
        </Modal.Actions>
      </Modal>

      <div className="edit-photo-header">Edit Published Photography</div>

      <Dropdown
        placeholder="Load Published Photo"
        search
        selection
        scrolling
        options={publishedPhotoOptions}
        onChange={onPhotoOptionClick}
        value={selectedDropdownPhoto}
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
        selectedPhoto={selectedPhoto}
      />
    </div>
  );
}

export default EditPhotography;
