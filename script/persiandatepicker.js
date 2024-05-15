// Constants for day names
const daysNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const daysFullNames = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

// SVG arrows
const arrowSVG = (dir, color, rotate) => `
<svg class="calendar-arrow ${dir}MonthBtn" fill="${color}" style="${rotate}" height="20px" width="20px" viewBox="0 0 330 330" xmlns="http://www.w3.org/2000/svg">
<path class="${dir}MonthBtn" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213
l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330
s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z"/>
</svg>`;
const rightArrow = arrowSVG('prev', '#000000');
const rightArrowDark = arrowSVG('prev', '#ffffff');
const leftArrow = arrowSVG('next', '#000000', 'rotate: 180deg');
const leftArrowDark = arrowSVG('next', '#ffffff', 'rotate: 180deg;');

let myLeftArrow = leftArrow
let myRightArrow = rightArrow

// options
let dayTitleFull = false
let primaryColor   = "#3498db"
let darkMode     = false
let closeCalendar= true

function newCalendar(id, option = {isFullTitleDay:dayTitleFull, theme: primaryColor, darkMode: darkMode, closeCalendar: closeCalendar}){
    if(Array.isArray(id)) id.forEach((item)=>{
        createCalender(item, option)
    })
    else createCalender(id, option)
}

function createCalender(id, option){
    let m = moment();
    m.locale('fa');
    setOption(option)
    const element = document.getElementById(id);
    const newDiv = `<div id="${id}Div" class="hidden"></div>`;
    element.insertAdjacentHTML('afterend', newDiv);

    element.value = m.format('YYYY/MM/DD')

    const thisMonth = m.format('M');
    let   thisDay = m.format('D');

    document.addEventListener("DOMContentLoaded", function() {
        const calendarContainer = document.getElementById((id+"Div"));

        renderCalendar(m, thisDay, thisMonth, element, id);

        element.addEventListener("focus", function() {
            calendarContainer.classList.remove("hidden");
        });
    });
}

function renderCalendar(m, thisDay, thisMonth, element, id) {
    let calendarContainer = document.querySelector(`#${id}Div`);

    const currentYear = m.format('YYYY');
    const currentMonth = m.format('M');
    const currentMonthLabel = m.format('MMMM');
    const daysInMonth = m.daysInMonth();
    const firstDayOfMonth = getWeekDay(m.startOf('month').format('dddd'));
    let   currentDay = thisDay
    let   savedDay = thisDay
    let   savedMonth = thisMonth

    renderStyle(primaryColor, id, darkMode)

    if(currentMonth != thisMonth) currentDay = 0

    // click on day

    calendarContainer.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("calendar-day")) {
            const allCalendarDays = document.querySelectorAll(".calendar-day");
            allCalendarDays.forEach(day => {
                day.classList.remove("selected");
            });

            target.classList.add("selected");
            element.value = `${currentYear}/${currentMonth}/${target.innerHTML}`
            currentDay = target.innerHTML
            savedDay   = currentDay
            savedMonth = currentMonth
            if(closeCalendar) calendarContainer.classList.add("hidden");
        } else if(target.classList.contains("calendar-btn")){
            calendarContainer.classList.add("hidden");
        }
    });


    // Build the calendar HTML
    let calendarHTML = `<div class="calendar-header">`;

// Add previous month button
    calendarHTML += `<button class="calendar-arrow prevMonthBtn" style="float: right;">${myRightArrow}</button>`;

// Display current month and year
    calendarHTML += `<span id="change-year-month">${currentMonthLabel} ${currentYear}</span>`;

// Add next month button
    calendarHTML += `<button class="calendar-arrow nextMonthBtn" style="float: left;">${myLeftArrow}</button>`;
    calendarHTML += `</div>`;

// Add month change options
    calendarHTML += `<div class="calendar-change-body hidden">
    <div class="calendar-month-change" id="month-1">فروردین</div>
    <div class="calendar-month-change" id="month-2">اردیبهشت</div>
    <div class="calendar-month-change" id="month-3">خرداد</div>
    <div class="calendar-month-change" id="month-4">تیر</div>
    <div class="calendar-month-change" id="month-5">مرداد</div>
    <div class="calendar-month-change" id="month-6">شهریور</div>
    <div class="calendar-month-change" id="month-7">مهر</div>
    <div class="calendar-month-change" id="month-8">آبان</div>
    <div class="calendar-month-change" id="month-9">آذر</div>
    <div class="calendar-month-change" id="month-10">دی</div>
    <div class="calendar-month-change" id="month-11">بهمن</div>
    <div class="calendar-month-change" id="month-12">اسفند</div>
</div>`;

// Add year change options
    calendarHTML += `<div class="calendar-change-body-year hidden">
    <div class="year-input-parent">
        <div class="inputs">
            <button class="calendar-btn-controlyear increase-year">+</button>
            <input type="text" value="${currentYear}" onkeypress='validate(event)' class="year-input">
            <button class="calendar-btn-controlyear decrease-year">-</button>
        </div>
    </div>
    <div class="finish-calendar-change">
        <span class="calendar-btn-apply">اعمال</span>
    </div>
</div>`;

// Start calendar body
    calendarHTML += `<div class="calendar-body">`;

// Add day titles (full or abbreviated)
    if (dayTitleFull) {
        daysFullNames.forEach(day => calendarHTML += `<div class="day-title day-full-title">${day}</div>`);
    } else {
        daysNames.forEach(day => calendarHTML += `<div class="day-title">${day}</div>`);
    }

