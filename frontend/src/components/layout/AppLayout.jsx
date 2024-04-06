import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout, Spin } from "antd"
import AppHeader from "./AppHeader"
import AppSider from "./AppSider"
import AppPortfolio from "./AppPortfolio"
import AppNews from "./AppNews"
import { useCrypto } from "../../context/crypto-context"

const AppLayout = () => {
    const { loading } = useCrypto()
    
    if (loading) {
        return <Spin fullscreen/>
    }

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Layout>
                <AppHeader/>
                <Layout>
                    <AppSider/>
                    <Routes>
                        <Route path="/" element={<AppPortfolio/>}/>
                        <Route path="/news" element={<AppNews/>}/>
                    </Routes>
                </Layout>
            </Layout>
        </Router>
    )
}

export default AppLayout