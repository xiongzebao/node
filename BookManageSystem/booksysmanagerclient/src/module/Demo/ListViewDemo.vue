
<template>

  <div id='myInfoList'>
    <mt-header fixed   title="我的资讯列表">
        <mt-button icon="back" slot='left' @click='goBack'></mt-button>
    </mt-header>

    <ListView v-if='param.author' :url=url :param=param :top='1' ref="mylistview">
          <template slot="itemli" scope="props">
            <div id='infoitem'>
              <div class="content">
                <div class="content-header">{{props.text.title}} </div>
                <div class="content-footer">
                  <div>{{props.text.author}}</div>
                  <div>{{props.text.createdOnStr}}</div>
                </div>
              </div>
              <div>
               <img  v-if='props.text.pictureURL' :src="props.text.pictureURL+'?x-oss-process=image/resize,w_200'">
              </div>
            </div>
          </template>
      </ListView>
  </div>

</template>


<script>
 import Vue from 'vue'
 import { MessageBox } from 'mint-ui';
 import ListView from './ListView';


export default {
  name: 'app',
  beforeCreated(){
 
  },

  mounted(){
    this.param.author =   this.$route.query.author;
    console.log(this.param.author);
    console.log(this);
    console.log(this.$refs.mylistview);
  //  console.log();

  },
  computed:{
    //  pictureURL:function(){
    //   return this.param.pictureURL+'?x-oss-process=image/resize,w_200';
    // }
  
  },
  data(){
    return{
      url:'hulaquan,/api/m/info/query.htm',
      param: {author:''},
      
    }

  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
   
  },
  components:{
    ListView,
  }
}
</script>

<style type="text/css">

.active-img-container{
  position: relative;
}

.img-active-label{
  position: absolute;
  top: 0.40rem;
  right: 0rem;
  height: 0.7rem;
  width: 1.64rem;
}

#activeItem{
  box-sizing: border-box;
  
}

.img-active{
  margin:0.2rem 0.16rem;
  margin-bottom: 0rem;
  height: 3rem;
  width: 7.24rem;
}
.active-desc{
  font-size:0.36rem;
  height: 0.84rem;
  line-height: 0.84rem;
  text-indent: 0.35rem;
}

.active-divider{
  height: 0.24rem;
  width: 100%;
  background-color: #f9f9f9;
}


/*下面是item的css样式*/
#infoitem{
  display: flex;
  height: 2.4rem;
  padding: 0.34rem;
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
}
.content-footer{
  display: flex;
  position: absolute;
  bottom: 0px;
  color: #969696;
  font-size: 0.24rem;
 -webkit-box-pack:justify;
 -webkit-justify-content:space-between;
 -ms-flex-pack:justify;
 justify-content:space-between;
 width: 100%;

}
.content-header{
  font-size: 0.32rem;
  height: 70%;
  line-height:28px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.content{
  position: relative;
  width: 100%;
  margin-right: 0.3rem;

}
  #infoitem img{
  width:  2.18rem;
  height: 1.72rem;

}
#infoitem pre{
  white-space: pre-wrap;

}
    

</style>