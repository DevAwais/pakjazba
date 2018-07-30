import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import axios from 'axios';


const FormItem = Form.Item;

class Forgotpassword extends Component{

	state = {
	 visible: false,
	 email:''
	  }

	  showModal = () => {
	    this.setState({
	      visible: true,
	    });
	  }

	  handleOk = (e) => {
	    this.setState({
	      email:this.refs.email,
	      visible: false,
	    });
	    console.log(this.refs.email.value);
	    console.log(this.refs.password.value);
	  }

	  handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	  }
	  handleSubmited = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        axios.get('http://localhost:5000/api/resetpassword?email='+values.email)
	        .then((response) =>{
	        	console.log(response);
	        	if(response.data.code == 404){
	        		this.setState({
	        			shown:true
	        		})
	        	}//end if condition
	        })
	      }
    });
  }


	render(){
		const { getFieldDecorator } = this.props.form;
		return(
				<div>
					<span onClick={this.showModal} >(Forgot your password?)</span>
					{/*===================modal code start==========================*/}
					<Modal
			          title="Reset Your Password"
			          visible={this.state.visible}
			          onOk={this.handleOk}
			          onCancel={this.handleCancel}
			          footer={[
			            <Button key="back" onClick={this.handleCancel}>Return</Button>,
			            <Button key="submit" type="primary" onClick={this.handleOk}>
			              Submit
			            </Button>,
         			 ]}
			        >
			        	<div className="row">
			        		<div className="col-md-12">
			        			<span>We’ll send you the info you need.</span>
							</div>{/*col-md-12*/}
			        	</div>{/*row*/}
			        	<Form onSubmit={this.handleSubmited}>
					        <FormItem label="">
						          {getFieldDecorator('email', {
						            rules: [{
						              type: 'email', message: 'The input is not valid E-mail!',
						            }, {
						              required: true, message: 'Please input your E-mail!',
						            }],
						          })(
						            <Input  />
						          )}
        					</FormItem>
        					<span>Email doesnot exit</span>
					        <FormItem
					          wrapperCol={{ span: 12, offset: 6 }}
					        >
					          <Button type="" className="btn color_button"  htmlType="submit">
					            Send password reset email
					          </Button>
				        	</FormItem>
					     </Form>{/*Form*/}
			        </Modal>
				</div>
			)
	}

}
const WrappedResetEmail = Form.create()(Forgotpassword);

export default WrappedResetEmail;