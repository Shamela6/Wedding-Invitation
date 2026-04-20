const params = new URLSearchParams(window.location.search);

const bride = params.get("bride");
const groom = params.get("groom");
const dateStr = params.get("date");
const venue = params.get("venue");
const map = params.get("map");

const inviteScreen = document.getElementById("inviteScreen");
const venueScreen = document.getElementById("venueScreen");
const timeText = params.get("time");

function formatDateDDMMYYYY(dateStr) {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

if (!bride || !groom || !dateStr) {
  inviteScreen.innerHTML = "<h2>Invalid Invitation</h2>";
} else {
  const nikahDate = new Date(dateStr);

  const hijri = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(nikahDate);

  inviteScreen.innerHTML = `
    <div class="moon"></div>
   <div class="bismillah">
  <span class="moon-inline left"></span>
  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
</div>

    <p>With the blessings of Allah (SWT),<br>
    we request your gracious presence at the Nikah of</p>

    <div class="names">${bride}</div>
    <p>and</p>
    <div class="names">${groom}</div>

    <div class="divider"></div>

    <p>
    <strong>
    ${formatDateDDMMYYYY(dateStr)}
    ${timeText ? ` | ${decodeURIComponent(timeText)}` : ""}
    </strong>
    </p>
    <p>${hijri}</p>

    <div class="countdown" id="countdown"></div>

    <button class="attend" onclick="openVenue()">In Sha Allah, I Will Attend</button>
    <button class="not-attend" onclick="cantAttend()">Unable to Attend</button>
  `;

  startCountdown(nikahDate);
}

function startCountdown(target) {
  setInterval(() => {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById("countdown").innerHTML = "Today is the blessed day 🤍";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerHTML = `
      <div class="time-box"><span>${d}</span><small>Days</small></div>
      <div class="time-box"><span>${h}</span><small>Hours</small></div>
      <div class="time-box"><span>${m}</span><small>Minutes</small></div>
      <div class="time-box"><span>${s}</span><small>Seconds</small></div>
    `;
  }, 1000);
}

function openVenue() {
  inviteScreen.classList.add("hidden");
  venueScreen.classList.remove("hidden");

  venueScreen.innerHTML = `
    <div class="bismillah">📍 Venue Details</div>

    <p>${venue}</p>

    <a href="${map}" target="_blank">
      <button class="attend">Open Google Maps</button>
    </a>

    <button class="not-attend" onclick="goBack()">← Back to Invitation</button>
  `;
}

function goBack() {
  venueScreen.classList.add("hidden");
  inviteScreen.classList.remove("hidden");
}

function cantAttend() {
  inviteScreen.innerHTML = `
    <h3>جزاك الله خيرًا</h3>
    <p>Your duas are deeply appreciated❤️</p>
  `;
}