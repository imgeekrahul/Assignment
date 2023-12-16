const s3 = require("./s3_config");

exports.uploadFileToS3 = async (params) => {
  try {
    params.Bucket = "5dassign";
    // console.log(params);

    const info = await s3.upload(params).promise();

    if (!info) {
      throw new Error("Failed to upload image!");
    }
    // console.log(info);
    return info.Location;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to upload image!");
  }
};
