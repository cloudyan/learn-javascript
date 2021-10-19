import * as React from 'react'
import * as WpkReporter from "../index.d";

declare namespace wpkReactPlugin {
    /**
     * fallback 组件参数
     */
    type FallbackComponentProps = {
        error: Error,
        info: React.ErrorInfo,
    }
    type withErrorBoundary<P> = (WrappedComponent: React.ComponentType<P> | React.FC<P>,
                                FallbackComponent?: React.ComponentType<FallbackComponentProps> | React.FC<FallbackComponentProps>
    ) => React.ComponentType<P>;

    /**
     * 创建 ErrorBoundary高阶组件
     * @param sdkIns
     */
    function createErrorBoundaryHOC<P>(sdkIns: WpkReporter): wpkReactPlugin.withErrorBoundary<P>;
}
export = wpkReactPlugin
