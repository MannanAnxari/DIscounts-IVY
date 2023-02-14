
import React from 'react'
import { Link } from 'react-router-dom'

export const TagsList = ({ title, style, discount, rprice, cprice, image, singleurl, item, hasCustom, itemPerRow }) => {


    return (
        // <div className={`${itemPerRow ? `col-md-${itemPerRow}` : "col-md-4"} col-lg-3 col-md-6 col-sm-6 p-0 grid px-2 my-2 mainview`}>
        <div className={`col-lg-4 col-md-6 col-sm-6 p-0 grid px-2 my-2 mainview`}>
            <div className="main-list-card shadow bg-white h-100">
                <div className="my-sm-2 my-1 px-3 pt-md-3 px-md-3 pt-2">
                    <div className="align-items-center">
                        <div className="row">
                            <div className="col-4">
                                <div className="p-2" style={{ height: "100px" }}>
                                    <img src={image} className="w-100 h-100" style={{ objectFit: "contain" }} alt={`${title}`} />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="d-flex flex-column justify-content-evenly h-100">
                                    <Link className="text-black" to={`/single-coupon/${singleurl}`}>
                                        <h4 className="heading fs-4 mb-0 tagsList">
                                            {title}
                                        </h4>
                                    </Link>
                                    <p className="para text-muted d-flex align-items-center mb-0">
                                        <strike className="text-black">${cprice} </strike>
                                        <span className="tag mb-0 text-white rounded-pill mx-2">

                                            -{discount}%

                                        </span>
                                        <span className="priz fs-5">
                                            ${rprice}


                                        </span>

                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
