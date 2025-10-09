import PocketBase from 'pocketbase';
// import dotenv from "dotenv"

// if(process.env.NODE !== "production"){
//     dotenv.config({ path : "./.secrets/.env"})
// }

 const pocketBaseAuth = async () => {
    
    try{
    // Define a type for your 'subscribers' collection data
    // Replace these with the actual fields from your PocketBase collection
    const pb = new PocketBase( process.env.BASE_URL || 'http://127.0.0.1:8090' ) ;
    
    const token  = process.env.AUTH_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTc1ODY0NTAwNiwiaWQiOiJmcnNtbTJycDFjdDM3c2ciLCJyZWZyZXNoYWJsZSI6ZmFsc2UsInR5cGUiOiJhdXRoIn0.L63zgn247L0-R2WkMeWc8GDtcfZ4_WRuQXOmj9BYqYk';
    
    pb.authStore.save(token, null);  
    
    return pb;
  
    }
    catch (error) {
        console.error("Error : " , error)
        return error.message
    }
}

export const createService = async (msisdn) => {
    try{
        const pb = await pocketBaseAuth()
        
        const user = await pb.collection('subscriber').getFirstListItem(`mssidn = "${msisdn}"`);    
        // console.log("Records : ", user.id);
        // return user;
        const data = {
            "name" : "Jazz",
            "shortcode" : "*700#",
            "subscribe": true,
            "subscribers" : [
                user.id
            ]
        }

        const record = await pb.collection('service').create(data);
        // console.log("Record : " , record)
        return record;

    }
    catch(error){
        // console.error("Error : " ,error.message)
        return error.message
    }
}

const getService = async (msisdn) => {
    try{
        
        const pb = await pocketBaseAuth()
        // console.log(pb)
        const user = await pb.collection('subscriber').getFirstListItem(`mssidn = "${msisdn}"`);
        const resultList = await pb.collection('service').getList(1, 50, {
            filter: `subscribers.id = "${user.id}"`,
        });

        return resultList;
    }
    catch(error){
        // console.error("Error : " ,error.message)
        return error.message
    }
}


const updateService = async (msisdn) => {
    try{
        const pb = await pocketBaseAuth()
        const user = await pb.collection('subscriber').getFirstListItem(`mssidn = "${msisdn}"`);    
        const service = await pb.collection('service').getFirstListItem(`subscribers.id = "${user.id}"`);    
        
        console.log("Records : ", user.id);
        const data = {
            "name" : "Zong",
            "shortcode" : "*700#",
            "subscribe": false,
            "subscribers" : [
                user.id
            ]
        }

        const record = await pb.collection('service').update(service.id, data);
        // console.log("Record : " , record)
        return record;

    }
    catch(error){
        // console.error("Error : " ,error.message)
        return error.message
    }
}


const deleteService = async (msisdn) => {
    try{
        const pb = await pocketBaseAuth()
        const user = await pb.collection('subscriber').getFirstListItem(`mssidn = "${msisdn}"`);    
        const service = await pb.collection('service').getFirstListItem(`subscribers.id = "${user.id}"`);    
        
        // console.log("Records : ", user.id);
        
        const record = await pb.collection('service').delete(service.id);;
        // console.log("Record : " , record)
        return record;

    }
    catch(error){
        // console.error("Error : " ,error.message)
        return error.message
    }
}

const createOTP = async () => {
    try {
        const otp = await Math.floor(100000 + Math.random() * 900000);
        return otp
    } catch (error) {
        console.error("Error : ", error.message)
        return error.message
    }
}

export const getSubscriber = async (number) => {
    try {
        const pb = await pocketBaseAuth()
        const record = await pb.collection('subscriber').getFirstListItem(`mssidn = "${number}"`);    
        console.log("Records : ", record);
        return record;
    } catch (error) {
        console.error("Error : ", error.message);
        return error.message; // Rethrow the error to be handled by the caller
    }
};

export const getOTP = async (number) => {
    try {
        const user = await getSubscriber(number)
        if(user.subscription === true){
            const otp = await createOTP()
            // console.log("OTP is : " , otp)
            const data = {
                "otp" : otp
            };
            const pb = await pocketBaseAuth()
            const user = await pb.collection('subscriber').getFirstListItem(`mssidn = "${number}"`);    
            // console.log(user.id)
            const record = await pb.collection('subscriber').update(user.id, data);
            // console.log(record)
            return otp
        } 
        if(user.subscription === false) return "User has not subscribed!";   
    } catch (error) {
        console.error("Error : " ,error.message)
        return error.message
    }
}


// const func = async() =>{
//     const result = await createService(923042574981)
//     console.log(result)
// }

// func()
// pocketBaseAuth()
