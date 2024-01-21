<template>
  <n-space vertical>
    <n-card
      :bordered="false"
      size="small"
    >
      <n-space
        vertical
        size="large"
      >
        <n-tabs type="line">
          <n-tab-pane
            name="oasis"
            tab="Oasis"
          >
          </n-tab-pane>
          <n-tab-pane
            name="the beatles"
            tab="the Beatles"
          >
          </n-tab-pane>
          <n-tab-pane
            name="jay chou"
            tab="Jay Chou"
          >
          </n-tab-pane>
        </n-tabs>
        <n-space size="small">
          <btn @click="() => console.log(111)">防抖测试</btn>
          <btn secondary>
            <template #icon>
              <n-icon :component="SyncOutlined" />
            </template>
          </btn>
          <btn
            type="primary"
            @click="onClick"
            >新增</btn
          >
          <n-button
            secondary
            type="primary"
            >新增</n-button
          >
          <n-button secondary>新增</n-button>
        </n-space>
        <n-data-table
          :columns="columns"
          :data="data"
          :pagination="{
            pageSize: 2,
          }"
          :bordered="false"
        />
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
  import { DataTableColumns, NButton } from 'naive-ui';
  import { SyncOutlined } from '@vicons/antd';

  type Song = {
    no: number;
    title: string;
    length: string;
  };
  const createColumns = ({ play }: { play: (row: Song) => void }): DataTableColumns<Song> => {
    return [
      {
        title: 'No',
        key: 'no',
      },
      {
        title: 'Title',
        key: 'title',
      },
      {
        title: 'Length',
        key: 'length',
      },
      {
        title: 'Action',
        key: 'actions',
        render(row) {
          return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => play(row),
            },
            { default: () => 'Play' }
          );
        },
      },
    ];
  };
  const columns = createColumns({
    play(row: Song) {
      alert(`Play ${row.title}`);
      // message.info(`Play ${row.title}`)
    },
  });
  const data: Song[] = [
    { no: 3, title: 'Wonderwall', length: '4:18' },
    { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
    { no: 12, title: 'Champagne Supernova', length: '7:27' },
  ];

  const onClick = () => {
    // $form.value.validate()
    console.log(data);
    // getProductsList().then(r => console.log(r));
    // getDataFromDatabase("products").then(r => console.log(r));
    // insertDataToDatabase("products", {
    //   name: "榴莲王",
    //   systemCode: "CODE2232",
    //   sku: "SKU004",
    //   unit: "ge",
    //   disabled: 0
    // }).then(r => console.log(r));
    // updateDataToDatabase('products',{
    //   id:4,
    //   name:'榴莲我',
    // })
    // window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
    // ipcRenderer.invoke("get-database-path").then(dbpath => {
    //   getSqlite3(dbpath).then(db => {
    // db.serialize(() => {
    //   db.get('SELECT * FROM products', (err, row) => {
    //     if (err) {
    //       console.error(err.message);
    //     } else {
    //       console.log(row);
    //     }
    //   });
    // });
    // db.run('INSERT INTO products (name,ename,sku,unit,systemCode,disabled) VALUES(?, ?,?,?,?,?)', ["牛肉", "test2", "SKU002", "盒", "9837493",1], function(err) {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log(`A row has been inserted with rowid ${this.lastID}`);
    // });
    // db.serialize(() => {
    //   const stmt = db.prepare("INSERT INTO products (name,ename,sku,unit,system-code) VALUES (?, ?,?,?,?)");
    //   stmt.run("牛肉", "test2", "SKU002", "盒", "9837493");
    //   stmt.finalize();
    // });
    //     console.log(db);
    //
    //   });
    // });
  };
</script>

<style scoped></style>
