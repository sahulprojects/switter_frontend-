import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "../index.css";

const MyPost = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/post/myPosts", {
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
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/post/deleteMyPost/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      })
      .then((res) => {
        console.log("deleted");
      })
      .catch((er) => console.log(er));
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
          create a swit  <i class="fa fa-twitter" aria-hidden="true"></i>
        </button>
      </div>

      {data.map((data) => {
        return (
          <div key={data._id} className="top-mar">
            <div className="card container border-card card-width">
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.content}</p>
                <small
                  className="card-subtitle mb-2 text-muted p-2"
                  style={{ fontSize: "13px" }}
                >
                  {data.date_posted}
                </small>
                <button
                  className="btn btn-like float-right m-1"
                  onClick={() => {
                    handleDelete(data._id);
                    window.location.reload();
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
