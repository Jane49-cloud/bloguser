import React from "react";
import UserProfile from "@/components/UserProfile";

interface Props {}

const UserProfilePage = (props: Props) => {
  return (
    <div>
      <UserProfile blog={undefined} />
    </div>
  );
};

export default UserProfilePage;
