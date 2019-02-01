import React, { Component } from 'react';
import './EdetailFirstfold.css';
import DetailSliders from '../events/slider';
import DateCard from '../events/dateCard';
import FeaturedCol4 from '../events/FeaturedCol4';
import FeaturedCol8 from '../events/FeaturedCol8';


class EdetailFirstfold extends Component{
  render(){
    return(
      <div className="container" style={{width:"100%", marginTop:"-5px"}}>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12" style={{textAlign:"center"}}>
              <div className="blurimage" style={{backgroundImage: "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,1.7)), url(https://unsplash.imgix.net/photo-1416339442236-8ceb164046f8?q=75&fm=jpg&s=8eb83df8a744544977722717b1ea4d09)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center", color: "#fff", height: "450px", paddingTop: "50px"}}>
                {/*<img alt='' src={this.props.data.images && this.props.data.images[0]} style={{width:"100%",height:"300px", borderRadius:"2px"}} />*/}
              </div>
              <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-6">
                  <div class="eventdetail" style={{textAlign:"left"}}>
                    <h2>Dallas: Kashmir The Band Event Night in Dallas</h2>
                    <span>
                    <i class="fa fa-map-marker" style={{color:"white", fontSize:"24px"}}></i>
                    <p className="display">Dallas: Texas Street </p></span>
                  </div>
                  <div className="row"style={{padding:"0"}}>
                    <div className="col-md-2">
                      <div className="gray">
                        <p>Mar <b>29</b> 8:30 PM </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <span className="whitee">
                        <p> Organiser: Najam Sethi </p>
                        <p> Artist: Kashmir The Band</p>
                        <p> Ticket range: $42 - $540</p>
                      </span>
                    </div>

                    <div className="col-md-3">
                    </div>
                    <div className="col-md-3">
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                </div>
              </div>

          </div>

        </div>

          <DateCard data={this.props.data}/>


          {/*<div className="row">
              <div className="col-md-12" style={{paddingTop:"4px", paddingBottom:"10px"}}>
                  <div className="col-md-4 col-sm-12 col-xs-12 des-space">
                      <img alt='' src={this.props.data.images && this.props.data.images[0]} style={{width:"100%",height:"300px", borderRadius:"2px"}} />


                      <FeaturedCol4/>

                  </div>
                  <div className="col-md-8 col-sm-12 col-xs-12 des-space">
                    <div className="Event-borders">
                      <h3 style={{fontWeight:"bold",fontFamily: 'Crimson Text, sans-serif',marginTop:'11px'}}>{this.props.data && this.props.data.eventTitle}</h3>
                      <span >
                      <p className="job-time"></p>
                      </span>

                      <p className="font-style">{this.props.data && this.props.data.description}</p>
                    </div>

                    <DetailSliders/>
                    <FeaturedCol8 data={this.props.data}/>
                  </div>
              </div>
          </div>*/}
      </div>
    )
  }
}
export default EdetailFirstfold;
