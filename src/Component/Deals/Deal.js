import React from 'react'
import { Link } from 'react-router-dom'

export const Deal = ({ img, title, link }) => {
    return (
        <>
            <div class="row py-2 w-100 mx-auto my-2 shadow-sm bg-white rounded-3">
                <div class="col-lg-4 col-md-4 col-sm-4 col-4 my-auto">
                    <div class="side-pd-img">
                        <img src={img} class="w-100 p-2 bg-white object-contain" height="80px" alt="Air Fryer Oven hot Deal" />
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-8 my-2">
                    <div class="side-pd-content">
                        <Link class="text-dark" to={`/single-coupon/${link}`}>
                            <p class="fw-normal fs-6 m-0 text-start" >{title}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
