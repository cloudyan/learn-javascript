import defaultConfig from './config.js'
import { getCommon } from '../common/index.js'

const noop = () => {}
const isFn = fn => typeof fn === 'function'
const clone = data => data

// [diy-plugin](https://github.com/cloudyan/diy-x/tree/main/x-plugin)
export default class PluginCore {
  constructor(config) {
    this._config = {...defaultConfig}
    this._plugins = {}
    this.__logs__ = []

    this.getCommon = getCommon;

    this.setConfig(config)
    const { name = 'apm_sdk', debug } = this._config;
    if (debug) {
      window[name] = this;
    }
  }

  setConfig(config) {
    Object.assign(this._config, config)
  }

  use(plugin, config = {}) {
    const pluginKey = plugin.name
    if (!pluginKey) {
      throw new Error('plugin.name 必须存在')
    }
    if (this._plugins[pluginKey]) return this

    this.setConfig(config);
    if (isFn(plugin.install)) {
      plugin.install(this, config)
    } else if (isFn(plugin)) {
      plugin(this, config)
    }
    this._plugins[pluginKey] = plugin
    return this
  }
  addPlugin(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach((p, o) => {
        if (Array.isArray(p)) {
          this.use(p[0], p[1])
        } else {
          this.use(p, o);
        }
      });
      return this;
    }
  }
  getPlugin(name) {
    return this._plugins[name]
  }

  _logger([...rest]) {
    if (!rest.length) return
    console.log(`%c[apm_sdk]:`, 'background:orange;color:#fff;', rest)
  }

  // 上报 log
  // 原始的数据应该是有结构的，当产生 log数据时，可以按需要对数据进行格式化，比如扁平化、甚至更改 key 的名称，以方便日志系统使用
  // 简单的扁平化逻辑，示例 ua: { host_name } --> ua_host_name 既可避免命名冲突，又能明确分组，查看日志时也比较方便
  // TODO: log 格式，后续再支持
  report(data) {
    const config = this._config;
    const common = this.getCommon()
    const log = clone({
      ...common,
      ...data,
      event_time: Date.now(),
    })
    this.__logs__.push(log)
    if (config.autoReport) {
      this.send()
    }
  }

  send() {
    const logs = this.__logs__
    if (logs.length) {
      if (this._config.debug) {
        this._logger(this.__logs__)
      }
      console.log('real send report')
      this.__logs__ = []
    }
  }

  getCommon() {
    return {}
  }

  startReport() {
    this.send();
  }
}

// usage:
// const core = new PluginCore({
//   type: '',
// })
// const pluginDemo = function(ctx, config) { Object.assign(ctx._config, config) }
// core.use(pluginDemo, {type: 'js_error'})

// console.log(core);
