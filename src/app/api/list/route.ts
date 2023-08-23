import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json([
      { id: 1, value: 'test01'},
      { id: 2, value: 'test02'},
      { id: 3, value: 'test03'},
      { id: 4, value: 'test04'},
    ]);
  } catch (error) {
    console.log(error);
  }
}