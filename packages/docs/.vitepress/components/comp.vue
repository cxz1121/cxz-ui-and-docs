<template>
  <div class="container">
    <div class="comp">
      <div class="menu">
        <i class="icon"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElIcon, ElTooltip, ElCollapseTransition, ElButton, ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import 'prismjs/themes/prism-tomorrow.css'

defineOptions({ name: 'comp' })
const props = defineProps({
  libType: {
    type: String,
    default: 'cxz-ui'
  },
  iframeSrc: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '375px'
  },
  height: {
    type: String,
    default: '667px'
  },
  sourceCode: {
    type: String,
    default: ''
  },
  rawSource: {
    type: String,
    default: ''
  }
})
const decoded = computed(() => {
  return decodeURIComponent(props.sourceCode)
})
const baseUrl = { 'cxz-ui': import.meta.env.VITE_VUE3_BASE }

console.log(import.meta.env);

const iconColorArr = [
  { name: '', color: '#fe5f57' },
  { name: '', color: '#ffbc2d' },
  { name: 'scale', color: '#27c83e' },
]

const isFullScreen = ref(false)
const isShowCode = ref(false)

const handleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
}

const handleShowCode = () => {
  isShowCode.value = !isShowCode.value
}

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false
})

const copyCode = async () => {
  if(!isSupported) {
    ElMessage.error('不支持复制')
  } else {
    try {
      await copy()
      ElMessage.success('复制成功')
    } catch (e) {
      console.log(e.message)
      ElMessage.error('复制失败')
    }
  }
}

onMounted(() => {
  document.addEventListener('keyup', (e) => {
    if(e.key === 'Escape' || e.key === 'Esc') {
      isFullScreen.value = false
    }
  })
})
</script>

<style scoped>

</style>