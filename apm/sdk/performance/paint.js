
// 计算加载时间
export function getPaintTiming() {
  // 什么时机会获取此数据呢？unload 时？
  const entries = window.performance.getEntriesByType('paint');

  return entries.map(item => {
    return {
      type: 'performance',
      sub_type: 'performance_paint',

      duration: item.duration,
      entryType: item.entryType,
      name: item.name,
      startTime: item.startTime,
    }
  })
}
