import axiosService from "@/Helpers/axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser } from "@/hooks/user.actions";

interface AddBlogProps {}

const AddBlog: React.FC<AddBlogProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [picturePath, setpicturePath] = useState("");

  const [loggedUser, setLoggedUser] = useState<any>(getUser());
  const userId = loggedUser.id;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handlepicturePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setpicturePath(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Handle form submission here
    const data = {
      title,
      description,
      topic,
      content,
      picturePath,
    };

    console.log(data);
    axiosService
      .post("/posts/create", { ...data, userId: userId }) // Replace "/api/create-blog" with your actual API endpoint
      .then((response: any) => {
        // Handle successful response
        console.log(response.data);
        // Reset form fields
        setTitle("");
        setDescription("");
        setTopic("");
        setContent("");
        setpicturePath("");
      })
      .catch((error: any) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2>Add Blog</h2>
      <form
        onSubmit={handleSubmit}
        className="form rounded border p-3 shadow-sm"
        style={{ maxWidth: "60rem", marginBottom: "20px" }}
      >
        <div className="mb-3">
          <label htmlFor="picturePath" className="form-label">
            Cover Image
          </label>
          <input
            type="file"
            className="form-control"
            id="picturePath"
            onChange={handlepicturePathChange}
          />
        </div>
        {picturePath && (
          <div className="mb-3">
            <img src={picturePath} alt="Cover" style={{ width: "100%" }} />
          </div>
        )}
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
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <ReactQuill value={content} onChange={handleContentChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
