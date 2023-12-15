import {
    createHousePostAsync,
    createPopularPostAsync,
    createPostAsync,
    createTopPostAsync,
} from '@/redux/blogSlice';
import { AppDispatch } from '@/redux/store';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface AddBlogProps {}

const AddBlog: React.FC<AddBlogProps> = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [picturePath, setPicturePath] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [postType, setpostType] = useState('post');

    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: any) => state.auth.user);
    // const [loggedUser] = useState<any>(getUser());
    const userId = user?._id;

    const [isPosting, setIsPosting] = useState(false);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleTopicChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTopic(e.target.value);
    };

    const handleContentChange = (value: string) => {
        setContent(value);
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

    const handlePostTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setpostType(e.target.value);
    };
    console.log(postType);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPosting(true);

        // Inside your component
        <div className="col">
            <label htmlFor="posttype" className="form-label">
                Topic
            </label>
            <select
                className="form-select"
                id="topic"
                onChange={handlePostTypeChange}
                value={postType}
            >
                <option value="">Select Post type</option>
                <option value="ordinary">ordinary</option>
                <option value="inhouse">In House</option>
                <option value="popular">popular</option>
                <option value="top">Top</option>
            </select>
        </div>;

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('name', title);
            formData.append('description', description);
            formData.append('topic', topic);
            formData.append('content', content);
            formData.append('writer', userId);
            formData.append('category', postType);
            if (picturePath) {
                formData.append('picture', picturePath);
                // formData.append('picturePath', picturePath.name);
            }

            if (postType == 'ordinary') {
                // post function will go here

                await dispatch(createPostAsync(formData));
            }
            if (postType == 'top') {
                // post function will go here
                await dispatch(createTopPostAsync(formData));
            }
            if (postType == 'popular') {
                // post function will go here
                await dispatch(createPopularPostAsync(formData));
            }
            if (postType == 'inhouse') {
                // post function will go here
                await dispatch(createHousePostAsync(formData));
            }

            // Reset form fields
            setTitle('');
            setDescription('');
            setTopic('');
            setContent('');
            setPicturePath(null);
            setPicturePreview(null);
            setIsPosting(false);
            navigate('/');
        } catch (error) {
            // Handle error
            console.error(error);
            setIsPosting(false);
        }
    };

    return (
        <div className="container">
            <h2>Add Blog</h2>
            <form
                onSubmit={handleSubmit}
                className="form rounded border p-3 shadow-sm"
                style={{ maxWidth: '60rem', marginBottom: '20px' }}
            >
                <div className="col">
                    <label htmlFor="posttype" className="form-label">
                        Topic
                    </label>
                    <select className="form-select" id="" onChange={handlePostTypeChange}>
                        <option value="">Select Post type</option>
                        <option value="ordinary">ordinary</option>
                        <option value="inhouse">In House</option>
                        <option value="popular">popular</option>
                        <option value="top">Top</option>
                    </select>
                </div>
                {/* Picture Path */}
                <div className="mb-3">
                    <label htmlFor="picturePath" className="form-label">
                        Cover Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="picturePath"
                        onChange={handlePicturePathChange}
                    />
                </div>
                {/* Picture Preview */}
                {picturePreview && (
                    <div className="mb-3">
                        <img src={picturePreview} alt="Cover" style={{ width: '100%' }} />
                    </div>
                )}
                {/* Title and Topic */}
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
                            <option value="Blogging">Blogging</option>
                            <option value="Technology">Technology</option>
                            <option value="AI (Artificial Intelligence)">
                                AI (Artificial Intelligence)
                            </option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Health">Health</option>
                            <option value="Sports">Sports</option>
                            <option value="Music">Music</option>
                        </select>
                    </div>
                </div>
                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows={3}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                {/* Content */}
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        Content
                    </label>
                    <ReactQuill
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Write something amazing..."
                    />
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" disabled={isPosting}>
                    {isPosting ? 'Posting...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
