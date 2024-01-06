<template>
  <n-form>
    <n-form-item label="文件存放路径" feedback="请不要放到 C 盘，或者容易被误删的地方！！！" validation-status="warning">
      <n-input-group>
        <n-input :value="systemConfig.fileStoragePath" disabled />
        <n-button @click="handleClick">
          {{ !systemConfig.fileStoragePath ? "选择" : "改变" }}
        </n-button>
      </n-input-group>
    </n-form-item>
    <form-item label="主色调" required>
      <n-color-picker v-model:value="systemConfig.primaryColor"></n-color-picker>
    </form-item>
  </n-form>
</template>

<script setup lang="ts">
import { getSystemConfig, setSystemConfig, SystemConfig } from "@/api/system.ts";
import { ipcRenderer } from "electron";

const message = useMessage()
const handleClick = async () => {
  try {
    systemConfig.value.fileStoragePath = await ipcRenderer.invoke("open-directory-dialog");
    const res = await setSystemConfig({
      fileStoragePath: systemConfig.value.fileStoragePath
    });

    if(res.error){
      message.error(res.error)
    }else {
      message.success('设置成功！')
    }

  } catch (error) {
    console.error("Error selecting directory:", error);
  }
};

const systemConfig = ref<SystemConfig>(<SystemConfig>{});
getSystemConfig().then(r => {
  systemConfig.value = r;
});
</script>