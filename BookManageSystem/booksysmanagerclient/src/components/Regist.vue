
<template>
  <div class='root'>
    
    <div class="box">
      <div>注册</div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入用户密码" type="password" v-model="password"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="phone"></mt-field>
   
      <SubmitButton
     class = "submit-btn"
     :success='success'
     :param='params'
     :isUrl=true
     :url='url'>
      <div slot='btntext'>登录</div>
    </SubmitButton> 
    </div>
  </div>

</template>


<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import { Field } from 'mint-ui';
import SubmitButton from "../module/SubmitButton";
Vue.component(Field.name, Field);

export default {
  name: 'app',
  beforeCreated(){

  },

  mounted(){

  },
  computed:{
     params:function(){
      let params ={};
      params.nickname = this.username;
      params.password  = this.password;
      params.phone = this.phone;
      return params;
    }
  },
  data(){
    return{
      url:"/users/regist",
      username:"",
        password:"",
        phone:""
    }

  },
  methods:{

  success(data){
    console.log(data);

   },
   fail(){

   },
   validate(){

   },

  },
  components:{
SubmitButton
  }
}
</script>

<style type="text/css" scoped>
.root{
  background-color: #fff;
  border-radius: 20px;
  width: 300px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

</style>