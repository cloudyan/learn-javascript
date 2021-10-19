import * as WpkReporter from "../index.d";

/**
 * @param sdkIns sdk 实例, 必填
 * @param opts 配置参数，必填
 */
declare function wpkblankPlugin(sdkIns: WpkReporter, opts: wpkblankPlugin.Options): void;

declare namespace wpkblankPlugin {
    interface Options {
        /** 开启/关闭插件，不设置时默认开启 **/
        enable?: boolean;
        /** 采样率，默认100%，可数字： 0 - 1, 或百分比0% - 100% **/
        sampleRate?: number | string;
        /** 遍历元素时的起始节点，默认为body节点  **/
        rootNode?: HTMLElement;
        /** 遍历元素的最大深度，默认值为 8；尽量不要设置太高以避免遍历算法带来过高的性能损耗 **/
        maxDepth?: number;
        /** 非白屏的最少元素数，默认值为 10 **/
        maxElements?: number;
        /** 特征值文本，支持设置该值来直接判定白屏(当节点只有此问题本时，认为是白屏)，如 '加载中'或'请稍后'等 **/
        keyNoteText?: string[];
        /** 用于用户判定是否忽略白屏检测，返回true，则忽略 **/
        ignorePageUrls?: (location: Location) => boolean;
        /** 最大的白屏时间，单位：ms，超过该值则会上报一次【慢白屏】(responseEnd - fetchStart)，默认为3000ms，设置为0可关闭此项检测 **/
        wsDuration?: number;
        /** 最大的首屏加载时间，单位：ms，超过该值则会上报一次【慢加载白屏】，默认为 8000ms **/
        onloadDuration?: number;
        /** 开始白屏检测的时间，单位：ms，默认是在 onload事件触发后5000ms **/
        startCheckingTime?: number;
    }
}

export as namespace wpkblankPlugin
export = wpkblankPlugin
