import React, { useState, useEffect } from 'react'

import RyansGallery from '../RyanFlorence/App' 
import { postImgSrc, getAllImgSrc } from '../api/gallery'
import { log } from 'core-js';


const Gallery = () => {
  const [ images, setImages ] = useState([])

  useEffect(async () => {
    try {
      let imgs  = await getAllImgSrc()
      imgs = imgs.map( i =>  ({src: i.src, title: ""}) ) 
      setImages(imgs)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <RyansGallery slides={images}/>
  );
}

export default Gallery