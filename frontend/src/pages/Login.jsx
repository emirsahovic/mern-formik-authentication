import { useFormik } from 'formik';
import { useState } from 'react';
import { GrFormView } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import * as Yup from 'yup';
import { AiOutlineClose } from 'react-icons/ai';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, message, isSuccess } = useSelector(state => state.auth);

    const [visible, setVisible] = useState(true);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address format').required('Required'),
            password: Yup.string().min(6, 'Minimum number of characters for password is 6').required('Required')
        }),
        onSubmit: (values, { resetForm }) => {
            const { email, password } = values;

            const userData = {
                email,
                password
            }

            dispatch(loginUser(userData));
        }
    })

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 h-3/4 mt-28">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-sky-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center">Sign In</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email</label>
                                <input type="text" placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.email && formik.errors.email && <p className='text-red-600 ml-1 mt-1'>{formik.errors.email}</p>}
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <div className='relative'>
                                    <input type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.password && formik.errors.password && <p className='text-red-600 ml-1 mt-1'>{formik.errors.password}</p>}
                                    <GrFormView className='absolute text-3xl bottom-1 right-3 cursor-pointer' onClick={() => setShowPassword(prevState => !prevState)} />
                                </div>
                            </div>
                            <div className="flex">
                                <button type='submit' className="w-full px-6 py-2 mt-4 text-white bg-sky-500 rounded-lg hover:bg-teal-700 transition duration-200">
                                    Login
                                </button>
                            </div>
                            {isError &&
                                <div>
                                    <button className={`relative block mx-auto cursor-default mt-3 px-12 py-2 bg-red-800 font-bold text-white ${visible ? "" : "hidden"}`}>
                                        {message}
                                        <AiOutlineClose onClick={() => setVisible(false)} className='absolute cursor-pointer top-2 font-bold right-2' />
                                    </button>
                                </div>
                            }
                            <div className="mt-6 text-grey-dark">
                                <span className="mr-2">Don't have an account?</span>
                                <Link to='/register' className="text-sky-600 hover:underline font-bold">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Login;
