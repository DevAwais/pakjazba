import React, { Component } from 'react';
import './buydetailsecondfold.css'

class Buydetailsecondfold extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            userEmail: '',
            msg: ''
        }
    }

    onChangeValue(e){
        var target = e.target.id;
        var value = e.target.value;
        if(target === 'name'){
            this.setState({
                name: value
            })
        }else if(target === 'email'){
            this.setState({
                userEmail: value
            })
        }else if(target === 'msg'){
            this.setState({
                msg: value
            })
        }
    }

    submitData(e){
        e.preventDefault();
        const { data } = this.props;
        const { name, userEmail, msg } = this.state;
        let obj = {
            username: name,
            useremail: userEmail,
            usermsg: msg,
            contactemail: data.contactemail
        }
        console.log(obj, 'objjjjjjjjjjjj')
        this.setState({
            name: '',
            userEmail: '',
            msg: ''
        })
    }

    render(){
        const { name, userEmail, msg } = this.state;
        const { data } = this.props;
        var email= 'abc@gmail.com';
        var phone = '***********';

        if(data.modeofcontact && data.modeofcontact.includes('email')){
            email = data.contactemail;
        }

        if(data.modeofcontact && data.modeofcontact.includes('phone')){
            phone = data.contactnumber;
        }

        return(
            <div className="">
                <div className="">
                    <h3 className="heading-padding"> Authors </h3>
                    <div className="shadowbox">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-3 col-sm-3 col-xs-12" style={{marginTop:"26px"}}>
                                    <div className="review-block-img">
                                        <img src={data.userImage} className="img-circle" alt=""/>
                                    </div>
                                </div>
                                <div className="col-sm-9 col-xs-12" style={{marginTop: "33px",textAlign:"left"}}>
                                    <div className="review-block-rate">
                                        <div className="review-block-name"><a href="#">{data.contactname}</a></div>
                                        
                                    </div>
                                    
                                </div>
                                <section  style={{float: "left",marginLeft: "16px"}}>
                                    <span><h4>Phone:</h4></span>
                                </section>
                                <section>{phone}</section><br/>
                                <section style={{float: "left",marginLeft: "17px"}}><h4>Email</h4></section>
                                <section>{email}</section>
                            </div>{/*col-md-6*/}
                            <div className="col-md-6 col-sm-6 col-xs-12" style={{marginTop: "15px"}}>
                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <label style={{float:"left"}}>Name:</label>
                                        <input type="text" className="form-control" value={name} id='name' onChange={this.onChangeValue.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <label style={{float:"left"}}>Email</label>
                                        <input type="email" className="form-control" value={userEmail} id="email" onChange={this.onChangeValue.bind(this)}/>
                                    </div>
                                    <label style={{float:"left"}}>Message:</label>
                                    <div className="form-group">
                                        <textarea type="text" className="form-control" id='msg' value={msg} onChange={this.onChangeValue.bind(this)}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-default" onClick={this.submitData.bind(this)}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Buydetailsecondfold;
