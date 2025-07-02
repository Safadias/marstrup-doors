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
  const decorWidth = doorWidthMM - DecorWidthCal + 3; // +3 mm som ønsket

  const today = new Date().toLocaleDateString("da-DK");
  const out = `
Dato: ${today}
Navn: ${name}
Adresse: ${address}
Email: ${email}
Ordrenummer: ${order}

Udregning af lågebredde ved ${doors} døre:
Lågebredde: ${(doorWidthMM / 10).toFixed(1)} cm

Profilstørrelse:
${doors * 2} sider med højde: ${(profileHeight / 10).toFixed(1)} cm
${doors * 2} top/bund: ${(topBottom / 10).toFixed(1)} cm
Sprøsser: ${(sprosser / 10).toFixed(1)} cm
Placering ved 1 sprøsse: ${(place1 / 10).toFixed(1)} cm
Placering ved 2 sprøsser: ${(place2 / 10).toFixed(1)} cm
Placering ved 3 sprøsser: ${(place3 / 10).toFixed(1)} cm

Fyldningsstørrelse:
Glas:
Lågehøjde: ${(glasHeight / 10).toFixed(1)} cm
Lågebredde: ${(glasWidth / 10).toFixed(1)} cm

Decor:
Lågehøjde: ${(decorHeight / 10).toFixed(1)} cm
Lågebredde: ${(decorWidth / 10).toFixed(1)} cm
  `;

  document.getElementById("output").textContent = out;
  document.getElementById("calcForm").style.display = "none";
  document.getElementById("shareBtn").style.display = "block";
  document.getElementById("backBtn").style.display = "block";
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const content = document.getElementById("output").textContent;
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 10);

  const name = document.getElementById("name").value.trim() || "MarstrupDoors";
  const pdfFileName = `${name}.pdf`;
  const blob = doc.output("blob");
  const file = new File([blob], pdfFileName, { type: "application/pdf" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "Marstrup Doors Beregning",
        text: "Her er PDF-beregningen.",
        files: [file]
      });
    } catch (err) {
      alert("Deling blev annulleret.");
    }
  } else {
    // fallback: download PDF hvis deling ikke understøttes
    doc.save(pdfFileName);
    alert("Deling understøttes ikke på denne enhed. PDF'en blev i stedet gemt.");
  }
}

function goBack() {
  document.getElementById("calcForm").style.display = "block";
  document.getElementById("output").textContent = "";
  document.getElementById("shareBtn").style.display = "none";
  document.getElementById("backBtn").style.display = "none";
}
