
<style lang="less">
#root{
  padding: 0px;
  margin: 0px;
}

 .item-root{
     :hover{
       background-color:#f6f6f6;
     }
     background-color: white;
 }

  .row-item{
    padding: 10px;
    align-items: center;
    display: flex;
    .content{
      display: flex;
      align-items: center;
      justify-content: space-between;


    }
    .picCover{
      width:200px;
      height:100px;
      margin-right: 130px;
    }

    .item-right{
    
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .item{
        margin-left: 30px;
        width: 100px;
      }
    }
  }
</style>

<template>
  <div id='root'>
   
    <!-- <router-view></router-view> -->
<div v-for="item in items" :key="item.id" class="item-root">
  <Row class="row-item" >
        <Col span="18">
          <div class="content">
              <div>
                  <div style="font-weight:bold;font-size:16px">{{item.title}}</div>
                  <div style="margin-top:10px; font-size:14px">{{item.subTitle}}</div>
              </div>
              <img :src="item.picUrl" class="picCover"/>
          </div>
        
        </Col>
        <Col span="6" class="item-right">
            <div style="" class="item" v-if="item.isPublish==1">已发布</div>
             <div style="color:red" class="item" v-else>待发布</div>

            <Button type="primary" @click="onEdit('edit',item)" class="item" >编辑</Button> 
            <Button type="primary" @click="onEdit('delete',item)" class="item">删除</Button> 
            <Button type="primary" @click="onEdit('cancle_publish',item)" class="item" v-if="item.isPublish==1">取消发布</Button> 
            <Button type="primary" @click="onEdit('publish',item)" class="item" v-else>发布</Button> 
        </Col>
 
    </Row>
</div>
  </div>

</template>


<script>
 import Vue from 'vue'
 
import {getInfoList} from '@/api/info'
export default {
  name: 'app',
  beforeCreated(){
 
  },

  mounted(){
    
    let that = this;
    getInfoList().then((data)=>{
      console.log(data);
        that.items = data.datas.list;
    }).catch((e)=>{
      console.log(e);
    })
    

  },
  computed:{
  
  
  },
  data(){
    return{
      items:""
      
    }

  },
  methods:{
    onEdit(flag,item){
      console.log(flag)
      if(flag=="edit"){
        this.$router.push({path:`/form/article-look/article-edit/?id=${item.id}&isEdit=${true}`})
        return;
      }
      if(flag=="delete"){
        return
      }
      if(flag=="publish"){
        return
      }
      if(flag=="cancle_publish"){
        return 
      }
    }
   
  },
  components:{

  }
}
</script>

