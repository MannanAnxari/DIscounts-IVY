
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { List } from '../Coupon/List';
import { Filter } from '../Filter/Filter';
import { Spinner } from '../Spinner';
import { motion } from 'framer-motion';

import { Pagination, Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Grid } from '../Coupon/Grid';
import { AppContext } from '../../context/AppContext';


export const Deals = () => {
    const { user, dispatch, setTitle, APP_NAME, style, setStyle } = useContext(AppContext);

    const [category, setCategory] = useState([]);
    const [discount, setDiscount] = useState([]);
    const refMinPrice = useRef([null]);
    const refMaxPrice = useRef([]);
    const [sort, setSort] = useState(0);
    const [store, setStore] = useState("");
    const params = useParams();
    const value = params.value;
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchedCoupons, setSearchedCoupons] = useState([]);
    const [filterState, setFilterState] = useState(true);
    const [dataFrom, setDataFrom] = useState(0);
    const [dataTo, setDataTo] = useState(30);
    var len = Math.ceil(data.length / 30);
    const [vll, setvll] = useState(1);

    useEffect(() => {
        setTitle(`Deals${APP_NAME}`);
    }, [])

    const LoadMore = (e) => {

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
        }, 2000);
        setIsLoading(true);

    }

    return (
        <motion.div initial={{ transition: { duration: 1 }, opacity: 0 }} animate={{ transition: { duration: 1 }, opacity: 1 }} exit={{ transition: { duration: 1 }, opacity: 0 }}>
            <div class="container-fluid">
                <div class="row shadow-sm">
                    <div class="col-md-12 py-3">
                        <h1 class="text-uppercase text-black m-0">Deals</h1>
                    </div>
                </div>
            </div>
            <div className="sect py-md-5 py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between">
                                <div></div>
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
                    </div>
                    <div className="row">
                        <div className="row w-100 mx-auto px-0">
                            <div class="col-lg-3 col-md-12 col-sm-12 px-md-3 px-md-0">
                                <div class=" shadow border-0 rounded-4 my-1">
                                    <div class="col-12">
                                        <button class="btn bg-signature text-white w-100 px-3 py-2" id="toggle_filter" onClick={() => setFilterState(!filterState)}>Filters</button>
                                        <Filter
                                            setCategory={setCategory}
                                            category={category}
                                            setDiscount={setDiscount}
                                            discount={discount}
                                            setSort={setSort}
                                            sort={sort}
                                            setStore={setSort}
                                            store={store}
                                            refMinPrice={refMinPrice}
                                            refMaxPrice={refMaxPrice}

                                            filterState={filterState}
                                            style={style}
                                            setData={setData}
                                            setSearchedCoupons={setSearchedCoupons}
                                            setIsLoading={setIsLoading}
                                            type={'deals'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12">

                                {isLoading ?

                                    <Spinner />

                                    :

                                    <>
                                        <div className="row w-100 mx-auto">

                                            {searchedCoupons.length > 0 ? (searchedCoupons.slice(dataFrom, dataTo).map((item) => {
                                                return <List style={style} item={item} user={user} singleurl={item.coupon.slug} image={`${item.image_path}/${item.media.image}`} title={item.coupon.title} discount={item.coupon.discount} rprice={item.coupon.regular_price} cprice={item.coupon.compare_price} />
                                            })) : <div className="col-12">
                                                <p className="para fs-4">No Coupon Found!</p>
                                            </div>}

                                        </div>

                                        {searchedCoupons && searchedCoupons.length > 30 &&

                                            <div className='pagination mt-4 justify-content-center'>
                                                <Pagination defaultCurrent={vll} total={len} pageSize={1} showPrevNextJumpers={true} onChange={(e) => LoadMore(e)} />
                                            </div>

                                        }
                                    </>


                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}