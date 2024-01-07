import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Favorite, Comment, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postProps } from "@/Interfaces/post";
// import { getUser } from '@/hooks/user.actions';
import axiosService from "@/Helpers/axios";

interface Props {
  blog: postProps;
}

const BlogCard: React.FC<Props> = ({ blog }) => {
  const navigate = useNavigate();
  const loggedUserId = 1;
  const [likes, setLikes] = useState<number>(blog?.likes?.length || 0);

  const handleCardClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  const handleLikeClick = async () => {
    try {
      const response = await axiosService.post(
        `http://localhost/8000/api/v1/posts/${blog.id}/like`,
        {
          userId: loggedUserId,
        }
      );
      const updatedLikes = response.data.likes.length;
      setLikes(updatedLikes);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div
      className="col-md-5 mt-[10px] flex w-[335px] max-w-[335px] flex-col rounded-[8px]"
      style={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onClick={handleCardClick}
    >
      <div>
        <img
          src={blog?.image}
          className="h-[170px] w-[100%] rounded-t-[8px] object-cover object-center"
          alt=""
        />
      </div>
      {/* CARD BODY */}
      <div className="card-body m-2 flex h-[150px] flex-col">
        <h6 className="fs-6">{blog.title}</h6>
        <p className="text-muted  line-clamp-2">{blog.description}</p>
        <p className="text-muted">
          Author: {blog?.writer?.firstName} {blog?.writer.lastName}
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
          <IconButton
            size="small"
            style={{ backgroundColor: "#e2e8f0" }}
            onClick={handleLikeClick}
          >
            <Favorite style={{ color: "#ea580c" }} />
          </IconButton>
          <span>{likes}</span>
        </div>
        <div>
          <IconButton size="small" style={{ backgroundColor: "#e2e8f0" }}>
            <Comment style={{ color: "#2563eb" }} />
          </IconButton>
          {/* <span>{blog?.comments.length}</span> */}
        </div>
        <div>
          <IconButton size="small" style={{ backgroundColor: "#e2e8f0" }}>
            <Visibility />
          </IconButton>
          <span>Read</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
