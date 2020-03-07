<template>
    <div class="home">
        <div class="container">
            <template v-for="data in dailyData">
                <router-link :to='`dailymanage/${data.article_id}`' :key="data.article_id">
                <div class="daily-manage-item" >
                    <div>{{data.article_title}}</div>
                    <div>{{data.article_start}}</div>
                </div>
                </router-link>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name:"daily",
    data(){
        return {
            dailyData:[]
        }
    },
    components:{

    },
    created(){
        this.getDaily();
    },
    methods:{
        getDaily(){
            this.$axios.get('/api/article/find/55').then((res)=>{
                this.dailyData=res.data;
                console.log(this.dailyData)
            })
        }
    },

}
</script>
<style scoped>
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
.daily-manage-item{
    padding: 40px 20px;
    margin: 20px 20px;
    border: 1px solid rgb(238, 234, 234);
    border-radius: 10px;
    background-color: rgb(240, 241, 241)
}
a{
    text-decoration: none;
}
</style>