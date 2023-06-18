import { Comment, DeleteOutlined, Edit, Favorite } from "@mui/icons-material";
import { blogs } from "@/Data";

const UserPosts = () => {
  return (
    <main>
      {/* start pending posts */}

      <div className="recent-posts container ">
        <section>
          <h5 className="font-weight-bold text-left">Manage my Posts</h5>

          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Heading</th>
                  <th scope="col">Created</th>
                  <th scope="col">Likes</th>
                  <th scope="col">comments</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((post) => (
                  <tr key={post.id} className="table-row-gray">
                    <td>{post.title.substring(0, 22)}...</td>
                    <td>20/2/23</td>
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

export default UserPosts;
