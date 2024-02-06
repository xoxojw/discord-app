import shortid from "shortid";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
        // server.profileId가 admin의 profile.id이므로 추가 검증할 필요 없음
      },
      data: {
        inviteCode: shortid.generate(),
      },
    });    
    return NextResponse.json(server);

  } catch (error) {
    console.error("[SERVER_ID]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}