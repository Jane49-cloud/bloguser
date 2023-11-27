import { Edit, DeleteOutlined } from '@mui/icons-material';
import React from 'react';

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

const RecentPosts: React.FC<Props> = ({ post }) => {
    return (
        <tr key={post.id} className="table-row-gray">
            <td>{post.title.substring(0, 22)}...</td>
            <td>{new Date(post.createdAt).toLocaleString()}</td>
            <td>
                {/* <Favorite style={{ fontSize: 24, color: 'gray' }} /> */}{' '}
                {Object.values(post.likes).filter((liked) => liked).length}
            </td>
            <td>
                {/* <Comment
                    style={{
                        fontSize: 24,
                        color: '#334155',
                        fontWeight: '100',
                    }}
                />{' '} */}

                {post.comments.length}
            </td>
            <td>
                <Edit
                    className="text-success"
                    style={{
                        fontSize: '24px',
                    }}
                />
            </td>
            <td>
                <DeleteOutlined className="text-danger" style={{ fontSize: '24px' }} />
            </td>
        </tr>
    );
};

export default RecentPosts;
