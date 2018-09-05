import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './secondfold.css'
import { Pagination } from 'antd';
import {HttpUtils} from "../../Services/HttpUtils";
import { connect } from 'react-redux'


class Secondfold extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: 1,
            business: [],
            showBusiness: [],
            filteredArr: [],
            searchValue: ''
        }
    }

    componentDidMount(){
        this.getAllBusiness()
    }

    componentDidUpdate(prevProps, prevState){
        const { business } = this.state;
        const { text } = this.props;
        if(prevProps.text !== text){
            if(!!text){
                this.searchedArr(text)
            }else {
                this.setState({
                    showBusiness: business.slice(0, 6),
                    filteredArr: []
                })
            }
        }
    }

    searchedArr(text){
        const { business } = this.state;
        let filteredArr = business.filter((elem) => {
            return elem.businesscategory && elem.businesscategory.toLowerCase().includes(text.toLowerCase()) ||
                elem.businessownername && elem.businessownername.toLowerCase().includes(text.toLowerCase()) ||
                elem.businessname && elem.businessname.toLowerCase().includes(text.toLowerCase()) ||
                elem.businessnumber && elem.businessnumber.toLowerCase().includes(text.toLowerCase())
        })
        this.setState({
            filteredArr,
            showBusiness: filteredArr.slice(0, 6)
        })
    }

    async getAllBusiness(){
        var res = await HttpUtils.get('marketplace')
        this.setState({
            business: res.business,
            showBusiness: res.business.slice(0, 6)
        })
    }

    funcIndexes(page){
        var to = 6 * page;
        var from = to - 6;
        return {from: page === 1 ? 0 : from, to: page === 1 ? 6 : to}
    }

    onChange = (page) => {
        const { business, filteredArr } = this.state;
        var indexes = this.funcIndexes(page)
        if(!!filteredArr.length){
            this.setState({
                current: page,
                showBusiness: filteredArr.slice(indexes.from, indexes.to)
            });
        }else {
            this.setState({
                current: page,
                showBusiness: business.slice(indexes.from, indexes.to)
            });
        }
    }

    render(){
        const { business, showBusiness, filteredArr } = this.state;

        return(
            <div className="secondfold">
                <h1 className="text-align"> Great Places </h1>
                <div className="index-content" style={{marginBottom: "-225px"}}>
                    <div className="row">
                        {showBusiness && showBusiness.map((elem) => {
                            let str = elem.description;
                            if(str.length > 100) {
                                str = str.substring(0, 100);
                                str = str + '...'
                            }
                            return (<a href="blog-ici.html">
                            <div className="col-md-4"  style={{'marginBottom': '30px'}}>
                                <div className="card">
                                    <img src="http://cevirdikce.com/proje/hasem-2/images/finance-1.jpg"/>
                                    <h4>{elem.businessname}</h4>
                                    <p>{str}</p>
                                    <a href="blog-ici.html" className="blue-button">Read More</a>
                                </div>
                            </div>
                        </a>)
                        })}
                    </div>
                    <span style={{textAlign:"center"}}><Pagination defaultCurrent={1} defaultPageSize={6} total={!!filteredArr.length ? filteredArr.length :business.length} onChange={this.onChange} /></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        text: state.text
    })
}

export default connect(mapStateToProps)(Secondfold);
