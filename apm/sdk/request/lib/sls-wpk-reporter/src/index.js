import { getTimeStr, getBrowserInfo, getDeviceOs, getDeviceOsVersion } from './util'
const SlsWebLogger = require('./slsWebLogger')
const slsWebCollect = require('./slsWebCollect')

export default class slsReporter extends slsWebCollect {
  constructor(opts) {
    super(opts)
    this.project = opts.project
    this.endpoint = opts.endpoint
    this.logstore = opts.logstore
    this.slsParams = opts.slsParams
    this.logReport = (obj) => {
      this.report({
        category: 100, // 必填，一般是100以上的数字，1~99为预留为系统使用
        slsMsg: obj
      })
    }
    this.browser_version = getBrowserInfo()
    this.device_os = getDeviceOs()
    this.device_os_version = getDeviceOsVersion()
  }

  upload(header, logData) {
    const { project, endpoint, logstore, slsParams = {}, browser_version, device_os, device_os_version } = this
    const { systemInfo, device } = slsParams
    const initState = {
      host: endpoint,
      project,
      logstore: logstore || 'sls-alysls-track-base',
      time: 10,
      count: 10,
    }

    // 处理上报逻辑
    if (project && endpoint) {
      // 扩展字段
      let reserves = {
        'wpk_header': header,
        'browser_version': browser_version
      }
      if (logData.ua) {
        reserves.ua = logData.ua
      }
      if (systemInfo) {
        reserves = { ...reserves, ...systemInfo }
      }
      if (device) {
        reserves = { ...reserves, ...device }
      }
      const timestamp = (new Date()).getTime()
      // 本地时间和服务器返回x-log-time的时间差
      const timeGap = window.localStorage.getItem("ali-sls@wpk-reporter-time-gap")
      
      // 完整的日志
      const reportObj = {
        local_time: getTimeStr(), // 终端时间(格式为yyyy-mm-dd hh24:mi:ss:ms)
        local_timestamp: timestamp, // 终端时间(格式为数字型的unix时间,精确到毫秒,可通过from_unixtime函数转换成日期)
        local_time_fixed: timeGap ? getTimeStr(timestamp + Number(timeGap)) : getTimeStr(),
        local_timestamp_fixed: timeGap ? timestamp + Number(timeGap) : timestamp,
        app_name: logData.app_name || '-', // app_id对应的app中文名称（用户填）
        app_version: logData.rel || '-', // app的应用版本号
        utdid: logData.uid || '-', // 设备唯一编码
        imei: '-', // 移动设备国际身份码的缩写
        imsi: '-', // 国际移动用户识别码
        brand: logData.brand || '-', // 手机或终端的品牌
        device_model: logData.model || '-', // 手机或终端的机型
        os: logData.os || device_os || '-', // 操作系统，如: Android、iPhone OS
        os_version: device_os_version || '-', // 操作系统的版本
        reserve6: JSON.stringify(logData), // itrace采集的完整字段
        reserves,
        carrier: '-', // 移动运营商，如：中国移动、中国联通、中国电信
        access: logData.net || 'Unknown', // 连接的网络，如：2G、3G、Wi-Fi
        access_subtype: 'Unknown', // 网络类型，如：HSPA、EVDO、EDGE、GPRS等
        root: '-', // true, 已 root/越狱。
        resolution: `${logData.dsp_h}*${logData.dsp_w}`, // 手机或终端的屏幕分辨率
        app_id: `${logData.w_bid}@H5`,
        channel: '-', // app对应的渠道号(用户填)
        channel_name: '-', // channel对应的渠道名称(用户填)
        user_nick: '-', // 登录nick(用户填)
        long_login_nick: '-', // 长登录nick，不管启动多少次，都会记录最后一次登录nick(用户填)
        user_id: '-', // (用户填)
        long_login_user_id: '-', // (用户填)
        logon_type: '-', // 登录类型(用户填)
      }
      Object.keys(slsParams).forEach(key => {
        reportObj[key] = slsParams[key]
      })
      if (logData.slsMsg) {
        Object.keys(logData.slsMsg).forEach(key => {
          reportObj[key] = logData.slsMsg[key]
        })
      }
  
      const { ip, type } = logData
      if (ip) {
        reportObj.client_ip = ip
      }
      if (type === 'jserr') { // js 执行异常
        reportObj.event_id = '61100'
      } else if (type === 'api') { // api异常
        reportObj.event_id = '61101'
      } else if (type === 'resloadfail') { // 资源加载异常
        reportObj.event_id = '61102'
      } else if (type === 'flow') { // 页面访问
        reportObj.event_id = '61103'
      } else if (type === 'bkpg') { // 白屏
        reportObj.event_id = '61104'
      } else if (type === 'jsfsperf') { // 页面性能数据
        reportObj.event_id = '61105'
      } else if (type === 'jssdkidx') { // 自定义上报
        reportObj.event_id = '61106'
      }
      if (reportObj.event_id === '61101' && logData.w_res.includes(endpoint)) {
        return
      }
      // 必须存在event_id才会进行上报
      if (reportObj.event_id) {
        const logger = new SlsWebLogger(initState)
        logger.send(reportObj)
      }
    }
  }
}
