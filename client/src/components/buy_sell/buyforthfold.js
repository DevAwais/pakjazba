import React, { Component } from 'react';
import './buysecondfold.css'
import {HttpUtils} from "../../Services/HttpUtils";
import { Pagination } from 'antd';
import { connect } from 'react-redux'

class Forthfold extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: 1,
            buySell: [],
            showBuySell: [],
            filteredArr: [],
            searchValue: ''
        }
    }

    componentDidMount(){
        this.getAllBusiness()
    }

    componentDidUpdate(prevProps, prevState){
        const { buySell } = this.state;
        const { text } = this.props;
        if(prevProps.text !== text){
            if(!!text){
                this.searchedArr(text)
            }else {
                this.setState({
                    showBuySell: buySell.slice(0, 6),
                    filteredArr: []
                })
            }
        }
    }

    searchedArr(text){
        const { buySell } = this.state;
        let filteredArr = buySell.filter((elem) => {
            return elem.category && elem.category.toLowerCase().includes(text.toLowerCase()) ||
                elem.subcategory && elem.subcategory.toLowerCase().includes(text.toLowerCase())
        })
        this.setState({
            filteredArr,
            showBuySell: filteredArr.slice(0, 6)
        })
    }

    async getAllBusiness(){
        var res = await HttpUtils.get('marketplace')
        this.setState({
            buySell: res.busell,
            showBuySell: res.busell.slice(0, 6)
        })
    }

    funcIndexes(page){
        var to = 6 * page;
        var from = to - 6;
        return {from: page === 1 ? 0 : from, to: page === 1 ? 6 : to}
    }

    onChange = (page) => {
        const { buySell, filteredArr } = this.state;
        var indexes = this.funcIndexes(page)
        if(!!filteredArr.length){
            this.setState({
                current: page,
                showBuySell: filteredArr.slice(indexes.from, indexes.to)
            });
        }else {
            this.setState({
                current: page,
                showBuySell: buySell.slice(indexes.from, indexes.to)
            });
        }
    }

    render(){
        const { buySell, showBuySell, filteredArr } = this.state;
        return(
            <div className="secondfold">
                <div className="row">
                    {showBuySell && showBuySell.map((elem) => {
                        return (
                        <div className="col-md-4">
                            <div className="ibox">
                                <div className="ibox-content product-box">
                                    <div className="product-imitation">
                                        <span className="card-button">{elem.category}</span>
                                        <h4> Furniture For Sale </h4>
                                        <i className="glyphicon glyphicon-map-marker"/><p className="text">Home & Decor</p>
                                    </div>
                                    <div className="cust-margin">
                                        <i className="glyphicon glyphicon-home"/>
                                        <p className="text">Home icon</p>
                                    </div>
                                    <div className="product-desc">
                                        <span className="product-price">{!elem.hideprice ? elem.price : 'Hide'}</span>
                                        <small className="text-muted">Category</small>
                                        <a href="#" className="product-name">{elem.category}</a>
                                        <div className="small m-t-xs">
                                            {elem.description && elem.description}
                                        </div>
                                        <div className="m-t text-righ">
                                            <a href="#" className="btn btn-xs btn-outline btn-primary">Info <i className="fa fa-long-arrow-right"></i> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <span style={{textAlign:"center"}}><Pagination defaultCurrent={1} defaultPageSize={6} total={!!filteredArr.length ? filteredArr.length :buySell.length} onChange={this.onChange} /></span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        text: state.text
    })
}

export default connect(mapStateToProps)(Forthfold);