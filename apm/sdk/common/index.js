

// 需要获取以下数据
// [cuid](https://github.com/ericelliott/cuid)
// app/project
// event,
// screen
// device
// network
// session // 同一次 uuid/session_id, 记录自增 log
// user
// page

import getUdid from './udid.js'

export function getCommon() {
  return {
    ...app(),
    ...event(),
    ...screen(),
    ...device(),
    ...network(),
    ...session(),
    ...user(),
    ...page(),
  }
}


function app() {
  return {
    app_name: '',
    app_release: '',
    env: '',
    commit_hash: '',
    app_type: '',
  }
}

function event() {
  const { memory = {} } = window.performance || {}
  return {
    udid: getUdid(),
    memory_js_heapsize_limit: memory.jsHeapSizeLimit || '-',
    memory_total_js_heapsize: memory.totalJSHeapSize || '-',
    memory_used_js_heapsize: memory.usedJSHeapSize || '-',
  }
}

function screen() {

  return {
    pixel_radio: '',
    screen_width: '',
    screen_height: '',
    window_width: '',
    window_height: '',
    theme: '',
  }
}

function device() {
  const {
    hardwareConcurrency = '-',
    deviceMemory = '-',
    language = '-',
    onLine,
    doNotTrack = '-',
    cookieEnabled,
    platform,
    userAgent,
  } = navigator
  return {
    language: language.toLowerCase(),
    platform: '',
    hardware_concurrency: hardwareConcurrency,
    device_memory: deviceMemory,
    cookie_enabled: cookieEnabled,
    is_donot_track: doNotTrack,
    is_online: onLine,
    platform,
    network_type: getNetworkType(),
    user_agent: userAgent,

    // 以下字段通过日志清洗得出
    // brand: '',
    // brand_model: '',
    // os_name: '',
    // os_version: '',
    // host_name: '',
    // host_version: '',
    // browser: '',
    // browser_version: '',
    // engine_name: '',
    // engine_version: '',
    // mini_program: '-',
    // is_mini_program: false,
    // is_handheld: false,
    // is_hybrid: false,
    // is_mobile: false,
  }
}

function network() {
  return {
    network_type: getNetworkType(),
  }
}

function session() {
  return {
    session_id: '',
  }
}

function user() {
  return {
    uid: '',
    is_logon: false,
  }
}

function page() {
  return {
    // page_url 可解析出 domain pathname
    page_url: '',

    page_id: '',
    page_name: '',
  }
}


// JS 通过 userAgent和connection 获取网络连接类型的兼容性其实都不好，
// 特别是pc，明明 wifi 显示 4g，还很多情况返回 unknown
function getNetworkType() {
  /* wired 有线
    bluetooth,
    wifi,
    2g,3g,4g,5g...,
    unkown
  */
  const ua = navigator.userAgent;
  const ut = navigator.connection;
  let networkStr = ut?.effectiveType?.toLowerCase() || '';
  if (!networkStr) {
    const arr = ua.match(/NetType\/\w+/) || []
    networkStr = (arr[0] || '')
  }
  networkStr = networkStr.replace('nettype/', '')
                         .replace('3gnet', '3g');
  switch (networkStr) {
    case 'wifi':
    case '5g':
    case '4g':
    case '3g':
    case '2g':
    case 'bluetooth':
      break;
    case 'none':
    case 'other':
    case 'unknown':
      networkStr = 'unknown';
      break
    default:
      break;
  }
  return networkStr || '-';
}
