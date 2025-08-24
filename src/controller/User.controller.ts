// Get top 5 users (fastest submitters)
export async function getTopUsers() {
	// If you have a createdAt field, order by it. Otherwise, fallback to id (cuid is time sortable)
	const users = await prisma.user.findMany({
		orderBy: { id: "asc" },
		take: 5,
		select: { id: true, name: true, branch: true },
	});
	return users;
}
import { prisma } from "@/lib/prisma";