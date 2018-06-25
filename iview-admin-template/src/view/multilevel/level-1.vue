<template>
  <div>
     <Table border :columns="columns1" :data="data1"></Table>
  </div>
 
</template>
<script>
import {Table} from "iview";
import { getAllUserInfo } from "@/api/user"
export default {
  name: 'level_1',
    components: {
    Table
    },

  computed(){
    
  },

  mounted(){
      let that = this;
      getAllUserInfo().then((data)=>{
        console.log(data);
        that.data1 = data.datas.list;
      })
         
  
  },
  data () {
    return {
        columns1: [
   
              {
                title: '昵称',
                key: 'nickName',
                 render: (h, params) => {

                   console.log(h);
                        return h('div', [
                            h('Avatar', {
                                props: {
                                    src:params.row.avatarUrl 
                                }
                            }),

                            h('strong',  {
                                style: {
　　　　　　　　　　                marginLeft: '20px',
　　　　　　　　                  },
                            },params.row.nickName)
                        ]);
                    }


            
            },
            {
                title: '用户ID',
                key: 'userId'
                 
            },
          
            {
                title: '性别',
                key: 'gender'
            },
             {
                title: '生日',
                key: 'birthDate'
            },
             {
                title: '注册时间',
                key: 'dateTime'
            },
             {
                title: '年龄',
                key: 'age'
            },
             {
                title: '城市',
                key: 'city'
            },
             {
                title: '省份',
                key: 'province'
            },
             {
                title: '国家',
                key: 'country'
            },
              {
                title: '用户标识',
                key: 'userFlag'
            },
          
        ],
        data1: [
          
        ]
    }
  }
    
}
</script>
