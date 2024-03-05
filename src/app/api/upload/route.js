import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // Create the uploads directory in the specified parent folder
    const parentFolder = "/home/lap044";
    await mkdir(`${parentFolder}/uploads`, { recursive: true });

    // Write the file to the uploads directory
    const path = `${parentFolder}/uploads/${file.name}`;
    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false });
  }
}
