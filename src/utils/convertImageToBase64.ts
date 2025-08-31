export default function convertImageToBase64(file: File) {
    let base64Image = null;
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        base64Image = await reader.result.split(',')[1];
        return base64Image;
    };
    return base64Image;
}