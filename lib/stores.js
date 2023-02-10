const appName = 'fit-reads'

function _serialize(obj) {
  return JSON.stringify(obj)
}

function _deserialize(str, defaultVal = '') {
  if (!str) return defaultVal
  let val = ''
  try {
    val = JSON.parse(str)
  } catch (e) {
    val = str
  }
  return val || defaultVal
}

export function setLocal(key, value) {
  if (value != undefined) {
    localStorage.setItem(`${appName}:${key}`, _serialize(value))
    // console.log(`存储成功！值为${getLocal(key)}`)
  }
}

export function getLocal(key) {
  return _deserialize(localStorage.getItem(`${appName}:${key}`))
}

export function removeLocal(key) {
  return localStorage.removeItem(`${appName}:${key}`)
}

export function setSession(key, value) {
  if (value != undefined) {
    sessionStorage.setItem(`${appName}:${key}`, _serialize(value))
  }
}

export function getSession(key) {
  return _deserialize(sessionStorage.getItem(`${appName}:${key}`))
}

function readAll(key) {
  return getLocal(key) || getSession(key)
}

const stores = {
  setLocal,
  getLocal,
  removeLocal,
  setSession,
  getSession,
  get: readAll
}

export default stores
