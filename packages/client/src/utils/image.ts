export const getBase64Value = (img: File | Blob) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(img);

        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = ev => {
            reject(ev);
        };
    });
