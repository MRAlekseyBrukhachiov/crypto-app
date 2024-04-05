import { cryptoAssets, cryptoData, cryptoLatestNews, cryptoTrendingNews } from "../data";

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

export { fakeFetchCrypto, fakeFetchAssets, fakeFetchLatestNews, fakeFetchTrendingNews }