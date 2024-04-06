import { 
    cryptoAssets, 
    cryptoData, 
    cryptoLatestNews, 
    cryptoTrendingNews, 
    cryptoBullishNews, 
    cryptoBearishNews 
} from "../data";

const fakeFetchCrypto = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 500)
    })
}

const fakeFetchAssets = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 500)
    })
}

const fakeFetchLatestNews = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoLatestNews)
        }, 500)
    })
}

const fakeFetchTrendingNews = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoTrendingNews)
        }, 500)
    })
}

const fakeFetchBullishNews = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoBullishNews)
        }, 500)
    })
}

const fakeFetchBearishNews = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoBearishNews)
        }, 500)
    })
}

export { fakeFetchCrypto, fakeFetchAssets, fakeFetchLatestNews, fakeFetchTrendingNews, fakeFetchBullishNews, fakeFetchBearishNews }