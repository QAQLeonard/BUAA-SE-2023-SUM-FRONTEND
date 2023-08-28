<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>登录</span>
            </div>
            <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
                <el-form-item label="用户名" prop="username"
                    :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 14, message: '长度在3-14位字符之间', trigger: 'blur' }]">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password"
                    :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 12, message: '长度在6-12位字符之间', trigger: 'blur' }]">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-button type="primary" @click="CallLogin('form')">登录</el-button>
                <el-button type="primary" @click="toRegist">注册</el-button>
            </el-form>
        </el-card>

    </div>
</template>
<script>
import { setToken } from '../utils/setToken.js'
import { login } from '@/api/api'
export default {
    data() {
        return {
            labelPosition: 'left',
            form: {
                username: '',
                password: '',
            }
        }
    }, methods: {
        CallLogin(form) {
            this.$refs[form].validate((valid => {
                if (valid) {
                    console.log(this.form)
                    login(this.form).then(res => {
                        console.log(res)
                        if (res.data.status === 'success') {
                            setToken('username',this.form.username)
                            setToken('token', res.data.token)
                            this.$router.push('/main')
                        } else {
                            
                        }
                    }, err => {
                        console.log(err)
                        switch (err.response.status) {
                            case 401:
                                alert("密码错误")
                                break;
                            case 404:
                                alert("用户名不存在")
                                break;
                            case 400:
                                alert("请求错误")
                                break;
                        }
                    })
                } else {

                }
            }))
        },
        toRegist() {
            this.$router.push('/regist')
        }
    }
}
</script>
<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: aqua;

    .box-card {
        width: 450px;
        margin: 200px auto;

        .el-button {
            margin-left: 100px;
        }
    }
}
</style>