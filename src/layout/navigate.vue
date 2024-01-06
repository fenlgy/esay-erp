<template>
  <n-menu
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>

<script setup lang="ts">
import { AlertTwotone, AppstoreTwotone, BookTwotone } from "@vicons/antd";
import { renderIcon,renderRouter } from "@/utils/render.tsx";

const menuOptions = [
  {
    label: renderRouter("/", "首页"),
    key: "hear-the-wind-sing",
    icon: renderIcon(AlertTwotone)
  },
  {
    label: renderRouter("/goods/list", "商品管理"),
    key: "goods-management",
    icon: renderIcon(AppstoreTwotone)
  },
  {
    label: renderRouter("/scrm/list", "客商管理"),
    icon: renderIcon(BookTwotone),
    key: "scrm"
  },
  {
    label: renderRouter("/icons", "Icon"),
    icon: renderIcon(BookTwotone),
    key: "icons"
  },
  {
    label: "销售管理",
    key: "sales-management",
    icon: renderIcon(BookTwotone),
    children: [
      {
        label: "销售计划",
        key: "sales-plan"
      },
      {
        label: "销售订单",
        key: "sale-order"
      }
    ]
  },
  {
    label: "采购管理",
    key: "purchase-management",
    icon: renderIcon(BookTwotone),
    children: [
      {
        label: "采购计划",
        key: "procurement-plan"
      },
      {
        label: "采购订单",
        key: "purchase-order"
      }
    ]
  },
  {
    label: "统计分析",
    icon: renderIcon(BookTwotone),
    key: "inventory",
  },
  {
    label: "系统设置",
    icon: renderIcon(BookTwotone),
    key: "system",
    children:[
      {
        label:renderRouter("/system/system-config/", "系统配置"),
        key:'system-config',
      },
      {
        label:renderRouter("/system/unit-config/", "单位管理"),
        key:'unit-config',
      },
      {
        label: renderRouter("/system/warehouse-config/", "仓库管理"),
        key: "warehouse"
      }
    ]
  }
];
</script>