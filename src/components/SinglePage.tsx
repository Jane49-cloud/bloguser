import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import avatar from "../assets/avatar.png";
import { getUser } from "@/hooks/user.actions";
import CustomPrimaryButton from "@/Custom/CustomButton";
import Modal from "@/Custom/Modal";

interface Post {
  id: string;
  title: string;
  description: string;
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

const SinglePage = () => {
  const { id = "" } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [picturePath, setPicturePath] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const loggedUser = getUser();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/posts/${id}`
        );
        const data = await response.json();
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
    setDescription(post?.description || "");
    setContent(post?.content || "");
    setPicturePath(null);
    setPicturePreview(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      if (picturePath) {
        formData.append("picturePath", picturePath);
      }

      await fetch(`http://localhost:8000/api/v1/posts/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
      });

      const updatedPost = { ...post, title, description, content };
      setPost(updatedPost);
      setIsEditing(false);

      console.log(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSaving(false);
    }
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

  return (
    <div>
      <div>
        <div className="user-header">
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Delectus consequatur id atque, dicta officia saepe. Unde,
                  repellat impedit. Neque dolores cumque mini.{" "}
                  <Link to={`/user_profile/${post?.userId}`}>View Profile</Link>
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
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
              <img
                src={picturePreview}
                alt="Preview"
                className="preview-image"
              />
            </div>
          )}
          <CustomPrimaryButton type="submit" className="bg-primary">
            Save
          </CustomPrimaryButton>
        </form>
      ) : (
        post && (
          <div className="blog row mx-auto gap-5">
            <div className="blog-reader col-md-8">
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <div className="cover-image">
                <img
                  src={`data:image/jpeg;base64,${post.picturePath}`}
                  alt="Cover"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <div>
                {post?.userId === loggedUser?.id && (
                  <div className="row m-10 gap-3 " style={{ padding: "10px" }}>
                    <CustomPrimaryButton
                      onClick={handleEdit}
                      className="col-md-2"
                    >
                      Edit
                    </CustomPrimaryButton>
                    <CustomPrimaryButton className="col-md-2 bg-danger">
                      Delete
                    </CustomPrimaryButton>
                  </div>
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
      {isSaving && (
        <Modal>
          <div>Saving changes...</div>
        </Modal>
      )}
    </div>
  );
};

export default SinglePage;
