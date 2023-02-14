import React from 'react';
import { Button, Tooltip } from 'antd'

export const Grid = ({ title, style, discount, rprice, cprice, image, singleurl }) => {
  return (
    <div className="col-md-4 col-6 p-0 grid">
      <div className="main-list-card shadow bg-white">
        <div className="my-sm-2 my-1 px-3 py-md-3 px-md-3 py-2">
          <div className="align-items-center">
            <div className="mb-4">
              <div className="listViewBanner p-2">
                <img src={image} className="w-100 h-100" alt={`${title}`} />
              </div>
            </div>
            <div className="">
              <div className="card-txt h-100 d-flex justify-content-between flex-column gap-3">
                <a className="text-black" href={`/single-coupon/${singleurl}`}>
                  <h4 className="heading fs-4 mb-0">
                    {title}
                  </h4>
                </a>
                <p className="para text-muted d-flex align-items-center mb-0">
                  <strike className="text-black">${rprice} </strike>
                  <span className="tag mb-0 text-white rounded-pill mx-2">

                    -{discount}%

                  </span>
                  <span className="priz fs-5">
                    ${cprice}


                  </span>

                </p>
                <div className="d-flex justify-content-between align-items-baseline">
                  <p className="para mb-0">


                    <img width="20px" src="https://discounts-space.com/flags/us.svg" alt="US" />

                    <span className="mx-2 ">

                      Home &amp; Kitchen</span>
                    Fullfilled By
                    Amazon
                  </p>

                </div>
              </div>
            </div>
            <div className="">
              <div>
                <div className="getCode w-75 position-relative">
                  <a href="https://amzn.to/3HStzjL" target="_blank" className="getCodeCouponTopLayer" data-coupon-code="Hello">
                    <img src="https://discounts-space.com/frontend/img/getcode.png" alt="getCoupon" className="w-100 position-relative h-100" style={{ zIndex: 8 }} />

                  </a>
                </div>
              </div>
              <div className="widgets flex-md-column flex-row position-relative">
                <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack">
                  <p className="mb-0 fs-12 d-md-block d-none">
                    Save
                  </p>

                  <Tooltip title="Add to Cart">


                    <div className="wishlist like-container d-fle align-items-center btn bg-white">
                      <div className="heart like-reaction text-center" data-reaction="save" data-type="coupon" data-id="466">


                        <img src="https://discounts-space.com/frontend/img/bookmark-line.png" className="w-75 p-1 save_img " alt="Wishlist" />


                      </div>
                    </div>
                  </Tooltip>

                </div>

                <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack">
                  <p className="mb-0 fs-12 d-md-block d-none">
                    Wishlist
                  </p>

                  <Tooltip title="wishlist">
                    <div className="wishlist like-container d-fle align-items-center btn bg-white">
                      <div className="heart like-reaction text-center" data-reaction="wishlist" data-type="coupon" data-id="466">


                        <img src="https://discounts-space.com/frontend/img/heart-line.png" className="w-75 heart_img " alt="Wishlist" />


                      </div>
                    </div>
                  </Tooltip>
                </div>

                <div style={{ gap: '8px' }} className="d-flex align-items-center justify-content-end card-icon-pack">
                  <p className="mb-0 fs-12 d-md-block d-none">
                    Like
                  </p>

                  <Tooltip title="like">
                    <div className="like-container d-flex align-items-center btn bg-white p-0">
                      <div className="like like-reaction" data-toggle="tooltip" data-placement="bottom" data-reaction="like" data-type="coupon" data-id="466">

                        <img style={{ height: '40px' }} src="https://discounts-space.com/frontend/img/like-line.png" className="w-75 like_img " alt="Like" />
                      </div>
                    </div>
                  </Tooltip>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
