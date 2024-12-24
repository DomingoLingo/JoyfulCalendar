let events = JSON.parse(localStorage.getItem("events")) || {};
let eventsVisible = false;

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
  displayEvents();
}

function generateCalendar(year, month) {
  const calendar = document.getElementById("calendar").getElementsByTagName("tbody")[0];
  calendar.innerHTML = "";
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode("");

      if (i === 0 && j < firstDay) {
        cell.appendChild(cellText);
      } else if (date > daysInMonth) {
        break;
      } else {
        const currentDate = new Date(year, month, date);
        currentDate.setHours(12, 0, 0, 0);
        const isoDate = currentDate.toISOString().split("T")[0];
        cellText.nodeValue = date;

        if (events[isoDate]) {
          const eventText = document.createElement("div");
          eventText.className = "event";
          eventText.textContent = events[isoDate];
          eventText.onclick = () => editEvent(isoDate);
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-button";
          deleteButton.textContent = "X";
          deleteButton.onclick = (e) => {
            e.stopPropagation();
            deleteEvent(isoDate);
          };
          eventText.appendChild(deleteButton);
          cell.appendChild(eventText);
        }

        if (currentDate.toDateString() === new Date().toDateString()) {
          cell.className = "today";
        }

        cell.appendChild(cellText);
        date++;
      }
      row.appendChild(cell);
    }
    calendar.appendChild(row);
  }
  displayEvents();
}

function addEvent() {
  const dateInput = document.getElementById("dateInput").value;
  const eventInput = document.getElementById("eventInput").value;
  if (dateInput && eventInput) {
    events[dateInput] = eventInput;
    saveEvents();
    generateCalendar(new Date().getFullYear(), new Date().getMonth());
    document.getElementById("dateInput").value = "";
    document.getElementById("eventInput").value = "";
  }
}

function editEvent(date) {
  const newEvent = prompt("Ereignis bearbeiten:", events[date]);
  if (newEvent !== null) {
    events[date] = newEvent;
    saveEvents();
    generateCalendar(new Date().getFullYear(), new Date().getMonth());
  }
}

function deleteEvent(date) {
  delete events[date];
  saveEvents();
  generateCalendar(new Date().getFullYear(), new Date().getMonth());
}

function displayEvents() {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];
  const sortedDates = Object.keys(events).sort((a, b) => new Date(b) - new Date(a));
  for (const date of sortedDates) {
    if (new Date(date) >= new Date(today)) {
      const listItem = document.createElement("li");
      listItem.textContent = `${date}: ${events[date]}`;
      eventList.appendChild(listItem);
    }
  }
}

function deleteAllEvents() {
  events = {};
  saveEvents();
  console.log("All events have been deleted.");
  generateCalendar(new Date().getFullYear(), new Date().getMonth());
}

function deletePastEvents() {
  const today = new Date().toISOString().split("T")[0];
  for (const date in events) {
    if (new Date(date) < new Date(today)) {
      delete events[date];
    }
  }
  saveEvents();
}