// Add empty divs for days before the first day of the month
    for (let i = 1; i < firstDayOfMonth; i++) {
        calendarHTML += `<div class="calendar-hide"></div>`;
    }

// Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        if (currentDay == i) {
            calendarHTML += `<div class="calendar-day selected">${i}</div>`;
        } else if (getWeekDay(moment(`${currentYear}/${currentMonth}/${i}`, 'jYYYY/jMM/jDD').locale('fa').format('dddd')) == 7) {
            calendarHTML += `<div class="calendar-day holiday">${i}</div>`;
        } else {
            calendarHTML += `<div class="calendar-day">${i}</div>`;
        }
    }
    calendarHTML += `</div>`;

// Add calendar footer with close button
    calendarHTML += '<div class="calendar-footer">';
    calendarHTML += `<span class="calendar-btn" style="float: left">بستن</span>`;
    calendarHTML += `</div>`;

// Set the inner HTML of the calendar container
    calendarContainer.innerHTML = calendarHTML;


    let prevMonthBtn = document.querySelector(`#${id}Div .prevMonthBtn`);
    let nextMonthBtn = document.querySelector(`#${id}Div .nextMonthBtn`);
    let changeYearMonth = document.querySelector(`#${id}Div #change-year-month`);

    prevMonthBtn.addEventListener('click', function(event) {
        m = m.subtract(1, 'month');
        renderCalendar(m, savedDay, savedMonth, element, id);
    })
    nextMonthBtn.addEventListener('click', function(event) {
        m = m.add(1, 'month');
        renderCalendar(m, savedDay, savedMonth, element, id);
    })
    changeYearMonth.addEventListener('click', function (event) {
        let target = event.target
        document.querySelector(`#${id}Div .calendar-body`).classList.add('hidden')
        document.querySelector(`#${id}Div .calendar-change-body`).classList.remove('hidden')
    })

    let changecalendarMonth  = currentMonth
    let changecalendarYear  = currentYear
    document.querySelector(`#${id}Div .calendar-change-body`).addEventListener('click', function(event){
        let target = event.target
        if(target.id){
            let target_id = (target.id).substring(6)
            if(target_id >=1 && target_id <= 12){
                changecalendarMonth = target_id
                document.querySelector(`#${id}Div .calendar-change-body-year`).classList.remove('hidden')
                document.querySelector(`#${id}Div .calendar-change-body`).classList.add('hidden')
            }
        }
    })

    document.querySelector(`#${id}Div .calendar-btn-apply`).addEventListener('click', function(event){
        changecalendarYear = document.querySelector(`#${id}Div .year-input`).value
        let newDateFormat = `${changecalendarYear}/${changecalendarMonth}/${currentDay || 1}`
        element.value = newDateFormat
        calendarContainer.classList.add("hidden");
        m  = moment(newDateFormat, 'jYYYY/jM/jD').locale('fa');
        renderCalendar(m, currentDay, changecalendarMonth, element, id);
    })

    // increase and decrease Year input value
    let input_year = document.querySelector(`#${id}Div .year-input`)

    document.querySelector(`#${id}Div .increase-year`).addEventListener('click', function (event){
        input_year.value = (parseInt(input_year.value) + 1)
    })
    document.querySelector(`#${id}Div .decrease-year`).addEventListener('click', function (event){
        input_year.value = (parseInt(input_year.value) - 1)
    })
}

function renderStyle(color, id, darkMode){
    console.log(color)
    const style = document.createElement('style');
    style.innerHTML = `
    #${id}Div {
        width: 350px;
        border-radius: 15px;
        border: 1px solid rgba(77, 87, 169, 0.08);
        background: rgb(252, 252, 255);
        padding: 16px;
        position: absolute;
    }
    
    @media only screen and (max-width: 800px) {
        #${id}Div {
        max-width: 340px;
        }
      }

    .today, .selected {
        background-color: ${color};
        color: #ffffff;
    }

    .calendar-btn, .calendar-btn-controlyear, .calendar-btn-apply {
        background-color: ${color};
        color: #ffffff;
        padding: 6px 9px;
        border-radius: 5px;
    }
`;

    if(darkMode){
        style.innerHTML += `
         #${id}Div {
            background: rgb(17 24 39);
        }
        .calendar-day, .calendar-month-change{
            background:  rgb(36 42 56);
            color: #ffffff;
            border-color: #444;
        }
        .holiday{
            color: rgb(255, 63, 63);
        }
        .calendar-header, .day-title{
            color: #fff;
        }
        
        .today, .selected {
            background-color: ${color};
            color: #ffffff;
        }
        .year-input{
            background:  rgb(36 42 56);
            color: #ffffff;
            border-color: #444;
        }
    `;
        myRightArrow = rightArrowDark
        myLeftArrow  = leftArrowDark
    }

    document.head.appendChild(style);
}

function getWeekDay(day) {
    for (i = 0; i < daysFullNames.length; i++) {
        if (daysFullNames[i] == day) return i + 1;
    }
    return false;
}
function setOption(options){
    dayTitleFull = options.isFullTitleDay || dayTitleFull
    primaryColor = options.theme || primaryColor
    darkMode     = options.darkMode || darkMode
    closeCalendar= options.closeCalendar || closeCalendar
}

function validate(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;

        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}