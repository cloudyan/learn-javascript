import * as WpkReporter from "../index.d";
/**
 * API插件，支持xhr 和 fetch
 * @param sdkIns sdk实例，必填
 * @param opts 配置阐述，可选
 */
declare function wpkinterfacePlugin(sdkIns: WpkReporter, opts?: wpkinterfacePlugin.Options): void;
declare namespace wpkinterfacePlugin {
    interface Options {
        enable?: boolean;
        sampleRate?: number | string;
        withBody?: boolean;
        withResp?: boolean;
        errorFilter?: (params: ApiCallBack) => boolean | ApiFilterRet;
    }

    /**
     * API errorFilter params
     */
    type ApiCallBack = {
        url: string;
        status: number;
        response: string;
        body: string;
        queryString: string;
        reqHeaders: Record<string, string>;
        resHeaders: Record<string, string>;
    }
    /**
     * API errorFilter 需要返回参数，除了bizCode、msg和resp外，还支持c1 - c5等动态自定义字段。
     */
    interface ApiFilterRet {
        /** 业务错误码，次字段的值会覆盖 http status **/
        bizCode?: number;
        /** 异常内容 **/
        msg?: string;
        /** http响应内容 **/
        resp?: string;
        [key: string]: any;
    }
}

export as namespace wpkinterfacePlugin
export = wpkinterfacePlugin
