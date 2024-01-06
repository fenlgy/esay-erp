import { BasicDataInfo, MyBoolean } from "@/utils/types.ts";

export type BankInfo = {
  bankName: string
  bankAccount: string
  bankAddress: string
  swiftCode: string
  currency: string
  isDefault: MyBoolean
} & BasicDataInfo