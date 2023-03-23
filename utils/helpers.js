const format_date = require('./format_date');

module.exports = {
  format_date: format_date,
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  format_url: (url) => {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
  get_ago: (timestamp) => {
    const milliseconds = new Date().getTime() - new Date(timestamp).getTime();
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} ${module.exports.format_plural('year', years)} ago`;
    } else if (months > 0) {
      return `${months} ${module.exports.format_plural('month', months)} ago`;
    } else if (days > 0) {
      return `${days} ${module.exports.format_plural('day', days)} ago`;
    } else if (hours > 0) {
      return `${hours} ${module.exports.format_plural('hour', hours)} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${module.exports.format_plural('minute', minutes)} ago`;
    } else {
      return 'Less than a minute ago';
    }
  }
};