import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const { useState } = require("react");

const UpdatePost = () => {
  const [content, setContent] = useState("");
  const Location = useLocation();
  const navigate = useNavigate();
  const { id } = Location.state;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://127.0.0.1:5000/post/updateMyPost/${id}`,
        {
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
      .catch((err) => console.log(err));
  };
  return (
    <div className="top-mar">
      <div
        className="modal fade"
        id="updateModal"
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
                <textarea
                  placeholder="Content"
                  required
                  id="exampleModalLabel"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="modal-title form-control border-custom"
                ></textarea>
              </div>
              <button className="btn button-clr">update</button>
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

export default UpdatePost;
