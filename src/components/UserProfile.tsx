import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/Blogs/BlogCard';
import Loader from '../components/constants/Loader';
import avatar from '../assets/avatar.png';
import { getUser } from '@/hooks/user.actions';
import { useNavigate, useParams } from 'react-router-dom';
import CustomPrimaryButton from '@/Custom/CustomButton';
import { getUserPosts } from '@/hooks/post.actions';

interface Props {
    blog: Blog | undefined;
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
    bio: string;
    comments: [];
    likes: [];
    profilePicture: string;
    userPicturePath: string;
    createdAt: string;

    // Add any other properties here
}

const UserProfile: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [user, setUser] = useState<Partial<Blog>>({});
    const [isLoading, setIsLoading] = useState(true);
    const loggedUser = getUser();
    const { id } = useParams();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getUserPosts(id);
                const data = response;
                setBlogs(data);
                console.log(response);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/users/user/${id}`);
                const data = response.data;
                setUser(data);
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
        <main className="m-0 mx-auto">
            <div>
                <div className="user-header" style={{ width: '90%' }}>
                    <div className="row" style={{ height: 'auto' }}>
                        <div className="col-md-2">
                            <img
                                src={
                                    user?.profilePicture
                                        ? `http://localhost:8000/assets/${user.profilePicture}`
                                        : avatar
                                }
                                alt="writer"
                            />
                        </div>
                        <div className="col" style={{ padding: '10px' }}>
                            <p>
                                By: {user?.firstName} {user?.lastName}
                            </p>
                            <div>
                                <p>
                                    {user.bio ? (
                                        user?.bio
                                    ) : (
                                        <p>
                                            {' '}
                                            Lorem ipsum dolor sit amet consectetur, adipisicing
                                            elit. Delectus consequatur id atque, dicta officia
                                            saepe. Unde, repellat impedit. Neque dolores cumque
                                            mini.{' '}
                                        </p>
                                    )}
                                </p>
                                <div>
                                    {id === loggedUser?.id ? (
                                        <div className="row m-10 gap-3" style={{ padding: '10px' }}>
                                            <CustomPrimaryButton
                                                className="col-md-2"
                                                onClick={() => navigate('/settings')}
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

                <div className="p-2">
                    <section>
                        <h3 className="font-weight-bold container mb-2 text-left">User Posts</h3>

                        <div className="d-flex flex-wrap gap-3" style={{ width: '98%' }}>
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

export default UserProfile;
