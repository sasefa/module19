import { openDB } from "idb";

let db;

const initdb = async () => {
  if (!db) {
    db = await openDB("jate", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("jate")) {
          db.createObjectStore("jate");
          console.log("jate database created");
        }
      },
    });
  }
  return db;
};

window.addEventListener("blur", async () => {
  const editor = document.getElementById("editor");
  if (editor) await putDb(editor.value);
  console.log("data saved on blur");
});

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction("jate", "readwrite");
  tx.store.put(content, "content");
  await tx.done;
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction("jate", "readonly");
  const content = await tx.store.get("content");
  return content;
};

initdb();
