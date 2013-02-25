
/*
 * GET home page.
 */

var crypto = require('crypto'),
    uuid = require('node-uuid'),
    config = require('../config');


exports.index = function(req, res){
  var policy = JSON.stringify({
                "expiration": config.expire_date,
                  "conditions": [ 
                    {"bucket": config.aws_bucket}, 
                    ["starts-with", "$key", config.bucket_dir],
                    {"acl": "public-read"},
                    {"success_action_status": "201"},
                  ]
                });

  // Create base64 policy and signature
  var base64policy = new Buffer(policy).toString('base64');
  var signature = crypto.createHmac('sha1', config.aws_secret).update(base64policy).digest('base64');
  var file_key = uuid.v4(); // Generate uuid for filename

  res.render('index', { aws_key: config.aws_key,
                        policy: base64policy,
                        signature: signature,
                        redirect_host: config.redirect_host,
                        file_key: file_key,
                        host: config.host,
                        bucket_dir: config.bucket_dir });
};

exports.share = function(req, res){
    res.render('share', { aws_bucket: config.aws_bucket,
                          bucket_dir: config.bucket_dir });
}

exports.signed_urls = function(req, res){
  var policy = JSON.stringify({
                "expiration": config.expire_date,
                  "conditions": [ 
                    {"bucket": config.aws_bucket}, 
                    {"acl": "public-read"},
                    ["starts-with", "$key", config.bucket_dir],
                    {"success_action_status": "201"},
                  ]
                });

  // Create base64 policy and signature
  var base64policy = new Buffer(policy).toString('base64');
  var signature = crypto.createHmac('sha1', config.aws_secret).update(base64policy).digest('base64');
  var file_key = uuid.v4(); // Generate uuid for filename

    res.json({ policy: base64policy,
               signature: signature,
               key: 'test',
               success_action_redirect: "/"
            })
}
