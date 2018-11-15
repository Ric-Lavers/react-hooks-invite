import React, { useState, useEffect } from 'react'

import RyansGallery from '../RyanFlorence/App' 
import { getAllImgSrc } from '../api/gallery'


const Gallery = () => {
  const [ images, setImages ] = useState([])

  useEffect(async () => {
    try {
      let imgs  = await getAllImgSrc()
      let srcs = []
      imgs = imgs
        .filter( img  => {
          let duplicate = srcs.some(j => j === img.src)
          if (duplicate) return false;
          srcs.push(img.src)
          return true
        })
        .map( i =>  ({src: i.src, title: ""}) ) .reverse()
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