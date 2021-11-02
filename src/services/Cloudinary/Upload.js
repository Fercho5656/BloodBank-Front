export const uploadToCloudinary = async (img) => {
    try {
        const formData = new FormData();
        formData.append('file', img);
        formData.append('upload_preset', 'bloodbank');
        const result = await fetch(`https://api.cloudinary.com/v1_1/bloodbank/image/upload`, {
            method: 'post',
            body: formData
        });
        const json = await result.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}