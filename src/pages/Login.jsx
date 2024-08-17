import { Link } from "react-router-dom"
import { useContext, useEffect } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useLocation, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
const Login = () => {
    const { signinUser, signinWithGoogle, user } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])
    const from = location?.state || '/'
    const onSubmit = async (data) => {
        console.log("Form submitted:", data);

        try {
            const result = await signinUser(data.email, data.password);
            console.log("Signin result:", result);

            if (result && result.user) {
                navigate(from);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid email or password',
                    text: 'Please check your email and try again',
                });
            }
        } catch (error) {
            console.error("Error signing in:", error);

            Swal.fire({
                icon: 'error',
                title: 'Error signing in',
                text: 'Please try again later',
            });
        }
    };
    const handleGoogleSignIn = async () => {
        try {
            const result = await signinWithGoogle();
            //console.log(result?.user.email)
            console.log(result)

            //console.log("JWT Token:", data.token);

            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
    return (
        <div>
            <div className='flex justify-center items-center  mt-16 font-Lato'>

                <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
                    <div
                        className='hidden bg-cover bg-center lg:block lg:w-1/2'
                        style={{
                            backgroundImage: `url('https://i.postimg.cc/wM5DXqJh/brush-4908005-1280.jpg')`,
                        }}
                    ></div>

                    <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>

                        <p className='mt-3 text-[16px]  lg:text-xl text-center text-gray-600 '>
                            Welcome back!
                        </p>

                        <div className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '>
                            <button onClick={handleGoogleSignIn} className="btn-circle border-none bg-transparent  text-2xl"> <FcGoogle /></button>

                        </div>

                        <div className='flex items-center justify-between mt-4'>
                            <span className='w-1/5 border-b  lg:w-1/4'></span>

                            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                                or login with email
                            </div>

                            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">This field is required</span>}

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered" required />
                                {errors.password && <span className="text-red-500">This field is required</span>}

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#53a8b6] text-white">Log In</button>
                            </div>
                            <div className="flex justify-center items-center">
                                <Link to='/register' href="#" className="label-text-alt link link-hover my-3 font-medium text-[18px]">New Here? Register Here</Link>
                            </div>
                        </form>

                        <div className='flex items-center justify-between mt-4'>
                            <span className='w-1/5 border-b  md:w-1/4'></span>

                            <Link
                                to='/register'
                                className='text-xs text-gray-500 uppercase  hover:underline'
                            >
                                or sign up
                            </Link>

                            <span className='w-1/5 border-b  md:w-1/4'></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;