import 'colors'
import { formatNumber, getItemFeesByType } from './common.js'

// Each fee has a set of funds associated with it. 
// The money associated with each fee is split among the funds based on the amount specified in the distribution. 
// Any extra money associated with the order that isn't allocated to a fund should be assigned to a generic "Other" fund.
export const distributionsChallenge = (fee) => {
   
    const distributions = getDistributionsByOrder(fee)
    const distributionsSum = Object.keys(distributions).reduce((accumulator, index) => {
      return accumulator + distributions[index]
    }, 0)

    const otherFund = fee.total - distributionsSum

    const output = {
      order_number: fee.order_number,
      distributions: {
        ...distributions
      }
    }
  
    // append other fund just if exists
    if(otherFund > 0) output.distributions = { ...output.distributions, 'Other': otherFund}
    
    return output

}


export const mappingDistributionsChallenge = (processedDistributions) => {
  for(let dist of processedDistributions){
    console.log(`${'Order ID'.blue}: ${dist.order_number}`)
    for(let d in dist.distributions) {
      console.log(`   Fund - ${d}: \$${formatNumber(dist.distributions[d])}`)
    }
  }
}


export const getDistributionsByOrder = (order = {items: [], order_number: ''}) => {

  let distributions = {}

  for(let item of order.items){

    const itemFee = getItemFeesByType(item.type)

    itemFee.distributions.forEach((distribution) => {

      distributions[distribution.name]
      ?
        distributions[distribution.name] += Number(distribution.amount)
      :
        distributions[distribution.name] = Number(distribution.amount)
    })

  }

  return distributions
}