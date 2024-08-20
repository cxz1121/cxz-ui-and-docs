<template>
  <div class="container" :class="{ 'full-screen-container': isFullScreen }">
    <div class="comp">
      <div class="menu">
        <i class="icon" v-for="icon in iconColorArr" :style="{ backgroundColor: icon.color }">
          <el-icon v-if="icon.name === 'scale'" class="d-caret" @click="handleFullScreen"><DCaret /></el-icon>
        </i>
      </div>
      <iframe 
        class="elp-iframe"
        :class="{ 'full-screen-iframe': isFullScreen }"
        :src="`${baseUrl[props.libType]}#/${props.iframeSrc}`"
        :style="{ width: props.width, height: props.height }"
      />
    </div>
    <div class="options">
      <el-tooltip content="全屏预览" placement="bottom">
        <el-icon class="option-item" @click="handleFullScreen"><FullScreen /></el-icon>
      </el-tooltip>
      <el-tooltip content="复制代码" placement="bottom">
        <el-icon class="option-item" @click="copyCode"><CopyDocument /></el-icon>
      </el-tooltip>
      <el-tooltip content="查看源码" placement="bottom">
        <span class="option-item code-btn" @click="handleShowCode">&lt;/&gt;</span>
      </el-tooltip>
    </div>
    <el-collapse-transition>
      <div class="source-code" v-if="isShowCode">
        <div class="decode" v-html="decoded"></div>
        <div class="hide-code-btn">
          <el-button type="info" link :icon="CaretTop" @click="handleShowCode"></el-button>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElIcon, ElTooltip, ElCollapseTransition, ElButton, ElMessage } from 'element-plus'
import { CaretTop, CopyDocument, DCaret, FullScreen } from '@element-plus/icons-vue'
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
    default: '100%'
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

<style lang="less" scoped>
@menu-height: 32px;
.container {
  // border: 1px solid var(--vp-c-divider);
  border: 1px solid var(--vp-custom-block-details-border);
  border-radius: 8px;
}
.full-screen-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10000;
}
.comp {
  overflow: auto;
  .menu {
    border-radius: 8px 8px 0 0;
    height: @menu-height;
    line-height: @menu-height;
    background-color: var(--vp-custom-block-details-bg);
    padding: 0 16px;
    .icon {
      position: relative;
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 6px;
      border-radius: 50%;
      &:hover {
        .d-caret {
          display: block;
        }
      }
      .d-caret {
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: var(--vp-c-text-2);
        font-size: 12px;
      }
    }
  }
  .elp-iframe {
    border: 1px solid #e5e5e5;
    margin: 10 auto;
    border-radius: 0 0 8px 8px;
  }
  .full-screen-iframe {
    width: 100vw !important;
    height: calc(100vh - @menu-height) !important;
  }
}
.options {
  border-top: 1px solid var(--vp-custom-block-details-border);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .option-item {
    margin-right: 8px;
    cursor: progress;
    color: var(--vp-c-text-2);
    font-size: 12px;
    &:hover {
      color: var(--vp-c-text-1);
    }
  }
}
.source-code {
  background-color: #f6f8fa;
  position: relative;
  border-top: 1px solid var(--vp-custom-block-details-border);
  .decode {
    padding: 0 16px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .hide-code-btn {
    border-top: 1px solid var(--vp-custom-block-details-border);
    border-radius: 0 0 8px 8px;
    position: sticky;
    bottom: 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    background-color: var(--vp-c-bg);
    z-index: 10;
    .icon {
      margin-right: 8px;
    }
  }
}
</style>