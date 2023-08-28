<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="700px" class="demo-ruleForm">
        <!--         <el-form-item label="团队头像" prop="img">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" align="left">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item> -->
        <el-form-item label="团队ID" prop="team_id">
            <el-input v-model="ruleForm.team_id"></el-input>
        </el-form-item>
        <el-form-item label="团队名称" prop="team_name">
            <el-input v-model="ruleForm.team_name"></el-input>
        </el-form-item>
        <!--         <el-form-item label="创建日期" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                        style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="团队性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type" align="left">
                <el-checkbox label="聊天" name="type"></el-checkbox>
                <el-checkbox label="前端研发" name="type"></el-checkbox>
                <el-checkbox label="后端研发" name="type"></el-checkbox>
                <el-checkbox label="其它" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="团队介绍" prop="team_description">
            <el-input type="textarea" v-model="ruleForm.team_description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm,'ruleForm')">立即创建团队</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>


<style scoped>

.demo-ruleForm {
  padding-top: 150px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<script>
import { createteam } from "../api/api"
export default {
    data() {
        return {
            ruleForm: {

                //imageUrl: '',
                team_id: '',
                team_name: '',
                /*                 date1: '',
                                type: [], */
                team_description: ''
            },
            rules: {
                img: [
                    { required: true, message: '请选择图片', trigger: 'blur' }
                ],
                id: [
                    { required: true, message: '请输入ID', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入团队名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个团队性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写团队介绍', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(form, formName) {
            console.log(form)
            console.log(2)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(formName),
                        createteam(form).then(res => {
                            if (res.status === 200) {
                                console.log(res)
                            }
                        })
                    alert('submit!');
                    this.$router.push('/teamlist')
                    //this.createteam
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>F