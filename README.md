# Dropdot #

Dropdot is a simple file uploader built on NodeJS, Express and S3 API as the object storage platform.
It supports AWS S3 and DreamHost Objects as storage provider.

Configuring Dropdot is simple, just follow the steps below:

**AWS S3 Demo**:* http://dropdot.herokuapp.com/

## Installation
Clone and install dependencies

```bash
$ git clone https://github.com/alfg/dropdot.git
$ cd dropdot
$ npm install
```

Open `config.js` and configure

```javascript
module.exports.port = 3000; // App port
module.exports.aws_key = "YourAWSKey"; // AWS Key
module.exports.aws_secret = "YourSuperSecretAWSKey"; // AWS Secret
module.exports.aws_bucket = "NameOfS3Bucket"; // S3 bucket
module.exports.redirect_host = "http://localhost:3000/"; // Redirect page after successful upload
module.exports.host = "YOUR_S3_PROVIDER"; // S3 provider host
module.exports.bucket_dir = "uploads/"; // Subdirectory in S3 bucket where uploads will go
module.exports.max_filesize = 20971520; // Max filesize in bytes (default 20MB)
```

Or set your environment variables:
```bash
export PORT=3000
export AWS_KEY=<YourAWSKey>
export AWS_SECRET=<YourSuperSecretAWSKey>
export AWS_BUCKET=<NameOfS3Bucket>
export REDIRECT_HOST=http://localhost:3000/
export HOST=<YOUR_S3_PROVIDER>
export BUCKET_DIR=uploads
```

Run the app
```bash
$ mv config.js.sample config.js
$ node app.js
```

Load `http://localhost:3000` into the browser

The app is set, now you need to create and configure your S3 Bucket.

## Configuring your S3 Bucket
In order to allow S3 to accept CORS uploads from your app, it needs to be properly configured.

## AWS S3
Log into your S3 Console and create a bucket.

Right-click your bucket and go to properties > permissions > **Edit CORS Configuration**.

Enter the following:

```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```
Of course, the * in AllowedOrigin is only for development. Be sure to use your domain when going public.

## DreamObjects S3
See: https://help.dreamhost.com/hc/en-us/articles/216201557-How-to-setup-Cross-Origin-Resource-Sharing-CORS-on-DreamObjects


## CNAME your S3 bucket (optional)

Objects will be available by accessing the public URL directly. Example:
`http://bucket-name.s3.amazonaws.com/uploads/439fbca8-b79b-40e9-8172-4d318737ee14_file.jpg`

However, if you wish to customize the URL, you can use a CNAME. First, create/rename your bucket to match the
subdomain (`uploads.domain.com`). Then create the CNAME (via your DNS settings) using the exact name of the 
bucket/subdomain.

To be clear, the bucket's name and CNAME should be identical. i.e. `uploads.domain.com`

You can now access your files as:
`http://uploads.domain.com/uploads/439fbca8-b79b-40e9-8172-4d318737ee14_file.jpg`

## That's it!
All done! Now go upload stuff.

## License
Dropdot is open-source under the [MIT License][1].

## Credits
Dropdot uses the following technologies, check them out!
* [NodeJS][2] The core backend
* [Express][3] Framework for Node. Serves the JSON policy
* [mime][4] Mime-type detection
* [crypto][5] Used for SHA1, Base64 digestion
* [uuid][6] Generating the unique IDs
* [Amazon S3][8] Cloud Object/File Storage Platform

Guides that saved me a few gray hairs dealing with CORS:

* http://pjambet.github.com/blog/direct-upload-to-s3/
* http://aws.amazon.com/articles/1434

[1]: http://opensource.org/licenses/MIT
[2]: http://nodejs.org
[3]: http://expressjs.com/
[4]: https://github.com/broofa/node-mime
[5]: http://nodejs.org/api/crypto.html
[6]: https://github.com/broofa/node-uuid
[7]: http://foundation.zurb.com
[8]: http://aws.amazon.com/s3/
