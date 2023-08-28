<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse">
        <el-menu-item index="1">
            <i class="el-icon-more" @click="Totin"></i>
            <span slot="title">团队信息介绍</span>
        </el-menu-item>
        <el-menu-item index="2" @click="Tocontrol">
            <i class="el-icon-s-custom"></i>
            <span slot="title">成员管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="Tome">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息介绍</span>
        </el-menu-item>
        <el-menu-item index="4" @click="ToPcp">
            <i class="el-icon-s-management"></i>
            <span slot="title">团队项目</span>
        </el-menu-item>
    </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>

<script>
export default {
    data() {
        return {
            isCollapse: false,
            menuDate: [
                {
                    path: '/team-introduce',
                    label: '团队介绍'
                },
                {
                    path: '/control-team',
                    label: '团队管理'
                },
                {
                    path: '/me-introduce',
                    label: '团队介绍'
                }, {
                    path: '/projects',
                    label: '团队项目'
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        Tocontrol() {
            this.$router.push({ name: 'control' }, () => { this.$router.push('/control-team') })
        },
        Totin(){
            this.$router.push({ name: 'tin' }, () => { this.$router.push('/team-introduce') })
        },
        Tome(){
            this.$router.push({ name: 'me' }, () => { this.$router.push('/me-introduce') })
        },
        ToPcp(){
            this.$router.push({ name: 'Pcp' }, () => { this.$router.push('/ProjectList-copy') })
        },
    }
}
</script>