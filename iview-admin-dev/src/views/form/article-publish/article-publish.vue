<style lang="less">
    @import '../../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
    <div>
        <Row>
            <Col span="18">
                <Card>
                    <Form :label-width="80">
                        <FormItem label="文章标题" :error="articleError">
                            <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list"/>
                        </FormItem>
                         <FormItem label="文章幅标题" :error="articleError">
                            <Input v-model="articleSubTitle" @on-blur="handleArticleSubtitleBlur" icon="android-list"/>
                        </FormItem>
                        <FormItem label="文章封面" :error="articleError">
                            <Input v-model="picUrl"   icon="android-list"/>
                        </FormItem>
                        <div class="article-link-con">
                            <transition name="fixed-link">
                                <FormItem v-show="showLink" label="固定链接">
                                    <span>
                                        <span key="pathfixedtext">{{ fixedLink }}</span><span key="pathText" v-if="!editLink">{{ articlePath }}</span>
                                        <Input key="pathInput" v-model="articlePath" style="display:inline-block;width:auto"  v-else/>
                                    </span>
                                    <span style="float:right;">
                                        <Button :type="editPathButtonType" @click="editArticlePath">{{ editPathButtonText }}</Button>
                                    </span>
                                </FormItem>
                            </transition>
                        </div>
                          <div class="article-link-con">
                            <transition name="fixed-link">
                                 <div v-if="autoSaveTime!=''">已自动保存到本地{{autoSaveTime}}</div>
                            </transition>
                        </div>
                    </Form>
                    <div class="margin-top-20">
                        <textarea id="articleEditor"></textarea>
                    </div>
                </Card>
            </Col>
            <Col     span="6" class="padding-left-10" >
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        发布
                    </p>
                    <p class="margin-top-10">
                        <Icon type="android-time"></Icon>&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：
                        <Select size="small" style="width:90px" value="草稿">
                            <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="eye"></Icon>&nbsp;&nbsp;公开度：&nbsp;<b>{{ Openness }}</b>
                        <Button v-show="!editOpenness" size="small" @click="handleEditOpenness" type="text">修改</Button>
                        <transition name="openness-con">
                            <div v-show="editOpenness" class="openness-radio-con">
                                <RadioGroup v-model="currentOpenness" vertical>
                                    <Radio label="公开">
                                        公开
                                        <Checkbox v-show="currentOpenness === '公开'" v-model="topArticle">在首页置顶这篇文章</Checkbox>
                                    </Radio>
                                    <Radio label="密码">
                                        密码
                                        <Input v-show="currentOpenness === '密码'" style="width:120px" size="small" placeholder="请输入密码"/>
                                    </Radio>
                                    <Radio label="私密"></Radio>
                                </RadioGroup>
                                <div>
                                    <Button type="primary" @click="handleSaveOpenness">确认</Button>
                                    <Button type="ghost" @click="cancelEditOpenness">取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="ios-calendar-outline"></Icon>&nbsp;&nbsp;
                        <span v-if="publishTimeType === 'immediately'">立即发布</span><span v-else>定时：{{ publishTime }}</span>
                        <Button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改</Button>
                        <transition name="publish-time">
                            <div v-show="editPublishTime" class="publish-time-picker-con">
                                <div class="margin-top-10">
                                    <DatePicker @on-change="setPublishTime" type="datetime" style="width:200px;" placeholder="选择日期和时间" ></DatePicker>                                    
                                </div>
                                <div class="margin-top-10">
                                    <Button type="primary" @click="handleSavePublishTime">确认</Button>
                                    <Button type="ghost" @click="cancelEditPublishTime">取消</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <Row class="margin-top-20 publish-button-con">
                        <span class="publish-button"><Button @click="handlePreview">预览</Button></span>
                        <span class="publish-button"><Button @click="handleSaveDraft">保存草稿</Button></span>
                        <span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
                    </Row>
                </Card>
                <div class="margin-top-10" v-if="true">
                    <Card>
                        <p slot="title">
                            <Icon type="navicon-round"></Icon>
                            分类目录
                        </p>
                        <Tabs type="card">
                            <TabPane label="所有分类目录">
                                <div class="classification-con">
                                    <Tree :data="classificationList" @on-check-change="setClassificationInAll" show-checkbox></Tree>
                                </div>
                            </TabPane>
                            <TabPane label="常用目录">
                                <div class="classification-con">
                                    <CheckboxGroup v-model="offenUsedClassSelected" @on-change="setClassificationInOffen">
                                        <p v-for="item in offenUsedClass" :key="item.title">
                                            <Checkbox :label="item.title">{{ item.title }}</Checkbox>
                                        </p>
                                    </CheckboxGroup>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
                <div class="margin-top-10" v-if="true">
                    <Card>
                        <p slot="title">
                            <Icon type="ios-pricetags-outline"></Icon>
                            标签
                        </p>
                        <Row>
                            <Col span="18">
                                <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择文章标签">
                                    <Option v-for="item in articleTagList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                                </Select>
                            </Col>
                            <Col span="6" class="padding-left-10">
                                <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="ghost">新建</Button>
                            </Col>
                        </Row>
                        <transition name="add-new-tag">
                            <div v-show="addingNewTag" class="add-new-tag-con">
                                <Col span="14">
                                    <Input v-model="newTagName" placeholder="请输入标签名" />                                
                                </Col>
                                <Col span="5" class="padding-left-10">
                                    <Button @click="createNewTag" long type="primary">确定</Button>
                                </Col>
                                <Col span="5" class="padding-left-10">
                                    <Button @click="cancelCreateNewTag" long type="ghost">取消</Button>
                                </Col>
                            </div>
                        </transition>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import tinymce from 'tinymce';
