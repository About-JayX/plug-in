export const ObservableArray = (onChange?: (newArray: any[]) => void) => {
  const observableMethods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
  ]
  const arr: Array<any> = []
  return new Proxy(arr, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver)
      if (observableMethods.includes(prop as string)) {
        return (...args: any[]) => {
          const result = value.apply(target, args)
          onChange?.([...target])
          return result
        }
      }

      return value
    },
    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver)
      if (!isNaN(Number(prop))) {
        onChange?.([...target])
      }
      return result
    },
  })
}
