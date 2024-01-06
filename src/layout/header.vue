<template>
  <n-space justify="space-between">
    <n-input placeholder="全局搜索">
      <template #prefix>
        <span>搜索</span>
      </template>
      <template #suffix>
        <n-icon :component="SearchOutlined" />
      </template>
    </n-input>
    <n-space justify="end" size="small">
      <n-button quaternary circle>
        <template #icon>
          <n-icon :component="BellTwotone" size="20" color="#333" />
        </template>
      </n-button>
      <n-button quaternary circle>
        <template #icon>
          <n-icon :component="QuestionCircleTwotone" size="20" color="#333" />
        </template>
      </n-button>
      <n-button quaternary circle>
        <template #icon>
          <n-icon :component="SettingTwotone" size="20" color="#333" />
        </template>
      </n-button>
                  <n-avatar
                    round
                    size="small"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  />
    </n-space>
  </n-space>
</template>

<script setup lang="ts">

import { BellTwotone, QuestionCircleTwotone, SearchOutlined, SettingTwotone } from "@vicons/antd";
import { NIcon } from "naive-ui";
</script>