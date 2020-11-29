<template>
    <div class="login">
        <div class="login_box">
            <div class="login_logo">
                <img src="../assets/logo.png">
            </div>
            <el-form ref="loginForm" class="login_form" :model="loginForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
                    <el-button type="info" @click="resetLoginForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { post } from '../request'

export default {
    data(){
        return{
            loginForm:{
                username: '',
                password: '',

            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5,  message: '长度大于在 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        resetLoginForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitLoginForm(formName){
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    const { data:res } = await post('/login',this.loginForm);
                    if(res.meta.status !== 200 ) 
                        return this.$message.error('登录失败');
                    this.$message.success('登录成功');
                    window.sessionStorage.setItem('token', res.data.token);
                    this.$router.push('/home');
                } else {
                    return false;
                }
            });
        }
    }
}

</script>

<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
        background-color: rgb(127, 150, 255);
    }
    .login_box {
        width: 500px;
        height: 300px;
        background-color: rgb(255, 255, 255);
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate( -50%, -50% );

        .login_logo{
            height: 100px;
            width: 100px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate( -50%, -50% );
            background-color: #fff;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
</style>