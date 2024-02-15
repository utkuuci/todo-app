const currentDate = new Date();
const formattedDate = currentDate.toISOString().replace('T', ' ').replace('Z', '');

console.log(formattedDate);


console.log(currentDate);