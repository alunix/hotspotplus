/**
 * Created by payamyousefi on 4/13/15.
 */

var SMS_API_KEY = process.env.SMS_API_KEY;
var elasticURL =
  'http://' + process.env.ELASTIC_IP + ':' + process.env.ELASTIC_PORT;

module.exports = {
  ELASTIC_LICENSE_CHARGE:
    elasticURL +
    process.env.ELASTIC_INDEX_PREFIX +
    'licensecharge/licensecharge',
  ELASTIC_LICENSE_CHARGE_MAIN_CONTEXT:
    elasticURL + process.env.ELASTIC_INDEX_PREFIX + 'licensecharge',
  LICENSE_TYPE_CHARGE: 'licenseCharge',
  PAYMENT_API_KEY: process.env.PAYMENT_API_KEY,
  PAYMENT_GATEWAY_DEFAULT_DESC: 'خرید اعتبار از سایت هات اسپات پلاس',
  PAYMENT_SUPPORT_EMAIL: process.env.PAYMENT_SUPPORT_EMAIL,
  PAYMENT_SUPPORT_MOBILE: process.env.PAYMENT_SUPPORT_MOBILE,
  LICENSE_TEMPLATE: [
    '====HOTSPOTPLUS BEGIN LICENSE====',
    '{{&licenseVersion}}',
    '{{&applicationVersion}}',
    '{{&numberOfAllowedBusiness}}',
    '{{&loadedAt}}',
    '{{&systemUuid}}',
    '{{&creationDate}}',
    '{{&expiresAt}}',
    '{{&issueDate}}',
    '{{&title}}',
    '{{&systemConfig}}',
    '{{&modules}}',
    '{{&services}}',
    '{{&scripts}}',
    '{{&serial}}',
    '=====HOTSPOTPLUS END LICENSE=====',
  ].join('\n'),
  ROLES: {
    ADMIN: 'admin',
    LICENSE_ROLE: 'license',
  },
  ROOT_USERS_DOMAIN: 'hotspotplus.ir',
  ADMIN_USERNAME: 'payam',
  ADMIN_PASSWORD: 'payamccis#28414',
  ADMIN_ROLES: ['admin'],
  DEFAULT_LICENSE_DURATION_IN_MONTHS: 24,
  DEFAULT_ONLINE_USER: 120,
  KAVEHNEGAR_DEFAULT_SMS_CREDIT: 1001,
  KAVEHNEGAR_SMS_PLAN_ID: 'hotspotplus',
  KAVEHNEGAR_PANEL_DEFAULT_STATUS: '1',
  SERVICE_MAN_USERNAME: process.env.SERVICE_MAN_USERNAME,
  SERVICE_MAN_PASSWORD: process.env.SERVICE_MAN_PASSWORD,
  KAVEHNEGAR_CHARGE_CUSTOMER_CREDIT:
    'http://api.kavenegar.com/v1/' + SMS_API_KEY + '/client/chargecredit.json',
  KAVEHNEGAR_ADD_CUSTOMER:
    'http://api.kavenegar.com/v1/' + SMS_API_KEY + '/client/add.json',
  KAVEHNEGAR_LOAD_CUSTOMER:
    'http://api.kavenegar.com/v1/' + SMS_API_KEY + '/client/fetch.json',
  RETURN_AND_VERIFY_REMOTE_SERVER_INVOICE:
    process.env.API_ADDRESS + '/Licenses/verifyInvoice?invoiceId={invoiceId}',
  LOCAL_PKG_INVOICE_TYPE: 'buy_local_pkg',
  LOCAL_SMS_CHARGE_INVOICE_TYPE: 'buy_sms_charge',
  DEFAULT_FREE_PACKAGE: 'fermiumAccountingModule',
  DEFAULT_FREE_LOG_PACKAGE: 'fermiumLocalLog',
  DEFAULT_FREE_SMS_PACKAGE: 'fermiumLocalSms',
  LOCAL_MODULES: {
    packages: [
      {
        id: 'fermiumAccountingModule',
        active: false,
        buyDisabled: false,
        oneTime: false,
        buyMethod: 'pay',
        packageDesc: 'بسته رایگان',
        durationTitle: 'تومان/ ماهیانه',
        title: 'بسته رایگان',
        price: 0,
        discount: 0 / 100,
        duration: 24,
        service: {
          allowedOnlineUsers: 30,
          title: 'لایسنس اکانتینگ رایگان',
          features: [
            ' کابر آنلاین همزمان، ۳۰ کلاینت',
            'پروفایل های مجاز: ۱ عدد',
          ],
        },
        modules: {},
      },
      {
        id: 'fermiumLocalLog',
        active: false,
        buyDisabled: false,
        oneTime: false,
        buyMethod: 'pay',
        durationTitle: 'تومان/ ماهیانه',
        packageDesc: 'اشتراک ماهیانه',
        title: 'اشتراک ماهیانه',
        price: 0,
        discountDesc: '',
        discount: 20 / 100,
        duration: 1,
        service: {},
        modules: {
          log: {
            title: 'ثبت لاگ وب سایت و آی پی',
            features: [
              { title: 'ثبت لاگ بر اساس آی پی و پورت' },
              { title: 'ثبت لاگ بازدید وب سایت' },
            ],
          },
        },
      },
      {
        id: 'fermiumLocalSms',
        active: false,
        buyDisabled: false,
        oneTime: false,
        buyMethod: 'pay',
        durationTitle: 'تومان/ ماهیانه',
        packageDesc: 'اشتراک ماهیانه',
        title: 'اشتراک ماهیانه',
        price: 0,
        discountDesc: '',
        discount: 20 / 100,
        duration: 1,
        service: {},
        modules: {
          sms: {
            title: 'ارسال پیامک',
            features: [
              { title: 'ارسال پیامک تایید هویت' },
              { title: 'ارسال پیامک انبوه به کاربران' },
              { title: 'هزینه هر یک پیامک ۱۳ تومان' },
            ],
          },
        },
      },
      {
        id: 'oneTimeOrganization',
        active: true,
        buyDisabled: false,
        oneTime: true,
        buyMethod: 'contact',
        durationTitle: 'تومان/ دائمی',
        packageDesc: 'لایسنس سازمانی',
        title: 'لایسنس سازمانی',
        price: 14500000,
        discountDesc: '',
        discount: 0 / 100,
        duration: 120,
        service: {
          allowedOnlineUsers: 500,
          title: 'لایسنس سازمانی',
          features: [
            { title: ' کابر آنلاین همزمان، ۵۰۰ کلاینت', class: 'font-bold' },
            { title: 'پروفایل های مجاز: ۳ عدد', class: 'font-bold' },
            { title: 'به روزرسانی خودکار برنامه' },
          ],
        },
        modules: {
          sms: {
            title: 'ارسال پیامک',
            features: [
              { title: 'ارسال پیامک تایید هویت' },
              { title: 'ارسال پیامک انبوه به کاربران' },
              {
                title: 'امکان ارسال پیامک از خطوط اختصاصی',
                class: 'font-bold',
              },
            ],
          },
          log: {
            title: 'ثبت لاگ وب سایت و آی پی',
            features: [
              { title: 'ثبت لاگ بر اساس آی پی و پورت' },
              { title: 'ثبت لاگ بازدید وب سایت' },
            ],
          },
          support: {
            title: 'پشتیبانی',
            features: [
              { title: 'نصب رایگان و اختصاصی', class: 'font-bold' },
              {
                title: 'پشتیبانی از طریق تلفن و اتصال ریموت',
                class: 'font-bold',
              },
            ],
          },
        },
      },
      {
        id: 'oneTimeOrganizationExpert',
        active: true,
        buyDisabled: false,
        oneTime: true,
        buyMethod: 'contact',
        durationTitle: 'تومان/ دائمی',
        packageDesc: 'لایسنس سازمانی حرفه‌ای',
        title: 'لایسنس سازمانی حرفه‌ای',
        price: 25000000,
        discountDesc: '',
        discount: 0 / 100,
        duration: 120,
        service: {
          allowedOnlineUsers: 1000,
          title: 'لایسنس سازمانی حرفه‌ای',
          features: [
            { title: ' کابر آنلاین همزمان، ۱۰۰۰ کلاینت', class: 'font-bold' },
            { title: 'پروفایل های مجاز: ۵ عدد', class: 'font-bold' },
            { title: 'به روزرسانی خودکار برنامه' },
          ],
        },
        modules: {
          sms: {
            title: 'ارسال پیامک',
            features: [
              { title: 'ارسال پیامک تایید هویت' },
              { title: 'ارسال پیامک انبوه به کاربران' },
              {
                title: 'امکان ارسال پیامک از خطوط اختصاصی',
                class: 'font-bold',
              },
            ],
          },
          log: {
            title: 'ثبت لاگ وب سایت و آی پی',
            features: [
              { title: 'ثبت لاگ بر اساس آی پی و پورت' },
              { title: 'ثبت لاگ بازدید وب سایت' },
            ],
          },
          support: {
            title: 'پشتیبانی',
            features: [
              { title: 'نصب رایگان و اختصاصی', class: 'font-bold' },
              {
                title: 'پشتیبانی از طریق تلفن و اتصال ریموت',
                class: 'font-bold',
              },
            ],
          },
        },
      },
    ],
  },
  PASSWORD_PREFIX: process.env.PASSWORD_PREFIX,
  ADMIN_OWNER_ID: 'Admin',
  PERCENT_UNIT: 'percent',
  TOMAN_UNIT: 'toman',
  BUY_LICENSE: 'LicenseCharge',
};