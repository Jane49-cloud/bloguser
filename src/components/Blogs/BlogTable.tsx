import React from "react";
import { FaRegEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

interface Props {
  blogs: any;
}

const BlogTable: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="px-[5px]">
      <table className="min-w-full table-fixed bg-white  shadow-md">
        <thead>
          <tr className="w-[100%] bg-teal-500">
            <th className="px-4 py-2 font-bold">Title</th>
            <th className="px-4 py-2 font-bold">Category</th>
            <th className="px-4 py-2 font-bold">Author</th>
            <th className="px-4 py-2 font-bold">Date</th>
            <th className="px-4 py-2 font-bold">Status</th>
            <th className="px-4 py-2 font-bold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs?.map((blog: any) => (
            <tr key={blog._id}>
              <td className=" py- line-clamp-1 w-[200px] px-4">
                {blog?.title}
              </td>
              <td className="px-4 py-2">{blog?.category}</td>
              <td className="px-4 py-2">{`${blog?.writer?.firstName} ${blog?.writer?.lastName}`}</td>
              <td className="px-4 py-2">
                {new Date(blog?.createdAt).toDateString()}
              </td>
              <td className="px-4 py-2">{blog?.status}</td>
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
  );
};

export default BlogTable;
