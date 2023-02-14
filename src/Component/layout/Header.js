import Logo from '../assets/discount-space-logo.png';
import Logowhite from '../assets/discount-space-logo-whitee.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from '../../context/AppContext';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Spinner } from '../Spinner';
import { TagsHeader } from './TagsHeader';

export const Header = () => {
    const { user, removeUserData, dispatch, heartedTags, URL } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [stores, setStores] = useState([]);


    useEffect(() => {
        fetch(`${URL}api/web/stores`)
            .then((response) => response.json())
            .then((actualData) => { setStores(actualData); })
            .catch((err) => {
                setStores([]);
            });
        fetch(`${URL}api/web/category?type=coupon`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); })
            .catch((err) => {
                setData([]);
            });
    }, []);


    const { search, setSearch } = useContext(AppContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isActive, setActive] = useState(false);
    const [ismobnav, setmobnav] = useState(true);
    const [ismobnavstore, setmobnavstore] = useState(true);
    const [ismobprofile, setmobprofile] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
        setActive(false);
    }, [pathname])

    const toggleClass = () => {
        setActive(!isActive);
    };

    const toggleMobNav = () => {
        setmobnav(!ismobnav);
    };
    const toggleMobNavStore = () => {
        setmobnavstore(!ismobnavstore);
    };
    const toggleMobNavProfile = () => {
        setmobprofile(!ismobprofile);
    };

    const Logout = () => {
        dispatch(removeUserData(user.id));
        navigate("/login")
    }

    // var tabsBox = useRef(null);
    // var allTabs = useRef(null);
    // var arrowIcons = useRef(null);
    // console.log(allTabs.current);
    // tabsBox = tabsBox.current;
    // allTabs = allTabs.current;
    // arrowIcons = arrowIcons.current;

    // console.log(tabsBox,
    //     allTabs,
    //     arrowIcons);



    return (
        <>
            <div className={`navigation-wrap bg-white start-header start-style ${isActive && "position-fixed"}`}>
                <div className="">
                    <div className="row w-100 ">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-md navbar-light px-xl-3 px-3">
                                <Link to={'/'}>
                                    <img src={Logo} alt="Discount Space" className='blogo' width="180" />
                                    <img src={Logowhite} alt="Discount Space" className='wlogo mobLogo' width="180" />
                                </Link>

                                <div className='d-flex gap-4'>
                                    {/* <div class="custom-dropdown-area mx-2 mobflag text-uppercase position-relative">
                                        <div class="dropdown-toggle country-list flag">
                                            <img src="https://discounts-space.com/flags/us.svg" class="" style={{ width: '35px' }} alt="US Selected" />

                                            <ul class="custom-Dropdown p-2" >
                                                <li>
                                                    <a class="dropdown-item" href="https://www.discounts-space.com/countrysort/226">
                                                        <img src="https://www.discounts-space.com/flags/us.svg" class="" style={{ width: "35px" }} alt="US" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                    <span className='my-auto'><i class="fa fa-search search-toggle" onClick={toggleClass} aria-hidden="true"></i></span>
                                    <button class={`navbar-toggler ${isActive ? "notactive" : "Activated"}`} onClick={toggleClass}>
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                                <div class={`nav-css navbar-collapse justify-content-between ${isActive ? " " : "show"}`} id="navbarSupportedContent">
                                    <div className='d-flex mx-auto'>
                                        <div className="col-md-12 col-sm-2">
                                            <form class="m-0 searchbar position-relative" action='/search/&'>
                                                <div class="search ps-3 w-100 d-flex justify-content-between mx-2 rounded-3 border border-white shadow overflow-hidden">
                                                    <div class="fields  my-auto">
                                                        <input type="text" name="query_search" class="searchbar mx-2 w-100 border-0" onChange={(e) => setSearch(e.target.value)} placeholder="Search Coupons &amp; Deals" id="show-user" />
                                                    </div>
                                                    <button type='submit' class="search-btn main-header-search border-0 py-2 px-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-search" viewBox="0 0 16 16">
                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='d-flex '>
                                        {/* <div class="custom-dropdown-area mx-4 text-uppercase position-relative">
                                            <div class="dropdown-toggle country-list flag">
                                                <img src="https://discounts-space.com/flags/us.svg" class="" style={{ width: '35px' }} alt="US Selected" />

                                                <ul class="custom-Dropdown p-2" >
                                                    <li>
                                                        <a class="dropdown-item" href="https://www.discounts-space.com/countrysort/226">
                                                            <img src="https://www.discounts-space.com/flags/us.svg" class="" style={{ width: "35px" }} alt="US" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}
                                        <div class="right-links">


                                            {user ?

                                                <div class="custom-dropdown-area cat-dropdown text-uppercase">
                                                    <li class="list-unstyled dropdown-toggle" data-bs-toggle="dropdown"><Link to="#"><i className='fa fa-user-alt me-3'></i>{user.data.name}</Link></li>

                                                    <ul class="custom-Dropdown dd" id="style-1" style={{ display: 'block' }}>



                                                        <li><Link class="dropdown-item" to={'/my-account'}>My Account</Link></li>
                                                        <li><Link class="dropdown-item" onClick={Logout}>Logout</Link></li>



                                                    </ul>
                                                </div>
                                                :
                                                <div class="buttons d-flex justify-content-center">
                                                    <Link to={'/login'} class="btn log text-dark  py-2">
                                                        LOGIN
                                                    </Link>
                                                    <Link to="register" class="btn bg-signature text-white px-4 py-2 rounded-3">
                                                        SIGNUP
                                                    </Link>
                                                </div>

                                            }
                                        </div>
                                    </div>
                                </div>
                            </nav>

                            <span class={`overlay  ${isActive && "is-active"}`}></span>
                            <nav class={`sidebar mob px-0 ${isActive && "show"}`}>

                                <ul class="list">
                                    <li class="px-2 lh">
                                        <form class="m-0 searchbar position-relative" action='/search/&'>
                                            <div class="search ps-2 d-flex justify-content-between mx-2 rounded-3 border border-white shadow overflow-hidden">
                                                <div class="fields">
                                                    <input type="text" name="query_search" class="ps-3" onChange={(e) => setSearch(e.target.value)} placeholder="Search Coupons &amp; Deals" id="show-user" />
                                                </div>
                                                <button type="submit" class="search-btn main-header-search border-0 py-2 px-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* <ul class="searchData" id="style-1"></ul> */}

                                        </form>



                                    </li>
                                    <li>
                                        <a href="#" onClick={toggleMobNav} class="comm-btn"  >
                                            <svg width="18" height="18" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m5.07 4.5.337.668L5.82 6H9v3.75H3V4.5h2.07ZM5.535 3H2.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75h-3l-.54-1.087A.75.75 0 0 0 5.535 3Z"></path>
                                                <path d="m17.07 4.5.337.668.413.832H21v3.75h-6V4.5h2.07Zm.465-1.5H14.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75h-3l-.54-1.087A.75.75 0 0 0 17.535 3Z"></path>
                                                <path d="m5.07 14.25.337.668.413.832H9v3.75H3v-5.25h2.07Zm.465-1.5H2.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-3l-.54-1.088a.75.75 0 0 0-.675-.412Z"></path>
                                                <path d="m17.07 14.25.337.668.413.832H21v3.75h-6v-5.25h2.07Zm.465-1.5H14.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-3l-.54-1.088a.75.75 0 0 0-.675-.412Z"></path>
                                            </svg>
                                            &nbsp;
                                            Category
                                            <span class={` ${ismobnav ? "fas fa-caret-down third" : "fas fa-caret-down third rotate"}`} aria-hidden="true"></span>
                                        </a>
                                        <ul class={` ${ismobnav ? "comm-show" : "comm-show show2"}`}>
                                            {data

                                                ?

                                                data.map((item) => {
                                                    return <li key={item.id}><Link class="dropdown-item" to={`/collections/${item.slug}`}>{item.title}</Link></li>
                                                })

                                                :

                                                <Spinner />

                                            }


                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" onClick={toggleMobNavStore} class="comm-btn"  >

                                            <svg width="18" height="18" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m22.5 8.011-1.5-4.5a.75.75 0 0 0-.75-.51H3.75a.75.75 0 0 0-.75.51l-1.5 4.5c-.01.08-.01.16 0 .24v4.5a.75.75 0 0 0 .75.75H3v7.5h1.5v-7.5H9v7.5h12v-7.5h.75a.75.75 0 0 0 .75-.75v-4.5a.877.877 0 0 0 0-.24Zm-3 11.49h-9v-6h9v6Zm1.5-7.5h-3v-3h-1.5v3h-3.75v-3h-1.5v3H7.5v-3H6v3H3v-3.63l1.29-3.87h15.42L21 8.371v3.63Z"></path>
                                            </svg> &nbsp;
                                            Store
                                            <span class={` ${ismobnavstore ? "fas fa-caret-down third" : "fas fa-caret-down third rotate"}`} aria-hidden="true"></span>
                                        </a>
                                        <ul class={` ${ismobnavstore ? "comm-show" : "comm-show show2"}`}>
                                            {stores

                                                ?

                                                stores.map((item) => {
                                                    return <li key={item.id}><Link class="dropdown-item" to={`/stores/${item.slug}`}>{item.title}</Link></li>
                                                })

                                                :

                                                <Spinner />

                                            }


                                        </ul>
                                    </li>
                                    <li class=" linkz  ">
                                        <Link to="coupons">  <svg width="18" height="18" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.75 10.5a.75.75 0 0 0 .75-.75V6A1.5 1.5 0 0 0 21 4.5H3A1.5 1.5 0 0 0 1.5 6v3.75a.75.75 0 0 0 .75.75 1.5 1.5 0 1 1 0 3 .75.75 0 0 0-.75.75V18A1.5 1.5 0 0 0 3 19.5h18a1.5 1.5 0 0 0 1.5-1.5v-3.75a.75.75 0 0 0-.75-.75 1.5 1.5 0 1 1 0-3ZM21 14.902V18h-5.25v-2.25h-1.5V18H3v-3.098a3 3 0 0 0 0-5.804V6h11.25v2.25h1.5V6H21v3.098a3 3 0 0 0 0 5.804Z"></path>
                                            <path d="M15.75 9.75h-1.5v4.5h1.5v-4.5Z"></path>
                                        </svg>&nbsp;Coupons</Link>
                                    </li>
                                    <li class=" linkz">
                                        <Link to="deals"> <img src="https://img.icons8.com/ios/50/null/handshake--v1.png" width={18} height={18} />&nbsp;
                                            Deals</Link>
                                    </li>
                                    <li class=" linkz  ">
                                        <Link to="/video"> <svg width="18" height="18" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.75 19.5H3A1.5 1.5 0 0 1 1.5 18V6A1.5 1.5 0 0 1 3 4.5h12.75a1.5 1.5 0 0 1 1.5 1.5v3.045l4.065-2.902a.75.75 0 0 1 1.185.607v10.5a.75.75 0 0 1-1.185.608l-4.065-2.903V18a1.5 1.5 0 0 1-1.5 1.5ZM3 6v12h12.75v-4.5a.75.75 0 0 1 1.185-.607L21 15.794v-7.59l-4.065 2.902a.75.75 0 0 1-1.185-.607V6H3Z"></path>
                                        </svg>&nbsp;Video</Link>
                                    </li>
                                    <li class="linkz  ">
                                        <Link to="/blog">  <svg width="18" height="18" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 18H3v1.5h7.5V18Z"></path>
                                            <path d="M10.5 13.5H3V15h7.5v-1.5Z"></path>
                                            <path d="M19.5 10.5h-15A1.5 1.5 0 0 1 3 9V4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5V9a1.5 1.5 0 0 1-1.5 1.5Zm-15-6V9h15V4.5h-15Z"></path>
                                            <path d="M19.5 21H15a1.5 1.5 0 0 1-1.5-1.5V15a1.5 1.5 0 0 1 1.5-1.5h4.5A1.5 1.5 0 0 1 21 15v4.5a1.5 1.5 0 0 1-1.5 1.5ZM15 15v4.5h4.5V15H15Z"></path>
                                        </svg> &nbsp;Blog</Link>
                                    </li>
                                    <li class="linkz  ">
                                        <Link to="/contact">  <svg width="22" height="22" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"></path>
                                            <path d="M11 12.5a3 3 0 0 0-3 3 1 1 0 0 0 1 1h6a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-2Z"></path>
                                            <path fill-rule="evenodd" d="M7.543 2.883a31.331 31.331 0 0 1 8.913 0 3.196 3.196 0 0 1 2.73 2.874l.126 1.396c.293 3.225.293 6.47 0 9.694l-.127 1.396a3.197 3.197 0 0 1-2.729 2.874 31.334 31.334 0 0 1-8.913 0 3.197 3.197 0 0 1-2.728-2.874l-.127-1.396a53.504 53.504 0 0 1 0-9.694l.127-1.396a3.197 3.197 0 0 1 2.728-2.874Zm8.7 1.484a29.832 29.832 0 0 0-8.486 0 1.697 1.697 0 0 0-1.448 1.526l-.127 1.396a52.003 52.003 0 0 0 0 9.422l.127 1.396c.07.783.67 1.414 1.448 1.526a29.86 29.86 0 0 0 8.486 0 1.696 1.696 0 0 0 1.448-1.526l.127-1.396a52.009 52.009 0 0 0 0-9.422l-.127-1.396a1.697 1.697 0 0 0-1.448-1.526Z" clip-rule="evenodd"></path>
                                        </svg>

                                            &nbsp;Contact</Link>
                                    </li>


                                    {user ?

                                        <li>
                                            <a href="#" onClick={toggleMobNavProfile} class="comm-btn"  ><i className='fa fa-user-alt me-3'></i>{user.data.name}
                                                <span class={` ${ismobprofile ? "fas fa-caret-down third" : "fas fa-caret-down third rotate"}`} aria-hidden="true"></span>
                                            </a>
                                            <ul class={` ${ismobprofile ? "comm-show" : "comm-show show2"}`}>
                                                <li><Link class="dropdown-item" to={`/my-account`}>My Account</Link></li>
                                                <li><Link class="dropdown-item" onClick={Logout}>Logout</Link></li>

                                            </ul>
                                        </li>


                                        :


                                        <li class="px-3 py-3">
                                            <div class="side-nav-buttons d-flex">
                                                <Link to="/login" class="log rounded-pill mx-1 px-4 text-center text-black">Login</Link>
                                                <Link to="/register" class="sign bg-signature px-4 mx-1 text-center rounded-3">Signup</Link>
                                            </div>
                                        </li>

                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div >
            <div class="top-links bg-main nav-2 container-fluid">
                <div class="row">
                    <div class="col-12 d-flex justify-content-center ">
                        <div class="custom-dropdown-area cat-dropdown mx-4 text-uppercase">
                            <li class="list-unstyled  dropdown-toggle py-3" data-bs-toggle="dropdown"><Link to="#jgggg">
                                <svg width="18" height="18" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m5.07 4.5.337.668L5.82 6H9v3.75H3V4.5h2.07ZM5.535 3H2.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75h-3l-.54-1.087A.75.75 0 0 0 5.535 3Z"></path>
                                    <path d="m17.07 4.5.337.668.413.832H21v3.75h-6V4.5h2.07Zm.465-1.5H14.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75h-3l-.54-1.087A.75.75 0 0 0 17.535 3Z"></path>
                                    <path d="m5.07 14.25.337.668.413.832H9v3.75H3v-5.25h2.07Zm.465-1.5H2.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-3l-.54-1.088a.75.75 0 0 0-.675-.412Z"></path>
                                    <path d="m17.07 14.25.337.668.413.832H21v3.75h-6v-5.25h2.07Zm.465-1.5H14.25a.75.75 0 0 0-.75.75v6.75a.75.75 0 0 0 .75.75h7.5a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-3l-.54-1.088a.75.75 0 0 0-.675-.412Z"></path>
                                </svg>
                                &nbsp; CATEGORIES</Link></li>

                            <ul class="custom-Dropdown dd" id="style-1" style={{ display: 'block' }}>


                                {data

                                    ?

                                    data.map((item) => {
                                        return <li key={item.id}><Link class="dropdown-item" to={`/collections/${item.slug}`}>{item.title} </Link></li>
                                    })

                                    :

                                    <Spinner />

                                }


                            </ul>
                        </div>


                        <div class="custom-dropdown-area cat-dropdown mx-4 text-uppercase">
                            <li class="list-unstyled  dropdown-toggle py-3" data-bs-toggle="dropdown"><Link to="#jgggg">
                                <svg width="18" height="18" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m22.5 8.011-1.5-4.5a.75.75 0 0 0-.75-.51H3.75a.75.75 0 0 0-.75.51l-1.5 4.5c-.01.08-.01.16 0 .24v4.5a.75.75 0 0 0 .75.75H3v7.5h1.5v-7.5H9v7.5h12v-7.5h.75a.75.75 0 0 0 .75-.75v-4.5a.877.877 0 0 0 0-.24Zm-3 11.49h-9v-6h9v6Zm1.5-7.5h-3v-3h-1.5v3h-3.75v-3h-1.5v3H7.5v-3H6v3H3v-3.63l1.29-3.87h15.42L21 8.371v3.63Z"></path>
                                </svg> &nbsp;
                                Stores</Link></li>

                            <ul class="custom-Dropdown dd" id="style-1" style={{ display: 'block' }}>


                                {stores

                                    ?

                                    stores.map((item) => {
                                        return <li key={item.id}><Link class="dropdown-item" to={`/stores/${item.slug}`}>{item.title} </Link></li>
                                    })

                                    :

                                    <Spinner />

                                }


                            </ul>
                        </div>

                        <Link to="coupons" class="mx-4 text-uppercase py-3
                         list-unstyled li-links py-2
                        ">
                            <svg width="18" height="18" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.75 10.5a.75.75 0 0 0 .75-.75V6A1.5 1.5 0 0 0 21 4.5H3A1.5 1.5 0 0 0 1.5 6v3.75a.75.75 0 0 0 .75.75 1.5 1.5 0 1 1 0 3 .75.75 0 0 0-.75.75V18A1.5 1.5 0 0 0 3 19.5h18a1.5 1.5 0 0 0 1.5-1.5v-3.75a.75.75 0 0 0-.75-.75 1.5 1.5 0 1 1 0-3ZM21 14.902V18h-5.25v-2.25h-1.5V18H3v-3.098a3 3 0 0 0 0-5.804V6h11.25v2.25h1.5V6H21v3.098a3 3 0 0 0 0 5.804Z"></path>
                                <path d="M15.75 9.75h-1.5v4.5h1.5v-4.5Z"></path>
                            </svg>&nbsp;
                            Coupons</Link>
                        <Link to="deals" class="mx-4 text-uppercase py-3
                         list-unstyled li-links py-2
                        ">
                            <img src="https://img.icons8.com/ios/50/null/handshake--v1.png" width={18} height={18} style={{ filter: "invert(1)" }} />&nbsp;
                            Deals</Link>
                        <Link to="video" class="mx-4 text-uppercase py-3
                           list-unstyled li-links py-2
                           ">
                            <svg width="18" height="18" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.75 19.5H3A1.5 1.5 0 0 1 1.5 18V6A1.5 1.5 0 0 1 3 4.5h12.75a1.5 1.5 0 0 1 1.5 1.5v3.045l4.065-2.902a.75.75 0 0 1 1.185.607v10.5a.75.75 0 0 1-1.185.608l-4.065-2.903V18a1.5 1.5 0 0 1-1.5 1.5ZM3 6v12h12.75v-4.5a.75.75 0 0 1 1.185-.607L21 15.794v-7.59l-4.065 2.902a.75.75 0 0 1-1.185-.607V6H3Z"></path>
                            </svg>&nbsp;
                            Video Show</Link>
                        <Link to="blog" class="mx-4 text-uppercase py-3
                        list-unstyled li-links py-2
                          ">
                            <svg width="18" height="18" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 18H3v1.5h7.5V18Z"></path>
                                <path d="M10.5 13.5H3V15h7.5v-1.5Z"></path>
                                <path d="M19.5 10.5h-15A1.5 1.5 0 0 1 3 9V4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5V9a1.5 1.5 0 0 1-1.5 1.5Zm-15-6V9h15V4.5h-15Z"></path>
                                <path d="M19.5 21H15a1.5 1.5 0 0 1-1.5-1.5V15a1.5 1.5 0 0 1 1.5-1.5h4.5A1.5 1.5 0 0 1 21 15v4.5a1.5 1.5 0 0 1-1.5 1.5ZM15 15v4.5h4.5V15H15Z"></path>
                            </svg> &nbsp;
                            blog</Link>
                        <Link to="contact" class="mx-4 text-uppercase py-3
                        list-unstyled li-links py-2
                          ">
                            <svg width="22" height="22" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"></path>
                                <path d="M11 12.5a3 3 0 0 0-3 3 1 1 0 0 0 1 1h6a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-2Z"></path>
                                <path fill-rule="evenodd" d="M7.543 2.883a31.331 31.331 0 0 1 8.913 0 3.196 3.196 0 0 1 2.73 2.874l.126 1.396c.293 3.225.293 6.47 0 9.694l-.127 1.396a3.197 3.197 0 0 1-2.729 2.874 31.334 31.334 0 0 1-8.913 0 3.197 3.197 0 0 1-2.728-2.874l-.127-1.396a53.504 53.504 0 0 1 0-9.694l.127-1.396a3.197 3.197 0 0 1 2.728-2.874Zm8.7 1.484a29.832 29.832 0 0 0-8.486 0 1.697 1.697 0 0 0-1.448 1.526l-.127 1.396a52.003 52.003 0 0 0 0 9.422l.127 1.396c.07.783.67 1.414 1.448 1.526a29.86 29.86 0 0 0 8.486 0 1.696 1.696 0 0 0 1.448-1.526l.127-1.396a52.009 52.009 0 0 0 0-9.422l-.127-1.396a1.697 1.697 0 0 0-1.448-1.526Z" clip-rule="evenodd"></path>
                            </svg>

                            &nbsp;
                            contact</Link>
                    </div>
                </div>
            </div>
          
        </>
    )
}
