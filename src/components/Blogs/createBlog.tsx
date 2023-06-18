import React, { useState, ChangeEvent, FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosService from "@/Helpers/axios";
import { getUser } from "@/hooks/user.actions";
import { useNavigate } from "react-router-dom";

interface AddBlogProps {}

const AddBlog: React.FC<AddBlogProps> = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [picturePath, setPicturePath] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [loggedUser] = useState<any>(getUser());
  const userId = loggedUser.id;
  const [isPosting, setIsPosting] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTopicChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value);
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
    setIsPosting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("topic", topic);
      formData.append("content", content);
      formData.append("userId", userId);
      if (picturePath) {
        formData.append("picture", picturePath);
        formData.append("picturePath", picturePath.name);
      }

      const response = await axiosService.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          userId: userId, // Pass the userId as a parameter
        },
      });

      // Handle successful response
      console.log(response.data);

      // Reset form fields
      setTitle("");
      setDescription("");
      setTopic("");
      setContent("");
      setPicturePath(null);
      setPicturePreview(null);

      setIsPosting(false);
      navigate("/");
    } catch (error) {
      // Handle error
      console.error(error);
      setIsPosting(false);
    }
  };

  return (
    <div className="container">
      <h2>Add Blog</h2>
      <form
        onSubmit={handleSubmit}
        className="form rounded border p-3 shadow-sm"
        style={{ maxWidth: "60rem", marginBottom: "20px" }}
      >
        {/* Picture Path */}
        <div className="mb-3">
          <label htmlFor="picturePath" className="form-label">
            Cover Image
          </label>
          <input
            type="file"
            className="form-control"
            id="picturePath"
            onChange={handlePicturePathChange}
          />
        </div>
        {/* Picture Preview */}
        {picturePreview && (
          <div className="mb-3">
            <img src={picturePreview} alt="Cover" style={{ width: "100%" }} />
          </div>
        )}
        {/* Title and Topic */}
        <div className="row">
          <div className="col">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="topic" className="form-label">
              Topic
            </label>
            <select
              className="form-select"
              id="topic"
              value={topic}
              onChange={handleTopicChange}
            >
              <option value="">Select Topic</option>
              <option value="Blogging">Blogging</option>
              <option value="Technology">Technology</option>
              <option value="AI (Artificial Intelligence)">
                AI (Artificial Intelligence)
              </option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
            </select>
          </div>
        </div>
        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        {/* Content */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <ReactQuill
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Write something amazing..."
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={isPosting}>
          {isPosting ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
