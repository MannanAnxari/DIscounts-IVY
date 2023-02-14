import React, { useContext, useState } from 'react';
import number1 from "./assets/num1.png";
import number2 from "./assets/num2.png";
import { AppContext } from '../context/AppContext';
import Slider from "react-slick";
import number3 from "./assets/num3.png";
import number4 from "./assets/num4.png";
import Video from "./assets/about.mp4";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


export const About = () => {
    const { APP_NAME, setTitle, teams, teamsImgPath } = useContext(AppContext);

    setTitle(`${APP_NAME}About`);
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    // setIsPageLoading(true);

    return (

        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <div className="about sec image-banner">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="h-100 col-sm-6 d-flex flex-column align-items-start justify-content-center">
                            <h1 className='text-white text-start'>An Energy That Builds  Memorable Brands</h1>
                            <Link to={'/contact'} className="btn btn-dark">
                                GET A QUOTE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec py-md-5">
                <div className="container my-md-5">
                    <div className="row text-start py-md-0 py-4">
                        <div className="col-md-6 my-md-auto my-3"><video className='w-100' src={Video} autoplay="" controlslist="nodownload"></video></div>
                        <div className="col-md-6 my-md-auto my-3">
                            <h1 className="heading">Who We Are
                            </h1>
                            <p className="para-sm text-muted">MediaChapter is a team of dedicated designers, developers, content creators, SEO specialists, digital marketers, and other experts who share a common passion for great brands. We work together to create remarkable brand experiences that give businesses a unique voice and help them stand out in the marketplace. During the venture, from small-scale startups to industry leaders, we have helped all kinds of brands to build their voice and stand out.
                            </p>
                            <Link to={'/portfolio'} className="btn btn-main">view portfolio</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec py-5 about-cards">
                <div className="container">
                    <div className="row text-start">
                        <div className="col-md-3 my-md-auto my-3 ">
                            <h1 className="fs-3 line-height-sm heading">Features that Catch Eyeballs at Glance
                            </h1>
                            <p className="para-sm text-muted">It is our features that make us who we are. Take a look below to find out what exactly you need.
                            </p>
                            <Link to={'/contact'} className="btn btn-main">GET IN TOUCH</Link>
                        </div>
                        <div className="col-md-9 my-md-auto my-3">
                            <div className="row">
                                <div className="col-md-6 my-3">
                                    <div className="crd rounded-4 h-100 shadow p-4 bg-light d-flex gap-2">
                                        <div className="cardImg">
                                            <img src={number4} draggable={false} className={'w-card'} alt="card" />
                                        </div>
                                        <div className="content"><a className="fs-3 text-dark my-3 mt-0 d-inline-block">Logo Design</a><p className="para-sm text-muted">At MediaChapter, we have designers who can create a striking custom logo design for your business, giving your brand an identity that it needs to stand out in the competitive market.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-3">
                                    <div className="crd rounded-4 h-100 shadow p-4 bg-light d-flex gap-2">
                                        <div className="cardImg">
                                            <img src={number3} draggable={false} className={'w-card'} alt="card" />
                                        </div>
                                        <div className="content"><a className="fs-3 text-dark my-3 mt-0 d-inline-block">Web Development</a><p className="para-sm text-muted">A good website is speedy, responsive, and user-friendly. Our developers are expert in building websites that contains all these elements.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-3">
                                    <div className="crd rounded-4 h-100 shadow p-4 bg-light d-flex gap-2">
                                        <div className="cardImg">
                                            <img src={number2} draggable={false} className={'w-card'} alt="card" />
                                        </div>
                                        <div className="content"><a className="fs-3 text-dark my-3 mt-0 d-inline-block">SEO</a><p className="para-sm text-muted">SEO specialists at MediaChapter create strategies that boost website traffic and improve its ranking in Google’s search results.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-3">
                                    <div className="crd rounded-4 h-100 shadow p-4 bg-light d-flex gap-2">
                                        <div className="cardImg">
                                            <img src={number1} draggable={false} className={'w-card'} alt="card" />
                                        </div>
                                        <div className="content"><a className="fs-3 text-dark my-3 mt-0 d-inline-block">Stationery Design
                                        </a><p className="para-sm text-muted">Apart from logos, our skilled designers are also specialized in creating the alluring stationery design, including flyers, brochures, packaging, banners, posters, and more.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sec py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto my-4">
                            <h1 className="heading">
                                Our Team
                            </h1>
                            <p className="para-sm text-muted">
                                Designers, developers, strategists, and storytellers – we have all branding experts in our team. Let’s take a look at some inspiring profiles.
                            </p>
                        </div>
                        <div className="col-12">
                            <div className="clients">
                                <Slider {...settings}>
                                    {
                                        teams.length > 0 &&
                                        teams.map((item) => {
                                            return <div className="testimonials row">
                                                <div className="col-12 mx-auto">
                                                    <div className="testimonialImg">
                                                        <img className='testImg' src={`${teamsImgPath}/${item.image}`} alt="clients" />
                                                    </div>
                                                    <div className="testimonialsFooter">
                                                        <p className="fw-bold mt-3 fs-5 mb-2"><i>{item.name}</i></p>
                                                        <p className="text-muted"><i>{item.designation}</i></p>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
