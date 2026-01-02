
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  email: 'email',
  phone: 'phone',
  address: 'address',
  trn: 'trn',
  isActive: 'isActive',
  lockedUntil: 'lockedUntil',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  accountingMethod: 'accountingMethod',
  accountingModel: 'accountingModel',
  allowBackDated: 'allowBackDated',
  auditRetentionDays: 'auditRetentionDays',
  baseCurrency: 'baseCurrency',
  decimalPrecision: 'decimalPrecision',
  emirate: 'emirate',
  establishmentCard: 'establishmentCard',
  fiscalYearStart: 'fiscalYearStart',
  invoiceFooter: 'invoiceFooter',
  invoiceHeader: 'invoiceHeader',
  legalType: 'legalType',
  logo: 'logo',
  nameAr: 'nameAr',
  stampImage: 'stampImage',
  startDate: 'startDate',
  tradeLicense: 'tradeLicense',
  vatFilingStart: 'vatFilingStart',
  vatRate: 'vatRate',
  vatRegistered: 'vatRegistered',
  vatRegistrationDate: 'vatRegistrationDate',
  vatReturnFreq: 'vatReturnFreq',
  website: 'website'
};

exports.Prisma.DailyClosingScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  branchId: 'branchId',
  date: 'date',
  status: 'status',
  openingCash: 'openingCash',
  cashIn: 'cashIn',
  cashOut: 'cashOut',
  closingCash: 'closingCash',
  bankIn: 'bankIn',
  posIn: 'posIn',
  totalSales: 'totalSales',
  totalVat: 'totalVat',
  totalGovFee: 'totalGovFee',
  closedById: 'closedById',
  closedAt: 'closedAt',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BranchScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  code: 'code',
  location: 'location',
  phone: 'phone',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  address: 'address',
  allowCrossBranch: 'allowCrossBranch',
  cashCounterEnabled: 'cashCounterEnabled',
  email: 'email',
  emirate: 'emirate',
  googleMapLink: 'googleMapLink',
  invoicePrefix: 'invoicePrefix',
  managerId: 'managerId',
  nextInvoiceNumber: 'nextInvoiceNumber',
  openingCashBalance: 'openingCashBalance',
  receiptPrefix: 'receiptPrefix',
  separateNumbering: 'separateNumbering',
  type: 'type'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  code: 'code',
  description: 'description',
  isSystem: 'isSystem',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  module: 'module',
  action: 'action',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  permissionId: 'permissionId',
  createdAt: 'createdAt'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  roleId: 'roleId',
  createdAt: 'createdAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  username: 'username',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  companyId: 'companyId',
  branchId: 'branchId',
  role: 'role',
  isActive: 'isActive',
  forcePasswordChange: 'forcePasswordChange',
  lastLoginAt: 'lastLoginAt',
  lastLoginIp: 'lastLoginIp',
  lastLoginUserAgent: 'lastLoginUserAgent',
  passwordChangedAt: 'passwordChangedAt',
  failedLoginAttempts: 'failedLoginAttempts',
  failedLoginResetAt: 'failedLoginResetAt',
  lockedUntil: 'lockedUntil',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  expiresAt: 'expiresAt',
  lastActivity: 'lastActivity',
  createdAt: 'createdAt',
  isValid: 'isValid'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  userId: 'userId',
  action: 'action',
  module: 'module',
  recordId: 'recordId',
  recordType: 'recordType',
  oldValue: 'oldValue',
  newValue: 'newValue',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  timestamp: 'timestamp'
};

