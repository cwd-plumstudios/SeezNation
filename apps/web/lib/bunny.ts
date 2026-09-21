import crypto from "crypto";

export function generateBunnySignedUrl(
  filePath: string,
  type: "stream" | "download" = "stream",
  expirySeconds = 1800,
): string {
  const cdnHost = process.env.BUNNY_CDN_HOSTNAME!; // seeznation.b-cdn.net
  const secret = process.env.BUNNY_TOKEN_SECRET!;
  const expiry = Math.floor(Date.now() / 1000) + expirySeconds;
  const urlPath = `/${filePath}`;

  // Bunny token = base64( MD5( secret + urlPath + expiry ) )
  const token = crypto
    .createHash("md5")
    .update(secret + urlPath + expiry)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const params = new URLSearchParams({
    token,
    expires: String(expiry),
    ...(type === "download" && {
      "response-content-disposition": `attachment; filename="${filePath.split("/").pop()}"`,
    }),
  });

  return `https://${cdnHost}${urlPath}?${params}`;
}
