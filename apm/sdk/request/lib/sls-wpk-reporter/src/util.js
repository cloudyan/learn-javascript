export const u = navigator.userAgent
export const agent = u.toLowerCase()

export const getTimeStr = (timeStr) => {
  const date = timeStr ? new Date(timeStr) : new Date()
  const Y = date.getFullYear()
  const M = (date.getMonth() + 1 < 10 ? `0${String(date.getMonth() + 1)}` : date.getMonth() + 1)
  const D = date.getDate() < 10 ? `0${String(date.getDate())}` : date.getDate()
  const h = date.getHours() < 10 ? `0${String(date.getHours())}` : date.getHours()
  const m = date.getMinutes() < 10 ? `0${String(date.getMinutes())}` : date.getMinutes()
  const s = date.getSeconds() < 10 ? `0${String(date.getSeconds())}` : date.getSeconds()
  let ms = date.getMilliseconds()
  if (ms < 10) {
    ms = `00${String(ms)}`
  } else if (ms < 100) {
    ms = `0${String(ms)}`
  }
  return `${Y}-${M}-${D} ${h}:${m}:${s}:${ms}`
}

export const getIsPC = () => {
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true
  for (let i = 0; i < agents.length; i += 1) {
    if (u.indexOf(agents[i]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

export const isPc = getIsPC()

export const getBrowserInfo = () => {
  const regStr_ie = /msie [\d.]+;/gi
  const regStr_edg = /edg\/[\d.]+/gi
  const regStr_ff = /firefox\/[\d.]+/gi
  const regStr_chrome = /chrome\/[\d.]+/gi
  const regStr_saf = /safari\/[\d.]+/gi
  //IE
  if(agent.includes("msie")) {
    return agent.match(regStr_ie)[0]
  }
  //ie11
  if (agent.includes('trident') && agent.includes('rv:11.0')) {
    return 'ie11'
  }
  //Edge
  if(agent.includes("edg/")) {
    return agent.match(regStr_edg)[0]
  }
  //firefox
  if(agent.includes("firefox")) {
    return agent.match(regStr_ff)[0]
  }
  //Safari
  if(agent.includes("safari") && !agent.includes("chrome")) {
    return agent.match(regStr_saf)[0]
  }
  //Chrome
  if(agent.includes("chrome")) {
    return agent.match(regStr_chrome)[0]
  }
  return '-'
}

export const getDeviceOs = () => {
  if (isPc) {
    if (/macintosh|mac os x/i.test(u)) {
      return 'MacOS'
    } else if (agent.includes('win32') || agent.includes('wow32')) {
      return 'Win32'
    } else if (agent.includes('win64') || agent.includes('wow64')) {
      return 'Win64'
    }
  } else if (u.includes('Android') || u.includes('Adr')) {
    return 'Android'
  } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 'IOS'
  }
  return 'Unknown'
}

export const getDeviceOsVersion = () => {
  let version = ''
  if (u.indexOf('Mac OS X') > -1) {
    let regStr_saf = /iPhone OS [\d._]*/gi
    // ios
    if (isPc) {
      regStr_saf = /OS X [\d._]*/gi
    }
    const verinfo = u.match(regStr_saf)
    version = (verinfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')
  } else if (u.includes('Android') || u.includes('Linux')) {
    // android
    version = 'Android' + u.substr(u.indexOf('Android') + 8, u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8)
  } else if (u.includes('BB10')) {
    // 黑莓bb10系统
    version = 'blackberry' + u.substr(u.indexOf('BB10') + 5, u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5)
  } else if (u.includes('IEMobile')) {
    // windows phone
    version = 'winphone' + u.substr(u.indexOf('IEMobile') + 9, u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9)
  } else {
    if (agent.includes('windows nt 5.0')) {
      version = 'Windows 2000'
    } else if (agent.includes('windows nt 5.1') || agent.includes('windows nt 5.2')) {
      version = 'Windows XP'
    } else if (agent.includes('windows nt 6.0')) {
      version = 'Windows Vista'
    } else if (agent.includes('windows nt 6.1') || agent.includes('windows 7')) {
      version = 'Windows 7'
    } else if (agent.includes('windows nt 6.2') || agent.includes('windows 8')) {
      version = 'Windows 8'
    } else if (agent.includes('windows nt 6.3')) {
      version = 'Windows 8.1'
    } else if (agent.includes('windows nt 6.2') || agent.includes('windows nt 10.0')) {
      version = 'Windows 10'
    } else {
      version = 'Unknown'
    }
  }
  return version
}
