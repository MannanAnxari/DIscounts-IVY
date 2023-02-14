import { Select } from 'antd';
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';


export const Filter = ({
    setData,
    setSearchedCoupons,
    setIsLoading,
    setCategory,
    category,
    setDiscount,
    discount,
    setSort,
    sort,
    search,
    setStore,
    store,
    refMinPrice,
    refMaxPrice,
    type,
    filterState,
}) => {
    const { user, API_TOKEN, URL } = useContext(AppContext);


    const { FilterCategory } = useContext(AppContext);

    var value = search;

    const options = [];

    FilterCategory.map((item, index) => {
        options.push({
            value: item.id,
            label: item.title,
        });
    }); 
    useEffect(() => {
        fetchitems(category, store, discount, sort, refMinPrice, refMaxPrice, value);
    }, [])




    const fetchitems = async (categ, stor, disc, sort, minp, maxp, val) => {
        setCategory(categ);
        setStore(stor);
        setDiscount(disc);
        setSort(sort);
        setIsLoading(true);
        try {
            const response = await fetch(`${URL}api/web/coupons?user_id=${user ? user.data.id : ""}&type=${type ? type : ""}&category_ids=${categ.length > 0 ? `[${categ}]` : ""}&store_id=${stor}&discount=${disc}&sort=${sort}&min_price=${minp.current.value}&max_price=${maxp.current.value}&type=${type}&search=${val ? val : ""}&api_token=${API_TOKEN}`);
            const json = await response.json();

            if (json.length != 0 || json.success != false) {
                setData(json);
                setSearchedCoupons(json);
            }
            else {
                toast.error("something went wrong!");
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setSearchedCoupons([]);
        }
        setIsLoading(false);

    }

    return (
        filterState &&
        <div class="row py-4 bg- px-3 justify-content-center w-100 mx-auto" id="main_filter">
            <div class="col-sm-12 col-md-12 col-lg-12 py-3 px-0">
                <div class="price d-flex flex-column w-100">
                    <div class="price-head" id="clear-price">
                        <span class="name">PRICE</span>
                    </div>
                    <input class="c_type onslect" type="hidden" name="c_type" value="deals" />
                    <div class="line-price d-flex align-items-center w-100">
                        <div class="d-flex align-items-center w-50">
                            <label>$</label>
                            <input id="search_low_price" ref={refMinPrice} onChange={(e) => { fetchitems(category, store, discount, sort, refMinPrice, refMaxPrice, value); }} name="min_price" type="number" min="1" class="w-100 ms-2 bd-soft min_price onslect" />
                        </div>
                        <div class="d-flex align-items-center w-50 mx-2">
                            <label>$</label>
                            <input min="1" id="search_high_price" ref={refMaxPrice} onChange={(e) => { fetchitems(category, store, discount, sort, refMinPrice, refMaxPrice, value); }} name="max_price" class="w-100 ms-2 bd-soft max_price onslect" type="number" />
                        </div>

                    </div>
                </div>
            </div>


            <div class="col-sm-12 col-md-12 col-lg-12 py-3 px-0">
                <div class="discount-head mb-2">
                    <span class="name text-uppercase">discount</span>
                </div>
                <form class="selectMain">
                    <Select
                        size={'middle'}
                        defaultValue="All"
                        onChange={(e) => { fetchitems(category, store, e, sort, refMinPrice, refMaxPrice, value); }}
                        style={{ width: 200 }}
                        options={[
                            { 'value': 'a:2:{s:3:"min";i:20;s:3:"max";i:49;}', 'label': "20% off - 49%" },
                            { 'value': 'a:2:{s:3:"min";i:50;s:3:"max";i:79;}', 'label': "50% off - 79%" },
                            { 'value': 'a:2:{s:3:"min";i:80;s:3:"max";i:99;}', 'label': "80% off - 99%" },
                        ]}
                    />
                </form>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-12 py-3 d-flex px-0 justify-content-start flex-column ">
                <div class="Coupon-head mb-2">
                    <span class="name text-uppercase">Coupon</span>
                </div>
                <form class="selectMain">
                    <Select
                        size={'middle'}
                        defaultValue="All"
                        onChange={(e) => { fetchitems(category, e, discount, sort, refMinPrice, refMaxPrice, value); }}
                        style={{ width: 200 }}
                        options={[{ 'value': "", 'label': "All" }, { 'value': "1", 'label': "fullfilled by amazon" },]}
                    />
                </form>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-12 py-3 d-flex px-0 justify-content-start flex-column">
                <div class="Category-head mb-2">
                    <span class="name text-uppercase">Category</span>
                </div>

                <form className='selectMain category'>
                    <Select
                        mode="multiple"
                        size={'middle'}
                        placeholder="All Category"
                        onChange={(e) => { fetchitems(e, store, discount, sort, refMinPrice, refMaxPrice, value); }}
                        style={{ width: '100%' }}
                        options={options}
                    />
                </form>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-12 py-3 d-flex px-0 justify-content-start flex-column">
                <div class="Range-head mb-2">
                    <span class="name text-uppercase">Range</span>
                </div>
                <form class="selectMain">
                    <Select
                        size={'middle'}
                        defaultValue="All"
                        onChange={(e) => { fetchitems(category, store, discount, e, refMinPrice, refMaxPrice, value); }}
                        style={{ width: 200 }}
                        options={[
                            { 'value': "0", 'label': "default rank" },
                            { 'value': "1", 'label': "price: Low to high" },
                            { 'value': "2", 'label': "Discount: High to Low" },
                            { 'value': "3", 'label': "Newest" },
                        ]}
                    />
                </form>

            </div>
        </div>

    )
}
