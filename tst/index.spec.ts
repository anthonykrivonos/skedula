import { assert } from 'chai'

import { Skedula } from '../src'

/**
 * Basic tests
 */

const scheduledTask = Skedula.secondInterval(() => {
    console.log('This should log every second.')
}, 1)

setTimeout(() => {
    scheduledTask.stop()
}, 5000)