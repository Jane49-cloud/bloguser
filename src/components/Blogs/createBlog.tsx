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
        <div className="container mt-1 text-gray-700  mb-4">
          <h2 className="text-xl font-bold mb-4 mt-10 text-center">Add Blog</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-4 border rounded shadow-md bg-[#eee] "
          >
            <div className="flex gap-4 mb-4 flex-wrap">
              <div className="flex-grow">
                <label htmlFor="posttype" className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <select
                  className="mt-1 block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-teal-500"
                  id="posttype"
                  onChange={handlePostTypeChange}
                  required
                >
                  <option value="">Select Post type</option>
                  <option value="ordinary">Ordinary</option>
                  <option value="inhouse">In House</option>
                  <option value="popular">Popular</option>
                  <option value="top">Top</option>
                </select>
              </div>
      
              <div className="flex-grow">
                <label htmlFor="picturePath" className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <input
                  type="file"
                  className="mt-1 block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-teal-500"
                  id="picturePath"
                  onChange={handlePicturePathChange}
                  required
                />
              </div>
            </div>
      
            {picturePreview && (
              <div className="mb-3">
                <img
                  src={picturePreview}
                  alt="Cover"
                  style={{ width: '100%' }}
                  className="w-full h-[300px] object-cover object-center"
                />
              </div>
            )}
      
            <div className="flex gap-4 mb-4 flex-wrap">
              <div className="flex-grow">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-teal-500"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
      
              <div className="flex-grow">
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <select
                  className="mt-1 block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-teal-500"
                  id="topic"
                  value={topic}
                  onChange={handleTopicChange}
                  required
                >
                  <option value="">Select Topic</option>
                  <option value="Blogging">Blogging</option>
                  <option value="Technology">Technology</option>
                  <option value="AI (Artificial Intelligence)">AI (Artificial Intelligence)</option>
                </select>
              </div>
            </div>
      
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 block w-full p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-teal-500"
                id="description"
                rows={3}
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>
      
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <ReactQuill
                id="content"
                value={content}
                onChange={handleContentChange}
                placeholder="Write something amazing..."
              />
            </div>
      
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-teal-800 text-white p-3 rounded hover:bg-teal-400 transition-all duration-500"
                disabled={isPosting}
              >
                {isPosting ? 'Posting...' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      );
      
};

export default AddBlog;
