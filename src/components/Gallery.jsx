import React, { useState, useEffect, useContext } from 'react'
import { ImagesContext } from '../context'

import RyansGallery from '../RyanFlorence/App' 
import { getAllImgSrc } from '../api/gallery'
import Spinner from './common/Spinner'


const Gallery = () => {
  const [ images, setImages ] = useState([])
  const [ isLoading, setLoading ] = useState(true)
  let imagesContext = useContext(ImagesContext)

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
      setLoading(false)
      imagesContext.addImages(imgs)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [])
  if ( isLoading ) {
    return (
      <div> 
        <p>free servers can be slow...</p>
        <Spinner />
      </div>
    )
  }
  return (
    <RyansGallery slides={ imagesContext.images}/>
  );
}

export default Gallery