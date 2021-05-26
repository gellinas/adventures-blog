import { useEffect, useState } from "react";
import { Statistic } from "semantic-ui-react";

import { getAdventures, getPhotos } from "../../../api.js";

import "./Dashboard.scss";

function Dashboard(props) {
  const [adventureData, setAdventureData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [adventurePosts, setAdventurePosts] = useState([]);
  const [adventureDrafts, setAdventureDrafts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [photoDrafts, setPhotoDrafts] = useState([]);

  useEffect(async () => {
    setAdventureData(await getAdventures());
    setPhotoData(await getPhotos());
  }, []);

  useEffect(() => {
    getAdventureDrafts();
    getAdventurePosts();
    getTotalPhotoDrafts();
    getTotalPhotos();
  }, [adventureData, photoData]);

  const getAdventureDrafts = () => {
    const totalAdventureDrafts = adventureData.filter((adventure) => {
      if (adventure.draft) {
        return true;
      }
    });
    setAdventureDrafts(totalAdventureDrafts);
  };

  const getAdventurePosts = () => {
    const totalAdventurePosts = adventureData.filter((adventure) => {
      if (!adventure.draft) {
        return true;
      }
    });
    setAdventurePosts(totalAdventurePosts);
  };

  const getTotalPhotoDrafts = () => {
    const totalPhotoDrafts = photoData.filter((photo) => {
      if (photo.draft) {
        return true;
      }
    });
    setPhotoDrafts(totalPhotoDrafts);
  };

  const getTotalPhotos = () => {
    const totalPhotos = photoData.filter((photo) => {
      if (!photo.draft) {
        return true;
      }
    });
    setPhotos(totalPhotos);
  };

  return (
    <div className="dashboard-component-container">
      <div className="dashboard-header">Dashboard</div>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{adventurePosts.length}</Statistic.Value>
          <Statistic.Label>Adventure Posts</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{adventureDrafts.length}</Statistic.Value>
          <Statistic.Label>Adventure Drafts</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{photos.length}</Statistic.Value>
          <Statistic.Label>Published Photos</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{photoDrafts.length}</Statistic.Value>
          <Statistic.Label>Photography Drafts</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </div>
  );
}

export default Dashboard;
