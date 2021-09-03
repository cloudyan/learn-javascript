import defaultConfig from './config.js'
import { getCommon } from '../common/index.js'

const noop = () => {}
const isFn = fn => typeof fn === 'function'
const clone = data => data

// [diy-plugin](https://github.com/cloudyan/diy-x/tree/main/x-plugin)
export default class PluginCore {
  constructor(config) {
    this._config = {}
    this._plugins = {}
    this.__logs__ = []

    this.getCommon = getCommon;

    this.init(config)
  }

  init(config) {
    this._config = {...defaultConfig, ...config}
  }

  use(plugin, config = {}) {
    const pluginKey = plugin.name
    if (!pluginKey) {
      throw new Error('plugin.name 必须存在')
    }
    if (this._plugins[pluginKey]) return this

    if (isFn(plugin.install)) {
      plugin.install(this, config)
    } else if (isFn(plugin)) {
      plugin(this, config)
    }
    this._plugins[pluginKey] = plugin
    return this
  }
  getPlugin(name) {
    return this._plugins[name]
  }

  logger([...rest]) {
    if (!rest.length) return
    console.log(`%c[apm_sdk]:`, 'background:orange;color:#fff;', rest)
  }

  // 上报 log
  report(data) {
    const config = this._config;
    const common = this.getCommon()
    const log = clone({
      ...common,
      ...data,
      event_time: Date.now(),
    })
    this.__logs__.push(log)
    if (config.autoStart) {
      this.send()
    }
  }

  send() {
    const logs = this.__logs__
    if (logs.length) {
      if (this._config.debug) {
        this.logger(this.__logs__)
      }
      console.log('real send report')
      this.__logs__ = []
    }
  }

  getCommon() {
    return {}
  }

  start() {
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
