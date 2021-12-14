// 负责数据劫持
// 把 $data 中的成员转换成 getter/setter
class Observer {
  constructor(data) {
    this.walk(data)
  }
  // 1. 判断数据是否是对象，如果不是对象返回
  // 2. 如果是对象，遍历对象的所有属性，设置为 getter/setter
  walk(data) {
    if (!data || typeof data != Object) return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    let dep = new Dep()
    this.walk(value)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSubs(Dep.target)
        return value
      },
      set: (newValue) => {
        if (value === newValue) {
          return
        }
        value = newValue
        // 如果 newValue 是对象，设置 newValue 的成员为响应式
        this.walk(newValue)
        dep.notify()
      }
    })
  }
}