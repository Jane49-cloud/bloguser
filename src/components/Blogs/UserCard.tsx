import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";

interface UserCardProps {
  singlePost: {
    userPicturePath: string | null;
    firstName: string;
    lastName: string;
    userId: string;
    createdAt: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ singlePost }) => {
  return (
    <div>
      <div
        className="user-header bg-light bg-secondary sticky rounded-xl"
        style={{ position: "sticky", top: 0 }}
      >
        <div
          className=" "
          style={{
            display: "flex",

            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "1.5rem",
          }}
        >
          <div className="">
            <img
              src={
                singlePost.userPicturePath
                  ? `data:image/jpeg;base64,${singlePost.userPicturePath}`
                  : avatar
              }
              alt="writer"
            />
          </div>
          <div className="" style={{ padding: "10px" }}>
            <p>
              By: {singlePost.firstName} {singlePost.lastName}
            </p>
            <div>
              <p>
                <Link to={`/user_profile/${singlePost.userId}`}>
                  View Profile
                </Link>
              </p>
              Date posted:{" "}
              <p>{new Date(singlePost.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
