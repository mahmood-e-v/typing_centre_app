/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to drop the column `isLocked` on the `FinancialPeriod` table. All the data in the column will be lost.
  - You are about to drop the column `lockedAt` on the `FinancialPeriod` table. All the data in the column will be lost.
  - You are about to drop the column `lockedById` on the `FinancialPeriod` table. All the data in the column will be lost.
  - You are about to alter the column `subtotal` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `tax` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `discount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `total` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `paidAmount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `balance` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to drop the column `liabilities` on the `Partner` table. All the data in the column will be lost.
  - You are about to alter the column `govFee` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `typingCharge` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `vat` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `total` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `advanceAmount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to drop the column `liabilities` on the `Vendor` table. All the data in the column will be lost.
  - You are about to alter the column `total` on the `Voucher` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `paidAmount` on the `Voucher` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `balance` on the `Voucher` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `amount` on the `VoucherItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `amount` on the `VoucherPayment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `presetGovFee` on the `WorkType` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - You are about to alter the column `presetTypingCharge` on the `WorkType` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(18,2)`.
  - A unique constraint covering the columns `[companyId,code]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId,receiptNo]` on the table `VoucherPayment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodEnd` to the `FinancialPeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodStart` to the `FinancialPeriod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `VoucherPayment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClosingStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "LegalType" AS ENUM ('SOLE_ESTABLISHMENT', 'LLC', 'CIVIL_COMPANY', 'FREEZONE_ENTITY', 'BRANCH_OF_FOREIGN');

-- CreateEnum
CREATE TYPE "Emirate" AS ENUM ('DUBAI', 'ABU_DHABI', 'SHARJAH', 'AJMAN', 'UMM_AL_QUWAIN', 'RAS_AL_KHAIMAH', 'FUJAIRAH');

-- CreateEnum
CREATE TYPE "VatFrequency" AS ENUM ('MONTHLY', 'QUARTERLY');

-- CreateEnum
CREATE TYPE "AccountingMethod" AS ENUM ('ACCRUAL', 'CASH');

-- CreateEnum
CREATE TYPE "AccountingModel" AS ENUM ('CONSOLIDATED', 'BRANCH_WISE');

-- CreateEnum
CREATE TYPE "BranchType" AS ENUM ('MAIN', 'SUB');

-- CreateEnum
CREATE TYPE "AccountCategory" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "JournalEntryType" AS ENUM ('INVOICE', 'PAYMENT', 'EXPENSE', 'GOVT_FEE', 'ADJUSTMENT', 'REVERSAL');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT', 'DEBIT');

-- AlterEnum
ALTER TYPE "TransactionType" ADD VALUE 'OPENING_BALANCE';

-- DropIndex
DROP INDEX "Account_companyId_name_key";

-- DropIndex
DROP INDEX "FinancialPeriod_isLocked_idx";

-- DropIndex
DROP INDEX "VoucherPayment_receiptNo_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "category" "AccountCategory" NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "iban" TEXT,
ADD COLUMN     "isPostable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "linkedBranchIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "merchantId" TEXT,
ADD COLUMN     "parentAccountId" TEXT,
ADD COLUMN     "swiftCode" TEXT,
ADD COLUMN     "terminalId" TEXT,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "address" TEXT,
ADD COLUMN     "allowCrossBranch" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cashCounterEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emirate" "Emirate" NOT NULL DEFAULT 'DUBAI',
ADD COLUMN     "googleMapLink" TEXT,
ADD COLUMN     "invoicePrefix" TEXT,
ADD COLUMN     "managerId" TEXT,
ADD COLUMN     "nextInvoiceNumber" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "openingCashBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "receiptPrefix" TEXT,
ADD COLUMN     "separateNumbering" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "type" "BranchType" NOT NULL DEFAULT 'SUB';

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "accountingMethod" "AccountingMethod" NOT NULL DEFAULT 'ACCRUAL',
ADD COLUMN     "accountingModel" "AccountingModel" NOT NULL DEFAULT 'CONSOLIDATED',
ADD COLUMN     "allowBackDated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "auditRetentionDays" INTEGER NOT NULL DEFAULT 1825,
ADD COLUMN     "baseCurrency" TEXT NOT NULL DEFAULT 'AED',
ADD COLUMN     "decimalPrecision" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "emirate" "Emirate" NOT NULL DEFAULT 'DUBAI',
ADD COLUMN     "establishmentCard" TEXT,
ADD COLUMN     "fiscalYearStart" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "invoiceFooter" TEXT,
ADD COLUMN     "invoiceHeader" TEXT,
ADD COLUMN     "legalType" "LegalType" NOT NULL DEFAULT 'SOLE_ESTABLISHMENT',
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "nameAr" TEXT,
ADD COLUMN     "stampImage" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tradeLicense" TEXT,
ADD COLUMN     "vatFilingStart" TIMESTAMP(3),
ADD COLUMN     "vatRate" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
ADD COLUMN     "vatRegistered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vatRegistrationDate" TIMESTAMP(3),
ADD COLUMN     "vatReturnFreq" "VatFrequency" NOT NULL DEFAULT 'QUARTERLY',
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "ExpenseCategory" ADD COLUMN     "ledgerAccountId" TEXT;

