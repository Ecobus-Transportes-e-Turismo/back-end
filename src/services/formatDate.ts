export const DateFormat = (date:Date | string) => {
    const day = new Date(date).getUTCDate();
    const month = new Date(date).getUTCMonth();
    const year = new Date(date).getFullYear();
    const newDate = `${day < 10? '0' + day : day}/${month < 10 ? '0' + month :month}/${year}`;

    return newDate; //format: DD/MM/YYYY
}