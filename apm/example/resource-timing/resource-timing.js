if ("performance" in window) {
  function onBufferFull() {
    var latestEntries = performance.getEntriesByType("resource");
    performance.clearResourceTimings();

    // analyze or beacon latestEntries, etc
  }

  performance.onresourcetimingbufferfull = performance.onwebkitresourcetimingbufferfull = onBufferFull;
}


// if ("performance" in window
//     && window.performance
//     && window.performance.setResourceTimingBufferSize) {
//     performance.setResourceTimingBufferSize(300);
// }

// 计算阻塞时间
var blockingTime = 0;
if (res.connectEnd && res.connectEnd === res.fetchStart) {
    blockingTime = res.requestStart - res.connectEnd;
} else if (res.domainLookupStart) {
    blockingTime = res.domainLookupStart - res.fetchStart;
}


// ServiceWorker 处理时间
var workerProcessingTime = 0;
if (res.workerStart && res.fetchStart) {
    workerProcessingTime = res.fetchStart - res.workerStart;
}

// 压缩上报
// https://github.com/nicjansma/resourcetiming-compression.js
