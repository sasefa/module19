const butInstall = document.querySelector('#install-button'); //replace butInstall with the actual button element

let installPrompt;


// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  installPrompt = event;
});

butInstall.addEventListener('click', () => {
  if (installPrompt) {
    installPrompt.prompt();

    installPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        installPrompt = null;
      }
    });
  }
});

window.addEventListener('appinstalled', () => {
  console.log('App is installed!');
});
