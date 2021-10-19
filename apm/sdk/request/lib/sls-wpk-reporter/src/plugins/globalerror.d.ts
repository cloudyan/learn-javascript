import * as WpkReporter from "../index.d";

/**
 * 全局异常插件，支持JS Error 和 资源加载异常
 * @param sdkIns sdk实例，必填
 * @param opts 配置阐述，可选
 */
declare function wpkglobalerrorPlugin(sdkIns: WpkReporter, opts?: wpkglobalerrorPlugin.Options): void;
declare namespace wpkglobalerrorPlugin {
    interface Options {
        jsErr?: boolean;
        jsErrSampleRate?: number | string;
        jsErrFilter?: (error: Error) => boolean;
        resErr?: boolean;
        resErrSampleRate?: number | string;
        resErrFilter?: (error: Error) => boolean;
    }
}

export as namespace wpkglobalerrorPlugin
export = wpkglobalerrorPlugin
