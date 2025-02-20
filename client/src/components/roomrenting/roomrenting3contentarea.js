import React, { Component } from 'react';
import { Rate, notification, Icon, Spin } from 'antd';
import "./roomrenting2content.css";
import "./roomrenting3content.css";
import moment from 'moment'
import { Redirect } from 'react-router';
import Gallery from './gallery';
import { HttpUtils } from "../../Services/HttpUtils";
import AsyncStorage from "@callstack/async-storage/lib/index";
import { Tabs } from 'antd';



class Roomrenting3contentarea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      msg: '',
      receiver: '',
      reviews: [],
      item: 4,
      loader: false,
      goProfile: false,
      amenitiesArr: [
        { key: "Gym/Fitness Center", value: "../images/icons-room/gym.png" },
        { key: "Visitors Parking", value: "../images/icons-room/visitor-parking.png" },
        { key: "Private Lawn", value: "../images/icons-room/lawn.png" },
        { key: "Laundry Service", value: "../images/icons-room/Washer.png" },
        { key: "Swimming Pool", value: "../images/icons-room/swimmimg.png" },
        { key: "Power Backup", value: "../images/icons-room/power-backup.png" },
        { key: "Water Heater Plant", value: "../images/icons-room/water-heater-filled.png" },
        { key: "Elevator", value: "../images/icons-room/elevator.png" },
        { key: "Car Park", value: "../images/icons-room/car-park.png" },
        { key: "Garbage Disposal", value: "../images/icons-room/garbage.png" },
        { key: "Security System", value: "../images/icons-room/security-system.png" },
        { key: "Club House", value: "../images/icons-room/club-house.png" },
      ]
    }
  }

  componentDidMount() {
    this.getReviews(this.props.location.state);
    this.handleLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    let email = this.props.data.contactemail;
    if (prevState.receiver !== email) {
      this.setState({ receiver: email })
    }
  }

  handleLocalStorage = () => {
    AsyncStorage.getItem('user')
      .then((obj) => {
        let userObj = JSON.parse(obj)
        if (!!userObj) {
          this.getProfile(userObj);
        }
      })
  }

  async getProfile(userObj) {
    let req = await HttpUtils.get('getprofile?profileId=' + userObj.profileId)
    if(req){
      this.setState({
        userId: userObj._id,
        profileId: userObj.profileId,
        userImg: req.content ? req.content.imageurl : '',
        userName: userObj.name
      })
    }
  }

  async getReviews(data) {
    let res = await HttpUtils.get('getreviews'),
      id = data._id;
    if (res.code === 200) {
      let filteredReviews = res.content.filter((elem) => elem.objid === id)
      this.setState({ reviews: filteredReviews, data })
    }
  }

  onChangeReview(e) {
    let target = e.target.id;
    if (target === 'name1') {
      this.setState({ name1: e.target.value })
    } else if (target === 'email1') {
      this.setState({ email1: e.target.value })
    } else if (target === 'message1') {
      this.setState({ msg1: e.target.value })
    }
  }

  async submitReview() {
    this.setState({ loader: true })
    let { name1, email1, msg1, star, reviews, data, userId, profileId, userImg } = this.state;
    let obj = {
      objId: data._id,
      name: name1,
      email: email1,
      message: msg1,
      star,
      written: moment().format('LL'),
      userId,
      profileId,
      userImg
    }
    let res = await HttpUtils.post('reviews', obj)
    reviews.push(obj)
    if (res.code === 200) {
      let message1 = 'Your review sent successfully'
      this.openNotification(message1)
      this.setState({ name1: '', email1: '', msg1: '', star: 0, reviews, loader: false })
    }
  }

  openNotification(msg) {
    notification.open({
      message: 'Success ',
      description: msg,
    });
  };

  
  handleChange(value) {
    this.setState({ star: value })
  }
  
  goToProfile = (reviewUserId, reviewProfileId) => {
    this.setState({ goProfile: true, reviewUserId, reviewProfileId })
  }

  render() {
    const { TabPane } = Tabs;
    const { data } = this.props,
      { goProfile, reviews, item, reviewUserId, reviewProfileId } = this.state,
      antIcon = <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />;
    let from = data.startdate || data.dateRange && data.dateRange.from,
      to = data.enddate || data.dateRange && data.d3ateRange.to,
      petFriendly = data.petfriendly || data.petFriendly,
      accommodates = data.accomodates || data.accommodates,
      images = data.imageurl || data.arr_url,
      AIncludes = data.amenitiesinclude || data.amenities,
      email = data.contactMode && data.contactMode.includes('email') ? data.contactEmail : '*****@gmail.com',
      phone = data.contactMode && data.contactMode.includes('phone') ? data.contactNumber : '***********';

    if (goProfile) {
      return <Redirect to={{ pathname: `/profile_user/${data.profileId}`, 
                    state: { userId: reviewUserId, profileId: reviewProfileId } }} />
    }

    if (data.modeofcontact && data.modeofcontact.includes('email')) {
      email = data.contactemail;
    }

    if (data.modeofcontact && data.modeofcontact.includes('phone')) {
      phone = data.contactnumber;
    }
    let postedOn = moment(data.posted, "LL").format('YYYY-MM-DD');
    console.log("TCL: Roomrenting3contentarea -> render -> data", data)
    return (
      <div>
        <Gallery images={images} style={{ marginTop: '0%' }} />
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mainRoomBanerPadMarg">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <h1 className="EventBanerTextCsS">{data.postingtitle || data.postingTitle}</h1>
            <p className="BanerSmalTextCsS">{data.propertylocation}, {data.state}, {data.city}</p>
          </div>
          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2" style={{ textAlign: 'center' }}>
            <p className="roomDateBaner">Price per month</p>
            <h4 className="roomDayBaner">${data.rent || data.price}</h4>
          </div>
          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
            <a href={data.contactnumber}>
              <button className="btnCallEventbaner">
                <Icon type="phone" /> <span>Call Now</span>
              </button>
            </a>
          </div>
        </div>
        <div className="row tabMainDiV">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    Detail{" "}
                  </span>
                }
                key="1"
              >

                <div style={{ backgroundColor: '#f7f5ed' }}>
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-5">
                      <div className="row RoomMainDivS" style={{ paddingBottom: '0px' }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: 'inline-flex' }}>
                          <Icon type="unordered-list" /><h5 className="headingMainRoom">Description</h5>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <p className="paraTextDivs">{data.discription || data.description}</p>
                        </div>
                      </div>
                      <div className="row RoomMainDivS" style={{ paddingBottom: '0px' }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: 'inline-flex' }}>
                          <Icon type="unordered-list" />
                          <h5 className="headingMainRoom">
                            Info
                          </h5>
                        </div><br />

                        <div className="row" style={{ padding: '0' }}>
                          <div className="col-md-1">
                            <i className="fa fa-home" style={{ fontSize: "30px" }} />
                          </div>
                          <div className="col-md-11">
                            <h4 style={{ margin: "7px 0px 0px 7px" }}> Entire Apartment </h4>
                            <span className="appartmentdes" style={{ margin: "0px 0px 0px 7px" }}>
                              <p> {data.accomodates} Guest  </p>
                              <p> {data.subSubCategory} Bedrooms</p>
                              {data.Attachedbath && <p> Attachedbath </p>}
                              {data.attachedBath && <p> Attachedbath </p>}
                            </span>
                          </div>
                          <div className="col-md-1">
                            <i className="fa fa-map" style={{ fontSize: "30px" }} />
                          </div>
                          <div className="col-md-11">
                            <h4 style={{ margin: "7px 0px 0px 7px" }}> Great Location </h4>
                            <span className="appartmentdes" style={{ margin: "0px 0px 0px 7px" }}>
                              <p> 100% of recent guests gave this homes's location a 5-star rating.  </p>

                            </span>
                          </div>
                          <div className="col-md-1">
                            <i className="fa fa-snowflake-o" style={{ fontSize: "30px" }} />
                          </div>
                          <div className="col-md-11">
                            <h4 style={{ margin: "7px 0px 0px 7px" }}> Sparkling Clean </h4>
                            <span className="appartmentdes" style={{ margin: "0px 0px 0px 7px" }}>
                              <p> 10 recent guests have said that this home was sparkling clean.  </p>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row RoomMainDivS" style={{ paddingBottom: '0px' }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: 'inline-flex' }}>
                          <Icon type="unordered-list" /><h5 className="headingMainRoom">Sleeping Arrangments</h5>
                        </div>
                        <div className="forimage" style={{ display: "inline" }}>
                          <div className="row" style={{ padding: "0" }}>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center' }}>
                              <i class="fa fa-bed" aria-hidden="true" style={{ fontSize: '30px', marginLeft: '-15px' }}></i>
                              <p> {data.subSubCategory} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row RoomMainDivS" style={{ padding: "0px" }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: 'inline-flex', paddingTop: '15px' }}>
                          <Icon type="unordered-list" /><h5 className="headingMainRoom">Reviews</h5>
                        </div>
                        {!!reviews.length && <div className="row" style={{ padding: "0px" }}>
                          {reviews && reviews.map((elem, key) => {
                            if (key <= item - 1)
                              return (
                                <div className="card-body space" style={{ marginBottom: "0px" }}>
                                  <div className="row" style={{ margin: '35px 0px 0px 0px' }}>
                                    <div className="col-md-2 col-sm-4 col-xs-12">
                                      <img
                                        src={elem.userImg ? elem.userImg : "../images/images.jpg"}
                                        className="image-circle"
                                        alt="" width="100" height="50"
                                        style={{ cursor: 'pointer' }}
                                        onClick={this.goToProfile.bind(this, elem.userId, elem.profileId)}
                                      />
                                    </div>
                                    <div className="col-md-2 col-sm-4" style={{ paddingTop: "10px" }}>
                                      <h5 className=""
                                        style={{ margin: "0", cursor: 'pointer' }}
                                        onClick={this.goToProfile.bind(this, elem.userId, elem.profileId)}
                                      >
                                        {elem.name}
                                      </h5>
                                    </div>
                                    <div className="col-md-4 col-sm-4" style={{ paddingTop: "7px" }}>
                                      <Rate disabled allowHalf value={elem.star} />
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-12" style={{ paddingTop: "7px" }}>
                                      <a name="linkReview"><p className="star-space1">Writen On {elem.written} </p></a>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                      <p style={{ margin: '0' }}>{elem.message}.</p>
                                    </div>
                                  </div>
                                  <hr />
                                </div>
                              )
                          })}
                        </div>}
                        {reviews.length > item && <div className="">
                          <a
                            className="btn btndetail-success"
                            style={{ display: "block", margin: "auto0" }}
                            onClick={() => this.setState({ item: item + 4 })}
                          >More</a>
                        </div>}
                      </div>
                    </div>
                    <div className="col-md-5" style={{ position: 'sticky', top: '25' }}>
                      <div className="row RoomMainDivS" style={{ margin: '0px' }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: 'inline-flex' }}>
                          <Icon type="unordered-list" /><h5 className="headingMainRoom">Details</h5>
                        </div>
                        {data.petFriendly != '' && <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
                          <div className="row" style={{ paddingBottom: '0' }}>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev">
                              <p style={{ margin: "0", fontWeight: 'bold' }}> Pets </p>
                            </div>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev" style={{ textAlign: 'right' }}>
                              <span className="spaNTxtDetails" >{petFriendly}</span>
                            </div>
                            <div className="hidden-xs col-sm-4 col-md-4 col-lg-4"></div>
                          </div>
                        </div>}
                        {data.smoking != '' && <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
                          <div className="row" style={{ paddingBottom: '0' }}>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev">
                              <p style={{ margin: "0", fontWeight: 'bold' }}> Smoking </p>
                            </div>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev" style={{ textAlign: 'right' }}>
                              <span className="spaNTxtDetails">{data.smoking}</span>
                            </div>
                            <div className="hidden-xs col-sm-4 col-md-4 col-lg-4"></div>
                          </div>
                        </div>}
                        {data.vegetariansprefered != '' && <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
                          <div className="row" style={{ paddingBottom: '0' }}>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev">
                              <p style={{ margin: "0", fontWeight: 'bold' }}> Vegetarian </p>
                            </div>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev" style={{ textAlign: 'right' }}>
                              <span className="spaNTxtDetails">{data.vegetariansprefered}</span>
                            </div>
                            <div className="hidden-xs col-sm-4 col-md-4 col-lg-4"></div>
                          </div>
                        </div>}
                        {data.furnished != '' && <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
                          <div className="row" style={{ paddingBottom: '0' }}>
                            <div className="col-xs-4 col-sm-3 col-md-3 col-lg-3 borderDetailDev">
                              <p style={{ margin: "0", fontWeight: 'bold' }}> Furnished </p>
                            </div>
                            <div className="col-xs-8 col-sm-5 col-md-5 col-lg-5 borderDetailDev" style={{ textAlign: 'right' }}>
                              <span className="spaNTxtDetails">{data.furnished}</span>
                            </div>
                            <div className="hidden-xs col-sm-4 col-md-4 col-lg-4"></div>
                          </div>
                        </div>}
                        {data.Attachedbath != false && <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
                          <div className="row" style={{ paddingBottom: '0' }}>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev">
                              <p style={{ margin: "0", fontWeight: 'bold' }}> Attached Bath </p>
                            </div>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev" style={{ textAlign: 'right' }}>
                              <span className="spaNTxtDetails">Yes</span>
                            </div>
                            <div className="hidden-xs col-sm-4 col-md-4 col-lg-4"></div>
                          </div>
                        </div>}
                        {data.accommodates != '' && <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
                          <div className="row" style={{ paddingBottom: '0' }}>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev">
                              <p style={{ margin: "0", fontWeight: 'bold' }}> Accomodates </p>
                            </div>
                            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-4 borderDetailDev" style={{ textAlign: 'right' }}>
                              <span className="spaNTxtDetails">{accommodates}</span>
                            </div>
                            <div className="hidden-xs col-sm-4 col-md-4 col-lg-4"></div>
                          </div>
                        </div>}
                        {data.startdate != '' && <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ padding: '0' }}>
                          <div className="row">
                            <div className="col-xs-3 col-sm-2 col-md-2 col-lg-2 borderDetailDev">
                              <p style={{ margin: "0", fontWeight: 'bold' }}> Dates </p>
                            </div>
                            <div className="col-xs-9 col-sm-6 col-md-6 col-lg-6 borderDetailDev" style={{ textAlign: 'right' }}>
                              <span className="spaNTxtDetails" >{from} to {to}</span>
                              {/* <input style={{ width: '100%' }} value={" " + from + " ~ " + to + " "} /> */}
                            </div>
                            <div className="hidden-xs col-sm-4 col-md-4 col-lg-4"></div>
                          </div>
                        </div>}
                      </div>
                      <div className="row RoomMainDivS" style={{ margin: '5% 0%' }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: 'inline-flex' }}>
                          <Icon type="unordered-list" /><h5 className="headingMainRoom">Contact Details</h5>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ marginTop: '0px' }}>
                          <div className="row" style={{ padding: "0" }}>
                            <div className="col-xs-6 col-md-3 col-sm-3">
                              <div className="profile_img">
                                <img onClick={() => { this.goToProfile() }} src={data.userImage && data.userImage.length ? data.userImage : '../images/images.jpg'} className="profilePicContactRent" alt="" />
                              </div>
                            </div>
                            <div className="col-xs-12 col-md-9 col-sm-9 margMObilerent">
                              <span style={{ fontWeight: 'bold' }}>{data.contactname}</span><br />
                              <a onClick={() => { this.goToProfile() }} style={{ fontSize: '13px', cursor: 'pointer', color: 'rgb(55, 169, 155)' }}>
                                View Profile
                              </a>
                              <h5 style={{ marginTop: '10px', marginBottom: '7px' }}>
                                <span className="glyphicon glyphicon-phone" style={{ marginRight: "15px", color: "#236A4B" }}></span>
                                <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>{phone}</span>
                              </h5>
                              <h5>
                                <span className="glyphicon glyphicon-globe" style={{ marginRight: "15px", color: "#236A4B" }}></span>
                                <span style={{ color: "rgba(0, 0, 0, 0.65)" }}>{email}</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 RoomMainDivS" style={{ margin: '5% 0%' }}>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: 'inline-flex', marginBottom: '20px' }}>
                          <Icon type="unordered-list" /><h5 className="headingMainRoom">Amenities</h5>
                        </div>
                        <div className="forimage">
                          <div className="row" style={{ padding: "0" }}>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              {AIncludes && AIncludes.map((elem, key) => {
                                return (
                                  this.state.amenitiesArr.map((el, i) => {
                                    if (el.key === elem) {
                                      return (
                                        <div className="col-md-6 col-sm-4 col-xs-12">
                                          <div className="col-md-4 col-xs-5">
                                            <img src={el.value} />
                                          </div>
                                          <div className="col-md-8 col-xs-7" style={{ width: '50%' }}>
                                            <p> {el.key} </p>
                                          </div>
                                        </div>
                                      )
                                    }
                                  })
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    Add Review{" "}
                  </span>
                }
                key="2"
              >
                <div className="row" style={{ backgroundColor: '#f7f5ed', paddingTop: '25px' }}>
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <div className="col-md-12 col-sm-12 RoomMainDivS" style={{ marginBottom: '5%' }}>
                      <div className="col-md-2 col-sm-3" style={{ paddingLeft: "0" }}>
                        <h4>
                          <b>Excellent </b>
                        </h4>
                      </div>
                      <div className="col-md-5 col-sm-5">
                        <Rate disabled allowHalf defaultValue={5} style={{ marginTop: "-6px", marginLeft: "10px" }} />
                      </div>
                      <div className="col-md-5 col-sm-4">

                        <div className="progres">
                          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", height: "50%" }}>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2 col-sm-3" style={{ paddingLeft: "0" }}>
                        <h4>
                          <b>Good </b>
                        </h4>
                      </div>
                      <div className="col-md-5 col-sm-5">
                        <Rate disabled allowHalf defaultValue={4} style={{ marginTop: "-6px", marginLeft: "10px" }} />
                      </div>
                      <div className="col-md-5 col-sm-4">

                        <div className="progres">
                          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "60%", height: "50%" }}>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2 col-sm-3" style={{ paddingLeft: "0" }}>
                        <h4>
                          <b>Average </b>
                        </h4>
                      </div>
                      <div className="col-md-5 col-sm-5">
                        <Rate disabled allowHalf defaultValue={3} style={{ marginTop: "-6px", marginLeft: "10px" }} />
                      </div>
                      <div className="col-md-5 col-sm-4">

                        <div className="progres">
                          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "45%", height: "50%" }}>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2 col-sm-3" style={{ paddingLeft: "0" }}>
                        <h4>
                          <b>Bad </b>
                        </h4>
                      </div>
                      <div className="col-md-5 col-sm-5">
                        <Rate disabled allowHalf defaultValue={2} style={{ marginTop: "-6px", marginLeft: "10px" }} />
                      </div>
                      <div className="col-md-5 col-sm-4">

                        <div className="progres">
                          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "20%", height: "50%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="col-md-12" style={{ padding: '0%' }}>
                      <div className="row" style={{ padding: '0%' }}>
                        <div className=" RoomMainDivS">
                          <div className="card-body space">
                            <div className="row">
                              <div className="col-md-12 col-sm-12 col-xs-12">
                                <h3><b><a name="linkReview" className="black">Add Review</a></b></h3>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                {/*Section: Contact v.2*/}
                                <section className="section">
                                  <h4>Your Rating:
                                    <Rate onChange={this.handleChange.bind(this)} allowHalf value={this.state.star} />
                                  </h4>
                                </section>
                                {/*Section: Contact v.2*/}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            {/*Grid column*/}
                            <div className="col-md-12 mb-md-0 mb-5">
                              <form id="contact-form" name="contact-form">
                                {/*Grid row*/}
                                <div className="row">
                                  {/*Grid column*/}
                                  <div className="col-md-6">
                                    <div className="md-form mb-0">
                                      <label className="">Your name</label>
                                      <input type="text" id="name1" name="name" className="form-control" value={this.state.name1} onChange={this.onChangeReview.bind(this)} />
                                    </div>
                                  </div>
                                  {/*Grid column*/}
                                  {/*Grid column*/}
                                  <div className="col-md-6">
                                    <div className="md-form mb-0">
                                      <label className="">Your email</label>
                                      <input type="text" id="email1" name="email" className="form-control" value={this.state.email1} onChange={this.onChangeReview.bind(this)} />
                                    </div>
                                  </div>
                                  {/*Grid column*/}
                                </div>
                                {/*Grid row*/}
                                {/*Grid row*/}
                                <div className="row">
                                  {/*Grid column*/}
                                  <div className="col-md-12">
                                    <div className="md-form">
                                      <label>Your message</label>
                                      <textarea type="text" id="message1" name="message" rows="2"
                                        className="form-control md-textarea"
                                        value={this.state.msg1}
                                        onChange={this.onChangeReview.bind(this)}></textarea>
                                    </div>
                                  </div>
                                </div>
                                {/*Grid row*/}
                              </form>
                              <div className="text-center text-md-left">
                                {this.state.loader && <Spin indicator={antIcon} />}
                                <a disabled={!!this.state.loader} onClick={this.submitReview.bind(this)} className="btn color_button" style={{ width: "35%" }}>Send</a>
                              </div>
                              <div className="status"></div>
                            </div>
                            {/*Grid column*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5"></div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default Roomrenting3contentarea;
