const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRandomQuote = async () => {
    const count = await prisma.quote.count();
    const random = Math.floor(Math.random() * count);
    return prisma.quote.findFirst({ skip: random });
};

const getAllQuotes = async () => {
    return prisma.quote.findMany();
};

module.exports = { getRandomQuote, getAllQuotes };
