import 'colors'
import { formatNumber, getItemFeesByType } from './common.js'
// The file fees.json describes fees that are applied to different types of items in an order. 
// Each type of item in a order can have one or more fees associated with it. 
// The total cost for the order item is the aggregate of all of fees associated with that item. 
// There are different types of fees. Flat fees are simply a single charge. 
// Per-page fees add an additional fee on top of a flat fee for each page after the first.

const feeType = {
  FLAT_TYPE: 'flat',
  PER_PAGE_TYPE: 'per-page'
}

export const feesChallenge = ({ order_number, order_items}) => {

    const output = {
      order_number: order_number,
      items: [],
      total: 0
    }

    for ( let item of order_items){
      const price = calculateFeesByOrderItem(item)
      output.total += price
      output.items.push({
        type: item.type,
        price
      })
    }

    return output
}


export const mappingFeeChallenge = (processedFees) => {
  for(let fee of processedFees){
    console.log(`${'Order ID'.blue}: ${fee.order_number}`)
    fee.items.map(i => console.log(`   Order item ${i.type}: \$${formatNumber(i.price)}`))
    console.log(`   Order total: \$${formatNumber(fee.total)}`.yellow)
  }
}



// Flat fees are simply a single charge. Per-page fees add an additional fee on top of a flat fee for each page after the first.
export const calculateFeesByOrderItem = (orderItem = { type: '', pages: 0}) => {
  const { fees } = getItemFeesByType(orderItem.type)

  const isAbleToAdditionalFee = () => orderItem.pages > 1
  const isAdditionalFee = (type) =>  type === feeType.PER_PAGE_TYPE

  let price = 0
  
  for( let fee of fees ){
    if(isAdditionalFee(fee.type)){
      if(isAbleToAdditionalFee()) { 
        price += Number(fee.amount) * (orderItem.pages - 1)
      }
      continue
    }
    price += Number(fee.amount)
  }

  return price
}
