
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model WorkType
 * 
 */
export type WorkType = $Result.DefaultSelection<Prisma.$WorkTypePayload>
/**
 * Model Beneficiary
 * 
 */
export type Beneficiary = $Result.DefaultSelection<Prisma.$BeneficiaryPayload>
/**
 * Model Partner
 * 
 */
export type Partner = $Result.DefaultSelection<Prisma.$PartnerPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model ExpenseCategory
 * 
 */
export type ExpenseCategory = $Result.DefaultSelection<Prisma.$ExpenseCategoryPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Voucher
 * 
 */
export type Voucher = $Result.DefaultSelection<Prisma.$VoucherPayload>
/**
 * Model VoucherItem
 * 
 */
export type VoucherItem = $Result.DefaultSelection<Prisma.$VoucherItemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const PaymentMethod: {
  CASH: 'CASH',
  CARD: 'CARD',
  ONLINE: 'ONLINE'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const InvoiceStatus: {
  DRAFT: 'DRAFT',
  PAID: 'PAID',
  PARTIAL: 'PARTIAL',
  CANCELLED: 'CANCELLED'
};

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]


export const TransactionType: {
  SERVICE: 'SERVICE',
  PAYMENT: 'PAYMENT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const PaymentStatus: {
  PAID: 'PAID',
  NOT_PAID: 'NOT_PAID',
  PARTIAL: 'PARTIAL'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const AdvanceStatus: {
  NONE: 'NONE',
  PARTIAL: 'PARTIAL',
  FULL: 'FULL'
};

export type AdvanceStatus = (typeof AdvanceStatus)[keyof typeof AdvanceStatus]


export const PartnerType: {
  PRO: 'PRO',
  CORPORATE: 'CORPORATE',
  INDIVIDUAL: 'INDIVIDUAL',
  VENDOR: 'VENDOR'
};

export type PartnerType = (typeof PartnerType)[keyof typeof PartnerType]


export const AccountType: {
  CASH: 'CASH',
  BANK: 'BANK',
  CREDIT_CARD: 'CREDIT_CARD'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]


export const VoucherStatus: {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED'
};

export type VoucherStatus = (typeof VoucherStatus)[keyof typeof VoucherStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type InvoiceStatus = $Enums.InvoiceStatus

export const InvoiceStatus: typeof $Enums.InvoiceStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type AdvanceStatus = $Enums.AdvanceStatus

export const AdvanceStatus: typeof $Enums.AdvanceStatus

export type PartnerType = $Enums.PartnerType

export const PartnerType: typeof $Enums.PartnerType

export type AccountType = $Enums.AccountType

export const AccountType: typeof $Enums.AccountType

export type VoucherStatus = $Enums.VoucherStatus

export const VoucherStatus: typeof $Enums.VoucherStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs>;

  /**
   * `prisma.workType`: Exposes CRUD operations for the **WorkType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkTypes
    * const workTypes = await prisma.workType.findMany()
    * ```
    */
  get workType(): Prisma.WorkTypeDelegate<ExtArgs>;

  /**
   * `prisma.beneficiary`: Exposes CRUD operations for the **Beneficiary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Beneficiaries
    * const beneficiaries = await prisma.beneficiary.findMany()
    * ```
    */
  get beneficiary(): Prisma.BeneficiaryDelegate<ExtArgs>;

  /**
   * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partners
    * const partners = await prisma.partner.findMany()
    * ```
    */
  get partner(): Prisma.PartnerDelegate<ExtArgs>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs>;

  /**
   * `prisma.expenseCategory`: Exposes CRUD operations for the **ExpenseCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseCategories
    * const expenseCategories = await prisma.expenseCategory.findMany()
    * ```
    */
  get expenseCategory(): Prisma.ExpenseCategoryDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.voucher`: Exposes CRUD operations for the **Voucher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vouchers
    * const vouchers = await prisma.voucher.findMany()
    * ```
    */
  get voucher(): Prisma.VoucherDelegate<ExtArgs>;

  /**
   * `prisma.voucherItem`: Exposes CRUD operations for the **VoucherItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VoucherItems
    * const voucherItems = await prisma.voucherItem.findMany()
    * ```
    */
  get voucherItem(): Prisma.VoucherItemDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "invoice" | "transaction" | "workType" | "beneficiary" | "partner" | "expense" | "expenseCategory" | "account" | "voucher" | "voucherItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      WorkType: {
        payload: Prisma.$WorkTypePayload<ExtArgs>
        fields: Prisma.WorkTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>
          }
          findFirst: {
            args: Prisma.WorkTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>
          }
          findMany: {
            args: Prisma.WorkTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>[]
          }
          create: {
            args: Prisma.WorkTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>
          }
          createMany: {
            args: Prisma.WorkTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>[]
          }
          delete: {
            args: Prisma.WorkTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>
          }
          update: {
            args: Prisma.WorkTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>
          }
          deleteMany: {
            args: Prisma.WorkTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkTypePayload>
          }
          aggregate: {
            args: Prisma.WorkTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkType>
          }
          groupBy: {
            args: Prisma.WorkTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkTypeCountArgs<ExtArgs>
            result: $Utils.Optional<WorkTypeCountAggregateOutputType> | number
          }
        }
      }
      Beneficiary: {
        payload: Prisma.$BeneficiaryPayload<ExtArgs>
        fields: Prisma.BeneficiaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BeneficiaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BeneficiaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          findFirst: {
            args: Prisma.BeneficiaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BeneficiaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          findMany: {
            args: Prisma.BeneficiaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>[]
          }
          create: {
            args: Prisma.BeneficiaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          createMany: {
            args: Prisma.BeneficiaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BeneficiaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>[]
          }
          delete: {
            args: Prisma.BeneficiaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          update: {
            args: Prisma.BeneficiaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          deleteMany: {
            args: Prisma.BeneficiaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BeneficiaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BeneficiaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          aggregate: {
            args: Prisma.BeneficiaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBeneficiary>
          }
          groupBy: {
            args: Prisma.BeneficiaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<BeneficiaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.BeneficiaryCountArgs<ExtArgs>
            result: $Utils.Optional<BeneficiaryCountAggregateOutputType> | number
          }
        }
      }
      Partner: {
        payload: Prisma.$PartnerPayload<ExtArgs>
        fields: Prisma.PartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findFirst: {
            args: Prisma.PartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findMany: {
            args: Prisma.PartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          create: {
            args: Prisma.PartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          createMany: {
            args: Prisma.PartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          delete: {
            args: Prisma.PartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          update: {
            args: Prisma.PartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          deleteMany: {
            args: Prisma.PartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          aggregate: {
            args: Prisma.PartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartner>
          }
          groupBy: {
            args: Prisma.PartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      ExpenseCategory: {
        payload: Prisma.$ExpenseCategoryPayload<ExtArgs>
        fields: Prisma.ExpenseCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findFirst: {
            args: Prisma.ExpenseCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findMany: {
            args: Prisma.ExpenseCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          create: {
            args: Prisma.ExpenseCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          createMany: {
            args: Prisma.ExpenseCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          delete: {
            args: Prisma.ExpenseCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          update: {
            args: Prisma.ExpenseCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ExpenseCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExpenseCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          aggregate: {
            args: Prisma.ExpenseCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenseCategory>
          }
          groupBy: {
            args: Prisma.ExpenseCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Voucher: {
        payload: Prisma.$VoucherPayload<ExtArgs>
        fields: Prisma.VoucherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoucherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoucherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          findFirst: {
            args: Prisma.VoucherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoucherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          findMany: {
            args: Prisma.VoucherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          create: {
            args: Prisma.VoucherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          createMany: {
            args: Prisma.VoucherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoucherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          delete: {
            args: Prisma.VoucherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          update: {
            args: Prisma.VoucherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          deleteMany: {
            args: Prisma.VoucherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoucherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VoucherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          aggregate: {
            args: Prisma.VoucherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoucher>
          }
          groupBy: {
            args: Prisma.VoucherGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoucherGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoucherCountArgs<ExtArgs>
            result: $Utils.Optional<VoucherCountAggregateOutputType> | number
          }
        }
      }
      VoucherItem: {
        payload: Prisma.$VoucherItemPayload<ExtArgs>
        fields: Prisma.VoucherItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoucherItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoucherItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>
          }
          findFirst: {
            args: Prisma.VoucherItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoucherItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>
          }
          findMany: {
            args: Prisma.VoucherItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>[]
          }
          create: {
            args: Prisma.VoucherItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>
          }
          createMany: {
            args: Prisma.VoucherItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoucherItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>[]
          }
          delete: {
            args: Prisma.VoucherItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>
          }
          update: {
            args: Prisma.VoucherItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>
          }
          deleteMany: {
            args: Prisma.VoucherItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoucherItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VoucherItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherItemPayload>
          }
          aggregate: {
            args: Prisma.VoucherItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoucherItem>
          }
          groupBy: {
            args: Prisma.VoucherItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoucherItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoucherItemCountArgs<ExtArgs>
            result: $Utils.Optional<VoucherItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    transactions: number
    expenses: number
    invoices: number
    vouchers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    expenses?: boolean | UserCountOutputTypeCountExpensesArgs
    invoices?: boolean | UserCountOutputTypeCountInvoicesArgs
    vouchers?: boolean | UserCountOutputTypeCountVouchersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherWhereInput
  }


  /**
   * Count Type InvoiceCountOutputType
   */

  export type InvoiceCountOutputType = {
    transactions: number
  }

  export type InvoiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | InvoiceCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceCountOutputType
     */
    select?: InvoiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type WorkTypeCountOutputType
   */

  export type WorkTypeCountOutputType = {
    transactions: number
  }

  export type WorkTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WorkTypeCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * WorkTypeCountOutputType without action
   */
  export type WorkTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkTypeCountOutputType
     */
    select?: WorkTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkTypeCountOutputType without action
   */
  export type WorkTypeCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type BeneficiaryCountOutputType
   */

  export type BeneficiaryCountOutputType = {
    transactions: number
  }

  export type BeneficiaryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | BeneficiaryCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * BeneficiaryCountOutputType without action
   */
  export type BeneficiaryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryCountOutputType
     */
    select?: BeneficiaryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BeneficiaryCountOutputType without action
   */
  export type BeneficiaryCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type PartnerCountOutputType
   */

  export type PartnerCountOutputType = {
    beneficiaries: number
    transactions: number
    vouchers: number
  }

  export type PartnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beneficiaries?: boolean | PartnerCountOutputTypeCountBeneficiariesArgs
    transactions?: boolean | PartnerCountOutputTypeCountTransactionsArgs
    vouchers?: boolean | PartnerCountOutputTypeCountVouchersArgs
  }

  // Custom InputTypes
  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerCountOutputType
     */
    select?: PartnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountBeneficiariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeneficiaryWhereInput
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherWhereInput
  }


  /**
   * Count Type ExpenseCategoryCountOutputType
   */

  export type ExpenseCategoryCountOutputType = {
    expenses: number
    voucherItems: number
  }

  export type ExpenseCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | ExpenseCategoryCountOutputTypeCountExpensesArgs
    voucherItems?: boolean | ExpenseCategoryCountOutputTypeCountVoucherItemsArgs
  }

  // Custom InputTypes
  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategoryCountOutputType
     */
    select?: ExpenseCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeCountVoucherItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherItemWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    transactions: number
    expenses: number
    invoicesGovtFee: number
    transactionsGovtFee: number
    vouchers: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | AccountCountOutputTypeCountTransactionsArgs
    expenses?: boolean | AccountCountOutputTypeCountExpensesArgs
    invoicesGovtFee?: boolean | AccountCountOutputTypeCountInvoicesGovtFeeArgs
    transactionsGovtFee?: boolean | AccountCountOutputTypeCountTransactionsGovtFeeArgs
    vouchers?: boolean | AccountCountOutputTypeCountVouchersArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountInvoicesGovtFeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTransactionsGovtFeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherWhereInput
  }


  /**
   * Count Type VoucherCountOutputType
   */

  export type VoucherCountOutputType = {
    items: number
  }

  export type VoucherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | VoucherCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * VoucherCountOutputType without action
   */
  export type VoucherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherCountOutputType
     */
    select?: VoucherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VoucherCountOutputType without action
   */
  export type VoucherCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    role: $Enums.UserRole
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    invoices?: boolean | User$invoicesArgs<ExtArgs>
    vouchers?: boolean | User$vouchersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    expenses?: boolean | User$expensesArgs<ExtArgs>
    invoices?: boolean | User$invoicesArgs<ExtArgs>
    vouchers?: boolean | User$vouchersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      vouchers: Prisma.$VoucherPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      role: $Enums.UserRole
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
    expenses<T extends User$expensesArgs<ExtArgs> = {}>(args?: Subset<T, User$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany"> | Null>
    invoices<T extends User$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, User$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany"> | Null>
    vouchers<T extends User$vouchersArgs<ExtArgs> = {}>(args?: Subset<T, User$vouchersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.expenses
   */
  export type User$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * User.invoices
   */
  export type User$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * User.vouchers
   */
  export type User$vouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    where?: VoucherWhereInput
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    cursor?: VoucherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    subtotal: number | null
    tax: number | null
    discount: number | null
    total: number | null
    paidAmount: number | null
    balance: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    subtotal: number | null
    tax: number | null
    discount: number | null
    total: number | null
    paidAmount: number | null
    balance: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    invoiceNo: string | null
    date: Date | null
    customerId: string | null
    customerName: string | null
    agentId: string | null
    subtotal: number | null
    tax: number | null
    discount: number | null
    total: number | null
    paidAmount: number | null
    balance: number | null
    paymentMethod: $Enums.PaymentMethod | null
    paymentRef: string | null
    bankName: string | null
    status: $Enums.InvoiceStatus | null
    govtFeeAccountId: string | null
    govtFeeRef: string | null
    customerPhone: string | null
    customerEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    invoiceNo: string | null
    date: Date | null
    customerId: string | null
    customerName: string | null
    agentId: string | null
    subtotal: number | null
    tax: number | null
    discount: number | null
    total: number | null
    paidAmount: number | null
    balance: number | null
    paymentMethod: $Enums.PaymentMethod | null
    paymentRef: string | null
    bankName: string | null
    status: $Enums.InvoiceStatus | null
    govtFeeAccountId: string | null
    govtFeeRef: string | null
    customerPhone: string | null
    customerEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    invoiceNo: number
    date: number
    customerId: number
    customerName: number
    agentId: number
    subtotal: number
    tax: number
    discount: number
    total: number
    paidAmount: number
    balance: number
    paymentMethod: number
    paymentRef: number
    bankName: number
    status: number
    govtFeeAccountId: number
    govtFeeRef: number
    customerPhone: number
    customerEmail: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    subtotal?: true
    tax?: true
    discount?: true
    total?: true
    paidAmount?: true
    balance?: true
  }

  export type InvoiceSumAggregateInputType = {
    subtotal?: true
    tax?: true
    discount?: true
    total?: true
    paidAmount?: true
    balance?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    invoiceNo?: true
    date?: true
    customerId?: true
    customerName?: true
    agentId?: true
    subtotal?: true
    tax?: true
    discount?: true
    total?: true
    paidAmount?: true
    balance?: true
    paymentMethod?: true
    paymentRef?: true
    bankName?: true
    status?: true
    govtFeeAccountId?: true
    govtFeeRef?: true
    customerPhone?: true
    customerEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    invoiceNo?: true
    date?: true
    customerId?: true
    customerName?: true
    agentId?: true
    subtotal?: true
    tax?: true
    discount?: true
    total?: true
    paidAmount?: true
    balance?: true
    paymentMethod?: true
    paymentRef?: true
    bankName?: true
    status?: true
    govtFeeAccountId?: true
    govtFeeRef?: true
    customerPhone?: true
    customerEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    invoiceNo?: true
    date?: true
    customerId?: true
    customerName?: true
    agentId?: true
    subtotal?: true
    tax?: true
    discount?: true
    total?: true
    paidAmount?: true
    balance?: true
    paymentMethod?: true
    paymentRef?: true
    bankName?: true
    status?: true
    govtFeeAccountId?: true
    govtFeeRef?: true
    customerPhone?: true
    customerEmail?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    invoiceNo: string
    date: Date
    customerId: string | null
    customerName: string | null
    agentId: string | null
    subtotal: number
    tax: number
    discount: number
    total: number
    paidAmount: number
    balance: number
    paymentMethod: $Enums.PaymentMethod
    paymentRef: string | null
    bankName: string | null
    status: $Enums.InvoiceStatus
    govtFeeAccountId: string | null
    govtFeeRef: string | null
    customerPhone: string | null
    customerEmail: string | null
    createdAt: Date
    updatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNo?: boolean
    date?: boolean
    customerId?: boolean
    customerName?: boolean
    agentId?: boolean
    subtotal?: boolean
    tax?: boolean
    discount?: boolean
    total?: boolean
    paidAmount?: boolean
    balance?: boolean
    paymentMethod?: boolean
    paymentRef?: boolean
    bankName?: boolean
    status?: boolean
    govtFeeAccountId?: boolean
    govtFeeRef?: boolean
    customerPhone?: boolean
    customerEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | Invoice$agentArgs<ExtArgs>
    govtFeeAccount?: boolean | Invoice$govtFeeAccountArgs<ExtArgs>
    transactions?: boolean | Invoice$transactionsArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNo?: boolean
    date?: boolean
    customerId?: boolean
    customerName?: boolean
    agentId?: boolean
    subtotal?: boolean
    tax?: boolean
    discount?: boolean
    total?: boolean
    paidAmount?: boolean
    balance?: boolean
    paymentMethod?: boolean
    paymentRef?: boolean
    bankName?: boolean
    status?: boolean
    govtFeeAccountId?: boolean
    govtFeeRef?: boolean
    customerPhone?: boolean
    customerEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | Invoice$agentArgs<ExtArgs>
    govtFeeAccount?: boolean | Invoice$govtFeeAccountArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    invoiceNo?: boolean
    date?: boolean
    customerId?: boolean
    customerName?: boolean
    agentId?: boolean
    subtotal?: boolean
    tax?: boolean
    discount?: boolean
    total?: boolean
    paidAmount?: boolean
    balance?: boolean
    paymentMethod?: boolean
    paymentRef?: boolean
    bankName?: boolean
    status?: boolean
    govtFeeAccountId?: boolean
    govtFeeRef?: boolean
    customerPhone?: boolean
    customerEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | Invoice$agentArgs<ExtArgs>
    govtFeeAccount?: boolean | Invoice$govtFeeAccountArgs<ExtArgs>
    transactions?: boolean | Invoice$transactionsArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | Invoice$agentArgs<ExtArgs>
    govtFeeAccount?: boolean | Invoice$govtFeeAccountArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      agent: Prisma.$UserPayload<ExtArgs> | null
      govtFeeAccount: Prisma.$AccountPayload<ExtArgs> | null
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceNo: string
      date: Date
      customerId: string | null
      customerName: string | null
      agentId: string | null
      subtotal: number
      tax: number
      discount: number
      total: number
      paidAmount: number
      balance: number
      paymentMethod: $Enums.PaymentMethod
      paymentRef: string | null
      bankName: string | null
      status: $Enums.InvoiceStatus
      govtFeeAccountId: string | null
      govtFeeRef: string | null
      customerPhone: string | null
      customerEmail: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends Invoice$agentArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$agentArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    govtFeeAccount<T extends Invoice$govtFeeAccountArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$govtFeeAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    transactions<T extends Invoice$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */ 
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly invoiceNo: FieldRef<"Invoice", 'String'>
    readonly date: FieldRef<"Invoice", 'DateTime'>
    readonly customerId: FieldRef<"Invoice", 'String'>
    readonly customerName: FieldRef<"Invoice", 'String'>
    readonly agentId: FieldRef<"Invoice", 'String'>
    readonly subtotal: FieldRef<"Invoice", 'Float'>
    readonly tax: FieldRef<"Invoice", 'Float'>
    readonly discount: FieldRef<"Invoice", 'Float'>
    readonly total: FieldRef<"Invoice", 'Float'>
    readonly paidAmount: FieldRef<"Invoice", 'Float'>
    readonly balance: FieldRef<"Invoice", 'Float'>
    readonly paymentMethod: FieldRef<"Invoice", 'PaymentMethod'>
    readonly paymentRef: FieldRef<"Invoice", 'String'>
    readonly bankName: FieldRef<"Invoice", 'String'>
    readonly status: FieldRef<"Invoice", 'InvoiceStatus'>
    readonly govtFeeAccountId: FieldRef<"Invoice", 'String'>
    readonly govtFeeRef: FieldRef<"Invoice", 'String'>
    readonly customerPhone: FieldRef<"Invoice", 'String'>
    readonly customerEmail: FieldRef<"Invoice", 'String'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice.agent
   */
  export type Invoice$agentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Invoice.govtFeeAccount
   */
  export type Invoice$govtFeeAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Invoice.transactions
   */
  export type Invoice$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    govFee: number | null
    typingCharge: number | null
    vat: number | null
    total: number | null
    advanceAmount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    govFee: number | null
    typingCharge: number | null
    vat: number | null
    total: number | null
    advanceAmount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    invoiceId: string | null
    invNo: string | null
    date: Date | null
    enteredById: string | null
    beneficiaryId: string | null
    partnerId: string | null
    workTypeId: string | null
    govFee: number | null
    typingCharge: number | null
    vat: number | null
    total: number | null
    type: $Enums.TransactionType | null
    receiptNo: string | null
    govtFeeAccountId: string | null
    govtFeeRef: string | null
    paymentMethod: $Enums.PaymentMethod | null
    cardId: string | null
    transactionId: string | null
    status: $Enums.PaymentStatus | null
    advanceStatus: $Enums.AdvanceStatus | null
    advanceAmount: number | null
    customerName: string | null
    applicantName: string | null
    details: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    invoiceId: string | null
    invNo: string | null
    date: Date | null
    enteredById: string | null
    beneficiaryId: string | null
    partnerId: string | null
    workTypeId: string | null
    govFee: number | null
    typingCharge: number | null
    vat: number | null
    total: number | null
    type: $Enums.TransactionType | null
    receiptNo: string | null
    govtFeeAccountId: string | null
    govtFeeRef: string | null
    paymentMethod: $Enums.PaymentMethod | null
    cardId: string | null
    transactionId: string | null
    status: $Enums.PaymentStatus | null
    advanceStatus: $Enums.AdvanceStatus | null
    advanceAmount: number | null
    customerName: string | null
    applicantName: string | null
    details: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    invoiceId: number
    invNo: number
    date: number
    enteredById: number
    beneficiaryId: number
    partnerId: number
    workTypeId: number
    govFee: number
    typingCharge: number
    vat: number
    total: number
    type: number
    receiptNo: number
    govtFeeAccountId: number
    govtFeeRef: number
    paymentMethod: number
    cardId: number
    transactionId: number
    status: number
    advanceStatus: number
    advanceAmount: number
    customerName: number
    applicantName: number
    details: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    govFee?: true
    typingCharge?: true
    vat?: true
    total?: true
    advanceAmount?: true
  }

  export type TransactionSumAggregateInputType = {
    govFee?: true
    typingCharge?: true
    vat?: true
    total?: true
    advanceAmount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    invoiceId?: true
    invNo?: true
    date?: true
    enteredById?: true
    beneficiaryId?: true
    partnerId?: true
    workTypeId?: true
    govFee?: true
    typingCharge?: true
    vat?: true
    total?: true
    type?: true
    receiptNo?: true
    govtFeeAccountId?: true
    govtFeeRef?: true
    paymentMethod?: true
    cardId?: true
    transactionId?: true
    status?: true
    advanceStatus?: true
    advanceAmount?: true
    customerName?: true
    applicantName?: true
    details?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    invoiceId?: true
    invNo?: true
    date?: true
    enteredById?: true
    beneficiaryId?: true
    partnerId?: true
    workTypeId?: true
    govFee?: true
    typingCharge?: true
    vat?: true
    total?: true
    type?: true
    receiptNo?: true
    govtFeeAccountId?: true
    govtFeeRef?: true
    paymentMethod?: true
    cardId?: true
    transactionId?: true
    status?: true
    advanceStatus?: true
    advanceAmount?: true
    customerName?: true
    applicantName?: true
    details?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    invoiceId?: true
    invNo?: true
    date?: true
    enteredById?: true
    beneficiaryId?: true
    partnerId?: true
    workTypeId?: true
    govFee?: true
    typingCharge?: true
    vat?: true
    total?: true
    type?: true
    receiptNo?: true
    govtFeeAccountId?: true
    govtFeeRef?: true
    paymentMethod?: true
    cardId?: true
    transactionId?: true
    status?: true
    advanceStatus?: true
    advanceAmount?: true
    customerName?: true
    applicantName?: true
    details?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    invoiceId: string | null
    invNo: string | null
    date: Date
    enteredById: string | null
    beneficiaryId: string | null
    partnerId: string | null
    workTypeId: string | null
    govFee: number
    typingCharge: number
    vat: number
    total: number
    type: $Enums.TransactionType
    receiptNo: string | null
    govtFeeAccountId: string | null
    govtFeeRef: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId: string | null
    transactionId: string | null
    status: $Enums.PaymentStatus
    advanceStatus: $Enums.AdvanceStatus
    advanceAmount: number
    customerName: string | null
    applicantName: string | null
    details: string | null
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    invNo?: boolean
    date?: boolean
    enteredById?: boolean
    beneficiaryId?: boolean
    partnerId?: boolean
    workTypeId?: boolean
    govFee?: boolean
    typingCharge?: boolean
    vat?: boolean
    total?: boolean
    type?: boolean
    receiptNo?: boolean
    govtFeeAccountId?: boolean
    govtFeeRef?: boolean
    paymentMethod?: boolean
    cardId?: boolean
    transactionId?: boolean
    status?: boolean
    advanceStatus?: boolean
    advanceAmount?: boolean
    customerName?: boolean
    applicantName?: boolean
    details?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | Transaction$invoiceArgs<ExtArgs>
    enteredBy?: boolean | Transaction$enteredByArgs<ExtArgs>
    beneficiary?: boolean | Transaction$beneficiaryArgs<ExtArgs>
    partner?: boolean | Transaction$partnerArgs<ExtArgs>
    workType?: boolean | Transaction$workTypeArgs<ExtArgs>
    govtFeeAccount?: boolean | Transaction$govtFeeAccountArgs<ExtArgs>
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    invNo?: boolean
    date?: boolean
    enteredById?: boolean
    beneficiaryId?: boolean
    partnerId?: boolean
    workTypeId?: boolean
    govFee?: boolean
    typingCharge?: boolean
    vat?: boolean
    total?: boolean
    type?: boolean
    receiptNo?: boolean
    govtFeeAccountId?: boolean
    govtFeeRef?: boolean
    paymentMethod?: boolean
    cardId?: boolean
    transactionId?: boolean
    status?: boolean
    advanceStatus?: boolean
    advanceAmount?: boolean
    customerName?: boolean
    applicantName?: boolean
    details?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | Transaction$invoiceArgs<ExtArgs>
    enteredBy?: boolean | Transaction$enteredByArgs<ExtArgs>
    beneficiary?: boolean | Transaction$beneficiaryArgs<ExtArgs>
    partner?: boolean | Transaction$partnerArgs<ExtArgs>
    workType?: boolean | Transaction$workTypeArgs<ExtArgs>
    govtFeeAccount?: boolean | Transaction$govtFeeAccountArgs<ExtArgs>
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    invoiceId?: boolean
    invNo?: boolean
    date?: boolean
    enteredById?: boolean
    beneficiaryId?: boolean
    partnerId?: boolean
    workTypeId?: boolean
    govFee?: boolean
    typingCharge?: boolean
    vat?: boolean
    total?: boolean
    type?: boolean
    receiptNo?: boolean
    govtFeeAccountId?: boolean
    govtFeeRef?: boolean
    paymentMethod?: boolean
    cardId?: boolean
    transactionId?: boolean
    status?: boolean
    advanceStatus?: boolean
    advanceAmount?: boolean
    customerName?: boolean
    applicantName?: boolean
    details?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | Transaction$invoiceArgs<ExtArgs>
    enteredBy?: boolean | Transaction$enteredByArgs<ExtArgs>
    beneficiary?: boolean | Transaction$beneficiaryArgs<ExtArgs>
    partner?: boolean | Transaction$partnerArgs<ExtArgs>
    workType?: boolean | Transaction$workTypeArgs<ExtArgs>
    govtFeeAccount?: boolean | Transaction$govtFeeAccountArgs<ExtArgs>
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | Transaction$invoiceArgs<ExtArgs>
    enteredBy?: boolean | Transaction$enteredByArgs<ExtArgs>
    beneficiary?: boolean | Transaction$beneficiaryArgs<ExtArgs>
    partner?: boolean | Transaction$partnerArgs<ExtArgs>
    workType?: boolean | Transaction$workTypeArgs<ExtArgs>
    govtFeeAccount?: boolean | Transaction$govtFeeAccountArgs<ExtArgs>
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      invoice: Prisma.$InvoicePayload<ExtArgs> | null
      enteredBy: Prisma.$UserPayload<ExtArgs> | null
      beneficiary: Prisma.$BeneficiaryPayload<ExtArgs> | null
      partner: Prisma.$PartnerPayload<ExtArgs> | null
      workType: Prisma.$WorkTypePayload<ExtArgs> | null
      govtFeeAccount: Prisma.$AccountPayload<ExtArgs> | null
      account: Prisma.$AccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceId: string | null
      invNo: string | null
      date: Date
      enteredById: string | null
      beneficiaryId: string | null
      partnerId: string | null
      workTypeId: string | null
      govFee: number
      typingCharge: number
      vat: number
      total: number
      type: $Enums.TransactionType
      receiptNo: string | null
      govtFeeAccountId: string | null
      govtFeeRef: string | null
      paymentMethod: $Enums.PaymentMethod
      cardId: string | null
      transactionId: string | null
      status: $Enums.PaymentStatus
      advanceStatus: $Enums.AdvanceStatus
      advanceAmount: number
      customerName: string | null
      applicantName: string | null
      details: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice<T extends Transaction$invoiceArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$invoiceArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    enteredBy<T extends Transaction$enteredByArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$enteredByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    beneficiary<T extends Transaction$beneficiaryArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$beneficiaryArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    partner<T extends Transaction$partnerArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$partnerArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    workType<T extends Transaction$workTypeArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$workTypeArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    govtFeeAccount<T extends Transaction$govtFeeAccountArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$govtFeeAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    account<T extends Transaction$accountArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$accountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */ 
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly invoiceId: FieldRef<"Transaction", 'String'>
    readonly invNo: FieldRef<"Transaction", 'String'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly enteredById: FieldRef<"Transaction", 'String'>
    readonly beneficiaryId: FieldRef<"Transaction", 'String'>
    readonly partnerId: FieldRef<"Transaction", 'String'>
    readonly workTypeId: FieldRef<"Transaction", 'String'>
    readonly govFee: FieldRef<"Transaction", 'Float'>
    readonly typingCharge: FieldRef<"Transaction", 'Float'>
    readonly vat: FieldRef<"Transaction", 'Float'>
    readonly total: FieldRef<"Transaction", 'Float'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly receiptNo: FieldRef<"Transaction", 'String'>
    readonly govtFeeAccountId: FieldRef<"Transaction", 'String'>
    readonly govtFeeRef: FieldRef<"Transaction", 'String'>
    readonly paymentMethod: FieldRef<"Transaction", 'PaymentMethod'>
    readonly cardId: FieldRef<"Transaction", 'String'>
    readonly transactionId: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'PaymentStatus'>
    readonly advanceStatus: FieldRef<"Transaction", 'AdvanceStatus'>
    readonly advanceAmount: FieldRef<"Transaction", 'Float'>
    readonly customerName: FieldRef<"Transaction", 'String'>
    readonly applicantName: FieldRef<"Transaction", 'String'>
    readonly details: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
  }

  /**
   * Transaction.invoice
   */
  export type Transaction$invoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
  }

  /**
   * Transaction.enteredBy
   */
  export type Transaction$enteredByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Transaction.beneficiary
   */
  export type Transaction$beneficiaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    where?: BeneficiaryWhereInput
  }

  /**
   * Transaction.partner
   */
  export type Transaction$partnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    where?: PartnerWhereInput
  }

  /**
   * Transaction.workType
   */
  export type Transaction$workTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    where?: WorkTypeWhereInput
  }

  /**
   * Transaction.govtFeeAccount
   */
  export type Transaction$govtFeeAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Transaction.account
   */
  export type Transaction$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model WorkType
   */

  export type AggregateWorkType = {
    _count: WorkTypeCountAggregateOutputType | null
    _avg: WorkTypeAvgAggregateOutputType | null
    _sum: WorkTypeSumAggregateOutputType | null
    _min: WorkTypeMinAggregateOutputType | null
    _max: WorkTypeMaxAggregateOutputType | null
  }

  export type WorkTypeAvgAggregateOutputType = {
    presetGovFee: number | null
    presetTypingCharge: number | null
  }

  export type WorkTypeSumAggregateOutputType = {
    presetGovFee: number | null
    presetTypingCharge: number | null
  }

  export type WorkTypeMinAggregateOutputType = {
    id: string | null
    description: string | null
    presetGovFee: number | null
    presetTypingCharge: number | null
  }

  export type WorkTypeMaxAggregateOutputType = {
    id: string | null
    description: string | null
    presetGovFee: number | null
    presetTypingCharge: number | null
  }

  export type WorkTypeCountAggregateOutputType = {
    id: number
    description: number
    presetGovFee: number
    presetTypingCharge: number
    _all: number
  }


  export type WorkTypeAvgAggregateInputType = {
    presetGovFee?: true
    presetTypingCharge?: true
  }

  export type WorkTypeSumAggregateInputType = {
    presetGovFee?: true
    presetTypingCharge?: true
  }

  export type WorkTypeMinAggregateInputType = {
    id?: true
    description?: true
    presetGovFee?: true
    presetTypingCharge?: true
  }

  export type WorkTypeMaxAggregateInputType = {
    id?: true
    description?: true
    presetGovFee?: true
    presetTypingCharge?: true
  }

  export type WorkTypeCountAggregateInputType = {
    id?: true
    description?: true
    presetGovFee?: true
    presetTypingCharge?: true
    _all?: true
  }

  export type WorkTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkType to aggregate.
     */
    where?: WorkTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkTypes to fetch.
     */
    orderBy?: WorkTypeOrderByWithRelationInput | WorkTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkTypes
    **/
    _count?: true | WorkTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkTypeMaxAggregateInputType
  }

  export type GetWorkTypeAggregateType<T extends WorkTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkType[P]>
      : GetScalarType<T[P], AggregateWorkType[P]>
  }




  export type WorkTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkTypeWhereInput
    orderBy?: WorkTypeOrderByWithAggregationInput | WorkTypeOrderByWithAggregationInput[]
    by: WorkTypeScalarFieldEnum[] | WorkTypeScalarFieldEnum
    having?: WorkTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkTypeCountAggregateInputType | true
    _avg?: WorkTypeAvgAggregateInputType
    _sum?: WorkTypeSumAggregateInputType
    _min?: WorkTypeMinAggregateInputType
    _max?: WorkTypeMaxAggregateInputType
  }

  export type WorkTypeGroupByOutputType = {
    id: string
    description: string
    presetGovFee: number
    presetTypingCharge: number
    _count: WorkTypeCountAggregateOutputType | null
    _avg: WorkTypeAvgAggregateOutputType | null
    _sum: WorkTypeSumAggregateOutputType | null
    _min: WorkTypeMinAggregateOutputType | null
    _max: WorkTypeMaxAggregateOutputType | null
  }

  type GetWorkTypeGroupByPayload<T extends WorkTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkTypeGroupByOutputType[P]>
            : GetScalarType<T[P], WorkTypeGroupByOutputType[P]>
        }
      >
    >


  export type WorkTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    presetGovFee?: boolean
    presetTypingCharge?: boolean
    transactions?: boolean | WorkType$transactionsArgs<ExtArgs>
    _count?: boolean | WorkTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workType"]>

  export type WorkTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    presetGovFee?: boolean
    presetTypingCharge?: boolean
  }, ExtArgs["result"]["workType"]>

  export type WorkTypeSelectScalar = {
    id?: boolean
    description?: boolean
    presetGovFee?: boolean
    presetTypingCharge?: boolean
  }

  export type WorkTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WorkType$transactionsArgs<ExtArgs>
    _count?: boolean | WorkTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkType"
    objects: {
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      presetGovFee: number
      presetTypingCharge: number
    }, ExtArgs["result"]["workType"]>
    composites: {}
  }

  type WorkTypeGetPayload<S extends boolean | null | undefined | WorkTypeDefaultArgs> = $Result.GetResult<Prisma.$WorkTypePayload, S>

  type WorkTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkTypeCountAggregateInputType | true
    }

  export interface WorkTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkType'], meta: { name: 'WorkType' } }
    /**
     * Find zero or one WorkType that matches the filter.
     * @param {WorkTypeFindUniqueArgs} args - Arguments to find a WorkType
     * @example
     * // Get one WorkType
     * const workType = await prisma.workType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkTypeFindUniqueArgs>(args: SelectSubset<T, WorkTypeFindUniqueArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WorkType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkTypeFindUniqueOrThrowArgs} args - Arguments to find a WorkType
     * @example
     * // Get one WorkType
     * const workType = await prisma.workType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WorkType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkTypeFindFirstArgs} args - Arguments to find a WorkType
     * @example
     * // Get one WorkType
     * const workType = await prisma.workType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkTypeFindFirstArgs>(args?: SelectSubset<T, WorkTypeFindFirstArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WorkType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkTypeFindFirstOrThrowArgs} args - Arguments to find a WorkType
     * @example
     * // Get one WorkType
     * const workType = await prisma.workType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WorkTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkTypes
     * const workTypes = await prisma.workType.findMany()
     * 
     * // Get first 10 WorkTypes
     * const workTypes = await prisma.workType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workTypeWithIdOnly = await prisma.workType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkTypeFindManyArgs>(args?: SelectSubset<T, WorkTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WorkType.
     * @param {WorkTypeCreateArgs} args - Arguments to create a WorkType.
     * @example
     * // Create one WorkType
     * const WorkType = await prisma.workType.create({
     *   data: {
     *     // ... data to create a WorkType
     *   }
     * })
     * 
     */
    create<T extends WorkTypeCreateArgs>(args: SelectSubset<T, WorkTypeCreateArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WorkTypes.
     * @param {WorkTypeCreateManyArgs} args - Arguments to create many WorkTypes.
     * @example
     * // Create many WorkTypes
     * const workType = await prisma.workType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkTypeCreateManyArgs>(args?: SelectSubset<T, WorkTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkTypes and returns the data saved in the database.
     * @param {WorkTypeCreateManyAndReturnArgs} args - Arguments to create many WorkTypes.
     * @example
     * // Create many WorkTypes
     * const workType = await prisma.workType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkTypes and only return the `id`
     * const workTypeWithIdOnly = await prisma.workType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WorkType.
     * @param {WorkTypeDeleteArgs} args - Arguments to delete one WorkType.
     * @example
     * // Delete one WorkType
     * const WorkType = await prisma.workType.delete({
     *   where: {
     *     // ... filter to delete one WorkType
     *   }
     * })
     * 
     */
    delete<T extends WorkTypeDeleteArgs>(args: SelectSubset<T, WorkTypeDeleteArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WorkType.
     * @param {WorkTypeUpdateArgs} args - Arguments to update one WorkType.
     * @example
     * // Update one WorkType
     * const workType = await prisma.workType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkTypeUpdateArgs>(args: SelectSubset<T, WorkTypeUpdateArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WorkTypes.
     * @param {WorkTypeDeleteManyArgs} args - Arguments to filter WorkTypes to delete.
     * @example
     * // Delete a few WorkTypes
     * const { count } = await prisma.workType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkTypeDeleteManyArgs>(args?: SelectSubset<T, WorkTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkTypes
     * const workType = await prisma.workType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkTypeUpdateManyArgs>(args: SelectSubset<T, WorkTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkType.
     * @param {WorkTypeUpsertArgs} args - Arguments to update or create a WorkType.
     * @example
     * // Update or create a WorkType
     * const workType = await prisma.workType.upsert({
     *   create: {
     *     // ... data to create a WorkType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkType we want to update
     *   }
     * })
     */
    upsert<T extends WorkTypeUpsertArgs>(args: SelectSubset<T, WorkTypeUpsertArgs<ExtArgs>>): Prisma__WorkTypeClient<$Result.GetResult<Prisma.$WorkTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WorkTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkTypeCountArgs} args - Arguments to filter WorkTypes to count.
     * @example
     * // Count the number of WorkTypes
     * const count = await prisma.workType.count({
     *   where: {
     *     // ... the filter for the WorkTypes we want to count
     *   }
     * })
    **/
    count<T extends WorkTypeCountArgs>(
      args?: Subset<T, WorkTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkTypeAggregateArgs>(args: Subset<T, WorkTypeAggregateArgs>): Prisma.PrismaPromise<GetWorkTypeAggregateType<T>>

    /**
     * Group by WorkType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkTypeGroupByArgs['orderBy'] }
        : { orderBy?: WorkTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkType model
   */
  readonly fields: WorkTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends WorkType$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, WorkType$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkType model
   */ 
  interface WorkTypeFieldRefs {
    readonly id: FieldRef<"WorkType", 'String'>
    readonly description: FieldRef<"WorkType", 'String'>
    readonly presetGovFee: FieldRef<"WorkType", 'Float'>
    readonly presetTypingCharge: FieldRef<"WorkType", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * WorkType findUnique
   */
  export type WorkTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkType to fetch.
     */
    where: WorkTypeWhereUniqueInput
  }

  /**
   * WorkType findUniqueOrThrow
   */
  export type WorkTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkType to fetch.
     */
    where: WorkTypeWhereUniqueInput
  }

  /**
   * WorkType findFirst
   */
  export type WorkTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkType to fetch.
     */
    where?: WorkTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkTypes to fetch.
     */
    orderBy?: WorkTypeOrderByWithRelationInput | WorkTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkTypes.
     */
    cursor?: WorkTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkTypes.
     */
    distinct?: WorkTypeScalarFieldEnum | WorkTypeScalarFieldEnum[]
  }

  /**
   * WorkType findFirstOrThrow
   */
  export type WorkTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkType to fetch.
     */
    where?: WorkTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkTypes to fetch.
     */
    orderBy?: WorkTypeOrderByWithRelationInput | WorkTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkTypes.
     */
    cursor?: WorkTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkTypes.
     */
    distinct?: WorkTypeScalarFieldEnum | WorkTypeScalarFieldEnum[]
  }

  /**
   * WorkType findMany
   */
  export type WorkTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * Filter, which WorkTypes to fetch.
     */
    where?: WorkTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkTypes to fetch.
     */
    orderBy?: WorkTypeOrderByWithRelationInput | WorkTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkTypes.
     */
    cursor?: WorkTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkTypes.
     */
    skip?: number
    distinct?: WorkTypeScalarFieldEnum | WorkTypeScalarFieldEnum[]
  }

  /**
   * WorkType create
   */
  export type WorkTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkType.
     */
    data: XOR<WorkTypeCreateInput, WorkTypeUncheckedCreateInput>
  }

  /**
   * WorkType createMany
   */
  export type WorkTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkTypes.
     */
    data: WorkTypeCreateManyInput | WorkTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkType createManyAndReturn
   */
  export type WorkTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WorkTypes.
     */
    data: WorkTypeCreateManyInput | WorkTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkType update
   */
  export type WorkTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkType.
     */
    data: XOR<WorkTypeUpdateInput, WorkTypeUncheckedUpdateInput>
    /**
     * Choose, which WorkType to update.
     */
    where: WorkTypeWhereUniqueInput
  }

  /**
   * WorkType updateMany
   */
  export type WorkTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkTypes.
     */
    data: XOR<WorkTypeUpdateManyMutationInput, WorkTypeUncheckedUpdateManyInput>
    /**
     * Filter which WorkTypes to update
     */
    where?: WorkTypeWhereInput
  }

  /**
   * WorkType upsert
   */
  export type WorkTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkType to update in case it exists.
     */
    where: WorkTypeWhereUniqueInput
    /**
     * In case the WorkType found by the `where` argument doesn't exist, create a new WorkType with this data.
     */
    create: XOR<WorkTypeCreateInput, WorkTypeUncheckedCreateInput>
    /**
     * In case the WorkType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkTypeUpdateInput, WorkTypeUncheckedUpdateInput>
  }

  /**
   * WorkType delete
   */
  export type WorkTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
    /**
     * Filter which WorkType to delete.
     */
    where: WorkTypeWhereUniqueInput
  }

  /**
   * WorkType deleteMany
   */
  export type WorkTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkTypes to delete
     */
    where?: WorkTypeWhereInput
  }

  /**
   * WorkType.transactions
   */
  export type WorkType$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * WorkType without action
   */
  export type WorkTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkType
     */
    select?: WorkTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkTypeInclude<ExtArgs> | null
  }


  /**
   * Model Beneficiary
   */

  export type AggregateBeneficiary = {
    _count: BeneficiaryCountAggregateOutputType | null
    _min: BeneficiaryMinAggregateOutputType | null
    _max: BeneficiaryMaxAggregateOutputType | null
  }

  export type BeneficiaryMinAggregateOutputType = {
    id: string | null
    name: string | null
    details: string | null
    phone: string | null
    email: string | null
    partnerId: string | null
  }

  export type BeneficiaryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    details: string | null
    phone: string | null
    email: string | null
    partnerId: string | null
  }

  export type BeneficiaryCountAggregateOutputType = {
    id: number
    name: number
    details: number
    phone: number
    email: number
    partnerId: number
    _all: number
  }


  export type BeneficiaryMinAggregateInputType = {
    id?: true
    name?: true
    details?: true
    phone?: true
    email?: true
    partnerId?: true
  }

  export type BeneficiaryMaxAggregateInputType = {
    id?: true
    name?: true
    details?: true
    phone?: true
    email?: true
    partnerId?: true
  }

  export type BeneficiaryCountAggregateInputType = {
    id?: true
    name?: true
    details?: true
    phone?: true
    email?: true
    partnerId?: true
    _all?: true
  }

  export type BeneficiaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Beneficiary to aggregate.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Beneficiaries
    **/
    _count?: true | BeneficiaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BeneficiaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BeneficiaryMaxAggregateInputType
  }

  export type GetBeneficiaryAggregateType<T extends BeneficiaryAggregateArgs> = {
        [P in keyof T & keyof AggregateBeneficiary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBeneficiary[P]>
      : GetScalarType<T[P], AggregateBeneficiary[P]>
  }




  export type BeneficiaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeneficiaryWhereInput
    orderBy?: BeneficiaryOrderByWithAggregationInput | BeneficiaryOrderByWithAggregationInput[]
    by: BeneficiaryScalarFieldEnum[] | BeneficiaryScalarFieldEnum
    having?: BeneficiaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BeneficiaryCountAggregateInputType | true
    _min?: BeneficiaryMinAggregateInputType
    _max?: BeneficiaryMaxAggregateInputType
  }

  export type BeneficiaryGroupByOutputType = {
    id: string
    name: string
    details: string | null
    phone: string | null
    email: string | null
    partnerId: string | null
    _count: BeneficiaryCountAggregateOutputType | null
    _min: BeneficiaryMinAggregateOutputType | null
    _max: BeneficiaryMaxAggregateOutputType | null
  }

  type GetBeneficiaryGroupByPayload<T extends BeneficiaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BeneficiaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BeneficiaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BeneficiaryGroupByOutputType[P]>
            : GetScalarType<T[P], BeneficiaryGroupByOutputType[P]>
        }
      >
    >


  export type BeneficiarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    details?: boolean
    phone?: boolean
    email?: boolean
    partnerId?: boolean
    partner?: boolean | Beneficiary$partnerArgs<ExtArgs>
    transactions?: boolean | Beneficiary$transactionsArgs<ExtArgs>
    _count?: boolean | BeneficiaryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["beneficiary"]>

  export type BeneficiarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    details?: boolean
    phone?: boolean
    email?: boolean
    partnerId?: boolean
    partner?: boolean | Beneficiary$partnerArgs<ExtArgs>
  }, ExtArgs["result"]["beneficiary"]>

  export type BeneficiarySelectScalar = {
    id?: boolean
    name?: boolean
    details?: boolean
    phone?: boolean
    email?: boolean
    partnerId?: boolean
  }

  export type BeneficiaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | Beneficiary$partnerArgs<ExtArgs>
    transactions?: boolean | Beneficiary$transactionsArgs<ExtArgs>
    _count?: boolean | BeneficiaryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BeneficiaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | Beneficiary$partnerArgs<ExtArgs>
  }

  export type $BeneficiaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Beneficiary"
    objects: {
      partner: Prisma.$PartnerPayload<ExtArgs> | null
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      details: string | null
      phone: string | null
      email: string | null
      partnerId: string | null
    }, ExtArgs["result"]["beneficiary"]>
    composites: {}
  }

  type BeneficiaryGetPayload<S extends boolean | null | undefined | BeneficiaryDefaultArgs> = $Result.GetResult<Prisma.$BeneficiaryPayload, S>

  type BeneficiaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BeneficiaryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BeneficiaryCountAggregateInputType | true
    }

  export interface BeneficiaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Beneficiary'], meta: { name: 'Beneficiary' } }
    /**
     * Find zero or one Beneficiary that matches the filter.
     * @param {BeneficiaryFindUniqueArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BeneficiaryFindUniqueArgs>(args: SelectSubset<T, BeneficiaryFindUniqueArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Beneficiary that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BeneficiaryFindUniqueOrThrowArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BeneficiaryFindUniqueOrThrowArgs>(args: SelectSubset<T, BeneficiaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Beneficiary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryFindFirstArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BeneficiaryFindFirstArgs>(args?: SelectSubset<T, BeneficiaryFindFirstArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Beneficiary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryFindFirstOrThrowArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BeneficiaryFindFirstOrThrowArgs>(args?: SelectSubset<T, BeneficiaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Beneficiaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Beneficiaries
     * const beneficiaries = await prisma.beneficiary.findMany()
     * 
     * // Get first 10 Beneficiaries
     * const beneficiaries = await prisma.beneficiary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const beneficiaryWithIdOnly = await prisma.beneficiary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BeneficiaryFindManyArgs>(args?: SelectSubset<T, BeneficiaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Beneficiary.
     * @param {BeneficiaryCreateArgs} args - Arguments to create a Beneficiary.
     * @example
     * // Create one Beneficiary
     * const Beneficiary = await prisma.beneficiary.create({
     *   data: {
     *     // ... data to create a Beneficiary
     *   }
     * })
     * 
     */
    create<T extends BeneficiaryCreateArgs>(args: SelectSubset<T, BeneficiaryCreateArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Beneficiaries.
     * @param {BeneficiaryCreateManyArgs} args - Arguments to create many Beneficiaries.
     * @example
     * // Create many Beneficiaries
     * const beneficiary = await prisma.beneficiary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BeneficiaryCreateManyArgs>(args?: SelectSubset<T, BeneficiaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Beneficiaries and returns the data saved in the database.
     * @param {BeneficiaryCreateManyAndReturnArgs} args - Arguments to create many Beneficiaries.
     * @example
     * // Create many Beneficiaries
     * const beneficiary = await prisma.beneficiary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Beneficiaries and only return the `id`
     * const beneficiaryWithIdOnly = await prisma.beneficiary.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BeneficiaryCreateManyAndReturnArgs>(args?: SelectSubset<T, BeneficiaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Beneficiary.
     * @param {BeneficiaryDeleteArgs} args - Arguments to delete one Beneficiary.
     * @example
     * // Delete one Beneficiary
     * const Beneficiary = await prisma.beneficiary.delete({
     *   where: {
     *     // ... filter to delete one Beneficiary
     *   }
     * })
     * 
     */
    delete<T extends BeneficiaryDeleteArgs>(args: SelectSubset<T, BeneficiaryDeleteArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Beneficiary.
     * @param {BeneficiaryUpdateArgs} args - Arguments to update one Beneficiary.
     * @example
     * // Update one Beneficiary
     * const beneficiary = await prisma.beneficiary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BeneficiaryUpdateArgs>(args: SelectSubset<T, BeneficiaryUpdateArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Beneficiaries.
     * @param {BeneficiaryDeleteManyArgs} args - Arguments to filter Beneficiaries to delete.
     * @example
     * // Delete a few Beneficiaries
     * const { count } = await prisma.beneficiary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BeneficiaryDeleteManyArgs>(args?: SelectSubset<T, BeneficiaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Beneficiaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Beneficiaries
     * const beneficiary = await prisma.beneficiary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BeneficiaryUpdateManyArgs>(args: SelectSubset<T, BeneficiaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Beneficiary.
     * @param {BeneficiaryUpsertArgs} args - Arguments to update or create a Beneficiary.
     * @example
     * // Update or create a Beneficiary
     * const beneficiary = await prisma.beneficiary.upsert({
     *   create: {
     *     // ... data to create a Beneficiary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Beneficiary we want to update
     *   }
     * })
     */
    upsert<T extends BeneficiaryUpsertArgs>(args: SelectSubset<T, BeneficiaryUpsertArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Beneficiaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryCountArgs} args - Arguments to filter Beneficiaries to count.
     * @example
     * // Count the number of Beneficiaries
     * const count = await prisma.beneficiary.count({
     *   where: {
     *     // ... the filter for the Beneficiaries we want to count
     *   }
     * })
    **/
    count<T extends BeneficiaryCountArgs>(
      args?: Subset<T, BeneficiaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BeneficiaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Beneficiary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BeneficiaryAggregateArgs>(args: Subset<T, BeneficiaryAggregateArgs>): Prisma.PrismaPromise<GetBeneficiaryAggregateType<T>>

    /**
     * Group by Beneficiary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BeneficiaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BeneficiaryGroupByArgs['orderBy'] }
        : { orderBy?: BeneficiaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BeneficiaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeneficiaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Beneficiary model
   */
  readonly fields: BeneficiaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Beneficiary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BeneficiaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    partner<T extends Beneficiary$partnerArgs<ExtArgs> = {}>(args?: Subset<T, Beneficiary$partnerArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    transactions<T extends Beneficiary$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Beneficiary$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Beneficiary model
   */ 
  interface BeneficiaryFieldRefs {
    readonly id: FieldRef<"Beneficiary", 'String'>
    readonly name: FieldRef<"Beneficiary", 'String'>
    readonly details: FieldRef<"Beneficiary", 'String'>
    readonly phone: FieldRef<"Beneficiary", 'String'>
    readonly email: FieldRef<"Beneficiary", 'String'>
    readonly partnerId: FieldRef<"Beneficiary", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Beneficiary findUnique
   */
  export type BeneficiaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary findUniqueOrThrow
   */
  export type BeneficiaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary findFirst
   */
  export type BeneficiaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beneficiaries.
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beneficiaries.
     */
    distinct?: BeneficiaryScalarFieldEnum | BeneficiaryScalarFieldEnum[]
  }

  /**
   * Beneficiary findFirstOrThrow
   */
  export type BeneficiaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beneficiaries.
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beneficiaries.
     */
    distinct?: BeneficiaryScalarFieldEnum | BeneficiaryScalarFieldEnum[]
  }

  /**
   * Beneficiary findMany
   */
  export type BeneficiaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * Filter, which Beneficiaries to fetch.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Beneficiaries.
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    distinct?: BeneficiaryScalarFieldEnum | BeneficiaryScalarFieldEnum[]
  }

  /**
   * Beneficiary create
   */
  export type BeneficiaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * The data needed to create a Beneficiary.
     */
    data: XOR<BeneficiaryCreateInput, BeneficiaryUncheckedCreateInput>
  }

  /**
   * Beneficiary createMany
   */
  export type BeneficiaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Beneficiaries.
     */
    data: BeneficiaryCreateManyInput | BeneficiaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Beneficiary createManyAndReturn
   */
  export type BeneficiaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Beneficiaries.
     */
    data: BeneficiaryCreateManyInput | BeneficiaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Beneficiary update
   */
  export type BeneficiaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * The data needed to update a Beneficiary.
     */
    data: XOR<BeneficiaryUpdateInput, BeneficiaryUncheckedUpdateInput>
    /**
     * Choose, which Beneficiary to update.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary updateMany
   */
  export type BeneficiaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Beneficiaries.
     */
    data: XOR<BeneficiaryUpdateManyMutationInput, BeneficiaryUncheckedUpdateManyInput>
    /**
     * Filter which Beneficiaries to update
     */
    where?: BeneficiaryWhereInput
  }

  /**
   * Beneficiary upsert
   */
  export type BeneficiaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * The filter to search for the Beneficiary to update in case it exists.
     */
    where: BeneficiaryWhereUniqueInput
    /**
     * In case the Beneficiary found by the `where` argument doesn't exist, create a new Beneficiary with this data.
     */
    create: XOR<BeneficiaryCreateInput, BeneficiaryUncheckedCreateInput>
    /**
     * In case the Beneficiary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BeneficiaryUpdateInput, BeneficiaryUncheckedUpdateInput>
  }

  /**
   * Beneficiary delete
   */
  export type BeneficiaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    /**
     * Filter which Beneficiary to delete.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary deleteMany
   */
  export type BeneficiaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Beneficiaries to delete
     */
    where?: BeneficiaryWhereInput
  }

  /**
   * Beneficiary.partner
   */
  export type Beneficiary$partnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    where?: PartnerWhereInput
  }

  /**
   * Beneficiary.transactions
   */
  export type Beneficiary$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Beneficiary without action
   */
  export type BeneficiaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
  }


  /**
   * Model Partner
   */

  export type AggregatePartner = {
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  export type PartnerAvgAggregateOutputType = {
    liabilities: number | null
  }

  export type PartnerSumAggregateOutputType = {
    liabilities: number | null
  }

  export type PartnerMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.PartnerType | null
    liabilities: number | null
  }

  export type PartnerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.PartnerType | null
    liabilities: number | null
  }

  export type PartnerCountAggregateOutputType = {
    id: number
    name: number
    type: number
    liabilities: number
    _all: number
  }


  export type PartnerAvgAggregateInputType = {
    liabilities?: true
  }

  export type PartnerSumAggregateInputType = {
    liabilities?: true
  }

  export type PartnerMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    liabilities?: true
  }

  export type PartnerMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    liabilities?: true
  }

  export type PartnerCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    liabilities?: true
    _all?: true
  }

  export type PartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partner to aggregate.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partners
    **/
    _count?: true | PartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerMaxAggregateInputType
  }

  export type GetPartnerAggregateType<T extends PartnerAggregateArgs> = {
        [P in keyof T & keyof AggregatePartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartner[P]>
      : GetScalarType<T[P], AggregatePartner[P]>
  }




  export type PartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerWhereInput
    orderBy?: PartnerOrderByWithAggregationInput | PartnerOrderByWithAggregationInput[]
    by: PartnerScalarFieldEnum[] | PartnerScalarFieldEnum
    having?: PartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerCountAggregateInputType | true
    _avg?: PartnerAvgAggregateInputType
    _sum?: PartnerSumAggregateInputType
    _min?: PartnerMinAggregateInputType
    _max?: PartnerMaxAggregateInputType
  }

  export type PartnerGroupByOutputType = {
    id: string
    name: string
    type: $Enums.PartnerType
    liabilities: number
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  type GetPartnerGroupByPayload<T extends PartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerGroupByOutputType[P]>
        }
      >
    >


  export type PartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    liabilities?: boolean
    beneficiaries?: boolean | Partner$beneficiariesArgs<ExtArgs>
    transactions?: boolean | Partner$transactionsArgs<ExtArgs>
    vouchers?: boolean | Partner$vouchersArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    liabilities?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    liabilities?: boolean
  }

  export type PartnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beneficiaries?: boolean | Partner$beneficiariesArgs<ExtArgs>
    transactions?: boolean | Partner$transactionsArgs<ExtArgs>
    vouchers?: boolean | Partner$vouchersArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partner"
    objects: {
      beneficiaries: Prisma.$BeneficiaryPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      vouchers: Prisma.$VoucherPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.PartnerType
      liabilities: number
    }, ExtArgs["result"]["partner"]>
    composites: {}
  }

  type PartnerGetPayload<S extends boolean | null | undefined | PartnerDefaultArgs> = $Result.GetResult<Prisma.$PartnerPayload, S>

  type PartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PartnerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PartnerCountAggregateInputType | true
    }

  export interface PartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partner'], meta: { name: 'Partner' } }
    /**
     * Find zero or one Partner that matches the filter.
     * @param {PartnerFindUniqueArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerFindUniqueArgs>(args: SelectSubset<T, PartnerFindUniqueArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Partner that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PartnerFindUniqueOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Partner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerFindFirstArgs>(args?: SelectSubset<T, PartnerFindFirstArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Partner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Partners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partners
     * const partners = await prisma.partner.findMany()
     * 
     * // Get first 10 Partners
     * const partners = await prisma.partner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerWithIdOnly = await prisma.partner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerFindManyArgs>(args?: SelectSubset<T, PartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Partner.
     * @param {PartnerCreateArgs} args - Arguments to create a Partner.
     * @example
     * // Create one Partner
     * const Partner = await prisma.partner.create({
     *   data: {
     *     // ... data to create a Partner
     *   }
     * })
     * 
     */
    create<T extends PartnerCreateArgs>(args: SelectSubset<T, PartnerCreateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Partners.
     * @param {PartnerCreateManyArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerCreateManyArgs>(args?: SelectSubset<T, PartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Partners and returns the data saved in the database.
     * @param {PartnerCreateManyAndReturnArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Partner.
     * @param {PartnerDeleteArgs} args - Arguments to delete one Partner.
     * @example
     * // Delete one Partner
     * const Partner = await prisma.partner.delete({
     *   where: {
     *     // ... filter to delete one Partner
     *   }
     * })
     * 
     */
    delete<T extends PartnerDeleteArgs>(args: SelectSubset<T, PartnerDeleteArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Partner.
     * @param {PartnerUpdateArgs} args - Arguments to update one Partner.
     * @example
     * // Update one Partner
     * const partner = await prisma.partner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerUpdateArgs>(args: SelectSubset<T, PartnerUpdateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Partners.
     * @param {PartnerDeleteManyArgs} args - Arguments to filter Partners to delete.
     * @example
     * // Delete a few Partners
     * const { count } = await prisma.partner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerDeleteManyArgs>(args?: SelectSubset<T, PartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerUpdateManyArgs>(args: SelectSubset<T, PartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Partner.
     * @param {PartnerUpsertArgs} args - Arguments to update or create a Partner.
     * @example
     * // Update or create a Partner
     * const partner = await prisma.partner.upsert({
     *   create: {
     *     // ... data to create a Partner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partner we want to update
     *   }
     * })
     */
    upsert<T extends PartnerUpsertArgs>(args: SelectSubset<T, PartnerUpsertArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerCountArgs} args - Arguments to filter Partners to count.
     * @example
     * // Count the number of Partners
     * const count = await prisma.partner.count({
     *   where: {
     *     // ... the filter for the Partners we want to count
     *   }
     * })
    **/
    count<T extends PartnerCountArgs>(
      args?: Subset<T, PartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartnerAggregateArgs>(args: Subset<T, PartnerAggregateArgs>): Prisma.PrismaPromise<GetPartnerAggregateType<T>>

    /**
     * Group by Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerGroupByArgs['orderBy'] }
        : { orderBy?: PartnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partner model
   */
  readonly fields: PartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beneficiaries<T extends Partner$beneficiariesArgs<ExtArgs> = {}>(args?: Subset<T, Partner$beneficiariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findMany"> | Null>
    transactions<T extends Partner$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Partner$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
    vouchers<T extends Partner$vouchersArgs<ExtArgs> = {}>(args?: Subset<T, Partner$vouchersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Partner model
   */ 
  interface PartnerFieldRefs {
    readonly id: FieldRef<"Partner", 'String'>
    readonly name: FieldRef<"Partner", 'String'>
    readonly type: FieldRef<"Partner", 'PartnerType'>
    readonly liabilities: FieldRef<"Partner", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Partner findUnique
   */
  export type PartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findUniqueOrThrow
   */
  export type PartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findFirst
   */
  export type PartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findFirstOrThrow
   */
  export type PartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findMany
   */
  export type PartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partners to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner create
   */
  export type PartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Partner.
     */
    data: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
  }

  /**
   * Partner createMany
   */
  export type PartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner createManyAndReturn
   */
  export type PartnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner update
   */
  export type PartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Partner.
     */
    data: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
    /**
     * Choose, which Partner to update.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner updateMany
   */
  export type PartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
  }

  /**
   * Partner upsert
   */
  export type PartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Partner to update in case it exists.
     */
    where: PartnerWhereUniqueInput
    /**
     * In case the Partner found by the `where` argument doesn't exist, create a new Partner with this data.
     */
    create: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
    /**
     * In case the Partner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
  }

  /**
   * Partner delete
   */
  export type PartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter which Partner to delete.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner deleteMany
   */
  export type PartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partners to delete
     */
    where?: PartnerWhereInput
  }

  /**
   * Partner.beneficiaries
   */
  export type Partner$beneficiariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryInclude<ExtArgs> | null
    where?: BeneficiaryWhereInput
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    cursor?: BeneficiaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BeneficiaryScalarFieldEnum | BeneficiaryScalarFieldEnum[]
  }

  /**
   * Partner.transactions
   */
  export type Partner$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Partner.vouchers
   */
  export type Partner$vouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    where?: VoucherWhereInput
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    cursor?: VoucherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Partner without action
   */
  export type PartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    amount: number | null
  }

  export type ExpenseSumAggregateOutputType = {
    amount: number | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: string | null
    date: Date | null
    description: string | null
    amount: number | null
    categoryId: string | null
    paymentMethod: $Enums.PaymentMethod | null
    accountId: string | null
    enteredById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    description: string | null
    amount: number | null
    categoryId: string | null
    paymentMethod: $Enums.PaymentMethod | null
    accountId: string | null
    enteredById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    date: number
    description: number
    amount: number
    categoryId: number
    paymentMethod: number
    accountId: number
    enteredById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    amount?: true
  }

  export type ExpenseSumAggregateInputType = {
    amount?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    date?: true
    description?: true
    amount?: true
    categoryId?: true
    paymentMethod?: true
    accountId?: true
    enteredById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    date?: true
    description?: true
    amount?: true
    categoryId?: true
    paymentMethod?: true
    accountId?: true
    enteredById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    date?: true
    description?: true
    amount?: true
    categoryId?: true
    paymentMethod?: true
    accountId?: true
    enteredById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: string
    date: Date
    description: string | null
    amount: number
    categoryId: string
    paymentMethod: $Enums.PaymentMethod
    accountId: string | null
    enteredById: string
    createdAt: Date
    updatedAt: Date
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    description?: boolean
    amount?: boolean
    categoryId?: boolean
    paymentMethod?: boolean
    accountId?: boolean
    enteredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    account?: boolean | Expense$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    description?: boolean
    amount?: boolean
    categoryId?: boolean
    paymentMethod?: boolean
    accountId?: boolean
    enteredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    account?: boolean | Expense$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    date?: boolean
    description?: boolean
    amount?: boolean
    categoryId?: boolean
    paymentMethod?: boolean
    accountId?: boolean
    enteredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    account?: boolean | Expense$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    account?: boolean | Expense$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {
      category: Prisma.$ExpenseCategoryPayload<ExtArgs>
      account: Prisma.$AccountPayload<ExtArgs> | null
      enteredBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      description: string | null
      amount: number
      categoryId: string
      paymentMethod: $Enums.PaymentMethod
      accountId: string | null
      enteredById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends ExpenseCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategoryDefaultArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    account<T extends Expense$accountArgs<ExtArgs> = {}>(args?: Subset<T, Expense$accountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    enteredBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */ 
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'String'>
    readonly date: FieldRef<"Expense", 'DateTime'>
    readonly description: FieldRef<"Expense", 'String'>
    readonly amount: FieldRef<"Expense", 'Float'>
    readonly categoryId: FieldRef<"Expense", 'String'>
    readonly paymentMethod: FieldRef<"Expense", 'PaymentMethod'>
    readonly accountId: FieldRef<"Expense", 'String'>
    readonly enteredById: FieldRef<"Expense", 'String'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
    readonly updatedAt: FieldRef<"Expense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense.account
   */
  export type Expense$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
  }


  /**
   * Model ExpenseCategory
   */

  export type AggregateExpenseCategory = {
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  export type ExpenseCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type ExpenseCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type ExpenseCategoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type ExpenseCategoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type ExpenseCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type ExpenseCategoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type ExpenseCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategory to aggregate.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseCategories
    **/
    _count?: true | ExpenseCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type GetExpenseCategoryAggregateType<T extends ExpenseCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenseCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenseCategory[P]>
      : GetScalarType<T[P], AggregateExpenseCategory[P]>
  }




  export type ExpenseCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseCategoryWhereInput
    orderBy?: ExpenseCategoryOrderByWithAggregationInput | ExpenseCategoryOrderByWithAggregationInput[]
    by: ExpenseCategoryScalarFieldEnum[] | ExpenseCategoryScalarFieldEnum
    having?: ExpenseCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCategoryCountAggregateInputType | true
    _min?: ExpenseCategoryMinAggregateInputType
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type ExpenseCategoryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  type GetExpenseCategoryGroupByPayload<T extends ExpenseCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    expenses?: boolean | ExpenseCategory$expensesArgs<ExtArgs>
    voucherItems?: boolean | ExpenseCategory$voucherItemsArgs<ExtArgs>
    _count?: boolean | ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type ExpenseCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | ExpenseCategory$expensesArgs<ExtArgs>
    voucherItems?: boolean | ExpenseCategory$voucherItemsArgs<ExtArgs>
    _count?: boolean | ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExpenseCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExpenseCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExpenseCategory"
    objects: {
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      voucherItems: Prisma.$VoucherItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
    }, ExtArgs["result"]["expenseCategory"]>
    composites: {}
  }

  type ExpenseCategoryGetPayload<S extends boolean | null | undefined | ExpenseCategoryDefaultArgs> = $Result.GetResult<Prisma.$ExpenseCategoryPayload, S>

  type ExpenseCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExpenseCategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExpenseCategoryCountAggregateInputType | true
    }

  export interface ExpenseCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExpenseCategory'], meta: { name: 'ExpenseCategory' } }
    /**
     * Find zero or one ExpenseCategory that matches the filter.
     * @param {ExpenseCategoryFindUniqueArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseCategoryFindUniqueArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExpenseCategory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExpenseCategoryFindUniqueOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExpenseCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseCategoryFindFirstArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExpenseCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExpenseCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany()
     * 
     * // Get first 10 ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseCategoryFindManyArgs>(args?: SelectSubset<T, ExpenseCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExpenseCategory.
     * @param {ExpenseCategoryCreateArgs} args - Arguments to create a ExpenseCategory.
     * @example
     * // Create one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.create({
     *   data: {
     *     // ... data to create a ExpenseCategory
     *   }
     * })
     * 
     */
    create<T extends ExpenseCategoryCreateArgs>(args: SelectSubset<T, ExpenseCategoryCreateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExpenseCategories.
     * @param {ExpenseCategoryCreateManyArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCategoryCreateManyArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExpenseCategories and returns the data saved in the database.
     * @param {ExpenseCategoryCreateManyAndReturnArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExpenseCategories and only return the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExpenseCategory.
     * @param {ExpenseCategoryDeleteArgs} args - Arguments to delete one ExpenseCategory.
     * @example
     * // Delete one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.delete({
     *   where: {
     *     // ... filter to delete one ExpenseCategory
     *   }
     * })
     * 
     */
    delete<T extends ExpenseCategoryDeleteArgs>(args: SelectSubset<T, ExpenseCategoryDeleteArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExpenseCategory.
     * @param {ExpenseCategoryUpdateArgs} args - Arguments to update one ExpenseCategory.
     * @example
     * // Update one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseCategoryUpdateArgs>(args: SelectSubset<T, ExpenseCategoryUpdateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExpenseCategories.
     * @param {ExpenseCategoryDeleteManyArgs} args - Arguments to filter ExpenseCategories to delete.
     * @example
     * // Delete a few ExpenseCategories
     * const { count } = await prisma.expenseCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseCategoryDeleteManyArgs>(args?: SelectSubset<T, ExpenseCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseCategoryUpdateManyArgs>(args: SelectSubset<T, ExpenseCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExpenseCategory.
     * @param {ExpenseCategoryUpsertArgs} args - Arguments to update or create a ExpenseCategory.
     * @example
     * // Update or create a ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.upsert({
     *   create: {
     *     // ... data to create a ExpenseCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseCategory we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseCategoryUpsertArgs>(args: SelectSubset<T, ExpenseCategoryUpsertArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryCountArgs} args - Arguments to filter ExpenseCategories to count.
     * @example
     * // Count the number of ExpenseCategories
     * const count = await prisma.expenseCategory.count({
     *   where: {
     *     // ... the filter for the ExpenseCategories we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCategoryCountArgs>(
      args?: Subset<T, ExpenseCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseCategoryAggregateArgs>(args: Subset<T, ExpenseCategoryAggregateArgs>): Prisma.PrismaPromise<GetExpenseCategoryAggregateType<T>>

    /**
     * Group by ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExpenseCategory model
   */
  readonly fields: ExpenseCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    expenses<T extends ExpenseCategory$expensesArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategory$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany"> | Null>
    voucherItems<T extends ExpenseCategory$voucherItemsArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategory$voucherItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExpenseCategory model
   */ 
  interface ExpenseCategoryFieldRefs {
    readonly id: FieldRef<"ExpenseCategory", 'String'>
    readonly name: FieldRef<"ExpenseCategory", 'String'>
    readonly description: FieldRef<"ExpenseCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExpenseCategory findUnique
   */
  export type ExpenseCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findUniqueOrThrow
   */
  export type ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findFirst
   */
  export type ExpenseCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findFirstOrThrow
   */
  export type ExpenseCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findMany
   */
  export type ExpenseCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategories to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory create
   */
  export type ExpenseCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
  }

  /**
   * ExpenseCategory createMany
   */
  export type ExpenseCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExpenseCategory createManyAndReturn
   */
  export type ExpenseCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExpenseCategory update
   */
  export type ExpenseCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
    /**
     * Choose, which ExpenseCategory to update.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory updateMany
   */
  export type ExpenseCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExpenseCategories.
     */
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     */
    where?: ExpenseCategoryWhereInput
  }

  /**
   * ExpenseCategory upsert
   */
  export type ExpenseCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ExpenseCategory to update in case it exists.
     */
    where: ExpenseCategoryWhereUniqueInput
    /**
     * In case the ExpenseCategory found by the `where` argument doesn't exist, create a new ExpenseCategory with this data.
     */
    create: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
    /**
     * In case the ExpenseCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
  }

  /**
   * ExpenseCategory delete
   */
  export type ExpenseCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter which ExpenseCategory to delete.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory deleteMany
   */
  export type ExpenseCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategories to delete
     */
    where?: ExpenseCategoryWhereInput
  }

  /**
   * ExpenseCategory.expenses
   */
  export type ExpenseCategory$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * ExpenseCategory.voucherItems
   */
  export type ExpenseCategory$voucherItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    where?: VoucherItemWhereInput
    orderBy?: VoucherItemOrderByWithRelationInput | VoucherItemOrderByWithRelationInput[]
    cursor?: VoucherItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoucherItemScalarFieldEnum | VoucherItemScalarFieldEnum[]
  }

  /**
   * ExpenseCategory without action
   */
  export type ExpenseCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    balance: number | null
  }

  export type AccountSumAggregateOutputType = {
    balance: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.AccountType | null
    balance: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.AccountType | null
    balance: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    name: number
    type: number
    balance: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    balance?: true
  }

  export type AccountSumAggregateInputType = {
    balance?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    balance?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    balance?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    balance?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    name: string
    type: $Enums.AccountType
    balance: number
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    balance?: boolean
    transactions?: boolean | Account$transactionsArgs<ExtArgs>
    expenses?: boolean | Account$expensesArgs<ExtArgs>
    invoicesGovtFee?: boolean | Account$invoicesGovtFeeArgs<ExtArgs>
    transactionsGovtFee?: boolean | Account$transactionsGovtFeeArgs<ExtArgs>
    vouchers?: boolean | Account$vouchersArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    balance?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    balance?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | Account$transactionsArgs<ExtArgs>
    expenses?: boolean | Account$expensesArgs<ExtArgs>
    invoicesGovtFee?: boolean | Account$invoicesGovtFeeArgs<ExtArgs>
    transactionsGovtFee?: boolean | Account$transactionsGovtFeeArgs<ExtArgs>
    vouchers?: boolean | Account$vouchersArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      expenses: Prisma.$ExpensePayload<ExtArgs>[]
      invoicesGovtFee: Prisma.$InvoicePayload<ExtArgs>[]
      transactionsGovtFee: Prisma.$TransactionPayload<ExtArgs>[]
      vouchers: Prisma.$VoucherPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.AccountType
      balance: number
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends Account$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Account$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
    expenses<T extends Account$expensesArgs<ExtArgs> = {}>(args?: Subset<T, Account$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany"> | Null>
    invoicesGovtFee<T extends Account$invoicesGovtFeeArgs<ExtArgs> = {}>(args?: Subset<T, Account$invoicesGovtFeeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany"> | Null>
    transactionsGovtFee<T extends Account$transactionsGovtFeeArgs<ExtArgs> = {}>(args?: Subset<T, Account$transactionsGovtFeeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany"> | Null>
    vouchers<T extends Account$vouchersArgs<ExtArgs> = {}>(args?: Subset<T, Account$vouchersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly name: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'AccountType'>
    readonly balance: FieldRef<"Account", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }

  /**
   * Account.transactions
   */
  export type Account$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Account.expenses
   */
  export type Account$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Account.invoicesGovtFee
   */
  export type Account$invoicesGovtFeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Account.transactionsGovtFee
   */
  export type Account$transactionsGovtFeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Account.vouchers
   */
  export type Account$vouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    where?: VoucherWhereInput
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    cursor?: VoucherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Voucher
   */

  export type AggregateVoucher = {
    _count: VoucherCountAggregateOutputType | null
    _avg: VoucherAvgAggregateOutputType | null
    _sum: VoucherSumAggregateOutputType | null
    _min: VoucherMinAggregateOutputType | null
    _max: VoucherMaxAggregateOutputType | null
  }

  export type VoucherAvgAggregateOutputType = {
    total: number | null
    paidAmount: number | null
    balance: number | null
  }

  export type VoucherSumAggregateOutputType = {
    total: number | null
    paidAmount: number | null
    balance: number | null
  }

  export type VoucherMinAggregateOutputType = {
    id: string | null
    voucherNo: string | null
    date: Date | null
    description: string | null
    vendorId: string | null
    vendorName: string | null
    total: number | null
    paidAmount: number | null
    balance: number | null
    status: $Enums.VoucherStatus | null
    paymentMethod: $Enums.PaymentMethod | null
    accountId: string | null
    enteredById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoucherMaxAggregateOutputType = {
    id: string | null
    voucherNo: string | null
    date: Date | null
    description: string | null
    vendorId: string | null
    vendorName: string | null
    total: number | null
    paidAmount: number | null
    balance: number | null
    status: $Enums.VoucherStatus | null
    paymentMethod: $Enums.PaymentMethod | null
    accountId: string | null
    enteredById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VoucherCountAggregateOutputType = {
    id: number
    voucherNo: number
    date: number
    description: number
    vendorId: number
    vendorName: number
    total: number
    paidAmount: number
    balance: number
    status: number
    paymentMethod: number
    accountId: number
    enteredById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VoucherAvgAggregateInputType = {
    total?: true
    paidAmount?: true
    balance?: true
  }

  export type VoucherSumAggregateInputType = {
    total?: true
    paidAmount?: true
    balance?: true
  }

  export type VoucherMinAggregateInputType = {
    id?: true
    voucherNo?: true
    date?: true
    description?: true
    vendorId?: true
    vendorName?: true
    total?: true
    paidAmount?: true
    balance?: true
    status?: true
    paymentMethod?: true
    accountId?: true
    enteredById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoucherMaxAggregateInputType = {
    id?: true
    voucherNo?: true
    date?: true
    description?: true
    vendorId?: true
    vendorName?: true
    total?: true
    paidAmount?: true
    balance?: true
    status?: true
    paymentMethod?: true
    accountId?: true
    enteredById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VoucherCountAggregateInputType = {
    id?: true
    voucherNo?: true
    date?: true
    description?: true
    vendorId?: true
    vendorName?: true
    total?: true
    paidAmount?: true
    balance?: true
    status?: true
    paymentMethod?: true
    accountId?: true
    enteredById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VoucherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Voucher to aggregate.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vouchers
    **/
    _count?: true | VoucherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoucherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoucherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoucherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoucherMaxAggregateInputType
  }

  export type GetVoucherAggregateType<T extends VoucherAggregateArgs> = {
        [P in keyof T & keyof AggregateVoucher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoucher[P]>
      : GetScalarType<T[P], AggregateVoucher[P]>
  }




  export type VoucherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherWhereInput
    orderBy?: VoucherOrderByWithAggregationInput | VoucherOrderByWithAggregationInput[]
    by: VoucherScalarFieldEnum[] | VoucherScalarFieldEnum
    having?: VoucherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoucherCountAggregateInputType | true
    _avg?: VoucherAvgAggregateInputType
    _sum?: VoucherSumAggregateInputType
    _min?: VoucherMinAggregateInputType
    _max?: VoucherMaxAggregateInputType
  }

  export type VoucherGroupByOutputType = {
    id: string
    voucherNo: string
    date: Date
    description: string | null
    vendorId: string | null
    vendorName: string | null
    total: number
    paidAmount: number
    balance: number
    status: $Enums.VoucherStatus
    paymentMethod: $Enums.PaymentMethod
    accountId: string | null
    enteredById: string
    createdAt: Date
    updatedAt: Date
    _count: VoucherCountAggregateOutputType | null
    _avg: VoucherAvgAggregateOutputType | null
    _sum: VoucherSumAggregateOutputType | null
    _min: VoucherMinAggregateOutputType | null
    _max: VoucherMaxAggregateOutputType | null
  }

  type GetVoucherGroupByPayload<T extends VoucherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoucherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoucherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoucherGroupByOutputType[P]>
            : GetScalarType<T[P], VoucherGroupByOutputType[P]>
        }
      >
    >


  export type VoucherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherNo?: boolean
    date?: boolean
    description?: boolean
    vendorId?: boolean
    vendorName?: boolean
    total?: boolean
    paidAmount?: boolean
    balance?: boolean
    status?: boolean
    paymentMethod?: boolean
    accountId?: boolean
    enteredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendor?: boolean | Voucher$vendorArgs<ExtArgs>
    account?: boolean | Voucher$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Voucher$itemsArgs<ExtArgs>
    _count?: boolean | VoucherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherNo?: boolean
    date?: boolean
    description?: boolean
    vendorId?: boolean
    vendorName?: boolean
    total?: boolean
    paidAmount?: boolean
    balance?: boolean
    status?: boolean
    paymentMethod?: boolean
    accountId?: boolean
    enteredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendor?: boolean | Voucher$vendorArgs<ExtArgs>
    account?: boolean | Voucher$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectScalar = {
    id?: boolean
    voucherNo?: boolean
    date?: boolean
    description?: boolean
    vendorId?: boolean
    vendorName?: boolean
    total?: boolean
    paidAmount?: boolean
    balance?: boolean
    status?: boolean
    paymentMethod?: boolean
    accountId?: boolean
    enteredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VoucherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | Voucher$vendorArgs<ExtArgs>
    account?: boolean | Voucher$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Voucher$itemsArgs<ExtArgs>
    _count?: boolean | VoucherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VoucherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | Voucher$vendorArgs<ExtArgs>
    account?: boolean | Voucher$accountArgs<ExtArgs>
    enteredBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VoucherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Voucher"
    objects: {
      vendor: Prisma.$PartnerPayload<ExtArgs> | null
      account: Prisma.$AccountPayload<ExtArgs> | null
      enteredBy: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$VoucherItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      voucherNo: string
      date: Date
      description: string | null
      vendorId: string | null
      vendorName: string | null
      total: number
      paidAmount: number
      balance: number
      status: $Enums.VoucherStatus
      paymentMethod: $Enums.PaymentMethod
      accountId: string | null
      enteredById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["voucher"]>
    composites: {}
  }

  type VoucherGetPayload<S extends boolean | null | undefined | VoucherDefaultArgs> = $Result.GetResult<Prisma.$VoucherPayload, S>

  type VoucherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VoucherFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VoucherCountAggregateInputType | true
    }

  export interface VoucherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Voucher'], meta: { name: 'Voucher' } }
    /**
     * Find zero or one Voucher that matches the filter.
     * @param {VoucherFindUniqueArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoucherFindUniqueArgs>(args: SelectSubset<T, VoucherFindUniqueArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Voucher that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VoucherFindUniqueOrThrowArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoucherFindUniqueOrThrowArgs>(args: SelectSubset<T, VoucherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Voucher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindFirstArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoucherFindFirstArgs>(args?: SelectSubset<T, VoucherFindFirstArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Voucher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindFirstOrThrowArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoucherFindFirstOrThrowArgs>(args?: SelectSubset<T, VoucherFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Vouchers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vouchers
     * const vouchers = await prisma.voucher.findMany()
     * 
     * // Get first 10 Vouchers
     * const vouchers = await prisma.voucher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voucherWithIdOnly = await prisma.voucher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoucherFindManyArgs>(args?: SelectSubset<T, VoucherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Voucher.
     * @param {VoucherCreateArgs} args - Arguments to create a Voucher.
     * @example
     * // Create one Voucher
     * const Voucher = await prisma.voucher.create({
     *   data: {
     *     // ... data to create a Voucher
     *   }
     * })
     * 
     */
    create<T extends VoucherCreateArgs>(args: SelectSubset<T, VoucherCreateArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Vouchers.
     * @param {VoucherCreateManyArgs} args - Arguments to create many Vouchers.
     * @example
     * // Create many Vouchers
     * const voucher = await prisma.voucher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoucherCreateManyArgs>(args?: SelectSubset<T, VoucherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vouchers and returns the data saved in the database.
     * @param {VoucherCreateManyAndReturnArgs} args - Arguments to create many Vouchers.
     * @example
     * // Create many Vouchers
     * const voucher = await prisma.voucher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vouchers and only return the `id`
     * const voucherWithIdOnly = await prisma.voucher.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoucherCreateManyAndReturnArgs>(args?: SelectSubset<T, VoucherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Voucher.
     * @param {VoucherDeleteArgs} args - Arguments to delete one Voucher.
     * @example
     * // Delete one Voucher
     * const Voucher = await prisma.voucher.delete({
     *   where: {
     *     // ... filter to delete one Voucher
     *   }
     * })
     * 
     */
    delete<T extends VoucherDeleteArgs>(args: SelectSubset<T, VoucherDeleteArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Voucher.
     * @param {VoucherUpdateArgs} args - Arguments to update one Voucher.
     * @example
     * // Update one Voucher
     * const voucher = await prisma.voucher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoucherUpdateArgs>(args: SelectSubset<T, VoucherUpdateArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Vouchers.
     * @param {VoucherDeleteManyArgs} args - Arguments to filter Vouchers to delete.
     * @example
     * // Delete a few Vouchers
     * const { count } = await prisma.voucher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoucherDeleteManyArgs>(args?: SelectSubset<T, VoucherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vouchers
     * const voucher = await prisma.voucher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoucherUpdateManyArgs>(args: SelectSubset<T, VoucherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Voucher.
     * @param {VoucherUpsertArgs} args - Arguments to update or create a Voucher.
     * @example
     * // Update or create a Voucher
     * const voucher = await prisma.voucher.upsert({
     *   create: {
     *     // ... data to create a Voucher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Voucher we want to update
     *   }
     * })
     */
    upsert<T extends VoucherUpsertArgs>(args: SelectSubset<T, VoucherUpsertArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Vouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherCountArgs} args - Arguments to filter Vouchers to count.
     * @example
     * // Count the number of Vouchers
     * const count = await prisma.voucher.count({
     *   where: {
     *     // ... the filter for the Vouchers we want to count
     *   }
     * })
    **/
    count<T extends VoucherCountArgs>(
      args?: Subset<T, VoucherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoucherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Voucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoucherAggregateArgs>(args: Subset<T, VoucherAggregateArgs>): Prisma.PrismaPromise<GetVoucherAggregateType<T>>

    /**
     * Group by Voucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoucherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoucherGroupByArgs['orderBy'] }
        : { orderBy?: VoucherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoucherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoucherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Voucher model
   */
  readonly fields: VoucherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Voucher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoucherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends Voucher$vendorArgs<ExtArgs> = {}>(args?: Subset<T, Voucher$vendorArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    account<T extends Voucher$accountArgs<ExtArgs> = {}>(args?: Subset<T, Voucher$accountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    enteredBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Voucher$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Voucher$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Voucher model
   */ 
  interface VoucherFieldRefs {
    readonly id: FieldRef<"Voucher", 'String'>
    readonly voucherNo: FieldRef<"Voucher", 'String'>
    readonly date: FieldRef<"Voucher", 'DateTime'>
    readonly description: FieldRef<"Voucher", 'String'>
    readonly vendorId: FieldRef<"Voucher", 'String'>
    readonly vendorName: FieldRef<"Voucher", 'String'>
    readonly total: FieldRef<"Voucher", 'Float'>
    readonly paidAmount: FieldRef<"Voucher", 'Float'>
    readonly balance: FieldRef<"Voucher", 'Float'>
    readonly status: FieldRef<"Voucher", 'VoucherStatus'>
    readonly paymentMethod: FieldRef<"Voucher", 'PaymentMethod'>
    readonly accountId: FieldRef<"Voucher", 'String'>
    readonly enteredById: FieldRef<"Voucher", 'String'>
    readonly createdAt: FieldRef<"Voucher", 'DateTime'>
    readonly updatedAt: FieldRef<"Voucher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Voucher findUnique
   */
  export type VoucherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher findUniqueOrThrow
   */
  export type VoucherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher findFirst
   */
  export type VoucherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vouchers.
     */
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher findFirstOrThrow
   */
  export type VoucherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vouchers.
     */
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher findMany
   */
  export type VoucherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Vouchers to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher create
   */
  export type VoucherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * The data needed to create a Voucher.
     */
    data: XOR<VoucherCreateInput, VoucherUncheckedCreateInput>
  }

  /**
   * Voucher createMany
   */
  export type VoucherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vouchers.
     */
    data: VoucherCreateManyInput | VoucherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Voucher createManyAndReturn
   */
  export type VoucherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Vouchers.
     */
    data: VoucherCreateManyInput | VoucherCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Voucher update
   */
  export type VoucherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * The data needed to update a Voucher.
     */
    data: XOR<VoucherUpdateInput, VoucherUncheckedUpdateInput>
    /**
     * Choose, which Voucher to update.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher updateMany
   */
  export type VoucherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vouchers.
     */
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyInput>
    /**
     * Filter which Vouchers to update
     */
    where?: VoucherWhereInput
  }

  /**
   * Voucher upsert
   */
  export type VoucherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * The filter to search for the Voucher to update in case it exists.
     */
    where: VoucherWhereUniqueInput
    /**
     * In case the Voucher found by the `where` argument doesn't exist, create a new Voucher with this data.
     */
    create: XOR<VoucherCreateInput, VoucherUncheckedCreateInput>
    /**
     * In case the Voucher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoucherUpdateInput, VoucherUncheckedUpdateInput>
  }

  /**
   * Voucher delete
   */
  export type VoucherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter which Voucher to delete.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher deleteMany
   */
  export type VoucherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vouchers to delete
     */
    where?: VoucherWhereInput
  }

  /**
   * Voucher.vendor
   */
  export type Voucher$vendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    where?: PartnerWhereInput
  }

  /**
   * Voucher.account
   */
  export type Voucher$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Voucher.items
   */
  export type Voucher$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    where?: VoucherItemWhereInput
    orderBy?: VoucherItemOrderByWithRelationInput | VoucherItemOrderByWithRelationInput[]
    cursor?: VoucherItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoucherItemScalarFieldEnum | VoucherItemScalarFieldEnum[]
  }

  /**
   * Voucher without action
   */
  export type VoucherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
  }


  /**
   * Model VoucherItem
   */

  export type AggregateVoucherItem = {
    _count: VoucherItemCountAggregateOutputType | null
    _avg: VoucherItemAvgAggregateOutputType | null
    _sum: VoucherItemSumAggregateOutputType | null
    _min: VoucherItemMinAggregateOutputType | null
    _max: VoucherItemMaxAggregateOutputType | null
  }

  export type VoucherItemAvgAggregateOutputType = {
    amount: number | null
  }

  export type VoucherItemSumAggregateOutputType = {
    amount: number | null
  }

  export type VoucherItemMinAggregateOutputType = {
    id: string | null
    voucherId: string | null
    categoryId: string | null
    amount: number | null
    description: string | null
  }

  export type VoucherItemMaxAggregateOutputType = {
    id: string | null
    voucherId: string | null
    categoryId: string | null
    amount: number | null
    description: string | null
  }

  export type VoucherItemCountAggregateOutputType = {
    id: number
    voucherId: number
    categoryId: number
    amount: number
    description: number
    _all: number
  }


  export type VoucherItemAvgAggregateInputType = {
    amount?: true
  }

  export type VoucherItemSumAggregateInputType = {
    amount?: true
  }

  export type VoucherItemMinAggregateInputType = {
    id?: true
    voucherId?: true
    categoryId?: true
    amount?: true
    description?: true
  }

  export type VoucherItemMaxAggregateInputType = {
    id?: true
    voucherId?: true
    categoryId?: true
    amount?: true
    description?: true
  }

  export type VoucherItemCountAggregateInputType = {
    id?: true
    voucherId?: true
    categoryId?: true
    amount?: true
    description?: true
    _all?: true
  }

  export type VoucherItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoucherItem to aggregate.
     */
    where?: VoucherItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoucherItems to fetch.
     */
    orderBy?: VoucherItemOrderByWithRelationInput | VoucherItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoucherItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoucherItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoucherItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VoucherItems
    **/
    _count?: true | VoucherItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoucherItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoucherItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoucherItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoucherItemMaxAggregateInputType
  }

  export type GetVoucherItemAggregateType<T extends VoucherItemAggregateArgs> = {
        [P in keyof T & keyof AggregateVoucherItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoucherItem[P]>
      : GetScalarType<T[P], AggregateVoucherItem[P]>
  }




  export type VoucherItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherItemWhereInput
    orderBy?: VoucherItemOrderByWithAggregationInput | VoucherItemOrderByWithAggregationInput[]
    by: VoucherItemScalarFieldEnum[] | VoucherItemScalarFieldEnum
    having?: VoucherItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoucherItemCountAggregateInputType | true
    _avg?: VoucherItemAvgAggregateInputType
    _sum?: VoucherItemSumAggregateInputType
    _min?: VoucherItemMinAggregateInputType
    _max?: VoucherItemMaxAggregateInputType
  }

  export type VoucherItemGroupByOutputType = {
    id: string
    voucherId: string
    categoryId: string
    amount: number
    description: string | null
    _count: VoucherItemCountAggregateOutputType | null
    _avg: VoucherItemAvgAggregateOutputType | null
    _sum: VoucherItemSumAggregateOutputType | null
    _min: VoucherItemMinAggregateOutputType | null
    _max: VoucherItemMaxAggregateOutputType | null
  }

  type GetVoucherItemGroupByPayload<T extends VoucherItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoucherItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoucherItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoucherItemGroupByOutputType[P]>
            : GetScalarType<T[P], VoucherItemGroupByOutputType[P]>
        }
      >
    >


  export type VoucherItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherId?: boolean
    categoryId?: boolean
    amount?: boolean
    description?: boolean
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voucherItem"]>

  export type VoucherItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherId?: boolean
    categoryId?: boolean
    amount?: boolean
    description?: boolean
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voucherItem"]>

  export type VoucherItemSelectScalar = {
    id?: boolean
    voucherId?: boolean
    categoryId?: boolean
    amount?: boolean
    description?: boolean
  }

  export type VoucherItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }
  export type VoucherItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }

  export type $VoucherItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VoucherItem"
    objects: {
      voucher: Prisma.$VoucherPayload<ExtArgs>
      category: Prisma.$ExpenseCategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      voucherId: string
      categoryId: string
      amount: number
      description: string | null
    }, ExtArgs["result"]["voucherItem"]>
    composites: {}
  }

  type VoucherItemGetPayload<S extends boolean | null | undefined | VoucherItemDefaultArgs> = $Result.GetResult<Prisma.$VoucherItemPayload, S>

  type VoucherItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VoucherItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VoucherItemCountAggregateInputType | true
    }

  export interface VoucherItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VoucherItem'], meta: { name: 'VoucherItem' } }
    /**
     * Find zero or one VoucherItem that matches the filter.
     * @param {VoucherItemFindUniqueArgs} args - Arguments to find a VoucherItem
     * @example
     * // Get one VoucherItem
     * const voucherItem = await prisma.voucherItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoucherItemFindUniqueArgs>(args: SelectSubset<T, VoucherItemFindUniqueArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VoucherItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VoucherItemFindUniqueOrThrowArgs} args - Arguments to find a VoucherItem
     * @example
     * // Get one VoucherItem
     * const voucherItem = await prisma.voucherItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoucherItemFindUniqueOrThrowArgs>(args: SelectSubset<T, VoucherItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VoucherItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherItemFindFirstArgs} args - Arguments to find a VoucherItem
     * @example
     * // Get one VoucherItem
     * const voucherItem = await prisma.voucherItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoucherItemFindFirstArgs>(args?: SelectSubset<T, VoucherItemFindFirstArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VoucherItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherItemFindFirstOrThrowArgs} args - Arguments to find a VoucherItem
     * @example
     * // Get one VoucherItem
     * const voucherItem = await prisma.voucherItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoucherItemFindFirstOrThrowArgs>(args?: SelectSubset<T, VoucherItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VoucherItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VoucherItems
     * const voucherItems = await prisma.voucherItem.findMany()
     * 
     * // Get first 10 VoucherItems
     * const voucherItems = await prisma.voucherItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voucherItemWithIdOnly = await prisma.voucherItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoucherItemFindManyArgs>(args?: SelectSubset<T, VoucherItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VoucherItem.
     * @param {VoucherItemCreateArgs} args - Arguments to create a VoucherItem.
     * @example
     * // Create one VoucherItem
     * const VoucherItem = await prisma.voucherItem.create({
     *   data: {
     *     // ... data to create a VoucherItem
     *   }
     * })
     * 
     */
    create<T extends VoucherItemCreateArgs>(args: SelectSubset<T, VoucherItemCreateArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VoucherItems.
     * @param {VoucherItemCreateManyArgs} args - Arguments to create many VoucherItems.
     * @example
     * // Create many VoucherItems
     * const voucherItem = await prisma.voucherItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoucherItemCreateManyArgs>(args?: SelectSubset<T, VoucherItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VoucherItems and returns the data saved in the database.
     * @param {VoucherItemCreateManyAndReturnArgs} args - Arguments to create many VoucherItems.
     * @example
     * // Create many VoucherItems
     * const voucherItem = await prisma.voucherItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VoucherItems and only return the `id`
     * const voucherItemWithIdOnly = await prisma.voucherItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoucherItemCreateManyAndReturnArgs>(args?: SelectSubset<T, VoucherItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VoucherItem.
     * @param {VoucherItemDeleteArgs} args - Arguments to delete one VoucherItem.
     * @example
     * // Delete one VoucherItem
     * const VoucherItem = await prisma.voucherItem.delete({
     *   where: {
     *     // ... filter to delete one VoucherItem
     *   }
     * })
     * 
     */
    delete<T extends VoucherItemDeleteArgs>(args: SelectSubset<T, VoucherItemDeleteArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VoucherItem.
     * @param {VoucherItemUpdateArgs} args - Arguments to update one VoucherItem.
     * @example
     * // Update one VoucherItem
     * const voucherItem = await prisma.voucherItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoucherItemUpdateArgs>(args: SelectSubset<T, VoucherItemUpdateArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VoucherItems.
     * @param {VoucherItemDeleteManyArgs} args - Arguments to filter VoucherItems to delete.
     * @example
     * // Delete a few VoucherItems
     * const { count } = await prisma.voucherItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoucherItemDeleteManyArgs>(args?: SelectSubset<T, VoucherItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VoucherItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VoucherItems
     * const voucherItem = await prisma.voucherItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoucherItemUpdateManyArgs>(args: SelectSubset<T, VoucherItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VoucherItem.
     * @param {VoucherItemUpsertArgs} args - Arguments to update or create a VoucherItem.
     * @example
     * // Update or create a VoucherItem
     * const voucherItem = await prisma.voucherItem.upsert({
     *   create: {
     *     // ... data to create a VoucherItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VoucherItem we want to update
     *   }
     * })
     */
    upsert<T extends VoucherItemUpsertArgs>(args: SelectSubset<T, VoucherItemUpsertArgs<ExtArgs>>): Prisma__VoucherItemClient<$Result.GetResult<Prisma.$VoucherItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VoucherItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherItemCountArgs} args - Arguments to filter VoucherItems to count.
     * @example
     * // Count the number of VoucherItems
     * const count = await prisma.voucherItem.count({
     *   where: {
     *     // ... the filter for the VoucherItems we want to count
     *   }
     * })
    **/
    count<T extends VoucherItemCountArgs>(
      args?: Subset<T, VoucherItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoucherItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VoucherItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoucherItemAggregateArgs>(args: Subset<T, VoucherItemAggregateArgs>): Prisma.PrismaPromise<GetVoucherItemAggregateType<T>>

    /**
     * Group by VoucherItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoucherItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoucherItemGroupByArgs['orderBy'] }
        : { orderBy?: VoucherItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoucherItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoucherItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VoucherItem model
   */
  readonly fields: VoucherItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VoucherItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoucherItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    voucher<T extends VoucherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VoucherDefaultArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    category<T extends ExpenseCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategoryDefaultArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VoucherItem model
   */ 
  interface VoucherItemFieldRefs {
    readonly id: FieldRef<"VoucherItem", 'String'>
    readonly voucherId: FieldRef<"VoucherItem", 'String'>
    readonly categoryId: FieldRef<"VoucherItem", 'String'>
    readonly amount: FieldRef<"VoucherItem", 'Float'>
    readonly description: FieldRef<"VoucherItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VoucherItem findUnique
   */
  export type VoucherItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * Filter, which VoucherItem to fetch.
     */
    where: VoucherItemWhereUniqueInput
  }

  /**
   * VoucherItem findUniqueOrThrow
   */
  export type VoucherItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * Filter, which VoucherItem to fetch.
     */
    where: VoucherItemWhereUniqueInput
  }

  /**
   * VoucherItem findFirst
   */
  export type VoucherItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * Filter, which VoucherItem to fetch.
     */
    where?: VoucherItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoucherItems to fetch.
     */
    orderBy?: VoucherItemOrderByWithRelationInput | VoucherItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoucherItems.
     */
    cursor?: VoucherItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoucherItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoucherItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoucherItems.
     */
    distinct?: VoucherItemScalarFieldEnum | VoucherItemScalarFieldEnum[]
  }

  /**
   * VoucherItem findFirstOrThrow
   */
  export type VoucherItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * Filter, which VoucherItem to fetch.
     */
    where?: VoucherItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoucherItems to fetch.
     */
    orderBy?: VoucherItemOrderByWithRelationInput | VoucherItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VoucherItems.
     */
    cursor?: VoucherItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoucherItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoucherItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VoucherItems.
     */
    distinct?: VoucherItemScalarFieldEnum | VoucherItemScalarFieldEnum[]
  }

  /**
   * VoucherItem findMany
   */
  export type VoucherItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * Filter, which VoucherItems to fetch.
     */
    where?: VoucherItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VoucherItems to fetch.
     */
    orderBy?: VoucherItemOrderByWithRelationInput | VoucherItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VoucherItems.
     */
    cursor?: VoucherItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VoucherItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VoucherItems.
     */
    skip?: number
    distinct?: VoucherItemScalarFieldEnum | VoucherItemScalarFieldEnum[]
  }

  /**
   * VoucherItem create
   */
  export type VoucherItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * The data needed to create a VoucherItem.
     */
    data: XOR<VoucherItemCreateInput, VoucherItemUncheckedCreateInput>
  }

  /**
   * VoucherItem createMany
   */
  export type VoucherItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VoucherItems.
     */
    data: VoucherItemCreateManyInput | VoucherItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VoucherItem createManyAndReturn
   */
  export type VoucherItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VoucherItems.
     */
    data: VoucherItemCreateManyInput | VoucherItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VoucherItem update
   */
  export type VoucherItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * The data needed to update a VoucherItem.
     */
    data: XOR<VoucherItemUpdateInput, VoucherItemUncheckedUpdateInput>
    /**
     * Choose, which VoucherItem to update.
     */
    where: VoucherItemWhereUniqueInput
  }

  /**
   * VoucherItem updateMany
   */
  export type VoucherItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VoucherItems.
     */
    data: XOR<VoucherItemUpdateManyMutationInput, VoucherItemUncheckedUpdateManyInput>
    /**
     * Filter which VoucherItems to update
     */
    where?: VoucherItemWhereInput
  }

  /**
   * VoucherItem upsert
   */
  export type VoucherItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * The filter to search for the VoucherItem to update in case it exists.
     */
    where: VoucherItemWhereUniqueInput
    /**
     * In case the VoucherItem found by the `where` argument doesn't exist, create a new VoucherItem with this data.
     */
    create: XOR<VoucherItemCreateInput, VoucherItemUncheckedCreateInput>
    /**
     * In case the VoucherItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoucherItemUpdateInput, VoucherItemUncheckedUpdateInput>
  }

  /**
   * VoucherItem delete
   */
  export type VoucherItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
    /**
     * Filter which VoucherItem to delete.
     */
    where: VoucherItemWhereUniqueInput
  }

  /**
   * VoucherItem deleteMany
   */
  export type VoucherItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VoucherItems to delete
     */
    where?: VoucherItemWhereInput
  }

  /**
   * VoucherItem without action
   */
  export type VoucherItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherItem
     */
    select?: VoucherItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
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

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
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

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const WorkTypeScalarFieldEnum: {
    id: 'id',
    description: 'description',
    presetGovFee: 'presetGovFee',
    presetTypingCharge: 'presetTypingCharge'
  };

  export type WorkTypeScalarFieldEnum = (typeof WorkTypeScalarFieldEnum)[keyof typeof WorkTypeScalarFieldEnum]


  export const BeneficiaryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    details: 'details',
    phone: 'phone',
    email: 'email',
    partnerId: 'partnerId'
  };

  export type BeneficiaryScalarFieldEnum = (typeof BeneficiaryScalarFieldEnum)[keyof typeof BeneficiaryScalarFieldEnum]


  export const PartnerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    liabilities: 'liabilities'
  };

  export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
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

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const ExpenseCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type ExpenseCategoryScalarFieldEnum = (typeof ExpenseCategoryScalarFieldEnum)[keyof typeof ExpenseCategoryScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    balance: 'balance'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VoucherScalarFieldEnum: {
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

  export type VoucherScalarFieldEnum = (typeof VoucherScalarFieldEnum)[keyof typeof VoucherScalarFieldEnum]


  export const VoucherItemScalarFieldEnum: {
    id: 'id',
    voucherId: 'voucherId',
    categoryId: 'categoryId',
    amount: 'amount',
    description: 'description'
  };

  export type VoucherItemScalarFieldEnum = (typeof VoucherItemScalarFieldEnum)[keyof typeof VoucherItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'InvoiceStatus'
   */
  export type EnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus'>
    


  /**
   * Reference to a field of type 'InvoiceStatus[]'
   */
  export type ListEnumInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceStatus[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'AdvanceStatus'
   */
  export type EnumAdvanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdvanceStatus'>
    


  /**
   * Reference to a field of type 'AdvanceStatus[]'
   */
  export type ListEnumAdvanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdvanceStatus[]'>
    


  /**
   * Reference to a field of type 'PartnerType'
   */
  export type EnumPartnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnerType'>
    


  /**
   * Reference to a field of type 'PartnerType[]'
   */
  export type ListEnumPartnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnerType[]'>
    


  /**
   * Reference to a field of type 'AccountType'
   */
  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  /**
   * Reference to a field of type 'AccountType[]'
   */
  export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>
    


  /**
   * Reference to a field of type 'VoucherStatus'
   */
  export type EnumVoucherStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoucherStatus'>
    


  /**
   * Reference to a field of type 'VoucherStatus[]'
   */
  export type ListEnumVoucherStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoucherStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    transactions?: TransactionListRelationFilter
    expenses?: ExpenseListRelationFilter
    invoices?: InvoiceListRelationFilter
    vouchers?: VoucherListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    transactions?: TransactionOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    invoices?: InvoiceOrderByRelationAggregateInput
    vouchers?: VoucherOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    transactions?: TransactionListRelationFilter
    expenses?: ExpenseListRelationFilter
    invoices?: InvoiceListRelationFilter
    vouchers?: VoucherListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    invoiceNo?: StringFilter<"Invoice"> | string
    date?: DateTimeFilter<"Invoice"> | Date | string
    customerId?: StringNullableFilter<"Invoice"> | string | null
    customerName?: StringNullableFilter<"Invoice"> | string | null
    agentId?: StringNullableFilter<"Invoice"> | string | null
    subtotal?: FloatFilter<"Invoice"> | number
    tax?: FloatFilter<"Invoice"> | number
    discount?: FloatFilter<"Invoice"> | number
    total?: FloatFilter<"Invoice"> | number
    paidAmount?: FloatFilter<"Invoice"> | number
    balance?: FloatFilter<"Invoice"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Invoice"> | $Enums.PaymentMethod
    paymentRef?: StringNullableFilter<"Invoice"> | string | null
    bankName?: StringNullableFilter<"Invoice"> | string | null
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    govtFeeAccountId?: StringNullableFilter<"Invoice"> | string | null
    govtFeeRef?: StringNullableFilter<"Invoice"> | string | null
    customerPhone?: StringNullableFilter<"Invoice"> | string | null
    customerEmail?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    agent?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    govtFeeAccount?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    transactions?: TransactionListRelationFilter
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    date?: SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    paymentMethod?: SortOrder
    paymentRef?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    status?: SortOrder
    govtFeeAccountId?: SortOrderInput | SortOrder
    govtFeeRef?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agent?: UserOrderByWithRelationInput
    govtFeeAccount?: AccountOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoiceNo?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    date?: DateTimeFilter<"Invoice"> | Date | string
    customerId?: StringNullableFilter<"Invoice"> | string | null
    customerName?: StringNullableFilter<"Invoice"> | string | null
    agentId?: StringNullableFilter<"Invoice"> | string | null
    subtotal?: FloatFilter<"Invoice"> | number
    tax?: FloatFilter<"Invoice"> | number
    discount?: FloatFilter<"Invoice"> | number
    total?: FloatFilter<"Invoice"> | number
    paidAmount?: FloatFilter<"Invoice"> | number
    balance?: FloatFilter<"Invoice"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Invoice"> | $Enums.PaymentMethod
    paymentRef?: StringNullableFilter<"Invoice"> | string | null
    bankName?: StringNullableFilter<"Invoice"> | string | null
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    govtFeeAccountId?: StringNullableFilter<"Invoice"> | string | null
    govtFeeRef?: StringNullableFilter<"Invoice"> | string | null
    customerPhone?: StringNullableFilter<"Invoice"> | string | null
    customerEmail?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    agent?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    govtFeeAccount?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    transactions?: TransactionListRelationFilter
  }, "id" | "invoiceNo">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    date?: SortOrder
    customerId?: SortOrderInput | SortOrder
    customerName?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    paymentMethod?: SortOrder
    paymentRef?: SortOrderInput | SortOrder
    bankName?: SortOrderInput | SortOrder
    status?: SortOrder
    govtFeeAccountId?: SortOrderInput | SortOrder
    govtFeeRef?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    customerEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    invoiceNo?: StringWithAggregatesFilter<"Invoice"> | string
    date?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    customerId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    customerName?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    agentId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    subtotal?: FloatWithAggregatesFilter<"Invoice"> | number
    tax?: FloatWithAggregatesFilter<"Invoice"> | number
    discount?: FloatWithAggregatesFilter<"Invoice"> | number
    total?: FloatWithAggregatesFilter<"Invoice"> | number
    paidAmount?: FloatWithAggregatesFilter<"Invoice"> | number
    balance?: FloatWithAggregatesFilter<"Invoice"> | number
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Invoice"> | $Enums.PaymentMethod
    paymentRef?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    bankName?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    status?: EnumInvoiceStatusWithAggregatesFilter<"Invoice"> | $Enums.InvoiceStatus
    govtFeeAccountId?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    govtFeeRef?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    customerPhone?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    customerEmail?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    invoiceId?: StringNullableFilter<"Transaction"> | string | null
    invNo?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    enteredById?: StringNullableFilter<"Transaction"> | string | null
    beneficiaryId?: StringNullableFilter<"Transaction"> | string | null
    partnerId?: StringNullableFilter<"Transaction"> | string | null
    workTypeId?: StringNullableFilter<"Transaction"> | string | null
    govFee?: FloatFilter<"Transaction"> | number
    typingCharge?: FloatFilter<"Transaction"> | number
    vat?: FloatFilter<"Transaction"> | number
    total?: FloatFilter<"Transaction"> | number
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    receiptNo?: StringNullableFilter<"Transaction"> | string | null
    govtFeeAccountId?: StringNullableFilter<"Transaction"> | string | null
    govtFeeRef?: StringNullableFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodFilter<"Transaction"> | $Enums.PaymentMethod
    cardId?: StringNullableFilter<"Transaction"> | string | null
    transactionId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumPaymentStatusFilter<"Transaction"> | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFilter<"Transaction"> | $Enums.AdvanceStatus
    advanceAmount?: FloatFilter<"Transaction"> | number
    customerName?: StringNullableFilter<"Transaction"> | string | null
    applicantName?: StringNullableFilter<"Transaction"> | string | null
    details?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
    enteredBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    beneficiary?: XOR<BeneficiaryNullableRelationFilter, BeneficiaryWhereInput> | null
    partner?: XOR<PartnerNullableRelationFilter, PartnerWhereInput> | null
    workType?: XOR<WorkTypeNullableRelationFilter, WorkTypeWhereInput> | null
    govtFeeAccount?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    account?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    invNo?: SortOrderInput | SortOrder
    date?: SortOrder
    enteredById?: SortOrderInput | SortOrder
    beneficiaryId?: SortOrderInput | SortOrder
    partnerId?: SortOrderInput | SortOrder
    workTypeId?: SortOrderInput | SortOrder
    govFee?: SortOrder
    typingCharge?: SortOrder
    vat?: SortOrder
    total?: SortOrder
    type?: SortOrder
    receiptNo?: SortOrderInput | SortOrder
    govtFeeAccountId?: SortOrderInput | SortOrder
    govtFeeRef?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    cardId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    advanceStatus?: SortOrder
    advanceAmount?: SortOrder
    customerName?: SortOrderInput | SortOrder
    applicantName?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoice?: InvoiceOrderByWithRelationInput
    enteredBy?: UserOrderByWithRelationInput
    beneficiary?: BeneficiaryOrderByWithRelationInput
    partner?: PartnerOrderByWithRelationInput
    workType?: WorkTypeOrderByWithRelationInput
    govtFeeAccount?: AccountOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    invoiceId?: StringNullableFilter<"Transaction"> | string | null
    invNo?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    enteredById?: StringNullableFilter<"Transaction"> | string | null
    beneficiaryId?: StringNullableFilter<"Transaction"> | string | null
    partnerId?: StringNullableFilter<"Transaction"> | string | null
    workTypeId?: StringNullableFilter<"Transaction"> | string | null
    govFee?: FloatFilter<"Transaction"> | number
    typingCharge?: FloatFilter<"Transaction"> | number
    vat?: FloatFilter<"Transaction"> | number
    total?: FloatFilter<"Transaction"> | number
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    receiptNo?: StringNullableFilter<"Transaction"> | string | null
    govtFeeAccountId?: StringNullableFilter<"Transaction"> | string | null
    govtFeeRef?: StringNullableFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodFilter<"Transaction"> | $Enums.PaymentMethod
    cardId?: StringNullableFilter<"Transaction"> | string | null
    transactionId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumPaymentStatusFilter<"Transaction"> | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFilter<"Transaction"> | $Enums.AdvanceStatus
    advanceAmount?: FloatFilter<"Transaction"> | number
    customerName?: StringNullableFilter<"Transaction"> | string | null
    applicantName?: StringNullableFilter<"Transaction"> | string | null
    details?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    invoice?: XOR<InvoiceNullableRelationFilter, InvoiceWhereInput> | null
    enteredBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    beneficiary?: XOR<BeneficiaryNullableRelationFilter, BeneficiaryWhereInput> | null
    partner?: XOR<PartnerNullableRelationFilter, PartnerWhereInput> | null
    workType?: XOR<WorkTypeNullableRelationFilter, WorkTypeWhereInput> | null
    govtFeeAccount?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    account?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceId?: SortOrderInput | SortOrder
    invNo?: SortOrderInput | SortOrder
    date?: SortOrder
    enteredById?: SortOrderInput | SortOrder
    beneficiaryId?: SortOrderInput | SortOrder
    partnerId?: SortOrderInput | SortOrder
    workTypeId?: SortOrderInput | SortOrder
    govFee?: SortOrder
    typingCharge?: SortOrder
    vat?: SortOrder
    total?: SortOrder
    type?: SortOrder
    receiptNo?: SortOrderInput | SortOrder
    govtFeeAccountId?: SortOrderInput | SortOrder
    govtFeeRef?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    cardId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    advanceStatus?: SortOrder
    advanceAmount?: SortOrder
    customerName?: SortOrderInput | SortOrder
    applicantName?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    invoiceId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    invNo?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    enteredById?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    beneficiaryId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    partnerId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    workTypeId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    govFee?: FloatWithAggregatesFilter<"Transaction"> | number
    typingCharge?: FloatWithAggregatesFilter<"Transaction"> | number
    vat?: FloatWithAggregatesFilter<"Transaction"> | number
    total?: FloatWithAggregatesFilter<"Transaction"> | number
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    receiptNo?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    govtFeeAccountId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    govtFeeRef?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Transaction"> | $Enums.PaymentMethod
    cardId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    transactionId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Transaction"> | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusWithAggregatesFilter<"Transaction"> | $Enums.AdvanceStatus
    advanceAmount?: FloatWithAggregatesFilter<"Transaction"> | number
    customerName?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    applicantName?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    details?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type WorkTypeWhereInput = {
    AND?: WorkTypeWhereInput | WorkTypeWhereInput[]
    OR?: WorkTypeWhereInput[]
    NOT?: WorkTypeWhereInput | WorkTypeWhereInput[]
    id?: StringFilter<"WorkType"> | string
    description?: StringFilter<"WorkType"> | string
    presetGovFee?: FloatFilter<"WorkType"> | number
    presetTypingCharge?: FloatFilter<"WorkType"> | number
    transactions?: TransactionListRelationFilter
  }

  export type WorkTypeOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    presetGovFee?: SortOrder
    presetTypingCharge?: SortOrder
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type WorkTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    description?: string
    AND?: WorkTypeWhereInput | WorkTypeWhereInput[]
    OR?: WorkTypeWhereInput[]
    NOT?: WorkTypeWhereInput | WorkTypeWhereInput[]
    presetGovFee?: FloatFilter<"WorkType"> | number
    presetTypingCharge?: FloatFilter<"WorkType"> | number
    transactions?: TransactionListRelationFilter
  }, "id" | "description">

  export type WorkTypeOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    presetGovFee?: SortOrder
    presetTypingCharge?: SortOrder
    _count?: WorkTypeCountOrderByAggregateInput
    _avg?: WorkTypeAvgOrderByAggregateInput
    _max?: WorkTypeMaxOrderByAggregateInput
    _min?: WorkTypeMinOrderByAggregateInput
    _sum?: WorkTypeSumOrderByAggregateInput
  }

  export type WorkTypeScalarWhereWithAggregatesInput = {
    AND?: WorkTypeScalarWhereWithAggregatesInput | WorkTypeScalarWhereWithAggregatesInput[]
    OR?: WorkTypeScalarWhereWithAggregatesInput[]
    NOT?: WorkTypeScalarWhereWithAggregatesInput | WorkTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkType"> | string
    description?: StringWithAggregatesFilter<"WorkType"> | string
    presetGovFee?: FloatWithAggregatesFilter<"WorkType"> | number
    presetTypingCharge?: FloatWithAggregatesFilter<"WorkType"> | number
  }

  export type BeneficiaryWhereInput = {
    AND?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    OR?: BeneficiaryWhereInput[]
    NOT?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    id?: StringFilter<"Beneficiary"> | string
    name?: StringFilter<"Beneficiary"> | string
    details?: StringNullableFilter<"Beneficiary"> | string | null
    phone?: StringNullableFilter<"Beneficiary"> | string | null
    email?: StringNullableFilter<"Beneficiary"> | string | null
    partnerId?: StringNullableFilter<"Beneficiary"> | string | null
    partner?: XOR<PartnerNullableRelationFilter, PartnerWhereInput> | null
    transactions?: TransactionListRelationFilter
  }

  export type BeneficiaryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    details?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    partnerId?: SortOrderInput | SortOrder
    partner?: PartnerOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type BeneficiaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    OR?: BeneficiaryWhereInput[]
    NOT?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    name?: StringFilter<"Beneficiary"> | string
    details?: StringNullableFilter<"Beneficiary"> | string | null
    phone?: StringNullableFilter<"Beneficiary"> | string | null
    email?: StringNullableFilter<"Beneficiary"> | string | null
    partnerId?: StringNullableFilter<"Beneficiary"> | string | null
    partner?: XOR<PartnerNullableRelationFilter, PartnerWhereInput> | null
    transactions?: TransactionListRelationFilter
  }, "id">

  export type BeneficiaryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    details?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    partnerId?: SortOrderInput | SortOrder
    _count?: BeneficiaryCountOrderByAggregateInput
    _max?: BeneficiaryMaxOrderByAggregateInput
    _min?: BeneficiaryMinOrderByAggregateInput
  }

  export type BeneficiaryScalarWhereWithAggregatesInput = {
    AND?: BeneficiaryScalarWhereWithAggregatesInput | BeneficiaryScalarWhereWithAggregatesInput[]
    OR?: BeneficiaryScalarWhereWithAggregatesInput[]
    NOT?: BeneficiaryScalarWhereWithAggregatesInput | BeneficiaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Beneficiary"> | string
    name?: StringWithAggregatesFilter<"Beneficiary"> | string
    details?: StringNullableWithAggregatesFilter<"Beneficiary"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Beneficiary"> | string | null
    email?: StringNullableWithAggregatesFilter<"Beneficiary"> | string | null
    partnerId?: StringNullableWithAggregatesFilter<"Beneficiary"> | string | null
  }

  export type PartnerWhereInput = {
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    id?: StringFilter<"Partner"> | string
    name?: StringFilter<"Partner"> | string
    type?: EnumPartnerTypeFilter<"Partner"> | $Enums.PartnerType
    liabilities?: FloatFilter<"Partner"> | number
    beneficiaries?: BeneficiaryListRelationFilter
    transactions?: TransactionListRelationFilter
    vouchers?: VoucherListRelationFilter
  }

  export type PartnerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    liabilities?: SortOrder
    beneficiaries?: BeneficiaryOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    vouchers?: VoucherOrderByRelationAggregateInput
  }

  export type PartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    type?: EnumPartnerTypeFilter<"Partner"> | $Enums.PartnerType
    liabilities?: FloatFilter<"Partner"> | number
    beneficiaries?: BeneficiaryListRelationFilter
    transactions?: TransactionListRelationFilter
    vouchers?: VoucherListRelationFilter
  }, "id" | "name">

  export type PartnerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    liabilities?: SortOrder
    _count?: PartnerCountOrderByAggregateInput
    _avg?: PartnerAvgOrderByAggregateInput
    _max?: PartnerMaxOrderByAggregateInput
    _min?: PartnerMinOrderByAggregateInput
    _sum?: PartnerSumOrderByAggregateInput
  }

  export type PartnerScalarWhereWithAggregatesInput = {
    AND?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    OR?: PartnerScalarWhereWithAggregatesInput[]
    NOT?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Partner"> | string
    name?: StringWithAggregatesFilter<"Partner"> | string
    type?: EnumPartnerTypeWithAggregatesFilter<"Partner"> | $Enums.PartnerType
    liabilities?: FloatWithAggregatesFilter<"Partner"> | number
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: StringFilter<"Expense"> | string
    date?: DateTimeFilter<"Expense"> | Date | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    categoryId?: StringFilter<"Expense"> | string
    paymentMethod?: EnumPaymentMethodFilter<"Expense"> | $Enums.PaymentMethod
    accountId?: StringNullableFilter<"Expense"> | string | null
    enteredById?: StringFilter<"Expense"> | string
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    category?: XOR<ExpenseCategoryRelationFilter, ExpenseCategoryWhereInput>
    account?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    enteredBy?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    categoryId?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrderInput | SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: ExpenseCategoryOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    enteredBy?: UserOrderByWithRelationInput
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    date?: DateTimeFilter<"Expense"> | Date | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    categoryId?: StringFilter<"Expense"> | string
    paymentMethod?: EnumPaymentMethodFilter<"Expense"> | $Enums.PaymentMethod
    accountId?: StringNullableFilter<"Expense"> | string | null
    enteredById?: StringFilter<"Expense"> | string
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    category?: XOR<ExpenseCategoryRelationFilter, ExpenseCategoryWhereInput>
    account?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    enteredBy?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    categoryId?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrderInput | SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Expense"> | string
    date?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    amount?: FloatWithAggregatesFilter<"Expense"> | number
    categoryId?: StringWithAggregatesFilter<"Expense"> | string
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Expense"> | $Enums.PaymentMethod
    accountId?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    enteredById?: StringWithAggregatesFilter<"Expense"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
  }

  export type ExpenseCategoryWhereInput = {
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    id?: StringFilter<"ExpenseCategory"> | string
    name?: StringFilter<"ExpenseCategory"> | string
    description?: StringNullableFilter<"ExpenseCategory"> | string | null
    expenses?: ExpenseListRelationFilter
    voucherItems?: VoucherItemListRelationFilter
  }

  export type ExpenseCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    expenses?: ExpenseOrderByRelationAggregateInput
    voucherItems?: VoucherItemOrderByRelationAggregateInput
  }

  export type ExpenseCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    description?: StringNullableFilter<"ExpenseCategory"> | string | null
    expenses?: ExpenseListRelationFilter
    voucherItems?: VoucherItemListRelationFilter
  }, "id" | "name">

  export type ExpenseCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: ExpenseCategoryCountOrderByAggregateInput
    _max?: ExpenseCategoryMaxOrderByAggregateInput
    _min?: ExpenseCategoryMinOrderByAggregateInput
  }

  export type ExpenseCategoryScalarWhereWithAggregatesInput = {
    AND?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    OR?: ExpenseCategoryScalarWhereWithAggregatesInput[]
    NOT?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    name?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    description?: StringNullableWithAggregatesFilter<"ExpenseCategory"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    type?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    balance?: FloatFilter<"Account"> | number
    transactions?: TransactionListRelationFilter
    expenses?: ExpenseListRelationFilter
    invoicesGovtFee?: InvoiceListRelationFilter
    transactionsGovtFee?: TransactionListRelationFilter
    vouchers?: VoucherListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
    transactions?: TransactionOrderByRelationAggregateInput
    expenses?: ExpenseOrderByRelationAggregateInput
    invoicesGovtFee?: InvoiceOrderByRelationAggregateInput
    transactionsGovtFee?: TransactionOrderByRelationAggregateInput
    vouchers?: VoucherOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    name?: StringFilter<"Account"> | string
    type?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    balance?: FloatFilter<"Account"> | number
    transactions?: TransactionListRelationFilter
    expenses?: ExpenseListRelationFilter
    invoicesGovtFee?: InvoiceListRelationFilter
    transactionsGovtFee?: TransactionListRelationFilter
    vouchers?: VoucherListRelationFilter
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    name?: StringWithAggregatesFilter<"Account"> | string
    type?: EnumAccountTypeWithAggregatesFilter<"Account"> | $Enums.AccountType
    balance?: FloatWithAggregatesFilter<"Account"> | number
  }

  export type VoucherWhereInput = {
    AND?: VoucherWhereInput | VoucherWhereInput[]
    OR?: VoucherWhereInput[]
    NOT?: VoucherWhereInput | VoucherWhereInput[]
    id?: StringFilter<"Voucher"> | string
    voucherNo?: StringFilter<"Voucher"> | string
    date?: DateTimeFilter<"Voucher"> | Date | string
    description?: StringNullableFilter<"Voucher"> | string | null
    vendorId?: StringNullableFilter<"Voucher"> | string | null
    vendorName?: StringNullableFilter<"Voucher"> | string | null
    total?: FloatFilter<"Voucher"> | number
    paidAmount?: FloatFilter<"Voucher"> | number
    balance?: FloatFilter<"Voucher"> | number
    status?: EnumVoucherStatusFilter<"Voucher"> | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFilter<"Voucher"> | $Enums.PaymentMethod
    accountId?: StringNullableFilter<"Voucher"> | string | null
    enteredById?: StringFilter<"Voucher"> | string
    createdAt?: DateTimeFilter<"Voucher"> | Date | string
    updatedAt?: DateTimeFilter<"Voucher"> | Date | string
    vendor?: XOR<PartnerNullableRelationFilter, PartnerWhereInput> | null
    account?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    enteredBy?: XOR<UserRelationFilter, UserWhereInput>
    items?: VoucherItemListRelationFilter
  }

  export type VoucherOrderByWithRelationInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    vendorId?: SortOrderInput | SortOrder
    vendorName?: SortOrderInput | SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrderInput | SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendor?: PartnerOrderByWithRelationInput
    account?: AccountOrderByWithRelationInput
    enteredBy?: UserOrderByWithRelationInput
    items?: VoucherItemOrderByRelationAggregateInput
  }

  export type VoucherWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    voucherNo?: string
    AND?: VoucherWhereInput | VoucherWhereInput[]
    OR?: VoucherWhereInput[]
    NOT?: VoucherWhereInput | VoucherWhereInput[]
    date?: DateTimeFilter<"Voucher"> | Date | string
    description?: StringNullableFilter<"Voucher"> | string | null
    vendorId?: StringNullableFilter<"Voucher"> | string | null
    vendorName?: StringNullableFilter<"Voucher"> | string | null
    total?: FloatFilter<"Voucher"> | number
    paidAmount?: FloatFilter<"Voucher"> | number
    balance?: FloatFilter<"Voucher"> | number
    status?: EnumVoucherStatusFilter<"Voucher"> | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFilter<"Voucher"> | $Enums.PaymentMethod
    accountId?: StringNullableFilter<"Voucher"> | string | null
    enteredById?: StringFilter<"Voucher"> | string
    createdAt?: DateTimeFilter<"Voucher"> | Date | string
    updatedAt?: DateTimeFilter<"Voucher"> | Date | string
    vendor?: XOR<PartnerNullableRelationFilter, PartnerWhereInput> | null
    account?: XOR<AccountNullableRelationFilter, AccountWhereInput> | null
    enteredBy?: XOR<UserRelationFilter, UserWhereInput>
    items?: VoucherItemListRelationFilter
  }, "id" | "voucherNo">

  export type VoucherOrderByWithAggregationInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    vendorId?: SortOrderInput | SortOrder
    vendorName?: SortOrderInput | SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrderInput | SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VoucherCountOrderByAggregateInput
    _avg?: VoucherAvgOrderByAggregateInput
    _max?: VoucherMaxOrderByAggregateInput
    _min?: VoucherMinOrderByAggregateInput
    _sum?: VoucherSumOrderByAggregateInput
  }

  export type VoucherScalarWhereWithAggregatesInput = {
    AND?: VoucherScalarWhereWithAggregatesInput | VoucherScalarWhereWithAggregatesInput[]
    OR?: VoucherScalarWhereWithAggregatesInput[]
    NOT?: VoucherScalarWhereWithAggregatesInput | VoucherScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Voucher"> | string
    voucherNo?: StringWithAggregatesFilter<"Voucher"> | string
    date?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Voucher"> | string | null
    vendorId?: StringNullableWithAggregatesFilter<"Voucher"> | string | null
    vendorName?: StringNullableWithAggregatesFilter<"Voucher"> | string | null
    total?: FloatWithAggregatesFilter<"Voucher"> | number
    paidAmount?: FloatWithAggregatesFilter<"Voucher"> | number
    balance?: FloatWithAggregatesFilter<"Voucher"> | number
    status?: EnumVoucherStatusWithAggregatesFilter<"Voucher"> | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Voucher"> | $Enums.PaymentMethod
    accountId?: StringNullableWithAggregatesFilter<"Voucher"> | string | null
    enteredById?: StringWithAggregatesFilter<"Voucher"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
  }

  export type VoucherItemWhereInput = {
    AND?: VoucherItemWhereInput | VoucherItemWhereInput[]
    OR?: VoucherItemWhereInput[]
    NOT?: VoucherItemWhereInput | VoucherItemWhereInput[]
    id?: StringFilter<"VoucherItem"> | string
    voucherId?: StringFilter<"VoucherItem"> | string
    categoryId?: StringFilter<"VoucherItem"> | string
    amount?: FloatFilter<"VoucherItem"> | number
    description?: StringNullableFilter<"VoucherItem"> | string | null
    voucher?: XOR<VoucherRelationFilter, VoucherWhereInput>
    category?: XOR<ExpenseCategoryRelationFilter, ExpenseCategoryWhereInput>
  }

  export type VoucherItemOrderByWithRelationInput = {
    id?: SortOrder
    voucherId?: SortOrder
    categoryId?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    voucher?: VoucherOrderByWithRelationInput
    category?: ExpenseCategoryOrderByWithRelationInput
  }

  export type VoucherItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VoucherItemWhereInput | VoucherItemWhereInput[]
    OR?: VoucherItemWhereInput[]
    NOT?: VoucherItemWhereInput | VoucherItemWhereInput[]
    voucherId?: StringFilter<"VoucherItem"> | string
    categoryId?: StringFilter<"VoucherItem"> | string
    amount?: FloatFilter<"VoucherItem"> | number
    description?: StringNullableFilter<"VoucherItem"> | string | null
    voucher?: XOR<VoucherRelationFilter, VoucherWhereInput>
    category?: XOR<ExpenseCategoryRelationFilter, ExpenseCategoryWhereInput>
  }, "id">

  export type VoucherItemOrderByWithAggregationInput = {
    id?: SortOrder
    voucherId?: SortOrder
    categoryId?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: VoucherItemCountOrderByAggregateInput
    _avg?: VoucherItemAvgOrderByAggregateInput
    _max?: VoucherItemMaxOrderByAggregateInput
    _min?: VoucherItemMinOrderByAggregateInput
    _sum?: VoucherItemSumOrderByAggregateInput
  }

  export type VoucherItemScalarWhereWithAggregatesInput = {
    AND?: VoucherItemScalarWhereWithAggregatesInput | VoucherItemScalarWhereWithAggregatesInput[]
    OR?: VoucherItemScalarWhereWithAggregatesInput[]
    NOT?: VoucherItemScalarWhereWithAggregatesInput | VoucherItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VoucherItem"> | string
    voucherId?: StringWithAggregatesFilter<"VoucherItem"> | string
    categoryId?: StringWithAggregatesFilter<"VoucherItem"> | string
    amount?: FloatWithAggregatesFilter<"VoucherItem"> | number
    description?: StringNullableWithAggregatesFilter<"VoucherItem"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutEnteredByInput
    expenses?: ExpenseCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceCreateNestedManyWithoutAgentInput
    vouchers?: VoucherCreateNestedManyWithoutEnteredByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutEnteredByInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutAgentInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutEnteredByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutEnteredByNestedInput
    expenses?: ExpenseUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUpdateManyWithoutAgentNestedInput
    vouchers?: VoucherUpdateManyWithoutEnteredByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutEnteredByNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutAgentNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutEnteredByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent?: UserCreateNestedOneWithoutInvoicesInput
    govtFeeAccount?: AccountCreateNestedOneWithoutInvoicesGovtFeeInput
    transactions?: TransactionCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    agentId?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: UserUpdateOneWithoutInvoicesNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutInvoicesGovtFeeNestedInput
    transactions?: TransactionUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceCreateManyInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    agentId?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutTransactionsInput
    enteredBy?: UserCreateNestedOneWithoutTransactionsInput
    beneficiary?: BeneficiaryCreateNestedOneWithoutTransactionsInput
    partner?: PartnerCreateNestedOneWithoutTransactionsInput
    workType?: WorkTypeCreateNestedOneWithoutTransactionsInput
    govtFeeAccount?: AccountCreateNestedOneWithoutTransactionsGovtFeeInput
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutTransactionsNestedInput
    enteredBy?: UserUpdateOneWithoutTransactionsNestedInput
    beneficiary?: BeneficiaryUpdateOneWithoutTransactionsNestedInput
    partner?: PartnerUpdateOneWithoutTransactionsNestedInput
    workType?: WorkTypeUpdateOneWithoutTransactionsNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutTransactionsGovtFeeNestedInput
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkTypeCreateInput = {
    id?: string
    description: string
    presetGovFee?: number
    presetTypingCharge?: number
    transactions?: TransactionCreateNestedManyWithoutWorkTypeInput
  }

  export type WorkTypeUncheckedCreateInput = {
    id?: string
    description: string
    presetGovFee?: number
    presetTypingCharge?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutWorkTypeInput
  }

  export type WorkTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    presetGovFee?: FloatFieldUpdateOperationsInput | number
    presetTypingCharge?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutWorkTypeNestedInput
  }

  export type WorkTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    presetGovFee?: FloatFieldUpdateOperationsInput | number
    presetTypingCharge?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutWorkTypeNestedInput
  }

  export type WorkTypeCreateManyInput = {
    id?: string
    description: string
    presetGovFee?: number
    presetTypingCharge?: number
  }

  export type WorkTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    presetGovFee?: FloatFieldUpdateOperationsInput | number
    presetTypingCharge?: FloatFieldUpdateOperationsInput | number
  }

  export type WorkTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    presetGovFee?: FloatFieldUpdateOperationsInput | number
    presetTypingCharge?: FloatFieldUpdateOperationsInput | number
  }

  export type BeneficiaryCreateInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
    partner?: PartnerCreateNestedOneWithoutBeneficiariesInput
    transactions?: TransactionCreateNestedManyWithoutBeneficiaryInput
  }

  export type BeneficiaryUncheckedCreateInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
    partnerId?: string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutBeneficiaryInput
  }

  export type BeneficiaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partner?: PartnerUpdateOneWithoutBeneficiariesNestedInput
    transactions?: TransactionUpdateManyWithoutBeneficiaryNestedInput
  }

  export type BeneficiaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutBeneficiaryNestedInput
  }

  export type BeneficiaryCreateManyInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
    partnerId?: string | null
  }

  export type BeneficiaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BeneficiaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PartnerCreateInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    beneficiaries?: BeneficiaryCreateNestedManyWithoutPartnerInput
    transactions?: TransactionCreateNestedManyWithoutPartnerInput
    vouchers?: VoucherCreateNestedManyWithoutVendorInput
  }

  export type PartnerUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    beneficiaries?: BeneficiaryUncheckedCreateNestedManyWithoutPartnerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutPartnerInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutVendorInput
  }

  export type PartnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    beneficiaries?: BeneficiaryUpdateManyWithoutPartnerNestedInput
    transactions?: TransactionUpdateManyWithoutPartnerNestedInput
    vouchers?: VoucherUpdateManyWithoutVendorNestedInput
  }

  export type PartnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    beneficiaries?: BeneficiaryUncheckedUpdateManyWithoutPartnerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutPartnerNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type PartnerCreateManyInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
  }

  export type PartnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
  }

  export type PartnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
  }

  export type ExpenseCreateInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    paymentMethod: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    account?: AccountCreateNestedOneWithoutExpensesInput
    enteredBy: UserCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    categoryId: string
    paymentMethod: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    account?: AccountUpdateOneWithoutExpensesNestedInput
    enteredBy?: UserUpdateOneRequiredWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    categoryId: string
    paymentMethod: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryCreateInput = {
    id?: string
    name: string
    description?: string | null
    expenses?: ExpenseCreateNestedManyWithoutCategoryInput
    voucherItems?: VoucherItemCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
    voucherItems?: VoucherItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenses?: ExpenseUpdateManyWithoutCategoryNestedInput
    voucherItems?: VoucherItemUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenses?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
    voucherItems?: VoucherItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryCreateManyInput = {
    id?: string
    name: string
    description?: string | null
  }

  export type ExpenseCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionCreateNestedManyWithoutAccountInput
    expenses?: ExpenseCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutAccountInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
  }

  export type VoucherCreateInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor?: PartnerCreateNestedOneWithoutVouchersInput
    account?: AccountCreateNestedOneWithoutVouchersInput
    enteredBy: UserCreateNestedOneWithoutVouchersInput
    items?: VoucherItemCreateNestedManyWithoutVoucherInput
  }

  export type VoucherUncheckedCreateInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorId?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: VoucherItemUncheckedCreateNestedManyWithoutVoucherInput
  }

  export type VoucherUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: PartnerUpdateOneWithoutVouchersNestedInput
    account?: AccountUpdateOneWithoutVouchersNestedInput
    enteredBy?: UserUpdateOneRequiredWithoutVouchersNestedInput
    items?: VoucherItemUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VoucherItemUncheckedUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherCreateManyInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorId?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoucherUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherItemCreateInput = {
    id?: string
    amount: number
    description?: string | null
    voucher: VoucherCreateNestedOneWithoutItemsInput
    category: ExpenseCategoryCreateNestedOneWithoutVoucherItemsInput
  }

  export type VoucherItemUncheckedCreateInput = {
    id?: string
    voucherId: string
    categoryId: string
    amount: number
    description?: string | null
  }

  export type VoucherItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    voucher?: VoucherUpdateOneRequiredWithoutItemsNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutVoucherItemsNestedInput
  }

  export type VoucherItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoucherItemCreateManyInput = {
    id?: string
    voucherId: string
    categoryId: string
    amount: number
    description?: string | null
  }

  export type VoucherItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoucherItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type ExpenseListRelationFilter = {
    every?: ExpenseWhereInput
    some?: ExpenseWhereInput
    none?: ExpenseWhereInput
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type VoucherListRelationFilter = {
    every?: VoucherWhereInput
    some?: VoucherWhereInput
    none?: VoucherWhereInput
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VoucherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AccountNullableRelationFilter = {
    is?: AccountWhereInput | null
    isNot?: AccountWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    date?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    agentId?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    paymentMethod?: SortOrder
    paymentRef?: SortOrder
    bankName?: SortOrder
    status?: SortOrder
    govtFeeAccountId?: SortOrder
    govtFeeRef?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    date?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    agentId?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    paymentMethod?: SortOrder
    paymentRef?: SortOrder
    bankName?: SortOrder
    status?: SortOrder
    govtFeeAccountId?: SortOrder
    govtFeeRef?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceNo?: SortOrder
    date?: SortOrder
    customerId?: SortOrder
    customerName?: SortOrder
    agentId?: SortOrder
    subtotal?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    paymentMethod?: SortOrder
    paymentRef?: SortOrder
    bankName?: SortOrder
    status?: SortOrder
    govtFeeAccountId?: SortOrder
    govtFeeRef?: SortOrder
    customerPhone?: SortOrder
    customerEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    subtotal?: SortOrder
    tax?: SortOrder
    discount?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumAdvanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AdvanceStatus | EnumAdvanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAdvanceStatusFilter<$PrismaModel> | $Enums.AdvanceStatus
  }

  export type InvoiceNullableRelationFilter = {
    is?: InvoiceWhereInput | null
    isNot?: InvoiceWhereInput | null
  }

  export type BeneficiaryNullableRelationFilter = {
    is?: BeneficiaryWhereInput | null
    isNot?: BeneficiaryWhereInput | null
  }

  export type PartnerNullableRelationFilter = {
    is?: PartnerWhereInput | null
    isNot?: PartnerWhereInput | null
  }

  export type WorkTypeNullableRelationFilter = {
    is?: WorkTypeWhereInput | null
    isNot?: WorkTypeWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    invNo?: SortOrder
    date?: SortOrder
    enteredById?: SortOrder
    beneficiaryId?: SortOrder
    partnerId?: SortOrder
    workTypeId?: SortOrder
    govFee?: SortOrder
    typingCharge?: SortOrder
    vat?: SortOrder
    total?: SortOrder
    type?: SortOrder
    receiptNo?: SortOrder
    govtFeeAccountId?: SortOrder
    govtFeeRef?: SortOrder
    paymentMethod?: SortOrder
    cardId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    advanceStatus?: SortOrder
    advanceAmount?: SortOrder
    customerName?: SortOrder
    applicantName?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    govFee?: SortOrder
    typingCharge?: SortOrder
    vat?: SortOrder
    total?: SortOrder
    advanceAmount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    invNo?: SortOrder
    date?: SortOrder
    enteredById?: SortOrder
    beneficiaryId?: SortOrder
    partnerId?: SortOrder
    workTypeId?: SortOrder
    govFee?: SortOrder
    typingCharge?: SortOrder
    vat?: SortOrder
    total?: SortOrder
    type?: SortOrder
    receiptNo?: SortOrder
    govtFeeAccountId?: SortOrder
    govtFeeRef?: SortOrder
    paymentMethod?: SortOrder
    cardId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    advanceStatus?: SortOrder
    advanceAmount?: SortOrder
    customerName?: SortOrder
    applicantName?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    invNo?: SortOrder
    date?: SortOrder
    enteredById?: SortOrder
    beneficiaryId?: SortOrder
    partnerId?: SortOrder
    workTypeId?: SortOrder
    govFee?: SortOrder
    typingCharge?: SortOrder
    vat?: SortOrder
    total?: SortOrder
    type?: SortOrder
    receiptNo?: SortOrder
    govtFeeAccountId?: SortOrder
    govtFeeRef?: SortOrder
    paymentMethod?: SortOrder
    cardId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    advanceStatus?: SortOrder
    advanceAmount?: SortOrder
    customerName?: SortOrder
    applicantName?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    govFee?: SortOrder
    typingCharge?: SortOrder
    vat?: SortOrder
    total?: SortOrder
    advanceAmount?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumAdvanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdvanceStatus | EnumAdvanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAdvanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AdvanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdvanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAdvanceStatusFilter<$PrismaModel>
  }

  export type WorkTypeCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    presetGovFee?: SortOrder
    presetTypingCharge?: SortOrder
  }

  export type WorkTypeAvgOrderByAggregateInput = {
    presetGovFee?: SortOrder
    presetTypingCharge?: SortOrder
  }

  export type WorkTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    presetGovFee?: SortOrder
    presetTypingCharge?: SortOrder
  }

  export type WorkTypeMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    presetGovFee?: SortOrder
    presetTypingCharge?: SortOrder
  }

  export type WorkTypeSumOrderByAggregateInput = {
    presetGovFee?: SortOrder
    presetTypingCharge?: SortOrder
  }

  export type BeneficiaryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    details?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    partnerId?: SortOrder
  }

  export type BeneficiaryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    details?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    partnerId?: SortOrder
  }

  export type BeneficiaryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    details?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    partnerId?: SortOrder
  }

  export type EnumPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeFilter<$PrismaModel> | $Enums.PartnerType
  }

  export type BeneficiaryListRelationFilter = {
    every?: BeneficiaryWhereInput
    some?: BeneficiaryWhereInput
    none?: BeneficiaryWhereInput
  }

  export type BeneficiaryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartnerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    liabilities?: SortOrder
  }

  export type PartnerAvgOrderByAggregateInput = {
    liabilities?: SortOrder
  }

  export type PartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    liabilities?: SortOrder
  }

  export type PartnerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    liabilities?: SortOrder
  }

  export type PartnerSumOrderByAggregateInput = {
    liabilities?: SortOrder
  }

  export type EnumPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnerTypeFilter<$PrismaModel>
    _max?: NestedEnumPartnerTypeFilter<$PrismaModel>
  }

  export type ExpenseCategoryRelationFilter = {
    is?: ExpenseCategoryWhereInput
    isNot?: ExpenseCategoryWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    categoryId?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    categoryId?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    categoryId?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type VoucherItemListRelationFilter = {
    every?: VoucherItemWhereInput
    some?: VoucherItemWhereInput
    none?: VoucherItemWhereInput
  }

  export type VoucherItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type ExpenseCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type ExpenseCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    balance?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type EnumVoucherStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | EnumVoucherStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVoucherStatusFilter<$PrismaModel> | $Enums.VoucherStatus
  }

  export type VoucherCountOrderByAggregateInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    date?: SortOrder
    description?: SortOrder
    vendorId?: SortOrder
    vendorName?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoucherAvgOrderByAggregateInput = {
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
  }

  export type VoucherMaxOrderByAggregateInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    date?: SortOrder
    description?: SortOrder
    vendorId?: SortOrder
    vendorName?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoucherMinOrderByAggregateInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    date?: SortOrder
    description?: SortOrder
    vendorId?: SortOrder
    vendorName?: SortOrder
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    accountId?: SortOrder
    enteredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VoucherSumOrderByAggregateInput = {
    total?: SortOrder
    paidAmount?: SortOrder
    balance?: SortOrder
  }

  export type EnumVoucherStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | EnumVoucherStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVoucherStatusWithAggregatesFilter<$PrismaModel> | $Enums.VoucherStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVoucherStatusFilter<$PrismaModel>
    _max?: NestedEnumVoucherStatusFilter<$PrismaModel>
  }

  export type VoucherRelationFilter = {
    is?: VoucherWhereInput
    isNot?: VoucherWhereInput
  }

  export type VoucherItemCountOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    categoryId?: SortOrder
    amount?: SortOrder
    description?: SortOrder
  }

  export type VoucherItemAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type VoucherItemMaxOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    categoryId?: SortOrder
    amount?: SortOrder
    description?: SortOrder
  }

  export type VoucherItemMinOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    categoryId?: SortOrder
    amount?: SortOrder
    description?: SortOrder
  }

  export type VoucherItemSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionCreateNestedManyWithoutEnteredByInput = {
    create?: XOR<TransactionCreateWithoutEnteredByInput, TransactionUncheckedCreateWithoutEnteredByInput> | TransactionCreateWithoutEnteredByInput[] | TransactionUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutEnteredByInput | TransactionCreateOrConnectWithoutEnteredByInput[]
    createMany?: TransactionCreateManyEnteredByInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutEnteredByInput = {
    create?: XOR<ExpenseCreateWithoutEnteredByInput, ExpenseUncheckedCreateWithoutEnteredByInput> | ExpenseCreateWithoutEnteredByInput[] | ExpenseUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutEnteredByInput | ExpenseCreateOrConnectWithoutEnteredByInput[]
    createMany?: ExpenseCreateManyEnteredByInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutAgentInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type VoucherCreateNestedManyWithoutEnteredByInput = {
    create?: XOR<VoucherCreateWithoutEnteredByInput, VoucherUncheckedCreateWithoutEnteredByInput> | VoucherCreateWithoutEnteredByInput[] | VoucherUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutEnteredByInput | VoucherCreateOrConnectWithoutEnteredByInput[]
    createMany?: VoucherCreateManyEnteredByInputEnvelope
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutEnteredByInput = {
    create?: XOR<TransactionCreateWithoutEnteredByInput, TransactionUncheckedCreateWithoutEnteredByInput> | TransactionCreateWithoutEnteredByInput[] | TransactionUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutEnteredByInput | TransactionCreateOrConnectWithoutEnteredByInput[]
    createMany?: TransactionCreateManyEnteredByInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutEnteredByInput = {
    create?: XOR<ExpenseCreateWithoutEnteredByInput, ExpenseUncheckedCreateWithoutEnteredByInput> | ExpenseCreateWithoutEnteredByInput[] | ExpenseUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutEnteredByInput | ExpenseCreateOrConnectWithoutEnteredByInput[]
    createMany?: ExpenseCreateManyEnteredByInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type VoucherUncheckedCreateNestedManyWithoutEnteredByInput = {
    create?: XOR<VoucherCreateWithoutEnteredByInput, VoucherUncheckedCreateWithoutEnteredByInput> | VoucherCreateWithoutEnteredByInput[] | VoucherUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutEnteredByInput | VoucherCreateOrConnectWithoutEnteredByInput[]
    createMany?: VoucherCreateManyEnteredByInputEnvelope
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TransactionUpdateManyWithoutEnteredByNestedInput = {
    create?: XOR<TransactionCreateWithoutEnteredByInput, TransactionUncheckedCreateWithoutEnteredByInput> | TransactionCreateWithoutEnteredByInput[] | TransactionUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutEnteredByInput | TransactionCreateOrConnectWithoutEnteredByInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutEnteredByInput | TransactionUpsertWithWhereUniqueWithoutEnteredByInput[]
    createMany?: TransactionCreateManyEnteredByInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutEnteredByInput | TransactionUpdateWithWhereUniqueWithoutEnteredByInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutEnteredByInput | TransactionUpdateManyWithWhereWithoutEnteredByInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutEnteredByNestedInput = {
    create?: XOR<ExpenseCreateWithoutEnteredByInput, ExpenseUncheckedCreateWithoutEnteredByInput> | ExpenseCreateWithoutEnteredByInput[] | ExpenseUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutEnteredByInput | ExpenseCreateOrConnectWithoutEnteredByInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutEnteredByInput | ExpenseUpsertWithWhereUniqueWithoutEnteredByInput[]
    createMany?: ExpenseCreateManyEnteredByInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutEnteredByInput | ExpenseUpdateWithWhereUniqueWithoutEnteredByInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutEnteredByInput | ExpenseUpdateManyWithWhereWithoutEnteredByInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutAgentNestedInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutAgentInput | InvoiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutAgentInput | InvoiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutAgentInput | InvoiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type VoucherUpdateManyWithoutEnteredByNestedInput = {
    create?: XOR<VoucherCreateWithoutEnteredByInput, VoucherUncheckedCreateWithoutEnteredByInput> | VoucherCreateWithoutEnteredByInput[] | VoucherUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutEnteredByInput | VoucherCreateOrConnectWithoutEnteredByInput[]
    upsert?: VoucherUpsertWithWhereUniqueWithoutEnteredByInput | VoucherUpsertWithWhereUniqueWithoutEnteredByInput[]
    createMany?: VoucherCreateManyEnteredByInputEnvelope
    set?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    disconnect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    delete?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    update?: VoucherUpdateWithWhereUniqueWithoutEnteredByInput | VoucherUpdateWithWhereUniqueWithoutEnteredByInput[]
    updateMany?: VoucherUpdateManyWithWhereWithoutEnteredByInput | VoucherUpdateManyWithWhereWithoutEnteredByInput[]
    deleteMany?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutEnteredByNestedInput = {
    create?: XOR<TransactionCreateWithoutEnteredByInput, TransactionUncheckedCreateWithoutEnteredByInput> | TransactionCreateWithoutEnteredByInput[] | TransactionUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutEnteredByInput | TransactionCreateOrConnectWithoutEnteredByInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutEnteredByInput | TransactionUpsertWithWhereUniqueWithoutEnteredByInput[]
    createMany?: TransactionCreateManyEnteredByInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutEnteredByInput | TransactionUpdateWithWhereUniqueWithoutEnteredByInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutEnteredByInput | TransactionUpdateManyWithWhereWithoutEnteredByInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutEnteredByNestedInput = {
    create?: XOR<ExpenseCreateWithoutEnteredByInput, ExpenseUncheckedCreateWithoutEnteredByInput> | ExpenseCreateWithoutEnteredByInput[] | ExpenseUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutEnteredByInput | ExpenseCreateOrConnectWithoutEnteredByInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutEnteredByInput | ExpenseUpsertWithWhereUniqueWithoutEnteredByInput[]
    createMany?: ExpenseCreateManyEnteredByInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutEnteredByInput | ExpenseUpdateWithWhereUniqueWithoutEnteredByInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutEnteredByInput | ExpenseUpdateManyWithWhereWithoutEnteredByInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutAgentInput | InvoiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutAgentInput | InvoiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutAgentInput | InvoiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type VoucherUncheckedUpdateManyWithoutEnteredByNestedInput = {
    create?: XOR<VoucherCreateWithoutEnteredByInput, VoucherUncheckedCreateWithoutEnteredByInput> | VoucherCreateWithoutEnteredByInput[] | VoucherUncheckedCreateWithoutEnteredByInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutEnteredByInput | VoucherCreateOrConnectWithoutEnteredByInput[]
    upsert?: VoucherUpsertWithWhereUniqueWithoutEnteredByInput | VoucherUpsertWithWhereUniqueWithoutEnteredByInput[]
    createMany?: VoucherCreateManyEnteredByInputEnvelope
    set?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    disconnect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    delete?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    update?: VoucherUpdateWithWhereUniqueWithoutEnteredByInput | VoucherUpdateWithWhereUniqueWithoutEnteredByInput[]
    updateMany?: VoucherUpdateManyWithWhereWithoutEnteredByInput | VoucherUpdateManyWithWhereWithoutEnteredByInput[]
    deleteMany?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvoicesInput
    connect?: UserWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutInvoicesGovtFeeInput = {
    create?: XOR<AccountCreateWithoutInvoicesGovtFeeInput, AccountUncheckedCreateWithoutInvoicesGovtFeeInput>
    connectOrCreate?: AccountCreateOrConnectWithoutInvoicesGovtFeeInput
    connect?: AccountWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<TransactionCreateWithoutInvoiceInput, TransactionUncheckedCreateWithoutInvoiceInput> | TransactionCreateWithoutInvoiceInput[] | TransactionUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutInvoiceInput | TransactionCreateOrConnectWithoutInvoiceInput[]
    createMany?: TransactionCreateManyInvoiceInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<TransactionCreateWithoutInvoiceInput, TransactionUncheckedCreateWithoutInvoiceInput> | TransactionCreateWithoutInvoiceInput[] | TransactionUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutInvoiceInput | TransactionCreateOrConnectWithoutInvoiceInput[]
    createMany?: TransactionCreateManyInvoiceInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus
  }

  export type UserUpdateOneWithoutInvoicesNestedInput = {
    create?: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvoicesInput
    upsert?: UserUpsertWithoutInvoicesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvoicesInput, UserUpdateWithoutInvoicesInput>, UserUncheckedUpdateWithoutInvoicesInput>
  }

  export type AccountUpdateOneWithoutInvoicesGovtFeeNestedInput = {
    create?: XOR<AccountCreateWithoutInvoicesGovtFeeInput, AccountUncheckedCreateWithoutInvoicesGovtFeeInput>
    connectOrCreate?: AccountCreateOrConnectWithoutInvoicesGovtFeeInput
    upsert?: AccountUpsertWithoutInvoicesGovtFeeInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutInvoicesGovtFeeInput, AccountUpdateWithoutInvoicesGovtFeeInput>, AccountUncheckedUpdateWithoutInvoicesGovtFeeInput>
  }

  export type TransactionUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<TransactionCreateWithoutInvoiceInput, TransactionUncheckedCreateWithoutInvoiceInput> | TransactionCreateWithoutInvoiceInput[] | TransactionUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutInvoiceInput | TransactionCreateOrConnectWithoutInvoiceInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutInvoiceInput | TransactionUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: TransactionCreateManyInvoiceInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutInvoiceInput | TransactionUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutInvoiceInput | TransactionUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<TransactionCreateWithoutInvoiceInput, TransactionUncheckedCreateWithoutInvoiceInput> | TransactionCreateWithoutInvoiceInput[] | TransactionUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutInvoiceInput | TransactionCreateOrConnectWithoutInvoiceInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutInvoiceInput | TransactionUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: TransactionCreateManyInvoiceInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutInvoiceInput | TransactionUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutInvoiceInput | TransactionUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type InvoiceCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<InvoiceCreateWithoutTransactionsInput, InvoiceUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutTransactionsInput
    connect?: InvoiceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type BeneficiaryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<BeneficiaryCreateWithoutTransactionsInput, BeneficiaryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: BeneficiaryCreateOrConnectWithoutTransactionsInput
    connect?: BeneficiaryWhereUniqueInput
  }

  export type PartnerCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<PartnerCreateWithoutTransactionsInput, PartnerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutTransactionsInput
    connect?: PartnerWhereUniqueInput
  }

  export type WorkTypeCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WorkTypeCreateWithoutTransactionsInput, WorkTypeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WorkTypeCreateOrConnectWithoutTransactionsInput
    connect?: WorkTypeWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutTransactionsGovtFeeInput = {
    create?: XOR<AccountCreateWithoutTransactionsGovtFeeInput, AccountUncheckedCreateWithoutTransactionsGovtFeeInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsGovtFeeInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsInput
    connect?: AccountWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type EnumAdvanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AdvanceStatus
  }

  export type InvoiceUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<InvoiceCreateWithoutTransactionsInput, InvoiceUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutTransactionsInput
    upsert?: InvoiceUpsertWithoutTransactionsInput
    disconnect?: InvoiceWhereInput | boolean
    delete?: InvoiceWhereInput | boolean
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutTransactionsInput, InvoiceUpdateWithoutTransactionsInput>, InvoiceUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type BeneficiaryUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<BeneficiaryCreateWithoutTransactionsInput, BeneficiaryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: BeneficiaryCreateOrConnectWithoutTransactionsInput
    upsert?: BeneficiaryUpsertWithoutTransactionsInput
    disconnect?: BeneficiaryWhereInput | boolean
    delete?: BeneficiaryWhereInput | boolean
    connect?: BeneficiaryWhereUniqueInput
    update?: XOR<XOR<BeneficiaryUpdateToOneWithWhereWithoutTransactionsInput, BeneficiaryUpdateWithoutTransactionsInput>, BeneficiaryUncheckedUpdateWithoutTransactionsInput>
  }

  export type PartnerUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<PartnerCreateWithoutTransactionsInput, PartnerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutTransactionsInput
    upsert?: PartnerUpsertWithoutTransactionsInput
    disconnect?: PartnerWhereInput | boolean
    delete?: PartnerWhereInput | boolean
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutTransactionsInput, PartnerUpdateWithoutTransactionsInput>, PartnerUncheckedUpdateWithoutTransactionsInput>
  }

  export type WorkTypeUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<WorkTypeCreateWithoutTransactionsInput, WorkTypeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WorkTypeCreateOrConnectWithoutTransactionsInput
    upsert?: WorkTypeUpsertWithoutTransactionsInput
    disconnect?: WorkTypeWhereInput | boolean
    delete?: WorkTypeWhereInput | boolean
    connect?: WorkTypeWhereUniqueInput
    update?: XOR<XOR<WorkTypeUpdateToOneWithWhereWithoutTransactionsInput, WorkTypeUpdateWithoutTransactionsInput>, WorkTypeUncheckedUpdateWithoutTransactionsInput>
  }

  export type AccountUpdateOneWithoutTransactionsGovtFeeNestedInput = {
    create?: XOR<AccountCreateWithoutTransactionsGovtFeeInput, AccountUncheckedCreateWithoutTransactionsGovtFeeInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsGovtFeeInput
    upsert?: AccountUpsertWithoutTransactionsGovtFeeInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTransactionsGovtFeeInput, AccountUpdateWithoutTransactionsGovtFeeInput>, AccountUncheckedUpdateWithoutTransactionsGovtFeeInput>
  }

  export type AccountUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsInput
    upsert?: AccountUpsertWithoutTransactionsInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTransactionsInput, AccountUpdateWithoutTransactionsInput>, AccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type TransactionCreateNestedManyWithoutWorkTypeInput = {
    create?: XOR<TransactionCreateWithoutWorkTypeInput, TransactionUncheckedCreateWithoutWorkTypeInput> | TransactionCreateWithoutWorkTypeInput[] | TransactionUncheckedCreateWithoutWorkTypeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkTypeInput | TransactionCreateOrConnectWithoutWorkTypeInput[]
    createMany?: TransactionCreateManyWorkTypeInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutWorkTypeInput = {
    create?: XOR<TransactionCreateWithoutWorkTypeInput, TransactionUncheckedCreateWithoutWorkTypeInput> | TransactionCreateWithoutWorkTypeInput[] | TransactionUncheckedCreateWithoutWorkTypeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkTypeInput | TransactionCreateOrConnectWithoutWorkTypeInput[]
    createMany?: TransactionCreateManyWorkTypeInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUpdateManyWithoutWorkTypeNestedInput = {
    create?: XOR<TransactionCreateWithoutWorkTypeInput, TransactionUncheckedCreateWithoutWorkTypeInput> | TransactionCreateWithoutWorkTypeInput[] | TransactionUncheckedCreateWithoutWorkTypeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkTypeInput | TransactionCreateOrConnectWithoutWorkTypeInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWorkTypeInput | TransactionUpsertWithWhereUniqueWithoutWorkTypeInput[]
    createMany?: TransactionCreateManyWorkTypeInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWorkTypeInput | TransactionUpdateWithWhereUniqueWithoutWorkTypeInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWorkTypeInput | TransactionUpdateManyWithWhereWithoutWorkTypeInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutWorkTypeNestedInput = {
    create?: XOR<TransactionCreateWithoutWorkTypeInput, TransactionUncheckedCreateWithoutWorkTypeInput> | TransactionCreateWithoutWorkTypeInput[] | TransactionUncheckedCreateWithoutWorkTypeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWorkTypeInput | TransactionCreateOrConnectWithoutWorkTypeInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWorkTypeInput | TransactionUpsertWithWhereUniqueWithoutWorkTypeInput[]
    createMany?: TransactionCreateManyWorkTypeInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWorkTypeInput | TransactionUpdateWithWhereUniqueWithoutWorkTypeInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWorkTypeInput | TransactionUpdateManyWithWhereWithoutWorkTypeInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type PartnerCreateNestedOneWithoutBeneficiariesInput = {
    create?: XOR<PartnerCreateWithoutBeneficiariesInput, PartnerUncheckedCreateWithoutBeneficiariesInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutBeneficiariesInput
    connect?: PartnerWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutBeneficiaryInput = {
    create?: XOR<TransactionCreateWithoutBeneficiaryInput, TransactionUncheckedCreateWithoutBeneficiaryInput> | TransactionCreateWithoutBeneficiaryInput[] | TransactionUncheckedCreateWithoutBeneficiaryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBeneficiaryInput | TransactionCreateOrConnectWithoutBeneficiaryInput[]
    createMany?: TransactionCreateManyBeneficiaryInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutBeneficiaryInput = {
    create?: XOR<TransactionCreateWithoutBeneficiaryInput, TransactionUncheckedCreateWithoutBeneficiaryInput> | TransactionCreateWithoutBeneficiaryInput[] | TransactionUncheckedCreateWithoutBeneficiaryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBeneficiaryInput | TransactionCreateOrConnectWithoutBeneficiaryInput[]
    createMany?: TransactionCreateManyBeneficiaryInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type PartnerUpdateOneWithoutBeneficiariesNestedInput = {
    create?: XOR<PartnerCreateWithoutBeneficiariesInput, PartnerUncheckedCreateWithoutBeneficiariesInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutBeneficiariesInput
    upsert?: PartnerUpsertWithoutBeneficiariesInput
    disconnect?: PartnerWhereInput | boolean
    delete?: PartnerWhereInput | boolean
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutBeneficiariesInput, PartnerUpdateWithoutBeneficiariesInput>, PartnerUncheckedUpdateWithoutBeneficiariesInput>
  }

  export type TransactionUpdateManyWithoutBeneficiaryNestedInput = {
    create?: XOR<TransactionCreateWithoutBeneficiaryInput, TransactionUncheckedCreateWithoutBeneficiaryInput> | TransactionCreateWithoutBeneficiaryInput[] | TransactionUncheckedCreateWithoutBeneficiaryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBeneficiaryInput | TransactionCreateOrConnectWithoutBeneficiaryInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutBeneficiaryInput | TransactionUpsertWithWhereUniqueWithoutBeneficiaryInput[]
    createMany?: TransactionCreateManyBeneficiaryInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutBeneficiaryInput | TransactionUpdateWithWhereUniqueWithoutBeneficiaryInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutBeneficiaryInput | TransactionUpdateManyWithWhereWithoutBeneficiaryInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutBeneficiaryNestedInput = {
    create?: XOR<TransactionCreateWithoutBeneficiaryInput, TransactionUncheckedCreateWithoutBeneficiaryInput> | TransactionCreateWithoutBeneficiaryInput[] | TransactionUncheckedCreateWithoutBeneficiaryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutBeneficiaryInput | TransactionCreateOrConnectWithoutBeneficiaryInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutBeneficiaryInput | TransactionUpsertWithWhereUniqueWithoutBeneficiaryInput[]
    createMany?: TransactionCreateManyBeneficiaryInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutBeneficiaryInput | TransactionUpdateWithWhereUniqueWithoutBeneficiaryInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutBeneficiaryInput | TransactionUpdateManyWithWhereWithoutBeneficiaryInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type BeneficiaryCreateNestedManyWithoutPartnerInput = {
    create?: XOR<BeneficiaryCreateWithoutPartnerInput, BeneficiaryUncheckedCreateWithoutPartnerInput> | BeneficiaryCreateWithoutPartnerInput[] | BeneficiaryUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: BeneficiaryCreateOrConnectWithoutPartnerInput | BeneficiaryCreateOrConnectWithoutPartnerInput[]
    createMany?: BeneficiaryCreateManyPartnerInputEnvelope
    connect?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutPartnerInput = {
    create?: XOR<TransactionCreateWithoutPartnerInput, TransactionUncheckedCreateWithoutPartnerInput> | TransactionCreateWithoutPartnerInput[] | TransactionUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPartnerInput | TransactionCreateOrConnectWithoutPartnerInput[]
    createMany?: TransactionCreateManyPartnerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type VoucherCreateNestedManyWithoutVendorInput = {
    create?: XOR<VoucherCreateWithoutVendorInput, VoucherUncheckedCreateWithoutVendorInput> | VoucherCreateWithoutVendorInput[] | VoucherUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutVendorInput | VoucherCreateOrConnectWithoutVendorInput[]
    createMany?: VoucherCreateManyVendorInputEnvelope
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
  }

  export type BeneficiaryUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: XOR<BeneficiaryCreateWithoutPartnerInput, BeneficiaryUncheckedCreateWithoutPartnerInput> | BeneficiaryCreateWithoutPartnerInput[] | BeneficiaryUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: BeneficiaryCreateOrConnectWithoutPartnerInput | BeneficiaryCreateOrConnectWithoutPartnerInput[]
    createMany?: BeneficiaryCreateManyPartnerInputEnvelope
    connect?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: XOR<TransactionCreateWithoutPartnerInput, TransactionUncheckedCreateWithoutPartnerInput> | TransactionCreateWithoutPartnerInput[] | TransactionUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPartnerInput | TransactionCreateOrConnectWithoutPartnerInput[]
    createMany?: TransactionCreateManyPartnerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type VoucherUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<VoucherCreateWithoutVendorInput, VoucherUncheckedCreateWithoutVendorInput> | VoucherCreateWithoutVendorInput[] | VoucherUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutVendorInput | VoucherCreateOrConnectWithoutVendorInput[]
    createMany?: VoucherCreateManyVendorInputEnvelope
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
  }

  export type EnumPartnerTypeFieldUpdateOperationsInput = {
    set?: $Enums.PartnerType
  }

  export type BeneficiaryUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<BeneficiaryCreateWithoutPartnerInput, BeneficiaryUncheckedCreateWithoutPartnerInput> | BeneficiaryCreateWithoutPartnerInput[] | BeneficiaryUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: BeneficiaryCreateOrConnectWithoutPartnerInput | BeneficiaryCreateOrConnectWithoutPartnerInput[]
    upsert?: BeneficiaryUpsertWithWhereUniqueWithoutPartnerInput | BeneficiaryUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: BeneficiaryCreateManyPartnerInputEnvelope
    set?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    disconnect?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    delete?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    connect?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    update?: BeneficiaryUpdateWithWhereUniqueWithoutPartnerInput | BeneficiaryUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: BeneficiaryUpdateManyWithWhereWithoutPartnerInput | BeneficiaryUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: BeneficiaryScalarWhereInput | BeneficiaryScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<TransactionCreateWithoutPartnerInput, TransactionUncheckedCreateWithoutPartnerInput> | TransactionCreateWithoutPartnerInput[] | TransactionUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPartnerInput | TransactionCreateOrConnectWithoutPartnerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPartnerInput | TransactionUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: TransactionCreateManyPartnerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPartnerInput | TransactionUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPartnerInput | TransactionUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type VoucherUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VoucherCreateWithoutVendorInput, VoucherUncheckedCreateWithoutVendorInput> | VoucherCreateWithoutVendorInput[] | VoucherUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutVendorInput | VoucherCreateOrConnectWithoutVendorInput[]
    upsert?: VoucherUpsertWithWhereUniqueWithoutVendorInput | VoucherUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VoucherCreateManyVendorInputEnvelope
    set?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    disconnect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    delete?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    update?: VoucherUpdateWithWhereUniqueWithoutVendorInput | VoucherUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VoucherUpdateManyWithWhereWithoutVendorInput | VoucherUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
  }

  export type BeneficiaryUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<BeneficiaryCreateWithoutPartnerInput, BeneficiaryUncheckedCreateWithoutPartnerInput> | BeneficiaryCreateWithoutPartnerInput[] | BeneficiaryUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: BeneficiaryCreateOrConnectWithoutPartnerInput | BeneficiaryCreateOrConnectWithoutPartnerInput[]
    upsert?: BeneficiaryUpsertWithWhereUniqueWithoutPartnerInput | BeneficiaryUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: BeneficiaryCreateManyPartnerInputEnvelope
    set?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    disconnect?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    delete?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    connect?: BeneficiaryWhereUniqueInput | BeneficiaryWhereUniqueInput[]
    update?: BeneficiaryUpdateWithWhereUniqueWithoutPartnerInput | BeneficiaryUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: BeneficiaryUpdateManyWithWhereWithoutPartnerInput | BeneficiaryUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: BeneficiaryScalarWhereInput | BeneficiaryScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<TransactionCreateWithoutPartnerInput, TransactionUncheckedCreateWithoutPartnerInput> | TransactionCreateWithoutPartnerInput[] | TransactionUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPartnerInput | TransactionCreateOrConnectWithoutPartnerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPartnerInput | TransactionUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: TransactionCreateManyPartnerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPartnerInput | TransactionUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPartnerInput | TransactionUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type VoucherUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VoucherCreateWithoutVendorInput, VoucherUncheckedCreateWithoutVendorInput> | VoucherCreateWithoutVendorInput[] | VoucherUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutVendorInput | VoucherCreateOrConnectWithoutVendorInput[]
    upsert?: VoucherUpsertWithWhereUniqueWithoutVendorInput | VoucherUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VoucherCreateManyVendorInputEnvelope
    set?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    disconnect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    delete?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    update?: VoucherUpdateWithWhereUniqueWithoutVendorInput | VoucherUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VoucherUpdateManyWithWhereWithoutVendorInput | VoucherUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
  }

  export type ExpenseCategoryCreateNestedOneWithoutExpensesInput = {
    create?: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutExpensesInput
    connect?: ExpenseCategoryWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutExpensesInput = {
    create?: XOR<AccountCreateWithoutExpensesInput, AccountUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutExpensesInput
    connect?: AccountWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutExpensesInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    connect?: UserWhereUniqueInput
  }

  export type ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutExpensesInput
    upsert?: ExpenseCategoryUpsertWithoutExpensesInput
    connect?: ExpenseCategoryWhereUniqueInput
    update?: XOR<XOR<ExpenseCategoryUpdateToOneWithWhereWithoutExpensesInput, ExpenseCategoryUpdateWithoutExpensesInput>, ExpenseCategoryUncheckedUpdateWithoutExpensesInput>
  }

  export type AccountUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<AccountCreateWithoutExpensesInput, AccountUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: AccountCreateOrConnectWithoutExpensesInput
    upsert?: AccountUpsertWithoutExpensesInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutExpensesInput, AccountUpdateWithoutExpensesInput>, AccountUncheckedUpdateWithoutExpensesInput>
  }

  export type UserUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    upsert?: UserUpsertWithoutExpensesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExpensesInput, UserUpdateWithoutExpensesInput>, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type ExpenseCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type VoucherItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<VoucherItemCreateWithoutCategoryInput, VoucherItemUncheckedCreateWithoutCategoryInput> | VoucherItemCreateWithoutCategoryInput[] | VoucherItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutCategoryInput | VoucherItemCreateOrConnectWithoutCategoryInput[]
    createMany?: VoucherItemCreateManyCategoryInputEnvelope
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type VoucherItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<VoucherItemCreateWithoutCategoryInput, VoucherItemUncheckedCreateWithoutCategoryInput> | VoucherItemCreateWithoutCategoryInput[] | VoucherItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutCategoryInput | VoucherItemCreateOrConnectWithoutCategoryInput[]
    createMany?: VoucherItemCreateManyCategoryInputEnvelope
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
  }

  export type ExpenseUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCategoryInput | ExpenseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCategoryInput | ExpenseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCategoryInput | ExpenseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type VoucherItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<VoucherItemCreateWithoutCategoryInput, VoucherItemUncheckedCreateWithoutCategoryInput> | VoucherItemCreateWithoutCategoryInput[] | VoucherItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutCategoryInput | VoucherItemCreateOrConnectWithoutCategoryInput[]
    upsert?: VoucherItemUpsertWithWhereUniqueWithoutCategoryInput | VoucherItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: VoucherItemCreateManyCategoryInputEnvelope
    set?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    disconnect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    delete?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    update?: VoucherItemUpdateWithWhereUniqueWithoutCategoryInput | VoucherItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: VoucherItemUpdateManyWithWhereWithoutCategoryInput | VoucherItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: VoucherItemScalarWhereInput | VoucherItemScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput> | ExpenseCreateWithoutCategoryInput[] | ExpenseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCategoryInput | ExpenseCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCategoryInput | ExpenseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCategoryInput | ExpenseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCategoryInput | ExpenseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type VoucherItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<VoucherItemCreateWithoutCategoryInput, VoucherItemUncheckedCreateWithoutCategoryInput> | VoucherItemCreateWithoutCategoryInput[] | VoucherItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutCategoryInput | VoucherItemCreateOrConnectWithoutCategoryInput[]
    upsert?: VoucherItemUpsertWithWhereUniqueWithoutCategoryInput | VoucherItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: VoucherItemCreateManyCategoryInputEnvelope
    set?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    disconnect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    delete?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    update?: VoucherItemUpdateWithWhereUniqueWithoutCategoryInput | VoucherItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: VoucherItemUpdateManyWithWhereWithoutCategoryInput | VoucherItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: VoucherItemScalarWhereInput | VoucherItemScalarWhereInput[]
  }

  export type TransactionCreateNestedManyWithoutAccountInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutAccountInput = {
    create?: XOR<ExpenseCreateWithoutAccountInput, ExpenseUncheckedCreateWithoutAccountInput> | ExpenseCreateWithoutAccountInput[] | ExpenseUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutAccountInput | ExpenseCreateOrConnectWithoutAccountInput[]
    createMany?: ExpenseCreateManyAccountInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type InvoiceCreateNestedManyWithoutGovtFeeAccountInput = {
    create?: XOR<InvoiceCreateWithoutGovtFeeAccountInput, InvoiceUncheckedCreateWithoutGovtFeeAccountInput> | InvoiceCreateWithoutGovtFeeAccountInput[] | InvoiceUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutGovtFeeAccountInput | InvoiceCreateOrConnectWithoutGovtFeeAccountInput[]
    createMany?: InvoiceCreateManyGovtFeeAccountInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutGovtFeeAccountInput = {
    create?: XOR<TransactionCreateWithoutGovtFeeAccountInput, TransactionUncheckedCreateWithoutGovtFeeAccountInput> | TransactionCreateWithoutGovtFeeAccountInput[] | TransactionUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGovtFeeAccountInput | TransactionCreateOrConnectWithoutGovtFeeAccountInput[]
    createMany?: TransactionCreateManyGovtFeeAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type VoucherCreateNestedManyWithoutAccountInput = {
    create?: XOR<VoucherCreateWithoutAccountInput, VoucherUncheckedCreateWithoutAccountInput> | VoucherCreateWithoutAccountInput[] | VoucherUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutAccountInput | VoucherCreateOrConnectWithoutAccountInput[]
    createMany?: VoucherCreateManyAccountInputEnvelope
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<ExpenseCreateWithoutAccountInput, ExpenseUncheckedCreateWithoutAccountInput> | ExpenseCreateWithoutAccountInput[] | ExpenseUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutAccountInput | ExpenseCreateOrConnectWithoutAccountInput[]
    createMany?: ExpenseCreateManyAccountInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutGovtFeeAccountInput = {
    create?: XOR<InvoiceCreateWithoutGovtFeeAccountInput, InvoiceUncheckedCreateWithoutGovtFeeAccountInput> | InvoiceCreateWithoutGovtFeeAccountInput[] | InvoiceUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutGovtFeeAccountInput | InvoiceCreateOrConnectWithoutGovtFeeAccountInput[]
    createMany?: InvoiceCreateManyGovtFeeAccountInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutGovtFeeAccountInput = {
    create?: XOR<TransactionCreateWithoutGovtFeeAccountInput, TransactionUncheckedCreateWithoutGovtFeeAccountInput> | TransactionCreateWithoutGovtFeeAccountInput[] | TransactionUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGovtFeeAccountInput | TransactionCreateOrConnectWithoutGovtFeeAccountInput[]
    createMany?: TransactionCreateManyGovtFeeAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type VoucherUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<VoucherCreateWithoutAccountInput, VoucherUncheckedCreateWithoutAccountInput> | VoucherCreateWithoutAccountInput[] | VoucherUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutAccountInput | VoucherCreateOrConnectWithoutAccountInput[]
    createMany?: VoucherCreateManyAccountInputEnvelope
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type TransactionUpdateManyWithoutAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAccountInput | TransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAccountInput | TransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAccountInput | TransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ExpenseCreateWithoutAccountInput, ExpenseUncheckedCreateWithoutAccountInput> | ExpenseCreateWithoutAccountInput[] | ExpenseUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutAccountInput | ExpenseCreateOrConnectWithoutAccountInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutAccountInput | ExpenseUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ExpenseCreateManyAccountInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutAccountInput | ExpenseUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutAccountInput | ExpenseUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type InvoiceUpdateManyWithoutGovtFeeAccountNestedInput = {
    create?: XOR<InvoiceCreateWithoutGovtFeeAccountInput, InvoiceUncheckedCreateWithoutGovtFeeAccountInput> | InvoiceCreateWithoutGovtFeeAccountInput[] | InvoiceUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutGovtFeeAccountInput | InvoiceCreateOrConnectWithoutGovtFeeAccountInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutGovtFeeAccountInput | InvoiceUpsertWithWhereUniqueWithoutGovtFeeAccountInput[]
    createMany?: InvoiceCreateManyGovtFeeAccountInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutGovtFeeAccountInput | InvoiceUpdateWithWhereUniqueWithoutGovtFeeAccountInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutGovtFeeAccountInput | InvoiceUpdateManyWithWhereWithoutGovtFeeAccountInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutGovtFeeAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutGovtFeeAccountInput, TransactionUncheckedCreateWithoutGovtFeeAccountInput> | TransactionCreateWithoutGovtFeeAccountInput[] | TransactionUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGovtFeeAccountInput | TransactionCreateOrConnectWithoutGovtFeeAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutGovtFeeAccountInput | TransactionUpsertWithWhereUniqueWithoutGovtFeeAccountInput[]
    createMany?: TransactionCreateManyGovtFeeAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutGovtFeeAccountInput | TransactionUpdateWithWhereUniqueWithoutGovtFeeAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutGovtFeeAccountInput | TransactionUpdateManyWithWhereWithoutGovtFeeAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type VoucherUpdateManyWithoutAccountNestedInput = {
    create?: XOR<VoucherCreateWithoutAccountInput, VoucherUncheckedCreateWithoutAccountInput> | VoucherCreateWithoutAccountInput[] | VoucherUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutAccountInput | VoucherCreateOrConnectWithoutAccountInput[]
    upsert?: VoucherUpsertWithWhereUniqueWithoutAccountInput | VoucherUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: VoucherCreateManyAccountInputEnvelope
    set?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    disconnect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    delete?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    update?: VoucherUpdateWithWhereUniqueWithoutAccountInput | VoucherUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: VoucherUpdateManyWithWhereWithoutAccountInput | VoucherUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAccountInput | TransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAccountInput | TransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAccountInput | TransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<ExpenseCreateWithoutAccountInput, ExpenseUncheckedCreateWithoutAccountInput> | ExpenseCreateWithoutAccountInput[] | ExpenseUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutAccountInput | ExpenseCreateOrConnectWithoutAccountInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutAccountInput | ExpenseUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: ExpenseCreateManyAccountInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutAccountInput | ExpenseUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutAccountInput | ExpenseUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutGovtFeeAccountNestedInput = {
    create?: XOR<InvoiceCreateWithoutGovtFeeAccountInput, InvoiceUncheckedCreateWithoutGovtFeeAccountInput> | InvoiceCreateWithoutGovtFeeAccountInput[] | InvoiceUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutGovtFeeAccountInput | InvoiceCreateOrConnectWithoutGovtFeeAccountInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutGovtFeeAccountInput | InvoiceUpsertWithWhereUniqueWithoutGovtFeeAccountInput[]
    createMany?: InvoiceCreateManyGovtFeeAccountInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutGovtFeeAccountInput | InvoiceUpdateWithWhereUniqueWithoutGovtFeeAccountInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutGovtFeeAccountInput | InvoiceUpdateManyWithWhereWithoutGovtFeeAccountInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutGovtFeeAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutGovtFeeAccountInput, TransactionUncheckedCreateWithoutGovtFeeAccountInput> | TransactionCreateWithoutGovtFeeAccountInput[] | TransactionUncheckedCreateWithoutGovtFeeAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutGovtFeeAccountInput | TransactionCreateOrConnectWithoutGovtFeeAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutGovtFeeAccountInput | TransactionUpsertWithWhereUniqueWithoutGovtFeeAccountInput[]
    createMany?: TransactionCreateManyGovtFeeAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutGovtFeeAccountInput | TransactionUpdateWithWhereUniqueWithoutGovtFeeAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutGovtFeeAccountInput | TransactionUpdateManyWithWhereWithoutGovtFeeAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type VoucherUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<VoucherCreateWithoutAccountInput, VoucherUncheckedCreateWithoutAccountInput> | VoucherCreateWithoutAccountInput[] | VoucherUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: VoucherCreateOrConnectWithoutAccountInput | VoucherCreateOrConnectWithoutAccountInput[]
    upsert?: VoucherUpsertWithWhereUniqueWithoutAccountInput | VoucherUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: VoucherCreateManyAccountInputEnvelope
    set?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    disconnect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    delete?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    connect?: VoucherWhereUniqueInput | VoucherWhereUniqueInput[]
    update?: VoucherUpdateWithWhereUniqueWithoutAccountInput | VoucherUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: VoucherUpdateManyWithWhereWithoutAccountInput | VoucherUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
  }

  export type PartnerCreateNestedOneWithoutVouchersInput = {
    create?: XOR<PartnerCreateWithoutVouchersInput, PartnerUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutVouchersInput
    connect?: PartnerWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutVouchersInput = {
    create?: XOR<AccountCreateWithoutVouchersInput, AccountUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: AccountCreateOrConnectWithoutVouchersInput
    connect?: AccountWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVouchersInput = {
    create?: XOR<UserCreateWithoutVouchersInput, UserUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: UserCreateOrConnectWithoutVouchersInput
    connect?: UserWhereUniqueInput
  }

  export type VoucherItemCreateNestedManyWithoutVoucherInput = {
    create?: XOR<VoucherItemCreateWithoutVoucherInput, VoucherItemUncheckedCreateWithoutVoucherInput> | VoucherItemCreateWithoutVoucherInput[] | VoucherItemUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutVoucherInput | VoucherItemCreateOrConnectWithoutVoucherInput[]
    createMany?: VoucherItemCreateManyVoucherInputEnvelope
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
  }

  export type VoucherItemUncheckedCreateNestedManyWithoutVoucherInput = {
    create?: XOR<VoucherItemCreateWithoutVoucherInput, VoucherItemUncheckedCreateWithoutVoucherInput> | VoucherItemCreateWithoutVoucherInput[] | VoucherItemUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutVoucherInput | VoucherItemCreateOrConnectWithoutVoucherInput[]
    createMany?: VoucherItemCreateManyVoucherInputEnvelope
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
  }

  export type EnumVoucherStatusFieldUpdateOperationsInput = {
    set?: $Enums.VoucherStatus
  }

  export type PartnerUpdateOneWithoutVouchersNestedInput = {
    create?: XOR<PartnerCreateWithoutVouchersInput, PartnerUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutVouchersInput
    upsert?: PartnerUpsertWithoutVouchersInput
    disconnect?: PartnerWhereInput | boolean
    delete?: PartnerWhereInput | boolean
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutVouchersInput, PartnerUpdateWithoutVouchersInput>, PartnerUncheckedUpdateWithoutVouchersInput>
  }

  export type AccountUpdateOneWithoutVouchersNestedInput = {
    create?: XOR<AccountCreateWithoutVouchersInput, AccountUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: AccountCreateOrConnectWithoutVouchersInput
    upsert?: AccountUpsertWithoutVouchersInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutVouchersInput, AccountUpdateWithoutVouchersInput>, AccountUncheckedUpdateWithoutVouchersInput>
  }

  export type UserUpdateOneRequiredWithoutVouchersNestedInput = {
    create?: XOR<UserCreateWithoutVouchersInput, UserUncheckedCreateWithoutVouchersInput>
    connectOrCreate?: UserCreateOrConnectWithoutVouchersInput
    upsert?: UserUpsertWithoutVouchersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVouchersInput, UserUpdateWithoutVouchersInput>, UserUncheckedUpdateWithoutVouchersInput>
  }

  export type VoucherItemUpdateManyWithoutVoucherNestedInput = {
    create?: XOR<VoucherItemCreateWithoutVoucherInput, VoucherItemUncheckedCreateWithoutVoucherInput> | VoucherItemCreateWithoutVoucherInput[] | VoucherItemUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutVoucherInput | VoucherItemCreateOrConnectWithoutVoucherInput[]
    upsert?: VoucherItemUpsertWithWhereUniqueWithoutVoucherInput | VoucherItemUpsertWithWhereUniqueWithoutVoucherInput[]
    createMany?: VoucherItemCreateManyVoucherInputEnvelope
    set?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    disconnect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    delete?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    update?: VoucherItemUpdateWithWhereUniqueWithoutVoucherInput | VoucherItemUpdateWithWhereUniqueWithoutVoucherInput[]
    updateMany?: VoucherItemUpdateManyWithWhereWithoutVoucherInput | VoucherItemUpdateManyWithWhereWithoutVoucherInput[]
    deleteMany?: VoucherItemScalarWhereInput | VoucherItemScalarWhereInput[]
  }

  export type VoucherItemUncheckedUpdateManyWithoutVoucherNestedInput = {
    create?: XOR<VoucherItemCreateWithoutVoucherInput, VoucherItemUncheckedCreateWithoutVoucherInput> | VoucherItemCreateWithoutVoucherInput[] | VoucherItemUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: VoucherItemCreateOrConnectWithoutVoucherInput | VoucherItemCreateOrConnectWithoutVoucherInput[]
    upsert?: VoucherItemUpsertWithWhereUniqueWithoutVoucherInput | VoucherItemUpsertWithWhereUniqueWithoutVoucherInput[]
    createMany?: VoucherItemCreateManyVoucherInputEnvelope
    set?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    disconnect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    delete?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    connect?: VoucherItemWhereUniqueInput | VoucherItemWhereUniqueInput[]
    update?: VoucherItemUpdateWithWhereUniqueWithoutVoucherInput | VoucherItemUpdateWithWhereUniqueWithoutVoucherInput[]
    updateMany?: VoucherItemUpdateManyWithWhereWithoutVoucherInput | VoucherItemUpdateManyWithWhereWithoutVoucherInput[]
    deleteMany?: VoucherItemScalarWhereInput | VoucherItemScalarWhereInput[]
  }

  export type VoucherCreateNestedOneWithoutItemsInput = {
    create?: XOR<VoucherCreateWithoutItemsInput, VoucherUncheckedCreateWithoutItemsInput>
    connectOrCreate?: VoucherCreateOrConnectWithoutItemsInput
    connect?: VoucherWhereUniqueInput
  }

  export type ExpenseCategoryCreateNestedOneWithoutVoucherItemsInput = {
    create?: XOR<ExpenseCategoryCreateWithoutVoucherItemsInput, ExpenseCategoryUncheckedCreateWithoutVoucherItemsInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutVoucherItemsInput
    connect?: ExpenseCategoryWhereUniqueInput
  }

  export type VoucherUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<VoucherCreateWithoutItemsInput, VoucherUncheckedCreateWithoutItemsInput>
    connectOrCreate?: VoucherCreateOrConnectWithoutItemsInput
    upsert?: VoucherUpsertWithoutItemsInput
    connect?: VoucherWhereUniqueInput
    update?: XOR<XOR<VoucherUpdateToOneWithWhereWithoutItemsInput, VoucherUpdateWithoutItemsInput>, VoucherUncheckedUpdateWithoutItemsInput>
  }

  export type ExpenseCategoryUpdateOneRequiredWithoutVoucherItemsNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutVoucherItemsInput, ExpenseCategoryUncheckedCreateWithoutVoucherItemsInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutVoucherItemsInput
    upsert?: ExpenseCategoryUpsertWithoutVoucherItemsInput
    connect?: ExpenseCategoryWhereUniqueInput
    update?: XOR<XOR<ExpenseCategoryUpdateToOneWithWhereWithoutVoucherItemsInput, ExpenseCategoryUpdateWithoutVoucherItemsInput>, ExpenseCategoryUncheckedUpdateWithoutVoucherItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusFilter<$PrismaModel> | $Enums.InvoiceStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceStatus | EnumInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceStatus[] | ListEnumInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumInvoiceStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumAdvanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AdvanceStatus | EnumAdvanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAdvanceStatusFilter<$PrismaModel> | $Enums.AdvanceStatus
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumAdvanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdvanceStatus | EnumAdvanceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AdvanceStatus[] | ListEnumAdvanceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAdvanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AdvanceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdvanceStatusFilter<$PrismaModel>
    _max?: NestedEnumAdvanceStatusFilter<$PrismaModel>
  }

  export type NestedEnumPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeFilter<$PrismaModel> | $Enums.PartnerType
  }

  export type NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnerTypeFilter<$PrismaModel>
    _max?: NestedEnumPartnerTypeFilter<$PrismaModel>
  }

  export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type NestedEnumVoucherStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | EnumVoucherStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVoucherStatusFilter<$PrismaModel> | $Enums.VoucherStatus
  }

  export type NestedEnumVoucherStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | EnumVoucherStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VoucherStatus[] | ListEnumVoucherStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVoucherStatusWithAggregatesFilter<$PrismaModel> | $Enums.VoucherStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVoucherStatusFilter<$PrismaModel>
    _max?: NestedEnumVoucherStatusFilter<$PrismaModel>
  }

  export type TransactionCreateWithoutEnteredByInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutTransactionsInput
    beneficiary?: BeneficiaryCreateNestedOneWithoutTransactionsInput
    partner?: PartnerCreateNestedOneWithoutTransactionsInput
    workType?: WorkTypeCreateNestedOneWithoutTransactionsInput
    govtFeeAccount?: AccountCreateNestedOneWithoutTransactionsGovtFeeInput
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutEnteredByInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutEnteredByInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutEnteredByInput, TransactionUncheckedCreateWithoutEnteredByInput>
  }

  export type TransactionCreateManyEnteredByInputEnvelope = {
    data: TransactionCreateManyEnteredByInput | TransactionCreateManyEnteredByInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutEnteredByInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    paymentMethod: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    account?: AccountCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutEnteredByInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    categoryId: string
    paymentMethod: $Enums.PaymentMethod
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCreateOrConnectWithoutEnteredByInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutEnteredByInput, ExpenseUncheckedCreateWithoutEnteredByInput>
  }

  export type ExpenseCreateManyEnteredByInputEnvelope = {
    data: ExpenseCreateManyEnteredByInput | ExpenseCreateManyEnteredByInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutAgentInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    govtFeeAccount?: AccountCreateNestedOneWithoutInvoicesGovtFeeInput
    transactions?: TransactionCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutAgentInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutAgentInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput>
  }

  export type InvoiceCreateManyAgentInputEnvelope = {
    data: InvoiceCreateManyAgentInput | InvoiceCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type VoucherCreateWithoutEnteredByInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor?: PartnerCreateNestedOneWithoutVouchersInput
    account?: AccountCreateNestedOneWithoutVouchersInput
    items?: VoucherItemCreateNestedManyWithoutVoucherInput
  }

  export type VoucherUncheckedCreateWithoutEnteredByInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorId?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: VoucherItemUncheckedCreateNestedManyWithoutVoucherInput
  }

  export type VoucherCreateOrConnectWithoutEnteredByInput = {
    where: VoucherWhereUniqueInput
    create: XOR<VoucherCreateWithoutEnteredByInput, VoucherUncheckedCreateWithoutEnteredByInput>
  }

  export type VoucherCreateManyEnteredByInputEnvelope = {
    data: VoucherCreateManyEnteredByInput | VoucherCreateManyEnteredByInput[]
    skipDuplicates?: boolean
  }

  export type TransactionUpsertWithWhereUniqueWithoutEnteredByInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutEnteredByInput, TransactionUncheckedUpdateWithoutEnteredByInput>
    create: XOR<TransactionCreateWithoutEnteredByInput, TransactionUncheckedCreateWithoutEnteredByInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutEnteredByInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutEnteredByInput, TransactionUncheckedUpdateWithoutEnteredByInput>
  }

  export type TransactionUpdateManyWithWhereWithoutEnteredByInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutEnteredByInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    invoiceId?: StringNullableFilter<"Transaction"> | string | null
    invNo?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    enteredById?: StringNullableFilter<"Transaction"> | string | null
    beneficiaryId?: StringNullableFilter<"Transaction"> | string | null
    partnerId?: StringNullableFilter<"Transaction"> | string | null
    workTypeId?: StringNullableFilter<"Transaction"> | string | null
    govFee?: FloatFilter<"Transaction"> | number
    typingCharge?: FloatFilter<"Transaction"> | number
    vat?: FloatFilter<"Transaction"> | number
    total?: FloatFilter<"Transaction"> | number
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    receiptNo?: StringNullableFilter<"Transaction"> | string | null
    govtFeeAccountId?: StringNullableFilter<"Transaction"> | string | null
    govtFeeRef?: StringNullableFilter<"Transaction"> | string | null
    paymentMethod?: EnumPaymentMethodFilter<"Transaction"> | $Enums.PaymentMethod
    cardId?: StringNullableFilter<"Transaction"> | string | null
    transactionId?: StringNullableFilter<"Transaction"> | string | null
    status?: EnumPaymentStatusFilter<"Transaction"> | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFilter<"Transaction"> | $Enums.AdvanceStatus
    advanceAmount?: FloatFilter<"Transaction"> | number
    customerName?: StringNullableFilter<"Transaction"> | string | null
    applicantName?: StringNullableFilter<"Transaction"> | string | null
    details?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type ExpenseUpsertWithWhereUniqueWithoutEnteredByInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutEnteredByInput, ExpenseUncheckedUpdateWithoutEnteredByInput>
    create: XOR<ExpenseCreateWithoutEnteredByInput, ExpenseUncheckedCreateWithoutEnteredByInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutEnteredByInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutEnteredByInput, ExpenseUncheckedUpdateWithoutEnteredByInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutEnteredByInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutEnteredByInput>
  }

  export type ExpenseScalarWhereInput = {
    AND?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    OR?: ExpenseScalarWhereInput[]
    NOT?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    id?: StringFilter<"Expense"> | string
    date?: DateTimeFilter<"Expense"> | Date | string
    description?: StringNullableFilter<"Expense"> | string | null
    amount?: FloatFilter<"Expense"> | number
    categoryId?: StringFilter<"Expense"> | string
    paymentMethod?: EnumPaymentMethodFilter<"Expense"> | $Enums.PaymentMethod
    accountId?: StringNullableFilter<"Expense"> | string | null
    enteredById?: StringFilter<"Expense"> | string
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
  }

  export type InvoiceUpsertWithWhereUniqueWithoutAgentInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutAgentInput, InvoiceUncheckedUpdateWithoutAgentInput>
    create: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutAgentInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutAgentInput, InvoiceUncheckedUpdateWithoutAgentInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutAgentInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutAgentInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: StringFilter<"Invoice"> | string
    invoiceNo?: StringFilter<"Invoice"> | string
    date?: DateTimeFilter<"Invoice"> | Date | string
    customerId?: StringNullableFilter<"Invoice"> | string | null
    customerName?: StringNullableFilter<"Invoice"> | string | null
    agentId?: StringNullableFilter<"Invoice"> | string | null
    subtotal?: FloatFilter<"Invoice"> | number
    tax?: FloatFilter<"Invoice"> | number
    discount?: FloatFilter<"Invoice"> | number
    total?: FloatFilter<"Invoice"> | number
    paidAmount?: FloatFilter<"Invoice"> | number
    balance?: FloatFilter<"Invoice"> | number
    paymentMethod?: EnumPaymentMethodFilter<"Invoice"> | $Enums.PaymentMethod
    paymentRef?: StringNullableFilter<"Invoice"> | string | null
    bankName?: StringNullableFilter<"Invoice"> | string | null
    status?: EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus
    govtFeeAccountId?: StringNullableFilter<"Invoice"> | string | null
    govtFeeRef?: StringNullableFilter<"Invoice"> | string | null
    customerPhone?: StringNullableFilter<"Invoice"> | string | null
    customerEmail?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
  }

  export type VoucherUpsertWithWhereUniqueWithoutEnteredByInput = {
    where: VoucherWhereUniqueInput
    update: XOR<VoucherUpdateWithoutEnteredByInput, VoucherUncheckedUpdateWithoutEnteredByInput>
    create: XOR<VoucherCreateWithoutEnteredByInput, VoucherUncheckedCreateWithoutEnteredByInput>
  }

  export type VoucherUpdateWithWhereUniqueWithoutEnteredByInput = {
    where: VoucherWhereUniqueInput
    data: XOR<VoucherUpdateWithoutEnteredByInput, VoucherUncheckedUpdateWithoutEnteredByInput>
  }

  export type VoucherUpdateManyWithWhereWithoutEnteredByInput = {
    where: VoucherScalarWhereInput
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyWithoutEnteredByInput>
  }

  export type VoucherScalarWhereInput = {
    AND?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
    OR?: VoucherScalarWhereInput[]
    NOT?: VoucherScalarWhereInput | VoucherScalarWhereInput[]
    id?: StringFilter<"Voucher"> | string
    voucherNo?: StringFilter<"Voucher"> | string
    date?: DateTimeFilter<"Voucher"> | Date | string
    description?: StringNullableFilter<"Voucher"> | string | null
    vendorId?: StringNullableFilter<"Voucher"> | string | null
    vendorName?: StringNullableFilter<"Voucher"> | string | null
    total?: FloatFilter<"Voucher"> | number
    paidAmount?: FloatFilter<"Voucher"> | number
    balance?: FloatFilter<"Voucher"> | number
    status?: EnumVoucherStatusFilter<"Voucher"> | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFilter<"Voucher"> | $Enums.PaymentMethod
    accountId?: StringNullableFilter<"Voucher"> | string | null
    enteredById?: StringFilter<"Voucher"> | string
    createdAt?: DateTimeFilter<"Voucher"> | Date | string
    updatedAt?: DateTimeFilter<"Voucher"> | Date | string
  }

  export type UserCreateWithoutInvoicesInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutEnteredByInput
    expenses?: ExpenseCreateNestedManyWithoutEnteredByInput
    vouchers?: VoucherCreateNestedManyWithoutEnteredByInput
  }

  export type UserUncheckedCreateWithoutInvoicesInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutEnteredByInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutEnteredByInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutEnteredByInput
  }

  export type UserCreateOrConnectWithoutInvoicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
  }

  export type AccountCreateWithoutInvoicesGovtFeeInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionCreateNestedManyWithoutAccountInput
    expenses?: ExpenseCreateNestedManyWithoutAccountInput
    transactionsGovtFee?: TransactionCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutInvoicesGovtFeeInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutAccountInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutAccountInput
    transactionsGovtFee?: TransactionUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutInvoicesGovtFeeInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutInvoicesGovtFeeInput, AccountUncheckedCreateWithoutInvoicesGovtFeeInput>
  }

  export type TransactionCreateWithoutInvoiceInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    enteredBy?: UserCreateNestedOneWithoutTransactionsInput
    beneficiary?: BeneficiaryCreateNestedOneWithoutTransactionsInput
    partner?: PartnerCreateNestedOneWithoutTransactionsInput
    workType?: WorkTypeCreateNestedOneWithoutTransactionsInput
    govtFeeAccount?: AccountCreateNestedOneWithoutTransactionsGovtFeeInput
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutInvoiceInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutInvoiceInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutInvoiceInput, TransactionUncheckedCreateWithoutInvoiceInput>
  }

  export type TransactionCreateManyInvoiceInputEnvelope = {
    data: TransactionCreateManyInvoiceInput | TransactionCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInvoicesInput = {
    update: XOR<UserUpdateWithoutInvoicesInput, UserUncheckedUpdateWithoutInvoicesInput>
    create: XOR<UserCreateWithoutInvoicesInput, UserUncheckedCreateWithoutInvoicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvoicesInput, UserUncheckedUpdateWithoutInvoicesInput>
  }

  export type UserUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutEnteredByNestedInput
    expenses?: ExpenseUpdateManyWithoutEnteredByNestedInput
    vouchers?: VoucherUpdateManyWithoutEnteredByNestedInput
  }

  export type UserUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutEnteredByNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutEnteredByNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutEnteredByNestedInput
  }

  export type AccountUpsertWithoutInvoicesGovtFeeInput = {
    update: XOR<AccountUpdateWithoutInvoicesGovtFeeInput, AccountUncheckedUpdateWithoutInvoicesGovtFeeInput>
    create: XOR<AccountCreateWithoutInvoicesGovtFeeInput, AccountUncheckedCreateWithoutInvoicesGovtFeeInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutInvoicesGovtFeeInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutInvoicesGovtFeeInput, AccountUncheckedUpdateWithoutInvoicesGovtFeeInput>
  }

  export type AccountUpdateWithoutInvoicesGovtFeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUpdateManyWithoutAccountNestedInput
    transactionsGovtFee?: TransactionUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutInvoicesGovtFeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutAccountNestedInput
    transactionsGovtFee?: TransactionUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutInvoiceInput, TransactionUncheckedUpdateWithoutInvoiceInput>
    create: XOR<TransactionCreateWithoutInvoiceInput, TransactionUncheckedCreateWithoutInvoiceInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutInvoiceInput, TransactionUncheckedUpdateWithoutInvoiceInput>
  }

  export type TransactionUpdateManyWithWhereWithoutInvoiceInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type InvoiceCreateWithoutTransactionsInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent?: UserCreateNestedOneWithoutInvoicesInput
    govtFeeAccount?: AccountCreateNestedOneWithoutInvoicesGovtFeeInput
  }

  export type InvoiceUncheckedCreateWithoutTransactionsInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    agentId?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateOrConnectWithoutTransactionsInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutTransactionsInput, InvoiceUncheckedCreateWithoutTransactionsInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    expenses?: ExpenseCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceCreateNestedManyWithoutAgentInput
    vouchers?: VoucherCreateNestedManyWithoutEnteredByInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    expenses?: ExpenseUncheckedCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutAgentInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutEnteredByInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type BeneficiaryCreateWithoutTransactionsInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
    partner?: PartnerCreateNestedOneWithoutBeneficiariesInput
  }

  export type BeneficiaryUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
    partnerId?: string | null
  }

  export type BeneficiaryCreateOrConnectWithoutTransactionsInput = {
    where: BeneficiaryWhereUniqueInput
    create: XOR<BeneficiaryCreateWithoutTransactionsInput, BeneficiaryUncheckedCreateWithoutTransactionsInput>
  }

  export type PartnerCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    beneficiaries?: BeneficiaryCreateNestedManyWithoutPartnerInput
    vouchers?: VoucherCreateNestedManyWithoutVendorInput
  }

  export type PartnerUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    beneficiaries?: BeneficiaryUncheckedCreateNestedManyWithoutPartnerInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutVendorInput
  }

  export type PartnerCreateOrConnectWithoutTransactionsInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutTransactionsInput, PartnerUncheckedCreateWithoutTransactionsInput>
  }

  export type WorkTypeCreateWithoutTransactionsInput = {
    id?: string
    description: string
    presetGovFee?: number
    presetTypingCharge?: number
  }

  export type WorkTypeUncheckedCreateWithoutTransactionsInput = {
    id?: string
    description: string
    presetGovFee?: number
    presetTypingCharge?: number
  }

  export type WorkTypeCreateOrConnectWithoutTransactionsInput = {
    where: WorkTypeWhereUniqueInput
    create: XOR<WorkTypeCreateWithoutTransactionsInput, WorkTypeUncheckedCreateWithoutTransactionsInput>
  }

  export type AccountCreateWithoutTransactionsGovtFeeInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionCreateNestedManyWithoutAccountInput
    expenses?: ExpenseCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutTransactionsGovtFeeInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutAccountInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutTransactionsGovtFeeInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTransactionsGovtFeeInput, AccountUncheckedCreateWithoutTransactionsGovtFeeInput>
  }

  export type AccountCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    expenses?: ExpenseCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    expenses?: ExpenseUncheckedCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutTransactionsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
  }

  export type InvoiceUpsertWithoutTransactionsInput = {
    update: XOR<InvoiceUpdateWithoutTransactionsInput, InvoiceUncheckedUpdateWithoutTransactionsInput>
    create: XOR<InvoiceCreateWithoutTransactionsInput, InvoiceUncheckedCreateWithoutTransactionsInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutTransactionsInput, InvoiceUncheckedUpdateWithoutTransactionsInput>
  }

  export type InvoiceUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: UserUpdateOneWithoutInvoicesNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutInvoicesGovtFeeNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUpdateManyWithoutAgentNestedInput
    vouchers?: VoucherUpdateManyWithoutEnteredByNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenses?: ExpenseUncheckedUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutAgentNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutEnteredByNestedInput
  }

  export type BeneficiaryUpsertWithoutTransactionsInput = {
    update: XOR<BeneficiaryUpdateWithoutTransactionsInput, BeneficiaryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<BeneficiaryCreateWithoutTransactionsInput, BeneficiaryUncheckedCreateWithoutTransactionsInput>
    where?: BeneficiaryWhereInput
  }

  export type BeneficiaryUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: BeneficiaryWhereInput
    data: XOR<BeneficiaryUpdateWithoutTransactionsInput, BeneficiaryUncheckedUpdateWithoutTransactionsInput>
  }

  export type BeneficiaryUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partner?: PartnerUpdateOneWithoutBeneficiariesNestedInput
  }

  export type BeneficiaryUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PartnerUpsertWithoutTransactionsInput = {
    update: XOR<PartnerUpdateWithoutTransactionsInput, PartnerUncheckedUpdateWithoutTransactionsInput>
    create: XOR<PartnerCreateWithoutTransactionsInput, PartnerUncheckedCreateWithoutTransactionsInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutTransactionsInput, PartnerUncheckedUpdateWithoutTransactionsInput>
  }

  export type PartnerUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    beneficiaries?: BeneficiaryUpdateManyWithoutPartnerNestedInput
    vouchers?: VoucherUpdateManyWithoutVendorNestedInput
  }

  export type PartnerUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    beneficiaries?: BeneficiaryUncheckedUpdateManyWithoutPartnerNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type WorkTypeUpsertWithoutTransactionsInput = {
    update: XOR<WorkTypeUpdateWithoutTransactionsInput, WorkTypeUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WorkTypeCreateWithoutTransactionsInput, WorkTypeUncheckedCreateWithoutTransactionsInput>
    where?: WorkTypeWhereInput
  }

  export type WorkTypeUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WorkTypeWhereInput
    data: XOR<WorkTypeUpdateWithoutTransactionsInput, WorkTypeUncheckedUpdateWithoutTransactionsInput>
  }

  export type WorkTypeUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    presetGovFee?: FloatFieldUpdateOperationsInput | number
    presetTypingCharge?: FloatFieldUpdateOperationsInput | number
  }

  export type WorkTypeUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    presetGovFee?: FloatFieldUpdateOperationsInput | number
    presetTypingCharge?: FloatFieldUpdateOperationsInput | number
  }

  export type AccountUpsertWithoutTransactionsGovtFeeInput = {
    update: XOR<AccountUpdateWithoutTransactionsGovtFeeInput, AccountUncheckedUpdateWithoutTransactionsGovtFeeInput>
    create: XOR<AccountCreateWithoutTransactionsGovtFeeInput, AccountUncheckedCreateWithoutTransactionsGovtFeeInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTransactionsGovtFeeInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTransactionsGovtFeeInput, AccountUncheckedUpdateWithoutTransactionsGovtFeeInput>
  }

  export type AccountUpdateWithoutTransactionsGovtFeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutTransactionsGovtFeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountUpsertWithoutTransactionsInput = {
    update: XOR<AccountUpdateWithoutTransactionsInput, AccountUncheckedUpdateWithoutTransactionsInput>
    create: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTransactionsInput, AccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type AccountUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    expenses?: ExpenseUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    expenses?: ExpenseUncheckedUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type TransactionCreateWithoutWorkTypeInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutTransactionsInput
    enteredBy?: UserCreateNestedOneWithoutTransactionsInput
    beneficiary?: BeneficiaryCreateNestedOneWithoutTransactionsInput
    partner?: PartnerCreateNestedOneWithoutTransactionsInput
    govtFeeAccount?: AccountCreateNestedOneWithoutTransactionsGovtFeeInput
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutWorkTypeInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutWorkTypeInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWorkTypeInput, TransactionUncheckedCreateWithoutWorkTypeInput>
  }

  export type TransactionCreateManyWorkTypeInputEnvelope = {
    data: TransactionCreateManyWorkTypeInput | TransactionCreateManyWorkTypeInput[]
    skipDuplicates?: boolean
  }

  export type TransactionUpsertWithWhereUniqueWithoutWorkTypeInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutWorkTypeInput, TransactionUncheckedUpdateWithoutWorkTypeInput>
    create: XOR<TransactionCreateWithoutWorkTypeInput, TransactionUncheckedCreateWithoutWorkTypeInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutWorkTypeInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutWorkTypeInput, TransactionUncheckedUpdateWithoutWorkTypeInput>
  }

  export type TransactionUpdateManyWithWhereWithoutWorkTypeInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutWorkTypeInput>
  }

  export type PartnerCreateWithoutBeneficiariesInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    transactions?: TransactionCreateNestedManyWithoutPartnerInput
    vouchers?: VoucherCreateNestedManyWithoutVendorInput
  }

  export type PartnerUncheckedCreateWithoutBeneficiariesInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutPartnerInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutVendorInput
  }

  export type PartnerCreateOrConnectWithoutBeneficiariesInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutBeneficiariesInput, PartnerUncheckedCreateWithoutBeneficiariesInput>
  }

  export type TransactionCreateWithoutBeneficiaryInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutTransactionsInput
    enteredBy?: UserCreateNestedOneWithoutTransactionsInput
    partner?: PartnerCreateNestedOneWithoutTransactionsInput
    workType?: WorkTypeCreateNestedOneWithoutTransactionsInput
    govtFeeAccount?: AccountCreateNestedOneWithoutTransactionsGovtFeeInput
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutBeneficiaryInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutBeneficiaryInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutBeneficiaryInput, TransactionUncheckedCreateWithoutBeneficiaryInput>
  }

  export type TransactionCreateManyBeneficiaryInputEnvelope = {
    data: TransactionCreateManyBeneficiaryInput | TransactionCreateManyBeneficiaryInput[]
    skipDuplicates?: boolean
  }

  export type PartnerUpsertWithoutBeneficiariesInput = {
    update: XOR<PartnerUpdateWithoutBeneficiariesInput, PartnerUncheckedUpdateWithoutBeneficiariesInput>
    create: XOR<PartnerCreateWithoutBeneficiariesInput, PartnerUncheckedCreateWithoutBeneficiariesInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutBeneficiariesInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutBeneficiariesInput, PartnerUncheckedUpdateWithoutBeneficiariesInput>
  }

  export type PartnerUpdateWithoutBeneficiariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutPartnerNestedInput
    vouchers?: VoucherUpdateManyWithoutVendorNestedInput
  }

  export type PartnerUncheckedUpdateWithoutBeneficiariesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutPartnerNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutBeneficiaryInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutBeneficiaryInput, TransactionUncheckedUpdateWithoutBeneficiaryInput>
    create: XOR<TransactionCreateWithoutBeneficiaryInput, TransactionUncheckedCreateWithoutBeneficiaryInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutBeneficiaryInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutBeneficiaryInput, TransactionUncheckedUpdateWithoutBeneficiaryInput>
  }

  export type TransactionUpdateManyWithWhereWithoutBeneficiaryInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutBeneficiaryInput>
  }

  export type BeneficiaryCreateWithoutPartnerInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
    transactions?: TransactionCreateNestedManyWithoutBeneficiaryInput
  }

  export type BeneficiaryUncheckedCreateWithoutPartnerInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutBeneficiaryInput
  }

  export type BeneficiaryCreateOrConnectWithoutPartnerInput = {
    where: BeneficiaryWhereUniqueInput
    create: XOR<BeneficiaryCreateWithoutPartnerInput, BeneficiaryUncheckedCreateWithoutPartnerInput>
  }

  export type BeneficiaryCreateManyPartnerInputEnvelope = {
    data: BeneficiaryCreateManyPartnerInput | BeneficiaryCreateManyPartnerInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutPartnerInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutTransactionsInput
    enteredBy?: UserCreateNestedOneWithoutTransactionsInput
    beneficiary?: BeneficiaryCreateNestedOneWithoutTransactionsInput
    workType?: WorkTypeCreateNestedOneWithoutTransactionsInput
    govtFeeAccount?: AccountCreateNestedOneWithoutTransactionsGovtFeeInput
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutPartnerInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutPartnerInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutPartnerInput, TransactionUncheckedCreateWithoutPartnerInput>
  }

  export type TransactionCreateManyPartnerInputEnvelope = {
    data: TransactionCreateManyPartnerInput | TransactionCreateManyPartnerInput[]
    skipDuplicates?: boolean
  }

  export type VoucherCreateWithoutVendorInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    account?: AccountCreateNestedOneWithoutVouchersInput
    enteredBy: UserCreateNestedOneWithoutVouchersInput
    items?: VoucherItemCreateNestedManyWithoutVoucherInput
  }

  export type VoucherUncheckedCreateWithoutVendorInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: VoucherItemUncheckedCreateNestedManyWithoutVoucherInput
  }

  export type VoucherCreateOrConnectWithoutVendorInput = {
    where: VoucherWhereUniqueInput
    create: XOR<VoucherCreateWithoutVendorInput, VoucherUncheckedCreateWithoutVendorInput>
  }

  export type VoucherCreateManyVendorInputEnvelope = {
    data: VoucherCreateManyVendorInput | VoucherCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type BeneficiaryUpsertWithWhereUniqueWithoutPartnerInput = {
    where: BeneficiaryWhereUniqueInput
    update: XOR<BeneficiaryUpdateWithoutPartnerInput, BeneficiaryUncheckedUpdateWithoutPartnerInput>
    create: XOR<BeneficiaryCreateWithoutPartnerInput, BeneficiaryUncheckedCreateWithoutPartnerInput>
  }

  export type BeneficiaryUpdateWithWhereUniqueWithoutPartnerInput = {
    where: BeneficiaryWhereUniqueInput
    data: XOR<BeneficiaryUpdateWithoutPartnerInput, BeneficiaryUncheckedUpdateWithoutPartnerInput>
  }

  export type BeneficiaryUpdateManyWithWhereWithoutPartnerInput = {
    where: BeneficiaryScalarWhereInput
    data: XOR<BeneficiaryUpdateManyMutationInput, BeneficiaryUncheckedUpdateManyWithoutPartnerInput>
  }

  export type BeneficiaryScalarWhereInput = {
    AND?: BeneficiaryScalarWhereInput | BeneficiaryScalarWhereInput[]
    OR?: BeneficiaryScalarWhereInput[]
    NOT?: BeneficiaryScalarWhereInput | BeneficiaryScalarWhereInput[]
    id?: StringFilter<"Beneficiary"> | string
    name?: StringFilter<"Beneficiary"> | string
    details?: StringNullableFilter<"Beneficiary"> | string | null
    phone?: StringNullableFilter<"Beneficiary"> | string | null
    email?: StringNullableFilter<"Beneficiary"> | string | null
    partnerId?: StringNullableFilter<"Beneficiary"> | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutPartnerInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutPartnerInput, TransactionUncheckedUpdateWithoutPartnerInput>
    create: XOR<TransactionCreateWithoutPartnerInput, TransactionUncheckedCreateWithoutPartnerInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutPartnerInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutPartnerInput, TransactionUncheckedUpdateWithoutPartnerInput>
  }

  export type TransactionUpdateManyWithWhereWithoutPartnerInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutPartnerInput>
  }

  export type VoucherUpsertWithWhereUniqueWithoutVendorInput = {
    where: VoucherWhereUniqueInput
    update: XOR<VoucherUpdateWithoutVendorInput, VoucherUncheckedUpdateWithoutVendorInput>
    create: XOR<VoucherCreateWithoutVendorInput, VoucherUncheckedCreateWithoutVendorInput>
  }

  export type VoucherUpdateWithWhereUniqueWithoutVendorInput = {
    where: VoucherWhereUniqueInput
    data: XOR<VoucherUpdateWithoutVendorInput, VoucherUncheckedUpdateWithoutVendorInput>
  }

  export type VoucherUpdateManyWithWhereWithoutVendorInput = {
    where: VoucherScalarWhereInput
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyWithoutVendorInput>
  }

  export type ExpenseCategoryCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    voucherItems?: VoucherItemCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    description?: string | null
    voucherItems?: VoucherItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryCreateOrConnectWithoutExpensesInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
  }

  export type AccountCreateWithoutExpensesInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutExpensesInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutExpensesInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutExpensesInput, AccountUncheckedCreateWithoutExpensesInput>
  }

  export type UserCreateWithoutExpensesInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceCreateNestedManyWithoutAgentInput
    vouchers?: VoucherCreateNestedManyWithoutEnteredByInput
  }

  export type UserUncheckedCreateWithoutExpensesInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutAgentInput
    vouchers?: VoucherUncheckedCreateNestedManyWithoutEnteredByInput
  }

  export type UserCreateOrConnectWithoutExpensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
  }

  export type ExpenseCategoryUpsertWithoutExpensesInput = {
    update: XOR<ExpenseCategoryUpdateWithoutExpensesInput, ExpenseCategoryUncheckedUpdateWithoutExpensesInput>
    create: XOR<ExpenseCategoryCreateWithoutExpensesInput, ExpenseCategoryUncheckedCreateWithoutExpensesInput>
    where?: ExpenseCategoryWhereInput
  }

  export type ExpenseCategoryUpdateToOneWithWhereWithoutExpensesInput = {
    where?: ExpenseCategoryWhereInput
    data: XOR<ExpenseCategoryUpdateWithoutExpensesInput, ExpenseCategoryUncheckedUpdateWithoutExpensesInput>
  }

  export type ExpenseCategoryUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    voucherItems?: VoucherItemUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    voucherItems?: VoucherItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type AccountUpsertWithoutExpensesInput = {
    update: XOR<AccountUpdateWithoutExpensesInput, AccountUncheckedUpdateWithoutExpensesInput>
    create: XOR<AccountCreateWithoutExpensesInput, AccountUncheckedCreateWithoutExpensesInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutExpensesInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutExpensesInput, AccountUncheckedUpdateWithoutExpensesInput>
  }

  export type AccountUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type UserUpsertWithoutExpensesInput = {
    update: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExpensesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
  }

  export type UserUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUpdateManyWithoutAgentNestedInput
    vouchers?: VoucherUpdateManyWithoutEnteredByNestedInput
  }

  export type UserUncheckedUpdateWithoutExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutAgentNestedInput
    vouchers?: VoucherUncheckedUpdateManyWithoutEnteredByNestedInput
  }

  export type ExpenseCreateWithoutCategoryInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    paymentMethod: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    account?: AccountCreateNestedOneWithoutExpensesInput
    enteredBy: UserCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutCategoryInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    paymentMethod: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCreateOrConnectWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseCreateManyCategoryInputEnvelope = {
    data: ExpenseCreateManyCategoryInput | ExpenseCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type VoucherItemCreateWithoutCategoryInput = {
    id?: string
    amount: number
    description?: string | null
    voucher: VoucherCreateNestedOneWithoutItemsInput
  }

  export type VoucherItemUncheckedCreateWithoutCategoryInput = {
    id?: string
    voucherId: string
    amount: number
    description?: string | null
  }

  export type VoucherItemCreateOrConnectWithoutCategoryInput = {
    where: VoucherItemWhereUniqueInput
    create: XOR<VoucherItemCreateWithoutCategoryInput, VoucherItemUncheckedCreateWithoutCategoryInput>
  }

  export type VoucherItemCreateManyCategoryInputEnvelope = {
    data: VoucherItemCreateManyCategoryInput | VoucherItemCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutCategoryInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutCategoryInput>
  }

  export type VoucherItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: VoucherItemWhereUniqueInput
    update: XOR<VoucherItemUpdateWithoutCategoryInput, VoucherItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<VoucherItemCreateWithoutCategoryInput, VoucherItemUncheckedCreateWithoutCategoryInput>
  }

  export type VoucherItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: VoucherItemWhereUniqueInput
    data: XOR<VoucherItemUpdateWithoutCategoryInput, VoucherItemUncheckedUpdateWithoutCategoryInput>
  }

  export type VoucherItemUpdateManyWithWhereWithoutCategoryInput = {
    where: VoucherItemScalarWhereInput
    data: XOR<VoucherItemUpdateManyMutationInput, VoucherItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type VoucherItemScalarWhereInput = {
    AND?: VoucherItemScalarWhereInput | VoucherItemScalarWhereInput[]
    OR?: VoucherItemScalarWhereInput[]
    NOT?: VoucherItemScalarWhereInput | VoucherItemScalarWhereInput[]
    id?: StringFilter<"VoucherItem"> | string
    voucherId?: StringFilter<"VoucherItem"> | string
    categoryId?: StringFilter<"VoucherItem"> | string
    amount?: FloatFilter<"VoucherItem"> | number
    description?: StringNullableFilter<"VoucherItem"> | string | null
  }

  export type TransactionCreateWithoutAccountInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutTransactionsInput
    enteredBy?: UserCreateNestedOneWithoutTransactionsInput
    beneficiary?: BeneficiaryCreateNestedOneWithoutTransactionsInput
    partner?: PartnerCreateNestedOneWithoutTransactionsInput
    workType?: WorkTypeCreateNestedOneWithoutTransactionsInput
    govtFeeAccount?: AccountCreateNestedOneWithoutTransactionsGovtFeeInput
  }

  export type TransactionUncheckedCreateWithoutAccountInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutAccountInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput>
  }

  export type TransactionCreateManyAccountInputEnvelope = {
    data: TransactionCreateManyAccountInput | TransactionCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutAccountInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    paymentMethod: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ExpenseCategoryCreateNestedOneWithoutExpensesInput
    enteredBy: UserCreateNestedOneWithoutExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutAccountInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    categoryId: string
    paymentMethod: $Enums.PaymentMethod
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCreateOrConnectWithoutAccountInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutAccountInput, ExpenseUncheckedCreateWithoutAccountInput>
  }

  export type ExpenseCreateManyAccountInputEnvelope = {
    data: ExpenseCreateManyAccountInput | ExpenseCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceCreateWithoutGovtFeeAccountInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent?: UserCreateNestedOneWithoutInvoicesInput
    transactions?: TransactionCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutGovtFeeAccountInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    agentId?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutGovtFeeAccountInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutGovtFeeAccountInput, InvoiceUncheckedCreateWithoutGovtFeeAccountInput>
  }

  export type InvoiceCreateManyGovtFeeAccountInputEnvelope = {
    data: InvoiceCreateManyGovtFeeAccountInput | InvoiceCreateManyGovtFeeAccountInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutGovtFeeAccountInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice?: InvoiceCreateNestedOneWithoutTransactionsInput
    enteredBy?: UserCreateNestedOneWithoutTransactionsInput
    beneficiary?: BeneficiaryCreateNestedOneWithoutTransactionsInput
    partner?: PartnerCreateNestedOneWithoutTransactionsInput
    workType?: WorkTypeCreateNestedOneWithoutTransactionsInput
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutGovtFeeAccountInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutGovtFeeAccountInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutGovtFeeAccountInput, TransactionUncheckedCreateWithoutGovtFeeAccountInput>
  }

  export type TransactionCreateManyGovtFeeAccountInputEnvelope = {
    data: TransactionCreateManyGovtFeeAccountInput | TransactionCreateManyGovtFeeAccountInput[]
    skipDuplicates?: boolean
  }

  export type VoucherCreateWithoutAccountInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor?: PartnerCreateNestedOneWithoutVouchersInput
    enteredBy: UserCreateNestedOneWithoutVouchersInput
    items?: VoucherItemCreateNestedManyWithoutVoucherInput
  }

  export type VoucherUncheckedCreateWithoutAccountInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorId?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: VoucherItemUncheckedCreateNestedManyWithoutVoucherInput
  }

  export type VoucherCreateOrConnectWithoutAccountInput = {
    where: VoucherWhereUniqueInput
    create: XOR<VoucherCreateWithoutAccountInput, VoucherUncheckedCreateWithoutAccountInput>
  }

  export type VoucherCreateManyAccountInputEnvelope = {
    data: VoucherCreateManyAccountInput | VoucherCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type TransactionUpsertWithWhereUniqueWithoutAccountInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutAccountInput, TransactionUncheckedUpdateWithoutAccountInput>
    create: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutAccountInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutAccountInput, TransactionUncheckedUpdateWithoutAccountInput>
  }

  export type TransactionUpdateManyWithWhereWithoutAccountInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutAccountInput>
  }

  export type ExpenseUpsertWithWhereUniqueWithoutAccountInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutAccountInput, ExpenseUncheckedUpdateWithoutAccountInput>
    create: XOR<ExpenseCreateWithoutAccountInput, ExpenseUncheckedCreateWithoutAccountInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutAccountInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutAccountInput, ExpenseUncheckedUpdateWithoutAccountInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutAccountInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutAccountInput>
  }

  export type InvoiceUpsertWithWhereUniqueWithoutGovtFeeAccountInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutGovtFeeAccountInput, InvoiceUncheckedUpdateWithoutGovtFeeAccountInput>
    create: XOR<InvoiceCreateWithoutGovtFeeAccountInput, InvoiceUncheckedCreateWithoutGovtFeeAccountInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutGovtFeeAccountInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutGovtFeeAccountInput, InvoiceUncheckedUpdateWithoutGovtFeeAccountInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutGovtFeeAccountInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutGovtFeeAccountInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutGovtFeeAccountInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutGovtFeeAccountInput, TransactionUncheckedUpdateWithoutGovtFeeAccountInput>
    create: XOR<TransactionCreateWithoutGovtFeeAccountInput, TransactionUncheckedCreateWithoutGovtFeeAccountInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutGovtFeeAccountInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutGovtFeeAccountInput, TransactionUncheckedUpdateWithoutGovtFeeAccountInput>
  }

  export type TransactionUpdateManyWithWhereWithoutGovtFeeAccountInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutGovtFeeAccountInput>
  }

  export type VoucherUpsertWithWhereUniqueWithoutAccountInput = {
    where: VoucherWhereUniqueInput
    update: XOR<VoucherUpdateWithoutAccountInput, VoucherUncheckedUpdateWithoutAccountInput>
    create: XOR<VoucherCreateWithoutAccountInput, VoucherUncheckedCreateWithoutAccountInput>
  }

  export type VoucherUpdateWithWhereUniqueWithoutAccountInput = {
    where: VoucherWhereUniqueInput
    data: XOR<VoucherUpdateWithoutAccountInput, VoucherUncheckedUpdateWithoutAccountInput>
  }

  export type VoucherUpdateManyWithWhereWithoutAccountInput = {
    where: VoucherScalarWhereInput
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyWithoutAccountInput>
  }

  export type PartnerCreateWithoutVouchersInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    beneficiaries?: BeneficiaryCreateNestedManyWithoutPartnerInput
    transactions?: TransactionCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateWithoutVouchersInput = {
    id?: string
    name: string
    type: $Enums.PartnerType
    liabilities?: number
    beneficiaries?: BeneficiaryUncheckedCreateNestedManyWithoutPartnerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerCreateOrConnectWithoutVouchersInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutVouchersInput, PartnerUncheckedCreateWithoutVouchersInput>
  }

  export type AccountCreateWithoutVouchersInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionCreateNestedManyWithoutAccountInput
    expenses?: ExpenseCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionCreateNestedManyWithoutGovtFeeAccountInput
  }

  export type AccountUncheckedCreateWithoutVouchersInput = {
    id?: string
    name: string
    type: $Enums.AccountType
    balance?: number
    transactions?: TransactionUncheckedCreateNestedManyWithoutAccountInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutAccountInput
    invoicesGovtFee?: InvoiceUncheckedCreateNestedManyWithoutGovtFeeAccountInput
    transactionsGovtFee?: TransactionUncheckedCreateNestedManyWithoutGovtFeeAccountInput
  }

  export type AccountCreateOrConnectWithoutVouchersInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutVouchersInput, AccountUncheckedCreateWithoutVouchersInput>
  }

  export type UserCreateWithoutVouchersInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutEnteredByInput
    expenses?: ExpenseCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceCreateNestedManyWithoutAgentInput
  }

  export type UserUncheckedCreateWithoutVouchersInput = {
    id?: string
    username: string
    password?: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutEnteredByInput
    expenses?: ExpenseUncheckedCreateNestedManyWithoutEnteredByInput
    invoices?: InvoiceUncheckedCreateNestedManyWithoutAgentInput
  }

  export type UserCreateOrConnectWithoutVouchersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVouchersInput, UserUncheckedCreateWithoutVouchersInput>
  }

  export type VoucherItemCreateWithoutVoucherInput = {
    id?: string
    amount: number
    description?: string | null
    category: ExpenseCategoryCreateNestedOneWithoutVoucherItemsInput
  }

  export type VoucherItemUncheckedCreateWithoutVoucherInput = {
    id?: string
    categoryId: string
    amount: number
    description?: string | null
  }

  export type VoucherItemCreateOrConnectWithoutVoucherInput = {
    where: VoucherItemWhereUniqueInput
    create: XOR<VoucherItemCreateWithoutVoucherInput, VoucherItemUncheckedCreateWithoutVoucherInput>
  }

  export type VoucherItemCreateManyVoucherInputEnvelope = {
    data: VoucherItemCreateManyVoucherInput | VoucherItemCreateManyVoucherInput[]
    skipDuplicates?: boolean
  }

  export type PartnerUpsertWithoutVouchersInput = {
    update: XOR<PartnerUpdateWithoutVouchersInput, PartnerUncheckedUpdateWithoutVouchersInput>
    create: XOR<PartnerCreateWithoutVouchersInput, PartnerUncheckedCreateWithoutVouchersInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutVouchersInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutVouchersInput, PartnerUncheckedUpdateWithoutVouchersInput>
  }

  export type PartnerUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    beneficiaries?: BeneficiaryUpdateManyWithoutPartnerNestedInput
    transactions?: TransactionUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    liabilities?: FloatFieldUpdateOperationsInput | number
    beneficiaries?: BeneficiaryUncheckedUpdateManyWithoutPartnerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type AccountUpsertWithoutVouchersInput = {
    update: XOR<AccountUpdateWithoutVouchersInput, AccountUncheckedUpdateWithoutVouchersInput>
    create: XOR<AccountCreateWithoutVouchersInput, AccountUncheckedCreateWithoutVouchersInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutVouchersInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutVouchersInput, AccountUncheckedUpdateWithoutVouchersInput>
  }

  export type AccountUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUpdateManyWithoutGovtFeeAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    balance?: FloatFieldUpdateOperationsInput | number
    transactions?: TransactionUncheckedUpdateManyWithoutAccountNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutAccountNestedInput
    invoicesGovtFee?: InvoiceUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
    transactionsGovtFee?: TransactionUncheckedUpdateManyWithoutGovtFeeAccountNestedInput
  }

  export type UserUpsertWithoutVouchersInput = {
    update: XOR<UserUpdateWithoutVouchersInput, UserUncheckedUpdateWithoutVouchersInput>
    create: XOR<UserCreateWithoutVouchersInput, UserUncheckedCreateWithoutVouchersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVouchersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVouchersInput, UserUncheckedUpdateWithoutVouchersInput>
  }

  export type UserUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutEnteredByNestedInput
    expenses?: ExpenseUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUpdateManyWithoutAgentNestedInput
  }

  export type UserUncheckedUpdateWithoutVouchersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutEnteredByNestedInput
    expenses?: ExpenseUncheckedUpdateManyWithoutEnteredByNestedInput
    invoices?: InvoiceUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type VoucherItemUpsertWithWhereUniqueWithoutVoucherInput = {
    where: VoucherItemWhereUniqueInput
    update: XOR<VoucherItemUpdateWithoutVoucherInput, VoucherItemUncheckedUpdateWithoutVoucherInput>
    create: XOR<VoucherItemCreateWithoutVoucherInput, VoucherItemUncheckedCreateWithoutVoucherInput>
  }

  export type VoucherItemUpdateWithWhereUniqueWithoutVoucherInput = {
    where: VoucherItemWhereUniqueInput
    data: XOR<VoucherItemUpdateWithoutVoucherInput, VoucherItemUncheckedUpdateWithoutVoucherInput>
  }

  export type VoucherItemUpdateManyWithWhereWithoutVoucherInput = {
    where: VoucherItemScalarWhereInput
    data: XOR<VoucherItemUpdateManyMutationInput, VoucherItemUncheckedUpdateManyWithoutVoucherInput>
  }

  export type VoucherCreateWithoutItemsInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor?: PartnerCreateNestedOneWithoutVouchersInput
    account?: AccountCreateNestedOneWithoutVouchersInput
    enteredBy: UserCreateNestedOneWithoutVouchersInput
  }

  export type VoucherUncheckedCreateWithoutItemsInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorId?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoucherCreateOrConnectWithoutItemsInput = {
    where: VoucherWhereUniqueInput
    create: XOR<VoucherCreateWithoutItemsInput, VoucherUncheckedCreateWithoutItemsInput>
  }

  export type ExpenseCategoryCreateWithoutVoucherItemsInput = {
    id?: string
    name: string
    description?: string | null
    expenses?: ExpenseCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateWithoutVoucherItemsInput = {
    id?: string
    name: string
    description?: string | null
    expenses?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryCreateOrConnectWithoutVoucherItemsInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutVoucherItemsInput, ExpenseCategoryUncheckedCreateWithoutVoucherItemsInput>
  }

  export type VoucherUpsertWithoutItemsInput = {
    update: XOR<VoucherUpdateWithoutItemsInput, VoucherUncheckedUpdateWithoutItemsInput>
    create: XOR<VoucherCreateWithoutItemsInput, VoucherUncheckedCreateWithoutItemsInput>
    where?: VoucherWhereInput
  }

  export type VoucherUpdateToOneWithWhereWithoutItemsInput = {
    where?: VoucherWhereInput
    data: XOR<VoucherUpdateWithoutItemsInput, VoucherUncheckedUpdateWithoutItemsInput>
  }

  export type VoucherUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: PartnerUpdateOneWithoutVouchersNestedInput
    account?: AccountUpdateOneWithoutVouchersNestedInput
    enteredBy?: UserUpdateOneRequiredWithoutVouchersNestedInput
  }

  export type VoucherUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryUpsertWithoutVoucherItemsInput = {
    update: XOR<ExpenseCategoryUpdateWithoutVoucherItemsInput, ExpenseCategoryUncheckedUpdateWithoutVoucherItemsInput>
    create: XOR<ExpenseCategoryCreateWithoutVoucherItemsInput, ExpenseCategoryUncheckedCreateWithoutVoucherItemsInput>
    where?: ExpenseCategoryWhereInput
  }

  export type ExpenseCategoryUpdateToOneWithWhereWithoutVoucherItemsInput = {
    where?: ExpenseCategoryWhereInput
    data: XOR<ExpenseCategoryUpdateWithoutVoucherItemsInput, ExpenseCategoryUncheckedUpdateWithoutVoucherItemsInput>
  }

  export type ExpenseCategoryUpdateWithoutVoucherItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenses?: ExpenseUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateWithoutVoucherItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    expenses?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type TransactionCreateManyEnteredByInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCreateManyEnteredByInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    categoryId: string
    paymentMethod: $Enums.PaymentMethod
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateManyAgentInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoucherCreateManyEnteredByInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorId?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    accountId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutTransactionsNestedInput
    beneficiary?: BeneficiaryUpdateOneWithoutTransactionsNestedInput
    partner?: PartnerUpdateOneWithoutTransactionsNestedInput
    workType?: WorkTypeUpdateOneWithoutTransactionsNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutTransactionsGovtFeeNestedInput
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUpdateWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    account?: AccountUpdateOneWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    govtFeeAccount?: AccountUpdateOneWithoutInvoicesGovtFeeNestedInput
    transactions?: TransactionUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUpdateWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: PartnerUpdateOneWithoutVouchersNestedInput
    account?: AccountUpdateOneWithoutVouchersNestedInput
    items?: VoucherItemUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VoucherItemUncheckedUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateManyWithoutEnteredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInvoiceInput = {
    id?: string
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredBy?: UserUpdateOneWithoutTransactionsNestedInput
    beneficiary?: BeneficiaryUpdateOneWithoutTransactionsNestedInput
    partner?: PartnerUpdateOneWithoutTransactionsNestedInput
    workType?: WorkTypeUpdateOneWithoutTransactionsNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutTransactionsGovtFeeNestedInput
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutInvoiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyWorkTypeInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutWorkTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutTransactionsNestedInput
    enteredBy?: UserUpdateOneWithoutTransactionsNestedInput
    beneficiary?: BeneficiaryUpdateOneWithoutTransactionsNestedInput
    partner?: PartnerUpdateOneWithoutTransactionsNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutTransactionsGovtFeeNestedInput
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWorkTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutWorkTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyBeneficiaryInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutBeneficiaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutTransactionsNestedInput
    enteredBy?: UserUpdateOneWithoutTransactionsNestedInput
    partner?: PartnerUpdateOneWithoutTransactionsNestedInput
    workType?: WorkTypeUpdateOneWithoutTransactionsNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutTransactionsGovtFeeNestedInput
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutBeneficiaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutBeneficiaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BeneficiaryCreateManyPartnerInput = {
    id?: string
    name: string
    details?: string | null
    phone?: string | null
    email?: string | null
  }

  export type TransactionCreateManyPartnerInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoucherCreateManyVendorInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BeneficiaryUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUpdateManyWithoutBeneficiaryNestedInput
  }

  export type BeneficiaryUncheckedUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutBeneficiaryNestedInput
  }

  export type BeneficiaryUncheckedUpdateManyWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutTransactionsNestedInput
    enteredBy?: UserUpdateOneWithoutTransactionsNestedInput
    beneficiary?: BeneficiaryUpdateOneWithoutTransactionsNestedInput
    workType?: WorkTypeUpdateOneWithoutTransactionsNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutTransactionsGovtFeeNestedInput
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneWithoutVouchersNestedInput
    enteredBy?: UserUpdateOneRequiredWithoutVouchersNestedInput
    items?: VoucherItemUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VoucherItemUncheckedUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateManyWithoutVendorInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyCategoryInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    paymentMethod: $Enums.PaymentMethod
    accountId?: string | null
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoucherItemCreateManyCategoryInput = {
    id?: string
    voucherId: string
    amount: number
    description?: string | null
  }

  export type ExpenseUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneWithoutExpensesNestedInput
    enteredBy?: UserUpdateOneRequiredWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherItemUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    voucher?: VoucherUpdateOneRequiredWithoutItemsNestedInput
  }

  export type VoucherItemUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoucherItemUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateManyAccountInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeAccountId?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCreateManyAccountInput = {
    id?: string
    date?: Date | string
    description?: string | null
    amount: number
    categoryId: string
    paymentMethod: $Enums.PaymentMethod
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateManyGovtFeeAccountInput = {
    id?: string
    invoiceNo: string
    date?: Date | string
    customerId?: string | null
    customerName?: string | null
    agentId?: string | null
    subtotal?: number
    tax?: number
    discount?: number
    total?: number
    paidAmount?: number
    balance?: number
    paymentMethod?: $Enums.PaymentMethod
    paymentRef?: string | null
    bankName?: string | null
    status?: $Enums.InvoiceStatus
    govtFeeRef?: string | null
    customerPhone?: string | null
    customerEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyGovtFeeAccountInput = {
    id?: string
    invoiceId?: string | null
    invNo?: string | null
    date?: Date | string
    enteredById?: string | null
    beneficiaryId?: string | null
    partnerId?: string | null
    workTypeId?: string | null
    govFee?: number
    typingCharge?: number
    vat?: number
    total?: number
    type?: $Enums.TransactionType
    receiptNo?: string | null
    govtFeeRef?: string | null
    paymentMethod: $Enums.PaymentMethod
    cardId?: string | null
    transactionId?: string | null
    status?: $Enums.PaymentStatus
    advanceStatus?: $Enums.AdvanceStatus
    advanceAmount?: number
    customerName?: string | null
    applicantName?: string | null
    details?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoucherCreateManyAccountInput = {
    id?: string
    voucherNo: string
    date?: Date | string
    description?: string | null
    vendorId?: string | null
    vendorName?: string | null
    total?: number
    paidAmount?: number
    balance?: number
    status?: $Enums.VoucherStatus
    paymentMethod?: $Enums.PaymentMethod
    enteredById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutTransactionsNestedInput
    enteredBy?: UserUpdateOneWithoutTransactionsNestedInput
    beneficiary?: BeneficiaryUpdateOneWithoutTransactionsNestedInput
    partner?: PartnerUpdateOneWithoutTransactionsNestedInput
    workType?: WorkTypeUpdateOneWithoutTransactionsNestedInput
    govtFeeAccount?: AccountUpdateOneWithoutTransactionsGovtFeeNestedInput
  }

  export type TransactionUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput
    enteredBy?: UserUpdateOneRequiredWithoutExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUpdateWithoutGovtFeeAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: UserUpdateOneWithoutInvoicesNestedInput
    transactions?: TransactionUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutGovtFeeAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutGovtFeeAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    tax?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    paymentRef?: NullableStringFieldUpdateOperationsInput | string | null
    bankName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutGovtFeeAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneWithoutTransactionsNestedInput
    enteredBy?: UserUpdateOneWithoutTransactionsNestedInput
    beneficiary?: BeneficiaryUpdateOneWithoutTransactionsNestedInput
    partner?: PartnerUpdateOneWithoutTransactionsNestedInput
    workType?: WorkTypeUpdateOneWithoutTransactionsNestedInput
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutGovtFeeAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutGovtFeeAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    invNo?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    enteredById?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryId?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    workTypeId?: NullableStringFieldUpdateOperationsInput | string | null
    govFee?: FloatFieldUpdateOperationsInput | number
    typingCharge?: FloatFieldUpdateOperationsInput | number
    vat?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    receiptNo?: NullableStringFieldUpdateOperationsInput | string | null
    govtFeeRef?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    cardId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    advanceStatus?: EnumAdvanceStatusFieldUpdateOperationsInput | $Enums.AdvanceStatus
    advanceAmount?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: PartnerUpdateOneWithoutVouchersNestedInput
    enteredBy?: UserUpdateOneRequiredWithoutVouchersNestedInput
    items?: VoucherItemUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: VoucherItemUncheckedUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    vendorId?: NullableStringFieldUpdateOperationsInput | string | null
    vendorName?: NullableStringFieldUpdateOperationsInput | string | null
    total?: FloatFieldUpdateOperationsInput | number
    paidAmount?: FloatFieldUpdateOperationsInput | number
    balance?: FloatFieldUpdateOperationsInput | number
    status?: EnumVoucherStatusFieldUpdateOperationsInput | $Enums.VoucherStatus
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    enteredById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherItemCreateManyVoucherInput = {
    id?: string
    categoryId: string
    amount: number
    description?: string | null
  }

  export type VoucherItemUpdateWithoutVoucherInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutVoucherItemsNestedInput
  }

  export type VoucherItemUncheckedUpdateWithoutVoucherInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoucherItemUncheckedUpdateManyWithoutVoucherInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceCountOutputTypeDefaultArgs instead
     */
    export type InvoiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkTypeCountOutputTypeDefaultArgs instead
     */
    export type WorkTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BeneficiaryCountOutputTypeDefaultArgs instead
     */
    export type BeneficiaryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BeneficiaryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerCountOutputTypeDefaultArgs instead
     */
    export type PartnerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExpenseCategoryCountOutputTypeDefaultArgs instead
     */
    export type ExpenseCategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountCountOutputTypeDefaultArgs instead
     */
    export type AccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VoucherCountOutputTypeDefaultArgs instead
     */
    export type VoucherCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VoucherCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceDefaultArgs instead
     */
    export type InvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransactionDefaultArgs instead
     */
    export type TransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkTypeDefaultArgs instead
     */
    export type WorkTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BeneficiaryDefaultArgs instead
     */
    export type BeneficiaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BeneficiaryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartnerDefaultArgs instead
     */
    export type PartnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartnerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExpenseDefaultArgs instead
     */
    export type ExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExpenseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExpenseCategoryDefaultArgs instead
     */
    export type ExpenseCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExpenseCategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AccountDefaultArgs instead
     */
    export type AccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VoucherDefaultArgs instead
     */
    export type VoucherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VoucherDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VoucherItemDefaultArgs instead
     */
    export type VoucherItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VoucherItemDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}