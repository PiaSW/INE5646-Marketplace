import express from 'express';
import aws from 'aws-sdk'
import dotenv from 'dotenv'
import crypto, { randomBytes } from 'crypto'
import { promisify } from 'util';

const router = express.Router();
dotenv.config()
const region = "us-east-1";
const bucketName = "direct-upload-s3-bucket-marketplace";
const accessKeyId = "AKIASCJG646DD4J5A6G4";
const secretAccessKeyId = "maOjt1q5a+L1mdBML0/Ii9OQJq9gN711KBMTlMtG";

const s3 = new aws.S3({
    region,
  accessKeyId,
  secretAccessKeyId,
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