<template>
    <div class="login-box">
        <el-form ref="ruleFormRef" :model="data.loginForm" status-icon :rules="rules" label-width="65px"
            class="ruleForm">
            <h2>后台管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="data.loginForm.username" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="data.loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { initData } from '../type/login'
import { login } from '../http/api'
import { useRouter } from 'vue-router'

const data = (reactive(new initData()))
const router = useRouter()
const { rules } = toRefs(reactive({

    rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在5~8之间', trigger: 'blur' },

        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在5~8之间', trigger: 'blur' },
        ]
    }
})
)
//获取表单元素
const ruleFormRef = ref()
//点击登录
const submitForm = () => {
    ruleFormRef.value.validate((valid: boolean) => {
        if (valid) {
            // alert('验证通过，发送请求！')
            login(data.loginForm).then(res => {
                // console.log(res);
                window.sessionStorage.setItem('token', res.data.token)
                router.push('/')
            })

        }

    })
}
//点击重置
const resetForm = () => {
    ruleFormRef.value.resetFields()
}
</script>

<style scoped lang="less">
.login-box {
    width: 100%;
    height: 100%;
    background: url('../assets/girl.jpg') no-repeat;
    background-size: 100% 100%;

    .ruleForm {
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 20px;
        padding-top: 20px;

        h2 {
            text-align: center;
            margin-bottom: 10px;
        }
    }
}
</style>
