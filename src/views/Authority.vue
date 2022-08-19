<template>
    <div>
        <el-button @click="onSubmit" link type="primary" size="small">
            确认修改
        </el-button>
        <el-tree ref="treeRef" :data="list" :check-strictly="true" show-checkbox node-key="roleId"
            :default-checkout-keys="authorityIds" :props="{
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

const { list, treeRef, authorityIds } = toRefs(reactive(new InitData(query.id, query.authority)))
// console.log(authorityIds);
// console.log(authorityIds.value);

onMounted(() => {
    geTauthority().then(res => {
        list.value = res.data.data
    })
})

const onSubmit = () => {
    alert('http 提交')
}


</script>

<style scoped lang="less">
</style>