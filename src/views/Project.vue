<template>
    <div style="margin-bottom: 70px;">
        <!-- 项目信息 -->
        <div class="image" style="float: left; ">
            <div class="block">
                <span class="demonstration"></span>
                <el-image style="width: 200px; height: 200px; margin-top: 10px;" :src="url" :fit="fit"></el-image>
            </div>
        </div>

        <el-descriptions style="float: left;" class="margin-top" title="基本设置" :column="1" :size="size">
            <el-descriptions-item label="项目名称">{{ projectName }}</el-descriptions-item>
            <!-- <el-descriptions-item label="开始日期">{{ date }}</el-descriptions-item> -->
            <el-descriptions-item label="项目描述">
                <!-- <div style="margin: 40px 0;">{{ text }}</div> -->
                {{ projectDescription }}
            </el-descriptions-item>
        </el-descriptions>

        <!-- <div class="text item" style="float: left;" v-for="(name, index) in names" :key="index" :name="name">
            <el-avatar icon="el-icon-user-solid" style="margin-right: 10px;"></el-avatar>
            <span style="margin-right: 20px;">{{ name }}</span>
        </div> -->

        <!-- 编辑和删除按钮 -->
        <el-row style="margin-right: 55px; float: right; position: fixed; bottom: 30px; right: 0px;">
            <el-button @click="dialogVisible = true" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" @click="open" icon="el-icon-delete" circle></el-button>
        </el-row>

        <!-- 编辑表单 -->
        <el-dialog title="编辑项目" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <!-- <el-form :label-position='left' label-width="80px" :model="form">
                <el-form-item label="项目封面">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <input type="file" name="" id="" accept="image/*" ref="fileInput">
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="开始时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>

                <el-form-item label="项目描述">
                    <el-input type="text" placeholder="请输入内容" v-model="form.type" maxlength="30" show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form> -->
            <el-form :label-position='left' label-width="80px" :model="form" @submit="" :rules="formrules" ref="formRef">
                <el-form-item label="项目封面">
                    <!-- <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <input type="file" name="" id="" accept="image/*" ref="fileInput">
                </el-form-item>
                <!-- <el-form-item label="团队" prop="teamID">
                    <el-select v-model="form.teamID" placeholder="请选择团队">
                        <el-option :label="teamID" :value=teamID v-for="(teamID, index) in teams" :key="index"></el-option>
                    </el-select>
                    <el-input v-model="form.teamID"></el-input>
                </el-form-item> -->
                <el-form-item label="项目名称" prop="projectname">
                    <el-input v-model="form.projectname"></el-input>
                </el-form-item>
                <!-- <el-form-item label="项目ID">
                    <el-input v-model="form.projectID"></el-input>
                </el-form-item> -->
                <el-form-item label="项目描述" prop="projectDescription">
                    <el-input type="textarea" placeholder="请输入内容" v-model="form.projectDescription" maxlength="30"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" class="ftbtn">取 消</el-button>
                <el-button type="primary" @click="updateProject()" class="ftbtn">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { getProjectData, modifyProject } from '@/api/api';
export default {
    data() {
        return {
            text: '',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            dialogVisible: false,
            form: {
                projectname: '',
                projectDescription: ''
            },
            projectName: '',

            projectDescription: '',
            // names: ['John', 'Tom', 'Peter', 'Bob']
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        open() {
            this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.$router.push('/projectlist')
            }).catch(() => { });
        },
        getData() {
            getProjectData(localStorage.getItem('projectID'), localStorage.getItem('token')).then(res => {
                console.log(res)
                this.projectName = res.data.project.project_name
                this.projectDescription = res.data.project.project_description
            })
        },
        updateProject() {
            const formData = new FormData()
            const fileInput = this.$refs.fileInput
            formData.append('project_image', fileInput.files[0])
            formData.append('project_id', localStorage.getItem('projectID'))
            formData.append('team_id', localStorage.getItem('teamIDUsing'))
            if (this.form.projectname === '') {
                alert('请输入项目名称！')
            } else {
                formData.append("project_name", this.form.projectname)
                formData.append('project_description', this.form.projectDescription)
                console.log(formData.get('project_image'))
                console.log(formData.get('project_name'))
                console.log(formData.get('project_id'))
                console.log(formData.get('team_id'))
                console.log(localStorage.getItem('teamIDUsing'))
                modifyProject(formData, localStorage.getItem('token')).then(res => {
                    console.log(res)
                    this.getData()
                })
            }
            this.$refs.formRef.resetFields()

            this.dialogVisible = false
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
.text {
    font-size: 14px;
    text-align: left;
}

.item {
    padding: 5px 0;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}

.avatar {
    width: 150px;
    height: 150px;
    display: block;
}
</style>