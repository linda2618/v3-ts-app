<template>
    <div>
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="selectData.nikeName" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="selectData.role" placeholder="请选择">
                    <el-option label="全部" :value="0" />
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="back">返回</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="nikeName" label="姓名" width="180" />
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-button v-for="i in scope.row.role" :key="i.role" link type="primary" size="small">
                        {{ i.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="editForm(scope.row)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog title="收货地址" v-model="isShow">
        <el-form :model="active">
            <el-form-item label="姓名" label-width="50px">
                <el-input v-model="active.nikeName" autocomplete="off" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="角色" label-width="50px">
                <el-select multiple v-model="active.role" placeholder="请选择角色">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isShow = false">取消</el-button>
                <el-button type="primary" @click="userChange">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { InitDta, ListInt } from '../type/user'
import { getRoleList, getUserList } from '../http/api'
import { ElMessage} from 'element-plus'
import router from '@/router'


let { selectData, list, roleList, listData, active, isShow } = toRefs(reactive(new InitDta()))
// 获取数据
onMounted(() => {
    getUserInfo()
    getRoleInfo()
})
const getUserInfo = () => {
    getUserList().then((res) => {
        list.value = res.data.data
        listData.value = res.data.data

    })
}

const getRoleInfo =() => {
    getRoleList().then((res) => {
        roleList.value = res.data.data
    })

}
    
const selectFun = () => {
    let arr: [ListInt][] = []
    console.log('点击率')
    if (selectData.value.nikeName || selectData.value.role) {
        if (selectData.value.nikeName) {
            arr = listData.value.filter((v: any) => v.nikeName.indexOf(selectData.value.nikeName) != -1)
        }
        if (selectData.value.role) {
            arr = (selectData.value.nikeName ? arr : list.value).filter((v: any) => v.role.find((i: any) => i.role === selectData.value.role))
        }
    }
    else { 
        ElMessage({
            type: 'error',
            message: `请输入查询内容`,})
    }
    list.value = arr
}

const onSubmit = () => {
    selectFun()
} 


const editForm = (row: ListInt) => {
    active.value = {
        id: row.id,
        userName: row.userName,
        nikeName: row.nikeName,
        role: row.role.map((v: any) => v.role || v.roleId)
    }
    isShow.value = true
}
const userChange = () => {
    const obj: any = list.value.find((v: any) => v.id === active.value.id)
    obj.nikeName = active.value.nikeName
    obj.role = roleList.value.filter((v: any) => active.value.role.indexOf(v.roleId) !== -1)
    isShow.value = false
}

const back = () => {
    getUserInfo()
}
</script>

<style scoped lang="less">
</style>