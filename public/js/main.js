const socket = io()

$(function () {
  socket.on('socketConectado', () => {
    socket.emit('listaProductos')
    socket.emit('chatMensajes')
  })

  //----------* PRODUCT LIST SECTION *----------//
  const productForm = $('#productForm')
  const productContainer = $('#productContainer')

  productForm.submit((event) => {
    event.preventDefault()

    const nuevoProducto = {
      title: productForm[0][0].value,
      price: productForm[0][1].value,
      thumbnail: productForm[0][2].value,
    }

    socket.emit('addNuevoProducto', nuevoProducto)
    productForm.trigger('reset')
  })

  socket.on('updateListaProductos', listaProductosHandler)

  async function listaProductosHandler(todosProductos) {
    const plantillaProducto = await fetch('layouts/vistaProductos.hbs')
    const layoutTexto = await plantillaProducto.text()
    const compileTemplate = Handlebars.compile(layoutTexto)
    const html = compileTemplate({ todosProductos })
    productContainer.empty().append(html)
  }

  // CHAT 
  const chatForm = $('#chatForm')
  const chatContainer = $('#chatContainer')

  chatForm.submit((e) => {
    e.preventDefault()

    const nuevoMensaje = {
      email: chatForm[0][0].value,
      messageText: chatForm[0][1].value,
    }

    socket.emit('addNuevoMensaje', nuevoMensaje)
    chatForm.trigger('reset')
  })

  socket.on('updateChat', chatHandler)

  async function chatHandler(todosMensajes) {
    const plantillaChat = await fetch('layouts/salaChat.hbs')
    const layoutTexto = await plantillaChat.text()
    const compileTemplate = Handlebars.compile(layoutTexto)
    const html = compileTemplate({todosMensajes })
    chatContainer.empty().append(html)
  }
})

