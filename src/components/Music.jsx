import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'

import { ImagesContext } from '../context'


const Music = () => {
  let  player = useRef(null)
  const setPlayetRef = ref => {
    player = ref
  }
  const clickGreating = () => {
    // let playButton = document.getElementsByClassName('playButton')[0]
    // playButton && playButton.click()
    // const iframe = document.getElementById('ReactPlayer').children[0];
    // var elmnt = iframe.contentWindow.document.getElementsByTagName("H1")[0];
    // setTimeout(() => {
    //   let greating = document.getElementsByClassName('soundsList__item g-border-bottom')[3]
    //   console.log(greating)
    //   greating && greating.click()
    // }, 500);
   
  }
  
  return (
    <>
    <ReactPlayer
      id="ReactPlayer"
      ref={setPlayetRef}
      // playing
      width='100%'
      url='https://soundcloud.com/aeonknight'
      onReady={() => clickGreating()}
      // options={{
      //   auto_play: true,
      // }}
    />
    </>
  )
}

export default Music