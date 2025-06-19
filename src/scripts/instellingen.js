import { db } from "./firebase";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  setDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";

// Helpers
function parseTijdNaarMinuten(tijd) {
  const [uur, minuut] = tijd.split(":").map(Number);
  return uur * 60 + minuut;
}

function genereerTijdstippen(startMin, eindMin, pauzeStartMin, pauzeEindMin, datum) {
  const tijden = [];

  for (let min = startMin; min < eindMin; min += 10) {
    if (min >= pauzeStartMin && min < pauzeEindMin) continue;

    const uur = Math.floor(min / 60);
    const minuut = min % 60;

    const tijd = new Date(datum);
    tijd.setHours(uur, minuut, 0, 0);
    tijden.push(tijd);
  }

  return tijden;
}

async function synchroniseerGesprekkenVoorBedrijf(bedrijfId, startMin, eindMin, pauzeStartMin, pauzeEindMin, datum) {
  const gesprekkenRef = collection(db, "user", bedrijfId, "gesprekken");
  const snapshot = await getDocs(gesprekkenRef);

  // 🧹 Verwijder alles
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, "user", bedrijfId, "gesprekken", docSnap.id));
    console.log("🗑️ Verwijderd:", docSnap.id);
  }

  const tijdstippen = genereerTijdstippen(startMin, eindMin, pauzeStartMin, pauzeEindMin, datum);

  for (const tijd of tijdstippen) {
    const ref = doc(gesprekkenRef);
    const gesprekId = ref.id;

    await setDoc(ref, {
      gesprekId,
      tijd: Timestamp.fromDate(tijd),
      beschikbaar: true,
      userId: ""
    });

    console.log("Toegevoegd:", tijd.toLocaleString(), "voor", bedrijfId);
  }
}

async function synchroniseerVoorAlleBedrijven(startMin, eindMin, pauzeStartMin, pauzeEindMin, datum) {
  const bedrijvenSnapshot = await getDocs(
    query(collection(db, "user"), where("role", "==", "bedrijf"))
  );

  for (const bedrijf of bedrijvenSnapshot.docs) {
    const bedrijfId = bedrijf.id;
    console.log("🔄 Verwerken:", bedrijfId);
    await synchroniseerGesprekkenVoorBedrijf(
      bedrijfId,
      startMin,
      eindMin,
      pauzeStartMin,
      pauzeEindMin,
      datum
    );
  }
}

console.log("Script geladen!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM geladen");

  const form = document.getElementById("tijdForm");
  if (!form) {
    console.error("Formulier niet gevonden");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const starttijd = document.getElementById("starttijd").value;
    const eindtijd = document.getElementById("eindtijd").value;
    const startpauze = document.getElementById("startpauze").value;
    const eindpauze = document.getElementById("eindpauze").value;
    const datumInput = document.getElementById("datum").value;

    if (!starttijd || !eindtijd || !startpauze || !eindpauze || !datumInput) {
      alert("Vul alle velden in.");
      return;
    }

    const startMin = parseTijdNaarMinuten(starttijd);
    const eindMin = parseTijdNaarMinuten(eindtijd);
    const pauzeStartMin = parseTijdNaarMinuten(startpauze);
    const pauzeEindMin = parseTijdNaarMinuten(eindpauze);
    const gekozenDatum = new Date(datumInput);

    console.log("Tijdvenster:", starttijd, "-", eindtijd);
    console.log("Pauze:", startpauze, "-", eindpauze);
    console.log("Datum:", gekozenDatum.toDateString());

    await synchroniseerVoorAlleBedrijven(startMin, eindMin, pauzeStartMin, pauzeEindMin, gekozenDatum);

    alert("✅ Gesprekken aangemaakt met exacte minuten!");
  });
});


document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'keuzeMenu.html'; 
   });   