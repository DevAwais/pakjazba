import React, { Component } from 'react';
import {
    Form,
    Input,
    Icon,
    Cascader,
    Spin,
    Checkbox,
    notification,
    Upload,
    Modal,
    Anchor,
} from 'antd';
import AsyncStorage from "@callstack/async-storage/lib/index";
import Burgermenu from '../header/burgermenu';
import HeaderMenu from '../header/headermenu';
import Footer from '../footer/footer';
import sha1 from "sha1";
import superagent from "superagent";
import { Redirect } from 'react-router';
import { HttpUtils } from "../../Services/HttpUtils";
import moment from 'moment';
import stateCities from "../../lib/countrycitystatejson";

const { Link } = Anchor;

const handleClick = (e, link) => {
    e.preventDefault();
    console.log(link);
};

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item
//const stateCities= require('countrycitystatejson')

const condition = [{
    value: 'New',
    label: 'New'
}, {
    value: 'Used',
    label: 'Used',
}, {
    value: 'Good',
    label: 'Good',
}, {
    value: 'Excellent',
    label: 'Excellent',
}, {
    value: 'Age-Worn',
    label: 'Age-Worn',
}, {
    value: 'Refurbished',
    label: 'Refurbished',
}];

class Postbuysell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            desLength: 0,
            fileList: [],
            previewVisible: false,
            previewImage: '',
            hidePrice: false,
            hideAddress: false,
            msg: false,
            dLength: '',
            dWidth: '',
            dHeight: '',
            err: false,
            errMsg: '',
            categ: [],
            subCat: [],
            selectedCat: [],
            allCateg: {},
            selectSubCat: false,
            secSubCat: [],
            profileId: '',
            dataCat: [],
            dataCatSub: [],
            dataSubSub: [],
            dataTitle: '',
            dataDescription: '',
            dataPrice: '',
            dataCondition: [],
            dataMake: '',
            dataModelName: '',
            dataModelNumber: '',
            dataContact: '',
            dataEmail: '',
            dataNumber: '',
            dataCheckedList: [],
            dataDelivery: [],
            dataCity: [],
            dataAddress: '',
            imageList: [],
            objectId: '',
            statesUS: [],
            citiesUS: [],
            loader: false,
            objData: {}
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.categorylist();
        this.handleLocalStorage();
        let data = this.props.location.state;

        if (data) {
            this.setState({
                dataCat: [data.category],
                dataCatSub: [data.subcategory],
                dataSubSub: [data.subsubcategory],
                dataTitle: data.title,
                dataDescription: data.description,
                dataPrice: data.price,
                hidePrice: data.hideprice,
                dataCondition: [data.condition],
                dataMake: data.modelmake,
                dataModelName: data.modelname,
                dataModelNumber: data.modelnumber,
                dLength: data.sizedimension[0] ? data.sizedimension[0].length : this.state.dLength,
                dWidth: data.sizedimension[0] ? data.sizedimension[0].width : this.state.dWidth,
                dHeight: data.sizedimension[0] ? data.sizedimension[0].height : this.state.dHeight,
                dataContact: data.contactname,
                dataEmail: data.contactemail,
                dataNumber: data.contactnumber,
                dataCheckedList: data.modeofcontact,
                dataDelivery: data.delivery,
                dataCity: [data.city],
                dataState: [data.state],
                dataAddress: data.address,
                hideAddress: data.hideaddress,
                imageList: data.images,
                objectId: data._id
            })
        }
    }

    async categorylist() {
        let res = await HttpUtils.get('categoryclassifieddata');
        console.log(res, 'res')
        if(res){
            let mainCategory = res.data[1]
            let categ = Object.keys(mainCategory)
            categ = categ.filter((val) => val !== '_id')
            categ = categ.map((elem) => {
                return {
                    value: elem,
                    label: elem
                }
            })
            this.setState({
                categ: categ,
                allCateg: mainCategory
            })
        }
    }

    handleLocalStorage = () => {
        let states = stateCities.getStatesByShort('US');
        states = states.map((elem) => {
            return {
                label: elem,
                value: elem
            }
        })
        AsyncStorage.getItem('user')
            .then((obj) => {
                var userObj = JSON.parse(obj)
                if (!!userObj) {
                    this.setState({
                        userId: userObj._id,
                        profileId: userObj.profileId,
                        statesUS: states
                    })
                }
            })
    }

    checkValue(rule, value, callback) {
        this.setState({ desLength: value ? value.length : 0 })
        callback();
    }

    checkPriceValue(rule, value, callback) {
        if (!value) {
            callback('Please input your Price!');
        } else {
            callback();
        }
    }

    checkCheckBox = (rule, value, callback) => {
        if (!value) {
            callback('Please check at least one!');
        } else {
            callback();
        }
    };

    //-------------- upload functions start -------------------
    handleCancel = () => {
        this.setState({ previewVisible: false })
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl || file,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
        this.setState({ fileList })
    }
    //--------------upload functions end ---------------------

    //--------------function for cloudnary url ---------------
    uploadFile = (files) => {
        const image = files.originFileObj
        const cloudName = 'dxk0bmtei'
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
        const timestamp = Date.now() / 1000
        const uploadPreset = 'toh6r3p2'
        const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
        const signature = sha1(paramsStr)
        const params = {
            'api_key': '878178936665133',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        return new Promise((res, rej) => {
            let uploadRequest = superagent.post(url)
            uploadRequest.attach('file', image)
            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            })
            uploadRequest.end((err, resp) => {
                err ? rej(err) : res(resp);
            })
        })
    }

    //-----------------cloudnary function end ------------------

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loader: true })
                this.funcForUpload(values)
            }
        })
    }

    async funcForUpload(values) {
        const { fileList } = this.state;
        Promise.all(fileList.map((val) => {
            return this.uploadFile(val).then((result) => {
                return result.body.url
            })
        })).then((results) => {
            this.postData(values, results)
        })
    }

    async postData(values, response) {
        const { userId, dLength, dWidth, dHeight, profileId, objectId, imageList } = this.state;
        let obj = {
            user_id: userId,
            profileId: profileId,
            address: values.address,
            category: values.category[0],
            subCategory: values.subcategory[0],
            city: values.city[0],
            state: values.state[0],
            hideAddress: this.state.hideAddress,
            hidePrice: this.state.hidePrice,
            condition: values.condition[0],
            contactName: values.contactName,
            contactEmail: values.contactEmail,
            contactNumber: values.contactNumber,
            sizedimension: !!(dLength && dWidth && dHeight) ? [{ length: dLength, width: dWidth, height: dHeight }] : !!(dLength) ? [{ length: dLength }] : !!(dWidth) ? [{ width: dWidth }] : !!(dHeight) ? [{ height: dHeight }] : [],
            contactMode: values.contactMode,
            delivery: values.delivery,
            description: values.description,
            make: values.make,
            modelName: values.modelName,
            number: values.number,
            postingTitle: values.postingTitle,
            subSubCategory: values.subsubcategory ? values.subsubcategory[0] : '',
            price: values.price,
            arr_url: [...response, ...imageList],
            objectId: objectId,
            posted: moment().format('LL')
        }
        let req = await HttpUtils.post('postbuyselldata', obj);
        if (req.code === 200) {
            this.props.form.resetFields();
            this.openNotification()
            this.setState({ objData: obj, msg: true, dLength: '', dWidth: '', dHeight: '', loader: false })
        }
    }

    openNotification() {
        notification.open({
            message: 'Success ',
            description: 'Your need is submited successfully, Kindly visit your profile',
        });
    };

    onChangePrice(e) {
        this.setState({ hidePrice: e.target.checked });
    }

    onChangeAddress(e) {
        this.setState({ hideAddress: e.target.checked });
    }

    onDimensionChange = (e) => {
        if (!isNaN(e.target.value)) {
            this.setState({ err: false, errMsg: '' })
            if (e.target.placeholder === 'Length') {
                this.setState({ dLength: e.target.value })
            } else if (e.target.placeholder === 'Width') {
                this.setState({ dWidth: e.target.value })
            } else if (e.target.placeholder === 'Height') {
                this.setState({ dHeight: e.target.value })
            }
        } else {
            if (e.target.placeholder === 'Length') {
                this.setState({ err: true, errMsg: 'Input must be number', dLength: '' })
            } else if (e.target.placeholder === 'Width') {
                this.setState({ err: true, errMsg: 'Input must be number', dWidth: '' })
            } else if (e.target.placeholder === 'Height') {
                this.setState({ err: true, errMsg: 'Input must be number', dHeight: '' })
            }
        }
    }

    onChangeState(value) {
        if (!!value.length) {
            let cities = stateCities.getCities('US', value[0])
            cities = cities.map((elem) => {
                return {
                    label: elem,
                    value: elem
                }
            })
            this.setState({
                citiesUS: cities
            })
        }
    }

    onChangeCat(value) {
        if (!!value.length) {
            const { allCateg } = this.state;
            let selected = allCateg[value[0]]
            let selectedArr = Object.keys(selected[0])
            selectedArr = selectedArr.map((elem) => {
                return {
                    label: elem,
                    value: elem
                }
            })
            this.setState({
                subCat: selectedArr,
                selectedCat: selected[0],
                secSubCat: [],
                selectSubCat: false
            })
        }
    }

    onChangeSubCat(value) {
        if (!!value.length) {
            const { selectedCat } = this.state;
            let selected = selectedCat[value[0]]
            selected = selected.map((elem) => {
                return {
                    label: elem,
                    value: elem
                }
            })
            this.setState({
                secSubCat: selected,
                selectSubCat: true
            })
        }
    }

    deleteImage(e) {
        let { imageList } = this.state;
        imageList = imageList.filter((elem) => elem !== e)
        this.setState({ imageList: imageList })
    }

    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }

    render() {
        const { previewVisible, previewImage, fileList, desLength, categ, subCat, selectSubCat, secSubCat, statesUS, citiesUS, objData } = this.state,
            { getFieldDecorator } = this.props.form,
            antIcon = <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />;

        if (this.state.msg === true) {
            return <Redirect to={{ pathname: '/detail_buySell', state: objData }} />
        }

        function filter(inputValue, path) {
            return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
        }

        const uploadedImages = (
            <div style={{ display: 'flex' }}>
                {this.state.imageList.map((elem) => {
                    return (
                        <div className='insideDiv'>
                            <a>
                                <img alt='img1' src={elem} />
                                <span>
                                    <a><Icon title='Preview file' onClick={() => this.handlePreview(elem)} type="eye" theme="outlined" style={{ zIndex: 10, transition: 'all .3s', fontSize: '16px', width: '16px', color: 'rgba(255, 255, 255, 0.85)', margin: '0 4px' }} /></a>
                                    <Icon title='Remove file' type='delete' onClick={this.deleteImage.bind(this, elem)} style={{ zIndex: 10, transition: 'all .3s', fontSize: '16px', width: '16px', color: 'rgba(255, 255, 255, 0.85)', margin: '0 4px' }} />
                                </span>
                            </a>
                        </div>
                    )
                })}
            </div>
        )

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const optionsContact = [
            { label: 'email', value: 'email' },
            { label: 'phone', value: 'phone' }
        ];

        const optionsDelivery = [
            { label: 'Pickup', value: 'pickup' },
            { label: 'Free Shipping', value: 'freeShipping' },
            { label: 'Local Delivery', value: 'localDelivery' },
            { label: 'Not Applicable', value: 'notApplicable' },
        ];

        const formItemLayout = {
            labelCol: {
                md: { span: 6 },
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                md: { span: 12 },
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div>
                {/*================================App component include Start===========================*/}
                <HeaderMenu />
                <div className="hidden-xs" style={{ width: "100%", height: "67px", marginTop: "3px" }}></div>
                {/*================================post business form start============================*/}
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs"></div>
                <div className="col-lg-2 col-md-2 hidden-sm hidden-xs" id="section1" style={{ marginLeft: '4%', marginTop: '116px', position: 'fixed', }}>
                    <Anchor className="" style={{ margin: '2%', backgroundColor: '#f6f6f6' }}>
                        <Link href="#scrollChange1" title="General" />
                        <Link href="#scrollChange2" title="Brand Details" />
                        <Link href="#scrollChange3" title="Upload" />
                        <Link href="#scrollChange4" title="Contact" />
                    </Anchor>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="main_c_panel" style={{ textAlign: 'center', marginTop: '40px' }}>
                        <h3 style={{ color: 'black', fontWeight: 'bold' }}>Submit your Items</h3>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="">{/*panel-group */}
                            <div className="">{/*panel panel-default */}

                                <div className="formRadius">{/*panel-body */}
                                    <div className="formRadius card" id="scrollChange1">{/*panel panel-default */}
                                        <div className="topRadius" style={{ color: 'black', padding: '2%', fontFamily: 'Crimson Text, serif !important', borderBottom: '1px solid #d9d9d9' }}>
                                            {/* <Icon type="info-circle"/> */}
                                            <i class="fa fa-info-circle iconStyle"></i>
                                            <span className="margin_font_location">General</span>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <label htmlFor="sel1">Posting Title</label>
                                                <FormItem
                                                // {...formItemLayout}
                                                // label="Posting Title"

                                                // style={{ padding: '2%' }}
                                                >
                                                    {getFieldDecorator('postingTitle', {
                                                        initialValue: this.state.dataTitle,
                                                        rules: [{ required: true, message: 'Please input your Posting Title!', whitespace: true }],
                                                    })(
                                                        <Input type="text" className="form-control" />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <label htmlFor="sel1">Category</label>
                                                <FormItem
                                                // {...formItemLayout}
                                                // label="Category"

                                                // style={{ marginTop: "20px", padding: '2%' }}
                                                >

                                                    {getFieldDecorator('category', {
                                                        initialValue: this.state.dataCat,
                                                        rules: [{ type: 'array', required: true, message: 'Please select your Category!' }],
                                                    })(
                                                        <Cascader options={categ} showSearch={{ filter }} onChange={this.onChangeCat.bind(this)} />
                                                    )}
                                                </FormItem>
                                            </div>
                                        </div>

                                        <hr className="hrLineStyle" />
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <label htmlFor="sel1">Sub-Category</label>
                                                <FormItem
                                                // {...formItemLayout}
                                                // label="Sub-Category"

                                                // style={{ padding: '2%' }}
                                                >
                                                    {getFieldDecorator('subcategory', {
                                                        initialValue: this.state.dataCatSub,
                                                        rules: [{ type: 'array', required: true, message: 'Please select your Sub-Category!' }],
                                                    })(
                                                        <Cascader options={subCat} showSearch={{ filter }} onChange={this.onChangeSubCat.bind(this)} />
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                // style={{ padding: '2%' }}
                                                >
                                                    {getFieldDecorator('subsubcategory', {
                                                        initialValue: this.state.dataSubSub,
                                                        rules: [{ type: 'array', required: true, message: 'Please select your Posting Type!' }],
                                                    })(
                                                        <Cascader options={secSubCat} />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <label htmlFor="sel1">Description</label>
                                                <FormItem
                                                // {...formItemLayout}
                                                // label="Description"

                                                // style={{ padding: '2%' }}
                                                >
                                                    {getFieldDecorator('description', {
                                                        initialValue: this.state.dataDescription,
                                                        rules: [
                                                            {
                                                                required: true, message: 'Please input your Description!', whitespace: true
                                                            },
                                                            {
                                                                validator: this.checkValue.bind(this)
                                                            }],
                                                    })(
                                                        <TextArea
                                                            rows={6}
                                                            maxLength="500"
                                                            style={{ "marginBottom": "10px", float: 'right' }} />
                                                    )}
                                                    <br />
                                                    <span>{500 - desLength} Words</span>
                                                </FormItem>
                                            </div>
                                        </div>

                                        <hr className="hrLineStyle" />

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-6 col-md-6">
                                                <label htmlFor="sel1">Price</label>
                                                <FormItem
                                                // {...formItemLayout}
                                                // label="Price"
                                                >
                                                    {getFieldDecorator('price', {
                                                        initialValue: this.state.dataPrice,
                                                        rules: [{ required: true, message: 'Please input your Price!', whitespace: true },
                                                        { validator: this.validateNumber.bind(this) }],
                                                    })(
                                                        <Input type="text" className="form-control" />
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div className="col-md-4">
                                                <Checkbox style={{ marginTop: '30px' }} checked={this.state.hidePrice} onChange={this.onChangePrice.bind(this)}>(Hide Price)</Checkbox>
                                            </div>
                                            <div className="col-md-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="card formRadius" id="scrollChange2">{/*panel panel-default  */}
                                <div className="bold_c_text topRadius" style={{ backgroundColor: 'white', color: 'black', padding: '2%', border: 'none', borderBottom: '1px solid #d9d9d9', borderRadius: '3px !important', }}>
                                    {/* <Icon type="info-circle"/> */}
                                    <i class="fa fa-info-circle iconStyle"></i>
                                    <span className="margin_font_location">Brand Details</span>
                                </div>
                                <div className="">{/*panel-body */}
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Condition</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Condition"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('condition', {
                                                    initialValue: this.state.dataCondition,
                                                    rules: [{ type: 'array', required: true, message: 'Please select your Condition!' }],
                                                })(
                                                    <Cascader options={condition} showSearch={{ filter }} />
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Brand</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Brand"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('make', {
                                                    initialValue: this.state.dataMake,
                                                    rules: [{ required: true, message: 'Please input your Make!', whitespace: true }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>

                                    <hr className="hrLineStyle" />

                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Model Name</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Model Name"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('modelName', {
                                                    initialValue: this.state.dataModelName,
                                                    rules: [{ required: true, message: 'Please input your Model Name!', whitespace: true }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Model Number</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Model Number"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('number', {
                                                    initialValue: this.state.dataModelNumber,
                                                    rules: [{ required: true, message: 'Please input your Number!', whitespace: true },
                                                    { validator: this.validateNumber.bind(this) }],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>
                                    <hr className="hrLineStyle" />
                                    <div className="row">
                                        <div></div>
                                        <div className="col-md-3" style={{ textAlign: "right" }}><label style={{ "color": "black" }}>Length/Width/Height:</label></div>
                                        <div className="col-md-6">
                                            <Input style={{ width: '25%' }} value={this.state.dLength} onChange={this.onDimensionChange} placeholder="Length" />
                                            <Input style={{ width: '25%', marginLeft: '5px' }} value={this.state.dWidth} onChange={this.onDimensionChange} placeholder="Width" />
                                            <Input style={{ width: '25%', marginLeft: '5px' }} value={this.state.dHeight} onChange={this.onDimensionChange} placeholder="Height" />
                                        </div>
                                    </div>
                                    <span>{this.state.err && this.state.errMsg}</span>
                                    {/* <FormItem
                                        {...formItemLayout}
                                        label="Images"
                                    >
                                        {getFieldDecorator('images', {
                                            initialValues: this.state.imageList,
                                            rules: [{ required: true, 
                                                message: 'Please upload your Images!', 
                                                whitespace: true }],
                                        })(
                                            <div>
                                                <Upload
                                                    action="//jsonplaceholder.typicode.com/posts/"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onPreview={this.handlePreview}
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.imageList.length + fileList.length >= 3 
                                                        ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisible} 
                                                footer={null} onCancel={this.handleCancel}>
                                                    <img alt="example" style={{ width: '100%' }} 
                                                    src={previewImage} />
                                                </Modal>
                                                {uploadedImages}
                                            </div>
                                        )}
                                    </FormItem> */}
                                </div>
                            </div>
                            <br />
                            <div className="card formRadius" id="scrollChange3">{/*panel panel-default  */}
                                <div className="bold_c_text topRadius" style={{ backgroundColor: 'white', color: 'black', padding: '2%', border: 'none', borderBottom: '1px solid #d9d9d9', borderRadius: '3px !important', }}>
                                    {/* <Icon type="info-circle"/> */}
                                    <i class="fa fa-info-circle iconStyle"></i>
                                    <span className="margin_font_location">Upload</span>
                                </div>
                                <div className="">{/*panel-body */}
                                    <FormItem
                                        label="Images"

                                        style={{ padding: '2%' }}
                                    >
                                        {getFieldDecorator('images', {
                                            initialValues: this.state.imageList,
                                            rules: [{
                                                required: true,
                                                message: 'Please upload your Images!',
                                                whitespace: true
                                            }],
                                        })(
                                            <div>
                                                <Upload
                                                    action="//jsonplaceholder.typicode.com/posts/"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onPreview={this.handlePreview}
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.imageList.length + fileList.length >= 3
                                                        ? null : uploadButton}
                                                </Upload>
                                                <Modal visible={previewVisible}
                                                    footer={null} onCancel={this.handleCancel}>
                                                    <img alt="example" style={{ width: '100%' }}
                                                        src={previewImage} />
                                                </Modal>
                                                {uploadedImages}
                                            </div>
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <br />
                            <div className="card formRadius" id="scrollChange4">{/*panel panel-default */}
                                <div className="bold_c_text topRadius" style={{ backgroundColor: 'white', color: 'black', padding: '8px', border: 'none', borderBottom: '1px solid #d9d9d9', borderRadius: '3px !important', }}>
                                    {/* <Icon type="info-circle"/> */}
                                    <i class="fa fa-address-card iconStyle"></i>
                                    <span className="margin_font_location">Contact</span>
                                </div>
                                <div className="">{/*panel-body */}
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Contact Name</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Contact Name"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('contactName', {
                                                    initialValue: this.state.dataContact,
                                                    rules: [{ required: true, message: 'Please input your Contact Name!', whitespace: true }],
                                                })(
                                                    <Input type="text" className="form-control" />
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Contact Email</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Contact Email"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('contactEmail', {
                                                    initialValue: this.state.dataEmail,
                                                    rules: [{ type: 'email', message: 'The input is not valid E-mail!', whitespace: true },
                                                    {
                                                        required: true,
                                                        message: 'Please input your Contact Email!', whitespace: true
                                                    }],
                                                })(
                                                    <Input type="text" className="form-control" />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>

                                    <hr className="hrLineStyle" />

                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Contact Number</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Contact Number"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('contactNumber', {
                                                    initialValue: this.state.dataNumber,
                                                    rules: [{ required: true, message: 'Please input your Contact Number!', whitespace: true },
                                                    { validator: this.validateNumber.bind(this) }],
                                                })(
                                                    <Input type="text" className="form-control" />
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Mode of Contact</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Mode of Contact"
                                            >
                                                {getFieldDecorator('contactMode', {
                                                    initialValue: this.state.dataCheckedList,
                                                    rules: [{ validator: this.checkCheckBox }],
                                                })(
                                                    <CheckboxGroup options={optionsContact} />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>

                                    <hr className="hrLineStyle" />

                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <label htmlFor="sel1">Delivery</label>
                                            <FormItem
                                                // {...formItemLayout}
                                                // label="Delivery"

                                                // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('delivery', {
                                                    initialValue: this.state.dataDelivery,
                                                    rules: [{ validator: this.checkCheckBox }],
                                                })(
                                                    <CheckboxGroup options={optionsDelivery} />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>

                                    <hr className="hrLineStyle" />

                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">Address</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="Address"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('address', {
                                                    initialValue: this.state.dataAddress,
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please input your Address!',
                                                        whitespace: true
                                                    }],
                                                })(
                                                    <Input type="text" className="form-control" />
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <Checkbox style={{ marginTop: '30px' }} checked={this.state.hideAddress} onChange={this.onChangeAddress.bind(this)}>(Hide Address)</Checkbox>
                                        </div>
                                    </div>

                                    <hr className="hrLineStyle" />
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">State</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="State"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('state', {
                                                    initialValue: this.state.dataState,
                                                    rules: [{ type: 'array', required: true, message: 'Please select your State!' }],
                                                })(
                                                    <Cascader options={statesUS} showSearch={{ filter }} onChange={this.onChangeState.bind(this)} />
                                                )}
                                            </FormItem>
                                        </div>
                                        <div className="col-xs-12 col-sm-6 col-md-6">
                                            <label htmlFor="sel1">City</label>
                                            <FormItem
                                            // {...formItemLayout}
                                            // label="City"

                                            // style={{ padding: '2%' }}
                                            >
                                                {getFieldDecorator('city', {
                                                    initialValue: this.state.dataCity,
                                                    rules: [{ type: 'array', required: true, message: 'Please select your City!' }],
                                                })(
                                                    <Cascader options={citiesUS} showSearch={{ filter }} />
                                                )}
                                            </FormItem>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="row center_global">
                                {this.state.loader && <Spin indicator={antIcon} />}
                                <button disabled={!!this.state.loader} className="btn color_button" style={{ "width": "20%" }}>Submit</button>
                            </div>
                        </div>
                    </Form>

                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}

const WrappedBusinessForm = Form.create()(Postbuysell);
export default WrappedBusinessForm;
