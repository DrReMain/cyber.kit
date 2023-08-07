# 常用正则表达式合集

## Usage

```javascript
import {RE__MOBILE} from "@cyberdancer/regexp"

console.log(RE__MOBILE.test('18812344321')); // true
console.log(RE__MOBILE.test('1881234432')); // false
console.log(RE__MOBILE.test('188 12344321')); // false
console.log(RE__MOBILE.test('1881234432a')); // false
```

## List

* `RE__MOBILE`: `/^1\d{10}$/u`
* `RE__EMAIL`: `/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u`
* `RE__REALNAME`: `/^(?:[\u4e00-\u9fa5·]{2,})$/u`
* `RE__NICKNAME`: `/^(?:[0-9A-Za-z\u4e00-\u9fa5·]{2,})$/u`
* `RE__IDCARD`: `/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/u`
* `RE__HEXCOLOR`: `/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/u`
* `RE__POSI_INTEGER`: `/^[1-9]\d*$/u`
* `RE__CURRENCY`: `/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/u`
* `RE__BANK_NO`: `/^[1-9]\d{9,29}$/u`
* `RE__CREDITCODE`: `/^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/u`
* `RE__PASSWD_INTENSION`: `/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/u`
