if (typeof globalThis.ReadableStream === 'undefined') {
  try {
    globalThis.ReadableStream = require('stream/web').ReadableStream;
  } catch (e) {
    console.error('[polyfill] Failed to define ReadableStream:', e);
  }
}