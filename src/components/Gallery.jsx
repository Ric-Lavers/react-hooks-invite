import React, { useState, useEffect } from 'react'

import RyansGallery from '../RyanFlorence/App' 
import { getAllImgSrc } from '../api/gallery'


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
  
  return (
    <RyansGallery slides={images}/>
  );
}

export default Gallery