exports.Prisma.ApprovalRequestScalarFieldEnum = {
  id: 'id',
  requesterId: 'requesterId',
  approverId: 'approverId',
  module: 'module',
  action: 'action',
  recordId: 'recordId',
  recordType: 'recordType',
  reason: 'reason',
  status: 'status',
  approvedAt: 'approvedAt',
  rejectedAt: 'rejectedAt',
  comments: 'comments',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FinancialPeriodScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  year: 'year',
  month: 'month',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  accountingLocked: 'accountingLocked',
  accountingLockedAt: 'accountingLockedAt',
  accountingLockedById: 'accountingLockedById',
  isYearEndClosed: 'isYearEndClosed',
  lastUnlockReason: 'lastUnlockReason',
  lastUnlockedAt: 'lastUnlockedAt',
  lastUnlockedById: 'lastUnlockedById',
  periodEnd: 'periodEnd',
  periodStart: 'periodStart',
  vatLocked: 'vatLocked',
  vatLockedAt: 'vatLockedAt',
  vatLockedById: 'vatLockedById',
  yearEndClosedAt: 'yearEndClosedAt',
  yearEndClosedById: 'yearEndClosedById'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  invoiceNo: 'invoiceNo',
  date: 'date',
  companyId: 'companyId',
  branchId: 'branchId',
  customerId: 'customerId',
  customerName: 'customerName',
  agentId: 'agentId',
  subtotal: 'subtotal',
  tax: 'tax',
  discount: 'discount',
  total: 'total',
  paidAmount: 'paidAmount',
  balance: 'balance',
  paymentMethod: 'paymentMethod',
  paymentRef: 'paymentRef',
  bankName: 'bankName',
  status: 'status',
  govtFeeAccountId: 'govtFeeAccountId',
  govtFeeRef: 'govtFeeRef',
  customerPhone: 'customerPhone',
  customerEmail: 'customerEmail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  quotationId: 'quotationId'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  branchId: 'branchId',
  invoiceId: 'invoiceId',
  invNo: 'invNo',
  date: 'date',
  enteredById: 'enteredById',
  beneficiaryId: 'beneficiaryId',
  partnerId: 'partnerId',
  workTypeId: 'workTypeId',
  govFee: 'govFee',
  typingCharge: 'typingCharge',
  vat: 'vat',
  total: 'total',
  type: 'type',
  receiptNo: 'receiptNo',
  govtFeeAccountId: 'govtFeeAccountId',
  govtFeeRef: 'govtFeeRef',
  paymentMethod: 'paymentMethod',
  cardId: 'cardId',
  transactionId: 'transactionId',
  status: 'status',
  advanceStatus: 'advanceStatus',
  advanceAmount: 'advanceAmount',
  customerName: 'customerName',
  applicantName: 'applicantName',
  details: 'details',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isVatApplicable: 'isVatApplicable',
  vatRate: 'vatRate',
  quantity: 'quantity'
};

exports.Prisma.WorkTypeScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  description: 'description',
  presetGovFee: 'presetGovFee',
  presetTypingCharge: 'presetTypingCharge',
  vatApplicable: 'vatApplicable',
  vatRate: 'vatRate'
};

exports.Prisma.BeneficiaryScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  details: 'details',
  phone: 'phone',
  email: 'email',
  partnerId: 'partnerId'
};

exports.Prisma.PartnerScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  type: 'type',
  email: 'email',
  phone: 'phone'
};

exports.Prisma.ExpenseScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  branchId: 'branchId',
  date: 'date',
  description: 'description',
  amount: 'amount',
  categoryId: 'categoryId',
  paymentMethod: 'paymentMethod',
  accountId: 'accountId',
  enteredById: 'enteredById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExpenseCategoryScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  description: 'description',
  ledgerAccountId: 'ledgerAccountId'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  type: 'type',
  balance: 'balance',
  accountNumber: 'accountNumber',
  bankName: 'bankName',
  branchId: 'branchId',
  category: 'category',
  code: 'code',
  iban: 'iban',
  isPostable: 'isPostable',
  isSystem: 'isSystem',
  linkedBranchIds: 'linkedBranchIds',
  merchantId: 'merchantId',
  parentAccountId: 'parentAccountId',
  swiftCode: 'swiftCode',
  terminalId: 'terminalId'
};

exports.Prisma.JournalEntryScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  branchId: 'branchId',
  postingDate: 'postingDate',
  createdAt: 'createdAt',
  description: 'description',
  type: 'type',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  reversedEntryId: 'reversedEntryId'
};

exports.Prisma.LedgerTransactionScalarFieldEnum = {
  id: 'id',
  journalEntryId: 'journalEntryId',
  accountId: 'accountId',
  debit: 'debit',
  credit: 'credit',
  partnerId: 'partnerId',
  companyId: 'companyId',
  branchId: 'branchId',
  cardId: 'cardId'
};

