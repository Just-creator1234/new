// app/api/upload/route.js
import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");
  if (!file) return new Response("No file", { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}-${file.name}`;
  const dir = join(process.cwd(), "public/uploads");
  const path = join(dir, filename);

  +(await mkdir(dir, { recursive: true })); // ensures the folder exists
  await writeFile(path, buffer);

  return Response.json({ url: `/uploads/${filename}` });
}
