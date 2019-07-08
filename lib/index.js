'use strict';

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
// Public node modules.
const AWS = require('aws-sdk');

module.exports = {
  provider: 'aws-s3-custom-domain',
  name: 'AWS S3 with custom domain',
  auth: {
    baseUrl: {
      label: 'Base URL, e.g. https://example.com',
      type: 'text'
    },
    bucket: {
      label: 'Bucket',
      type: 'text'
    },
    prefix: {
      label: "Key Prefix, e.g. uploads/",
      type: 'text'
    },
    setObjectPublic: {
      label: 'Set the object public accessible? ACL = public-read',
      type: 'enum',
      values: [
        "Public",
        "No Public"
      ]
    }
  },
  init: (config) => {
    const S3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: config.bucket
      }
    });

    return {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const prefix = config.prefix.trim() === "/" ? "" : config.prefix.trim();
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          const objectKey = `${prefix}${path}${file.hash}${file.ext}`;
          S3.upload(Object.assign({
            Key: objectKey,
            Body: new Buffer(file.buffer, 'binary'),
            ContentType: file.mime,
          }, config.setObjectPublic === "Public" ? {ACL: 'public-read'} : {}), (err, data) => {
            if (err) {
              return reject(err);
            }

            // set the bucket file url
            file.url = `${config.baseUrl}/${objectKey}`;

            resolve();
          });
        });
      },
      delete: (file) => {
        return new Promise((resolve, reject) => {
          const prefix = config.prefix.trim() === "/" ? "" : config.prefix.trim();
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.deleteObject({
            Key: `${prefix}${path}${file.hash}${file.ext}`
          }, (err, data) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      }
    };
  }
};
