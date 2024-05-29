export function displayDate(data) {
    const date = new Date(parseInt(data)); 
    const now = new Date();
    const year = now.getFullYear() - date.getFullYear();
   if (year === 0){
        const dayDiv = now.getDay() - date.getDay();
        if (dayDiv === 0){
            const time = now.getHours() - date.getHours();
            if (time === 0){
                const minutes = now.getMinutes() - date.getMinutes();
                if (minutes >= 0 && minutes < 5 ) return '1 минуту назад';
                if (minutes >= 5 && minutes < 10 ) return '5 минут назад';
                if (minutes >= 10 && minutes < 30 ) return '10 минут назад';
                return '30 минут назад'
            }
            return date.getHours() + ":" + (date.getMinutes() + 1)  
        } 
        return date.toLocaleString("default", { month: "long", day: "numeric" });
   }
    return (date.getDate() + "." + (date.getMonth() + 1)  + "." + date.getFullYear())
}