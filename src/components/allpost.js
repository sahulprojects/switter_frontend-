import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";

const AllPost = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/post/allPosts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      });
      const data = res.data;
      console.log(data);
      setData(data);
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  }, [likedUsers]);

  const handleLike = async (id) => {
    axios
      .get(`http://127.0.0.1:5000/post/likePost/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => {
        // window.location.reload(false)
        console.log(res, "likin data");
        setLikedUsers(res.data.liked_users);
      })
      .catch((err) => console.log(err));
  };

  const handleDisLike = async (id) => {
    axios
      .get(`http://127.0.0.1:5000/post/dislikePost/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => {
        // window.location.reload(false)
        console.log(res, "likin data");
        setLikedUsers(res.data.disliked_users);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {error && (
        <div class="container alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {data.map((data) => {
        return (
          <div key={data._id} className="top-mar">
            <div className="card container border-card card-width">
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>

                <h6 className="card-subtitle mb-2 text-muted p-2">
                  @{data.author_user}
                </h6>

                <p className="card-text">{data.content}</p>
                <button
                  onClick={() => {
                    handleLike(data._id);
                  }}
                  className="btn btn-like"
                >
                  <i className="fa fa-thumbs-up"></i>
                </button>
                <p className="card-subtitle d-inline  text-muted ">
                  {data.liked_users.length}
                </p>
                <button
                  onClick={() => {
                    handleDisLike(data._id);
                  }}
                  className="btn btn-like"
                >
                  <i className="fa fa-thumbs-down"></i>
                </button>
                <p className="card-subtitle d-inline text-muted">
                  {data.disliked_users.length}
                </p>
                <small
                  className="card-subtitle d-block mb-2 text-muted p-2"
                  style={{ fontSize: "13px" }}
                >
                  {data.date_posted}
                </small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPost;
