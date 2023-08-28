<template>
    <div style="width: 100%;">
        <!-- 原型设计列表 -->
        <el-table :data="tableData" style="width: 1500px;">
            <!-- <el-table-column prop="date" label="日期" width="180">
            </el-table-column> -->
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="address" label="原型简介">
            </el-table-column>
            <el-table-column>
                <el-button-group style="float: right;">
                    <el-button type="primary" icon="el-icon-edit-outline" @click="toDesignPage()"></el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true"></el-button>
                    <!-- <el-button type="primary" icon="el-icon-view" @click=""></el-button> -->
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

        <!-- 编辑功能 -->
        <el-dialog title="编辑原型设计" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :label-position='left' label-width="80px" :model="form">
                <!-- <el-form-item label="日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="名称">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="原型简介">
                    <el-input type="text" placeholder="请输入内容" v-model="form.text" maxlength="30" show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false; canceledit()">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false; editsucess()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新建原型 -->
        <el-row style="margin-bottom: 75px;margin-right: 35px; float: right; position: fixed; bottom: 0px; right: 0px;">
            <el-button @click="createdialog = true" circle>
                <i class="el-icon-plus"></i>
            </el-button>
        </el-row>
        <el-dialog title="新建原型设计" :visible.sync="createdialog" width="30%" :before-close="handleClose">
            <el-form :label-position='left' label-width="80px" :model="msg" :rules="rules" style="margin-bottom: 20px;">
                <!-- <el-form-item label="日期" prop="date">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="msg.date"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="名称" prop="name">
                    <el-input v-model="msg.name" clearable placeholder="请输入名称"></el-input>
                </el-form-item>

                <!-- <el-form-item label="样式" required>
                    <el-col :span="11">
                        <el-form-item prop="width" style="float: left;">
                            <el-input type="text" placeholder="W" v-model="msg.width" style="width: 100px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item prop="height" style="float: left;">
                            <el-input type="text" placeholder="H" v-model="msg.height"
                                style="width: 100px; padding-right: 10px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item> -->

                <el-form-item label="原型简介">
                        <el-input type="text" placeholder="请输入内容" v-model="form.text" maxlength="30" show-word-limit>
                        </el-input>
                    </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createdialog = false">取消</el-button>
                <el-button type="primary" @click="createdialog = false; createsucess()">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
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
                height: '',
                width: '',
                text: ''
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                height: [
                    { required: true, message: '请输入高度', trigger: 'blur' }
                ],
                width: [
                    { required: true, message: '请选择宽度', trigger: 'blur' }
                ],
            }

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
        canceledit() {
            this.$message({
                type: 'warning',
                message: '取消编辑'
            });
        },
        editsucess() {
            this.$message({
                type: 'success',
                message: '编辑成功'
            });
        },
        createsucess() {
            console.log("change to design")
            this.$router.push({ name: 'design' }, () => { this.$router.push('/project/designlist/design') })
        },
        toDesignPage() {
            console.log("change to design")
            this.$router.push({ name: 'design' }, () => { this.$router.push('/project/designlist/design') })
        }
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