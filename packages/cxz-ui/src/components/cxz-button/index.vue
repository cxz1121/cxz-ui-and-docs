<template>
  <div class="cxz-button">
    <el-button :type="btnType" :size="size" v-bind="$attrs">
      <slot></slot>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus"
import type { EpPropMergeType } from "element-plus/es/utils"
import './style'
interface Props {
  size: 'small' | 'default' | 'large'
  btnType: EpPropMergeType<StringConstructor, "" | "default" | "success" | "warning" | "info" | "text" | "primary" | "danger", unknown>;
}
defineOptions({ name: 'cxz-button' })
const props = withDefaults(defineProps<Props>(), {
  btnType: 'primary',
  size: 'default'
})
</script>
