<template>
    <div>
        <el-container>
            <el-container>
                <el-aside width="201px">
                    <teamaside />
                </el-aside>
                <el-main>
                    <div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="团队头像" prop="img">
                                <div class="demo-image" align="left">
                                    <div class="block" v-for="fit in fits" :key="fit">
                                        <span class="demonstration">{{ fit }}</span>
                                        <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="团队名称" prop="name">
                                <el-input v-model="ruleForm.name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="创建日期" proc="day">
                                <el-input vv-model="ruleForm.date1" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="团队性质" prop="type">
                                <el-checkbox-group v-model="ruleForm.type" align="left" :disabled="true">
                                    <el-checkbox label="聊天" name="type"></el-checkbox>
                                    <el-checkbox label="前端研发" name="type"></el-checkbox>
                                    <el-checkbox label="后端研发" name="type"></el-checkbox>
                                    <el-checkbox label="其它" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="团队介绍" prop="desc">
                                <el-input type="textarea" v-model="ruleForm.desc" :disabled="true"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
import teamaside from '../components/teamaside.vue'
export default {
    data() {
        return {
            fits: [''],
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            ruleForm: {
                name: '',
                day: '',
                type: [],
                desc: ''
            },
            disabled: true,

        }

    },
    components: {
        teamaside
    },
}
</script>

<style>
.el-main{
    width: 1400px !important;
}
</style>