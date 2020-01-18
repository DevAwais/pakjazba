import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Spin, Icon, Rate, Modal } from 'antd';
import './secondfold.css'
import { HttpUtils } from "../../Services/HttpUtils";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import AsyncStorage from "@callstack/async-storage/lib/index";
import { Redirect } from 'react-router';
import _ from 'underscore'

class Secondfold extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // current: 1,
            // business: [],
            // showBusiness: [],
            // filteredArr: [],
            // searchValue: '',
            // loader: true,
            // add: 6,
            // user: false,
            // visible: false
        }
    }

    // componentDidMount(){
    //     this.getAllBusiness()
    // }

    // componentDidUpdate(prevProps, prevState){
    //     const { business } = this.state;
    //     const { text } = this.props;
    //     if(prevProps.text !== text){
    //         if(!!text){
    //             this.setState({showBusiness: []})
    //             this.searchedArr(text)
    //         }else {
    //             this.setState({
    //                 showBusiness: business.slice(0, 7),
    //                 filteredArr: [],
    //                 add: 7
    //             })
    //         }
    //     }
    // }

    // searchedArr(text){
    //     const { business } = this.state;
    //     let filteredArr = business.filter((elem) => {
    //         return (elem.businesscategory && elem.businesscategory.toLowerCase().includes(text.toLowerCase())) ||
    //             (elem.businessownername && elem.businessownername.toLowerCase().includes(text.toLowerCase())) ||
    //             (elem.businessname && elem.businessname.toLowerCase().includes(text.toLowerCase())) ||
    //             (elem.businessnumber && elem.businessnumber.toLowerCase().includes(text.toLowerCase()))
    //     })
    //     this.setState({
    //         filteredArr,
    //         showBusiness: filteredArr.slice(0, 7),
    //         add: 7
    //     })
    // }

    // async getAllBusiness(){
    //     var res = await HttpUtils.get('marketplace')
    //     this.getReviews(res.business);
    //     this.handleLocalStorage();
    // }

    // handleLocalStorage = () =>{
    //     AsyncStorage.getItem('user')
    //         .then((obj) => {
    //             let userObj = JSON.parse(obj)
    //             if(!!userObj){
    //                 this.setState({
    //                     user: true,
    //                 })
    //             }
    //             else {
    //                 this.setState({
    //                     user: false
    //                 })
    //             }
    //         })
    // }

    // async getReviews(data){
    //     let res = await HttpUtils.get('getreviews');
    //     if(res.code === 200) {
    //         data =  data && data.map((el) => {
    //             let filteredReviews = res.content.map((elem) => {
    //                 if(elem.objid === el._id){
    //                     return elem.star;
    //                 }
    //             })
    //             let star = (_.reduce(_.compact(filteredReviews), (a, b) => {return +a + +b}, 0))/_.compact(filteredReviews).length
    //             return {...el, star}
    //         })
    //         this.setState({
    //             business: data,
    //             showBusiness: data.slice(0, 7),
    //             loader: false
    //         });
    //     }
    //     else {
    //         this.setState({
    //             business: data ? data : [],
    //             showBusiness: data ? data.slice(0, 7) : [],
    //             loader: false
    //         });
    //     }
    // }

    // funcIndexes(page){
    //     var to = 6 * page;
    //     var from = to - 6;
    //     return {from: page === 1 ? 0 : from, to: page === 1 ? 6 : to}
    // }

    // onChange = (page) => {
    //     const { business, filteredArr } = this.state;
    //     var indexes = this.funcIndexes(page)
    //     if(!!filteredArr.length){
    //         this.setState({
    //             current: page,
    //             showBusiness: filteredArr.slice(indexes.from, indexes.to)
    //         });
    //     }else {
    //         this.setState({
    //             current: page,
    //             showBusiness: business.slice(indexes.from, indexes.to)
    //         });
    //     }
    // }

    // onAddMore = () => {
    //     const { add, business, filteredArr } = this.state;
    //     if(!!filteredArr.length){
    //         this.setState({
    //             showBusiness: filteredArr.slice(0, add + 7),
    //             add: add + 7
    //         });
    //     }else {
    //         this.setState({
    //             showBusiness: business.slice(0, add + 7),
    //             add: add + 7
    //         });
    //     }
    //     if(this.props.text.length){
    //         let inputValue = '';
    //         const { dispatch } = this.props;
    //         dispatch({type: 'SEARCHON', inputValue})
    //     }
    // }

    // clickItem(){
    //     const { user } = this.state;
    //     if(user){
    //         this.setState({goDetail: true})
    //     }else {
    //         this.setState({visible: true})
    //     }
    // }

    // handleCancel = (e) => {
    //     this.setState({visible: false});
    // }

    // handleLogin = (e) => {
    //     this.setState({goForLogin: true, visible: false})
    // }


    render() {
        const { showBusiness, filteredData, notFoundFilterData, showRecord, categoroyOfRoom, stateOfRoom, cityOfRoom, accomodatesOfRoom,
            removeValue, showAllRooms } = this.props;
        // const { business, showBusiness, filteredArr, goForLogin, goDetail } = this.state;
        // const { text } = this.props;
        // const antIcon = <Icon type="loading" style={{ fontSize: 120 }} spin />;

        // if (goForLogin) {
        //     return <Redirect to={{pathname: '/sigin', state: {from: { pathname: "/postad_business" }}}}/>;
        // }

        // if (goDetail) {
        //     return <Redirect to={{ pathname: `/postad_business` }} />
        // }
        // console.log(showBusiness, 'showBusiness')
        return (
            <div className="container" style={{ width: "100%" }}>
                {/* {!this.state.loader && showBusiness.length == 0 && <div className="secondfold">
                <h4 className="headingtext2"><b>No Business to show</b></h4>
            </div>} */}
                {categoroyOfRoom && categoroyOfRoom.length > 0 ?
                    categoroyOfRoom.map((elem, key) => {
                        return (
                            <div>
                                <li>{elem}<span class="close"
                                    onClick={removeValue.bind(this, 'category', elem)}
                                >x</span></li>
                            </div>)
                    })
                    : null}
                {stateOfRoom && stateOfRoom.length > 0 ?
                    stateOfRoom.map((elem, key) => {
                        return (
                            <div>
                                <li>{elem}<span class="close"
                                    onClick={removeValue.bind(this, 'state', elem)}
                                >x</span></li>
                            </div>)
                    })
                    : null}
                {cityOfRoom && cityOfRoom.length > 0 ?
                    cityOfRoom.map((elem, key) => {
                        return (
                            <div>
                                <li>{elem}<span class="close"
                                    onClick={removeValue.bind(this, 'city', elem)}
                                >x</span></li>
                            </div>)
                    })
                    : null}
                <div className="secondfold2">
                    {/* {!text && showBusiness.length > 0 && <h1 className="headingtext2" style={{color:'black',margin: '0px', fontFamily: 'Source Sans Pro, sans-serif',fontWeight:'bold', fontSize:"30px"}}> Find the Best Business </h1>} */}
                    {/* {!text && showBusiness.length > 0 && <h4 className="headingtext2" style={{color:'black',margin: '0px', fontFamily: 'Source Sans Pro, sans-serif',fontWeight:'bold'}}> Find the Best Business </h4>} 
                    {text && !!filteredArr.length === false && <span style={{textAlign:"center"}}><h1>Not found....</h1></span>}
                    {text && !!filteredArr.length === false && <span style={{textAlign:"center"}}><h5>you can find your search by type</h5></span>}
                    {text && !!filteredArr.length === false && <div className="col-md-12" style={{textAlign:"center"}}><button type="button" className="btn2 btn2-success" onClick={this.onAddMore}>Go Back</button></div>} */}

                    <div className="index-content" style={{ marginTop: '0' }}>
                        <div className="row">
                            {notFoundFilterData && filteredData.length == 0 ?
                                <div>
                                    <p>
                                        No Record Found
                                </p>
                                    <button
                                        onClick={showAllRooms}
                                    >Back</button>
                                </div>
                                :
                                filteredData.map((elem, key) => {
                                    let str = elem.businessaddress || '';
                                    if (str.length > 25) {
                                        str = str.substring(0, 25);
                                        str = str + '...'
                                    }
                                    return (
                                        <Link key={key} to={{ pathname: `/detail_business`, state: elem }}>
                                            <div className="col-md-4 col-sm-6" style={{ 'marginBottom': '30px' }}>
                                                <div className="businessborder" style={{ width: '100%' }}>
                                                    <img alt='' src={elem.businessImages.length ? elem.businessImages[0] : './images/def_card_img.jpg'} style={{ height: '200px', width: '100%', filter: 'brightness(0.5)' }} />
                                                    <div className="ratewithbox">
                                                        <span>
                                                            <Rate disabled
                                                                style={{ fontSize: "12px" }}
                                                                allowHalf value={elem.star}
                                                            />
                                                            {Math.floor(elem.star)}
                                                        </span>
                                                    </div>
                                                    <div className="businessname">
                                                        <h4 style={{ marginLeft: "-1px", marginBottom: "15px", marginTop: "20px" }}>
                                                            <b>{elem.businessname}</b>
                                                        </h4>

                                                        <p style={{ marginTop: "-15px" }}>

                                                            <span className="glyphicon glyphicon-map-marker"
                                                                style={{ color: "#008080", margin: "2px" }}
                                                            ></span>
                                                            <span style={{ color: "black" }}>{elem.businessaddress}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                    )
                                })
                            }

                            {notFoundFilterData == false && filteredData.length == 0 && showRecord ?
                                showBusiness && showBusiness.map((elem, key) => {
                                    let str = elem.businessaddress || '';
                                    if (str.length > 25) {
                                        str = str.substring(0, 25);
                                        str = str + '...'
                                    }
                                    return (
                                        <Link key={key} to={{ pathname: `/detail_business`, state: elem }}>
                                            <div className="col-md-4 col-sm-6" style={{ 'marginBottom': '30px' }}>
                                                <div className="businessborder" style={{ width: '100%' }}>
                                                    <img alt='' src={elem.businessImages.length ? elem.businessImages[0] : './images/def_card_img.jpg'} style={{ height: '200px', width: '100%', filter: 'brightness(0.5)' }} />
                                                    <div className="ratewithbox">
                                                        <span>
                                                            <Rate disabled
                                                                style={{ fontSize: "12px" }}
                                                                allowHalf value={elem.star}
                                                            />
                                                            {Math.floor(elem.star)}
                                                        </span>
                                                    </div>
                                                    <div className="businessname">
                                                        <h4 style={{ marginLeft: "-1px", marginBottom: "15px", marginTop: "20px" }}>
                                                            <b>{elem.businessname}</b>
                                                        </h4>

                                                        <p style={{ marginTop: "-15px" }}>

                                                            <span className="glyphicon glyphicon-map-marker"
                                                                style={{ color: "#008080", margin: "2px" }}
                                                            ></span>
                                                            <span style={{ color: "black" }}>{elem.businessaddress}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                    )
                                })
                                : null}
                        </div>
                        {/* {this.state.loader &&  <div  style={{textAlign: 'center', marginLeft:'-100px', marginBottom: '15px'}}>
                        <Spin indicator={antIcon} />
                    </div>} */}
                        {/* {this.state.visible && <Modal
                        title="Kindly Login first"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div className="row">
                            <div className="col-md-6" style={{textAlign:'center'}}><button className="btn btn-sm btn2-success" style={{width:'100%'}} onClick={this.handleLogin}>Login</button></div>
                            <div className="col-md-6" style={{textAlign:'center'}}><button className="btn btn-sm btn2-success" style={{width:'100%'}} onClick={this.handleCancel}>Cancel</button></div>
                        </div>
                    </Modal>} */}
                        {/* {(showBusiness.length >= 7) && !(showBusiness.length === business.length) && <div className="col-md-12" style={{textAlign:"center"}}>
                        <button type="button" className="btn2 btn2-success" onClick={this.onAddMore}>
                            View More
                        </button>
                    </div>} */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        text: state.text
    })
}

export default connect(mapStateToProps)(Secondfold);