const translations = {
  de: {
    JoyfulCalendar: "FreudigerKalender",
    days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    addEventButton: "Ereignis hinzufügen",
    toggleEventsButton: "Termine ein-/ausblenden",
    eventInputPlaceholder: "Ereignis eingeben",
    settingsList: "Einstellungen",
    changeBackground: "Hintergrundbild ändern",
    removeBackground: "Hintergrundbild entfernen",
    "#FFFFFF": "Weiß",
    "#FF0000": "Rot",
    "#00FF00": "Grün",
    "#0000FF": "Blau",
    "#FFFF00": "Gelb",
    "#FFA500": "Orange",
    "#800080": "Lila",
  },
  en: {
    JoyfulCalendar: "JoyfulCalendar",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    addEventButton: "Add Event",
    toggleEventsButton: "Toggle Events",
    eventInputPlaceholder: "Enter event",
    settingsList: "Settings",
    changeBackground: "Change Background Image",
    removeBackground: "Remove Background Image",
    "#FFFFFF": "White",
    "#FF0000": "Red",
    "#00FF00": "Green",
    "#0000FF": "Blue",
    "#FFFF00": "Yellow",
    "#FFA500": "Orange",
    "#800080": "Purple",
  },
  fr: {
    JoyfulCalendar: "CalendrierJoyeux",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    addEventButton: "Ajouter un événement",
    toggleEventsButton: "Afficher/Cacher les événements",
    eventInputPlaceholder: "Entrez l'événement",
    settingsList: "Paramètres",
    changeBackground: "Changer l'image de fond",
    removeBackground: "Supprimer l'image de fond",
    "#FFFFFF": "Blanc",
    "#FF0000": "Rouge",
    "#00FF00": "Vert",
    "#0000FF": "Bleu",
    "#FFFF00": "Jaune",
    "#FFA500": "Orange",
    "#800080": "Violet",
  },
  es: {
    JoyfulCalendar: "CalendarioAlegre",
    days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    addEventButton: "Agregar evento",
    toggleEventsButton: "Mostrar/Ocultar eventos",
    eventInputPlaceholder: "Ingrese el evento",
    settingsList: "Configuración",
    changeBackground: "Cambiar la imagen de fondo",
    removeBackground: "Eliminar la imagen de fondo",
    "#FFFFFF": "Blanco",
    "#FF0000": "Rojo",
    "#00FF00": "Verde",
    "#0000FF": "Azul",
    "#FFFF00": "Amarillo",
    "#FFA500": "Naranja",
    "#800080": "Púrpura",
  },
  it: {
    JoyfulCalendar: "CalendarioGioioso",
    days: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    addEventButton: "Aggiungi evento",
    toggleEventsButton: "Mostra/Nascondi eventi",
    eventInputPlaceholder: "Inserisci evento",
    settingsList: "Impostazioni",
    changeBackground: "Cambia l'immagine di sfondo",
    removeBackground: "Rimuovi l'immagine di sfondo",
    "#FFFFFF": "Bianco",
    "#FF0000": "Rosso",
    "#00FF00": "Verde",
    "#0000FF": "Blu",
    "#FFFF00": "Giallo",
    "#FFA500": "Arancione",
    "#800080": "Viola",
  },
  pt: {
    JoyfulCalendar: "CalendárioAlegre",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    addEventButton: "Adicionar evento",
    toggleEventsButton: "Mostrar/Ocultar eventos",
    eventInputPlaceholder: "Digite o evento",
    settingsList: "Configurações",
    changeBackground: "Alterar imagem de fundo",
    removeBackground: "Remover imagem de fundo",
    "#FFFFFF": "Branco",
    "#FF0000": "Vermelho",
    "#00FF00": "Verde",
    "#0000FF": "Azul",
    "#FFFF00": "Amarelo",
    "#FFA500": "Laranja",
    "#800080": "Roxo",
  },
  nl: {
    JoyfulCalendar: "VrolijkeKalender",
    days: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
    addEventButton: "Evenement toevoegen",
    toggleEventsButton: "Evenementen weergeven/verbergen",
    eventInputPlaceholder: "Voer evenement in",
    settingsList: "Instellingen",
    changeBackground: "Achtergrondafbeelding wijzigen",
    removeBackground: "Achtergrondafbeelding verwijderen",
    "#FFFFFF": "Wit",
    "#FF0000": "Rood",
    "#00FF00": "Groen",
    "#0000FF": "Blauw",
    "#FFFF00": "Geel",
    "#FFA500": "Oranje",
    "#800080": "Paars",
  },
  ru: {
    JoyfulCalendar: "РадостныйКалендарь",
    days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    addEventButton: "Добавить событие",
    toggleEventsButton: "Показать/Скрыть события",
    eventInputPlaceholder: "Введите событие",
    settingsList: "Настройки",
    changeBackground: "Изменить фоновое изображение",
    removeBackground: "Удалить фоновое изображение",
    "#FFFFFF": "Белый",
    "#FF0000": "Красный",
    "#00FF00": "Зелёный",
    "#0000FF": "Синий",
    "#FFFF00": "Жёлтый",
    "#FFA500": "Оранжевый",
    "#800080": "Пурпурный",
  },
  ja: {
    JoyfulCalendar: "喜びのカレンダー",
    days: ["月", "火", "水", "木", "金", "土", "日"],
    addEventButton: "イベントを追加",
    toggleEventsButton: "イベントの表示/非表示",
    eventInputPlaceholder: "イベントを入力",
    settingsList: "設定",
    changeBackground: "背景画像を変更",
    removeBackground: "背景画像を削除",
    "#FFFFFF": "白",
    "#FF0000": "赤",
    "#00FF00": "緑",
    "#0000FF": "青",
    "#FFFF00": "黄",
    "#FFA500": "オレンジ",
    "#800080": "紫",
  },
  zh: {
    JoyfulCalendar: "欢乐的日历",
    days: ["一", "二", "三", "四", "五", "六", "日"],
    addEventButton: "添加事件",
    toggleEventsButton: "显示/隐藏事件",
    settingsList: "设置",
    changeBackground: "更改背景图像",
    removeBackground: "删除背景图像",
    "#FFFFFF": "白色",
    "#FF0000": "红色",
    "#00FF00": "绿色",
    "#0000FF": "蓝色",
    "#FFFF00": "黄色",
    "#FFA500": "橙色",
    "#800080": "紫色",
  },
  ar: {
    JoyfulCalendar: "تقويمبهجة",
    days: ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
    addEventButton: "أضف حدثا",
    toggleEventsButton: "إظهار/إخفاء الأحداث",
    eventInputPlaceholder: "أدخل الحدث",
    settingsList: "إعدادات",
    changeBackground: "تغيير صورة الخلفية",
    removeBackground: "إزالة صورة الخلفية",
    "#FFFFFF": "أبيض",
    "#FF0000": "أحمر",
    "#00FF00": "أخضر",
    "#0000FF": "أزرق",
    "#FFFF00": "أصفر",
    "#FFA500": "برتقالي",
    "#800080": "أرجواني",
  },
  ko: {
    JoyfulCalendar: "즐거운캘린더",
    days: ["월", "화", "수", "목", "금", "토", "일"],
    addEventButton: "이벤트 추가",
    toggleEventsButton: "이벤트 표시/숨기기",
    eventInputPlaceholder: "이벤트 입력",
    settingsList: "설정",
    changeBackground: "배경 이미지 변경",
    removeBackground: "배경 이미지 제거",
    "#FFFFFF": "하양",
    "#FF0000": "빨강",
    "#00FF00": "초록",
    "#0000FF": "파랑",
    "#FFFF00": "노랑",
    "#FFA500": "주황",
    "#800080": "보라",
  },
  tr: {
    JoyfulCalendar: "NeşeliTakvim",
    days: ["Pts", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"],
    addEventButton: "Etkinlik Ekle",
    toggleEventsButton: "Etkinlikleri Göster/Gizle",
    eventInputPlaceholder: "Etkinlik girin",
    settingsList: "Ayarlar",
    changeBackground: "Arka Plan Resmini Değiştir",
    removeBackground: "Arka Plan Resmini Kaldır",
    "#FFFFFF": "Beyaz",
    "#FF0000": "Kırmızı",
    "#00FF00": "Yeşil",
    "#0000FF": "Mavi",
    "#FFFF00": "Sarı",
    "#FFA500": "Turuncu",
    "#800080": "Mor",
  },
  sv: {
    JoyfulCalendar: "GlädjefylldKalender",
    days: ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"],
    addEventButton: "Lägg till händelse",
    toggleEventsButton: "Visa/dölj händelser",
    eventInputPlaceholder: "Ange händelse",
    settingsList: "Inställningar",
    changeBackground: "Byt bakgrundsbild",
    removeBackground: "Ta bort bakgrundsbild",
    "#FFFFFF": "Vit",
    "#FF0000": "Röd",
    "#00FF00": "Grön",
    "#0000FF": "Blå",
    "#FFFF00": "Gul",
    "#FFA500": "Orange",
    "#800080": "Lila",
  },
  pl: {
    JoyfulCalendar: "RadosnyKalendarz",
    days: ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"],
    addEventButton: "Dodaj wydarzenie",
    toggleEventsButton: "Pokaż/ukryj wydarzenia",
    eventInputPlaceholder: "Wpisz wydarzenie",
    settingsList: "Ustawienia",
    changeBackground: "Zmień obraz tła",
    removeBackground: "Usuń obraz tła",
    "#FFFFFF": "Biały",
    "#FF0000": "Czerwony",
    "#00FF00": "Zielony",
    "#0000FF": "Niebieski",
    "#FFFF00": "Żółty",
    "#FFA500": "Pomarańczowy",
    "#800080": "Fioletowy",
  },
};

function changeLanguage() {
  const selectedLanguage = document.getElementById("languageSelect").value;
  localStorage.setItem("language", selectedLanguage);
  const newLocal = newFunction();
  const { JoyfulCalendar, days, addEventButton, eventInputPlaceholder, settingsList, changeBackground, removeBackground } = newLocal;
  const colorSelect = document.getElementById("colorSelect");
  const options = colorSelect.options;
  const headerCells = document.querySelectorAll("#calendar thead th");
  headerCells.forEach((cell, index) => {
    cell.textContent = days[index];
    for (let i = 0; i < options.length; i++) {
      options[i].text = translations[selectedLanguage][options[i].value];
    }
  });

  document.getElementById("JoyfulCalendar").textContent = JoyfulCalendar;
  document.getElementById("addEventButton").textContent = addEventButton;
  document.getElementById("eventInput").placeholder = eventInputPlaceholder;
  document.getElementById("settingsList").textContent = settingsList;
  document.getElementById("changeBackground").textContent = changeBackground;
  document.getElementById("removeBackground").textContent = removeBackground;

  function newFunction() {
    return translations[selectedLanguage];
  }
}

let Events = JSON.parse(localStorage.getItem("events")) || {};

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
  displayEvents();
}

