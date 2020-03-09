<template>
    <div class="notFound">
         <img src="../assets/404.png" width="100%" height="100%"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({})
export default class NotFound extends Vue {
    beforeRouteEnter(to:any,from:any,next:any) {
        next( (vm:any) => {
            setTimeout(()=>{
                vm.$router.push('/');
            },3000)
        })
    }
}
</script>
<style scoped>
.notFound{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>