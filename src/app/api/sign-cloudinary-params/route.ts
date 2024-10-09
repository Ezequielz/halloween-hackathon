import {type NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json(
      {
        signature,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Error del servidor inesperado",
        },
        { status: 500 }
      );
    }
  }
}
