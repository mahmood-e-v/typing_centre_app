-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('ACTIVE', 'EXPIRING_SOON', 'EXPIRED', 'RENEWAL_IN_PROGRESS', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'SKIPPED', 'CANCELLED');

-- AlterTable
ALTER TABLE "WorkType" ADD COLUMN     "defaultDocumentTypeId" TEXT,
ADD COLUMN     "defaultReminderDays" INTEGER NOT NULL DEFAULT 30,
ADD COLUMN     "tracksExpiry" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "issueAuthority" TEXT,
    "isMandatory" BOOLEAN NOT NULL DEFAULT false,
    "requiresNumber" BOOLEAN NOT NULL DEFAULT true,
    "requiresExpiry" BOOLEAN NOT NULL DEFAULT true,
    "patternRegex" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerDocument" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "partnerId" TEXT,
    "beneficiaryId" TEXT,
    "documentTypeId" TEXT NOT NULL,
    "documentNumber" TEXT,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "issuedAt" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'ACTIVE',
    "fileUrl" TEXT,
    "fileKey" TEXT,
    "mimeType" TEXT,
    "lastVerifiedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT,

    CONSTRAINT "CustomerDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentNotificationSchedule" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),
    "message" TEXT,
    "channel" TEXT NOT NULL DEFAULT 'WHATSAPP',
    "recipient" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentNotificationSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DocumentType_companyId_idx" ON "DocumentType"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_companyId_name_key" ON "DocumentType"("companyId", "name");

-- CreateIndex
CREATE INDEX "CustomerDocument_companyId_idx" ON "CustomerDocument"("companyId");

-- CreateIndex
CREATE INDEX "CustomerDocument_partnerId_idx" ON "CustomerDocument"("partnerId");

-- CreateIndex
CREATE INDEX "CustomerDocument_beneficiaryId_idx" ON "CustomerDocument"("beneficiaryId");

-- CreateIndex
CREATE INDEX "CustomerDocument_expiryDate_idx" ON "CustomerDocument"("expiryDate");

-- CreateIndex
CREATE INDEX "DocumentNotificationSchedule_scheduledDate_idx" ON "DocumentNotificationSchedule"("scheduledDate");

-- CreateIndex
CREATE INDEX "DocumentNotificationSchedule_status_idx" ON "DocumentNotificationSchedule"("status");

-- AddForeignKey
ALTER TABLE "WorkType" ADD CONSTRAINT "WorkType_defaultDocumentTypeId_fkey" FOREIGN KEY ("defaultDocumentTypeId") REFERENCES "DocumentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentType" ADD CONSTRAINT "DocumentType_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Beneficiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDocument" ADD CONSTRAINT "CustomerDocument_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentNotificationSchedule" ADD CONSTRAINT "DocumentNotificationSchedule_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "CustomerDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
