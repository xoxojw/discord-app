import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerIdPageProps {
	params: {
		serverId: string;
	}
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
	const profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	const server = await db.server.findUnique({
		where: {
			id: params.serverId,
			members: {
				some: {
					profileId: profile.id,
				}
			}
		},
		include: {
			channels: {
				where: {
					name: "일반"
				},
				orderBy: {
					createdAt: "asc"
				}
			}
		}
	})

	const initialChannel = server?.channels[0];

	if (initialChannel?.name !== "일반") {
		return null;
	}

	return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
