
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

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  invoiceNo: 'invoiceNo',
  date: 'date',
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
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
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
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkTypeScalarFieldEnum = {
  id: 'id',
  description: 'description',
  presetGovFee: 'presetGovFee',
  presetTypingCharge: 'presetTypingCharge'
};

exports.Prisma.BeneficiaryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  details: 'details',
  phone: 'phone',
  email: 'email',
  partnerId: 'partnerId'
};

exports.Prisma.PartnerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  liabilities: 'liabilities'
};

exports.Prisma.ExpenseScalarFieldEnum = {
  id: 'id',
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
  name: 'name',
  description: 'description'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  balance: 'balance'
};

exports.Prisma.VoucherScalarFieldEnum = {
  id: 'id',
  voucherNo: 'voucherNo',
  date: 'date',
  description: 'description',
  vendorId: 'vendorId',
  vendorName: 'vendorName',
  total: 'total',
  paidAmount: 'paidAmount',
  balance: 'balance',
  status: 'status',
  paymentMethod: 'paymentMethod',
  accountId: 'accountId',
  enteredById: 'enteredById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VoucherItemScalarFieldEnum = {
  id: 'id',
  voucherId: 'voucherId',
  categoryId: 'categoryId',
  amount: 'amount',
  description: 'description'
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
exports.UserRole = exports.$Enums.UserRole = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  CASH: 'CASH',
  CARD: 'CARD',
  ONLINE: 'ONLINE'
};

exports.InvoiceStatus = exports.$Enums.InvoiceStatus = {
  DRAFT: 'DRAFT',
  PAID: 'PAID',
  PARTIAL: 'PARTIAL',
  CANCELLED: 'CANCELLED'
};

exports.TransactionType = exports.$Enums.TransactionType = {
  SERVICE: 'SERVICE',
  PAYMENT: 'PAYMENT'
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
  INDIVIDUAL: 'INDIVIDUAL',
  VENDOR: 'VENDOR'
};

exports.AccountType = exports.$Enums.AccountType = {
  CASH: 'CASH',
  BANK: 'BANK',
  CREDIT_CARD: 'CREDIT_CARD'
};

exports.VoucherStatus = exports.$Enums.VoucherStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Invoice: 'Invoice',
  Transaction: 'Transaction',
  WorkType: 'WorkType',
  Beneficiary: 'Beneficiary',
  Partner: 'Partner',
  Expense: 'Expense',
  ExpenseCategory: 'ExpenseCategory',
  Account: 'Account',
  Voucher: 'Voucher',
  VoucherItem: 'VoucherItem'
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
