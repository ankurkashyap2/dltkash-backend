var SendClean= require('./SendClean.js');
var SendClean_client = new SendClean.SendClean('80940214', '2bZ1zHM3tNHK43DotA9DfAdF', 'us1-mta1.sendclean.net');
var param = {
    "smtp_user_name": "smtp34269159",
    "message": {
        "html": "Example HTML content",
        "text": "Example text content",
        "subject": "example subject",
        "from_email": "message.from_email@example.com",
        "from_name": "Example Name",
        "to": [{
                "email": "ankitdogra1996@gmail.com",
                "name": "Recipient Name",
                "type": "to"
            }],
        "headers": {
            "Reply-To": "message.reply@example.com",
            "X-Unique-Id": "id "
        },
      
    }
};
SendClean_client.messages.sendMail(param, function(result) {
    console.log({result});
    /*
    {
        "status" : "success",
        "message" : "message have been Queued ... ";
    }
     */
    
}, function(e) {
    // SendCleanreturns the error as an object with name and message keys
    console.log('A SendCleanerror occurred: ' + e.name + ' - ' + e.message);
}); 