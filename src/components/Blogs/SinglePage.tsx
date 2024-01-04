import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
// import { getUser } from "@/hooks/user.actions";

import { useDispatch } from "react-redux";
import EditPostForm from "../Forms/EditPostForm";
import RelatedPosts from "./RelatedPosts";
import UserCard from "./UserCard";
import Comments from "../Comments";
import CustomPrimaryButton from "@/Custom/CustomButton";
import { setLoader } from "@/redux/LoaderSlice";
import { getPost, deletePost } from "@/hooks/post.actions";
import { postProps } from "@/Interfaces/post";

const SinglePage = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  const [singlePost, setSinglePost] = useState<postProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      dispatch(setLoader(true));
      const response: any = await deletePost(id);
      dispatch(setLoader(false));

      if (response.success) {
        toast.success("Post deleted successfully...");
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

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
                    {singlePost?.firstName} {singlePost?.lastName}
                  </span>
                </Link>
              </p>
            </div>
            <hr />
            {loggedUser && loggedUser.id === singlePost?.userId && (
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
              <img src={`${singlePost.picturePath}`} alt="Cover" />
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
            <UserCard singlePost={singlePost} />
          </div>
          <div className="other-blogs" style={{ marginBottom: "7px" }}>
            <RelatedPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
