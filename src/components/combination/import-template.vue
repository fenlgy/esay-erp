<template>
  <n-popover trigger="click" placement="bottom">
    <template #trigger>
      <btn @click="handleClick">
        <slot />
      </btn>
    </template>
    <n-card :bordered="false" title="商品导入" size="small">
      <template #action> 没模板？可先<btn text type="primary">下载模板</btn> </template>
      <input type="file" accept=".xlsx, .xls" class="" @change="handleSelectedFile" />
    </n-card>
  </n-popover>
</template>

<script setup lang="ts">
  import { read, utils } from 'xlsx';
  const handleClick = () => {};
  function readExcel(file: File) {
    const reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    reader.readAsBinaryString(file);
    // console.log(reader);

    reader.onload = function (e) {
      // const data = new Uint8Array(e.target.result);
      // const workbook = read(data, { type: 'array' });
      let workbook = read(e.target.result, {
        type: 'binary',
      });

      // Assuming you have only one sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Convert sheet to JSON
      const jsonData = utils.sheet_to_json(sheet, { header: 1 });
      console.log(jsonData);
      // Display the parsed data
      // displayData(jsonData);
    };
  }
  const handleSelectedFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log(file);
      readExcel(file);
    }
  };
</script>
