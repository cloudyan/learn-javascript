// 常用的正则判断
// 将正则提取出来，可以缓存编译，优化速度

var objRegExp = {
  email: /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/,
  // /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  passward: /^[a-zA-Z0-9]{6,20}$/,
  // mobile: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-1]|[6-8]))|(18([0-9])))\d{8}$/,
  mobile: /^(1[3-8])\d{9}$/,
  mobileCode: /^(\d{6}|\d{4})$/,
  passward: /(.+){6,}/,
  chinese: /^[\u4e00-\u9fff]{0,}$/,
  english: /^[A-Za-z]+$/,
  zip: /^[1-9]\d{5}$/,
  date: /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229)$/,
  num: /^\d+$/,
  cellPhone: /(^0{0,1}1[3|4|5|6|7|8][0-9]{9}$)/,
  //身份证号
  idCardNo: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/,
  IDCardNo: /^[A-Za-z0-9]+$/,
  englishAndSpace: /^([a-zA-Z ]+|[\u4e00-\u9fa5]+)$/,
  verifycode: /^[a-z0-9]{4,30}$/,
  id: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  //URL的一般格式为： scheme://host:port/path?query#fragment
  httpUrl: /^https+:\/\//,
};

return function(type, text, reg){
  if(!text || (!objRegExp[type] && !reg) ) return;

  reg = reg || objRegExp[type];

  return reg.test(text);
};