

import orders from './data/orders.json' assert { type: "json" }

import { feesChallenge, mappingFeeChallenge } from './handlers/feesChallenge.js'
import { distributionsChallenge, mappingDistributionsChallenge } from './handlers/distributionsChallenge.js'

const feesOutput = []
const distributionsOutput = []

orders.forEach( order => {
  const fee = feesChallenge(order)
  feesOutput.push(fee)
  distributionsOutput.push(distributionsChallenge(fee))
})

mappingFeeChallenge(feesOutput)
mappingDistributionsChallenge(distributionsOutput)
