import PocketBase from 'pocketbase';

// Define a type for your 'subscribers' collection data
// Replace these with the actual fields from your PocketBase collection

const pb = new PocketBase('http://127.0.0.1:8090');


const getSubscriber = async (number) => {
    try {
        // const token = process.env.TOKEN as string;
        const token  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJwYmNfMzE0MjYzNTgyMyIsImV4cCI6MTc1ODAwOTE5MiwiaWQiOiJmcnNtbTJycDFjdDM3c2ciLCJyZWZyZXNoYWJsZSI6ZmFsc2UsInR5cGUiOiJhdXRoIn0.Le8LzwZu6QEtfMGVA29vavO-wLyZq7X_Z8IeFJ0Vzvk';
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
        throw error; // Rethrow the error to be handled by the caller
    }
};

export default getSubscriber;

// getSubscriber(number)
