<h2> Simple and Practical Persian DatePicker!📆 </h2>
<img src="https://i.ibb.co/xgmhw06/Designer-79.jpg" width="300px" alt="">
</br>
# Persian Calendar Package

A comprehensive and user-friendly Persian calendar package for web applications. This package allows easy integration of a Persian (Jalali) calendar into your projects, providing functionality for date selection, navigation between months and years, and custom styling.

## Features

- Display current month and year in Persian.
- Navigate between months and years.
- Select dates with visual highlights for the current day and holidays.
- Customizable day titles (full names or abbreviations).
- Easy integration with minimal setup.
- Fully responsive design.

## Installation

### Using DatePicker

First import CSS File (style):

```html
<link rel="stylesheet" href="./style/persiandatepicker.css">

```

Second import JS File (scripts):

```html
<script src="./script/jalali-moment.js"></script>
<script src="./script/persiandatepicker.js"></script>

```

Second import JS File (scripts):

```html
<script src="./script/jalali-moment.js"></script>
<script src="./script/persiandatepicker.js"></script>

```

Create input tag for calender:

```html
<input type="text" placeholder="انتخاب تاریخ">

```

set unique (id) attribute for input:

```html
<input type="text" id="firstCalendar" placeholder="انتخاب تاریخ">

```

now Start Calender with call newCalendar() function and submit unique id attribute:

```html
<script>
    newCalendar('MyDatePicker')
</script>

```

### Using npm

You can install the package via npm:

```bash
npm install persian-calendar-package
```

Then, import the package in your JavaScript file:

```javascript
import 'persian-calendar-package/dist/persian-calendar.css';
import PersianCalendar from 'persian-calendar-package';
```

## Usage

### Basic Example

Add a container for the calendar in your HTML:

```html
<div id="calendar-container"></div>
```

Initialize the calendar in your JavaScript:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');
    const options = {
        dayTitleFull: true // Use full day names (optional)
    };
    new PersianCalendar(calendarContainer, options);
});
```

### Options

You can customize the calendar using the following options:

- `dayTitleFull`: (boolean) Display full names for day titles. Default is `false`.

### Methods

The PersianCalendar class provides several methods for interaction:

- `nextMonth()`: Navigate to the next month.
- `prevMonth()`: Navigate to the previous month.
- `setYear(year)`: Set the calendar to a specific year.
- `setMonth(month)`: Set the calendar to a specific month.
- `getSelectedDate()`: Get the currently selected date.

### Example with Methods

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');
    const calendar = new PersianCalendar(calendarContainer);

    // Navigate to the next month
    document.getElementById('next-month-btn').addEventListener('click', function() {
        calendar.nextMonth();
    });

    // Navigate to the previous month
    document.getElementById('prev-month-btn').addEventListener('click', function() {
        calendar.prevMonth();
    });

    // Set a specific year and month
    calendar.setYear(1400);
    calendar.setMonth(5);

    // Get the currently selected date
    console.log(calendar.getSelectedDate());
});
```

## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue on GitHub. You can also fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License.

---

For detailed documentation, please visit our [GitHub repository](https://github.com/your-repo/persian-calendar-package).

---

Enjoy using the Persian Calendar Package! If you have any questions or need support, feel free to contact us.