function generateCalendar(year, month) {
  const calendar = document.getElementById("calendar").getElementsByTagName("tbody")[0];
  calendar.innerHTML = "";
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode("");

      if (i === 0 && j < firstDay) {
        cell.appendChild(cellText);
      } else if (date > daysInMonth) {
        break;
      } else {
        const currentDate = new Date(year, month, date);
        currentDate.setHours(12, 0, 0, 0);
        const isoDate = currentDate.toISOString().split("T")[0];
        cellText.nodeValue = date;

        if (events[isoDate]) {
          const eventText = document.createElement("div");
          eventText.className = "event";
          eventText.textContent = events[isoDate].text;
          eventText.style.backgroundColor = events[isoDate].color || "#ffffff";
          eventText.onclick = () => editEvent(isoDate);
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-button";
          deleteButton.textContent = "X";
          deleteButton.onclick = (e) => {
            e.stopPropagation();
            deleteEvent(isoDate);
          };
          eventText.appendChild(deleteButton);
          cell.appendChild(eventText);
        }

        if (currentDate.toDateString() === new Date().toDateString()) {
          cell.className = "today";
        }

        cell.appendChild(cellText);
        date++;
      }
      row.appendChild(cell);
    }
    calendar.appendChild(row);
  }
  displayEvents();
}

