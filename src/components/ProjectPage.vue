<template>
    <!-- 顶部导航 -->
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-header style="height: 60px; background-color: transparent;" >
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 18px; margin-left: 5px;">
                <el-breadcrumb-item :to="{ path: '/' }" style="font-size: 18px;">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/projectlist' }" style="font-size: 18px;">项目</el-breadcrumb-item>
                <el-breadcrumb-item  style="font-size: 18px;">{{ projectName }}</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <!-- 侧边栏导航 -->
        <el-container style="height: 100%;">
            <el-aside width="155px">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    :collapse="isCollapse" style="height: 55%;">
                    <el-menu-item index="1" @click="main">
                        <i class="el-icon-menu" ></i>
                        <span slot="title">概览</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="designlist">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">原型设计</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="document">
                        <i class="el-icon-document"></i>
                        <span slot="title">文档</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 路由占位符 -->
            <router-view></router-view>
        </el-container>

    </el-container>
</template>
<script>
import { getProjectData } from '@/api/api';
export default {
    data() {
        return {
            projectName: ''
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        main() {
            console.log("change to main")
            this.$router.push({ name: 'main' }, () => { this.$router.push('/project') })
        },
        designlist() {
            console.log("change to design")
            this.$router.push({ name: 'designlist' }, () => { this.$router.push('/project/designlist') })
        },
        setting() {
            console.log("change to setting")
            this.$router.push({ name: 'setting' }, () => { this.$router.push('/project/setting') })
        },
        document() {
            console.log("change to document")
            this.$router.push({ name: 'document' }, () => { this.$router.push('/project/documentlist') })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    margin-top: 10px;
    width: 120px;
    text-align: left;
    margin-bottom: 95%;
}

.el-header {
    color: transparent;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    text-align: center;
    line-height: 200px;
    color: #333;
    background-color: transparent;
}

.el-main {
    text-align: center;
    line-height: 50px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 20px;
}
</style>