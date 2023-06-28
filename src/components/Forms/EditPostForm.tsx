import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosService from "@/Helpers/axios";
import CustomPrimaryButton from "@/Custom/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePostFetch, getSinglePostSuccess } from "@/redux/postState";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPostPage = () => {
  const { id = "" } = useParams();
  const singlePost = useSelector((state: any) => state.posts.singlePost);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [picturePath, setPicturePath] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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
        dispatch(getSinglePostSuccess(updatedPost));
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
