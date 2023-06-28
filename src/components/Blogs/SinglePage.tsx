import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { getUser } from "@/hooks/user.actions";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePostFetch, deletePostFetch } from "@/redux/postState";
import EditPostForm from "../Forms/EditPostForm";
import RelatedPosts from "./RelatedPosts";
import UserCard from "./UserCard";
import Comments from "../Comments";
import CustomPrimaryButton from "@/Custom/CustomButton";
import CustomLoader from "@/Custom/CustomLoader";

const SinglePage = () => {
  const { id = "" } = useParams();
  const singlePost = useSelector((state: any) => state.posts.singlePost);
  const [postIsLoading, setPostIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const loggedUser = getUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setPostIsLoading(true);
        await dispatch(getSinglePostFetch(id));
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to fetch post");
      } finally {
        setPostIsLoading(false);
      }
    };

    fetchPost();
  }, [dispatch, id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deletePostFetch(id));
      toast.success("Post deleted successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  if (postIsLoading) {
    return <CustomLoader />;
  }

  if (!singlePost) {
    return <div>No post found.</div>;
  }

  if (isEditing) {
    return <EditPostForm />;
  }

  return (
    <div>
      <div className="blog row mx-auto mt-4 gap-3">
        <div
          className="blog-reader col d-flex p-3"
          style={{ flexDirection: "column" }}
        >
          <div
            className="blog-reader"
            style={{
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="text-center">
              <p>
                By:{" "}
                <Link to="#">
                  <span>
                    {singlePost.firstName} {singlePost.lastName}
                  </span>
                </Link>
              </p>
            </div>
            <hr />
            {loggedUser && loggedUser.id === singlePost.userId && (
              <div className="d-flex justify-content-end gap-2 pb-2">
                <CustomPrimaryButton
                  onClick={handleEdit}
                  className="bg-success"
                >
                  Edit
                </CustomPrimaryButton>
                <CustomPrimaryButton
                  onClick={handleDelete}
                  className="bg-danger"
                >
                  Delete
                </CustomPrimaryButton>
              </div>
            )}
            <h1>{singlePost.title}</h1>
            <p className="blog-description">{singlePost.description}</p>
            <div className="cover-image">
              <img
                src={`https://bloghub-p25a.onrender.com/assets/${singlePost.picturePath}`}
                alt="Cover"
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: singlePost.content }}
              className=""
            />
          </div>
          <div
            className="blog-reader"
            style={{
              marginTop: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#d4d4d8",
            }}
          >
            <Comments />
          </div>
        </div>
        <div
          className="col-md-3 sticky"
          style={{ position: "sticky", top: "0" }}
        >
          <div>
            <UserCard />
          </div>
          <div className="other-blogs" style={{ marginBottom: "7px" }}>
            <RelatedPosts />
          </div>
        </div>
      </div>

      <Modal show={isDeleting} onHide={() => {}}>
        <Modal.Body>Deleting...</Modal.Body>
      </Modal>
    </div>
  );
};

export default SinglePage;
