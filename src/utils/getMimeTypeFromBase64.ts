export default function getMimeTypeFromBase64(base64String: Base64URLString){
    // Check the first few characters of the base64 string to determine the image type.
    if (!base64String) {
        return 'image/png'; // Default MIME type
    }
    // PNG starts with 89504E47
    if (base64String.startsWith('iVBORw0KGgo')) {
        return 'image/png';
    }
    // JPG/JPEG starts with FFD8FF
    if (base64String.startsWith('/9j/')) {
        return 'image/jpeg';
    }
    // GIF starts with 47494638
    if (base64String.startsWith('R0lGOD')) {
        return 'image/gif';
    }
    // WEBP starts with 52494646....57454250
    if (base64String.startsWith('UklGR')) {
        return 'image/webp';
    }
    // Default to PNG if no match is found
    return 'image/png';
};