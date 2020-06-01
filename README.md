# ⏰ Skedula

Easily ([`node-cron`](https://www.npmjs.com/package/node-cron)-based) schedule interval-based processes in Node.js!

### Why use Skedula over `setInterval`?

> Skedula uses `node-cron` in the backend to schedule tasks when a CRON expression ticks, rather than waiting to execute a function using system time. This improves program efficiency greatly.

## ⬇ Installation

If you're using `npm`:
```
npm install skedula
```

Or, if you're using `yarn`:
```
yarn add skedula
```

## 💥 Usage

In JavaScript:
```
const { Skedula } = require('skedula')

// Log every second
const scheduledTask = Skedula.secondInterval(() => {
    console.log('This should log every second.')
}, 1)

// Stop in 5 seconds
setTimeout(() => { scheduledTask.stop() }, 5000)
```

In TypeScript:
```
import { Skedula } from 'skedula'

// Log every second
const scheduledTask = Skedula.secondInterval(() => {
    console.log('This should log every second.')
}, 1)

// Stop in 5 seconds
setTimeout(() => { scheduledTask.stop() }, 5000)
```

## Documentation

### Skedula Functions

#### `secondInterval` (returns `void`)

> Run a function every n seconds.

- `callback` (`(..args:any[])=>void`) The function to call.
- `every` (`number`) The interval, in seconds.
- `...args` (`any[]?`) The arguments to pass into the function.

#### `minuteInterval` (returns `void`)

> Run a function every n minutes.

- `callback` (`(..args:any[])=>void`) The function to call.
- `every` (`number`) The interval, in minutes.
- `...args` (`any[]?`) The arguments to pass into the function.

#### `hourInterval` (returns `void`)

> Run a function every n hours.

- `callback` (`(..args:any[])=>void`) The function to call.
- `every` (`number`) The interval, in hours.
- `...args` (`any[]?`) The arguments to pass into the function.

#### `dailyInterval` (returns `void`)
Run a function every n days.

- `callback` (`(..args:any[])=>void`) The function to call.
- `every` (`number`) The interval, in days.
- `...args` (`any[]?`) The arguments to pass into the function.

`schedule`
> Schedule a function called precisely at a certain time, range, or interval.
- `callback` (`(..args:any[])=>void`) The function to call.
- `args` (`any[]`, default `[]`) The arguments to pass into the function.
- `dayOfWeek` (`DayOfWeek` or `Interval<Range<DayOfWeek> or DayOfWeek or SkedulaWildcard>` or `Range<DayOfWeek>` or `SkedulaWildcard`, default `*`) The day of the week to call the function. Leave undefined or null for every day of the week.
- `month` (`Month` or `Interval<Range<Month> or Month or SkedulaWildcard>` or `Range<Month>` or `SkedulaWildcard`, default `*`) The month to call the function. Leave undefined or null for every month of the year.
- `day` (`Day` or `Interval<Range<Day> or Day or SkedulaWildcard>` or `Range<Day>` or `SkedulaWildcard`, default `*`) The day of the month to call the function. Leave undefined or null for every day of the month.
- `hour` (`Hour` or `Interval<Range<Hour> or Hour or SkedulaWildcard>` or `Range<Hour>` or `SkedulaWildcard`, default `*`) The hour of the day to call the function. Leave undefined or null for every hour of the day.
- `minute` (`Minute` or `Interval<Range<Minute> or Minute or SkedulaWildcard>` or `Range<Minute>` or `SkedulaWildcard`, default `*`) The minute of the hour to call the function. Leave undefined or null for every minute of every hour.
- `second` (`Second` or `Interval<Range<Second> or Second or SkedulaWildcard>` or `Range<Second>` or `SkedulaWildcard`, default `*`) The second of the minute to call the function. Leave undefined or null for every second of every minute.

### Skedula Objects

#### `DayOfMonth`
```
export type DayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
```

#### `DayOfWeek`
```
export enum DayOfWeek {
	SUNDAY = 0,
	MONDAY = 1,
	TUESDAY = 2,
	WEDNESDAY = 3,
	THURSDAY = 4,
	FRIDAY = 5,
	SATURDAY = 6,
}
```

#### `Month`
```
export enum Month {
	JANUARY = 0,
	FEBRUARY = 1,
	MARCH = 2,
	APRIL = 3,
	MAY = 4,
	JUNE = 5,
	JULY = 6,
	AUGUST = 7,
	SEPTEMBER = 8,
	OCTOBER = 9,
	NOVEMBER = 10,
	DECEMBER = 11,
}
```

#### `SkedulaWildcard`

`type SkedulaWildcard = '*'`

## Author

Anthony Krivonos ([Portfolio](https://anthonykrivonos.com/) | [LinkedIn](https://linkedin.com/in/anthonykrivonos))