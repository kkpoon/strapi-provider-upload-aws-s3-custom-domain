# strapi-provider-upload-aws-s3-custom-domain

This file upload provider differ with official aws s3 provider in the following

- Allow to set custom domain, in case the S3 content is serve via CNAME domain 
or CDN. If you would use S3 URL, use [strapi-provider-upload-aws-s3](https://github.com/strapi/strapi/blob/master/packages/strapi-provider-upload-aws-s3/) or find the endpoint [here](https://docs.aws.amazon.com/general/latest/gr/rande.html).
- Remove the config of AWS Access Key and Secret in plugin config
- Remove the config of region in plugin config
- AWSSDK fallback to default behavior to use environment variables or IAM role

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
