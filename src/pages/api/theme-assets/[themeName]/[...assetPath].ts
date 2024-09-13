import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { themeName, assetPath } = req.query;

  if (
    !themeName ||
    typeof themeName !== "string" ||
    !Array.isArray(assetPath)
  ) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const themesDir = path.join(process.cwd(), "src", "themes");
  const themePath = path.join(themesDir, themeName);

  try {
    const fullAssetPath = path.join(themePath, ...assetPath);

    // Read the file
    const fileBuffer = await fs.readFile(fullAssetPath);

    // Determine MIME type
    const ext = path.extname(fullAssetPath).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".css": "text/css",
      ".js": "application/javascript",
    };

    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    // Send the file
    res.send(fileBuffer);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      res.status(404).json({ error: "Asset not found" });
    } else {
      console.error("Error serving theme asset:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
