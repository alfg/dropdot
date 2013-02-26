
/*
 * GET home page.
 */

var crypto = require('crypto'),
    mime = require('mime'),
    uuid = require('node-uuid'),
    config = require('../config');

exports.index = function(req, res){

  res.render('index', { aws_bucket: config.aws_bucket,
                        aws_key: config.aws_key,
                        redirect_host: config.redirect_host,
                        host: config.host,
                        bucket_dir: config.bucket_dir });
};

exports.share = function(req, res){
    res.render('share', { aws_bucket: config.aws_bucket,
                          bucket_dir: config.bucket_dir });
}

exports.signed_urls = function(req, res){
  var mime_type = mime.lookup(req.query.doc.title);
  var policy = JSON.stringify({
                "expiration": config.expire_date,
                  "conditions": [ 
                    {"bucket": config.aws_bucket}, 
                    ["starts-with", "$key", config.bucket_dir],
                    {"acl": "public-read"},
                    {"success_action_status": "201"},
                    ["starts-with", "$Content-Type", mime_type]
                  ]
                });

  // Create base64 policy and signature
  var base64policy = new Buffer(policy).toString('base64');
  var signature = crypto.createHmac('sha1', config.aws_secret).update(base64policy).digest('base64');
  var file_key = uuid.v4(); // Generate uuid for filename

    res.json({ policy: base64policy,
               signature: signature,
               key: config.bucket_dir + file_key + "/" + req.query.doc.title,
               success_action_redirect: "/",
               contentType: mime_type
            })
}
