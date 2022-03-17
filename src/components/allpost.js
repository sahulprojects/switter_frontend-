import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";

const AllPost = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
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
  }, []);

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
                  { <h6 className="card-subtitle mb-2 text-muted p-2">@{data.author_user}</h6> }
                  <h6 className="card-subtitle mb-2 text-muted p-2">
                    {data.date_posted}
                  </h6>
                </div>
                <p className="card-text">{data.content}</p>
                <button className="btn btn-like">
                  <i className="fa fa-thumbs-up"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPost;
