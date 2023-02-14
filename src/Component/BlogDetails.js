import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Spinner } from './Spinner';
import { toast } from 'react-toastify';
import Item from 'antd/es/list/Item';

export const BlogDetails = () => {

    const params = useParams();
    const singleBlog = params.singleBlog;
    const [data, setData] = useState([]);
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { APP_NAME, setTitle, URL, API_TOKEN } = useContext(AppContext);

    useEffect(() => {
        fetch(`${URL}api/web/single-blog/${singleBlog}`)
            .then((response) => response.json())
            .then((actualData) => { setData(actualData.data); setIsLoading(false); setImg(actualData.image_path); setTitle(`${actualData.data.title ? actualData.data.title : "Blog"}${APP_NAME}`); })
            .catch((err) => {
                setData([]);
                setIsLoading(false);
                toast.error("something went wrong!");
                setTitle(`${"Blog"}${APP_NAME}`);
            })
    }, []);


    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>            <div className='sec py-5'>
                {data && data.id &&
                    <div className="container text-start single-blog">
                        <div className="row">
                            <div className="col-12">
                                <h2 class=" fs-2 main-heading fw-sm-bold text-start p-0 text-truncate">
                                    {data.title}
                                </h2>
                                <p class="fs-6 text-muted fw-sm-bold">

                                    By {data.username} Last Updated on {data.updated_at.split("T")[0]}
                                </p>
                                <p class="fs-6 text-main fw-sm-bold">

                                    0 Comments

                                </p>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div dangerouslySetInnerHTML={{ __html: data.long_description }}>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {isLoading && <Spinner />}
            </div>
        </motion.div>
    )
}
