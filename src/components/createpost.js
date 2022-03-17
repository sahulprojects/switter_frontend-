import axios from "axios";
import { useNavigate } from "react-router";

const { useState } = require("react");

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:5000/post/createPost",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/myposts");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };
  return (
    <div className="top-mar">
      {error && (
        <div class="container alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div
        className="modal fade"
        id="createModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form
              onSubmit={handleSubmit}
              className="form-group container top-mar"
            >
              <div>
                <input
                  placeholder="Title"
                  required
                  id="exampleModalLabel"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="modal-title form-control border-custom"
                />

                <textarea
                  placeholder="Content"
                  required
                  id="exampleModalLabel"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="modal-title form-control border-custom"
                ></textarea>
              </div>
              <button className="btn button-clr">Post</button>{" "}
              <button
                onClick={() => {
                  navigate("/myposts");
                  window.location.reload();
                }}
                className="btn btn-dark float-right"
              >
                Go back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
