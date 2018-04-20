
<template>
  <div id='header'>
     <router-link to="/login" class="nav-item">
        <img src="../../static/imgs/ic_img.png" class="nav-img" /> 
         <div>用户</div>
     </router-link>
    
      <router-link to="/login" class="nav-item">
        <img src="../../static/imgs/ic_img.png" class="nav-img" /> 
         <div>退出</div>
     </router-link>

     <div class="nav-item">{{login}}</div>
  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'app',
  beforeCreated(){
  },

  mounted(){
  },
  computed:{
     ...mapGetters([
      'login'
    ])
  },
  data(){
    return{
      
    }

  },
  methods:{
   
  },
  components:{

  }
}
</script>

<style type="text/css" scoped>
    #header{
      width: 100%;
      height: 50px;
      background: #fff;
    }
    .nav-item{
      height: 100%;
      width: 50px;
      display: block;
      padding: 10px;
      box-sizing: border-box;
      float:right;
    }
    .nav-img{
      height: 60%
    }



</style>