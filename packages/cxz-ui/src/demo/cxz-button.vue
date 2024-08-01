<template>
  <div>
    <cxz-button btnType="default" size="large">{{ text }}</cxz-button>
  </div>
</template>

<script setup lang="ts">
import CxzButton from "@cxz-ui/components/cxz-button"
import { ref } from "vue"
const text = ref('cxz')
</script>

<style lang="scss" scoped>

</style>