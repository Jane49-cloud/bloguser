import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import avatar from "../assets/avatar.png";
import { getUser } from "@/hooks/user.actions";
import CustomPrimaryButton from "@/Custom/CustomButton";

interface Post {
  id: string;
  title: string;
  content: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  userPicturePath: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  // Add more fields as needed
}

interface Props {}

const SinglePage = (props: Props) => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picturePath, setPicturePath] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<any>(getUser());

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/posts/${id}`
        );
        const data = response.data as Post;
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    getPost();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    setTitle(post?.title || "");
    setContent(post?.content || "");
    setPicturePath(null);
    setPicturePreview(null);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handlePicturePathChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPicturePath(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const updatedPost = { ...post, title, content };
      const formData = new FormData();
      formData.append("title", updatedPost.title);
      formData.append("content", updatedPost.content);
      if (picturePath) {
        formData.append("picture", picturePath);
      }

      const response = await axios.put(
        `http://localhost:8000/api/v1/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data as Post;
      setPost(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="user-header ">
          <div className="row">
            <div className="col-md-2">
              <img
                src={
                  post?.userPicturePath
                    ? `data:image/jpeg;base64,${post.userPicturePath}`
                    : avatar
                }
                alt="writer"
              />
            </div>
            <div className="col" style={{ padding: "10px" }}>
              <p>
                By: {post?.firstName} {post?.lastName}
              </p>
              <div>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Delectus consequatur id atque, dicta officia saepe. Unde,
                  repellat impedit. Neque dolores cumque mini.{" "}
                  <Link to={`/user_profile/${post?.userId}`}>
                    {" "}
                    View Profile
                  </Link>
                </p>
                Date posted: {post && new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="blog-reader">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              placeholder="Write something amazing..."
            />
          </div>
          <div>
            <label htmlFor="picturePath">Cover Image:</label>
            <input
              type="file"
              id="picturePath"
              onChange={handlePicturePathChange}
            />
          </div>
          {picturePreview && (
            <div>
              <img src={picturePreview} alt="Preview" />
            </div>
          )}
          <button type="submit">Save</button>
        </form>
      ) : (
        post && (
          <div className="blog row mx-auto gap-5">
            <div className="blog-reader col-md-8">
              <h1>{post.title}</h1>
              <div>
                <img
                  src={`data:image/jpeg;base64,${post.picturePath}`}
                  alt="Cover"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <div>
                {post?.userId === loggedUser?.id ? (
                  <div className="row m-10 gap-3 " style={{ padding: "10px" }}>
                    <CustomPrimaryButton
                      onClick={handleEdit}
                      className="col-md-2 "
                    >
                      Edit
                    </CustomPrimaryButton>
                    <CustomPrimaryButton className="col-md-2 bg-danger">
                      Delete
                    </CustomPrimaryButton>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="other-blogs col-md-3">
              <h5>Other Blogs</h5>

              <div>
                <a href="#">The power of AI</a>
              </div>
              <div>
                <a href="#">The power of AI</a>
              </div>
              <div>
                <a href="#">The power of AI</a>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SinglePage;
