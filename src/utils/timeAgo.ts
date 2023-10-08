// Define a function that takes a date as an argument
// and returns a string that represents how long ago the date was
const timeAgo = (date: Date): string => {
    const seconds: number = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) {
        return seconds + ' seconds ago';
    }

    const minutes: number = Math.floor(seconds / 60);
    if (minutes < 60) {
        return minutes + ' minutes ago';
    }

    const hours: number = Math.floor(minutes / 60);
    if (hours < 24) {
        return hours + ' hours ago';
    }

    const days: number = Math.floor(hours / 24);
    if (days < 30) {
        return days + ' days ago';
    }

    const months: number = Math.floor(days / 30);
    if (months < 12) {
        return months + ' months ago';
    }

    const years: number = Math.floor(months / 12);
    return years + ' years ago';
};

export default timeAgo;
