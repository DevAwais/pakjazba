import React, { Component } from 'react';
import BussinesCard from '../business/bussinessCard';
import {HttpUtils} from "../../Services/HttpUtils";

class ProfileListing extends Component{
    constructor(props){
        super(props);
        this.state = {
              businessData: [],
              roomRentData: [],
              buySellData: [],
              jobListData: [],
              eventPortalData: [],
              education: [],
          }
    }

    componentDidUpdate(prevProps, prevState){
      const { userId } = this.props;
        if(prevProps.userId !== userId){        
            this.getAllBusiness();
        }
    }

    async getAllBusiness(){
        let { userId } = this.props,
        { businessData, roomRentData, buySellData, jobListData , eventPortalData} = this.state,
        req = await HttpUtils.get('marketplace');
        if(req && req.code && req.code === 200){
            req.busell && req.busell.map((elem) => {
                if(elem.userid === userId){
                    let data = {...elem, ...{route: 'buySell'}}
                    buySellData.push(data)
                }
            })
            req.business && req.business.map((elem) => {
                if(elem.user_id === userId){
                    let data = {...elem, ...{route: 'business'}}
                    businessData.push(data)
                }
            })
            req.roomrentsdata && req.roomrentsdata.map((elem) => {
                if(elem.user_id === userId){
                    let data = {...elem, ...{route: 'rooms'}}
                    roomRentData.push(data)
                }
            })
            req.jobPortalData && req.jobPortalData.map((elem) => {
                if(elem.user_id === userId){
                    let data = {...elem, ...{route: 'jobPortal'}}
                    jobListData.push(data)
                }
            })
        }
        this.setState({
            buySellData,
            businessData,
            roomRentData,
            jobListData
        })
    }

    render(){
        const { buySellData, businessData, roomRentData, jobListData } = this.state;
        let listOf = this.props.listing.length > 0 ? this.props.listing : 'businessData',
        mapTo = this.state[listOf];

        return(            
            <div className="row">
                {mapTo.map((elem) => {
                    return (
                        <div className="col-md-4">
                             <BussinesCard  cardDetails={elem}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ProfileListing;
