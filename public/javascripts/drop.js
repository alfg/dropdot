$(function() {

  $('.direct-upload').each(function() {

    var form = $(this)

    $(this).fileupload({
      url: form.attr('action'),
      type: 'POST',
      autoUpload: true,
      dataType: 'xml', // This is really important as s3 gives us back the url of the file in a XML document
      add: function (event, data) {
        $.ajax({
          url: "/signed_urls",
          type: 'GET',
          dataType: 'json',
          data: {doc: {title: data.files[0].name}}, // send the file name to the server so it can generate the key param
          async: false,
          success: function(data) {
            // Now that we have our data, we update the form so it contains all
            // the needed data to sign the request
            form.find('input[name=key]').val(data.key)
            form.find('input[name=policy]').val(data.policy)
            form.find('input[name=signature]').val(data.signature)
          }
        })
        data.submit();
      },
      send: function(e, data) {
        $('.progress').fadeIn();
      },
      progress: function(e, data){
        // This is what makes everything really cool, thanks to that callback
        // you can now update the progress bar based on the upload progress
        var percent = Math.round((e.loaded / e.total) * 100)
        $('.bar').css('width', percent + '%')
      },
      fail: function(e, data) {
        console.log('fail')
      },
      success: function(data) {
        // Here we get the file url on s3 in an xml doc
        var url = $(data).find('Location').text()

        $('#real_file_url').val(url) // Update the real input in the other form
      },
      done: function (event, data) {
        $('.progress').fadeOut(300, function() {
          $('.bar').css('width', 0)
        })
      },
    })
  })
})
