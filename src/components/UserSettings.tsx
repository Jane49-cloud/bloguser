import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

import { getUser } from "@/hooks/user.actions";
import avatar from "../assets/avatar.png";

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
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [, setIsLoading] = useState(true);

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

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <main>
      {/* general settings */}
      <h4>General Settings</h4>
      <div
        className="row bg-light rounded border p-3"
        style={{ width: "90%", height: "auto", marginBottom: "10px" }}
      >
        <div className="col-md-3 text-center">
          <img
            src={
              user?.profilePicture
                ? `https://bloghub-p25a.onrender.com/assets/${user.profilePicture}`
                : avatar
            }
            alt="profile pic"
            height={100}
            width={100}
            className="rounded-circle mb-3"
          />
          {isEditing ? (
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="form-control-file"
            />
          ) : (
            <p>Profile Picture</p>
          )}
        </div>
        <div className="col-md-4">
          <div>
            <h5>
              <span>Name:</span>{" "}
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </>
              ) : (
                `${user.firstName} ${user.lastName}`
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
                user.bio
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
      <div className="row mt-5">
        <h4>Notification Settings</h4>
        <div className="col">
          <form
            className="form rounded border bg-white p-3"
            style={{ maxWidth: "600px", height: "auto", marginBottom: "3px" }}
          >
            {/* notification settings checkboxes */}
          </form>
        </div>
      </div>
      {/* end of security settings */}
      {/* security settings */}
      <div className="row mt-5">
        <h4>Account Settings</h4>
        <div className="col">
          <p>Would you like to change your password?</p>
          <form
            className="form rounded border bg-white p-3"
            style={{ maxWidth: "600px", height: "auto", marginBottom: "3px" }}
          >
            {/* account settings form */}
          </form>
        </div>
      </div>
      {/* end of security settings */}
    </main>
  );
};

export default UserSettings;
