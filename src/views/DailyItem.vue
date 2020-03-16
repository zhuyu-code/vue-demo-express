<template>
  <div>
      <div class="header">
      <input v-model="inputValue"  placeholder="请输入日记标题"/>
      </div>
    <div id="wangeditor">
    <div class="editorElem" ref="editorElem" style="text-align:left;"></div>
  </div>
   <div class="commit">
     <el-button @click="handleClick" type="primary" plain>完成</el-button>
   </div>
  </div>
</template>
<script>
import store from '../store'
import E from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      inputValue:"",
      editor: null,
      editorContent: ''
    };
  },
  methods:{
    handleClick(){
      alert("内容")
    }
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ['catchData'], // 接收父组件的方法
   created(){
   
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    this.editor.create(); // 创建富文本实例
    this.editor.txt.html('<p>初始内容</p>')
    this.$axios.get(`/api/article/findOne/${this.$route.params.userId}`).then(res=>{
      this.inputValue=res.data[0].article_title;
      this.editorContent=res.data[0].article_content;
      this.editor.txt.html(this.editorContent);
    })
  }
  }
</script>
<style  scoped>
input{
  width: calc(100% - 60px);
  padding: 10px;
  margin: 0 20px
}
.header{
  margin: 20px 10px 
}
.editorElem{
  margin:0 20px
}
.title{
  margin: 20px;
  font-size: 24px;
}
.commit{
  text-align: right;
  margin:40px 40px 0 0;
}
</style>