import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchAssets, fakeFetchCrypto } from "../components/api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

const CryptoContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    const mapAssets = (assets, result) => {
        return assets.map(asset => {
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset
            }
        })
    }

    useEffect(() => {
        const preload = async () => {
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await fakeFetchAssets()

            setCrypto(result)
            setAssets(mapAssets(assets, result))
            setLoading(false)
        }
        preload()
    }, [])

    const addAsset = (newAsset) => {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }

    const deleteAsset = (assetKey) => {
        setAssets(prev => [...prev.filter(item => item.id !== assetKey)])
    }

    const updateAsset = (assetKey, newAsset) => {
        const newData = [...assets];
        console.log(newData)
        const index = newData.findIndex((item) => assetKey === item.id);
        if (index > -1) {
          const item = newData[index];
          console.log(item);
          newData.splice(index, 1, {
            id: item.id,
            date: item.date,
            ...newAsset,
          });
          setAssets(mapAssets(newData, crypto));
        }
    }

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, deleteAsset, updateAsset }}>
            {children}
        </CryptoContext.Provider>
    )
}

const useCrypto = () => {
    return useContext(CryptoContext)
}

export { CryptoContextProvider, useCrypto }
export default CryptoContext