function getDate() {
    let months = [
        'January', 'February', 'Mars', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    return `${months[month]} ${day},${year}`;
}