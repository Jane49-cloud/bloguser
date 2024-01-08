import { getAllUsers } from "@/redux/auth";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { FaRegEdit, FaRegTrashAlt, FaRegEye } from "react-icons/fa"; // Material-UI Icons
import { useDispatch, useSelector } from "react-redux";

const AccountsComp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: any) => state.auth.users);
  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="mt-10 w-full bg-[#eeee] p-[10px] lg:p-5">
      <div className="">
        <table className="no-scrollbar min-w-full table-auto overflow-x-auto bg-white  shadow-md">
          <thead>
            <tr className="w-[100%] bg-teal-500">
              <th className="px-4 py-2 font-bold">First Name</th>
              <th className="px-4 py-2 font-bold">Last Name</th>
              <th className="px-4 py-2 font-bold">Email</th>
              <th className="px-4 py-2 font-bold">Role</th>
              <th className="px-4 py-2 font-bold">Status</th>
              <th className="px-4 py-2 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: any) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user?.firstName}</td>
                <td className="px-4 py-2">{user?.lastName}</td>
                <td className="px-4 py-2">{user?.email}</td>
                <td className="px-4 py-2">{user?.role}</td>
                <td className="px-4 py-2">{user?.status}</td>
                <td className="px-4 py-2">
                  <button className="mx-1 text-blue-500 hover:text-blue-700">
                    <FaRegEye />
                  </button>
                  <button className="mx-1 text-green-500 hover:text-green-700">
                    <FaRegEdit />
                  </button>
                  <button className="mx-1 text-red-500 hover:text-red-700">
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsComp;
