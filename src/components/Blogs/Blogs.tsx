import React, { useEffect, useState } from "react";

import { LibraryAdd } from "@mui/icons-material";
import { blogs } from "@/Data";

const Blogs = () => {
  return (
    <main>
      <div>
        {/* header */}
        <div className=" d-flex justify-content-between m-2">
          <div></div>
        </div>
        {/* end header */}
        {/* start pending posts */}

        <div className="container">
          <section className="">
            <h3 className="font-weight-bold mb-2 text-left"> All Post</h3>

            <div className="row">
              {blogs.map((blog) => {
                return (
                  <div key={blog.id} className="col-md-4 mb-4">
                    <div className="card">
                      <div className="view overlay">
                        <img
                          src="https://mdbootstrap.com/img/Photos/Horizontal/City/6-col/img%20(49).jpg"
                          className="card-img-top"
                          alt=""
                        />
                        <a>
                          <div className="mask rgba-white-slight waves-effect waves-light"></div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">
                          <strong>{blog.title.substring(0, 25)}...</strong>
                        </h4>
                        <hr />

                        <p className="card-text mb-3">
                          {blog.content.substring(0, 100)}
                        </p>
                        <p className="font-small font-weight-bold dark-grey-text mb-1">
                          <i className="far fa-clock-o"></i>
                          27/08/2019
                        </p>
                        <p className="font-small grey-text mb-0">
                          {blog.author}
                        </p>

                        <button className="btn btn-success">Read</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-5 mt-4 text-center">
              <a className="black-text font-weight-bold" href="#!">
                Browse all articles
              </a>
            </div>
          </section>
        </div>

        {/* end pending posts */}
      </div>
    </main>
  );
};

export default Blogs;
