import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './EcomShopcard.css';
import '../Explore/explore.css'
import { Spin, Icon } from 'antd';

class EshopCard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { notFoundFilterData, filteredData, showRecord, allProducts, categoryProduct, colors, brands,
      removeValue, showAllProducts, } = this.props;
    const antIcon =
      <Icon type="loading" style={{ fontSize: '110px' }} spin />;
    return (

      <div className="container" style={{ width: "95%" }}>
        <div className="row">
          {categoryProduct && categoryProduct.length > 0 && <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4">
            {categoryProduct.map((elem, key) => {
              return (
                <div className="cross-card">

                  <li>{elem}<span class="close crossBtnExlpre"
                    onClick={removeValue.bind(this, 'category', elem)}
                  >x</span></li>
                </div>
              )
            })}
          </div>}

          {colors && colors.length > 0 && <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2">
            {colors.map((elem, key) => {
              return (
                <div className="cross-card">
                  <li>{elem}<span class="close crossBtnExlpre"
                    onClick={removeValue.bind(this, 'color', elem)}
                  >x</span></li>
                </div>)
            })}
          </div>}

          {brands && brands.length > 0 && <div className="col-xs-6 col-sm-2 col-md-2 col-lg-2">
            {brands.map((elem, key) => {
              return (
                <div className="cross-card">
                  <li>{elem}<span class="close crossBtnExlpre"
                    onClick={removeValue.bind(this, 'brandName', elem)}
                  >x</span></li>
                </div>)
            })}
          </div>}
        </div>
        <div className="row">
          {allProducts.length > 0 &&
            <div className="row" style={{ marginTop: "20px" }}>
              <span>
                <h3 className="exploreHead"> Products </h3>
              </span>
            </div>}
        </div>
        {allProducts.length == 0 ? <div style={{ textAlign: 'center' }}> <Spin indicator={antIcon} /> </div>
                    :
        <div className="row">
          <div className="col-md-12">

            {/* filtered data  render*/}
            {notFoundFilterData && filteredData.length == 0 ?
              <div className="noRecrdTxt">
                <p className="noRecordText">
                  No Record Found
                </p>
                <button className="backBtn" onClick={showAllProducts}>
                  Back
                </button>
              </div>
              :
              filteredData && filteredData.map((elem, key) => {
                let str = elem.shopName || '';
                if (str.length > 35) {
                  str = str.substring(0, 10);
                  str = str + '...'
                }
                return (
                  <div className="col-md-4 col-sm-4">

                    <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} >
                      <div className="ecomshopcard">
                        <div className="ecommerce-card" >
                          <img alt='' src={elem.images[0]} />
                        </div>
                        <div className="">
                          <div className="pricing">
                            <h4 style={{ margin: "0", color: "#337AB7" }}>{`$${elem.price}`} </h4>
                          </div>
                          <div className="category">
                            <h4>
                              {elem.category[1]}
                            </h4>
                          </div>
                        </div>
                        <div className="otherdetails">
                          <span><h3>{elem.product.slice(0, 15)}....</h3></span>
                          <span><h5>By:{elem.shopName}</h5></span>
                          <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} ><button className="shop-btn">Shop Now</button></Link>
                        </div>

                      </div>
                    </Link>

                  </div>
                )
              })
            }


            {/* all products data  render*/}

            {notFoundFilterData == false && filteredData.length == 0 && showRecord ?
              allProducts && allProducts.map((elem, key) => {
                let str = elem.shopName || '';
                if (str.length > 35) {
                  str = str.substring(0, 35);
                  str = str + '...'
                }
                return (
                  <div className="col-md-4 col-sm-4">

                    <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} >
                      <div className="ecomshopcard">
                        <div className="ecommerce-card" >
                          <img alt='' src={elem.images[0]} />
                        </div>
                        <div className="">
                          <div className="pricing">
                            <h4 style={{ margin: "0", color: "#337AB7" }}>{`$${elem.price}`} </h4>
                          </div>
                          <div className="category">
                            <h4>
                              {elem.category[1]}
                            </h4>
                          </div>
                        </div>
                        <div className="otherdetails">
                          <span><h3>{elem.product.slice(0, 15)}....</h3></span>
                          <span><h5>By:{elem.shopName}</h5></span>
                          <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} ><button className="shop-btn">Shop Now</button></Link>
                        </div>

                      </div>
                    </Link>
                  </div>
                )
              })
              : null
            }
          </div>
        </div>}
      </div >
    )
  }
}

export default EshopCard;

