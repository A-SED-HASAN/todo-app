export const getLocalStorage = () => {
  let list = localStorage.getItem('list')

  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}
export const getLocalStorageDone = () => {
  let doneList = localStorage.getItem('doneList')

  if (doneList) {
    return JSON.parse(localStorage.getItem('doneList'))
  } else {
    return []
  }
}
export const showTime = (id) => {
  const whenCreated = new Date(Number(id))
  const formalTime = `${whenCreated.getHours()} : ${whenCreated.getMinutes()} : ${whenCreated.getSeconds()} `
  return formalTime
}
export const msToTime = (s) => {
  var pad = (n, z = 2) => ('00' + n).slice(-z)
  return (
    pad((s / 3.6e6) | 0) +
    ':' +
    pad(((s % 3.6e6) / 6e4) | 0) +
    ':' +
    pad(((s % 6e4) / 1000) | 0)
  )
}
