import React from "react";

const NewsItems = (props)=>{
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div>
        <div className="card mx-5" style={{ width: "18rem" }}>
        <div style={{display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0'
              }}>
                <span className="badge rounded-pill bg-danger">
              {source}</span>
            </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://wallpaperaccess.com/full/2112558.jpg"
            }
            className="card-img-top"
            alt={title ? title : "News image"}
          />
          <div className="card-body">
            <h5 className="card-title">
              {title ? title : "No Title Available"}
            </h5>
            <p className="card-text">
              {description
                ? description
                : "Get the detailed information by going to the following link"}
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItems;
