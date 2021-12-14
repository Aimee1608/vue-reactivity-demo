class Vue {
  constructor(options) {
    // 存放options
    this.$options = options || {}
    // 获取根元素
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 存放data数据
    this.$data = options.data || {}
    this.$methods = options.methods || {}
    // 将data数据代理到当前实例上
    this._proxyData(this.$data)
    // 将methods代理到当前实例上
    this._proxyData(this.$methods)
    // 3. 调用observer对象，监听数据的变化
    new Observer(this.$data)
    // 4. 调用compiler对象，解析指令和差值表达式
    new Compiler(this)
  }
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(value) {
          if (data[key] === value) return
          data[key] = value
        }
      })
    })
  }
}