import {addInfo,getInfoDetail} from '@/api/info'
import {getAllUserInfo} from '@/api/user' 

export default {
    name: 'artical-publish',
    data () {
        return {
            showRight:false,
            articleError: '',
            showLink: false,
            fixedLink: '',
            articlePath: '',
            articlePathHasEdited: false,
            editLink: false,
            editPathButtonType: 'ghost',
            editPathButtonText: '编辑',
            articleStateList: [{value: '草稿'}, {value: '等待复审'}],
            editOpenness: false,
            Openness: '公开',
            currentOpenness: '公开',
            topArticle: false,
            publishTime: '',
            publishTimeType: 'immediately',
            editPublishTime: false, // 是否正在编辑发布时间
            articleTagSelected: [], // 文章选中的标签
            articleTagList: [], // 所有标签列表
            classificationList: [],
            classificationSelected: [], // 在所有分类目录中选中的目录数组
            offenUsedClass: [],
            offenUsedClassSelected: [], // 常用目录选中的目录
            classificationFinalSelected: [], // 最后实际选择的目录
            publishLoading: false,
            addingNewTag: false, // 添加新标签
            newTagName: '' ,// 新建标签名
            articleSubTitle:'',
            articleTitle: '',
            saveTimer:"",
            autoSaveTime:"",
            picUrl:""
        };
    },
    methods: {
        handleArticletitleBlur () {
            if (this.articleTitle.length !== 0) {
                // this.articleError = '';
                localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
                if (!this.articlePathHasEdited) {
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
                    this.articlePath = this.articleTitle;
                    this.articlePathHasEdited = true;
                    this.showLink = true;
                }
            } else {
                // this.articleError = '文章标题不可为空哦';
                this.$Message.error('文章标题不可为空哦');
            }
        },
        handleArticleSubtitleBlur(){
            console.log("onblurer")

        },

        editArticlePath () {
            this.editLink = !this.editLink;
            this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost';
            this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑';
        },
        handleEditOpenness () {
            this.editOpenness = !this.editOpenness;
        },
        handleSaveOpenness () {
            this.Openness = this.currentOpenness;
            this.editOpenness = false;
        },
        cancelEditOpenness () {
            this.currentOpenness = this.Openness;
            this.editOpenness = false;
        },
        handleEditPublishTime () {
            this.editPublishTime = !this.editPublishTime;
        },
        handleSavePublishTime () {
            this.publishTimeType = 'timing';
            this.editPublishTime = false;
        },
        cancelEditPublishTime () {
            this.publishTimeType = 'immediately';
            this.editPublishTime = false;
        },
        setPublishTime (datetime) {
            this.publishTime = datetime;
        },
        setClassificationInAll (selectedArray) {
            this.classificationFinalSelected = selectedArray.map(item => {
                return item.title;
            });
            localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected); // 本地存储所选目录列表
        },
        setClassificationInOffen (selectedArray) {
            this.classificationFinalSelected = selectedArray;
        },
        handleAddNewTag () {
            this.addingNewTag = !this.addingNewTag;
        },
        createNewTag () {
            if (this.newTagName.length !== 0) {
                this.articleTagList.push({value: this.newTagName});
                this.addingNewTag = false;
                setTimeout(() => {
                    this.newTagName = '';
                }, 200);
            } else {
                this.$Message.error('请输入标签名');
            }
        },
        cancelCreateNewTag () {
            this.newTagName = '';
            this.addingNewTag = false;
        },
        canPublish () {
            if (this.articleTitle.length === 0) {
                this.$Message.error('请输入文章标题');
                return false;
            } else {
                return true;
            }
        },


        handlePreview () {
            if (this.canPublish()) {
                if (this.publishTimeType === 'immediately') {
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hour = date.getHours();
                    let minute = date.getMinutes();
                    let second = date.getSeconds();
                    localStorage.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second;
                } else {
                    localStorage.publishTime = this.publishTime; // 本地存储发布时间
                }
                localStorage.articleContent = tinymce.activeEditor.getContent();
                this.$router.push({
                    name: 'preview'
                });
            }
        },
        handleSaveDraft () {
            this.saveArticleToLocale(true);
           /*  if (!this.canPublish()) {
                localStorage.articleTitle = this.articleTitle
                localStorage.articleSubTitle = this.articleSubTitle
            } */
        },
        handlePublish () {
            if (this.canPublish()) {
                this.publishLoading = true;
                 let content = tinymce.activeEditor.getContent();
                 let params={
                     title:this.articleTitle,
                     subTitle:this.articleSubTitle,
                     content:content,
                     picUrl:this.picUrl
                 }
                 addInfo(params).then(data=>{
                    this.publishLoading = false;
                    this.$Notice.success({
                        title: '发布成功',
                        desc: '文章《' + this.articleTitle + '》发布成功',
                        duration: 5
                    });
                 }).catch(e=>{
                      this.$Notice.success({
                        title: '发布失败',
                        desc: '文章《' + this.articleTitle + '》发布失败',
                        duration: 5
                    });
                     console.log(e);
                 })
            }
        },
        handleSelectTag () {
            localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
        },
   saveArticleToLocale(isShowToast){
            localStorage.articleTitle = this.articleTitle
            localStorage.articleSubTitle = this.articleSubTitle
            localStorage.picUrl = this.picUrl
            localStorage.articleContent = tinymce.activeEditor.getContent();
            console.log(isShowToast)
            if(isShowToast===true){
                this.$Notice.success({
                        title: '保存成功',
                        duration: 5
                    });
            }
              
        },
    resumePage(){
         this.articleTitle = localStorage.articleTitle;
        this.articleSubTitle = localStorage.articleSubTitle;
        this.picUrl = localStorage.picUrl
        this.articleContent = localStorage.articleContent
    },

    clearPage(){
            localStorage.articleTitle = ""
            localStorage.articleSubTitle =  ""
            localStorage.picUrl = ""
            localStorage.articleContent = ""

    },
  initEditData(id){
        let that = this;
        getInfoDetail({id:id}).then((data)=>{
            console.log(data);
            that.articleContent = data.datas.obj.content;
            that.articleTitle = data.datas.obj.title
              that.articleSubTitle = data.datas.obj.subTitle
                that.picUrl = data.datas.obj.picUrl 

        }).catch((e)=>{
            console.log(e)
        })
    },
       
     
    },


    computed: {
        completeUrl () {
            let finalUrl = this.fixedLink + this.articlePath;
            localStorage.finalUrl = finalUrl; // 本地存储完整文章路径
            return finalUrl;
        }
    },
    mounted () {
        this.articleTagList = [
            {value: 'vue'},
            {value: 'iview'},
            {value: 'ES6'},
            {value: 'webpack'},
            {value: 'babel'},
            {value: 'eslint'}
        ];
        this.classificationList = [
            {
                title: 'Vue实例',
                expand: true,
                children: [
                    {
                        title: '数据与方法',
                        expand: true
                    },
                    {
                        title: '生命周期',
                        expand: true
                    }
                ]
            },
            {
                title: 'Class与Style绑定',
                expand: true,
                children: [
                    {
                        title: '绑定HTML class',
                        expand: true,
                        children: [
                            {
                                title: '对象语法',
                                expand: true
                            },
                            {
                                title: '数组语法',
                                expand: true
                            },
                            {
                                title: '用在组件上',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: '生命周期',
                        expand: true
                    }
                ]
            },
            {
                title: '模板语法',
                expand: true,
                children: [
                    {
                        title: '插值',
                        expand: true
                    },
                    {
                        title: '指令',
                        expand: true
                    },
                    {
                        title: '缩写',
                        expand: true
                    }
                ]
            }
        ];
        this.offenUsedClass = [
            {
                title: 'vue实例'
            },
            {
                title: '生命周期'
            },
            {
                title: '模板语法'
            },
            {
                title: '插值'
            },
            {
                title: '缩写'
            }
        ];
        tinymce.init({
            selector: '#articleEditor',
            branding: false,
            elementpath: false,
            height: 600,
            language: 'zh_CN.GB2312',
            menubar: 'edit insert view format table tools',
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                'searchreplace visualblocks visualchars code fullscreen fullpage',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons paste textcolor colorpicker textpattern imagetools codesample'
            ],
            toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
            autosave_interval: '20s',
            image_advtab: true,
            table_default_styles: {
                width: '100%',
                borderCollapse: 'collapse'
            },
               setup: function (editor) {
                      console.log("editor setup")
                        editor.on('init', function (e) {
                            console.log("editor....init");
                           // vm.spinShow = false;
                            if (localStorage.articleContent) {
                               tinymce.get('articleEditor').setContent(localStorage.articleContent)
                            }
                        });
                        editor.on('keydown', function (e) {
                            
                        });
                    }
        });
       console.log(this.$route.query)
        if(this.$route.query&&this.$route.query.id){
             let id= this.$route.query.id;

             console.log("id"+id)
            this.initEditData(id);
        }else{
            this.resumePage();
        }
       
        this.saveTimer = setInterval(()=>{
            this.saveArticleToLocale(false)
            this.autoSaveTime = new Date().toString();

        },1000*60)    
    },

  

    destroyed () {
        console.log("onDestroyed")
        tinymce.get('articleEditor').destroy();
        if(this.saveTimer){
              clearInterval(this.saveTimer);
        }
    },

//     beforeRouteEnter (to, from, next) {
//             next();
//     // 在渲染该组件的对应路由被 confirm 前调用
//     // 不！能！获取组件实例 `this`
//     // 因为当守卫执行前，组件实例还没被创建
//   },
//   beforeRouteUpdate (to, from, next) {
//         next();
//     // 在当前路由改变，但是该组件被复用时调用
//     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
//     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
//     // 可以访问组件实例 `this`
//   },
//   beforeRouteLeave (to, from, next) {
//      if(this.saveTimer){
//         clearInterval(this.saveTimer);
//         }
//      next();
//   }


};
</script>
