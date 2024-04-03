import { cryptoAssets, cryptoData } from "../data";

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

export { fakeFetchCrypto, fakeFetchAssets }