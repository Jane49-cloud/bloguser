import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/Blogs/BlogCard";
import Loader from "../components/constants/Loader";
import avatar from "../assets/avatar.png";
import { getUser } from "@/hooks/user.actions";
import { useNavigate, useParams } from "react-router-dom";
import CustomPrimaryButton from "@/Custom/CustomButton";

interface Props {
  blog: Blog;
}

interface Blog {
  id: number;
  userId: string;
  title: string;
  content: string;
  author: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  description: string;
  comments: [];

  // Add any other properties here
}

const userProfile: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [user, setUSer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser] = useState<any>(getUser());
  const { id } = useParams();
  const userId = loggedUser.id;
  console.log(userId);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/posts/${id}/posts`
        );
        const data = response.data;
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/user/${id}`
        );
        const data = response.data;
        setUSer(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className=" m-0  mx-auto">
      <div>
        <div className="user-header ">
          <div className="row " style={{ height: "auto" }}>
            <div className="col-md-2">
              <img
                src={
                  loggedUser?.userPicturePath
                    ? `data:image/jpeg;base64,${user?.profilePicture}`
                    : avatar
                }
                alt="writer"
              />
            </div>
            <div className="col" style={{ padding: "10px" }}>
              <p>
                By: {user?.firstName} {user?.lastName}
              </p>
              <div>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Delectus consequatur id atque, dicta officia saepe. Unde,
                  repellat impedit. Neque dolores cumque mini.{" "}
                </p>
                <div>
                  {id === loggedUser.id ? (
                    <div
                      className="row m-10 gap-3 "
                      style={{ padding: "10px" }}
                    >
                      <CustomPrimaryButton
                        className="col-md-2 "
                        onClick={() => navigate("/settings")}
                      >
                        Edit
                      </CustomPrimaryButton>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* header */}

        <div className="">
          <section>
            <h3 className="font-weight-bold container mb-2 text-left">
              user Posts
            </h3>

            <div
              className="d-flex justify-content-around flex-wrap "
              style={{ width: "98%" }}
            >
              {blogs?.map((blog: Blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        </div>

        {/* end pending posts */}
      </div>
    </main>
  );
};

export default userProfile;
