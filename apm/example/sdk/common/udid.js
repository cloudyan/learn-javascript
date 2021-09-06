
function genUdid(len) {
  let udidValue = ''
  try {
    udidValue = localStorage.getItem('udid') || {}
  } catch (err) {
    udidValue = ''
  }
  return () => {
    if (typeof udidValue === 'string' && udidValue.length === len) return udidValue
    const udid = uuid(len)
    udidValue = udid
    try {
      localStorage.setItem('udid', udidValue)
    } catch (err) {

    }
    return udidValue
  }
}

export default genUdid(32)

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export const randomString =
  '_~getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ';

export function random(size) {
  const result = [];
  while (0 < size--) {
    result.push(Math.floor(Math.random() * 256));
  }
  return result;
}

// crypto.randomUUID() chrome92 支持，参见 https://www.chromestatus.com/features/schedule
export function uuid(size = 21) {
  const url = randomString;
  let id = '';
  let bytes = [];
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    bytes = crypto.getRandomValues(new Uint8Array(size));
    // console.warn(':::uuid crypto:', bytes.join(','));
  } else {
    bytes = random(size);
    // console.warn(':::uuid random:', bytes.join(','));
  }
  while (0 < size--) {
    id += url[bytes[size] & 63];
  }
  return id;
}

export function randomRange(under, over) {
  switch(arguments.length) {
    case 1: return parseInt(Math.random()*under+1);
    case 2: return parseInt(Math.random()*(over-under+1) + under);
    default: return 0;
  }
}
