
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const { URL, API_TOKEN } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setIsLoading(true)

        data = JSON.stringify(data);
        fetch(`${URL}api/web/newsletter-subscribe&api_token=${API_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
                    reset();
                }
                else {
                    toast.error(json.message);
                }
                setIsLoading(false);
            }).catch(err => {
                toast.error("Something Went Wrong!");
                setIsLoading(false);
            })
    };
    return (
        <footer>
            <div class="container my-3">
                <div class="row ">
                    <div class="col-md-11 mx-auto">
                        <div class="card shadow border-0 rounded-3 py-4">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-md-3 text-center">
                                        <img src="https://discounts-space.com/frontend/img/newsletter.png" class="newsLetterImg" alt="" />
                                    </div>
                                    <div class="col-md-6">
                                        <div class="text-center text-black px-md-5 px-3">
                                            <h4 class="mb-2">EMAIL NEWSLETTER</h4>
                                            <p class="expiry text-black">
                                                Be The First To Get The Amazing Deals
                                            </p>
                                            <div class="signup_form">
                                                <form onSubmit={handleSubmit(onSubmit)} class="subscribe newsletter">
                                                    <input type="text" class={`subscribe__input shadow ${errors.email && "form-control is-invalid"}`} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Enter Email Address" />
                                                    <button type="submit" class="subscribe__btn newsletter-subscribe border-0 border-start ">
                                                        {isLoading ?
                                                            <div class="spinner-border" role="status">
                                                                <span class="visually-hidden">Loading...</span>
                                                            </div>
                                                            : <i class="fas fa-paper-plane text-signature" aria-hidden="true"></i>}

                                                    </button>

                                                </form>
                                            </div>
                                        </div>

                                        <div class="social_profile">
                                            <ul>
                                                <li><a class="bg-signature" target="_blank" href="//instagram.com"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>

                                                <li><a class="bg-signature" target="_blank" href="//facebook.com"><i class="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid p-0">
                <div class="row">
                    <div class="col-12 text-center py-2">
                        <ul class="list-inline text-black fw-bold py-2 fs-6">

                            <li class="list-inline-item">
                                <a href="#" class="text-black"> ABOUT US</a>
                            </li>
                            <li class="list-inline-item">
                                <Link to="/contact" class="text-black"> CONTACT US</Link>
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="text-black"> FAQ's</a>
                            </li>

                        </ul>
                        <h6 class="text-black text-uppercase m-0 fw-bold px-md-0 px-2">
                            © Copyright 2022 | All Rights Reserved | Powered By <a href="//eliteblue.net" target="_blank" class="text-uppercase text-black">eliteblue technologies</a>
                        </h6>
                    </div>
                </div>
            </div>
        </footer>
    )
}
