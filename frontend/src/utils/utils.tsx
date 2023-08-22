import moment from 'moment';

export const formatDate = (dateString: string) => {
    const now = moment();
    const commentDate = moment(dateString);

    const daysDifference = now.diff(commentDate, 'days');
    const weeksDifference = now.diff(commentDate, 'weeks');
    const monthsDifference = now.diff(commentDate, 'months');

    if (daysDifference === 0) {
        return 'today';
    } else if (daysDifference === 1) {
        return 'yesterday';
    } else if (daysDifference > 1 && daysDifference < 7) {
        return `${daysDifference} days ago`;
    } else if (weeksDifference === 1) {
        return '1 week ago';
    } else if (weeksDifference > 1 && weeksDifference < 4) {
        return `${weeksDifference} weeks ago`;
    } else if (monthsDifference === 1) {
        return '1 month ago';
    } else if (monthsDifference > 1) {
        return `${monthsDifference} months ago`;
    }
};
