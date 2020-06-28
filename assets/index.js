function generate()
{
    document.getElementById('btnsubmit').disabled=true
    document.getElementById('showmsg').innerHTML=''
    var data={
        oldUrl:document.getElementById('longurl').value
    }
    var xh=new XMLHttpRequest;
    xh.open("POST","https://api-shorty.herokuapp.com/generate/shortUrl", true);
	xh.setRequestHeader("Content-Type", "application/json");
    xh.send(JSON.stringify(data));
    xh.onload=function()
    {
        document.getElementById('longurl').value=''
        document.getElementById('btnsubmit').disabled=false
        var data=JSON.parse(this.responseText)
        if(this.status==401 || this.status==400)
        {
            $('#showmsg').append(`<div id="d1" style="padding-top:50px; padding-left: 250px; padding-right: 250px;" class="text-center" >
            <div class="text-center" style="background-color:red; padding:10px 10px;">${data.message}</div>
        </div>`)
        }
        else{
            $('#showmsg').append(`<div id="d1" style="padding-top:50px; padding-left: 250px; padding-right: 250px;" class="text-center" >
            <div class="text-center" style="background-color:rgb(126, 226, 126); padding:10px 10px;">${data.message}</div>
        </div>
        <div id="d2" style="padding-top:20px; padding-left: 250px; padding-right: 250px;" class="text-center" >
                <div class="text-center" style="background-color:cornsilk; padding:10px 10px;">${data.shortUrl}</div>
            </div>
        `)
        }
    }
}