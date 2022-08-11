export const DateFormat = (date:Date) => {

    const day = new Date(date).getDate();
    const month = new Date(date).getUTCMonth() + 1;
    const year = new Date(date).getFullYear();

    const newDate = `${day}/${month<10?'0'+month:month}/${year}`;

    return newDate; //format: DD/MM/YYYY
}