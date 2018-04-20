
<template>
  <div id='yxcard'>
 <!--    <mt-header  title="艺享卡">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
   </mt-header> -->

     <img class="top-img" /> 

     <div class="notice" id="notice">请输入16位激活码</div>
     <div class="pwd-box">  
        <input  v-model='pwd' maxlength="16" class="pwd-input" id="yxcard-pwd-input" @click='inputclick' onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
        <div class="fake-box">
            <div class="pwdshow" id="pwd1">{{pwds[0]}}</div>
            <div class="pwdshow" id="pwd2">{{pwds[1]}}</div>
            <div class="pwdshow" id="pwd3">{{pwds[2]}}</div>
            <div class="pwdshow" id="pwd4">{{pwds[3]}}</div>
      <!--       <input class="pwdshow" type="text" name=""  id="pwd1"  v-model='pwd1' maxlength="4">
            <input class="pwdshow" type="text" name="" id="pwd2" v-model='pwd2' maxlength="4">
            <input class="pwdshow" type="text" name="" id="pwd3" v-model='pwd3' maxlength="4">
            <input class="pwdshow" type="text" name="" id="pwd4" v-model='pwd4' maxlength="4"> -->
        </div> 
     </div>  

    <SubmitButton url='user,/api/m/auth/artcard/active_artcard.htm' :success='success' :fail='fail' :validate='validate':param='param'><div slot='btntext'> 激活</div></SubmitButton>
   
  </div>



</template>


<script>
// import Vue from 'vue'
import { MessageBox } from 'mint-ui';
//import { Button } from 'mint-ui';
import { Toast } from 'mint-ui';
import SubmitButton from '@/components/components/SubmitButton.vue'

//Vue.component(Button.name, Button);

export default {
  name: 'app',
  beforeCreated(){
 
  },

  mounted(){

  

    $(document).ready(function(){
 
      let screenHeight = $(window).height();
      $('#yxcard').css('height',screenHeight+184);

      let notice = document.getElementById('notice');

    //   $("input").each(function(){  
      
    //        $(this).focus(function(){  
    //            notice.scrollIntoView(true);
        
    //        })
    //        .blur(function(){
    //             console.log("失去焦点");
    //        })      
    // });
    // let inputdom = document.getElementById('pwd-input');
    // this.scrollIntoView(true);//顶部对齐

        if(window.yksapp_user){
          if(yksapp_user.getStdIDNum()){
                 $('#submitbtn').removeClass('is-disabled');
                $('#submitbtn').removeAttr('disabled');
          }else{
             MessageBox({
                title: '提示',
                message: '您尚未绑定身份证，暂不能激活',
                showCancelButton: true
            }).then(action=>{
                if(action=='confirm'){
                    window.yksapp.goPageWithParams('bindIDNum',JSON.stringify({closePage:'1'}));
                  
                }else{
                      window.yksapp.closeWebPage();
                }
            });
          }
        } 
      
　　}); 
    

  },
  computed:{
    param:function(){
      return {transCode:this.pwd};
    }
  
  
  },
  data(){
    return{
      pwd:'',
      pwd1:'',
      pwd2:'',
      pwd3:'',
      pwd4:'',
      canClick:false,
      pwds:[],
      curInputIndex:0
    }

  },
  watch:{
    // pwd1:function(oldval,newval){
    //   console.log('ff');
    //   if(oldval.length==4){
    //       $('#pwd2').focus();
    //   }

    // },
    //  pwd2:function(oldval,newval){
    //   console.log('ff');
    //   if(oldval.length==4){
    //       $('#pwd3').focus();
    //   }else if(oldval.length==0){
    //     $('#pwd1').focus();
    //   }

    // },
    //  pwd3:function(oldval,newval){
    //   console.log('ff');
    //   if(oldval.length==4){
    //       $('#pwd4').focus();
    //   }else if(oldval.length==0){
    //     $('#pwd2').focus();
    //   }

    // },
    //  pwd4:function(oldval,newval){
    //   console.log('ff');
    //   if(oldval.length==0){
    //        $('#pwd3').focus();
    //   }

    // },


    pwd:function(oldval,newval){
      console.log(oldval);

      let length = oldval.length;
      console.log(length);
      
      for(var i=0;i<length/4;i++){
         $("#pwd"+i).css('border-color','#000');
        this.pwds[i]=oldval.substring(i*4,(i+1)*4);
      }
      console.log(i);
     $("#pwd"+this.curInputIndex).css('border-color','#000');
      $("#pwd"+i).css('border-color','#31C2F6');
       this.curInputIndex = i;
      this.pwds[i] = '';


    }
  },


  methods:{
    validate(){
  
       if(this.pwd.length<16){
        Toast('请输入16位数字或英文字符');
        return false;
       }
      let  reg="^[a-zA-Z0-9]{16,16}$";
      var regexe = new RegExp(reg);
       let  b =    regexe.test(this.pwd);
       if(!b){
         Toast('请输入数字或英文字符');
         return false;
       } 

       return true;

    },
    success(datas){
       this.$router.push({path:'/mycard'});
    },
    fail(data){
      Toast(data.message);
    },

    // submit(){
  
    //   if(this.pwd.length<16){
    //     Toast('请输入16位数字或英文字符');
    //     return;
    //    }
    //   let  reg="^[a-zA-Z0-9]{16,16}$";
    //   var regexe = new RegExp(reg);
    //    let  b =    regexe.test(this.pwd);
    //    if(!b){
    //      Toast('请输入数字或英文字符');
    //      return;
    //    } 

    //   let _this = this;

    //   let url = 'user,/api/m/auth/artcard/active_artcard.htm';
    //   let param = {transCode:this.pwd};
    //   window.ajaxMethod.doAjax(url,param,function(data){
    
    //      if(data.success){
    //         if(window.yksapp){
    //             window.yksapp.setKeyValueAndClean('yxcard','1',true);
    //         }
          
    //        _this.$router.push({path:'/mycard',query:{cardNO:_this.pwd}});

    //      }else{

    //          Toast(data.message);
    //      }
         
    //    });
    // },


    inputclick(){
      let notice = document.getElementById('notice');
     notice.scrollIntoView(true);
     if(!this.pwd){
       $("#pwd1").css('border-color','#31C2F6');
     }
    }
   
  },
  components:{
    SubmitButton

  }
}
</script>

