import { Image } from "semantic-ui-react";

import "./PhotographyImage.scss";

function PhotographyImage(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(props.photoData.date);
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const newDate = month + ` ` + year.toString();
  return (
    <div className="single-image-container">
      <Image src={`https://adventures-archive.s3.amazonaws.com/${props.photoData.src}`} size={props.size} />
      <div className="image-overlay">
        <div className="image-text">
          <div className="image-location">{props.photoData.location}</div>
          <div className="image-date">{newDate}</div>
        </div>
      </div>
    </div>
  );
}

export default PhotographyImage;
