import axios from "axios";

export const handleLike = (id) => {
  return axios.get(`http://127.0.0.1:5000/post/likePost/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    },
  });
};

export const handleDisLike = (id) => {
  return axios.get(`http://127.0.0.1:5000/post/dislikePost/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    },
  });
};

export const handleComment = (id, comment) => {
  return axios.put(
    `http://127.0.0.1:5000/post/commentPost/${id}`,
    {
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    }
  );
};
