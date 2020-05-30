<template>
<article id="page-success" class="page" :class="dark ? 'dark' : null">
  <!-- <div class="show">{{show}} {{currentUrl}}</div> -->

  <div class="upper iframe" v-if="show">
    <iframe :src="currentUrl" :width="setWidth(375)" :height="setHeight(812)" :style="{zoom: iframeZoom(375), pointerEvents: allowScroll ? 'inherit' : 'none' }"></iframe>
    <iframe :src="currentUrl" :width="setWidth(1024)" :height="setHeight(768)" :style="{zoom: iframeZoom(1024), pointerEvents: allowScroll ? 'inherit' : 'none' }"></iframe>
  </div>
  <div class="lower iframe" v-if="show" ref="iframeTwo">
    <iframe :src="currentUrl" :width="setWidth(1800)" :height="setHeight(780)" :style="{zoom: iframeZoom(1800), pointerEvents: allowScroll ? 'inherit' : 'none' }"></iframe>
  </div>
</article>
</template>

<script>
// import pdf from 'pdfvuer';
import copy from 'copy-to-clipboard';

var qr = require('qr-image')

var parse = require('url-parse')
var http = require('http');

export default {
  props: {
    currentUrl: {
      type: String
    },
    show: {
      type: Boolean
    },
    allowScroll: {
      type: Boolean
    },
  },
  data() {
    return {
      production: false,
      sidebar: ['person_pin', 'school', 'lock', 'book'],
      url: window.location.href,
      sidebarShow: true,
      // mobile: window.innerWidth > 600 ? false : true,
      dark: true,
      // currentUrl: "https://www.twitter.com",
      // show: false,
    }
  },
  watch: {

  },
  methods: {
    iframeZoom(width){
      console.log( this.windowWidth, width, this.windowWidth/width);
      let newVal = this.windowWidth/width - 0.05
      if( this.windowWidth < width) return newVal;
    },
    setWidth(num) {
      if (this.currentUrl) {
        setTimeout(() => {

        }, 500)
        return `${num}`
      } else return "0"
    },
    setHeight(num) {
      if (this.currentUrl) {
        setTimeout(() => {}, 500)
        return `${num}`
      } else return "0"

    },
    // displayFrame() {
    //   if (this.currentUrl) {
    //     setTimeout(() => {
    //       return true
    //     }, 3000)
    //   } else return false
    // },
    getLink(request) {
      return this.production ? request : "http://192.168.0.22:3000" + request;

    },
    copyUrl() {
      console.log("copying")
      copy(this.url)
    },
    mobile() {
      console.log(this.windowWidth);
      return this.windowWidth > 600 ? false : true;
    },
    logScrollPos() {
      console.log(document.getElementsByClassName("main-body").scrollTop)
    }
  },
  created() {
    if (this.windowWidth < 601) {
      this.sidebarShow = false;
    }
  },
  mounted() {
    this.show = false;
  },
}
</script>
