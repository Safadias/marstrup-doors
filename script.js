
function calculate() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const order = document.getElementById("order").value;
  const height = parseFloat(document.getElementById("height").value);
  const width = parseFloat(document.getElementById("width").value);
  const doors = parseInt(document.getElementById("doors").value);

  if (isNaN(height) || isNaN(width) || isNaN(doors)) {
    alert("Udfyld venligst alle mål korrekt.");
    return;
  }

  const DoorWidthCal = 30;
  const TopAndButtomWidthCal = 44;
  const SproesserWidthCal = 48;
  const SideHeightCal = 35;
  const SproesserPlaceCal = 98;
  const GlassHeightCal = 110;
  const GlassWidthCal = 10;
  const DecorHeightCal = 121;
  const DecorWidthCal = 22;

  const widthMM = width * 10;
  const heightMM = height * 10;
  const doorSpacing = (doors - 1) * DoorWidthCal;
  const doorWidthMM = (widthMM + doorSpacing) / doors;

  const profileHeight = heightMM - SideHeightCal;
  const topBottom = doorWidthMM - TopAndButtomWidthCal;
  const sprosser = doorWidthMM - SproesserWidthCal;
  const place1 = (profileHeight - SproesserPlaceCal) / 2;
  const place2 = (profileHeight - SproesserPlaceCal) / 3;
  const place3 = (profileHeight - SproesserPlaceCal) / 4;
  const glasHeight = heightMM - GlassHeightCal;
  const glasWidth = doorWidthMM - GlassWidthCal;
  const decorHeight = heightMM - DecorHeightCal;
  const decorWidth = doorWidthMM - DecorWidthCal;

  const today = new Date().toLocaleDateString("da-DK");
  const out = `
Dato: ${today}
Navn: ${name}
Adresse: ${address}
Email: ${email}
Ordrenummer: ${order}

Udregning af lågebredde ved ${doors} døre:
Lågebredde: ${(doorWidthMM / 10).toFixed(2)} cm

Profilstørrelse:
${doors * 2} sider med højde: ${(profileHeight / 10).toFixed(2)} cm
${doors * 2} top/bund: ${(topBottom / 10).toFixed(2)} cm
Sprøsser: ${(sprosser / 10).toFixed(2)} cm
Placering ved 1 sprøsse: ${(place1 / 10).toFixed(2)} cm
Placering ved 2 sprøsser: ${(place2 / 10).toFixed(2)} cm
Placering ved 3 sprøsser: ${(place3 / 10).toFixed(2)} cm

Fyldningsstørrelse:
Glas:
Lågehøjde: ${(glasHeight / 10).toFixed(2)} cm
Lågebredde: ${(glasWidth / 10).toFixed(2)} cm

Decor:
Lågehøjde: ${(decorHeight / 10).toFixed(2)} cm
Lågebredde: ${(decorWidth / 10).toFixed(2)} cm
  `;
  document.getElementById("output").textContent = out;
  document.getElementById("calcForm").style.display = "none";
  document.getElementById("pdfBtn").style.display = "block";
  document.getElementById("backBtn").style.display = "block";
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const content = document.getElementById("output").textContent;
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 10);
  doc.save("MarstrupDoors_Beregning.pdf");
}

function goBack() {
  document.getElementById("calcForm").style.display = "block";
  document.getElementById("output").textContent = "";
  document.getElementById("pdfBtn").style.display = "none";
  document.getElementById("backBtn").style.display = "none";
}
