export function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Extract month, day, year, hours, and minutes
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight as 12
  
    // Return formatted string
    return `${day}/${month}/${year} ${hours.toString().padStart(2, "0")}:${minutes}${ampm}`;
  }