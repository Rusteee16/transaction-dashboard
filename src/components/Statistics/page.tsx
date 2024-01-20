import React from 'react'

const Statistics = ({statData}: any) => {
  return (
    <div className='grid grid-cols-2 gap-4 place-content-center w-2/3 p-24 text-4xl text-orange-300 font-bold border-2 border-orange-200'>
        <p>Total Sale:</p>
        <p className=' text-orange-600'>{statData.totalAmount}</p>
        <p>Total Sold Item:</p>
        <p className=' text-orange-600'>{statData.totalSaleTransactions}</p>
        <p>Total Not Sold Item:</p>
        <p className=' text-orange-600'>{statData.totalNonSaleTransactions}</p>
    </div>
  )
}

export default Statistics