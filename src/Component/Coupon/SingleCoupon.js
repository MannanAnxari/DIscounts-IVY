
import React, { useState, useEffect, useContext, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GetCoupon from "../assets/coupon/getcoupon.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { PromiseButton } from '../Buttons/PromiseButton';
import { Spinner } from '../Spinner';
import Logo from '../assets/discount-space-logo.png';
import { Tooltip } from 'antd';
import { HeartOutlined, HeartFilled, LikeFilled, LikeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';



export const SingleCoupon = () => {
    const params = useParams();
    const { user, API_TOKEN, SITE_URL, setWishlistItems
        , setLikedItems, setTitle
        , setSavedItems, APP_NAME
    } = useContext(AppContext);

    const singleCoupon = params.singleCoupon;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [media, setMedia] = useState([]);
    const [baseImg, setBaseImg] = useState('');

    const [ReadMore, setReadMore] = useState(true);
    const showmore = () => {
        setReadMore(active => !active);
    };


    useEffect(() => {

        fetch(`${SITE_URL}api/web/single-coupon/${singleCoupon}`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData[0]); setBaseImg(actualData[0].image_path); setMedia(actualData[0].media); setTitle(`${actualData[0].coupon.title ? actualData[0].coupon.title : "Coupon"}${APP_NAME}`); })
            .catch((err) => {
                setData([]);
                setTitle(`Coupon${APP_NAME}`);
                toast.error("Something went wrong!");
            });
    }, [])

    const [image, setImage] = useState(null);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }


    const comment = useRef(null);


    const onPostComment = () => {
        setIsLoading(true)

        fetch(`${URL}api/contact-post&api_token=${API_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment: comment.current.values, img: image })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    toast.success(json.message);
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


    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);

    });


    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    };

    const settingsThumbs = {
        slidesToScroll: 1,
        slidesToShow: Math.min(media.length, 3),
        asNavFor: '.slider-for',
        dots: false,
        centerMode: false,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '10px'
    };

    var date;


    if (data.coupon) {
        let GivenDate = new Date(data.coupon.expiry_date.split(" ")[0].replace(/-/g, "/"))
        let CurrentDate = new Date();


        let difference = CurrentDate.getTime() - GivenDate.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

        if (GivenDate > CurrentDate) {
            date = `${TotalDays} Days`;
        } else {
            date = 'Expired';
        }

    }
    const navigate = useNavigate();

    const handleItem = (typec) => {
        if (!user) {
            navigate('/login');
        }
        var typp = typec;
        setIsLoading({ ...isLoading, [typp]: true });
        postData(`${SITE_URL}api/web/reaction-post`, { type: typec, user_token: user && user.data.user_token, reference_type: "coupon", comment: "", reference_id: data.coupon.id })
            .then(res => {
                if (res.success != false) {
                    data[typp] = true;
                    toast.success(`Item ${typp === 'save' ? "Add to Cart" : typp} Successfully!`);

                } else {
                    data[typp] = false;
                    toast.success(`Item Removed from ${typp === 'save' ? "Cart" : typp} Successfully!`);
                }
                fetch(`${SITE_URL}api/web/react-items?user_id=${user ? user.data.id : ""}&user_token=${user.data.user_token}&type=${typp}`)
                    .then((response) => response.json())
                    .then((actualData) => {
                        if (typp === "wishlist") {
                            setWishlistItems(actualData);
                        }
                        else if (typp === "like") {
                            setLikedItems(actualData);
                        }
                        else if (typp === "save") {
                            setSavedItems(actualData);
                        }
                    })
                setIsLoading(false);
            }).catch((err) => {

                setIsLoading(false);
                toast.error("Something went wrong!");

            });

    };


    console.log(data);


    const handleHistory = (url, couponId) => {
        postData(`${URL}api/web/redirect-history`, { guard: "web", user_token: user?.data.user_token, product_id: couponId, domain: window.location.host });
        window.open(url, '_blank');
    }



    async function postData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const IconFont = createFromIconfontCN({
        scriptUrl: [
            '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
            '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python <Space>
        ],
    });
    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>

            <div className="container">
                {

                    data.coupon ?

                        <div className="row">
                            <div className="col-md-4 my-3">
                                <div className="couponimagediv ">
                                    <div className="slider-wrapper sliderpdMain">
                                        <div className="topSlid">

                                            <Slider
                                                {...settingsMain}
                                                asNavFor={nav2}
                                                ref={slider => (setSlider1(slider))}
                                            >

                                                {media && media.map((slide) =>

                                                    <div className="slick-slide" key={slide.id}>
                                                        <img className="slick-slide-image w-100" src={`${baseImg}/${slide.image}`} />
                                                    </div>

                                                )}

                                            </Slider>
                                        </div>
                                        <div className="thumbnail-slider-wrap">

                                            <Slider
                                                {...settingsThumbs}
                                                asNavFor={nav1}
                                                ref={slider => (setSlider2(slider))}>

                                                {media && media.map((slide) =>

                                                    <div className="slick-slide sliderpdBot p-0" key={slide.id}>
                                                        <img className="slick-slide-image w-100 rounded-0 p-1 " src={`${baseImg}/${slide.image}`} />
                                                    </div>

                                                )}


                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 p-4">
                                <div className="couponimagedetaildiv my-auto">
                                    <small>

                                        {date === "Expired" ?
                                            <p className="light-black">
                                                <span className={`badge text-bg-danger text-white}`}>
                                                    <b>
                                                        {date}
                                                    </b>
                                                </span>
                                            </p>
                                            :
                                            <p className="light-black">
                                                Listing Expires in
                                                <span className={`text-danger badge  `}>
                                                    <b>
                                                        {date}
                                                    </b>
                                                </span>
                                            </p>
                                        }
                                    </small>
                                    <h3 className="text-start ps-0">{data.coupon.title}</h3>
                                    <div className="d-flex gap-2 pt-3 align-items-center">
                                        <img src={`${data.country && data.flag_url}/${(data.country?.iso).toLowerCase()}.svg`} alt="" width={'30px'} />
                                        <p className="para mb-0 light-black">{data.category && data.category.title}</p>
                                        <button href="#" class="btn bg-white text-dark bg-white fullfill-btn px-2 py-1 rounded-5">
                                            Fullfilled By {data.store && data.store.title}
                                        </button>
                                    </div>
                                    <div className="d-flex gap-2 pt-4 align-items-center">
                                        <strike className="para mb-0 light-black">${data.coupon?.compare_price}</strike>
                                        <button href="#" class="btn bg-signature px-3 py-1 text-white rounded-5">
                                            -{data.coupon?.discount}%
                                        </button>
                                        <h4 className="para mb-0 couponprice ">${data.coupon?.regular_price}</h4>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-between mt-4">
                                        <div>
                                            <Tooltip title="Vouch It">

                                                <a
                                                    target="_blank"

                                                    className="d-flex gap-2 justify-content-between" onClick={() => handleHistory(data.coupon.affiliate_url, data.coupon.id)}>
                                                    <img src={`${GetCoupon}`}
                                                        alt="getCoupon" class=" position-relative" style={{ zIndex: '8', width: '140px' }}></img>
                                                </a>

                                            </Tooltip>
                                            {/* <div className="share my-auto">
                                                <i class="fa-solid fa-share-nodes p-3 text-white"></i>
                                            </div> */}
                                        </div>
                                        <div className="my-auto">
                                            <div className="coupon-btn-div">


                                                <button className='bg-transparent border-0' onClick={() => handleItem("save")}>
                                                    <Tooltip title="Add to Cart">
                                                        {isLoading.save ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                            data.save ?


                                                                <IconFont type="icon-shoppingcart" />

                                                                :

                                                                <ShoppingCartOutlined />

                                                        }
                                                    </Tooltip>
                                                </button>
                                                <button className='bg-transparent border-0' onClick={() => handleItem("wishlist")}>
                                                    <Tooltip title="wishlist">

                                                        {isLoading.wishlist ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                            data.wishlist ?

                                                                <HeartFilled />
                                                                :

                                                                <HeartOutlined />
                                                        }

                                                    </Tooltip>
                                                </button>
                                                <button className='bg-transparent border-0' onClick={() => handleItem("like")}>
                                                    <Tooltip title="like">

                                                        {isLoading.like ? <div className="spinner d-flex justify-content-center align-items-center">
                                                            <div className="spinner-border" style={{ "float": "right" }} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div> :
                                                            data.like ?
                                                                <LikeFilled />

                                                                :

                                                                <LikeOutlined />
                                                        }

                                                        <small className="my-auto">{data.like_count}</small>
                                                    </Tooltip>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="coupon-desc">
                                    <p className="light-black para-sm"  >Discover products with confidence on Discount Space. We provide product descriptions and pictures for reference. Before purchasing, view the full product listing on {data.store?.title}.</p>
                                </div>
                                <hr />
                                <div className="coupon-about-product ">
                                    <h5>About the Product</h5>
                                    <ul className={`${ReadMore ? 'showless' : ''}`}>
                                        <div dangerouslySetInnerHTML={{ __html: data.coupon.long_description }}></div>
                                    </ul>
                                    <button href="#" class="btn text-dark bg-white shadow-sm bg-white fullfill-btn px-5 py-2 rounded-5" onClick={showmore}>
                                        {ReadMore ? 'Read More' : 'Read Less'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        :

                        <div className="mt-4">
                            <Spinner />
                        </div>

                }


            </div>
            <div className="container-fluid px-0">

                {user &&

                    <div class="pd_comment_sec my-4 bg-black d-flex justify-content-center">
                        <div class="row container">
                            <div class="col-12  w-100 py-3 text-light fs-5">COMMENTS</div>
                        </div>
                    </div>

                }

            </div>
            <div className="container">
                <div className="row">

                    {user ?
                        <>
                            <div className="col-12">

                                <input type="hidden" name="ReferenceType" value="coupon" />
                                <div class="container-fluid px-0">
                                    <div class="row  comment_box m-0 com_card">

                                        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12 col-12 my-2 file pe-0 ps-md-auto ps-0 position-relative">

                                            <div class="image-upload-wrap">
                                                <input name="image" class="file-upload-input w-100 h-100" type="file" onChange={(e) => onImageChange(e)} accept="image/*" />
                                                <div class="fa fa-plus display-2" aria-hidden="true"></div>
                                            </div>
                                            {image &&

                                                <div class="file-upload-content position-absolute top-0 start-0 w-100 h-100">
                                                    <img class="file-upload-image w-100" src={image} alt="your image" />
                                                </div>

                                            }
                                        </div>
                                        <div class="col-lg-10 col-md-10 col-sm-9 col-xm-12 col-12 my-2 comment pe-0 ps-md-auto ps-0">
                                            <textarea name="comment" ref={comment} style={{ 'resize': 'none' }} class="text-dark h-100 form-control py-2 shadow-none rounded-0 border border-muted" placeholder="Type Comment Here..."></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 my-md-3 my-0 text-end">
                                            <div class="submit_btn">
                                                <button type="button" onClick={onPostComment} class="btn custom_btn rounded-pill p-0 shadow-none bg-signature"><PromiseButton loading={isLoading} title={'Submit'} typ={'text-white'} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pd_comment_sec my-4 container-fluid px-1">
                                    <di class="row shadow com_card w-100 mx-auto">
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-2 px-3 my-auto mx-auto text-end">
                                            <img src="https://picsum.photos/800/400?img=6" class="w-100 my-4" alt="" />
                                        </div>
                                        <div class="col-lg-8 col-md-9 col-sm-8 col-8 my-auto py-3">
                                            <p class="text-main fs-5 fw-sm-bold">
                                                V_OR5SGFDD
                                            </p>
                                            <p class="text-muted fw-normal fs-10">
                                                Hey Bro
                                            </p>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-2 col-2 my-3 text-muted fw-sm-bold fs-8">2023-01-09 08:29:59</div>
                                    </di>
                                </div>
                            </div>

                        </>
                        :

                        <div className="col-12">
                            <div className="col-12">
                                <div class="shadow py-md-3 py-3 px-md-4 px-1 d-flex justify-content-center rounded-5">
                                    <div class="row w-100">
                                        <div class="col-lg-2 px-0 col-md-2 col-12 left-content d-flex justify-content-center align-items-center">
                                            <div class="img">
                                                <img style={{ 'height': '80px', 'width': '120px', 'objectFit': 'contain' }} src={Logo} alt="Discount Space" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 px-0 col-md-6 col-12 left-content d-flex justify-content-center align-items-center">
                                            <p class="fs-6 mb-0 mx-md-4 mx-2">
                                                <Link to="/login"> Log in</Link> or
                                                <Link to="/register"> Sign up</Link> for a <span class="text-uppercase"> {APP_NAME.split('-')[1]}</span> account to post comment.
                                            </p>
                                        </div>
                                        <div class="right-content col-lg-4 px-0 col-md-4 col-12 d-flex justify-content-center align-items-center mt-md-0 mt-2">
                                            <div class="btns d-flex">
                                                <div class="login mx-1">
                                                    <Link to="/login" class="text-dark btn shadow-none border-0 outline-none px-3 py-2 rounded-pill">Log
                                                        in</Link>
                                                </div>
                                                <div class="signup">
                                                    <Link to="/register" class="bg-signature text-white btn shadow-none border-0 outline-none px-3 py-2 rounded-pill">Sign
                                                        up</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </motion.div>
    )
}










