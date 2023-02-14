import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Item from 'antd/es/list/Item';
import { AppContext } from '../../context/AppContext';
import { Spinner } from '../Spinner';
import { HeartOutlined, HeartFilled, LikeFilled, LikeOutlined, BookFilled, BookOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export const SingleVideo = () => {

    const params = useParams();
    const singleVideo = params.singleVideo;
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { APP_NAME, setTitle, URL, API_TOKEN } = useContext(AppContext);

    useEffect(() => {
        fetch(`${URL}api/web/videos/${singleVideo}`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData); setIsLoading(false); setImg(actualData.image_path);setTitle(`${actualData.data.title ? actualData.data.title : "Blog"}${APP_NAME}`); })
            .catch((err) => {
                setData([]);
                setIsLoading(false);
                setTitle(`${"Video"}${APP_NAME}`);
                toast.error("something went wrong!");
            });
    }, []);

 

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>

            <div className="sect py-md-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between">

                                <h1 className="heading">
                                    {data.data && data.data.title}
                                </h1>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div class="main_videos container my-4">
                    <div class="row">
                        <div class="col-lg-11 col-md-11 col-sm-12 col-12 my-2 card_pp mx-auto">
                            <div class="card p-4 border-0 shadow">
                                {data.data &&
                                    <video src={`${data.video_path}/${data.data.video}`} controls poster={`${data.thumbnail_path}/${data.data.thumbnail}`}></video>
                                }
                                <div class="row w-100 mx-auto">
                                    <div class="col-6 p-2">
                                        <div class="one d-flex me-2 align-items-center">
                                            <img style={{ filter: 'invert(1)' }} src="https://discounts-space.com/frontend/img/Icon awesome-eye.png" class="w-16" alt="eye" />
                                            <p class="mb-0 mx-1 " style={{ fontSize: '13px' }}>
                                                29.5k
                                            </p>
                                        </div>

                                    </div>
                                    <div class="col-6 d-flex justify-content-end align-items-center">
                                        <div style={{ gap: '8px' }} class="d-flex align-items-center justify-content-end card-icon-pack">

                                            <Tooltip title="like">
                                                <div class="d-flex align-items-center btn bg-white">
                                                    <div className="btn p-0">
                                                        <LikeOutlined />
                                                    </div>
                                                    <p class="px-1 expiry like-count mb-0">0</p>
                                                </div>

                                            </Tooltip>
                                        </div>

                                    </div>

                                </div>

                                <div class="row w-100 mx-auto">
                                    <div class="col-6 p-2">
                                        <div class="custom-dropdown-area UserProfile">
                                            <div class="User-avtar d-flex align-items-center">
                                                <img style={{ 'boxShadow': 'none', filter: 'unset' }} src="https://discounts-space.com/images/profile/16654974894661948310.jpg" class="shadow rounded-circle" />
                                                <h6 class="user_name px-3 mb-0">
                                                    Discount Space
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4 class="mt-2">{data.data && data.data.title}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Spinner />}
        </motion.div>
    )
}
