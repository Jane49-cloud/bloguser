import React from "react";
import { IconButton } from "@mui/material";
import { Favorite, Comment, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postProps } from "@/Interfaces/post";

interface Props {
  blog: postProps;
}

const BlogCard: React.FC<Props> = ({ blog }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <>
      <div
        className="col-md-5 bg-white"
        style={{
          maxWidth: "335px",
          height: "auto",
          marginTop: "20px",
          padding: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
          borderRadius: "10px",
          transition: "transform 0.3s ease-in-out", // Added transition property
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"; // Scale up on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; // Reset scale on hover out
        }}
        onClick={handleCardClick} // Fixed onClick handler
      >
        <div>
          <img
            src={`data:image/jpeg;base64,${blog.picturePath}`}
            className=""
            alt=""
            style={{
              width: "100%",
              height: "170px",
              margin: 0,
              padding: 0,
              borderTopRightRadius: "7px",
              borderTopLeftRadius: "7px",
              objectFit: "cover",
              position: "relative",
            }}
          />
        </div>
        {/* CARD BODY */}
        <div className="card-body m-2">
          <h6 style={{ fontSize: "18px", marginTop: "2px" }}>{blog.title}</h6>
          <p
            style={{ color: "gray", fontSize: "12px" }}
            className="p-container"
          >
            {blog.description}
          </p>
          <p>
            Author: {blog.firstName} {blog.lastName}
          </p>
        </div>
        {/* CARD FOOTER */}
        <div
          className="card-footer"
          style={{
            borderTop: "1px solid #ccc",
            padding: "8px 16px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "whitesmoke",
            borderTopRightRadius: "7px",
            borderTopLeftRadius: "7px",
            borderRadius: "7px",
          }}
        >
          <div>
            <IconButton size="small" style={{ backgroundColor: "#e2e8f0" }}>
              <Favorite />
            </IconButton>
            <span>20</span>
          </div>
          <div>
            <IconButton size="small" style={{ backgroundColor: "#e2e8f0" }}>
              <Comment />
            </IconButton>
            <span>3</span>
          </div>
          <div>
            <IconButton size="small" style={{ backgroundColor: "#e2e8f0" }}>
              <Visibility />
            </IconButton>
            <span>Read</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
