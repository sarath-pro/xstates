import React, { useEffect, useState } from 'react'
import "./States.css"

function States() {
    const [stateDisabled, setStateDisabled] = useState(true)
    const [cityDisabled, setCityDisabled] = useState(true)
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    useEffect(()=>{
        async function fetchData() {
            const countriesUrl = 'https://crio-location-selector.onrender.com/countries'
            try {
                let response = await fetch(countriesUrl)
                let temp = await response.json()
                
                let countries = []
                let two = []
                for(let i=0;i<temp.length;i++) {
                    if(temp[i][0]==' ') {
                        two.push(temp[i]+"2")
                    } else {
                        countries.push(temp[i])
                    }
                }
                countries.push(...two)
                setCountries(countries)
                console.log('countries:: ', countries)
            } catch(error) {
                console.log(error)
            }   
        }  
        fetchData()
    }, [])
    useEffect(()=>{
        async function fetchData() {
            const statesUrl = `https://crio-location-selector.onrender.com/country=${country}/states`
            try {
                let response = await fetch(statesUrl)
                const states = await response.json()
                console.log('states:: ', states)
                setStateDisabled(false)
                setStates(states)
            } catch(error) {
                console.log(error)
            }
            
        } 
        if(country.length>0) {
            fetchData() 
        }
    }, [country])
    useEffect(()=>{
        async function fetchData() {
            const citiesUrl = `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
            try {
                let response = await fetch(citiesUrl)
                const cities = await response.json()
                console.log('cities:: ', cities)
                setCityDisabled(false)
                setCities(cities)
            } catch(error) {
                console.log(error)
            }
            
        }  
        if(state.length>0) {
            fetchData() 
        }
        
    }, [state])
  return (
    <div className='container'>
        <h1>Select Location</h1>
        <div>
            <select name='country' onChange={(event)=>{
                console.log(event.target.value)
                if(event.target.value!='Select Country') {
                    setCountry(event.target.value)
                } else {
                    setCountry('')
                }
            }}>
            <option>Select Country</option>
            {   
                countries.length>0 && (
                    countries.map((ctry)=>(<option>{ctry}</option>))
                )
            }
            </select>
            <select name='state' disabled={stateDisabled} onChange={(event)=>{
                console.log(event.target.value)
                if(event.target.value!='Select State') {
                    setState(event.target.value)
                }else {
                    setState('')
                }
            }}>
            <option>Select State</option>
            {   
                states.length>0 && (
                    states.map((sts)=>(<option>{sts}</option>))
                )
            }
            </select>
            <select name='city' disabled={cityDisabled} onChange={(event)=>{
                console.log(event.target.value)
                if(event.target.value!='Select City') {
                    setCity(event.target.value)
                } else {
                    setCity('')
                }
            }}>
            <option>Select City</option>
            {   
                cities.length>0 && (
                    cities.map((cty)=>(<option>{cty}</option>))
                )
            }
            </select>
        </div>
        {
            country && state && city && (
                <h3>You selected {city}, {state}, {country}</h3>
            )
        }
        
    </div>
  )
}

export default States