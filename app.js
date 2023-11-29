window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let next = document.querySelector("#next");
  let prev = document.querySelector("#prev");

  next.addEventListener("click", nextMonth);
  prev.addEventListener("click", prevMonth);

  updateCalendar();

  // Calendar generater
  function updateCalendar() {
    const monthYearElement = document.getElementById("month-year");
    const calendarBody = document.getElementById("calendar-body");

    monthYearElement.textContent = `${getMonthName(
      currentMonth
    )} ${currentYear}`;

    // Очищаем предыдущий месяц
    while (calendarBody.firstChild) {
      calendarBody.removeChild(calendarBody.firstChild);
    }

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    // currentYear - this year
    // currentMonth + 1 - Month in js start from 0 jan, we shoud add + 1 to make it next month.
    // 0 - this thing turn month to prev last day. Like:
    // new Date(currentYear, currentMonth, 1) - november 1 day
    // new Date(currentYear, currentMonth + 1, 0) - this currentMonth + 1 shpuld make it decemner but thanks to zero it will be november 30

    let currentDate = new Date(firstDay);

    while (currentDate <= lastDay) {
      const weekRow = document.createElement("tr");

      for (let i = 0; i < 7; i++) {
        const dayCell = document.createElement("td");
        dayCell.textContent = currentDate.getDate();

        if (currentDate.getMonth() !== currentMonth) {
          dayCell.classList.add("other-month");
        }

        weekRow.appendChild(dayCell);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      calendarBody.appendChild(weekRow);
    }
  }

  // click prev button, generate calendar
  function prevMonth() {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) {
      currentYear--;
    }
    updateCalendar();
  }

  // click next button, generate calendar
  function nextMonth() {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) {
      currentYear++;
    }
    updateCalendar();
  }

  // Return MonthName
  function getMonthName(monthIndex) {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return months[monthIndex];
  }
});
