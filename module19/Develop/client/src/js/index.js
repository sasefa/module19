import { getDb, putDb } from "./database";

window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/src-sw.js");
      const sw = registration.installing || registration.waiting || registration.active;
      if (sw) {
        sw.addEventListener('statechange', e => {
          if (e.target.state === 'activated') {
            console.log('Service Worker activated');
          }
        });
      }
    } catch (e) {
      console.log(`Service worker registration failed with ${e}`);
    }
  }
  
  const editor = document.getElementById("editor");
  const savedData = await getDb();

  if (savedData) {
    editor.value = savedData;
  }

  editor.addEventListener("input", () => putDb(editor.value));
});
