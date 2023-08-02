import { useEffect, useState } from "react";
import axios from "axios";


const App = () => {
  const [countries, setCountries] = useState([])
  const[search,setSearch]=useState("")

 
  
  useEffect(() => {
    let myAxiosGet = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    myAxiosGet.then((result) => {
      console.dir(result.data)
    setCountries(result.data)
    } )
  },[])
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  const countriesToShow = countries.filter(val => {return search.length===0?true:val.name.common.toLowerCase().includes(search.toLowerCase()) })
 
  

  return (
    <>
    
      <div>
       
      find countries
        <input type="text" value={search} onChange={handleSearch}/>
      </div>
      {console.log(countriesToShow) }
      {countriesToShow.length > 10 ? (<p>to many matches specify another one</p>) : countriesToShow.length >1? (
        <ul>
          {countriesToShow.map((value) => {
            return <div key={value.name.common}>
              <p >{value.name.common}</p>
          {console.log(value.namecommon)}
             </div>
          
        })}
        </ul>
      ) : countriesToShow.length === 1 ? <>{countriesToShow.map((value) => {
            return <div key={value.name.common}>
              <h1>{value.name.common}</h1>
              <p>capital {value.capital}</p>
              <p>area {value.area}</p>
              <h3>languages:</h3>
              {Object.values(value.languages).map((val) => {
                return <li key={val}>{ val}</li>
              })}
              <img src={value.flags.png} alt="flag" height="150px" width="150px"  /> 
             </div>
          })}</> : <p>no data found</p>
       }
        

    </>
   
    
  )
    

};

export default App;
