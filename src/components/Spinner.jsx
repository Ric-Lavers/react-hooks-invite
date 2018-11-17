import React from 'react'; 
import '../loader.css'

const Spinner = ({ fill }) => (
  <div class="loader-container">
        <div class="aaa">
          {/* <div id="loader" class="loader spin__reverse"/> */}
        <svg class="wnh spin__" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><title>SPIN_ME</title>
          <g  id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g class="cls-1"><circle class="cls-2" cx="247.38" cy="400.57" r="10" transform="translate(-156.47 642.56) rotate(-89.23)"/></g><g class="cls-3"><circle class="cls-2" fill={fill} cx="214.87" cy="398.95" r="14.09" transform="translate(-186.93 608.45) rotate(-89.23)"/></g><g class="cls-4"><circle class="cls-2" cx="185.49" cy="393.88" r="18.18" transform="translate(-210.84 574.08) rotate(-89.23)"/></g><g class="cls-5"><circle class="cls-2" cx="159.26" cy="385.7" r="22.27" transform="translate(-228.54 539.78) rotate(-89.23)"/></g><g class="cls-6"><circle class="cls-2" cx="136.17" cy="374.76" r="26.36" transform="translate(-240.38 505.89) rotate(-89.23)"/></g><g class="cls-7"><circle class="cls-2" cx="116.2" cy="361.4" r="30.45" transform="translate(-246.72 472.74) rotate(-89.23)"/></g><g class="cls-8"><circle class="cls-2" cx="99.36" cy="345.97" r="34.55" transform="translate(-247.91 440.69) rotate(-89.23)"/></g><g class="cls-9"><circle class="cls-2" cx="85.64" cy="328.82" r="38.64" transform="translate(-244.3 410.05) rotate(-89.23)"/></g><g class="cls-10"><circle class="cls-2" cx="75.05" cy="310.3" r="42.73" transform="translate(-236.23 381.18) rotate(-89.23)"/></g><g class="cls-11"><circle class="cls-2" cx="67.56" cy="290.75" r="46.82" transform="translate(-224.07 354.4) rotate(-89.23)"/></g><g class="cls-12"><circle class="cls-2" cx="63.18" cy="270.51" r="50.91" transform="translate(-208.16 330.06) rotate(-89.23)"/></g><g class="cls-13"><circle class="cls-2" cx="61.9" cy="249.94" r="55" transform="translate(-188.85 308.49) rotate(-89.23)"/></g><g class="cls-14"><circle class="cls-2" cx="63.73" cy="229.38" r="59.09" transform="translate(-166.49 290.03) rotate(-89.23)"/></g><g class="cls-15"><circle class="cls-2" cx="68.64" cy="209.18" r="63.18" transform="translate(-141.44 275.02) rotate(-89.23)"/></g><g class="cls-16"><circle class="cls-2" cx="76.65" cy="189.68" r="67.27" transform="translate(-114.04 263.78) rotate(-89.23)"/></g><g class="cls-17"><circle class="cls-2" cx="87.75" cy="171.23" r="71.36" transform="translate(-84.65 256.67) rotate(-89.23)"/></g><g class="cls-18"><circle class="cls-2" cx="101.92" cy="154.18" r="75.45" transform="translate(-53.61 254.02) rotate(-89.23)"/></g><g class="cls-19"><circle class="cls-2" cx="119.17" cy="138.87" r="79.55" transform="translate(-21.28 256.17) rotate(-89.23)"/></g><g class="cls-20"><circle class="cls-2" cx="139.49" cy="125.65" r="83.64" transform="matrix(0.01, -1, 1, 0.01, 11.98, 263.44)"/></g><g class="cls-21"><circle class="cls-2" cx="162.88" cy="114.87" r="87.73" transform="translate(45.84 276.19) rotate(-89.23)"/></g><g class="cls-22"><circle class="cls-2" cx="189.33" cy="106.86" r="91.82" transform="translate(79.94 294.75) rotate(-89.23)"/></g><g class="cls-23"><circle class="cls-2" cx="218.84" cy="101.99" r="95.91" transform="translate(113.92 319.45) rotate(-89.23)"/></g><circle class="cls-2" cx="251.4" cy="100.6" r="100" transform="translate(147.45 350.63) rotate(-89.23)"/><rect class="cls-24" width="500" height="500"/></g></g></svg>
        </div>
      </div>
)

Spinner.defaultProps ={
  fill: '#50235d'
}

export default Spinner
