import { prisma } from '../src/lib/prisma'

async function seed(){
  await prisma.event.create({
    data: {
      id: '82747c2d-53e4-41a5-9ed2-ae0cc45e39d0',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120,
    }
  })
}

seed().then(() => {
  console.log("Database seeded!")
  prisma.$disconnect()
})