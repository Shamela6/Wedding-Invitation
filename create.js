function generateInvitation() {
  const bride = encodeURIComponent(document.getElementById("bride").value.trim());
  const groom = encodeURIComponent(document.getElementById("groom").value.trim());
  const date = encodeURIComponent(document.getElementById("date").value);
  const time = encodeURIComponent(document.getElementById("time").value.trim());
  const venue = encodeURIComponent(document.getElementById("venue").value.trim());
  const map = encodeURIComponent(document.getElementById("map").value.trim());

  if (!bride || !groom || !date || !venue || !map) {
    alert("Please fill all required details");
    return;
  }

  const baseUrl =
    window.location.origin +
    window.location.pathname.replace("create.html", "invite.html");

  const inviteUrl =
    `${baseUrl}?bride=${bride}&groom=${groom}&date=${date}&time=${time}&venue=${venue}&map=${map}`;

  const output = document.getElementById("output");

  // Clear previous QR
  output.innerHTML = "";

  // Show link
  const link = document.createElement("p");
  link.innerHTML = `<strong>Invitation Link</strong><br>
    <a href="${inviteUrl}" target="_blank">${inviteUrl}</a>`;
  output.appendChild(link);

  // QR container
  const qrDiv = document.createElement("div");
  qrDiv.id = "qrcode";
  qrDiv.style.marginTop = "18px";
  output.appendChild(qrDiv);

  // ✅ SAFETY CHECK
  if (typeof QRCode === "undefined") {
    alert("QR library failed to load. Please refresh the page.");
    return;
  }

  // ✅ GENERATE QR
  new QRCode(qrDiv, {
    text: inviteUrl,
    width: 200,
    height: 200,
    colorDark: "#0f2a44",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}
