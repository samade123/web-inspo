<template>
<article id="page-success" class="page" :class="dark ? 'dark' : null">
  <div class="show">{{show}} {{currentUrl}}</div>

  <div class="upper iframe" v-if="show">
    <iframe   v-if="show":src="currentUrl" :width="setWidth(375)" :height="setHeight(812)"></iframe>
    <iframe v-if="show" :src="currentUrl" :width="setWidth(1024)" :height="setHeight(768)"></iframe>
  </div>
  <div class="lower iframe" v-if="show">
    <iframe v-if="show" :src="currentUrl" :width="setWidth(1800)" :height="setHeight(780)"></iframe>
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
    setWidth(num) {
      if (this.currentUrl) {
        setTimeout(() => {

        }, 500)
        return `${num}`
      } else return "0"
    },
    setHeight(num) {
      if (this.currentUrl) {
        setTimeout(() => {
        }, 500)
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
