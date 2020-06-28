const express = require("express");
const shortid=require("shortid")
const validUrl=require("valid-url")
const router = express.Router();

const Url = require("../models/urls");

router.post('/generate/shortUrl',async(req,res)=>{

    console.log("jjjjjjjjjj")
    if(!validUrl.isUri(process.env.base_url)){
        res.status(401).json({
            mesaage:"Invalid base url"
        })
    }
    var urlCode=shortid.generate()
    if(validUrl.isUri(req.body.oldUrl))
    {
        var urldata=await Url.findOne({oldUrl:req.body.oldUrl})
            if(urldata)
            {
                res.status(200).json({
                    message:"Short link for this URL has already been genrated. Check it out now!",
                    shortUrl:urldata.newUrl
                })
            }
            else{
                var newUrl=process.env.base_url + urlCode
                var shorturl=new Url({
                    urlCode:urlCode,
                    oldUrl:req.body.oldUrl,
                    newUrl:newUrl
                })
                await shorturl.save()
                res.status(201).json({
                    message:"New Short url generated! Check it out now!",
                    shortUrl:shorturl.newUrl
                })
            }
    }
})

router.get('/:id',async(req,res)=>{

    Url.findOne({urlCode:req.params.id}).exec().then(async(urldata)=>{
        if(urldata)
        {
            res.redirect(urldata.oldUrl)
        }
        else{
            res.status(404).json("No URL found. Please make sure that you created a short link from the URL above")
        }
    }).catch((err)=>{
        res.status(400).json("Something went wrong")
    })
})

module.exports=router