
/*
 * GET home page.
 */

var crypto = require('crypto'),
  mime = require('mime'),
  uuid = require('uuid'),
  moment = require('moment'),
  config = require('../config');

exports.index = function (req, res) {
  /* Index view */

  res.render('index', {
    aws_bucket: config.aws_bucket, // Passes to view to set as vars
    aws_key: config.aws_key,
    redirect_host: config.redirect_host,
    bucket_dir: config.bucket_dir,
    host: config.host
  });
};

exports.signed = function (req, res) {
  /* JSON View for obtaining CORS policy, signature, key, redirect and mime-type, then signs policy as a sha1 digest */

  var mime_type = mime.lookup(req.query.title); // Uses node-mime to detect mime-type based on file extension
  var expire = moment().utc().add(1, 'hour').toJSON("YYYY-MM-DDTHH:mm:ss Z"); // Set policy expire date +30 minutes in UTC
  var file_key = uuid.v4(); // Generate uuid for filename

  // Creates the JSON policy according to Amazon S3's CORS uploads specfication (http://aws.amazon.com/articles/1434)
  var policy = JSON.stringify({
    "expiration": expire,
    "conditions": [
      { "bucket": config.aws_bucket },
      ["eq", "$key", config.bucket_dir + file_key + "_" + req.query.title],
      { "acl": "public-read" },
      { "success_action_status": "201" },
      ["starts-with", "$Content-Type", mime_type],
      ["content-length-range", 0, config.max_filesize]
    ]
  });

  var base64policy = new Buffer.from(policy).toString('base64'); // Create base64 policy
  var signature = crypto.createHmac('sha1', config.aws_secret).update(base64policy).digest('base64'); // Create signature

  // Return JSON View
  res.json({
    policy: base64policy,
    signature: signature,
    key: config.bucket_dir + file_key + "_" + req.query.title,
    success_action_redirect: "/",
    contentType: mime_type
  })
}
