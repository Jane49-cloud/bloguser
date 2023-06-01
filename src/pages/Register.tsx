import RegistrationForm from "@/components/Forms/RegisterForm";
import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg" style={{ marginBottom: "20px" }}>
            <div className="card-body">
              <h4 className="card-title">Create an Account</h4>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
