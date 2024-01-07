import Sidebar from "@/components/constants/sidebar";
import AccountsComp from "@/components/AccountsComp";

const AddBlogPage = () => {
  return (
    <div className=" flex gap-2 ">
      <div className=" my-sidebar  lg-z-0 fixed z-10 lg:relative">
        <Sidebar />
      </div>
      <div className="my-body  flex ">
        <AccountsComp />
      </div>
    </div>
  );
};

export default AddBlogPage;
