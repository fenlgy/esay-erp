<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-message-provider>
    <n-layout has-sider>
      <n-layout-sider collapse-mode="width"
                      :collapsed-width="120"
                      :width="240"
                      show-trigger="arrow-circle"
                      content-style="padding: 28px;"
                      bordered>
        <navigate/>
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered style="padding: 8px 16px">
          <Header/>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <router-view v-if="isRouterAlive" />
        </n-layout-content>
        <!--            <n-layout-footer>成府路</n-layout-footer>-->
      </n-layout>
    </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
// import {ipcRenderer} from 'electron'
import Navigate from "@/layout/navigate.vue";
import Header from "@/layout/header.vue";
import { GlobalThemeOverrides } from "naive-ui";
import { generateSerialNumber } from "@/api/generateSerialNumber.ts";

const theme = ref();

// 增加全局重新加载方法，通过声明reload方法，控制router-view的显示或隐藏，从而控制页面路由下的组件重新加载
const isRouterAlive = ref(true)
const reload = ():void =>{
  isRouterAlive.value = false
  nextTick(()=>{
    isRouterAlive.value = true
  })
}

window.$myReload = reload;
// window.$myMessage = useMessage();
provide('reload',reload)

const themeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#FF0000'
  },
}

</script>
<style>
html, body, #app, #app > .n-config-provider, #app > .n-config-provider > .n-layout {
  height: 100%;
}
</style>