-- AlterTable
ALTER TABLE "FinancialPeriod" DROP COLUMN "isLocked",
DROP COLUMN "lockedAt",
DROP COLUMN "lockedById",
ADD COLUMN     "accountingLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "accountingLockedAt" TIMESTAMP(3),
ADD COLUMN     "accountingLockedById" TEXT,
ADD COLUMN     "isYearEndClosed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastUnlockReason" TEXT,
ADD COLUMN     "lastUnlockedAt" TIMESTAMP(3),
ADD COLUMN     "lastUnlockedById" TEXT,
ADD COLUMN     "periodEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "periodStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vatLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vatLockedAt" TIMESTAMP(3),
ADD COLUMN     "vatLockedById" TEXT,
ADD COLUMN     "yearEndClosedAt" TIMESTAMP(3),
ADD COLUMN     "yearEndClosedById" TEXT;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "subtotal" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "tax" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "paidAmount" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "liabilities";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "isVatApplicable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "vatRate" DECIMAL(18,2) NOT NULL DEFAULT 5,
ALTER COLUMN "govFee" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "typingCharge" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "vat" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "advanceAmount" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "liabilities";

-- AlterTable
ALTER TABLE "Voucher" ALTER COLUMN "total" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "paidAmount" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "VoucherItem" ADD COLUMN     "isVatApplicable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "vatAmount" DECIMAL(18,2) NOT NULL DEFAULT 0,
ADD COLUMN     "vatRate" DECIMAL(18,2) NOT NULL DEFAULT 5,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "VoucherPayment" ADD COLUMN     "companyId" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "WorkType" ADD COLUMN     "vatApplicable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "vatRate" DECIMAL(18,2) NOT NULL DEFAULT 5,
ALTER COLUMN "presetGovFee" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "presetTypingCharge" SET DATA TYPE DECIMAL(18,2);

-- CreateTable
CREATE TABLE "DailyClosing" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "ClosingStatus" NOT NULL DEFAULT 'OPEN',
    "openingCash" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "cashIn" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "cashOut" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "closingCash" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "bankIn" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "posIn" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "totalSales" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "totalVat" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "totalGovFee" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "closedById" TEXT,
    "closedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyClosing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "postingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "type" "JournalEntryType" NOT NULL,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "reversedEntryId" TEXT,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LedgerTransaction" (
    "id" TEXT NOT NULL,
    "journalEntryId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "debit" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "credit" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "partnerId" TEXT,
    "companyId" TEXT NOT NULL,
    "branchId" TEXT,
    "cardId" TEXT,

    CONSTRAINT "LedgerTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCard" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CardType" NOT NULL DEFAULT 'CREDIT',
    "issuingBank" TEXT NOT NULL,
    "last4Digits" TEXT NOT NULL,
    "creditLimit" DECIMAL(18,2),
    "currency" TEXT NOT NULL DEFAULT 'AED',
    "statementCycleDay" INTEGER,
    "paymentDueDays" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ledgerAccountId" TEXT NOT NULL,

    CONSTRAINT "BusinessCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyClosing_companyId_idx" ON "DailyClosing"("companyId");

