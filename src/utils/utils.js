import axios from "axios";

export const handleLike = (id) => {
  return axios.get(`https://swittersahul.herokuapp.com/post/likePost/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    },
  });
};

export const handleDisLike = (id) => {
  return axios.get(`https://swittersahul.herokuapp.com/post/dislikePost/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
    },
  });
};

export const handleComment = (id, comment) => {
  return axios.put(
    `https://swittersahul.herokuapp.com/post/commentPost/${id}`,
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
