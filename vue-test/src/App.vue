<template>
    <div id="nav">
     <button @click="exportList">点击</button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:"App",
  methods:{
        /** 导出的方法*/
    exportSearchList(dowLoadFileName, result) {
      const blob = new Blob([result]);
      const fileName = dowLoadFileName + ".xlsx";
      // 判断浏览器
      var brower = "";
      if (navigator.userAgent.indexOf("Edge") > -1) {
        brower = "Edge";
      }
      if ("download" in document.createElement("a")) {
        // 非IE下载
        if (brower === "Edge") {
          navigator.msSaveBlob(blob, fileName);
          return;
        }
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        // 释放URL 对象
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
    },
    // 导出表格
    exportList() {
      const url =
        "http://localhost:5000/api/excel/zhuyu";
      axios({
        url,
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        responseType: "blob"
      })
        .then(result => {
          if (result.type) {
            // this.$message({
            //   showClose: true,
            //   message: "Page data is empty and cannot be exported",
            //   type: "error",
            //   duration: 2500
            // });
            console.log("类型")
          } else {
            const content = result.data;
            const dowLoadFileName = "Level Data Management";
            this.exportSearchList(dowLoadFileName, content);
          }
        })
        .catch(error => {
          throw error;
        });
    },
  }
}
</script>
<style lang="less">
</style>
