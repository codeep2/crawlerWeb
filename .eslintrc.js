/*
 * @Author: MADAO
 * @Date: 2020-05-18 11:19:53
 * @LastEditors: MADAO
 * @LastEditTime: 2020-06-11 10:02:27
 * @Description: eslint config
 */
module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "standard"
  ],
  "globals": {
    "SharedArrayBuffer": "readonly",
    "eventBus": "readonly",
    "getNVCVal": "readonly",
    "getNC": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "prefer-promise-reject-errors": "off",
    "camelcase": "off"
  }
};