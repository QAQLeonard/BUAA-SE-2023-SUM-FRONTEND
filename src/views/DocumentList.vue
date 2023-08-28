<template>
    <div style="width: 100%;">
        <!-- 文档列表 -->
        <el-table :data="tableData" style="width: 1500px;">
            <!-- <el-table-column prop="date" label="日期" width="180">
            </el-table-column> -->
            <el-table-column prop="name" label="文档名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="文档描述">
            </el-table-column>
            <el-table-column>
                <el-button-group style="float: right;">
                    <el-button type="primary" icon="el-icon-edit-outline" @click="goDocument"></el-button>
                    <el-button type="primary" icon="el-icon-share" @click=""></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="dlt"></el-button>
                </el-button-group>
            </el-table-column>
        </el-table>

        <!-- 搜索功能 -->
        <el-row style="margin-bottom: 25px;margin-right: 35px; float: right; position: fixed; bottom: 0px; right: 0px;">
            <el-button @click="search" circle>
                <i class="el-icon-search"></i>
            </el-button>
        </el-row>

        <!-- 分享功能 -->

        <!-- 新建文档 -->
        <el-row style="margin-bottom: 75px;margin-right: 35px; float: right; position: fixed; bottom: 0px; right: 0px;">
            <el-button @click="createdialog = true" circle>
                <i class="el-icon-plus"></i>
            </el-button>
        </el-row>
        <el-dialog title="新建文档" :visible.sync="createdialog" width="30%" :before-close="handleClose">
            <el-form :label-position='left' label-width="80px" :model="msg" :rules="rules" style="margin-bottom: 20px;">
                <!-- <el-form-item label="日期" prop="date">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="msg.date"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="文档名">
                    <el-input v-model="msg.name" clearable placeholder="请输入文档名"></el-input>
                </el-form-item>

                <el-form-item label="文档描述">
                    <el-input type="text" placeholder="请输入内容" v-model="form.type" maxlength="30" show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createdialog = false">取消</el-button>
                <el-button type="primary" @click="creDocument">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import { getProjectDocument } from '@/api/api';
import {nanoid} from 'nanoid';
import {createDocument} from '@/api/api';

export default {
    data() {
        return {
            dialogVisible: false,
            createdialog: false,
            form: {
                name: '',
                date: '',
                text: ''
            },
            msg: {
                name: '',
                date: '',
                text: '',
                doc_id: '',
                project_id: ''
            },
            tableData: [{
                date: '2016-05-02',
                name: '软件工程开发文档',
                address: '用于小组开发使用'
            }, {
                date: '2016-05-04',
                name: '软件工程开发文档',
                address: '软件工程开发文档'
            },],

        }
    },
    methods: {
        search() {
            this.$prompt('请输入搜索内容', '搜索', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ }) => {
                this.$message({
                    type: 'success',
                    message: '搜索成功'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消搜索'
                });
            });
        },
        dlt() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '取消删除'
                });
            });
        },
        creDocument() {
            this.msg.doc_id = nanoid()
            this.msg.project_id = localStorage.getItem('project_id')
            console.log(this.msg)
            createDocument(this.msg).then(res => {
                        console.log(res)
                        if (res.data.status === 'success') {


                        } else {
                            
                        }
                    }
            )

            console.log("change to document")
            this.$router.push({ name: 'document' }, () => { this.$router.push(`/edit/${this.msg.doc_id}`) })
            // this.$router.push({ name: 'document' }, () => { this.$router.push(`/edit/example-document`) })
        },
        goDocument() {
            this.msg.doc_id = 'RyzKWD3ndFP4By8kxxK5U'
            this.msg.project_id = localStorage.getItem('project_id')
            console.log(this.msg)
            createDocument(this.msg).then(res => {
                        console.log(res)
                        if (res.data.status === 'success') {


                        } else {
                            
                        }
            },err=>{
                
            }
            )

            console.log("change to document")
            this.$router.push({ name: 'document' }, () => { this.$router.push(`/edit/${this.msg.doc_id}`) })
            // this.$router.push({ name: 'document' }, () => { this.$router.push(`/edit/example-document`) })
        },
    },
    created(){
        getProjectDocument(localStorage.getItem('project_id')).then(res=>{

        },err=>{

        })
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