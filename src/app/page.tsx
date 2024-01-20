"use client"

import BarChart from '@/components/BarChart/page';
import Statistics from '@/components/Statistics/page';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const monthMap = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [barData, setBarData] = useState([]);
  const [statData, setStatData] = useState({});
  // const [pieData, setPieData] = useState([]);
  const [monthS, setMonthS] = useState("March");
  const [month, setMonth] = useState(3);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(1);
  const [transactions, setTransactions] = useState([])
  const [noOfPages, setNoOfPages] = useState(1);

  const getCompleteStat = async () => {
    try {
      const completeStat = await axios.get("/api/statisticsdata", {
        params:{
          month: month
      }});
      
      setBarData(completeStat.data.barData);
      setStatData(completeStat.data.statData);
      // setPieData(completeStat.data.pieData);
      console.log("Fetched statistics data.")
    } catch (error) {
      console.error('Error fetching statistics and bar chart data:', error);
    }
    
  }

  const getTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions", {
        params:{
          page: page-1,
          search: search,
          month: month
        }
      });
      const tra = response.data;
      
      setTransactions(tra.transactions);
      setTotal(tra.total);
      getNoOfPages(tra.total);
      console.log("Faetched all transactions.");
      
    } catch (error) {
      console.error('Error fetching statistics and bar chart data:', error);
    }
  } 

  function getNoOfPages(tra: number){
    if (tra % 10 === 0){
      setNoOfPages(Math.floor(tra/10));
    } else {
      setNoOfPages(Math.floor(tra/10)+1);
    }
  }

  function getMonthFromString(mon: String){
    const m = Number(new Date(Date.parse(mon +" 1, 2012")).getMonth()+1);
    
    return m;
  }

  const initializeDatabase = async () => {
    try {
      const res = await axios.get("/api/initializedb");

      console.log('Data stored in the database successfully');
    } catch (error) {
      console.error('Error storing data in the database:', error);
    }
  };

  useEffect(() => {
    initializeDatabase();
    getCompleteStat();
    getTransactions();
  }, []);

  useEffect(() => {
    setMonth(getMonthFromString(monthS));
  }, [monthS]);

  useEffect(() => {
    getCompleteStat();
    getTransactions();
    setPage(1);
  }, [month]);

  useEffect(() => {
    getTransactions();
    setPage(1);
  }, [search])

  useEffect(() => {
    getTransactions();
  }, [page])

  return (
    <div className='bg-base-200'>
      <div className='bg-base-200'>
        <div className="hero min-h-60 border-b-2 border-orange-600 bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w">
              <h1 className="text-6xl text-orange-300 font-bold">Transaction Dashboard</h1>
            </div>
          </div>
        </div>
        <div >
          <div className='flex flex-col mt-2'>
            <div className='flex justify-between mx-14 p-3 text-center'>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="relative m-0 block w-3/12 min-w-0 rounded border-2 border-solid border-orange-300 px-3 py-[0.25rem] text-gray-50"
                id="exampleSearch"
                placeholder="Search Item" />
              <select value={monthS} onChange={(e) => setMonthS(e.currentTarget.value)} className="w-52 min-w-0 border-2 border-solid border-orange-300 dropdown p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box ">
                {monthMap.map((mo) => (
                  <option key={mo} value={mo}>
                    {mo}
                  </option>
                ))}
              </select>
            </div>
            <div className=' mt-12 mx-12 p-3'>
              <table className="table bg-slate-700">
              {/* head */}
                <thead className=' font-extrabold text-sm text-teal-50'>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Sold</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody className=' text-base text-orange-200'>
                  {transactions.map((ts: any) => (
                  <tr key={ts.id}>
                    <td>{ts.id}</td>
                    <td>{ts.title}</td>
                    <td>{ts.description}</td>
                    <td>{ts.price}</td>
                    <td>{ts.category}</td>
                    <td>{ts.sold === false ? "False" : "True"}</td>
                    <td className=' bg-white'>
                      <div className="avatar">
                        <div className=" w-16 h-16">
                          <img src={ts.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>          
              </table>
            </div>
            <div className='flex justify-between mx-14 p-3'>
              <div className='mt-2 badge text-sm font-semibold text-center text-orange-100'>
                <p>Page No: {page} / {noOfPages}</p>
              </div>
              <div className="join grid grid-cols-2">
                <button className="join-item btn btn-outline border-orange-100 hover:bg-orange-100" onClick={() => setPage(page-1)} disabled={page === 1}>Previous</button>
                <button className="join-item btn btn-outline border-orange-100 hover:bg-orange-100" onClick={() => setPage(page+1)} disabled={page+1 > noOfPages}>Next</button>
              </div>
              <div className='mt-2 badge text-sm font-semibold text-orange-100'>
                <p>Per Page: 10</p>
              </div>
            </div>
          </div>
        </div>
        <div className=' mt-28'>
          <div className='flex mt-2 mx-14 rounded h-96'>
            <div className=' text-center py-24 px-4 w-1/3 text-slate-700 bg-orange-200'>
              <h2 className=' text-7xl font-bold'>Statistics for {monthS}</h2>
            </div>
            <Statistics statData={statData}></Statistics>
          </div>
        </div>
        <div className=' mt-28'>
          <div className='flex flex-col mt-2 mx-14 p-3 border-2 border-orange-200 rounded h-auto text-center'>
            <h2 className=' text-7xl text-orange-600 py-12 font-bold'>BarChart for {monthS}</h2>
            <BarChart apiData={barData}></BarChart>
          </div>
        </div>
        <footer className="footer flex items-center p-14 justify-center mt-12 border-t-2 border-orange-600">
          <div className="items-center grid-flow-col text-orange-100">
            <p>Copyright © 2024 - All right reserved</p>
          </div> 
        </footer>
      </div>
    </div>
  )
}

export default Dashboard