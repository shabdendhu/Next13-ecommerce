import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/connection";
import FileModel from "@/models/fileModal";
// Connect to MongoDB
connect();

// Define your POST handler
export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    // Create the uploads directory in the specified parent folder
    const parentFolder = process.env.FILE_UPLOAD_LOCATION;
    await mkdir(`${parentFolder}/uploads`, { recursive: true });

    // Write the file to the uploads directory
    const path = `${parentFolder}/uploads/${file.name}`;
    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    // Save file information to MongoDB using Mongoose
    const fileData = new FileModel({
      name: file.name,
      path: path,
      size: file.size,
      mimetype: file.type,
    });
    const data = await fileData.save();

    return NextResponse.json({
      data,
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Error uploading file",
    });
  }
}

import fs from "fs";
import path from "path";

function streamFile(path, options) {
  const downloadStream = fs.createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk) =>
        controller.enqueue(new Uint8Array(chunk))
      );
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (error) => controller.error(error));
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}

export async function GET(req) {
  const fileId = req.nextUrl.searchParams.get("id");

  if (!fileId) {
    return NextResponse.json({
      success: false,
      message: "File ID is required",
    });
  }

  const file = await FileModel.findById(fileId);

  if (!file) {
    return NextResponse.json({ success: false, message: "File not found" });
  }
  const fileStream = streamFile(file.path);

  const stats = await fs.promises.stat(file.path);

  const response = new NextResponse(fileStream, {
    status: 200,
    headers: {
      "content-disposition": `attachment; filename=${path.basename(file.path)}`,
      "content-type": file.mimetype,
      "content-length": stats.size.toString(),
    },
  });

  return response;
}

export async function DELETE(req) {
  const fileId = req.nextUrl.searchParams.get("id");

  if (!fileId) {
    return NextResponse.json({
      success: false,
      message: "File ID is required",
    });
  }

  try {
    // Find the file in MongoDB
    const file = await FileModel.findById(fileId);

    if (!file) {
      return NextResponse.json({ success: false, message: "File not found" });
    }

    // Delete the file from the file system
    fs.unlinkSync(file.path);

    // Delete the file record from MongoDB
    await FileModel.findByIdAndDelete(fileId);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Error deleting file",
    });
  }
}
