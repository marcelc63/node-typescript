import KoaRouter from "koa-router";
import Busboy from "busboy";
import { v2 } from "cloudinary";
import { Statuses } from "validata-koa";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "~/config";

// Based on: https://stackoverflow.com/questions/59295384/multiple-file-upload-to-s3-with-node-js-busboy

v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const parseForm = async (req: any) => {
  return new Promise((resolve, reject) => {
    const form = new Busboy({ headers: req.headers });
    const files: any = []; // create an empty array to hold the processed files
    const buffers: any = {}; // create an empty object to contain the buffers
    form.on(
      "file",
      (field: any, file: any, filename: any, enc: any, mime: any) => {
        buffers[field] = []; // add a new key to the buffers object
        file.on("data", (data: any) => {
          buffers[field].push(data);
        });
        file.on("end", () => {
          files.push({
            fileBuffer: Buffer.concat(buffers[field]),
            fileType: mime,
            fileName: filename,
            fileEnc: enc,
          });
        });
      }
    );
    form.on("error", (err: any) => {
      reject(err);
    });
    form.on("finish", () => {
      resolve(files);
    });
    req.pipe(form); // pipe the request to the form handler
  });
};

function uploadToCloudinary(image: any) {
  return new Promise((resolve, reject) => {
    v2.uploader.upload(image, { folder: "supplier_database" }, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
}

const callback = async (ctx: any) => {
  try {
    const files: any = await parseForm(ctx.req);
    const fileUrls: any = [];
    for (const file of files) {
      const { fileBuffer, ...fileParams } = file;
      //       console.log(fileBuffer, fileParams);
      const res = await uploadToCloudinary(
        `data:image/jpeg;base64,${fileBuffer.toString("base64")}`
      );
      fileUrls.push(res);
      //        const result = uploadFile(fileBuffer, fileParams);
      //        urls.push({ filename: result.key, url: result.Location });
    }
    if (fileUrls.length === 1) {
      ctx.response.body = { url: fileUrls[0].url };
      return;
    } else if (fileUrls.length > 1) {
      ctx.response.body = { urs: fileUrls };
      return;
    }
    return Statuses.NOT_FOUND;
  } catch (err) {
    console.error(err);
    return Statuses.NOT_FOUND;
  }
};

//Inject Routes
export function initImagesController(router: KoaRouter) {
  router.post("/v1/images", callback);
}
