import fees from '../data/fees.json' assert { type: "json" }
import orders from '../data/orders.json' assert { type: "json" }

export const getItemFeesByType = (type = '') => {

  if(type.length < 0) throw new Error('Invalid item type.')

  const item = fees.find( f => f.order_item_type === type)

  if(!item) throw new Error('Item type not found.')

  return item
}

export const getOrderByOrderNumber = (orderNumber = '') => {

  if(orderNumber.length < 0) throw new Error('Invalid order number.')

  const orderFound = orders.find( f => f.order_number === orderNumber)

  if(!orderFound) throw new Error('Order not found.')

  return orderFound
}


export const formatNumber = (price = 0) => {
  return (Math.round(price * 100) / 100).toFixed(2)
}
