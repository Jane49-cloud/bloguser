import React, { useState } from "react";
import Avatar from "../assets/avatar.png";

interface Props {}

const UserSettings = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(Avatar);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      {/* general settings */}

      <h4 className="">General Settings</h4>
      <div
        className="row rounded  border p-10"
        style={{ width: "90%", height: "auto", marginBottom: "10px" }}
      >
        <div className="col-md-1"></div>
        <div className="col-md-3 text-center">
          <img
            src={photo}
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
                <input
                  type="text"
                  defaultValue="Jane Doe"
                  className="form-control"
                />
              ) : (
                "Jane Doe"
              )}
            </h5>
          </div>
          <div>
            <h6>
              {isEditing ? (
                <textarea
                  defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit natus eligendi pariatur labore ea repellendus fugiat ipsam saepe, excepturi maxime. Itaque in ipsum deleniti nobis veritatis soluta inventore ipsa."
                  className="form-control"
                />
              ) : (
                "Bio: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum odit natus eligendi pariatur labore ea repellendus fugiat ipsam saepe, excepturi maxime. Itaque in ipsum deleniti nobis veritatis soluta inventore ipsa."
              )}
            </h6>
          </div>
          <div>
            <p>
              <span>Occupation:</span>{" "}
              {isEditing ? (
                <input
                  type="text"
                  defaultValue="Software Developer"
                  className="form-control"
                />
              ) : (
                "Software Developer"
              )}
            </p>
          </div>
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
        <h4> Notification Settings</h4>
        <div className="col">
          <form
            className="form rounded border bg-white p-3"
            style={{ maxWidth: "600px", height: "auto", marginBottom: "3px" }}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Send me weekly newsletter emails
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Send me an email when someone likes my post
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Send me an email when someone comments on my post post
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Send an email when I receive a membership badge
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Send me an email when my post is published
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Send me an email when my post is denied
              </label>
            </div>
            <div className="button mt-3">
              <button
                className="btn btn-success
              "
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* end of security settings */}

      {/* security settings */}
      <div className="row mt-5">
        <h4> Account Settings</h4>
        <div className="col">
          <p>Would you like to change your password?</p>
          <form
            className="form rounded border bg-white p-3"
            style={{ maxWidth: "600px", height: "auto", marginBottom: "3px" }}
          >
            <label htmlFor="old-password">Enter your old password:</label>
            <input type="password" className="form-control" />
            <label htmlFor="new-password">Enter your new password:</label>
            <input type="password" className="form-control" />
            <label htmlFor="re-password">Confirm your new password:</label>
            <input type="password" className="form-control" />
            <button className="btn btn-success mt-2">Save New Password</button>
          </form>
        </div>
      </div>
      {/* end of security settings */}
      {/* Danger zone */}
      <div className="row mt-5">
        <h4 className="text-danger"> Danger Zone </h4>
        <div
          className="row "
          style={{ maxWidth: "900px", height: "auto", marginBottom: "3px" }}
        >
          <div className="col">
            <p>Are sure you want to delete your account?</p>
            <p>
              This action cannot be undone. All your blog posts, comments, and
              data will be permanently removed.
            </p>
            <div className="button ">
              <button className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
      {/* end of Danger zone*/}
    </main>
  );
};

export default UserSettings;
