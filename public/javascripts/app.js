
$('#drop').filedrop({
    fallback_id: 'upload_button',   // an identifier of a standard file input element
    url: action,                    // upload handler, handles each file separately, can also be a function returning a url
    paramname: 'file',          // POST parameter name used on serverside to reference file
    data: {
        key: bucket_dir + key,           // send POST variables
        AWSAccessKeyId: aws_key,
        acl: acl,
        policy: policy,
        signature: signature,
        success_action_status: 201
    },
    uploadFinished:function(i, file, response) {
        alert(response);
        document.location.href = '/share/#' + key;
    },
    error: function(err, file) {
        switch(err) {
            case 'BrowserNotSupported':
                alert('browser does not support html5 drag and drop')
                break;
            case 'TooManyFiles':
                // user uploaded more than 'maxfiles'
                break;
            case 'FileTooLarge':
                // program encountered a file whose size is greater than 'maxfilesize'
                // FileTooLarge also has access to the file which was too large
                // use file.name to reference the filename of the culprit file
                break;
            case 'FileTypeNotAllowed':
                // The file type is not in the specified list 'allowedfiletypes'
            default:
                break;
        }
    },
    allowedfiletypes: [],   // filetypes allowed by Content-Type.  Empty array means no restrictions
    maxfiles: 1,
    maxfilesize: 5,    // max file size in MBs
});

var dragging = 0; //Get around chrome bug
$('#drop').on("dragenter", function(e){
    dragging++;
    $('#drop').addClass("bubble");
    e.preventDefault();
    return false;
});

$('#drop').on("dragover", function(e){
    $('#drop').addClass("bubble");
    e.preventDefault();
    return false;
});

$('#drop').on("dragleave", function(e){
    dragging--;
    if (dragging === 0) {
      $('#drop').removeClass("bubble");
    }
    e.preventDefault();
    return false;
});
