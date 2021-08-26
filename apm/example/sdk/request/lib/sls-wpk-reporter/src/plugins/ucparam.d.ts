import * as WpkReporter from "../index.d";

/**
 * UC公参插件
 * @param sdkIns SDK实例
 * @param opts 配置参数，可选
 */
declare function wpkucparamPlugin(sdkIns: WpkReporter, opts?: wpkucparamPlugin.Options): void;
declare namespace wpkucparamPlugin {
    interface Options {
        /** uc公参字符串 **/
        params?: string;
    }
}

export as namespace wpkucparamPlugin
export = wpkucparamPlugin

