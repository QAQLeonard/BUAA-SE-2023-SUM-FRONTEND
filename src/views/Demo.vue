<template>
    <!-- 测试用，测试ProjectUnit子组件 -->
    <!-- <div>
        <ProjectUnit v-for="(name,index) in names" :key="index" :name="name"></ProjectUnit>
        <iframe width="1000px" height="1000px" src="https://devops.aliyun.com/workbench?_userId=64e5bdd03f15d5487d9b552e" frameborder="0"></iframe>
    </div> -->
    <div>
        <div id="map"> </div>
    </div>
</template>
<script>
import ProjectUnit from '@/components/ProjectUnit.vue';

export default {
    data() {
        return {
            names: ['Johngagadsgasdgasdgasdgdsg', 'Tom', 'Peter'],
            map: ''
        };
    },
    components: { ProjectUnit },
    mounted() {
        this.initDate();
    },
    methods: {
        initDate() {
            this.map = L.map("map", {
                center: [40.02404009136253, 116.50641060224784], // 地图中心
                zoom: 14, //缩放比列
                zoomControl: false, //禁用 + - 按钮
                doubleClickZoom: false, // 禁用双击放大
                attributionControl: false // 移除右下角leaflet标识
            });
            let name = L.tileLayer(
                "",
            ).addTo(this.map);
            //   this.map.removeLayer(name)  // 移除图层
        }
    }
}
</script>
<style scoped>
#map {
    width: 100%;
    height: calc(100vh);
    z-index: 1;
}
</style>