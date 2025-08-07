export async function bytesToBase64DataUrl(
  bytes: Uint8Array,
  type = "application/octet-stream"
): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Unexpected result type"));
        }
      },
      onerror: () => reject(reader.error),
    });
    reader.readAsDataURL(new File([bytes as any], "", { type }));
  });
}

export async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl);
  return new Uint8Array(await res.arrayBuffer());
}
