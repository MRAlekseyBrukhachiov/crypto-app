import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';
import ListNews from '../ListNews';

const contentStyle = {
    textAlign: 'center',
    maxHeight: 'calc(100vh - 60px)',
    overflow: 'auto',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
  };

const AppContent = () => {
    const { assets, crypto, latestNews, trendingNews } = useCrypto()

    // Оптимизация через object map
    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{textAlign: 'left', color: '#fff'}}>
                Portfolio:{' '}
                {assets
                    .map(asset => asset.amount * cryptoPriceMap[asset.id])
                    .reduce((acc, v) => acc += v, 0)
                    .toFixed(2)
                }$
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable/>
            <ListNews news={latestNews} label={'Latest'}/>
            <ListNews news={trendingNews} label={'Trending'}/>
        </Layout.Content>
    )
}

export default AppContent;