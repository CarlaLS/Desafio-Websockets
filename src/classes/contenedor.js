const fs = require('fs')

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo
  }

  async getAll() {
    try {
      const todosItems = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      return todosItems
    } catch (error) {
      await fs.promises.writeFile(`src/database/${this.archivo}.json`, JSON.stringify([]), 'utf-8')

      const todosItems = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )
      return todosItems
    }
  }
  async getById(id) {
    try {
      const todosItems = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      const encontrarItem = todosItems.find((e) => e.id === Number(id))

      return encontrarItem
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async add(objeto) {
    try {
      const todosItems = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      todosItems.push(objeto)

      await fs.promises.writeFile(
        `src/database/${this.archivo}.json`,
        JSON.stringify(todosItems),
        'utf-8'
      )
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async editById(objeto) {
    try {
      let todosItems = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      todosItems = todosItems.map((e) => (e.id !== objeto.id ? e : objeto))

      await fs.promises.writeFile(
        `src/database/${this.archivo}.json`,
        JSON.stringify(todosItems),
        'utf-8'
      )
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async deleteById(id) {
    try {
      const todosItems = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      const filtrarItemLista = todosItems.filter((e) => e.id !== Number(id))

      if (JSON.stringify(todosItems) === JSON.stringify(filtrarItemLista)) {
        return false
      } else {
        await fs.promises.writeFile(
          `src/database/${this.archivo}.json`,
          JSON.stringify(filtrarItemLista),
          'utf-8'
        )

        return true
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

}

module.exports = Contenedor
