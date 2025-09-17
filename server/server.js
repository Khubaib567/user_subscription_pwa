import PocketBase from 'pocketbase';
 
// Define a type for your 'subscribers' collection data
// Replace these with the actual fields from your PocketBase collection

const pb = new PocketBase('http://127.0.0.1:8090');


const createOTP = async () => {
    try {
        const otp = await Math.floor(100000 + Math.random() * 900000);
        return otp
    } catch (error) {
        console.error("Error : ", error.message)
    }
}

export const getSubscriber = async (number) => {
    try {
        // const token = process.env.TOKEN as string;
        const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTc1ODE4NTQ0NiwiaWQiOiJmcnNtbTJycDFjdDM3c2ciLCJyZWZyZXNoYWJsZSI6ZmFsc2UsInR5cGUiOiJhdXRoIn0.jdC-oh4YlXYnvRd4XsCoA0s33KgiT4QvPJ9jQoa1p8k';
        // The second argument of `save` is the model, which can be `null`
        pb.authStore.save(token, null);

        // Specify the type of the collection records when using `getFullList`
        // const records = await pb.collection('subscribers').getFullList();
        // const number = 923042574981;
        const record = await pb.collection('subscribers').getFirstListItem(`mssidn = "${number}"`);    
        // console.log("Records : ", record);

        return record;
    } catch (error) {
        console.error("Error : ", error.message);
        return error; // Rethrow the error to be handled by the caller
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
            const user = await pb.collection('subscribers').getFirstListItem(`mssidn = "${number}"`);    
            // console.log(user.id)
            const record = await pb.collection('subscribers').update(user.id, data);
            // console.log(record)
            return otp
        } 
        if(user.subscription === false) return "User has not subscribed!";   
    } catch (error) {
        console.error("Error : " ,error.message)
        return error
    }
}


// const func = async() =>{
//     const result = await getOTP(923042574981)
//     console.log(result)
// }

// func()

// getSubscriber(number)
