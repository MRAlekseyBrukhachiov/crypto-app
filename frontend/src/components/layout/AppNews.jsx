import { Layout } from 'antd';
import { useCrypto } from '../../context/crypto-context';
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

const AppNews = () => {
    const { latestNews, trendingNews, bullishNews, bearishNews } = useCrypto()

    return (
        <Layout.Content style={contentStyle}>
            <ListNews news={latestNews} label={'Latest'}/>
            <ListNews news={trendingNews} label={'Trending'}/>
            <ListNews news={bullishNews} label={'Most Bullish'}/>
            <ListNews news={bearishNews} label={'Most Bearish'}/>
        </Layout.Content>
    )
}

export default AppNews