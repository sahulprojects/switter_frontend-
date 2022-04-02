import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "../index.css";
import { handleLike, handleDisLike, handleComment } from "../utils/utils";

const MyPost = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDisLikedUsers] = useState([]);
  const [comment, setComment] = useState("");
  const [totalComment, setTotalComment] = useState([]);
  const navigate = useNavigate();
  useEffect(async () => {
    try {
      const res = await axios.get(
        "https://swittersahul.herokuapp.com/post/myPosts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      );
      const data = res.data;
      setData(data);
    } catch (err) {
      setError(err.response.data);
    }
  }, [likedUsers, dislikedUsers, totalComment]);

  const handleDelete = (id) => {
    axios
      .delete(`https://swittersahul.herokuapp.com/post/deleteMyPost/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => {
        navigate("/myposts");
        window.location.reload();
      })
      .catch();
  };

  return (
    <div>
      {error && (
        <div class="container alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="container">
        <button
          className="btn btn-swit"
          data-toggle="modal"
          data-target="#createModal"
          onClick={() => navigate("/createPost")}
        >
          create a swit <i class="fa fa-twitter" aria-hidden="true"></i>
        </button>
      </div>

      {data.map((data) => {
        return (
          <div key={data._id} className="top-mar">
            <div className="card container border-card card-width">
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.content}</p>
                <button
                  onClick={() => {
                    handleLike(data._id)
                      .then((res) => {
                        setLikedUsers(res.data.liked_users);
                      })
                      .catch(() => {});
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
                    handleDisLike(data._id)
                      .then((res) => {
                        setDisLikedUsers(res.data.disliked_users);
                      })
                      .catch(() => {});
                  }}
                  className="btn btn-like"
                >
                  <i className="fa fa-thumbs-down"></i>
                </button>
                <p className="card-subtitle d-inline text-muted">
                  {data.disliked_users.length}
                </p>
                <button
                  className="btn btn-like shadow-none"
                  data-toggle="collapse"
                  data-target={"#" + data._id}
                  aria-expanded="true"
                  aria-controls="comment"
                >
                  <i class="fa fa-comment"></i>
                  <p className="card-subtitle d-inline small text-muted">
                    {" "}
                    {data.comments.length} comments
                  </p>
                </button>
                {/* here it is dynamic id */}
                <div class="collapse multi-collapse" id={data._id}>
                  <div class="card card-body">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleComment(data._id, comment).then((res) => {
                          setTotalComment(res.data.comments);
                        });
                        setComment("");
                      }}
                      className="comment-form"
                    >
                      <textarea
                        class="form-control comment-area shadow-none"
                        rows="3"
                        placeholder="share your thoughts.."
                        required
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      ></textarea>
                      <button class="float-right btn btn-like" type="submit">
                        <i
                          class="fa fa-send-o"
                          style={{ fontSize: "20px", color: "blue" }}
                        ></i>
                      </button>
                    </form>
                    {data.comments.map((com) => {
                      return (
                        <div key={com._id} className="mt-3">
                          <h6 className="card-subtitle mb-2 text-muted p-2">
                            @{com.username}
                          </h6>
                          <h6 className="card-subtitle ml-4">{com.comment}</h6>
                        </div>
                      );
                    })}
                    <span
                      className="btn text-dark float-right"
                      data-toggle="collapse"
                      data-target={"#" + data._id}
                      aria-expanded="false"
                      aria-controls="comment"
                    >
                      <i class="fa fa-times" aria-hidden="true">
                        {" "}
                        close comments
                      </i>
                    </span>
                  </div>
                </div>
                <br />
                <small
                  className="mb-2 text-muted p-2"
                  style={{ fontSize: "13px" }}
                >
                  {data.date_posted}
                </small>
                <button
                  className="btn btn-like float-right m-1"
                  onClick={() => {
                    handleDelete(data._id);
                  }}
                >
                  <i
                    className="fa fa-trash text-danger"
                    style={{ fontSize: "23px" }}
                    u
                  ></i>
                </button>
                <Link
                  to="/updatemypost"
                  state={{ id: data._id }}
                  data-toggle="modal"
                  data-target="#updateModal"
                  className="btn btn-like float-right m-1"
                >
                  <i
                    className="fa fa-edit text-success"
                    style={{ fontSize: "22px" }}
                  ></i>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPost;
