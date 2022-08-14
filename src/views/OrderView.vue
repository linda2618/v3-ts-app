<template>
    <div>
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="selectData.title" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item label="详情">
                <el-input v-model="selectData.body" placeholder="请输入关键字" />

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
        <el-pagination @current-change="currentChange" background layout="prev, pager, next"
            :total="selectData.count" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, nextTick } from 'vue'
import { InitDta, ListInt } from '../type/order'
import { getList } from '../http/api'
// import { nextTick } from 'process';

let { selectData, list, dataList } = toRefs(reactive(new InitDta()))
// 获取数据
onMounted(() => {
    getList({ page: selectData.value.page }).then(res => {
        // console.log(res.data);
        // console.log(res.data.data);
        selectData.value.count = res.data.data.length
        dataList.value = res.data.data
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
const currentChange = (page: number) => {
    selectData.value.page = page - 1
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