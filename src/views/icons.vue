<template>
  <n-space>
    <n-icon :component="icon" v-for="icon in icons" size="24"></n-icon>
    <n-divider/>
    <n-icon :component="icon" v-for="icon in iconsAnt" size="24"></n-icon>
  </n-space>
</template>

<script setup lang="ts">
import {
  AccountBalanceWalletTwotone,
  SmsTwotone,
  SourceTwotone,
  SportsBarTwotone,
  StyleTwotone,
  TextsmsTwotone,
  TurnedInTwotone,
  WidgetsTwotone,
  WorkTwotone,
  WysiwygTwotone,
  LockTwotone as LL,
  PhoneTwotone as PP,
  PieChartTwotone as PIE,
  StopTwotone as Stop,
} from "@vicons/material";
import {
  AccountBookTwotone,
  AlertTwotone,
  AppstoreTwotone,
  BellTwotone,
  BookTwotone,
  BulbTwotone,
  CalculatorTwotone,
  CarryOutTwotone,
  ContainerTwotone,
  CopyTwotone,
  DeleteTwotone,
  DollarTwotone,
  EyeInvisibleTwotone,
  LockTwotone,
  EyeTwotone,
  FileAddTwotone,
  FileTwotone,
  InsuranceTwotone,
  LayoutTwotone,
  MailTwotone,
  MessageTwotone,
  PhoneTwotone,
  PieChartTwotone,
  PrinterTwotone,
  ProfileTwotone,
  QuestionCircleTwotone,
  SafetyCertificateTwotone,
  SaveTwotone,
  ShoppingTwotone,
  ShopTwotone,
  StopTwotone,
  TagTwotone,
  TagsTwotone,
  UnlockTwotone,
  WalletTwotone,
  WarningTwotone,
  PushpinTwotone,
  MinusCircleTwotone, HomeTwotone, ExclamationCircleTwotone
} from "@vicons/antd";
const iconsAnt = [
  AccountBookTwotone,
  BookTwotone,
  AlertTwotone,
  AppstoreTwotone,
  BellTwotone,
  CalculatorTwotone,
  BulbTwotone,
  CarryOutTwotone,
  ContainerTwotone,
  CopyTwotone,
  DeleteTwotone,
  DollarTwotone,
  EyeTwotone,
  EyeInvisibleTwotone,
  FileAddTwotone,
  FileTwotone,
  InsuranceTwotone,
  LayoutTwotone,
  LockTwotone,
  MailTwotone,
  MessageTwotone,
  PhoneTwotone,
  PieChartTwotone,
  PrinterTwotone,
  ProfileTwotone,
  QuestionCircleTwotone,
  SafetyCertificateTwotone,
  SaveTwotone,
  ShoppingTwotone,
  ShopTwotone,
  StopTwotone,
  TagTwotone,
  TagsTwotone,
  UnlockTwotone,
  WalletTwotone,
  WarningTwotone,
  PushpinTwotone,
  MinusCircleTwotone,
  HomeTwotone,
  ExclamationCircleTwotone
]
const icons = [Stop,PIE,PP,LL,LockTwotone,DeleteTwotone,WysiwygTwotone, WorkTwotone,AccountBalanceWalletTwotone, SmsTwotone, SourceTwotone, StyleTwotone, SportsBarTwotone, TextsmsTwotone, TurnedInTwotone, WidgetsTwotone];
</script>

<style scoped>

</style>