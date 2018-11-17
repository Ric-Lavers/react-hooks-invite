import React, { Component, Suspense } from 'react'
import Dropzone from 'react-dropzone';
import request from 'superagent';

import { postImgSrc } from '../api/gallery'
import Spinner from './common/Spinner'


const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

class Uploader extends Component {

  state = {
    uploadedFileCloudinaryUrl: '',
    isLoading: false,
  };

  onImageDrop = files => {
    this.setState({
      uploadedFile: files[0]
    });

    files[0].size < 150//0001 
      ? this.handleImageUpload(files[0])
      : this.handleReject()

// console.log("Dropzone", files)

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
      // console.log(response.body)

      postImgSrc({
        src: response.body.secure_url,
        uploadedBy: localStorage.name,
        uploaderId: localStorage.personId,
      }).then( () => this.props.addImages({src:response.body.secure_url, title: "" }))
    });
    
    this.setState({ isLoading: false })
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  handleReject = (file) => {
    console.log("handleReject")
    this.props.setModal(
      "Too big",
      "please keep your image to under 1.5mb",
      () => this.handleImageUpload(this.state.uploadedFile),
      "Upload anyways?"
    )
  }

  
  render(){
    let { isLoading } = this.props;

    return (
      <Suspense fallback={ <Spinner /> }>
        <div className="Uploader">
          <Dropzone
            className="dropzone"
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop}
            // maxSize={150}//1500000
          >
            {isLoading ?
              <Spinner/>:
              <p>"Hey share a image with me!"<br/> Drop an image or click to select a file to upload.</p>}
          </Dropzone>
        {isLoading && "is loading ...."}
        </div>
      </Suspense>
    );
  }
}

export default Uploader;
