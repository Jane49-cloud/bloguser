import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosService from "@/Helpers/axios";
import CustomPrimaryButton from "@/Custom/CustomButton";
import { useDispatch } from "react-redux";
import { setLoader } from "@/redux/LoaderSlice";
import { getPost } from "@/hooks/post.actions";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postProps } from "@/Interfaces/post";

const EditPostPage = () => {
  const { id = "" } = useParams();
  const [singlePost, setSinglePost] = useState<postProps | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [picturePath, setPicturePath] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response: any = await getPost(id);
      dispatch(setLoader(false));
      if (response.success) {
        setSinglePost(response.data);
        toast.success("Post fetched successfully...");
      }
    } catch (error) {
      toast.error("error fetching post...");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setShowModal(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);

      if (picturePath) {
        formData.append("picture", picturePath);
        formData.append("picturePath", picturePath.name);
      }

      const response = await axiosService.patch(`/posts/${id}`, formData);

      if (response.status === 200) {
        const updatedPost = {
          ...singlePost!,
          title,
          description,
          content,
        };
        setSinglePost(updatedPost);
        navigate("/home");
        toast.success("Post updated successfully");
      } else {
        throw new Error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    } finally {
      setShowModal(false);
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

  const handleCancel = () => {
    navigate("/home");
  };

  if (!singlePost) {
    return <div>No post found.</div>;
  }

  return (
    <div className="blog mx-auto mt-2">
      <form
        onSubmit={handleSubmit}
        className="blog-reader"
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="picturePath" className="form-label">
            Cover Image:
          </label>
          <input
            className="form-control"
            type="file"
            id="picturePath"
            onChange={handlePicturePathChange}
          />
        </div>
        {picturePreview && (
          <div>
            <img src={picturePreview} alt="Preview" className="preview-image" />
          </div>
        )}
        <div>
          <label htmlFor="title" className="form-label mt-2">
            Title:
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="form-label m-2">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content" className="form-label mt-2">
            Content:
          </label>
          <ReactQuill
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="Write something amazing..."
          />
        </div>

        <div className="m-3">
          <CustomPrimaryButton type="submit" className="bg-primary">
            Save
          </CustomPrimaryButton>{" "}
          <CustomPrimaryButton
            onClick={handleCancel}
            className="bg-secondary ml-2"
          >
            Cancel
          </CustomPrimaryButton>
        </div>
      </form>

      <Modal show={showModal} onHide={() => {}}>
        <Modal.Body>Saving...</Modal.Body>
      </Modal>
    </div>
  );
};

export default EditPostPage;
