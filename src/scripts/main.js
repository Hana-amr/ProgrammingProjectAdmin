import { renderAccountBeherenHome } from './accountBeherenHome'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn-account-beheren');
  if (btn) {
    btn.addEventListener('click', () => {
      renderAccountBeherenHome();
    });
  }
});

import { renderAccountAanmakenHome } from './AccountAanmakenHome'

document.addEventListener('DOMContentLoaded', () => {
  const btnAanmaken = document.getElementById('btn-account-aanmaken');
   if(btnAanmaken){
    btnAanmaken.addEventListener('click', () => {
      renderAccountAanmakenHome();
    } );
  }
  });

 document.getElementById('btn-logout').addEventListener('click', () => {
    window.location.href = 'Login.html'; 
   });

   // src/main.js
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Dit draait in de browser, je ziet het resultaat in F12 > Console
async function testFirestore() {
  try {
    const docRef = await addDoc(collection(db, "testCollectie"), {
      naam: "Browser Gebruiker",
      tijd: new Date().toISOString()
    });
    console.log("✅ Document toegevoegd met ID:", docRef.id);

    const querySnapshot = await getDocs(collection(db, "testCollectie"));
    console.log("📋 Documenten in testCollectie:");
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (err) {
   
  }
}

testFirestore();
