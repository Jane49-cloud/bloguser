import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

import { getUser } from '@/hooks/user.actions';

import { Avatar } from 'antd';

interface User {
    firstName: string;
    lastName: string;
    bio: string;
    profilePicture?: string;
}

const UserSettings: React.FC = () => {
    const [loggedUser] = useState<any>(getUser());
    const userId = loggedUser.id;
    const [isEditing, setIsEditing] = useState(false);
    const [, setPhoto] = useState<string | ArrayBuffer | null>(null);
    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        bio: '',
    });
    const [, setIsLoading] = useState(true);
    console.log(user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(
                    `https://bloghub-p25a.onrender.com/api/v1/users/user/${userId}`
                );
                const data = response.data;
                setUser(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put<User>(
                `https://bloghub-p25a.onrender.com/api/v1/users/user/${userId}`,
                user
            );
            console.log(response.data); // Handle the response as needed
            setIsEditing(false);
        } catch (error) {
            setIsEditing(false);
            console.log(error);
            // Handle the error as needed
        }
    };

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <main>
            {/* general settings */}
            <h4 className="mx-5  mt-1"> Settings</h4>
            <div
                className="row bg-light m-3 rounded border p-3"
                style={{ width: '90%', height: 'auto', marginBottom: '10px' }}
            >
                <div className="col-md-3 text-center">
                    <img
                        src={loggedUser?.profilePicture ? loggedUser.profilePicture : Avatar}
                        alt="writer"
                        className="h-[120px] w-[120px] rounded-full border object-cover object-top p-2"
                    />
                    {isEditing ? (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="form-control-file mt-3"
                        />
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className="col-md-4">
                    <div>
                        <h5>
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={handleInputChange}
                                        className="form-control mb-2"
                                    />
                                </>
                            ) : (
                                <div>
                                    <p> first name : {`${loggedUser?.firstName}`}</p>
                                    <p> Last Name : {`${loggedUser?.lastName}`}</p>
                                </div>
                            )}
                        </h5>
                    </div>
                    <div>
                        <h6>
                            {isEditing ? (
                                <textarea
                                    value={user.bio}
                                    name="bio"
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            ) : (
                                <p> Bio: {loggedUser?.bio}</p>
                            )}
                        </h6>
                    </div>
                    <div></div>
                    <div className="button">
                        {isEditing ? (
                            <button className="btn btn-success" onClick={handleSaveClick}>
                                Save
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={handleEditClick}>
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* end of general settings */}
            {/* Notification */}
        </main>
    );
};

export default UserSettings;
