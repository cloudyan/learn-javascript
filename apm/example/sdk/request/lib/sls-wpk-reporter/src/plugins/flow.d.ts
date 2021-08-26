import * as WpkReporter from "../index.d";

/**
 * 流量pvuv插件
 * @param sdkIns SDK实例， 必填
 * @param opts 配置阐述，可选
 */
declare function wpkflowPlugin(sdkIns: WpkReporter, opts?: wpkflowPlugin.Options): void;
declare namespace wpkflowPlugin {
    interface Options {
        /** 是否启用，默认值为true，可设置为false关闭pv上报 **/
        enable?: boolean;
    }
}

export as namespace wpkflowPlugin
export = wpkflowPlugin