exports.Prisma.VoucherScalarFieldEnum = {
  id: 'id',
  voucherNo: 'voucherNo',
  date: 'date',
  companyId: 'companyId',
  branchId: 'branchId',
  description: 'description',
  vendorId: 'vendorId',
  vendorName: 'vendorName',
  total: 'total',
  paidAmount: 'paidAmount',
  balance: 'balance',
  status: 'status',
  type: 'type',
  paymentMethod: 'paymentMethod',
  accountId: 'accountId',
  enteredById: 'enteredById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  billUrl: 'billUrl'
};

exports.Prisma.VoucherItemScalarFieldEnum = {
  id: 'id',
  voucherId: 'voucherId',
  categoryId: 'categoryId',
  quantity: 'quantity',
  amount: 'amount',
  description: 'description',
  isVatApplicable: 'isVatApplicable',
  vatAmount: 'vatAmount',
  vatRate: 'vatRate'
};

exports.Prisma.VendorScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  phone: 'phone',
  email: 'email',
  address: 'address',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VoucherPaymentScalarFieldEnum = {
  id: 'id',
  voucherId: 'voucherId',
  date: 'date',
  amount: 'amount',
  paymentMethod: 'paymentMethod',
  accountId: 'accountId',
  receiptNo: 'receiptNo',
  enteredById: 'enteredById',
  createdAt: 'createdAt',
  companyId: 'companyId'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.BusinessCardScalarFieldEnum = {
  id: 'id',
  companyId: 'companyId',
  name: 'name',
  type: 'type',
  issuingBank: 'issuingBank',
  last4Digits: 'last4Digits',
  creditLimit: 'creditLimit',
  currency: 'currency',
  statementCycleDay: 'statementCycleDay',
  paymentDueDays: 'paymentDueDays',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  ledgerAccountId: 'ledgerAccountId'
};

exports.Prisma.QuotationScalarFieldEnum = {
  id: 'id',
  quotationNo: 'quotationNo',
  date: 'date',
  validUntil: 'validUntil',
  companyId: 'companyId',
  branchId: 'branchId',
  partnerId: 'partnerId',
  beneficiaryName: 'beneficiaryName',
  salespersonId: 'salespersonId',
  currency: 'currency',
  status: 'status',
  subtotal: 'subtotal',
  totalGovFee: 'totalGovFee',
  totalTax: 'totalTax',
  grandTotal: 'grandTotal',
  notes: 'notes',
  termsAndConditions: 'termsAndConditions',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  sentAt: 'sentAt',
  acceptedAt: 'acceptedAt',
  convertedAt: 'convertedAt',
  approvedById: 'approvedById',
  approvedAt: 'approvedAt',
  invoicedAmount: 'invoicedAmount',
  deletedAt: 'deletedAt'
};

exports.Prisma.QuotationItemScalarFieldEnum = {
  id: 'id',
  quotationId: 'quotationId',
  workTypeId: 'workTypeId',
  description: 'description',
  govFee: 'govFee',
  typingCharge: 'typingCharge',
  taxRate: 'taxRate',
  taxAmount: 'taxAmount',
  total: 'total',
  isVatApplicable: 'isVatApplicable',
  quantity: 'quantity'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.AccountingMethod = exports.$Enums.AccountingMethod = {
  ACCRUAL: 'ACCRUAL',
  CASH: 'CASH'
};

exports.AccountingModel = exports.$Enums.AccountingModel = {
  CONSOLIDATED: 'CONSOLIDATED',
  BRANCH_WISE: 'BRANCH_WISE'
};

exports.Emirate = exports.$Enums.Emirate = {
  DUBAI: 'DUBAI',
  ABU_DHABI: 'ABU_DHABI',
  SHARJAH: 'SHARJAH',
  AJMAN: 'AJMAN',
  UMM_AL_QUWAIN: 'UMM_AL_QUWAIN',
  RAS_AL_KHAIMAH: 'RAS_AL_KHAIMAH',
  FUJAIRAH: 'FUJAIRAH'
};

exports.LegalType = exports.$Enums.LegalType = {
  SOLE_ESTABLISHMENT: 'SOLE_ESTABLISHMENT',
  LLC: 'LLC',
  CIVIL_COMPANY: 'CIVIL_COMPANY',
  FREEZONE_ENTITY: 'FREEZONE_ENTITY',
  BRANCH_OF_FOREIGN: 'BRANCH_OF_FOREIGN'
};

exports.VatFrequency = exports.$Enums.VatFrequency = {
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY'
};

exports.ClosingStatus = exports.$Enums.ClosingStatus = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
};

exports.BranchType = exports.$Enums.BranchType = {
  MAIN: 'MAIN',
  SUB: 'SUB'
};

exports.UserRole_Legacy = exports.$Enums.UserRole_Legacy = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  BRANCH_MANAGER: 'BRANCH_MANAGER',
  OWNER: 'OWNER',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

exports.ApprovalStatus = exports.$Enums.ApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  CASH: 'CASH',
  CARD: 'CARD',
  ONLINE: 'ONLINE',
  WALLET: 'WALLET'
};

