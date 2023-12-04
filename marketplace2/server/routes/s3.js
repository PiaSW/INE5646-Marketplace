import express from 'express';
import aws from 'aws-sdk'
import dotenv from 'dotenv'
import crypto, { randomBytes } from 'crypto'
import { promisify } from 'util';

const router = express.Router();
dotenv.config()
const region = process.env.AWS_REGION_ENV;
const bucketName = "direct-upload-s3-bucket-marketplace";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID_ENV;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ENV;

const s3 = new aws.S3({
    region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})


export async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
  
    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
  }

router.get('/', async (request,response) => {
    const url = await generateUploadURL();
    console.log("URL",url)
    return response.status(200).send({url:url});
})

export default router;