import {
    Bookmark,
    Comment,
    Drafts,
    Favorite,
    LibraryBooks,
    Message,
    Notifications,
    PendingActions,
} from '@mui/icons-material';
// import { posts } from '@/Data';
import RecentPosts from './Tables/RecentPosts';

import IconButtonCustom from '../Custom/iconButton';
import { getUser } from '@/hooks/user.actions';
import { getUserPosts } from '@/hooks/post.actions';
import { useEffect, useState } from 'react';

interface Props {
    post: Post;
}

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    comments: [];
    likes: {};
    // Add any other properties here
}
const colClass =
    'col-md-2 d-flex justify-content-between align-items-center rounded border bg-white p-10 shadow-sm dash-item';

const Dashboard: React.FC<Props> = () => {
    const loggedUser = getUser();
    const [posts, setPosts] = useState([]);
    const loggedUserId = loggedUser?.id;
    console.log(loggedUserId);

    const getData = async () => {
        const response = await getUserPosts(loggedUserId);
        setPosts(response);
        console.log(response);
    };

    useEffect(() => {
        getData();
    }, []);

    const collums = [];

    return (
        <main className="dashboard">
            <div className="row d-flex  mx-auto flex-wrap ">
                <div className="col-md-12">
                    <h4 className="container mt-1">Dashboard</h4>
                </div>
            </div>
            <div className="row container mx-auto flex justify-between gap-4">
                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <LibraryBooks style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>My Posts</p>
                    </div>
                    <div>20</div>
                </div>
                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <PendingActions style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>pending posts</p>
                    </div>
                    <div>1</div>
                </div>
                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <Drafts style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>My Drafts</p>
                    </div>
                    <div>0</div>
                </div>
                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <Favorite style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>Total Likes</p>
                    </div>
                    <div>200</div>
                </div>
                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <Comment style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>Total Likes</p>
                    </div>
                    <div>200</div>
                </div>
                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <Bookmark style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>BookMarks</p>
                    </div>
                    <div>0</div>
                </div>

                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <Notifications style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>Notifications</p>
                    </div>
                    <div>0</div>
                </div>
                <div className={`${colClass}`} style={{ height: '100px', maxWidth: '350px' }}>
                    <div>
                        <IconButtonCustom>
                            <Message style={{ fontSize: 28, color: 'white' }} />
                        </IconButtonCustom>
                        <p>Messages</p>
                    </div>
                    <div>0</div>
                </div>
            </div>

            {/* start pending posts */}
            <div className="recent-posts container">
                <section>
                    <h5 className="font-weight-bold text-left">Recent Posts</h5>

                    <div className="row">
                        <table className="table">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>Heading</th>
                                    <th>Time</th>
                                    <th>Likes</th>
                                    <th>Comments</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts?.map((post: Post) => (
                                    <RecentPosts key={post.id} post={post} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-5 mt-4 text-center">
                        <a className="black-text font-weight-bold" href="#!">
                            Browse from home<i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </section>
            </div>

            {/* end pending posts */}
        </main>
    );
};

export default Dashboard;
