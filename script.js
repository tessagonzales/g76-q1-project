$(document).ready(() => {

  let enterForm = $('#enter-form')
  let frontpageLink = $('#front-page')
  let formList = $('#formList').hide()
  let tipButton = $('#tips').hide()
  let fetchLink = $('#get-fetch')

  let login = $('#login-form') //\\\\\\\\\\\\\\
  let breachInfo = $('#breachInfo').hide() //\\\\\\\\
  let loginButton = $('#submit') //\\\\\\\\\\\\\

  // start page
  enterForm.click((e) => {
    e.preventDefault()
    $('#welcome-note').fadeOut();
    formList.fadeIn(1000).show();
    tipButton.fadeIn(1000).show();
    $("#background").fadeTo("slow", .7);

    login.fadeOut('slow').hide() //|||||||||||
    breachInfo.show() //\\\\\\\\\\\\
    loginButton.fadeOut('slow').hide() //\\\\\\\\\\\\\

  }) // END OF enterFrom EVENT










  // BUTTON & LINKS
  frontpageLink.click(() => {
    location.replace('./index.html')
  })

  tipButton.click(() => {
    location.replace('./homepage.html')
  })


  //////// DOM SORRY ////////////
  // All BREACHES LIST
  fetchLink.click(() => {
    $('.col.one').hide()
    $('.col.two').hide()
    $('.col.three').hide()
    $('.col.five').hide()

    $('#fetch').append(`<p><a href= "homepage.html">&#8592; Back to Home Page</a></p><BR><BR>`)

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


  // EMAIL BREACH
  let ourEmailForm = document.forms.emailBreach
  let newEmailBreach = document.getElementById('new-email-breach')

  ourEmailForm.emailbutton.addEventListener('click', function(e) {
    event.preventDefault()
    let userInput = emailBreach.newemail.value
    console.log(userInput)

    fetch(`https://haveibeenpwned.com/api/v2/pasteaccount/${userInput}`)
      .then(response => response.json())
      .then(account => {
        console.log('accounts: ', account)

          document.getElementById('breachInfo').innerHTML = `
               <p style='color:red; font-size:30px; text-align:center'>The email ${userInput} has been previosly exposed. If you are using this account direct yourself <a href='homepage.html'> HERE </a> for tips.</p>`

      }) //end of fetch

    .catch ( (err) => {
      //console.log("err: ", err)
      document.getElementById('breachInfo').innerHTML = `<p style='text-align:center'>No results.</p>`
    })

    ourEmailForm.reset()
  }) //end of event listener


  // WEBSITE BREACH
  let ourWebsiteForm = document.forms.websiteBreach
  let newWebsiteBreach = document.getElementById('new-website-breach')

  ourWebsiteForm.websitebutton.addEventListener('click', function(e) {
    event.preventDefault()
    let userInput = websiteBreach.newwebsite.value
    userInput = userInput.replace(/\s/g, '')
    console.log(userInput);

    fetch(`https://haveibeenpwned.com/api/v2/breach/${userInput}`)
      .then(response => response.json())
      .then(breaches => {
        console.log('breaches: ', breaches);

        document.getElementById('breachInfo').innerHTML =
          `<p style='font-size:16px'>${breaches.Title} - ${breaches.Domain}<br><br>
              Date of breach: ${breaches.BreachDate}<br><BR>
              ${breaches.Description} </p>`

      }) // end of fetch()

    .catch ( (err) => {
        //console.log("err: ", err)
      document.getElementById('breachInfo').innerHTML = `<p style='text-align:center'>No results.</p>`
    })

    ourWebsiteForm.reset()
  }) // end of addEventListener


  // USERNAME/PASSWORD LOGIN
  let userLoginForm = document.forms.userLoginForm
  userLoginForm.onsubmit = function(e) {
    e.preventDefault()
    usernameInput = userLoginForm.newlogin.value
    passwordInput = userLoginForm.newpassword.value

    let username = document.getElementById('username')
    let password = document.getElementById('password')

    let allUserInput = {
      username: username.value,
      password: password.value
    }

    fetch('http://localhost:3001/login')
      .then(response => response.json())
      .then(users => {
        //console.log(users)
        let userInfo = users.filter(
        user =>
          user.username === allUserInput.username &&
          user.password === allUserInput.password)

          if (userInfo.length === 1) {
        localStorage.setItem('user', JSON.stringify(userInfo[0]))
        window.location = '/dash.html'
      } else {
        alert('Username "' + allUserInput.username + '" and/or password is not valid.')
      }
    }) // end of fetch
  } // end of event listener


}) //end of jQuery
//console.log('end program')
