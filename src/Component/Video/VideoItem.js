import React from 'react'
import { Link } from 'react-router-dom';

export const VideoItem = ({ image, video, item }) => {



    return (
        <>
            <div class="col-lg-3 col-md-6 col-sm-6 col-12 my-2 card_pp">
                <div class="image-container mx-0">
                    <img src={image} class="w-100" />
                    <div class="after">
                        <div class="vd_controls px-2 d-flex justify-content-between align-items-center"> 
                            <div class="rights">
                                <div class="two d-flex ms-1 align-items-center">
                                    <img src="https://discounts-space.com/frontend/img/Path 81.png" style={{ 'width': '16px', 'filter': 'invert(1) brightness(1.5)' }} alt="eye" />
                                    <p class="mb-0 mx-1 text-white" style={{ fontSize: '11px' }}>
                                        12
                                    </p>
                                </div>



                            </div>
                        </div>

                    </div>
                    <div class="play">
                        <Link to={`/video/${item.slug}`}>
                            <img src="https://discounts-space.com/frontend/img/Icon awesome-play-circle.png" class="w-75" alt="" />
                        </Link>
                    </div>
                </div>

                <div class="main vd shadow mx-0">
                    <div class="content row p-2 py-3">
                        <div class="col-3 pe-0 my-auto">
                            <img src="https://discounts-space.com/images/profile/16654974894661948310.jpg" class="w-75" alt="" />
                        </div>
                        <div class="col-9 d-flex flex-column justify-content-between">

                            <p class="fs-14 fw-bold mb-0">

                                {item.title}
                            </p>
                            <div class="vd_foot d-flex justify-content-between">
                                <p class="mb-0" style={{ fontSize: '10px' }}>
                                    {item.user.name}
                                </p>
                                <p class="mb-0" style={{ fontSize: '10px' }}>
                                    {item.user.updated_at.split("T")[0]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
