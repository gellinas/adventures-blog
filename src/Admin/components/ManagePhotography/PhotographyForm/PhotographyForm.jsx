import { useState } from "react";

import { Button, Form, Confirm } from "semantic-ui-react";

import { deletePhoto, publishPhoto, updatePhoto } from "../../../../api.js";

import "./PhotographyForm.scss";

function PhotographyForm(props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmPostPhoto, setConfirmPostPhoto] = useState(false);

  const imageOrientationOptions = [
    { key: "portrait", text: "portrait", value: "portrait" },
    { key: "landscape", text: "landscape", value: "landscape" },
  ];

  const onPostPhotoClick = async () => {
    let response;
    if (props.selectedPhoto.id) {
      const photo = {
        src: props.photoSrc,
        title: props.title,
        date: props.photoDate,
        location: props.location,
        orientation: props.orientation,
        draft: false,
      };
      response = await updatePhoto(photo);
    } else {
      const photo = {
        src: props.photoSrc,
        title: props.title,
        date: props.photoDate,
        location: props.location,
        orientation: props.orientation,
        draft: false,
      };
      response = await publishPhoto(photo);
    }
    setConfirmPostPhoto(false);
    console.log(response);
  };

  const onSaveAsDraftClick = async () => {
    let response;
    if (props.selectedPhoto.id) {
      const photo = {
        src: props.photoSrc,
        title: props.title,
        date: props.photoDate,
        location: props.location,
        orientation: props.orientation,
        draft: true,
      };
      response = await updatePhoto(photo);
    } else {
      const photo = {
        src: props.photoSrc,
        title: props.title,
        date: props.photoDate,
        location: props.location,
        orientation: props.orientation,
        draft: true,
      };
      response = await publishPhoto(photo);
    }
    console.log(response);
  };

  const onDeleteClick = async () => {
    const photo = {
      src: props.photoSrc,
      title: props.title,
      date: props.photoDate,
      location: props.location,
      orientation: props.orientation,
    };
    const response = await deletePhoto(photo);
    setConfirmDelete(false);
    console.log(response);
  };

  return (
    <div className="photography-form-container">
      <Form>
        <Form.Input
          label="Photo"
          placeholder="src"
          value={props.photoSrc}
          onChange={(e, data) => props.setPhotoSrc(data.value)}
        />
        <Form.Input
          label="Title"
          value={props.title}
          onChange={(e, data) => props.setTitle(data.value)}
        />
        <Form.Input
          label="Image Date"
          type="date"
          value={props.photoDate}
          onChange={(e, data) => props.setPhotoDate(data.value)}
        />
        <Form.Input
          label="Image Location"
          value={props.location}
          onChange={(e, data) => props.setLocation(data.value)}
        />
        <Form.Select
          label="Image Orientation"
          options={imageOrientationOptions}
          value={props.orientation}
          onChange={(e, data) => props.setOrientation(data.value)}
        />

        <Button
          color="red"
          content="Delete"
          onClick={() => setConfirmDelete(true)}
        />
        <Confirm
          open={confirmDelete}
          content="Are you sure you want to delete?"
          confirmButton="Delete"
          onCancel={() => setConfirmDelete(false)}
          onConfirm={onDeleteClick}
        />

        <Button
          color="yellow"
          content="Save as Draft"
          onClick={onSaveAsDraftClick}
        />

        <Button
          color="green"
          content="Post Photo"
          onClick={() => setConfirmPostPhoto(true)}
        />
        <Confirm
          open={confirmPostPhoto}
          content="Are you sure you want to post to blog?"
          confirmButton="Post to Blog"
          onCancel={() => setConfirmPostPhoto(false)}
          onConfirm={onPostPhotoClick}
        />
      </Form>
    </div>
  );
}

export default PhotographyForm;
