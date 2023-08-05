export const RE__MOBILE = /^1\d{10}$/u; // 中国大陆手机号

export const RE__EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u; // email

export const RE__REALNAME = /^(?:[\u4e00-\u9fa5·]{2,})$/u; // 中文真名

export const RE__NICKNAME = /^(?:[0-9A-Za-z\u4e00-\u9fa5·]{2,})$/u; // 昵称

export const RE__IDCARD = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/u; // 大陆二代身份证

export const RE__HEXCOLOR = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/u; // 十六进制颜色值

export const RE__POSI_INTEGER = /^[1-9]\d*$/u; // 正整数

export const RE__CURRENCY = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/u; // 整数金额

export const RE__BANK_NO = /^[1-9]\d{9,29}$/u; // 大陆银行卡号，参考微信支付

export const RE__CREDITCODE = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/u; // 统一社会信用代码

export const RE__PASSWD_INTENSION = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/u; // 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符