<style type="text/css">

::-webkit-scrollbar{
  display:none;
}

html, body {
    width: 100%;
    height: 100%;
     overflow: auto; 
}
#yxcard{
  //height: 18rem;
 // margin-top:-2rem; 
 overflow-y: scroll;
}

#app{

}

#yxcard-pwd-input{
}

.input-select{
  border-color: #f00;
}

.top-img{
    height: 3.68rem;
    width: 100%;
    background-image: url('../../../static/images/yxcard/yx.png');
    background-size:  100% 3.68rem;
  }
  .notice{
    margin-top: 0.34rem;
    font-size: 0.32rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;

  }
  .pwd-box{  
        width:100%;  
        padding-left: 1px;  
        position: relative;  
        border-radius: 13px;  
        over-flow:hidden  
    }  
    #yxcard-pwd-input{  
        width: 99%;  
        height: 0.6rem;  
        color: transparent;  
        position: absolute;  
        top: 0;  
        left: 0;  
        border: none;  
        font-size: 18px;  
        opacity: 0;  
        z-index: 1;  
        letter-spacing: 35px;  
        text-indent: -999em; 
         margin-left: -100%; 
          width: 200%;  
    } 
    .fake-box .pwdshow{  
        width: 1.2rem;  
        height: 0.6rem;  
        border-bottom:1px solid ;
        font-size: 20px;
        border-left-width:0px;
        border-top-width:0px;
        border-right-width:0px;
      //  border-bottom-color:black;
        text-align: center;
        line-height: 0.8rem;
        border-radius: 0;
        padding-bottom: 0.15rem;


    }  
    .fake-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 80%;
      margin: 0 auto;
    //  margin-top: 0.2rem;

    }


    .fake-box input:nth-last-child(1){  
    
    }  

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
  margin-top: 2rem;
  height: 0.86rem;
}

</style>