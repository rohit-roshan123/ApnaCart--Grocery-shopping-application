import {v2 as cloudinary} from 'cloudinary';


const connectCloudinary = async ()=>{
    cloudinary.config({
        cloud_name: 'eb8fetxr',
        api_key: '923329142544387',
        api_secret: 'iJuZu_dnqYNHSGSJhS92iITTMxw'

    })

    console.log("connected to cloudinary");

}

export default connectCloudinary;