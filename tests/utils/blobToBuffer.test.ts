// tests/utils/blobToBuffer.test.ts
import { blobToBuffer } from "@/app/admin/actions/services";

describe("blobToBuffer", () => {
  it("should convert a Blob to a Buffer", async () => {
    const data = "Test data";
    const blob = new Blob([data], { type: "text/plain" });
    const buffer = await blobToBuffer(blob);
    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.toString()).toBe(data);
  });
});
