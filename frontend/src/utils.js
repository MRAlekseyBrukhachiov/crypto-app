const percentDifference = (a, b) => {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1)
}

const getTimeAgo = (feedDate) => {
    const t = Date.now() - feedDate,
          seconds = Math.floor((t / 1000) % 60),
          minutes = Math.floor((t / 1000 / 60) % 60),
          hours = Math.floor((t / 1000 / 60 / 60) % 24),
          days = Math.floor(t / 1000 / 60 / 60 / 24);
    
    return {
        days, hours, minutes, seconds
    }
}

export { percentDifference, capitalize, getTimeAgo }