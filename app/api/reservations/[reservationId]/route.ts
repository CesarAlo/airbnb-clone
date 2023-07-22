import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
};

export async function DELETE(
  request: Request,
  { params }: {params: IParams}
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId != 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [ // make sure that the only ones how can delete is the user or the listing creator (the owner of the house)
        { userId: currentUser.id },
        { listing: { userId: currentUser.id }}
      ]
    }
  });

  return NextResponse.json(reservation);
}