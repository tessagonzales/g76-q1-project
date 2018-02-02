$(document).ready(() => {

  //welcome message
  welcomeMessage = $('#welcome-message').hide()
  welcomeMessage.fadeIn()
  welcomeMessage.append(`<h1 style="text-align:center"><b>Welcome back!</b></h1>`)


  //NEW EMAIL FORM
  let yourEmails = document.getElementById('your-emails')

  enterEmailForm.onsubmit = (e) => {
    e.preventDefault()
    let enterEmailForm = document.forms.enterEmailForm
    let userInput = enterEmailForm.newemail.value

    fetch(`https://haveibeenpwned.com/api/v2/pasteaccount/${userInput}`)
      .then(response => response.json())
      .then(account => {
        //console.log('account: ', account)
        let allEmails = {
          emails: userInput
        }

        localStorage.setItem("allEmails", JSON.stringify(allEmails))

        $('#your-emails').append(`${userInput}`)
        document.getElementById('your-emails').innerHTML += `
        <img src='/images/warning.png' height="20" width="20"> - <small>(Source: ${account[0].Source})</small><BR>`

      }) // end of fetch

      .catch((err) => {
        let allEmails = {
          emails: userInput
        }

        localStorage.setItem("allEmails", JSON.stringify(allEmails))

        $('#your-emails').append(`${userInput}`)
        document.getElementById('your-emails').innerHTML += `
      <img src='/images/checkmark.png' height="20" width="20"><BR>`
      })

  } //end of onsubmit


  //ALL BREACHES LIST
  let fetchLink = $('#get-fetch')

  fetchLink.click(() => {
    $('#welcome-message').hide()
    $('#your-emails').hide()
    $('#enter-email').hide()

    $('#fetch').append(`<p><a href= "dash.html">&#8592; Back to User HomePage</a></p><BR><BR>`)

    fetch(`https://haveibeenpwned.com/api/v2/breaches`)
      .then(response => response.json())
      .then(breaches => {
        //console.log('breaches: ', breaches)

        for (let i = 0; i < breaches.length; i++) {
          $('#fetch').append(
            `<p>${breaches[i].Title}<BR>
             Breach date: ${breaches[i].BreachDate}<br>
             Description: ${breaches[i].Description}<BR><BR>
             </p>`)
        }

      }) //end of fetch
  }) //end of click


}) // end of jQuery
