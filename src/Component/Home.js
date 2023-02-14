import { Pagination, Segmented } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import slider0 from "./assets/DiscountSp/slider.png";
import { motion } from 'framer-motion';
import { List } from './Coupon/List';
import { Deal } from './Deals/Deal';
import { Spinner } from './Spinner';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { TagsHeader } from './layout/TagsHeader';



export const Home = () => {

    const { URL, API_TOKEN, user, dispatch, style, setStyle, APP_NAME, setTitle, heartedTags } = useContext(AppContext);

 

    const [isLoading, setIsLoading] = useState(true);
    const [isStoreLoading, setIsStoreLoading] = useState(true);
    const [dataFrom, setDataFrom] = useState(0);
    const [dataTo, setDataTo] = useState(30);
    const [isErr, setIsError] = useState(false);
    const [currTab, setCurrTab] = useState(1);
    const [vll, setvll] = useState(1);
    const [slider, setSlider] = useState([]);
    const [dataDeal, setDealData] = useState([]);
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);
    const [imgDeal, setDealImg] = useState(null);

    var len = Math.ceil(data.length / 30);

    useEffect(() => {
        setTitle(`Home${APP_NAME}`);
        fetch(`${URL}public/api/web/coupons?user_id=${user ? user.data.id : ""}&type=&category_ids=&store_id=&discount=&sort=0&min_price=&max_price=&type=deals&graph=featured&api_token=${API_TOKEN}`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData); setIsLoading(false); setImg(actualData.media_path); })
            .catch((err) => {
                setData([]);
                setIsError(true);
                setIsLoading(false);
                toast.error("something went wrong!");
            }
            );
        fetch(`${URL}public/api/web/slider`)
            .then((response) => response.json())
            .then((actualData) => { setSlider(actualData); })
            .catch((err) => {
                setSlider([]);
                toast.error("something went wrong!");
            }
            );
        fetch(`${URL}public/api/web/coupons?user_id=${user ? user.data.id : ""}&type=&category_ids=&store_id=&discount=&sort=0&min_price=&max_price=&type=deals&graph=hot&api_token=${API_TOKEN}`)
            .then((response) => response.json())
            .then((actualData) => { setDealData(actualData); setIsStoreLoading(false); setDealImg(actualData.media_path); })
            .catch((err) => {
                setData([]);
                setIsError(true);
                setIsStoreLoading(false);
                toast.error("something went wrong!");
            }
            );
    }, []);


    const page = useRef(null);

    const LoadMore = (e) => {

        page.current.scrollIntoView({ behavior: 'smooth' });
        setvll(e)
        setTimeout(() => {
            if (len === e) {
                let val = len - 1;
                val *= 30;
                setDataFrom(val);
                setDataTo(data.length);
            }
            else if (e === 1) {
                setDataFrom(0);
                setDataTo(30);
            }
            else {
                setDataFrom(e * 30 - 30);
                setDataTo(e * 30);
            }
            setIsLoading(false);
        }, 1000);
        setIsLoading(true);
    }

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            {user && heartedTags.length != 0 ?
                <TagsHeader /> : ""
            }
            {slider.data ?

                <div className="section sec-1" ref={page}>

                    <div className="slider">
                        <div id="carouselExample" className="carousel slide">
                            {slider.data.map((item) => {
                                return <div className="carousel-inner" key={item.id}>
                                    <div className="carousel-item active">
                                        <img src={`${slider.image_path}/${item.image}`} className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                            })}

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>

                : ""}

            <div className="sect py-md-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className='row w-100 mx-auto'>
                                <div className="col-12">

                                    <div className="d-flex justify-content-between">

                                        <h1 className="heading">
                                            Featured Deals
                                        </h1>
                                        <div>
                                            <Segmented
                                                onChange={(e) => dispatch(setStyle(e))}
                                                defaultValue={style}
                                                options={[
                                                    {
                                                        value: 'List',
                                                        icon: <BarsOutlined />,
                                                    },
                                                    {
                                                        value: 'Kanban',
                                                        icon: <AppstoreOutlined />,
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isLoading ?

                                    <Spinner />
                                    :
                                    <>

                                        {data && data.slice(dataFrom, dataTo).map((item) => {
                                            return <List style={style} singleurl={item.coupon.slug} key={item.coupon.id} item={item} user={user} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                        })}

                                        {data && data.length > 30 &&

                                            <div className='pagination mt-4 justify-content-center' >
                                                <Pagination defaultCurrent={vll} total={len} pageSize={1} showPrevNextJumpers={true} onChange={(e) => LoadMore(e)} />
                                            </div>

                                        }

                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 p-md-0 mt-md-0 mt-5">
                            <div className='row w-100 mx-auto'>
                                <div className="col-12">
                                    <h1 className="heading">
                                        hot deals
                                    </h1>
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    {isStoreLoading ?

                                        <Spinner />
                                        :
                                        <>

                                            {dataDeal && dataDeal.slice(0, 30).map((item) => {
                                                return <Deal key={item.coupon.id} img={`${item.image_path}/${item.media.image}`} title={item.coupon.title} link={`${item.coupon.slug}`} />
                                            })}


                                        </>
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
