import React, { Component } from 'react';
import ProfileContact from './profileContact';
import ProfileListing from './profileListing';
import { Tabs, Radio } from 'antd';


const TabPane = Tabs.TabPane;

class ProfileTabs extends Component{

  constructor(props) {
     super(props);
     this.state = {
       mode: 'top',
     };
   }

   handleModeChange = (e) => {
     const mode = e.target.value;
    if = listing
     this.setState({ mode });
   }

  render(){

    const { mode } = this.state

    return(

      <div className>
        <div className="container" style={{}}>
          <div className="row">
              <div className="col-md-12 hidden-xs">
                  <div className="tab" role="tabpanel">
                      <ul className="nav nav-tabs" role="tablist">
                          <li role="presentation" className="active"><a href="#Section1" aria-controls="home" role="tab" data-toggle="tab">Contact</a></li>
                          <li role="presentation"><a href="#Section2" aria-controls="profile" role="tab" data-toggle="tab">Listing</a></li>
                      </ul>
                  </div>
              </div>
              <div className="visible-xs">
                <div className="tab" role="tabpanel">
                  <div className="nav nav-tabs" role="tablist">
                    <Tabs
                      defaultActiveKey="1"
                      tabPosition={mode}
                    >
                      <TabPane tab="Contact" key="1"><a href="#Section1" aria-controls="home" role="tab" data-toggle="tab"></a></TabPane>
                      <TabPane tab="Listing" key="2"><a href="#Section2" aria-controls="profile" role="tab" data-toggle="tab"></a></TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="container" style={{width:"100%"}}>
          <div class="tab-content" style={{marginLeft:"30px"}}>
              <div role="tabpanel" class="tab-pane fade in active" id="Section1">
                <ProfileContact/>
              </div>
              <div role="tabpanel" class="tab-pane fade" id="Section2">
                <ProfileListing data={this.props.}/>
              </div>
          </div>
        </div>
      </div>

    )
  }
}

export default ProfileTabs;
