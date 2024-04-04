import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setLogin } from '../../state';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const mode = useSelector((state) => state.mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

    const handleLoginFormSubmit = (values) => {
        // Handle login form submission
        axios.post('http://localhost:9000/auth/login', values, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response?.data?.token) {
                dispatch(setLogin(response.data));
                navigate("/home");
            }
        })
        .catch((error) => {
            console.log(error.response.data.message);
        });
    };

    const handleForgotPasswordFormSubmit = (values) => {
        axios.post('http://localhost:9000/auth/forgot', values, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response?.data?.user) {
                setShowForgotPasswordForm(false);
            }
        })
        .catch((error) => {
            console.log(error.response.data.message);
        });
    };

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters')
        }),
        onSubmit: handleLoginFormSubmit
    });

    const formikForgotPassword = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required')
        }),
        onSubmit: handleForgotPasswordFormSubmit
    });

    const handleForgotPasswordClick = () => {
        setShowForgotPasswordForm(true);
    };

    return (
        <>
            <div className="container login-container">
                <div className="row ps-0 justify-content-center gx-0 rounded-5">
                    <div className="col-md-6 login-form-1 shadow rounded-start-5">
                        <h3 className={"fst-italic fw-bold text-center " + ((mode == "light") ? "text-dark" : "text-white")}>Let's talk</h3>
                        {showForgotPasswordForm ? (
                            <form onSubmit={formikForgotPassword.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className={"form-label ms-2 " + (mode == "light" ? "text-dark" : "text-light")}>Email <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            id="email"
                                            className={"form-control rounded-5 " + (mode == "light" ? "bg-white text-dark" : "bg-dark text-light")}
                                            {...formikForgotPassword.getFieldProps('email')}
                                        />
                                    </div>
                                    {formikForgotPassword.touched.email && formikForgotPassword.errors.email ? (
                                        <div className="text-danger">{formikForgotPassword.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="submit"
                                        className={"btn form-control w-25 rounded-5 " + (mode == "light" ? "btn-dark" : "btn-light")}
                                        value="Submit"
                                    />
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={formikLogin.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className={"form-label ms-2 " + (mode == "light" ? "text-dark" : "text-light")}>Email <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            id="email"
                                            className={"form-control rounded-5 " + (mode == "light" ? "bg-white text-dark" : "bg-dark text-light")}
                                            {...formikLogin.getFieldProps('email')}
                                        />
                                    </div>
                                    {formikLogin.touched.email && formikLogin.errors.email ? (
                                        <div className="text-danger">{formikLogin.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className={"form-label ms-2 " + (mode == "light" ? "text-dark" : "text-light")}>Password <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            id="password"
                                            className={"form-control rounded-5 " + (mode == "light" ? "bg-white text-dark" : "bg-dark text-light")}
                                            {...formikLogin.getFieldProps('password')}
                                        />
                                    </div>
                                    {formikLogin.touched.password && formikLogin.errors.password ? (
                                        <div className="text-danger">{formikLogin.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="submit"
                                        className={"btn form-control w-25 rounded-5 " + (mode == "light" ? "btn-dark" : "btn-light")}
                                        value="Login"
                                    />
                                </div>
                            </form>
                        )}
                        <div className="d-flex justify-content-between container mt-5">
                            <div className="mb-3">
                                <a href="#" className={"link-underline link-underline-opacity-0 fw-bold " + (mode == "light" ? "text-dark" : "text-light")}>Sign up</a>
                            </div>
                            <div className="mb-3">
                                <a href="#" onClick={handleForgotPasswordClick} className={"link-underline link-underline-opacity-0 fw-bold " + (mode == "light" ? "text-dark" : "text-light")}>Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 login-form-2">
                        <div className='login-random-img rounded-end-5 shadow'></div>
                        {/* <img src="https://source.unsplash.com/random/400x400/?city,night" className="img-fluid" alt="Random Image"/> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
