import RegistrationForm from '@/components/Forms/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow-lg" style={{ marginBottom: '20px' }}>
                        <div className="card-body">
                            <h4 className="card-title text-center">Create an Account</h4>
                            <RegistrationForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
