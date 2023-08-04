<template>
    <div>
        <h3>权限修改</h3>
        <el-divider></el-divider>
        <el-button @click="onSubmit" type="primary">
            确认修改
        </el-button>
        <el-tree ref="treeRef" :data="data.list" :check-strictly="true" show-checkbox node-key="roleId"
            :default-checkout-keys="data.authorityIds" :props="{
                children: 'roleList',
                label: 'name'
            }" />
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { QueryInt, InitData } from '../type/authority'
import { geTauthority } from '../http/api'

const route = useRoute()
const query: any = route.query

const data = reactive(new InitData(query.id, query.authority))
// console.log('data',data)

onMounted(() => {
    geTauthority().then(res => {
        data.list = res.data.data
    })
})

const onSubmit = () => {
    alert('http 提交')
    console.log(data.treeRef.getCheckedKeys())

}


</script>

<style scoped lang="less">
</style>