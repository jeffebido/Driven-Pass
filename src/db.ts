import client from '@prisma/client'

const { PrismaClient } = client

const prisma = new PrismaClient()

export default prisma