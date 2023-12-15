import { RegisteringUser } from '@/redux/auth';
import { AppDispatch } from '@/redux/store';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

interface FormState {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio: string;
    image: File | null;
}

function RegistrationForm() {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState<FormState>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        bio: '',
        image: null,
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const registrationForm = event.currentTarget;
        if (registrationForm.checkValidity() === false) {
            setValidated(true);
            return;
        }

        const formData = new FormData();
        formData.append('password', form.password);
        formData.append('email', form.email);
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('bio', form.bio);
        if (form.image) {
            formData.append('picture', form.image);
        }

        await dispatch(RegisteringUser({ formData, navigate })).catch((err: any) => {
            navigate('/login');
            if (err.message) {
                setError(err.request.response);
            }
        });
    };

    const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setForm((prevForm) => ({ ...prevForm, image: file }));
        }
    };

    return (
        <form
            id="registration-form"
            className="mx-auto my-8 max-w-md rounded border bg-white p-4"
            noValidate
            onSubmit={handleSubmit}
            data-testid="register-form"
            encType="multipart/form-data"
        >
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Profile Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                    required
                    className="mt-1 w-full rounded border p-2"
                    data-testid="picture-path-field"
                />
                <p className="text-xs text-red-500">
                    {validated && !form.image && 'This field is required.'}
                </p>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-600">First Name</label>
                    <input
                        value={form.firstName}
                        data-testid="first-name-field"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setForm({ ...form, firstName: e.target.value })
                        }
                        required
                        type="text"
                        className="mt-1 w-full rounded border p-2"
                        placeholder="Enter first name"
                    />
                    <p className="text-xs text-red-500">
                        {validated && !form.firstName && 'This field is required.'}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Last Name</label>
                    <input
                        value={form.lastName}
                        data-testid="last-name-field"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setForm({ ...form, lastName: e.target.value })
                        }
                        required
                        type="text"
                        className="mt-1 w-full rounded border p-2"
                        placeholder="Enter last name"
                    />
                    <p className="text-xs text-red-500">
                        {validated && !form.lastName && 'This field is required.'}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                <input
                    value={form.email}
                    data-testid="email-field"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    required
                    type="email"
                    className="mt-1 w-full rounded border p-2"
                    placeholder="Enter email"
                />
                <p className="text-xs text-red-500">
                    {validated && !form.email && 'Please provide a valid email.'}
                </p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                    value={form.password}
                    data-testid="password-field"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    required
                    type="password"
                    className="mt-1 w-full rounded border p-2"
                    placeholder="Password"
                />
                <p className="text-xs text-red-500">
                    {validated && !form.password && 'Please provide a valid password.'}
                </p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Bio</label>
                <textarea
                    value={form.bio}
                    data-testid="bio-field"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setForm({ ...form, bio: e.target.value })
                    }
                    className="mt-1 w-full rounded border p-2"
                    rows={3}
                    placeholder="A simple bio... (Optional)"
                />
            </div>

            <div className="text-red-500">{error && <p>{error}</p>}</div>

            <button
                data-testid="submit-button"
                type="submit"
                className="mt-4 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
                Submit
            </button>

            <p className="mt-2">
                Already have account? <Link to="/login">Login</Link>.
            </p>
        </form>
    );
}

export default RegistrationForm;
