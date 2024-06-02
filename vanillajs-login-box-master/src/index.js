import {initialize} from "@frontegg/js"

const style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.innerHTML = '';
document.getElementsByTagName('head')[0].appendChild(style);


const app = initialize({
  contextOptions: {
    baseUrl: "https://app-exe5lt2aqec6.frontegg.com", //set your Frontegg environment domain and client ID here
    clientId: 'cf73797e-148d-49d7-a661-c122a3d44dc0'
  },
  hostedLoginBox: true //if you are working in embedded mode remove this one
})


document.querySelector('[fe-action="open-admin-portal"]').addEventListener('click', () => {
  app.showAdminPortal()
})

document.getElementById("loginWithRedirect").addEventListener('click', () => {
  app.loginWithRedirect()
})

document.getElementById("logout").addEventListener('click', () => {
  app.logout()
})

app.store.subscribe(() => {
  const state = app.store.getState();
  if (state.auth.user) {
    document.getElementById('user-container').innerText = state.auth.user.email;
  } else {
    document.getElementById('user-container').innerText = 'Not Authenticated'
  }

  document.getElementById('app-root').style.display = state.auth.isLoading ? 'hidden' : 'block'


  let styleHtml = ''
  if (state.auth.isAuthenticated) {
    styleHtml += '[fe-state="isAuthenticated"] { }';
    styleHtml += '[fe-state="!isAuthenticated"] { display: none; }';
  } else {
    styleHtml += '[fe-state="isAuthenticated"] { display: none; }';
    styleHtml += '[fe-state="!isAuthenticated"] { }';
  }

  if(app.options.hostedLoginBox){
    styleHtml += '[fe-mode="hosted"] { }';
    styleHtml += '[fe-mode="embedded"] { display: none; }';
  } else {
    styleHtml += '[fe-mode="hosted"] { display: none; }';
    styleHtml += '[fe-mode="embedded"] { }';
  }

  style.innerHTML = styleHtml;
})

