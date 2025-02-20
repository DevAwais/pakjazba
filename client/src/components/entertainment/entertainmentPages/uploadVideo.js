import React, { Component } from 'react';
import HeaderMenu from '../../header/headermenu';
import LatestNews from '../entertainmenthome/LatestnewsSec';
import { HttpUtils } from '../../../Services/HttpUtils';
import { isTablet} from 'react-device-detect';
import axios from "axios/index";
import { Modal } from 'antd';
import './uploadVideo.css';
import UploadFunction from './uploadFunction';

class UploadVideo extends Component{
  constructor(props) {
      super(props)
      this.state = {
          newsApi: 'https://api.dailymotion.com/videos?fields=description,duration,embed_html,embed_url,id,likes_total,thumbnail_url,title,&channel=news&country=pk&page=1&limit=100',
          sportsApi: 'https://api.dailymotion.com/videos?fields=description,duration,embed_html,embed_url,id,likes_total,thumbnail_url,title,&channel=sport&country=pk&page=1&limit=100',
          dramasApi: 'https://api.dailymotion.com/user/x1gdbvp/videos?fields=description,duration,embed_html,embed_url,id,thumbnail_url,title,&page=1&limit=100',
          moviesApi: 'https://api.dailymotion.com/channel/shortfilms/videos?fields=description,embed_url,id,thumbnail_url,title,&tags=Pakistani+Movies&page=1&limit=100',
          musicsApi: 'https://api.dailymotion.com/videos?fields=description,duration,embed_url,id,likes_total,thumbnail_url,title,&channel=music&country=pk&search=Pakistani+songs&page=1&limit=100',
          news: [],
          sports: [],
          dramas: [],
          movies: [],
          musics: [],
          blogs: {},
          loader:false,
          videoData: [],
          visible: false,
          preview: ''
      };
  }

  componentDidMount() {
      window.scrollTo(0,0);
      this.callApi();
      this.getvideos();
  }

  async callApi(){
      const { newsApi, sportsApi, dramasApi, moviesApi, musicsApi } = this.state,
      news = await axios.get(newsApi),
      sports = await axios.get(sportsApi),
      dramas = await axios.get(dramasApi),
      movies = await axios.get(moviesApi),
      musics = await axios.get(musicsApi);
      this.setState({
          news: news.data.list,
          sports: sports.data.list,
          dramas: dramas.data.list,
          movies: movies.data.list,
          musics: musics.data.list
      });
  }

  getvideos = async () => {
      let response = await HttpUtils.get('getcustomvideo');
      this.setState({ videoData:response.content });
  }

  showModal = () => {
      this.setState({ visible: true });
  }

  handleOk = (e) => {
      this.setState({ visible: false });
  }

  handleCancel = (e) => {
      this.setState({ visible: false });
  }

  addInPreview(e){
      let video = e.videoLink[0],
      URL = 'https' + video.slice(4, video.length);
      this.setState({ preview: URL });
      window.scrollTo(0, 400)
  }

  render(){
      const { news, sports, dramas, movies, musics, loader, videoData, preview } = this.state;

      return(
          <div className="">
              {/* <Burgermenu entertainment={{news, sports, dramas, movies, musics}}/>
              <EHeader entertainment={{news, sports, dramas, movies, musics}} {...this.props}/> */}
              <div style={{width:"100%",height:"50px",marginTop:"100px"}}>
              </div>
              <HeaderMenu/>
              <div className="container" style={isTablet ? {width:"100%"} : {width:"70%"}}>
                  <UploadFunction onLoader={this.getvideos}/>
              <div className="row">
              <div className="col-md-8 col-sm-8">


              {preview.length > 0 && <iframe
                  frameBorder="0"
                  width="100%"
                  height="400"
                  src={preview}
                  allowFullScreen
                  allow="autoplay"></iframe>}

                  {videoData.map((elem,key) => {
                      return (
                          <div key={key} className="col-md-4 col-sm-4" style={{cursor: 'pointer', marginTop:"20px"}}>
                              <img onClick={this.addInPreview.bind(this, elem)} style={{height:"80px", width:"100%"}} src={elem.thumbnailImageLink} />
                              <p onClick={this.addInPreview.bind(this, elem)}>{elem.description.slice(0, 15)}</p>
                          </div>
                      );
                  })}

              </div>
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <LatestNews data={{news, sports}} />
                </div>
                {/*====================showing news and sports start====================*/}

                {/*====================showing news and sports end====================*/}
              </div>
              </div>

              {/*<!-- Modal -->*/}
              <Modal
                title="Upload Video"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <iframe id="cartoonVideo" width="103%" height="274px" src={this.state.preview} frameborder="0" allow="autoplay" allowfullscreen></iframe>
              </Modal>
          </div>
      )
  }
}

export default UploadVideo;


// <div className="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//   <div className="modal-dialog" role="document">
//     <div className="modal-content">
//       <div className="modal-header">
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//         <h4 className="modal-title" id="myModalLabel">Preview</h4>
//       </div>
//       <div className="modal-body">
//         <iframe id="cartoonVideo" width="560" height="315" src={this.state.preview} frameborder="0" allowfullscreen></iframe>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
//       </div>
//     </div>
//   </div>
// </div>
