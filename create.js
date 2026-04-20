function generateInvitation() {
  const bride = encodeURIComponent(document.getElementById("bride").value);
  const groom = encodeURIComponent(document.getElementById("groom").value);
  const date = encodeURIComponent(document.getElementById("date").value);
  const venue = encodeURIComponent(document.getElementById("venue").value);
  const map = encodeURIComponent(document.getElementById("map").value);
  const time = encodeURIComponent(document.getElementById("time").value);

  if (!bride || !groom || !date || !venue || !map) {
    alert("Please fill all details");
    return;
  }

  const baseUrl =
    window.location.origin +
    window.location.pathname.replace("create.html", "invite.html");

  const inviteUrl =
  `${baseUrl}?bride=${bride}&groom=${groom}&date=${date}&time=${time}&venue=${venue}&map=${map}`;

  const output = document.getElementById("output");

  output.innerHTML = `
    <p><strong>Invitation Link</strong></p>
    <a href="${inviteUrl}" target="_blank">${inviteUrl}</a>
    <div id="qrcode" style="margin-top:20px;"></div>
  `;

  // ✅ QR CODE CREATION
  new QRCode(document.getElementById("qrcode"), {
    text: inviteUrl,
    width: 200,
    height: 200,
    colorDark: "#1f5c4a",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}
