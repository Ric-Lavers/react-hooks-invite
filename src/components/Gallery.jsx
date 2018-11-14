import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import { CloudinaryContext, Transformation, Video, Image } from 'cloudinary-react';



const Gallery = () => {
  const [ images, setImages ] = useState([])

  // useEffect(() => {
    
  // }, [])
  return (
    <CloudinaryContext cloudName="aeonknight">
      { images.map((data, index) => {
        console.log(data)
        return(
          <div className="col-sm-4" key={index}>
            <div className="embed-responsive embed-responsive-4by3">
              <Image publicId={data.public_id} width="300" height="300" controls></Image>
            </div>
            <div> Created at {data.created_at} </div>

          </div>
        )})
      }
    </CloudinaryContext>
  )
}

export default Gallery