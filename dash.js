$(document).ready(() => {
  welcomeMessage = $('#welcome-message').hide()
  console.log(welcomeMessage)

welcomeMessage.fadeIn()
welcomeMessage.append(`<h1 style="text-align:center">Welcome back!</h1>`)


}) // end of jQuery
