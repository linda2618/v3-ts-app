<template>
    <div>
        <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
            :props="defaultProps" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { QueryInt, InitData } from '../type/authority'
import { getAuthority } from '../http/api'

const route = useRoute()
const query: any = route.query

const data = toRefs(reactive(new InitData(query.id, query.authority)))


</script>

<style scoped lang="less">
</style>