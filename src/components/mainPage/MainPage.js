import { useEffect, useState } from "react";
import axios from "axios";

//comps
import MyAutocomplete from "./MyAutocomplete";


const MainPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [currentItem, setItem] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const {data: response} = await axios.get('https://api.binance.com/api/v3/ticker/price');
                let usdtPrices = response.filter((item) => item.symbol.includes("USDT"));
                setData(usdtPrices);
                setItem(usdtPrices.find((item) => item.symbol.includes("SOL")))
            } catch (error) {
              console.error(error.message);
              setError(true)
            }
            setLoading(false)
        }
        getData()
    }, [])
    

    if(!loading && !error){
        return (
            <div className="MainPageWrapper">
                <h1>1 {currentItem?.symbol.replace("USDT", "")} = {parseFloat(currentItem?.price)} USDT</h1>
                <MyAutocomplete 
                    setInputValue = {setInputValue}
                    setItem = {setItem}
                    data = {data}
                    inputValue = {inputValue}
                />
            </div>
        )
    } else if(error) {
        return (
            <div className="MainPageWrapper">
                <h1>Error happend, try to reload the page</h1>
            </div>
        )
    }
}

export default MainPage;