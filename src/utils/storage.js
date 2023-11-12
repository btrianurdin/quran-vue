const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

const update = (key, cb) => {
  try {
    const checkKey = get(key)

    if (!checkKey) {
      set(key, cb(null))
      return
    }
    const value = cb(get(key))
    set(key, value)
  } catch (error) {
    console.error(error)
  }
}

const get = (key) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    console.error(error)
  }
}

const remove = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}

const clear = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error(error)
  }
}

export default {
  set,
  update,
  get,
  remove,
  clear
}
