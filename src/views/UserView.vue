<template>
    <div>
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="selectData.role" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="角色·">
                <el-select v-model="value" placeholder="Activity zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list[selectData.page]" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="body" label="详情" />
        </el-table>

    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { InitDta, ListInt } from '../type/user'
import { getRoleList, getUserList } from '../http/api'

let { selectData, list, roleList } = toRefs(reactive(new InitDta()))
// 获取数据
onMounted(() => {
    getUserList().then((res) => {
        list = res.data.data
        sliceList(res.data.data)

    })
    getRoleList().then((res) => {
        roleList = res.data.data
        sliceList(res.data.data)
    })

})

const sliceList = (arr: ListInt[]) => {
    list.value = []
    for (let index = 0; index < arr.length; index += 10) {
        let list1: any = arr.slice(index, index + 10)
        list.value.push(list1)
    }

}
const onSubmit = () => {
    let arr: ListInt[] = []
    if (selectData.value.title || selectData.value.body) {
        if (selectData.value.title) {
            arr = dataList.value.filter(v => v.title.indexOf(selectData.value.title) != -1)
        }
        if (selectData.value.body) {
            arr = (selectData.value.title ? arr : dataList.value).filter(v => v.body.indexOf(selectData.value.body) != -1)

        }
    } else {
        arr = dataList.value
    }
    selectData.value.count = arr.length
    sliceList(arr)
}

</script>

<style scoped lang="less">
</style>