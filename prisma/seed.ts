import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      Task: {
        create: [
          {
            title: 'Complete Task 1',
            state: 'TODO',
            description: 'Task 1 description',
            subtasks: {
              create: [
                { name: 'Subtask 1', state: 'TODO' },
                { name: 'Subtask 2', state: 'TODO' }
              ]
            }
          }
        ]
      }
    }
  })

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Doe',
      Task: {
        create: [
          {
            title: 'Complete Task 2',
            state: 'DOING',
            description: 'Task 2 description',
            subtasks: {
              create: [
                { name: 'Subtask 1', state: 'TODO' }
              ]
            }
          }
        ]
      }
    }
  })

  console.log({ user1, user2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
