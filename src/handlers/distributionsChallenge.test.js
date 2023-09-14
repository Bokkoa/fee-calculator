import { distributionsChallenge, mappingDistributionsChallenge } from './distributionsChallenge'


jest.mock('../data/fees.json', () => [
  {
    "order_item_type": "Marriage License",
    "fees": [
      {
        "name": "License Fee",
        "amount": "50.00",
        "type": "flat"
      },
      {
        "name": "License Fee",
        "amount": "2.50",
        "type": "per-page"
      }
    ],
    "distributions": [
      {
        "name": "County Marriage Fund",
        "amount": "30.00"
      },
      {
        "name": "State Marriage Fund",
        "amount": "20.00"
      }
    ]
  }
])
jest.mock('../data/orders.json', () => [
  {
    "order_date": "5/20/2023",
    "order_number": "20230520000003",
    "order_items": [
      {
        "type": "Marriage License",
        "pages": 1
      }
    ]
  }
])

describe('Tests on part 2: Distributions', () => { 

  test('should NOT have Other fund property', () => { 

  const otherFundIndex = 'Other'
  const mockProcessedFee = {
    order_number: '777',
    items: [
        { type: 'Marriage License', price: 50 },
      ],
      total: 50
    }
  const sut = distributionsChallenge(mockProcessedFee)

  const distributionsSum = Object.keys(sut.distributions).reduce((accumulator, index) => {
    return accumulator + sut.distributions[index]
  }, 0)


  expect(sut.distributions[otherFundIndex]).toBe(undefined)
  expect(distributionsSum).toBe(mockProcessedFee.total)

})


  test('should calculate the distribution of total and the rest of funds', () => { 

    const otherFundIndex = 'Other'
  
    const mockProcessedFee = {
      order_number: '777',
      items: [
          { type: 'Marriage License', price: 50 },
          { type: 'Marriage License', price: 147.5 }
        ],
        total: 197.5
      }
    const sut = distributionsChallenge(mockProcessedFee)
  
      const distributionsSum = Object.keys(sut.distributions).reduce((accumulator, index) => {
        return accumulator + sut.distributions[index]
      }, 0)

    expect(sut.distributions[otherFundIndex]).toBeDefined()
    expect(distributionsSum).toBe(mockProcessedFee.total)
  
    })


    
  test('should print the output data', () => {

    const spy = jest.spyOn(console, 'log')
    
    mappingDistributionsChallenge([ {
      order_number: '777',
      distributions: {
        'County Marriage Fund': 60,
        'State Marriage Fund': 40,
        Other: 97.5
      }
    }])

    expect(spy).toHaveBeenCalled()

  })


})