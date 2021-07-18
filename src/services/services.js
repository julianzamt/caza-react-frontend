import axios from "axios";

function postDocument({ title, subtitle, year, text, coverToUpload, imagesToUpload, section }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("subtitle", subtitle);
  formData.append("year", year);
  formData.append("text", text);
  formData.append("cover", coverToUpload);
  for (let image of imagesToUpload) {
    formData.append("images", image);
  }

  const token = localStorage.getItem("token");

  return axios.post(`http://localhost:5000/${section}`, formData, {
    headers: { "Content-Type": "multipart/form-data", "x-access-token": token },
  });
}

function updateCover({ coverToUpload, section, documentId }) {
  const formData = new FormData();
  formData.append("cover", coverToUpload);
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:5000/${section}/${documentId}/update-cover`, formData, {
    headers: { "Content-Type": "multipart/form-data", "x-access-token": token },
  });
}

function updateOrder({ images, documentId, section }) {
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:5000/${section}/${documentId}/update-order`, images, {
    headers: {
      "x-access-token": token,
    },
  });
}

function updateText({ title, subtitle, year, text, documentId, section }) {
  const data = {
    title: title,
    subtitle: subtitle,
    year: year,
    text: text,
  };
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:5000/${section}/${documentId}/update-text`, data, {
    headers: {
      "x-access-token": token,
    },
  });
}

function updateImages({ imagesToUpload, documentId, section }) {
  const formData = new FormData();
  for (let image of imagesToUpload) {
    formData.append("images", image);
  }
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:5000/${section}/${documentId}/update-images`, formData, {
    headers: { "Content-Type": "multipart/form-data", "x-access-token": token },
  });
}

function fetchCollection(section) {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:5000/${section}`, {
    headers: {
      "x-access-token": token,
    },
  });
}

function fetchDocument({ section, id }) {
  const token = localStorage.getItem("token");
  return axios.get(`http://localhost:5000/${section}/${id}`, {
    headers: {
      "x-access-token": token,
    },
  });
}

function deleteDocument({ section, documentId }) {
  const token = localStorage.getItem("token");
  return axios.delete(`http://localhost:5000/${section}/${documentId}`, {
    headers: {
      "x-access-token": token,
    },
  });
}

function deleteImage(section, documentId, imageId, key, coverFlag) {
  const token = localStorage.getItem("token");
  return axios.delete(
    `http://localhost:5000/${section}/images/${key}?section=${section}&documentId=${documentId}&imageId=${imageId}&coverFlag=${coverFlag}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
}

function updateCoversOrder({ section, collection }) {
  const token = localStorage.getItem("token");
  return axios.put(`http://localhost:5000/${section}/update-collection-order`, collection, {
    headers: {
      "x-access-token": token,
    },
  });
}

export {
  fetchCollection,
  fetchDocument,
  postDocument,
  deleteImage,
  deleteDocument,
  updateCover,
  updateText,
  updateImages,
  updateOrder,
  updateCoversOrder,
};
