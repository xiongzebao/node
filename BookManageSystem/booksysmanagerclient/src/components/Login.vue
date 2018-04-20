<template>
  <div class="root">
    <div class="box">
     <h2>登录</h2>
     <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
     <mt-field label="电话号码" placeholder="请输入电话号码" type="number" v-model="captcha"></mt-field>
    <SubmitButton
     class = "submit-btn"
     :success='success'
     :param='params'
     :isUrl=true
     :url='url'>
      <div slot='btntext'>登录</div>
    </SubmitButton> 

   <!--  <input type="button" value="增加" @click="login(p)">
    <div >{{count}}</div>
 -->
  <router-link to="/forgetPwd">忘记密码</router-link>
   <router-link to="/regist">注册</router-link>
 </div>

</div>
</template>

<script>

import Vue from 'vue'
import { MessageBox } from 'mint-ui';
import { Field } from 'mint-ui';
import SubmitButton from "../module/SubmitButton";
import { mapActions,mapGetters } from 'vuex'
Vue.component(Field.name, Field);


export default {
  name: 'HelloWorld',
  data () {
    return {
      url:"/users/login",
      params:{user:'小'},
      msg: '',
      username:"",
      captcha:"",
       p:{
        login:"sfdsfsdf"
       }
    }
  },
   mounted(){
 
  },

  computed:{
    ...mapGetters([
      'count'
    ])
  },

 methods:  {

   ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')
      'decrement',
      'login'
    ]),

   login1(data){
 
      this.$store.commit('login',this.p);
   },

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

<style scoped>
h1, h2 {
  font-weight: normal;
}
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
  justify-content: flex-start;
  padding: 10px;
}

.submit-btn{
   margin-top:0.5rem;
}

.regist{
  text-align: right;
  margin-top:10px;
}

.test{
  width: 1.667rem;
  height: 1.667rem;
  background-color: #f00;
}
</style>
