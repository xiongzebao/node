
<template>
  <div id='root'>
    <SubmitButton url='user,/api/m/auth/artcard/active_artcard.htm' 
     :success='success' 
     :fail='fail' 
     :validate='validate'
     :param='param' 
     :enable='enable'>
     <div slot='btntext'>激活</div>
     </SubmitButton>
  </div>
</template>

<script>

 import Vue from 'vue'
 import { MessageBox } from 'mint-ui';

export default {
  name: 'app',
 
  mounted(){

  },
  computed:{
  
  
  },
  data(){
    return{
      
    }

  },
  methods:{
    validate(){
       return true;
    },
    success(datas){
    },
    fail(data){
     // Toast(data.message);
    },
  },
  components:{

  }
}
</script>

<style type="text/css">

</style>