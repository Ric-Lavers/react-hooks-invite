import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';

import { postImgSrc } from '../api/gallery'

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

class Uploader extends Component {

  state = {
    uploadedFileCloudinaryUrl: '',
    isLoading: false,
  };

  onImageDrop = files => {
    // this.setState({
    //   uploadedFile: files[0]
    // });

    this.handleImageUpload(files[0]);

  }

  handleImageUpload = file => {
    this.setState({ isLoading:true })
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
      console.log(response.body)
      postImgSrc({
        src: response.body.secure_url,
        uploadedBy: localStorage.name,
        uploaderId: localStorage.personId,
      })
    });
    
    this.setState({ isLoading: false })
  }

  
  render(){
    let { isLoading } = this.state;

      return (
        <div className="Uploader">
          <Dropzone
            className="dropzone"
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop}
          >
            <p>"Hey share a image with me!"<br/> Drop an image or click to select a file to upload.</p>
          </Dropzone>
         {isLoading && "is loading ...."}
        </div>
      );
  }
}

export default Uploader;
