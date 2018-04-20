
<template>
  <div class="btn-submit-container" id="btn-submit-container">  

    <template v-if='enable'>
      <mt-button type="default"   @click.native = 'submit' id='submitbtn'><slot name='btntext'></slot></mt-button>
    </template>
    <template v-else>
      <mt-button type="default" disabled  @click.native = 'submit' id='submitbtn'><slot name='btntext'></slot></mt-button>
    </template>

  </div>
</template>


<script>
import { Button } from 'mint-ui';
import { Indicator } from 'mint-ui';
import Vue from 'vue'

Vue.component(Button.name, Button);


export default {
  props:{
    url:{
      type: String,
      required: true
    },

    param:{
      type: Object,
      required: false
    },

    success:{
      type: Function,
      required: false
    },

    fail:{
      type: Function,
      required: false
    },

    validate:{
      type: Function,
      required: false
    },
    enable:{
      type:Boolean,
      required:false,
      default:true
    },
    isUrl:{
      type:Boolean,
      required:false,

    },


  },
  name: 'submitbtn',

  mounted(){
   

  },
  computed:{

  },
  data(){
    return{
      canClick:true,
      
    }

  },
  methods:{
    

    submit(){
  
    
      if(!this.canClick||!this.enable){
        return;
      }
      this.canClick = false;
      if(this.validate){
        if(!this.validate()){
          this.canClick = true;
          return;
        }
      }
      
      //如果是路由路径
      if(!this.isUrl){
        this.$router.push({path:this.url,query:{param:this.param}});
        return;
      }
       //加载数据只用改变以上两条
       let _this = this;
       Indicator.open({
        spinnerType: 'fading-circle'
      });
      
      Request.instance().success(this.success).complete( function(){
             _this.canClick = true;
              Indicator.close();
      })
      .request(this.url, this.param);

  }

},

components:{

}
}
</script>

<style type="text/css">

.btn-submit-container .mint-button:after {
  background-color: #f00;
  content: " ";
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}

.btn-submit-container .mint-button-text{
  color: #fff;
}
.btn-submit-container .mint-button--default{
 background-color: #31C2F6;
}
.btn-submit-container .mint-button{
  height: 0.7rem;
  width: 5.5rem;
  height: 0.86rem;
  font-size: 0.36rem;
  border-radius: 0px;


}

.btn-submit-container{
  text-align: center;
  height: 0.86rem;
}


</style>