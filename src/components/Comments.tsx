import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '@/hooks/user.actions';
import { InputBase } from '@mui/material';
import CustomPrimaryButton from '@/Custom/CustomButton';
import axiosService from '@/Helpers/axios';
import avatar from '../assets/avatar.png';
import Loader from '@/Custom/CustomLoader';

interface Comment {
    id: number;
    content: string;
    picturePath: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}

const AllCommentsPage: React.FC = () => {
    const { id = '' } = useParams<{ id: string }>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const loggedUser = getUser();
    const loggedUserId = loggedUser?.id;

    const [content, setContent] = useState<string>('');
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setIsLoading(true);
                const response = await axiosService.get(
                    `http://localhost:8000/api/v1/comments/${id}/comments`
                );
                setIsLoading(false);
                if (response.status === 200) {
                    const data = response.data;
                    setComments(data);
                } else {
                    console.error('Error fetching comments:', response.status);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, [id]);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('userId', loggedUserId);
        formData.append('postId', id);
        formData.append('content', content);

        try {
            setIsLoading(true);
            const response = await axiosService.post(
                `http://localhost:8000/api/v1/comments`,
                formData
            );
            setIsLoading(false);

            if (response.status === 200) {
                const newComment: Comment = {
                    id: response.data.id,
                    content,
                    picturePath: '', // Provide the appropriate value
                    firstName: '', // Provide the appropriate value
                    lastName: '',
                    createdAt: '', // Provide the appropriate value
                };
                setComments([...comments, newComment]);
                setContent('');
            } else {
                console.error('Failed to post comment:', response.status);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h1>Share your thoughts below</h1>
            <div className="d-flex align-items-center flex-wrap gap-2">
                <InputBase
                    placeholder="Add a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    sx={{
                        width: '70%',
                        marginTop: '10px',
                        backgroundColor: '#eeee',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 2rem',
                        margin: '0.5rem 0',
                    }}
                />
                <div>
                    <CustomPrimaryButton type="submit" onClick={handlePost} className="py-2">
                        Comment
                    </CustomPrimaryButton>
                </div>
            </div>

            {isLoading ? (
                <p>Loading comments...</p>
            ) : (
                <div>
                    {comments.length === 0 ? (
                        <p>Be the first one to comment!</p>
                    ) : (
                        <div>
                            {comments.map((comment) => (
                                <div key={comment.id} className="row  mt-2">
                                    <div className="col-md-1  ">
                                        <img
                                            src={
                                                comment?.picturePath
                                                    ? `${comment.picturePath}`
                                                    : avatar
                                            }
                                            alt="writer"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </div>
                                    <div className="col">
                                        <p>
                                            {comment.firstName} {comment.lastName}{' '}
                                            <span>
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </span>
                                        </p>
                                        <p className="mb-2">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllCommentsPage;
