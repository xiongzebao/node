
<template>
  <div id='root'>
    <template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,index) in swiperSlides"  :key='"swiperkey"+index'><img :style="{backgroundImage:'url('+slide+')'} " class="slide-img"></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
  </div>

</template>


<script>

require('swiper/dist/css/swiper.css')
// import
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

export default {
    name: 'carrousel',
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
        },
        // swiperSlides: ['../../../static/images/yxcard/yx.png','../../../static/images/yxcard/yx.png','../../../static/images/yxcard/yx.png']
      }
    },
    mounted() {
      // setInterval(() => {
      //   console.log('simulate async data')
      //   let swiperSlides = this.swiperSlides
      //   if (swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1)
      // }, 3000)
    }
  }
</script>

<style type="text/css">
  .slide-img{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }

</style>