import React, { useState, useEffect } from 'react';
import { allData } from './tools/server';

function App() {

  const [keyword, setKeyword] = useState([])
  const [list, setList] = useState({
    loading: false,
    dt: [],
    error: false
  })

  useEffect(() => {
    doSearch()
  }, [])

  const doSearch = async () => {
    setList({
      loading: true,
      dt: [],
      error: false
    })
    try {
      const resp = await allData()
      setList({
        loading: false,
        dt: resp.data,
        error: false
      })
    } catch (error) {
    }
  }

  const filterSomething = (min, max, filter) => {
    let category = Array.apply(null, {length: max + 1}).map(Number.call, Number).slice(min)
    const data = list.dt

    const hasil = data.filter( item => category.includes(item[filter]))
    setKeyword(hasil)
  }

  const getData = () => {
    return keyword.length > 0 ? keyword : list.dt
  }

  const errorImg = (ev) => {
    ev.target.src = "https://i.pinimg.com/originals/63/77/38/637738357c2bb110affb23c1e85f77f2.png"
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'colum', marginLeft: '10%', marginRight: '10%'}}>
      <div style={{marginRight: '2rem'}}>
        Filter Days - <span onClick={() => setKeyword([])} style={{cursor: 'pointer'}}>clear</span>
        <hr />
        <button onClick={() => filterSomething(0, 5, 'days')}>0-5 hari</button>
        <button onClick={() => filterSomething(5, 12, 'days')}>5-12 hari</button>
        <button onClick={() => filterSomething(12, 21, 'days')}>12-21 hari</button>

      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <h3>{getData().length} tour packages found </h3>
          {
            getData().length === 0 && list.error === false && 'Loading...'
          }
          {
            getData().map((item, index) => (
              <div key={index} style={{display: 'flex', borderBottom: '1px solid gray'}}>
                {
                  "tourInventoryImage" in item && 0 in item.tourInventoryImage && <img src={item.tourInventoryImage[0].imageFile} height="100" width="100" onError={errorImg} alt=""/>
                }
                <div>
                  <p>{item.tourInventoryTitle}</p>
                  <br />
                  <p>days {item.days} and night {item.night}</p>
                  <br />
                  <p>Included in package: {item.isIncludeAirline && 'Flight'} {item.isIncludeHotel && 'Hotel'}</p>
                </div>
              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default App;
