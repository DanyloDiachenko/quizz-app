export const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
        if (uploadedFile.name.includes(".mp4")) {
            const result = URL.createObjectURL(uploadedFile);
            return result;
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) return e.target.result as string;
            };
            reader.readAsDataURL(uploadedFile);
        }
    }
};
