const AWS = require("aws-sdk");

const AWS_ACCESS_KEY = "AKIATVGLVUSRKM6VX5DT";
const AWS_SECRET = "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";
const AWS_REGION = "ap-south-1";

if (!AWS_ACCESS_KEY || !AWS_REGION || !AWS_SECRET)
  throw new Error("Missing parameter for AWS");

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_REGION,
});

module.exports = new AWS.S3();
