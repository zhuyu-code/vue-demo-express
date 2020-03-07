<template>
  <div id="app">
    <router-view/>
    <button @click="exportExcel">点击</button>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "app",
  created() {
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
      console.log("decode是什么意思");
      console.log(decode);
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    downloadTemplate (data, fileName = '导出文件.xlsx') {
     const blob = new Blob([data])
     if (window.navigator.msSaveOrOpenBlob) {
       navigator.msSaveBlob(blob, fileName)
     } else {
       const link = document.createElement('a')
       const evt = document.createEvent('HTMLEvents')
       evt.initEvent('click', false, false)
       link.href = URL.createObjectURL(blob)
       link.download = fileName
       link.style.display = 'none'
       document.body.appendChild(link)
       link.click()
       window.URL.revokeObjectURL(link.href)
     }
},
exportExcel () {
  	const qString = { 
  		// params...
  	}
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      customClass: 'batch_export_loading',
      background: 'rgba(0, 0, 0, 0.4)'
    })
     const url =
        "/api/excel/zhuyu";
     this.$axios({
        url,
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
        responseType: "blob"
      }).then(res => {
        if (res.data) {
          this.downloadTemplate(res.data, '我的客户.xlsx')
        }
      }).finally(() => {
        loading.close()
      })
  },
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
        "http://bpm-gateway.dev-saas.crland.com.cn/crland-rest/api/report/exportExcel";
      this.$axios({
        url,
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
        responseType: "blob"
      })
        .then(result => {
          if (result.type) {
            this.$message({
              showClose: true,
              message: "Page data is empty and cannot be exported",
              type: "error",
              duration: 2500
            });
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
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style>
*{
  margin:0;
  padding:0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
