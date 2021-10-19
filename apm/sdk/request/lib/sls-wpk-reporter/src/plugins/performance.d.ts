import * as WpkReporter from "../index.d";

/**
 * 性能插件
 * @param sdkIns sdk实例
 * @param opts 配置参数，可选
 */
declare function wpkperformancePlugin(sdkIns: WpkReporter, opts?: wpkperformancePlugin.Options): void;
declare namespace wpkperformancePlugin {
    interface Options {
        enable?: boolean;
        /** 采样率，默认100%，可数字： 0 - 1, 或百分比0% - 100% **/
        sampleRate?: string | number;
    }
}

export as namespace wpkperformancePlugin
export = wpkperformancePlugin