-- CreateIndex
CREATE INDEX "DailyClosing_branchId_idx" ON "DailyClosing"("branchId");

-- CreateIndex
CREATE INDEX "DailyClosing_date_idx" ON "DailyClosing"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyClosing_companyId_branchId_date_key" ON "DailyClosing"("companyId", "branchId", "date");

-- CreateIndex
CREATE INDEX "JournalEntry_companyId_idx" ON "JournalEntry"("companyId");

-- CreateIndex
CREATE INDEX "JournalEntry_branchId_idx" ON "JournalEntry"("branchId");

-- CreateIndex
CREATE INDEX "LedgerTransaction_companyId_idx" ON "LedgerTransaction"("companyId");

-- CreateIndex
CREATE INDEX "LedgerTransaction_branchId_idx" ON "LedgerTransaction"("branchId");

-- CreateIndex
CREATE INDEX "LedgerTransaction_accountId_idx" ON "LedgerTransaction"("accountId");

-- CreateIndex
CREATE INDEX "BusinessCard_companyId_idx" ON "BusinessCard"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCard_companyId_ledgerAccountId_key" ON "BusinessCard"("companyId", "ledgerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyId_code_key" ON "Account"("companyId", "code");

-- CreateIndex
CREATE INDEX "FinancialPeriod_accountingLocked_idx" ON "FinancialPeriod"("accountingLocked");

-- CreateIndex
CREATE INDEX "FinancialPeriod_vatLocked_idx" ON "FinancialPeriod"("vatLocked");

-- CreateIndex
CREATE INDEX "FinancialPeriod_periodStart_idx" ON "FinancialPeriod"("periodStart");

-- CreateIndex
CREATE INDEX "FinancialPeriod_periodEnd_idx" ON "FinancialPeriod"("periodEnd");

-- CreateIndex
CREATE INDEX "VoucherPayment_companyId_idx" ON "VoucherPayment"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "VoucherPayment_companyId_receiptNo_key" ON "VoucherPayment"("companyId", "receiptNo");

-- AddForeignKey
ALTER TABLE "DailyClosing" ADD CONSTRAINT "DailyClosing_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyClosing" ADD CONSTRAINT "DailyClosing_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyClosing" ADD CONSTRAINT "DailyClosing_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialPeriod" ADD CONSTRAINT "FinancialPeriod_accountingLockedById_fkey" FOREIGN KEY ("accountingLockedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialPeriod" ADD CONSTRAINT "FinancialPeriod_lastUnlockedById_fkey" FOREIGN KEY ("lastUnlockedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialPeriod" ADD CONSTRAINT "FinancialPeriod_vatLockedById_fkey" FOREIGN KEY ("vatLockedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialPeriod" ADD CONSTRAINT "FinancialPeriod_yearEndClosedById_fkey" FOREIGN KEY ("yearEndClosedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseCategory" ADD CONSTRAINT "ExpenseCategory_ledgerAccountId_fkey" FOREIGN KEY ("ledgerAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_parentAccountId_fkey" FOREIGN KEY ("parentAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerTransaction" ADD CONSTRAINT "LedgerTransaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerTransaction" ADD CONSTRAINT "LedgerTransaction_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerTransaction" ADD CONSTRAINT "LedgerTransaction_journalEntryId_fkey" FOREIGN KEY ("journalEntryId") REFERENCES "JournalEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerTransaction" ADD CONSTRAINT "LedgerTransaction_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerTransaction" ADD CONSTRAINT "LedgerTransaction_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "BusinessCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherPayment" ADD CONSTRAINT "VoucherPayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCard" ADD CONSTRAINT "BusinessCard_ledgerAccountId_fkey" FOREIGN KEY ("ledgerAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCard" ADD CONSTRAINT "BusinessCard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
