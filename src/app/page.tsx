
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Home() {
 const data = await prisma.users.findMany()
 console.log(data);
 
  return (
    <div>

    </div>
  );
}
