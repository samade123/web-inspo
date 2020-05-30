import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueWindowSize from 'vue-window-size';
require('../scss/app.scss');

window.Vue = require('vue');
Vue.config.devtools = true

Vue.use(VueWindowSize);
Vue.use(Vuesax, {
  // options here
})

//pull in all vue components
require('./components');
var parse = require('url-parse');

window.addEventListener('load', function() {
  if (sessionStorage.getItem('scrollPosition') !== null)
    document.getElementsByClassName("main-body")[0].scrollTo({
      top: sessionStorage.getItem('scrollPosition'),
      left: 0,
      behavior: 'smooth',
    });
}, false);

window.Images = require("./testing/images")


//instantiate page vue
var app = new Vue({
  el: 'main',
  data: {
    // currentURL: "https://www.bing.com/",
    currentURL: null,
    liveURL: null,
    show: false,
    images: [],
    settings: false,
    allowScroll: false,
  },
  watch: {
    currentURL() {
      console.log("!£=")

      if (this.currentURL.length > 0) {
        setTimeout(() => {
          this.show = true
          console.log("delaylm;lm;lm;l")
        }, 300)
      } else this.show = false
    }
  },
  methods: {
    // var newDiv = document.createElement("img");

    screenshot() {

      // navigator.mediaDevices.getUserMedia({
      console.log(this.$refs)
      this.$refs.header.style.display="none"
      // this.$refs.iframeTwo.s5tyle.display="none"
      navigator.mediaDevices.getDisplayMedia({
          video: true
        })
        .then(mediaStream => {
          this.track = mediaStream.getVideoTracks()[0];

          this.imageCapture = new ImageCapture(this.track);
          // this.imageCapture.takePhoto().then(this.processPhoto).catch(console.log("error")); //takes photo
          // this.grabFrameFunc();
          this.imageCapture.grabFrame()
            .then(imageBitmap => {
              this.images.push(imageBitmap)

              setTimeout(() => {

                const canvas = this.$refs.canvas;
                console.log(canvas)

                this.drawCanvas(canvas, imageBitmap);
              }, 1000)
            })
            .catch(error => console.log(error));
        });
    },
    grabFrameFunc() {
      this.imageCapture.grabFrame().then((bitmap) => {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
        // context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
        return canvas.toDataURL();
      }).then((src) => {
        this.images.push(src)
        console.log(src)
      }).catch(console.error)
      console.log(new ImageCapture(track))
        .catch(error => console.log(error));
    },
    drawCanvas(canvas, img) {
      canvas.width = getComputedStyle(canvas).width.split('px')[0];
      canvas.height = getComputedStyle(canvas).height.split('px')[0];
      let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
      let x = (canvas.width - img.width * ratio) / 2;
      let y = (canvas.height - img.height * ratio) / 2;
      canvas.getContext('2d').clearRect(0, 0, img.width, canvas.height);
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
        x, y, img.width * ratio, img.height * ratio);

    },
    processPhoto(blob) { //gets blob data from camera and turns it into a Base 64 buffer
      this.images.push(URL.createObjectURL(blob));
      console.log(blob)
      // this.blobToBase64(blob, (base64) => {
      //   var buf = new Buffer.from(base64, 'base64');
      // })
    },
    paste() {
      navigator.clipboard.readText()
        .then(text => {
          console.log('Pasted content: ', text);
          this.liveURL = text;
        })
        .catch(err => {
          console.error('Failed to read clipboard contents: ', err);
        });
    }
  },
  mounted() {}
});
