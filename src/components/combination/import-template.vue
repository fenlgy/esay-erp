<template>
  <n-popover trigger="click" placement="bottom" ref="popoverRef">
    <template #trigger>
      <btn secondary>
        <slot />
      </btn>
    </template>
    <n-card :bordered="false" title="商品导入" size="small">
      <!--      <template #action> 没模板？先<btn text type="primary">下载模板</btn> </template>-->
      <!--      <input type="file" accept=".xlsx, .xls" class="" @change="handleSelectedFile" />-->
      <n-space align="center">
        <btn @click="open" type="primary" size="small" :loading="isLoading">
          <template #icon>
            <n-icon size="20">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <path opacity=".3" d="M9.17 6H4v12h16V8h-8.83l-2-2zM16 13h-3v4h-2v-4H8l4.01-4L16 13z" fill="currentColor"></path>
                <path
                  d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z"
                  fill="currentColor"
                ></path>
                <path d="M11 13v4h2v-4h3l-3.99-4L8 13z" fill="currentColor"></path>
              </svg>
            </n-icon>
          </template>
          上传模板</btn
        >
        <span
          >没模板？先
          <btn text type="primary">下载模板</btn>
        </span>
      </n-space>
    </n-card>
  </n-popover>
</template>

<script setup lang="ts">
  import { read, utils } from 'xlsx';

  const props = defineProps<{
    headerMapping: Record<string, string>;
  }>();

  const emit = defineEmits(['uploaded']);
  const isLoading = ref(false);
  const popoverRef = ref();

  const { open, onChange, reset } = useFileDialog({
    accept: '.xlsx, .xls', // Set to accept only image files
    multiple: false,
  });

  onChange(async (files) => {
    if (files) {
      isLoading.value = true;
      const data = await readExcel(files[0]);
      isLoading.value = false;
      emit('uploaded', data);
      popoverRef.value.setShow(false);
      reset();
    }
  });

  function readExcel(file: File) {
    const reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    reader.readAsBinaryString(file);

    return new Promise((resolve) => {
      reader.onload = function (e) {
        // const data = new Uint8Array(e.target.result);
        // const workbook = read(data, { type: 'array' });
        let workbook = read(e.target?.result, {
          type: 'binary',
        });

        // Assuming you have only one sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // Convert sheet to JSON
        const jsonData = utils.sheet_to_json(sheet, { header: 1 });
        // 第一行为列头
        const header = <string[]>jsonData[0];
        const result = jsonData.slice(1).map((row: any) => {
          const obj: Record<string, any> = {};
          header.forEach((key: string, index: number) => {
            const curKey = props.headerMapping[key] ?? key;
            obj[curKey] = row[index];
          });
          return obj;
        });

        resolve(result);
      };
    });
  }
</script>
