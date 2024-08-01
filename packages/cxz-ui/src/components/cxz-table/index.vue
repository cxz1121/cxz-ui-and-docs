<template>
  <div class="cxz-table">
    <el-table :data="tableData" v-bind="$attrs" v-if="tableData.length > 0">
      <el-table-column v-for="(item, index) in columns"
        :key="index"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.miniWitdh"
      >
        <template #default="scope" v-if="item.slot">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from "element-plus"
defineOptions({ name: 'cxz-table' })

interface Props {
  tableData: Array<Record<string, any>>
  columns: Array<Record<string, any>>
}
const props = withDefaults(defineProps<Props>(), {
  tableData: () => ([]),
  columns: () => ([])
})
console.log(props);

</script>