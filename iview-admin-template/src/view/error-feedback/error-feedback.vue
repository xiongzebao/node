<template>
  <div>
      <div>帮助与反馈</div>
     <Table border :columns="columns1" :data="data1"></Table>
  </div>
 
</template>
<script>
import {Table} from "iview";
import { getAllUserInfo ,getErrorInfo} from "@/api/user"
export default {
  name: 'level_1',
    components: {
    Table
    },

  computed(){
    
  },

  mounted(){
      let that = this;
      getErrorInfo().then((data)=>{
        console.log(data);
        that.data1 = data.datas.list;
      })
         
  
  },
  data () {
    return {
        columns1: [
         
            {
                title: 'ID',
                key: 'id',
                width:60
                 
            },
          
            {
                title: '创建时间',
                key: 'createTime',
                 size:"small",
                     width:130
            },
             {
                title: '错误码',
                key: 'errorCode',
                width:80
            },
             {
                title: '错误信息',
                key: 'errorInfo',
                render: (h, params) => {
                        return h('pre', [
                            h('pre',  {
                                style: {
　　　　　　　　　　                marginLeft: '20px',
                                    color:"#f00"
　　　　　　　　                  },
                            },params.row.errorInfo)
                        ]);
                    }

            }
        ],
        data1: [
          
        ]
    }
  }
    
}
</script>
