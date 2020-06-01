import { schedule as scheduleTask, ScheduledTask, validate as validateTask } from 'node-cron'

import { DayOfMonth, DayOfWeek, Hour, Interval, Minute, Month, Range, Second } from './interfaces'
import { Condition } from './Condition'

/**
 * Function that can be run in the scheduler.
 */
type SkedulaFunction = (...args:any[]) => void

/**
 * Schedule the task every ___________. i.e. 'every minute'
 */
type SkedulaWildcard = '*'

/**
 * Schedule market actions ahead of time.
 */
export class Skedula {
	public static WILDCARD: SkedulaWildcard = '*'

	/**
	 * Run a function on a second-by-second basis.
	 * @param callback The function to call.
	 * @param every The interval, in seconds.
	 * @param args The arguments to pass into the function.
	 */
	public static secondInterval(callback: SkedulaFunction, every: number, ...args:any[]): ScheduledTask {
		return this.schedule(callback, args, null, null, null, null, null, new Interval(Skedula.WILDCARD, every))
	}

	/**
	 * Run a function in a minutely interval.
	 * @param callback The function to call.
	 * @param every The interval, in minutes.
	 * @param args The arguments to pass into the function.
	 */
	public static minuteInterval(callback: SkedulaFunction, every: number, ...args:any[]): ScheduledTask {
		return this.schedule(callback, args, null, null, null, null, new Interval(Skedula.WILDCARD, every))
	}

	/**
	 * Run a function in an hourly interval.
	 * @param callback The function to call.
	 * @param every The interval, in hours.
	 * @param args The arguments to pass into the function.
	 */
	public static hourInterval(callback: SkedulaFunction, every: number, ...args:any[]): ScheduledTask {
		return this.schedule(callback, args, null, null, null, new Interval(Skedula.WILDCARD, every))
	}

	/**
	 * Run a function on a daily basis.
	 * @param callback The function to call.
	 * @param every The interval, in number of days.
	 * @param args The arguments to pass into the function.
	 */
	public static dailyInterval(callback: SkedulaFunction, every: number, ...args:any[]): ScheduledTask {
		return this.schedule(callback, args, null, null, new Interval(Skedula.WILDCARD, every), null, null)
	}

	/**
	 * Schedule a function called precisely at a certain time, range, or interval.
	 * @param callback The function to call.
	 * @param args The arguments to pass into the function.
	 * @param dayOfWeek The day of the week to call the function. Leave undefined or null for every day of the week.
	 * @param month The month to call the function. Leave undefined or null for every month of the year.
	 * @param day The day of the month to call the function. Leave undefined or null for every day of the month.
	 * @param hour The hour of the day to call the function. Leave undefined or null for every hour of the day.
	 * @param minute The minute of the hour to call the function. Leave undefined or null for every minute of every hour.
	 * @param second The second of the minute to call the function. Leave undefined or null for every second of every minute.
	 */
	public static schedule(
		callback: SkedulaFunction,
		args:any[] = [],
		dayOfWeek:
			| DayOfWeek
			| Interval<Range<DayOfWeek> | DayOfWeek | SkedulaWildcard>
			| Range<DayOfWeek>
			| SkedulaWildcard
			| null = Skedula.WILDCARD,
		month:
			| Month
			| Interval<Range<Month> | Month | SkedulaWildcard>
			| Range<Month>
			| SkedulaWildcard
			| null = Skedula.WILDCARD,
		day:
			| DayOfMonth
			| Interval<Range<DayOfMonth> | DayOfMonth | SkedulaWildcard>
			| Range<DayOfMonth>
			| SkedulaWildcard
			| null = Skedula.WILDCARD,
		hour:
			| Hour
			| Interval<Range<Hour> | Hour | SkedulaWildcard>
			| Range<Hour>
			| SkedulaWildcard
			| null = Skedula.WILDCARD,
		minute:
			| Minute
			| Interval<Range<Minute> | Minute | SkedulaWildcard>
			| Range<Minute>
			| SkedulaWildcard
			| null = Skedula.WILDCARD,
		second?: Second | Interval<Range<Second> | Second | SkedulaWildcard> | Range<Second> | SkedulaWildcard | null,
	): ScheduledTask {
		let cronExpression = ''
		if (second !== undefined) {
			cronExpression += `${second} `
		}
		cronExpression += `${Condition.null(minute) ? Skedula.WILDCARD : minute} `
		cronExpression += `${Condition.null(hour) ? Skedula.WILDCARD : hour} `
		cronExpression += `${Condition.null(day) ? Skedula.WILDCARD : day} `
		cronExpression += `${Condition.null(month) ? Skedula.WILDCARD : month} `
		cronExpression += `${Condition.null(dayOfWeek) ? Skedula.WILDCARD : dayOfWeek}` // <-- No extra space here
		this.validate(cronExpression)
		return this.perform(callback, cronExpression, args)
	}

	/**
	 * Validate a CRON expression.
	 * @param cronExpression The CRON expression to validate.
	 */
	private static validate(cronExpression: string): void {
		const isExpressionValid = validateTask(cronExpression)
		if (!isExpressionValid) {
			throw new Error(`Invalid CRON expression: '${cronExpression}'`)
		}
	}

	/**
	 * Schedule a valid CRON expression.
	 * @param callback The function to call.
	 * @param cronExpression The CRON expression to perform.
	 */
	private static perform(callback: SkedulaFunction, cronExpression: string, args:any[]): ScheduledTask {
		return scheduleTask(cronExpression, () => callback(args))
	}
}
