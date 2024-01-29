import { RouterLink } from 'vue-router';
import { Component } from 'vue';
import TableColumnsSwitch from '@/components/basic/switch/table-columns-switch.vue';
import { AnyObject } from '@/utils/types.ts';
import Btn from '@/components/basic/button/btn.vue';
import { Model, ModelStatic } from '@sequelize/core';

export function renderEnableOrDisableTag(status: boolean): () => JSX.Element {
  return () => (
    <n-tag bordered={false} round={true} size="small" type={status ? 'success' : 'default'}>
      {status ? '启用' : '禁用'}
    </n-tag>
  );
}

export function renderIcon(Icon: Component): () => JSX.Element {
  return () => (
    <n-icon>
      {/*@ts-ignore*/}
      <Icon />
    </n-icon>
  );
}

export function renderRouter(url: string, label: string) {
  return () => <RouterLink to={url}>{label}</RouterLink>;
}

export function renderTableLinkButton(url: string, label: string) {
  return () => (
    <Btn to={url} type="primary" tag="a" text>
      {label}
    </Btn>
  );
}

export function renderTableSwitch(row, model: ModelStatic) {
  return () => <TableColumnsSwitch id={row.id} model={model} v-model={row.disabled}></TableColumnsSwitch>;
}

export function renderTableTag(row: AnyObject, key: string, params: AnyObject) {
  const cur = params[row[key]];
  return () => (
    <n-tag size="small" bordered={false} type={cur?.type} color={cur?.color}>
      {cur?.name}
    </n-tag>
  );
}
