scope<template>
    <div class="select-box">
        <el-button type="primary" @click="addRole">添加角色</el-button>
    </div>
    <el-table border :data="list" stripe style="width: 100%">
        <el-table-column prop="roleId" label="ID" width="180" />
        <el-table-column prop="roleName" label="姓名" width="180" />
        <el-table-column prop="role" label="操作">
            <template #default="scope">
                <el-button @click="authorityChange(scope.row)" link type="primary" size="small">
                    修改权限
                </el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { InitDta, ListInt } from '../type/role'
import { getRoleList } from '../http/api'

import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
let { selectData, list, isAdd } = toRefs(reactive(new InitDta()))
// 获取数据
onMounted(() => {
    getRoleList().then((res) => {
        list.value = res.data.data
        // listData.value = res.data.data

    })
})


const authorityChange = (row: ListInt) => {
    router.push({
        path: 'authority',
        query: {
            id: row.roleId,
            authority: row.authority.join(',')
        }
    })

}
const addRole = () => {
    isAdd.value = true
    ElMessageBox.prompt('请输入角色名', '添加', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    })
        .then(({ value }) => {
            if (value) {
                list.value.unshift({
                    roleName: value,
                    roleId: list.value.length + 1,
                    authority: []
                })
            }
            ElMessage({
                type: 'success',
                message: `新增成功！`,
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })
        })
}



</script>

<style scoped lang="less">
.select-box {
    margin-bottom: 20px;
}
</style>