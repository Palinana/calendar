const db = require('../CalendarBackEnd/db')
const Event = require('../CalendarBackEnd/db/models/event')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    Event.create({
        startTime: "2018-06-05T20:00:00.000Z",
        endTime: "2018-06-06T00:00:00.000Z",
        description: 'Practice algorithms',
        date: "2018-06-12T04:00:00.000Z",}),  
    ])

 
  console.log(`seeded successfully`)
}
// Execute the `seed` function

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })


console.log('seeding...')