// tests/actions/uploadImageToS3.test.ts
jest.mock("@aws-sdk/lib-storage", () => {
    return {
      Upload: class {
        client: any;
        params: any;
        constructor(params: any) {
          this.params = params;
        }
        async done() {
          return true;
        }
      },
    };
  });
  
  import { uploadImageToS3, S3Folder } from "@/app/admin/actions/uploadImageToS3";
  
  describe("uploadImageToS3", () => {
    it("should return a valid key after upload", async () => {
      const file = new File(["dummy content"], "test.png", { type: "image/png" });
      process.env.AWS_S3_BUCKET_NAME = "dummy-bucket";
      const key = await uploadImageToS3(file, S3Folder.SERVICES);
      expect(key).toMatch(new RegExp(`^services/.*\\.png$`));
    });
  });
  