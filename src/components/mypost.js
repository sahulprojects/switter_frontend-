import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const MyPost = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
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
     
      {data.map((data) => {
        return (
          <div key={data._id} className="top-mar">
            <div className="card container border-card card-width">
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>

                <div class="d-flex flex-row">
                  {/* <h6 className="card-subtitle mb-2 text-muted p-2">Card subtitle</h6> */}
                  <h6 className="card-subtitle mb-2 text-muted p-2">
                    {data.date_posted}
                  </h6>
                </div>
                <p className="card-text">{data.content}</p>
                <button className="btn btn-like">
                  <i className="fa fa-thumbs-up"></i>
                </button>
                <button
                  className="btn btn-danger float-right m-1"
                  onClick={() => {
                    handleDelete(data._id);
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
                <Link
                  to="/updatemypost"
                  state={{ id: data._id }}
                  data-toggle="modal"
                  data-target="#updateModal"
                  className="btn btn-warning float-right m-1"
                >
                  Update
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
