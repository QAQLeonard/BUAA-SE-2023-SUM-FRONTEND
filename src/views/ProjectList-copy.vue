<template>
    <div>
        <el-container>
            <el-container>
                <el-aside width="201px">
                    <Teamaside />
                </el-aside>
                 <el-main>
                    <div>
                       <ProjectUnit class="unit ListUnit" v-for="(name, index) in projectData" :key="index" :name="name.project_name" :project-i-d="name.project_id" :Jump="Jump" 
            :test-func="testFunc">
        </ProjectUnit>
        <el-button class="unit ListUnit" @click="dialogVisible = true"> <span class="text" style="font-size: 60px;">+</span>
            <span class="text" style="font-size: 20px; font-weight: 100;">创建新项目</span></el-button>
        <el-dialog title="创建新项目" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :label-position='left' label-width="80px" :model="form" @submit="" :rules="formrules" ref="formRef">
                <el-form-item label="项目封面">
                    <!-- <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <input type="file" name="" id="" accept="image/*" ref="fileInput">
                </el-form-item>
                <el-form-item label="团队" prop="teamID">
                    <el-select v-model="form.teamID" placeholder="请选择团队">
                        <el-option :label="teamID" :value=teamID v-for="(teamID, index) in teams" :key="index"></el-option>
                    </el-select>
                    <!-- <el-input v-model="form.teamID"></el-input> -->
                </el-form-item>
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
                <el-button type="primary" @click="createProject()" class="ftbtn">确 定</el-button>
            </span>
        </el-dialog>

        <el-row style="margin-bottom: 20px;margin-right: 35px; float: right; position: fixed; bottom: 0px; right: 0px;">
            <el-button type="info" icon="el-icon-delete" circle @click="recyclebin"></el-button>
        </el-row>
                    </div>
                </el-main> 
            </el-container>
        </el-container>
    </div>
</template>


<script>
import teamaside from '../components/teamaside.vue';
import ProjectUnit from '@/components/ProjectUnit.vue';
import { nanoid } from 'nanoid';
import { createProject, getTeamproject } from '@/api/api'
import Teamaside from '../components/teamaside.vue';

export default {

    data() {
        return {
            names: [],
            projectData: [],
            dialogVisible: false,
            form: {
                projectname: '',
                projectID: '',
                projectDescription: '',
                teamID: ''
            },
            teams: ['团队1', '团队2', 'testTeamID'],
            "team_id": ''
        }
    },
    components: {
    teamaside
    },
    methods: {
        getProject() {
            console.log(this.team_id)
            if (this.teamID === '') {
                alert('请选择团队！')
            } else {
                localStorage.setItem('teamIDUsing',this.team_id)
                var project = new Object();
                getTeamproject(this.team_id, localStorage.getItem('token')).then(res => {
                    this.names = []
                    console.log(res)
                    this.projectData = res.data.projects
                    console.log(this.projectData)
                    // for (var i = 0; i < this.projectData.length; i++) {
                    //     var obj = this.projectData[i]
                    //     this.names.push(obj.project_name); // 将 name 属性添加到新数组中
                    // }
                    console.log(this.names)
                })
            }

        },
        startgetpro(){
            getTeamproject(localStorage.getItem('team_id'), localStorage.getItem('token')).then(res => {
                    this.names = []
                    console.log(res)
                    this.projectData = res.data.projects
                    console.log(this.projectData)
                    // for (var i = 0; i < this.projectData.length; i++) {
                    //     var obj = this.projectData[i]
                    //     this.names.push(obj.project_name); // 将 name 属性添加到新数组中
                    // }
                    console.log(this.names)
                })
        },
        goBack() {
            console.log('go back');
            this.$router.push('/workspace')
        },
        Jump() {

            this.$router.push('/project')
        },
        testFunc() {
            console.log('test')
        },
        recyclebin() {
            console.log("change to recyclebin")
            this.$router.push({ name: 'recyclebin' }, () => { this.$router.push('/projectlist/recyclebin') })
        },
        createProject() {
            console.log(this.teamID)
            const formData = new FormData()
            const fileInput = this.$refs.fileInput
            formData.append('project_image', fileInput.files[0])
            this.form.projectID = nanoid()
            console.log(this.form.projectID)
            formData.append('project_id', this.form.projectID)
            if (this.form.projectname === '') {
                alert('请输入项目名称！')
            } else {
                formData.append("project_name", this.form.projectname)
                if (this.form.teamID === '') {
                    alert('请选择团队!')
                } else {
                    formData.append('team_id', this.form.teamID)
                    console.log(this.form.teamID, formData.get('team_id'))
                    console.log(formData.get('project_image'))
                    console.log(formData.get('project_name'))
                    formData.append('project_description', this.form.projectDescription)
                    console.log(formData.get('project_description'))
                    createProject(formData, localStorage.getItem('token')).then(res => {
                        console.log(res)
                    })

                }
            }
            // console.log(formData)
            this.$refs.formRef.resetFields()
            this.$refs.fileInput = null
            this.dialogVisible = false
        }
    },
    created() {
        // this.names=[]
        this.startgetpro()
    },
    components: { ProjectUnit, Teamaside }
}
</script>
<style lang="scss" scoped>
.el-page-header {
    height: 60px;
    line-height: 60px;
    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
}

.topbar {
    width: 100%;
    height: 60px;
    background-color: aqua;
}

.ListUnit {
    margin-top: 20px;
    margin-left: 40px;
    border-radius: 10px;
}

.text {
    display: block;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 20px;
}

span {
    font-size: 20px;
}
</style>