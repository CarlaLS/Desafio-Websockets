//----------* REQUIRE'S *----------//
const Contenedor = require('../classes/contenedor')
const mensajesDB = new Contenedor('mensajes')

//----------* PRODUCTS ROUTES *----------//
const controllerMensajes = {
  getAllMensajes: async () => {
    try {
      const todosMensajes = await mensajesDB.getAll()
      return todosMensajes
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  addNuevoMensaje: async (mensaje) => {
    try {
      const previMensajes = await mensajesDB.getAll()
      const currentDate = new Date().toLocaleString()

      const getNuevoId = () => {
        let ultimoID = 0
        if (previMensajes.length) {
          ultimoID = previMensajes[previMensajes.length - 1].id
        }
        return ultimoID + 1
      }

      const nuevoMensaje = {
        id: getNuevoId(),
        email: mensaje.email ? mensaje.email : 'user@email.com',
        date: currentDate,
        messageText: mensaje.messageText ? mensaje.messageText : '(Mensaje Vacio)',
      }

      await mensajesDB.add(nuevoMensaje)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
}


module.exports = controllerMensajes
