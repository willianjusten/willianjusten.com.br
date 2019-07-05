export const unique = (val, index, self) => {
  return self.indexOf(val) === index
}

export const checkLocalStorage = fn => {
  if (typeof localStorage !== `undefined`) {
    fn()
  }
}
