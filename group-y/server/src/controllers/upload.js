const upload = require("./middlewares/upload");
const Config = require("../config");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const Util = require('./util')
const User = require('../models/user')

const mongoClient = new MongoClient(Config.mongoDBUrl);


const uploadProfilePhoto = async(request, response) => {
    try{
        await upload(request, response)
        if(!request.file){
            return res.send({
                message: "You must select a file.",
            });
        }
        const username = Util.getDecodedToken(Util.getToken(request)).username
        const user = await User.findOne({username:username})
        user.profilePhotoLocation =  getFileLocation(request.file.filename)
        const savedUser = await user.save()
        response.send(savedUser)
    }catch(err){
        console.log(err)
        response.sendStatus(500)
    }
}

const getUserPhoto = async(request, response) => {
    try{
        const username = Util.getDecodedToken(Util.getToken(request)).username
        const user = await User.findOne({username:username})
        if(user.profilePhotoLocation){
            response.send(user.profilePhotoLocation)   
        }else{
            response.sendStatus({
                message:"No image found"
            })
        }
    }catch(err){
        console.log(err)
        response.sendStatus(500)
    }
}



const getFileLocation =  (filename) =>{
    return   `${Config.downloadURL}${filename}`
}

const download = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db("RentnBuy");
    const bucket = new GridFSBucket(database, {
      bucketName: "images",
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
        console.log(err)
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
    uploadProfilePhoto,
    getUserPhoto,
    download
};