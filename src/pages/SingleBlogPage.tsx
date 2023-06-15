import React from "react";
import SinglePage from "@/components/SinglePage";

interface Props {}

const SingleBlogPage = (props: Props) => {
  return (
    <div className="single-page" style={{ overflowY: "scroll" }}>
      <SinglePage />
    </div>
  );
};

export default SingleBlogPage;
