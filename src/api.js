import dummyAdventures from "./data/dummy-adventures.json";
import dummyPhotos from "./data/dummy-photos.json";
import dummyCategories from "./data/dummy-categories.json";
import dummyTags from "./data/dummy-tags.json";
import dummyDraftAdventures from "./data/dummy-drafts.json";
import dummyDraftPhotos from "./data/dummy-draft-photos.json";
import Cookies from "js-cookie";

const dummyData = false;

const getAdventures = async (postView = false) => {
  const url = "http://52.91.134.225/services/quest/adventures/";
  let data;
  if (dummyData) {
      data = dummyAdventures;
  } else {
    const response = await fetch(url, { method: "GET" });
    data = await response.json();
  }
  return postView ? data.filter(val => val.draft) : data.filter(val => !val.draft);
};

const queryForAdventures = async (query = "") => {
  const url = "http://52.91.134.225/services/quest/adventures/search";
  let data;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  data = await response.json();
  return data.filter(val => val.draft);
};

const getPhotos = async (photoView = false) => {
  const url = "http://52.91.134.225/services/quest/photos/";
  let data;
  if (dummyData) {
      data = dummyPhotos;
  } else {
    const response = await fetch(url, { method: "GET" });
    data = await response.json();
  }
  return photoView ? data : data.filter(val => !val.draft);
};

const getUploadedPhotos = async () => {
    const url = "http://52.91.134.225/services/quest/photos/uploaded";
    let data;
    if (dummyData) {
        data = dummyPhotos;
    } else {
      const response = await fetch(url, { 
          method: "GET",
        });
      data = await response.json();
    }
    return data;
  };

const getCategories = async () => {
  const url = "http://52.91.134.225/services/quest/adventures/categories";
  let data;
  if (dummyData) {
      data = dummyCategories;
  } else {
    const response = await fetch(url, { method: "GET" });
    data = ['Travel',
        'Food',
        'Adventures Close to Home',
        'Asia',
        'North America',
        'Film',
        'Activities',
        'Europe'
    ];
  }
  return data;
};

const getTags = async () => {
  const url = "http://52.91.134.225/services/quest/adventures/tags";
  let data;
  if (dummyData) {
      data = dummyTags;
  } else {
    const response = await fetch(url, { method: "GET" });
    data = [
        'Museum',
        'Art',
        'Nature',
        '2021',
        '2020',
        '2019',
        'Film',
        'Digital',
        'Coffee',
        'Cars',
        'Gardens',
        'Cherry Blossoms',
        'Fall',
        'Spring',
        'Summer',
        'Winter'
    ];
  }
  return data;
};

const getDraftAdventures = async () => {
  const url = "http://52.91.134.225/services/quest/adventures/drafts";
  let data;
  if (dummyData) {
    data = dummyDraftAdventures;
  } else {
    const response = await fetch(url, { method: "GET" });
    data = await response.json();
  }
  return data.filter(val => val.draft);
};

const getDraftPhotos = async () => {
  const url = "http://52.91.134.225/services/quest/photos/drafts";
  let data;
  if (dummyData) {
    data = dummyDraftPhotos;
  } else {
    const response = await fetch(url, { method: "GET" });
    data = await response.json();
  }
  return data.filter(val => val.draft);
};

const publishAdventure = async (adventure) => {
  const url = "http://52.91.134.225/services/quest/adventures/";
  let data;
  if (dummyData) {
      data = { result: 'successful publish', adventure: adventure };
  } else {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("refresh_token")}`,
        },
        body: JSON.stringify(adventure),
    });
    data = await response.json();
  }
  return data;
};

const publishPhoto = async (photo) => {
  const url = "http://52.91.134.225/services/quest/photos/";
  let data;
  if (dummyData) {
      data = { result: 'successful publish', photo: photo };
  } else {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("refresh_token")}`,
        },
        body: JSON.stringify(photo),
    });
    data = await response.json();
  }
  return data;
};

const updateAdventure = async (adventure) => {
  const url = `http://52.91.134.225/services/quest/adventures/${adventure.id}`;
  let data;
  if (dummyData) {
      data = { result: 'successful update', adventure: adventure };
  } else {
    const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("refresh_token")}`,
        },
        body: JSON.stringify(adventure),
    });
    data = await response.json();
  }
  return data;
};

const updatePhoto = async (photo) => {
  const url = `http://52.91.134.225/services/quest/photos/${photo.id}`;
  let data;
  if (dummyData) {
      data = { result: 'successful update', photo: photo };
  } else {
    const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("refresh_token")}`,
        },
        body: JSON.stringify(photo),
    });
    data = await response.json();
  }
  return data;
};

const deleteAdventure = async (adventure) => {
  const url = "";
  let data;
  if (dummyData) {
    data = { result: "successful delete", adventure: adventure };
  } else {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adventure),
    });
    data = await response.json();
  }
  return data;
};

const deletePhoto = async (photo) => {
  const url = "";
  let data;
  if (dummyData) {
    data = { result: "successful delete", photo: photo };
  } else {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photo),
    });
    data = await response.json();
  }
  return data;
};

const loginAdmin = async (props) => {
  const url = "http://52.91.134.225/services/quest/admin/login";
  let data;
  if (dummyData) {
      data = { result: 'successful publish', adventure: adventure };
  } else {
    const response = await fetch(url, {
        credentials: "include",

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props),
    });
    data = await response.json();
    Cookies.set('access_token', data.access_token );
    Cookies.set('refresh_token', data.refresh_token);
  }
  return data;
};

const refreshLogin = async (accessToken) => {
  const url = "http://52.91.134.225/services/quest/admin/refresh";
  let data;
  if (dummyData) {
      data = { result: 'successful publish', adventure: adventure };
  } else {
    const response = await fetch(url, {
        credentials: "include",
        method: "POST",
        headers: {
        "Authorization": `Bearer ${Cookies.get("refresh_token")}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    });
    data = await response.json();
  }
  return data;
};

export {
  getAdventures,
  getPhotos,
  getCategories,
  getTags,
  getDraftAdventures,
  getDraftPhotos,
  publishAdventure,
  publishPhoto,
  updateAdventure,
  updatePhoto,
  deleteAdventure,
  deletePhoto,
  queryForAdventures,
  loginAdmin,
  refreshLogin,
  getUploadedPhotos,
};
