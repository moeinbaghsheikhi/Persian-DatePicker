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


## Usage

### Basic Example

Create input tag for Calendar:

```html
<input type="text" placeholder="انتخاب تاریخ">

```

set unique (id) attribute for input:

```html
<input type="text" id="MyDatePicker" placeholder="انتخاب تاریخ">

```

now Start Calendar with call newCalendar() function and submit unique id attribute:

```html
<script>
    newCalendar('MyDatePicker')
</script>

```

---


### Options

You can send options parameters to newCalendar for settings and changes in the calendar:

- `dayTitleFull`: (boolean) Display full names for day titles. Default is `false`.
- `theme`: (string) Send a color or hex code. Default is `#3498db`.
- `darkMode`: (boolean) set dark mode Calendar. Default is `false`.
- `closeCalendar`: (boolean) Closing the calendar after clicking on the day. Default is `true`.

### How send Options?

This is an example of using newCalendar() by sending options

```html
<script>
newCalendar('MyDatePicker',{
    isFullTitleDay: true,
    darkMode: true,
    theme: "#86ac22",
    closeCalendar: false
})
</script>
```

### How dark Mode calendar
```html
<script>
newCalendar('MyDatePicker',{
    darkMode: true
})
</script>
```

---

### How use newCalendar() For Multi Tag?
```html
<script>
newCalendar(['MyDatePicker', 'MyDatePicker2'],{
    darkMode: true
})
</script>
```

## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue on GitHub. You can also fork the repository and submit a pull request with your improvements.

## License

---

For detailed documentation, please visit our [GitHub repository](https://github.com/moeinbaghsheikhi/Persian-DatePicker).

---

Enjoy using the Persian Calendar Package! If you have any questions or need support, feel free to contact us.
(Telegram) @moeinbaghsheikhi
(Email)    moein.baghsheikhi@gmail.com