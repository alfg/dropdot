# Dropdot #

Dropdot is a simple file uploader built on NodeJS, Express and Amazon S3 as the object storage platform.

Configuring Dropdot is simple, just follow the steps below:

##Installation##
```bash
$ git clone https://github.com/alfg/dropdot.git
```

Open `config.js` and configure the following:

```javascript
 module.exports.port = 3000; // App port
 module.exports.aws_key = "YourAWSKey"; // AWS Key
 module.exports.aws_secret = "YourSuperSecretAWSKey"; // AWS Secret
 module.exports.aws_bucket = "NameOfS3Bucket"; // S3 bucket
 module.exports.expire_date = "2014-01-01T00:00:00Z"; // This will be removed soon
 module.exports.host = "http://localhost:3000/"; // This will be removed soon
 module.exports.redirect_host = "http://localhost:3000/"; // Redirect page after successful upload
 module.exports.bucket_dir = "uploads/"; // Subdirectory in S3 bucket where uploads will go
```
Run the app:

```bash
$ node app.js
```

The app is set, now you need to create and configure your S3 Bucket.

##Configuring your S3 Bucket###
In order to allow S3 to accept CORS uploads from your app, it needs to be properly configured.

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

## That's it! ##
All done! Now go upload stuff.

## License ##
Dropdot is open-source under the [MIT License][1].

## Credits ##
Dropdot uses the following technologies, check them out!
* [NodeJS][2] The core backend
* [Express][3] Framework for Node. Serves the JSON policy
* [mime][4] Mime-type detection
* [crypto][5] Used for SHA1, Base64 digestion
* [uuid][6] Generating the unique IDs
* [Foundation][7] CSS Framework
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