function addEvent() {
  const dateInput = document.getElementById("dateInput").value;
  const eventInput = document.getElementById("eventInput").value;
  const colorInput = document.getElementById("colorSelect").value;
  if (dateInput && eventInput) {
    events[dateInput] = { text: eventInput, color: colorInput };
    saveEvents();
    generateCalendar(new Date().getFullYear(), new Date().getMonth());
    document.getElementById("dateInput").value = "";
    document.getElementById("eventInput").value = "";
    document.getElementById("colorSelect").value = "#000000";
  }
}

function editEvent(date) {
  const newEvent = prompt("Ereignis bearbeiten:", events[date].text);
  if (newEvent !== null) {
    events[date].text = newEvent;
    saveEvents();
    generateCalendar(new Date().getFullYear(), new Date().getMonth());
  }
}

function deleteEvent(date) {
  delete events[date];
  saveEvents();
  generateCalendar(new Date().getFullYear(), new Date().getMonth());
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language") || "en";
  document.getElementById("languageSelect").value = savedLanguage;
  changeLanguage();
  deletePastEvents();
  generateCalendar(new Date().getFullYear(), new Date().getMonth());
});

document.getElementById("imageUpload").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const background = document.getElementById("background");
      background.style.backgroundImage = `url(${e.target.result})`;

      localStorage.setItem("backgroundImage", e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

function changeBackgroundImage() {
  const fileInput = document.getElementById("imageUpload");
  fileInput.click();
}

function loadBackgroundImage() {
  const savedImage = localStorage.getItem("backgroundImage");
  if (savedImage) {
    const background = document.getElementById("background");
    background.style.backgroundImage = `url(${savedImage})`;
  }
}

window.onload = loadBackgroundImage;

function clearBackgroundImage() {
  localStorage.removeItem("backgroundImage");
  const background = document.getElementById("background");
  background.style.backgroundImage = "none";
  background.style.backgroundColor = "white";
}
function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
