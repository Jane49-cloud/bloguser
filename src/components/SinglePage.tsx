import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import avatar from "../assets/avatar.png";
import { getUser } from "@/hooks/user.actions";
import CustomPrimaryButton from "@/Custom/CustomButton";
import Modal from "@/Custom/Modal";
import axiosService from "@/Helpers/axios";
import Toaster from "@/Custom/Toaster";
import CustomLoader from "@/Custom/CustomLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  getSinglePostFetch,
  getSinglePostSuccess,
  deletePostFetch, // Added deletePostFetch action
} from "@/redux/postState";

const SinglePage = () => {
  const { id = "" } = useParams();
  const singlePost = useSelector((state: any) => state.posts.singlePost);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [, setIsSaving] = useState(false);
  const [toaster, setToaster] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [picturePath, setPicturePath] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const loggedUser = getUser();

  useEffect(() => {
    dispatch(getSinglePostFetch(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePost) {
      setTitle(singlePost.title);
      setDescription(singlePost.description);
      setContent(singlePost.content);
    }
  }, [singlePost]);

  const handleEdit = () => {
    setIsEditing(true);
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
        formData.append("picture", picturePath);
        formData.append("picturePath", picturePath.name);
      }
      console.log("Form Data:", formData);

      const response = await axiosService.patch(`/posts/${id}`, formData);

      console.log("Response:", response);
      console.log(formData);

      if (response.status === 200) {
        const updatedPost = {
          ...singlePost!,
          title,
          description,
          content,
        };
        dispatch(getSinglePostSuccess(updatedPost));
        setIsEditing(false);
        setToaster(true);
        navigate("/home");

        console.log("Updated Post:", updatedPost);
      } else {
        throw new Error("Failed to update post");
      }
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

  const handleDelete = async () => {
    try {
      const response = await axiosService.delete(`/posts/${id}`);
      if (response.status === 200) {
        // Dispatch the deletePostFetch action to trigger the saga
        dispatch(deletePostFetch(id));
        console.log("Post delete action dispatched");
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    navigate("/home");
  };

  if (!singlePost) {
    return (
      <div>
        <CustomLoader />{" "}
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="user-header">
          <div className="row">
            <div className="col-md-2">
              <img
                src={
                  singlePost.userPicturePath
                    ? `data:image/jpeg;base64,${singlePost.userPicturePath}`
                    : avatar
                }
                alt="writer"
              />
            </div>
            <div className="col" style={{ padding: "10px" }}>
              <p>
                By: {singlePost.firstName} {singlePost.lastName}
              </p>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Delectus consequatur id atque, dicta officia saepe. Unde,
                  repellat impedit. Neque dolores cumque mini.{" "}
                  <Link to={`/user_profile/${singlePost.userId}`}>
                    View Profile
                  </Link>
                </p>
                Date posted: {new Date(singlePost.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="blog-reader"
          encType="multipart/form-data"
        >
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
        <div className="blog row  mx-auto gap-5">
          <div className="blog-reader col p-5">
            <h1>{singlePost.title}</h1>
            <p>{singlePost.description}</p>
            <div className="cover-image">
              <img
                src={`https://bloghub-p25a.onrender.com/assets/${singlePost.picturePath}`}
                alt="Cover"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: singlePost.content }}
              className="ql-editor"
            />
            {loggedUser && loggedUser.id === singlePost.userId && (
              <div>
                <CustomPrimaryButton
                  onClick={handleEdit}
                  className="bg-success"
                >
                  Edit
                </CustomPrimaryButton>
                <CustomPrimaryButton
                  onClick={handleDelete}
                  className="bg-danger ml-3"
                >
                  Delete
                </CustomPrimaryButton>
              </div>
            )}
          </div>
        </div>
      )}
      {toaster && (
        <Toaster
          message="Post updated successfully"
          onClose={() => setToaster(false)}
        />
      )}
    </div>
  );
};

export default SinglePage;
