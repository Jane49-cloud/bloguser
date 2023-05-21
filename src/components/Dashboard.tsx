import {
  Bookmark,
  Comment,
  DeleteOutlined,
  Drafts,
  Edit,
  Favorite,
  LibraryBooks,
  Notifications,
  PendingActions,
} from "@mui/icons-material";
import React, { useState } from "react";
import { posts } from "@/Data";

interface Props {}
const colClass =
  "col-md-2 d-flex justify-content-between align-items-center rounded border bg-white p-10 shadow-lg dash-item";

const Dashboard = (props: Props) => {
  return (
    <main>
      <div className="row d-flex  mx-auto flex-wrap ">
        <div className="col-md-12">
          <h4 className="container mt-1">Dashboard</h4>
        </div>
      </div>
      <div className="row container mx-auto flex justify-between gap-4">
        <div
          className={`${colClass}`}
          style={{ height: "90px", maxWidth: "350px" }}
        >
          <div>
            <LibraryBooks style={{ fontSize: 40, color: "gray" }} />
            <h6>My Posts</h6>
          </div>
          <div>20</div>
        </div>
        <div
          className={`${colClass}`}
          style={{ height: "90px", maxWidth: "350px" }}
        >
          <div>
            <PendingActions style={{ fontSize: 40, color: "gray" }} />
            <h6>pending posts</h6>
          </div>
          <div>1</div>
        </div>
        <div
          className={`${colClass}`}
          style={{ height: "90px", maxWidth: "350px" }}
        >
          <div>
            <Drafts style={{ fontSize: 40, color: "gray" }} />
            <h6>My Drafts</h6>
          </div>
          <div>0</div>
        </div>
        <div
          className={`${colClass}`}
          style={{ height: "90px", maxWidth: "350px" }}
        >
          <div>
            <Favorite style={{ fontSize: 40, color: "red" }} />
            <h6>Total Likes</h6>
          </div>
          <div>200</div>
        </div>
        <div
          className={`${colClass}`}
          style={{ height: "90px", maxWidth: "350px" }}
        >
          <div>
            <Comment style={{ fontSize: 40, color: "gray" }} />
            <h6>Total Likes</h6>
          </div>
          <div>200</div>
        </div>
        <div
          className={`${colClass}`}
          style={{ height: "90px", maxWidth: "350px" }}
        >
          <div>
            <Bookmark style={{ fontSize: 40, color: "gray" }} />
            <h6>BookMarks</h6>
          </div>
          <div>5</div>
        </div>

        <div
          className={`${colClass}`}
          style={{ height: "90px", maxWidth: "350px" }}
        >
          <div>
            <Notifications style={{ fontSize: 40, color: "gray" }} />
            <h6>Notifications</h6>
          </div>
          <div>2</div>
        </div>
      </div>

      {/* start pending posts */}

      <div className="recent-posts container ">
        <section>
          <h5 className="font-weight-bold text-left">Recent Posts</h5>

          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Heading</th>
                  <th scope="col">Time</th>
                  <th scope="col">Likes</th>
                  <th scope="col">comments</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="table-row-gray">
                    <td>{post.title.substring(0, 22)}...</td>
                    <td>{post.date}</td>
                    <td>
                      <Favorite style={{ fontSize: 24, color: "red" }} /> 7
                    </td>
                    <td>
                      <Comment style={{ fontSize: 24, color: "black" }} /> 7
                    </td>
                    <td>
                      <Edit
                        className="text-success"
                        style={{
                          fontSize: "24px",
                        }}
                      />
                    </td>
                    <td>
                      <DeleteOutlined
                        className="text-danger"
                        style={{ fontSize: "24px" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-5 mt-4 text-center">
            <a className="black-text font-weight-bold" href="#!">
              Browse from home<i className="fa fa-angle-right"></i>
            </a>
          </div>
        </section>
      </div>

      {/* end pending posts */}
    </main>
  );
};

export default Dashboard;
