import React, { Component } from 'react';
import { Icon } from 'antd';

export class Shareholder extends Component {
	state = {
		shareholders: [{ name: "" }],
	}

	handleAddShareholder = () => {
        this.setState({
          shareholders: this.state.shareholders.concat([{ name: "" }])
        }, () => {
        	this.props.onChange(this.props.id, this.state.shareholders) 
        });
    };

    handleRemoveShareholder = idx => () => {
        this.setState({
          shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        }, () => {
        	this.props.onChange(this.props.id, this.state.shareholders) 
        });
    };

    handleShareholderNameChange = idx => evt => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });

        this.setState({ shareholders: newShareholders }); 
        this.props.onChange(this.props.id, newShareholders)       
    };

    render(){
	  	return(
	  		
	            <div className="col-md-12" style={{padding: '0px'}}>
	                <div className="inputBox" style={{border: '1px solid gray'}}>
	                    {this.props.value.map((shareholder, idx) => (
	                        <div className="shareholder">
		                        <input
		                        	required={this.props.required}
									type="text"
									placeholder={`#${idx + 1}`}
									value={shareholder.name}
									id={this.props.id}
                                    style={{width: '86%'}}
                                    className="form-group"
									onChange={this.handleShareholderNameChange(idx)}
		                        />
		                        <button
			                        type="button"
			                        onClick={this.handleRemoveShareholder(idx)}
			                        className="btn btn-sm"
	                        		style={{margin:'11px 0px 11px 11px'}}
                        		>
		                          X
		                        </button>
	                        </div>
	                ))}
	                <button
						type="button"
						onClick={this.handleAddShareholder}
						className="button_add"
	                >
		                Add
					</button>
					</div>
	            </div>
	    )
    }
}

export class UploadedImages extends Component {
	render(){
	  	return(
	  		<div >
            {this.props.fileList.map((elem, key) => {
                let src = elem.src || elem;
                return(
                    <div key={key} className='insideDiv col-md-3'>
                        <a className="imgContainer">
                        <img alt='img1' 
                            className="imgDiv"
                            src={src}   
                            style={{height: '100%', width: '100%'}}                          
                        />
                        <span className="middle" style={{position: 'absolute', marginLeft: '-11%'}}>
                            
                                <Icon 
                                    title='Preview file' 
                                    onClick={() => this.props.handlePreview(src)}
                                    type="eye" 
                                    data-toggle="modal" 
                                    data-target="#myModal"
                                    theme="outlined"
                                    className="inner" 
                                />
                            
                            <Icon 
                                title='Remove file' 
                                type='delete' 
                                className="inner"
                                onClick={() => this.props.deleteImage(elem)}
                            />
                        </span>
                        </a>
                    </div>
                )
            })}
        </div>
	    )
	}
}
