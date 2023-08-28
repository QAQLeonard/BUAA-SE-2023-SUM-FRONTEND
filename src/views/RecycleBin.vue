<template>
    <div>
        <el-page-header @back="goBack" content="回收站" title="返回">
        </el-page-header>

        <div class="text item" style="float: left;" v-for="(time, index) in times" :key="index" :time="time">
            <ProjectUnit class="unit ListUnit" :key="index" :name="name" :jump="Jump" :test-func="testFunc"
                style="margin-top: 10px;">
            </ProjectUnit>
            <div style="margin-bottom: 10px;"><span>{{ time }}</span></div>
        </div>

    </div>
</template>

<script>
import ProjectUnit from '@/components/ProjectUnit.vue';
export default {
    data() {
        return {
            names: ['John', 'Tom', 'Peter', 'Bob', 'Bghuihb'],
            times: ['yyyy-mm-dd', 'yy01-mm-dd', 'yy02-mm-dd', 'yy03-mm-dd', 'yy05-mm-dd']
        }
    },
    methods: {
        goBack() {
            console.log('go back');
            this.$router.push('/projectlist')
        },
    },
    components: { ProjectUnit }
}
</script>

<style lang="scss" scoped>
.el-page-header {
    height: 60px;
    line-height: 60px;
}
</style>