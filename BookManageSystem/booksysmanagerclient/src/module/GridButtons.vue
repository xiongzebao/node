
<template>
  <div id='gridbuttons'>
     <div class="gridbuttons-box">

       <template v-for='(item,index) in list'>
        <div class="button-flex-item">
          <div class="button-flex-item-label" @click='clickItem(index)' :class='{selected:item.selected}'><span>{{item.label}}</span></div>
        </div>
        </template>

     </div>
  </div>

</template>


<script>
 import Vue from 'vue'
import { MessageBox } from 'mint-ui';

export default {
  name: 'app',
  props:['selectedItem'],

  mounted(){

  },
  computed:{
  
  
  },
  data(){
    return{
      list:[{label:"高一学生",selected:false},{label:"高二学生",selected:false},{label:"高三学生",selected:false},{label:"我是家长",selected:false},{label:"我是大学生",selected:false}],
      curItemIndex:''
    }
 
  },
  methods:{
    clickItem(index){
      this.selectItem(index); 
    },

    selectItem(index){
      if(index===this.curItemIndex){
        return;
      }
      this.list[index].selected= true;
      if(this.curItemIndex!==''){
          this.list[this.curItemIndex].selected= false;
      }
      this.curItemIndex = index;
      this.$emit('update:selectedItem', this.list[this.curItemIndex]);
    }
   
  },
  components:{

  }
}
</script>

<style type="text/css" scoped>

#gridbuttons{
/*  display: flex;
  //align-items: center;
//  justify-content:center;
  width: 100%;*/
}
.gridbuttons-box{
  width: 85%;
  display: flex;
  flex-direction:row;
  flex-wrap:wrap;
  align-content: center ;
   margin: 0 auto;
   height: 7rem;
}
.button-flex-item{
  width: 50%;
  max-height: 1.3rem;
  min-height: 1.3rem;
 box-sizing: border-box;
 padding: 0.3rem 0.2rem;
}
 .button-flex-item div{
 border: 1px solid black;
 border-radius: 0.1rem;
 height: 100%;
 text-align: center;
 display: flex;
 align-items: center;
 justify-content: center;
}

.selected{
  background-color: #31C2F6;
  border: none !important;
  color: #fff;

}



</style>