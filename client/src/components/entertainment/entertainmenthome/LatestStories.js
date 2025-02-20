import React, { Component } from 'react';
import './LatestStories.css';
import { connect } from 'react-redux'
import LatestNews from './LatestnewsSec';
import './LatestStories.css';
import { Spin, Icon } from 'antd';

class Stories extends Component {

    nextVideo(obj) {
        const { dispatch, entertainment } = this.props;

        let inputValue = '',
            elem = obj.elem,
            arr = obj.arr;
        this.props.history.push({ pathname: `/entertainment_detail/${elem.id}`, state: { elem, arr, entertainment } })
    }

    


    render() {
        const { news, sports, dramas, movies, musics } = this.props.entertainment;
        let detail = Object.values(this.props.entertainment);
        const antIcon =
        <Icon type="loading" style={{ fontSize: '110px' }} spin />;
        return (
            <div>
                {Object.keys(detail).length == 0 ? <div style={{ textAlign: 'center' }}> <Spin indicator={antIcon} /> </div>
                    :
                <div className="row" style={{ padding: "0", marginTop: "45px" }}>
                    <div className="col-md-8 col-sm-8">
                        {detail && detail[0].length > 0 && detail[1].length > 0 && detail[2].length > 0 &&
                            detail[3].length > 0 && detail[4].length > 0 ? Object.keys(detail).map((el, k) => {
                                let arr = detail[k];
                                let str = el.split('')[0].toUpperCase() + el.slice(1, el.length);
                                if (str !== 'Musics') {
                                    return (
                                        <div key={k} className="row" style={{ padding: "0px" }}>
                                            {/* <h4><strong>{str}</strong></h4> */}
                                            {arr.map((elem, key) => {
                                                let des = !!elem.description ? elem.description : elem.title;
                                                if (des.length > 65) {
                                                    des = des.slice(0, 30)
                                                    des += '...'
                                                }
                                                if (key <= 5) {
                                                    return (
                                                        <div key={key} className="col-md-6 col-sm-6"
                                                            onClick={this.nextVideo.bind(this, { elem, arr })}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <img style={{ height: "150px", width: "100%" }} src={elem.thumbnail_url} />
                                                            <p><strong>{des.slice(0,15)}</strong></p>
                                                        </div>
                                                    )
                                                }
                                            })}

                            

                                        </div>
                                    )
                                }
                            })

                            :
                            Object.keys(detail).map((el, k) => {
                                let arr = detail[k];
                                let str = el.split('')[0].toUpperCase() + el.slice(1, el.length);
                                if (str !== 'Musics') {
                                    return (
                                        <div key={k} className="row" style={{ padding: "0px" }}>
                                            {arr.map((elem, key) => {
                                                let des = !!elem.description ? elem.description : elem.title;
                                                if (des.length > 65) {
                                                    des = des.slice(0, 56)
                                                    des += '...'
                                                }
                                                if (key <= 17) {
                                                    return (
                                                        <div key={key} className="col-md-4 col-sm-4"
                                                            onClick={this.nextVideo.bind(this, { elem, arr })}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <img style={{ height: "150px", width: "100%" }} src={elem.thumbnail_url} />
                                                            <p><strong>{des.slice(0,17)}..</strong></p>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>    
                    <div className="col-md-4 col-sm-4">
                            <LatestNews data={{ news, sports }} callRoute={this.nextVideo.bind(this)} />
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        text: state.text
    })
}

export default connect(mapStateToProps)(Stories);

// export default Stories;

