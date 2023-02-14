

import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Logowhite from '../assets/discount-space-logo-whitee.png';

export const Footer1 = () => {

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
        <>
            <div class="mt-5 pt-5 pb-4 footer1">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5 col-xs-12 about-company">
                            <img src={Logowhite} alt="" width={232} />
                            <p class="pr-5 text-white my-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis </p>
                        </div>
                        <div class="col-lg-3 col-xs-12 links">
                            <h4 class="mt-lg-0 mt-sm-3">Quick Links</h4>
                            <ul class="m-0 p-0">
                                <li>- <Link to="#">About</Link></li>
                                <li>- <Link to="#">Faq's</Link></li>
                                <li>- <Link to="#">Contact</Link></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-xs-12 location mt-md-0 mt-4">
                            <h4 class="">News Letter</h4>
                            <form onSubmit={handleSubmit(onSubmit)} class="d-flex gap-2">
                                <input type="text" class={`form-control text-dark w-75 ${errors.email && " is-invalid"}`} {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Enter Email Address" />
                                <button type="submit" class="w-25 btn bg-white">
                                    {isLoading ?
                                        <div class="spinner-border text-main" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        : <i class="fas fa-paper-plane text-main" aria-hidden="true"></i>}

                                </button>

                            </form>

                            <div class="social_profile">
                                <ul className='justify-content-start'>
                                    <li><a class="bg-white " target="_blank" href="//instagram.com"><i class="text-main fab fa-instagram" aria-hidden="true"></i></a></li>

                                    <li><a class="bg-white " target="_blank" href="//facebook.com"><i class="text-main fab fa-facebook-f" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col copyright">
                            <p class="pt-3 mb-0"><small class="text-white">  © Copyright 2022 | All Rights Reserved | Powered By <Link to="//eliteblue.net" target="_blank" class="text-uppercase text-white">eliteblue technologies</Link></small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
