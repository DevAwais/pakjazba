import React, { Component } from 'react';
import Burgermenu from '../header/burgermenu';
import Footer from '../footer/footer';
import Slider from '../header/Slider';
import EcomCard from './EcomCard';
import Eshopcard from './EcomShopcard';
import DealsEcom from './EcomDeals';
import { HttpUtils } from "../../Services/HttpUtils";
import { Spin, Icon } from 'antd';

class EcommerceMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: '',
      featureData: '',
      allData: '',
      ecomSerchValue: '',
      featuredCategories: true,
      noRecordFound: false,
      recordFound: true,
      loader: true
    }
  }

  async componentWillMount() {
    let res = await HttpUtils.get('getecommercedata');
    let featureData = [];
    console.log(res, 'res.content.length')
    if (res.content.length >= 4) {
      for (var i = 0; i < 4; i++) {
        featureData.push(res.content[i])
      }
    }
    this.setState({
      productsData: res.content,
      featureData: featureData,
      allData: res.content,
      loader: false
    })
  }

  searcProduct = (e) => {
    const { allData } = this.state;
    this.setState({
      ecomSerchValue: e.target.value
    })
    if (e.target.value == '') {
      this.setState({
        productsData: allData,
        featuredCategories: true,
        noRecordFound: false,
        recordFound: true
      })
    }
  }

  searchProduct = async (e) => {
    const { ecomSerchValue, allData } = this.state;
    e.preventDefault();
    if (ecomSerchValue != '') {
      let res = await HttpUtils.get('getecommercedata');
      let data = res.content;
      let ecommreceFilterData = [];
      for (let i in data) {
        if (ecomSerchValue == data[i].product || ecomSerchValue == data[i].productFeature ||
          ecomSerchValue == data[i].brandName || ecomSerchValue == data[i].description ||
          ecomSerchValue == data[i].legalDesclaimer || ecomSerchValue == data[i].manufacturer ||
          ecomSerchValue == data[i].manufacturerPart) {
          ecommreceFilterData.push(data[i])
        }
      }
      if (ecommreceFilterData.length == 0) {
        this.setState({
          recordFound: false,
          noRecordFound: true,
          featuredCategories: false
        })
      }
      else {
        this.setState({
          productsData: ecommreceFilterData,
          featuredCategories: false,
          recordFound: true,
          noRecordFound: false
        })
      }
    }
    else {
      this.setState({
        productsData: allData,
        featuredCategories: true,
        recordFound: true,
        noRecordFound: false
      })
    }
  }
  onAddMore = () => {
    const { allData } = this.state;
    this.setState({
      productsData: allData,
      featuredCategories: true,
      recordFound: true,
      noRecordFound: false
    })
  }
  render() {
    const { productsData, featureData, featuredCategories, noRecordFound, recordFound, loader } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 120 }} spin />;

    return (
      <div>
        <span>
          <div className="vissible-xs" style={{ "background": "#d8e7e4", marginTop: "102px", backgroundSize: 'cover' }}>
            <div className="visible-xs" style={{ marginTop: '-119px' }}></div>
            <div className="background-image">
              <Burgermenu />
              <Slider mainH1="Pakjazba Ecommerce" mainH2="" searcProduct={this.searcProduct} searchProduct={this.searchProduct} />
            </div>
          </div>
        </span>
        {loader && <div style={{ textAlign: 'center', marginLeft: '-100px', marginBottom: '15px' }}>
          <Spin indicator={antIcon} />
        </div>}
        {featuredCategories ?
          <div>
            <div className="row" style={{ marginTop: "20px" }}>
              <h1 className="" style={{ fontWeight: "bold", textAlign: "center" }}> Feature Categories  </h1>
            </div>
            <div className="row" style={{ marginTop: "-10px" }}>
              <EcomCard featureData={featureData} />
            </div>
          </div>
          : null
        }
        {noRecordFound && <span style={{ textAlign: "center" }}><h1>Not found....</h1></span>}
        {noRecordFound && <span style={{ textAlign: "center" }}><h5>you can find your search by type</h5></span>}
        {noRecordFound && <div className="col-md-12" style={{ textAlign: "center" }}><button type="button" className="btn2 btn2-success" onClick={this.onAddMore}>Go Back</button></div>}
        {recordFound ? <div className="row">
          <Eshopcard productsData={productsData} />
        </div> : null}
        <div className="row" style={{ marginTop: "-70px" }}>
          <DealsEcom />
        </div>
        <div className="row">
          <div className="col-md-12">
            <img src="../images/businesslistingimage.png" style={{ width: '100%' }} alt='img' />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default EcommerceMarket;
