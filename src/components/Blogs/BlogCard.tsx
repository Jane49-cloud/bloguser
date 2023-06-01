import React from "react";
import { CardActions, IconButton } from "@mui/material";
import { Favorite, Comment, Event, Visibility } from "@mui/icons-material";

interface Props {
  blog: Blog;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  // Add any other properties here
}

const BlogCard: React.FC<Props> = ({ blog }) => {
  return (
    <>
      <div
        className=" bg-white"
        style={{
          maxWidth: "335px",
          height: "350px",
          margin: 0,
          padding: 0,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
          marginLeft: "5px",
          borderRadius: "10px",
        }}
      >
        <div>
          <img
            src="https://www.mlyearning.org/ezoimgfmt/i0.wp.com/www.mlyearning.org/wp-content/uploads/2023/04/Who-Owns-Chat-Gpt.jpg?resize=1024%2C576&ssl=1&ezimgfmt=ng:webp/ngcb1"
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
          <p style={{ color: "gray", fontSize: "12px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            pellentesque volutpa
          </p>
          <p>Author: {blog.author}</p>
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

          {/* <div>
            <IconButton size="small">
              <Event />
            </IconButton>
            <span>2days ago</span>
          </div> */}

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
