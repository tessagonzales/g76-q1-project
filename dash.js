$(document).ready(() => {

  //welcome message
  welcomeMessage = $('#welcome-message').hide()
  welcomeMessage.fadeIn()
  welcomeMessage.append(`<h1 style="text-align:center">Welcome back!</h1>`)


  //NEW EMAIL FORM
  let enterEmailForm = document.forms.enterEmailForm


  enterEmailForm.onsubmit = (e) => {
    e.preventDefault()
    let userInput = enterEmailForm.newemail.value
    document.getElementById('your-emails').innerHTML += `
    ${userInput} `
    enterEmailForm.reset()

    fetch(`https://haveibeenpwned.com/api/v2/pasteaccount/${userInput}`)
      .then(response => response.json())
      .then(account => {
        console.log('account: ', account)
        document.getElementById('your-emails').innerHTML += `
        <img src='images/warning.png' height="20" width="20"> - <small>(Source: ${account[0].Source})</small><BR>`

        localStorage.setItem(account, JSON.stringify(userInput))
      }) // end of fetch

    .catch ( (err) => {
      document.getElementById('your-emails').innerHTML += `
      <img src='images/checkmark.png' height="20" width="20"><BR>`
    })
  }//end of onsubmit






}) // end of jQuery