exports.InvoiceStatus = exports.$Enums.InvoiceStatus = {
  DRAFT: 'DRAFT',
  PAID: 'PAID',
  PARTIAL: 'PARTIAL',
  CANCELLED: 'CANCELLED'
};

exports.TransactionType = exports.$Enums.TransactionType = {
  SERVICE: 'SERVICE',
  PAYMENT: 'PAYMENT',
  OPENING_BALANCE: 'OPENING_BALANCE'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PAID: 'PAID',
  NOT_PAID: 'NOT_PAID',
  PARTIAL: 'PARTIAL'
};

exports.AdvanceStatus = exports.$Enums.AdvanceStatus = {
  NONE: 'NONE',
  PARTIAL: 'PARTIAL',
  FULL: 'FULL'
};

exports.PartnerType = exports.$Enums.PartnerType = {
  PRO: 'PRO',
  CORPORATE: 'CORPORATE',
  INDIVIDUAL: 'INDIVIDUAL'
};

exports.AccountType = exports.$Enums.AccountType = {
  CASH: 'CASH',
  BANK: 'BANK',
  CREDIT_CARD: 'CREDIT_CARD'
};

exports.AccountCategory = exports.$Enums.AccountCategory = {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
  EQUITY: 'EQUITY',
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE'
};

exports.JournalEntryType = exports.$Enums.JournalEntryType = {
  INVOICE: 'INVOICE',
  PAYMENT: 'PAYMENT',
  EXPENSE: 'EXPENSE',
  GOVT_FEE: 'GOVT_FEE',
  ADJUSTMENT: 'ADJUSTMENT',
  REVERSAL: 'REVERSAL'
};

exports.VoucherStatus = exports.$Enums.VoucherStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

exports.VoucherType = exports.$Enums.VoucherType = {
  PAYMENT: 'PAYMENT',
  RECEIPT: 'RECEIPT'
};

exports.CardType = exports.$Enums.CardType = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

exports.QuotationStatus = exports.$Enums.QuotationStatus = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  ACCEPTED: 'ACCEPTED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  CONVERTED: 'CONVERTED',
  PARTIALLY_INVOICED: 'PARTIALLY_INVOICED'
};

exports.Prisma.ModelName = {
  Company: 'Company',
  DailyClosing: 'DailyClosing',
  Branch: 'Branch',
  Role: 'Role',
  Permission: 'Permission',
  RolePermission: 'RolePermission',
  UserRole: 'UserRole',
  User: 'User',
  Session: 'Session',
  AuditLog: 'AuditLog',
  ApprovalRequest: 'ApprovalRequest',
  FinancialPeriod: 'FinancialPeriod',
  Invoice: 'Invoice',
  Transaction: 'Transaction',
  WorkType: 'WorkType',
  Beneficiary: 'Beneficiary',
  Partner: 'Partner',
  Expense: 'Expense',
  ExpenseCategory: 'ExpenseCategory',
  Account: 'Account',
  JournalEntry: 'JournalEntry',
  LedgerTransaction: 'LedgerTransaction',
  Voucher: 'Voucher',
  VoucherItem: 'VoucherItem',
  Vendor: 'Vendor',
  VoucherPayment: 'VoucherPayment',
  PasswordResetToken: 'PasswordResetToken',
  BusinessCard: 'BusinessCard',
  Quotation: 'Quotation',
  QuotationItem: 'QuotationItem'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
