const checkbox = document.getElementById("toggle");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    document.body.style.background = "black"; // الوضع الداكن
    document.body.style.color = "white"; // نخلي النص واضح
    document.type.style.color = "rgb(5, 9, 206)"
  } else {
    document.body.style.background = "rgb(5, 9, 206)"; // الوضع الفاتح
    document.body.style.color = "black";
    
  }
});



var time = new Date()
var hours = time.getHours()
let timed = (hours >= 5 && hours < 17) ? document.getElementById("type").textContent = "أذكار الصباح": document.getElementById("type").textContent = "أذكار المساء";


document.addEventListener("DOMContentLoaded", () => {
  const url = "https://raw.githubusercontent.com/abdo2009xxxxz-afk/-/refs/heads/main/%D8%A7%D9%84%D8%A7%D8%B0%D9%83%D8%A7%D8%B1.json";

  let allData = [];

  // جلب البيانات مرة واحدة
  fetch(url)
    .then(response => response.json())
    .then(data => {
      allData = Array.isArray(data) ? data : [];
      updateDuas(); // عرض الأذكار أول مرة
      // تحديث الأذكار كل 10 دقائق
      setInterval(updateDuas, 10 * 60 * 1000);
    })
    .catch(error => console.error("حدث خطأ:", error));

  function updateDuas() {
    const now = new Date();
    const hour = now.getHours();
    let currentTimeType = (hour >= 5 && hour < 17) ? "morning" : "evening";

    const filtered = allData.filter(item =>
      item.type === "morning_evening" || item.type === currentTimeType
    );

    const container = document.getElementById("duas");
    container.innerHTML = ""; // مسح الأذكار السابقة

    filtered.forEach(dua => {
      const div = document.createElement("div");
      div.classList.add("dua");
      div.innerHTML = `
        <div style="color: black;">${dua.text}</div>
        <div class="count">عدد المرات: ${dua.count}</div>
      `;
      container.appendChild(div);
    });
  }
});