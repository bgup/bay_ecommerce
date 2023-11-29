import mongoose from 'mongoose';

const dbConnect = async()=>{
    try {
        const connected = mongoose.connect('url');
        console.log(`Mongodb connected ${(await connected).connection.host}`);
    } catch (error) {
        console.log(`Error ${error.message}`);
        //ver la documantación
        process.exit(1);
    }
}

export default dbConnect;