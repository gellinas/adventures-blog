import { useEffect, useState } from "react";
import { Statistic } from "semantic-ui-react";

import { getAdventures, getDraftAdventures, getDraftPhotos, getPhotos } from "../../../api.js";

import "./Dashboard.scss";

function Dashboard(props) {
  const [adventureData, setAdventureData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [draftAdventureData, setDraftAdventureData] = useState([]);
  const [draftPhotoData, setDraftPhotoData] = useState([]);
  // const [adventurePosts, setAdventurePosts] = useState([]);
  // const [adventureDrafts, setAdventureDrafts] = useState([]);
  // const [photos, setPhotos] = useState([]);
  // const [photoDrafts, setPhotoDrafts] = useState([]);

  useEffect(async () => {
    setAdventureData(await getAdventures());
    setPhotoData(await getPhotos());
    setDraftAdventureData(await getDraftAdventures());
    setDraftPhotoData(await getDraftPhotos());
  }, []);

  // useEffect(() => {
  //   getAdventureDrafts();
  //   getAdventurePosts();
  //   getTotalPhotoDrafts();
  //   getTotalPhotos();
  // }, [adventureData, photoData]);

  // const getAdventureDrafts = () => {
  //   const totalAdventureDrafts = adventureData.filter((adventure) => {
  //     if (adventure.draft) {
  //       return true;
  //     }
  //   });
  //   setAdventureDrafts(totalAdventureDrafts);
  // };

  // const getAdventurePosts = () => {
  //   const totalAdventurePosts = adventureData.filter((adventure) => {
  //     if (!adventure.draft) {
  //       return true;
  //     }
  //   });
  //   setAdventurePosts(totalAdventurePosts);
  // };

  // const getTotalPhotoDrafts = () => {
  //   const totalPhotoDrafts = photoData.filter((photo) => {
  //     if (photo.draft) {
  //       return true;
  //     }
  //   });
  //   setPhotoDrafts(totalPhotoDrafts);
  // };

  // const getTotalPhotos = () => {
  //   const totalPhotos = photoData.filter((photo) => {
  //     if (!photo.draft) {
  //       return true;
  //     }
  //   });
  //   setPhotos(totalPhotos);
  // };

  return (
    <div className="dashboard-component-container">
      <div className="dashboard-header">Dashboard</div>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{adventureData.length}</Statistic.Value>
          <Statistic.Label>Adventure Posts</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{draftAdventureData.length}</Statistic.Value>
          <Statistic.Label>Adventure Drafts</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{photoData.length}</Statistic.Value>
          <Statistic.Label>Published Photos</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{draftPhotoData.length}</Statistic.Value>
          <Statistic.Label>Photography Drafts</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </div>
  );
}

export default Dashboard;
