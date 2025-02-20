import React, { Component } from 'react';
import HeaderMenu from '../../header/headermenu';
import Footer from '../../footer/footer'
import Slider from '../../header/Slider';
import PthreeColumn from './PthreeColumn';
import { Redirect } from 'react-router';
import { HttpUtils } from "../../../Services/HttpUtils";
import { Modal } from 'antd';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './productdetail.css';
import { isMobile } from 'react-device-detect';

class EproductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartCount: 0,
      user_Id: '',
      profileId: '',
      objectId: '',
      images: [],
      productName: '',
      price: '',
      description: '',
      data: '',
      productId: '',
      dataShow: false,
      visible: false,
      goForLogin: false,
      shopId: '',
      shopLogo: '',
      shopLogo:'',
      shopEmail:'',
      shopContactNo:''
    }
  }
  async componentDidMount() {
    let data = this.props.location.state;
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.setState({
        visible: false,
        user_Id: userData._id,
        profileId: userData.profileId,
      })
    }
    if (data) {
      this.setState({
        objectId: data._id,
        images: data.images,
        productName: data.product,
        price: data.price,
        description: data.description,
        productId: data._id,
        data: data,
        dataShow: true,
        shopId: data.shopId,
        shopName: data.shopName,

      })
      let logoshop = {
        shopId: data.shopId

      }
      let reqShopData = await HttpUtils.post('getSpecificShopById', logoshop)
      console.log(reqShopData , 'reqShopData')
      this.setState({
        shopLogo: reqShopData.content[0].shopLogo[0],
        shopEmail:reqShopData.content[0].contactEmail,
        shopContactNo:reqShopData.content[0].contactNumber
      })
    }
    else {
      let obj = {
        productId: this.props.location.pathname.slice(22)
      }
      let res = await HttpUtils.post('getspecificproductbyid', obj);
      let data = res.content[0]
      this.setState({
        objectId: data._id,
        images: data.images,
        productName: data.product,
        price: data.price,
        description: data.description,
        data: data,
        productId: data._id,
        dataShow: true,
        shopId: data.shopId,
        shopName: data.shopName,
      })
    }
  }

  //add to cart funtion
  shoppingCartCount = (countCart) => {
    const { shopLogo, user_Id, profileId, objectId, images, productName, price, description, cartCount, shopName, productId, shopId } = this.state;
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      //get local storage data
      const addToCartData = JSON.parse(localStorage.getItem('addToCart'));


      //create obj for values
      let addToCartObj = {};
      let cartArr = [];
      let previousCartData = addToCartData;
      let combineArr = [];
      addToCartObj.user_Id = user_Id;
      addToCartObj.profileId = profileId;
      addToCartObj.objectId = objectId;
      addToCartObj.cartCount = countCart;
      addToCartObj.images = images;
      addToCartObj.productName = productName;
      addToCartObj.price = price;
      addToCartObj.description = description;
      addToCartObj.shopName = shopName;
      addToCartObj.productId = productId;
      addToCartObj.shopId = shopId;

      //set state for props

      //get array if user previves record or new record
      if (addToCartData) {
        for (var i = 0; i < addToCartData.length; i++) {
          if (addToCartData[i].objectId == objectId &&
            addToCartData[i].user_Id == user_Id &&
            addToCartData[i].productName == productName &&
            addToCartData[i].price == price &&
            addToCartData[i].description == description) {
            // if user add same data of the previes record
            addToCartData[i].cartCount = countCart;
            cartArr.push(addToCartData[i])
            break;
          }
          else {
            //if user add to cart newe product
            cartArr.push(addToCartObj)
            break;
          }
        }
        this.setState({
          cartCount: cartArr[0].cartCount
        })
      }
      else {
        //if user add 1st time data 
        cartArr.push(addToCartObj)
        this.setState({
          cartCount: addToCartObj.cartCount
        })
      }
      let dataPush = false;
      var children;
      if (previousCartData) {
        for (var j = 0; j < previousCartData.length; j++) {
          if (previousCartData[j].objectId == cartArr[0].objectId) {
            //if user same record of the previous record
            combineArr.push(cartArr[0])
            dataPush = true;
          }
          else {
            // user previos record pus to array
            combineArr.push(previousCartData[j])
          }
        }
        if (!dataPush) {
          // combine array
          children = combineArr.concat(cartArr);
          localStorage.setItem('addToCart', JSON.stringify(children));
        } else {
          //all record
          localStorage.setItem('addToCart', JSON.stringify(combineArr));
        }
      }
      else {
        //add to local storage data in 1st time
        localStorage.setItem('addToCart', JSON.stringify(cartArr));
      }
    } else {
      this.setState({
        visible: true
      })
    }
  }
  handleLogin = (e) => {
    this.setState({ goForLogin: true, visible: false })
  }
  handleCancel = (e) => {
    this.setState({ visible: false });
  }
  render() {
    const { dataShow, data, productId, cartCount, goForLogin, profileId, shopId, shopLogo, productName, 
      shopName, price , shopEmail , shopContactNo} = this.state;
    if (goForLogin) {
      return <Redirect to={{ pathname: '/sigin', state: { from: { pathname: `/products_DetailStyle/${productId}` }, state: data } }} />;
    }
    return (
      <div>
        <span>
          <div className="" style={isMobile ? { "backgroundImage": "url('../images/bgc-images/buy-sell.png')", marginTop: "10px", backgroundSize: 'cover' } : { "backgroundImage": "url('../images/bgc-images/buy-sell.png')", marginTop: "84px", backgroundSize: 'cover' }}>
            <div className="background-image">
              <HeaderMenu cartCount={cartCount} />
            </div>
          </div>
        </span>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
            <img src='../images/footer-background-icons.jpg' alt="banner" className="ecoProducttoP" />
            <div className="productTitleEcoomerce">
              <h2>{productName}</h2>
            </div>
            <div className="row" style={{marginTop: '10vw'}}>
              <div className="col-xs-4 col-sm-2 col-md-1 col-lg-1">
                <Link to={{ pathname: `/EcommerceProfile/${data.shopId}` }}>
                  {shopLogo && <img src={shopLogo} alt="" className="BannerIcon" />}
                </Link>
              </div>
              <div className="col-xs-8 col-sm-7 col-md-9 col-lg-9">
                <Link to={{ pathname: `/EcommerceProfile/${data.shopId}` }}>
                  <h1 className="BanerTextCsS">{shopName}</h1>
                </Link>
              </div>
              <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
                <div className="price-product">
                  <h2>${price}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="" style={{ height: "0" }}>
          </div>
          <div className="productId={productId}">
            {dataShow ?
              <PthreeColumn data={data}
                shoppingCartCount={this.shoppingCartCount}
                profileId={profileId}
                shopId={shopId}
                shopEmail={shopEmail} 
                shopContactNo={shopContactNo}
              />
              : null}
            {this.state.visible && <Modal
              title="Kindly Login first"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <div className="row">
                <div className="col-md-6" style={{ textAlign: 'center' }}><button className="btn btn-sm btn2-success" style={{ width: '100%' }} onClick={this.handleLogin}>Login</button></div>
                <div className="col-md-6" style={{ textAlign: 'center' }}><button className="btn btn-sm btn2-success" style={{ width: '100%' }} onClick={this.handleCancel}>Cancel</button></div>
              </div>
            </Modal>}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    otherData: state.otherData
  })
}

export default connect(mapStateToProps)(EproductDetail);

