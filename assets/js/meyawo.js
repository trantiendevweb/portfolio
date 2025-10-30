/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com
=========================================================
*/

// ====== SMOOTH SCROLL ======
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        { scrollTop: $(hash).offset().top },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// ====== NAVBAR TOGGLE ======
$("#nav-toggle").click(function () {
  $(this).toggleClass("is-active");
  $("ul.nav").toggleClass("show");
});

// ====== SLOGAN TYPEWRITER ======
const SLOGANS = [
  "LẬP TRÌNH VIÊN FRONTEND",
  "SEO GOOGLE",
];

// Tốc độ & nhịp (ms)
const SPEED_TYPE_MIN = 22,
  SPEED_TYPE_MAX = 48; // gõ
const SPEED_DEL_MIN = 14,
  SPEED_DEL_MAX = 32; // xoá
const HOLD_AFTER_TYPE = 1200; // dừng sau khi gõ xong
const HOLD_AFTER_DEL = 280; // dừng sau khi xoá xong

// Phần tử subtitle và cài đặt
const el = document.getElementById("subtitle");
const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Delay & random helper
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// Bảo đảm subtitle có text node đứng trước caret
function ensureTextNode() {
  const caret = el.querySelector(".caret");
  if (!caret) return;
  if (!el.firstChild || el.firstChild.nodeType !== 3) {
    el.insertBefore(document.createTextNode(""), caret);
  }
}

// Gõ chữ
async function typeText(text) {
  ensureTextNode();
  const node = el.firstChild;
  if (!node) return;
  for (let i = 0; i < text.length; i++) {
    node.textContent += text[i];
    await sleep(rand(SPEED_TYPE_MIN, SPEED_TYPE_MAX));
  }
}

// Xoá chữ
async function eraseText() {
  const node = el.firstChild;
  if (!node || node.nodeType !== 3) return;
  while (node.textContent.length) {
    node.textContent = node.textContent.slice(0, -1);
    await sleep(rand(SPEED_DEL_MIN, SPEED_DEL_MAX));
  }
}

// Vòng lặp chính
async function loop() {
  ensureTextNode();
  let i = 0;
  while (true) {
    const t = SLOGANS[i % SLOGANS.length];
    await typeText(t);
    await sleep(HOLD_AFTER_TYPE);
    await eraseText();
    await sleep(HOLD_AFTER_DEL);
    i++;
  }
}

// Khởi động khi DOM sẵn sàng
window.addEventListener("DOMContentLoaded", () => {
  if (!el) return;
  if (!prefersReduce) {
    if ("requestIdleCallback" in window) requestIdleCallback(loop);
    else setTimeout(loop, 200);
  } else {
    el.textContent = SLOGANS[0];
  }
});
