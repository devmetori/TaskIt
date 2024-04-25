export const UUID = (len = 12) => {
    const length = Number.isInteger(len) && len > 0 ? len : 12;
    if (length > 32)
        throw new Error('La longitud especificada es mayor de lo permitido para un UUID.');

    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return Array.from({ length: length }, s4).join('-');
};
