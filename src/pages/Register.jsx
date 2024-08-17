import { useState } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useContext } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const [pass, setshowPass] = useState(false)
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    //navigation system
    const location = useLocation();
    const navigate = useNavigate();
    //console.log(location)
    const from = location?.state || "/"
    const onSubmit = (data) => {
        console.log(data)
        const { email, password, fullName, image } = data;
        setRegisterError('')
        setSuccess('')
        if (password.length < 6) {
            setRegisterError('password should be at least 6 characters long')
            return;
        }
        else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setRegisterError("Password should have at least one uppercase and one lowercase letter.");
            return;
        }
        createUser(email, password)
            .then(
                () => {
                    updateUserProfile(fullName, image) //updateprofile
                        .then(
                            () => {
                                setSuccess("Congratulations! registration successfull!")
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registration Successful!',
                                    text: success,
                                }).then(() => {
                                    navigate(from);
                                });
                            }
                        )
                }
            )
            .catch(
                error => {
                    console.error(error)
                    setRegisterError(error.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Registration Error',
                        text: registerError,
                    });
                }
            )
    }
    return (
        <div>
            <div className='my-20 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
                <div
                    className='hidden bg-cover bg-center lg:block lg:w-1/2'
                    style={{
                        backgroundImage: `url('https://i.postimg.cc/wM5DXqJh/brush-4908005-1280.jpg')`,
                    }}
                ></div>

                <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>

                    <p className='mt-3 text-[16px]  lg:text-2xl text-center text-gray-600 '>
                        Welcome!
                    </p>



                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  lg:w-1/4'></span>

                        <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                            Sign Up  with email
                        </div>

                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input  {...register("fullName", { required: true })} type="text" placeholder="name" className="input input-bordered" />
                            {errors.fullName && <span className="text-red-500">This field is required</span>}

                        </div>
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" required />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input {...register("image")} type="text" placeholder="image URL" className="input input-bordered" />

                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input  {...register("password", { required: true })} type={pass ? "text" : "password"} placeholder="password" className="input input-bordered" required />
                            <span onClick={() => setshowPass(!pass)} className='cursor-pointer absolute right-5 top-2'>
                                {
                                    pass ? <FaEye /> : <FaEyeSlash />
                                }
                            </span>
                            {errors.password && <span className="text-red-500">This field is required</span>}
                            {
                                registerError &&
                                <p className='text-[14px] font-medium flex justify-center items-center container text-center text-red-500'>
                                    {registerError}
                                </p>
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#53a8b6]  text-white">Register</button>
                        </div>
                    </form>
                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  md:w-1/4'></span>

                        <Link
                            to='/'
                            className='text-xs text-gray-500 uppercase  hover:underline'
                        >
                            or ,Log In
                        </Link>
                        <span className='w-1/5 border-b  md:w-1/4'></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;