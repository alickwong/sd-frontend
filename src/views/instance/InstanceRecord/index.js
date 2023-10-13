import React from 'react'
import reducer from './store'
import {injectReducer} from 'store'
import TransactionHistory from './components/TransactionHistory'

injectReducer('instanceRecordList', reducer)

const Wallets = () => {
  return (
    <div className="flex flex-col gap-4">
      <TransactionHistory/>

    </div>

  )
}

export default Wallets
