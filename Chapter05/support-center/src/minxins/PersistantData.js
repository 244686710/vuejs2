// 备份用户数据
/**
 * @param {id参数是存储此特定组件数据的唯一标识符} id
 * @param {数据} fields
 */
export default function (id, fields) {
  // TODO
  return {
    watch: fields.reduce((obj, field) => {
      obj[field] = function (val) {
        localStorage.setItem(`${id}.${field}`, JSON.stringify(val))
      }
      return obj
    }, {}),
    methods: {
      saveAllPersistantData () {
        for (const field of fields) {
          localStorage.setItem(`${id}.${field}`, JSON.stringify(this.$data[field]))
        }
      }
    },
    beforeDestroy () {
      this.saveAllPersistantData()
    },
    created () {
      for (const field of fields) {
        const savedValue = localStorage.getItem(`${id}.${field}`)
        if (savedValue !== null) {
          this.$data[field] = JSON.parse(savedValue)
        }
      }
    }
  }
}
