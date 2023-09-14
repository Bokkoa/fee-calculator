import { feesChallenge, mappingFeeChallenge } from './feesChallenge'

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

describe('Tests on part 1: Fees', () => { 

  test('should NOT add per-page fee if its just 1 page item order', () => { 
    // arrange
    const expected = [
      { type: 'Marriage License', price: 50 },
    ]

    // act
    const sut  = feesChallenge({
      order_number: "20230520000003",
      order_items: [
        {
          type: "Marriage License",
          pages: 1
        }
      ]
    })
    // assert
    expect(sut.items).toEqual(expected)
   })
  test('Given the mock data should calculate the prices of items', () => { 

    // arrange
    const expected = [
      { type: 'Marriage License', price: 50 },
      { type: 'Marriage License', price: 147.5 }
    ]

    // act
    const sut  = feesChallenge({
      order_number: "777",
      order_items: [
        {
          type: "Marriage License",
          pages: 1
        },
        {
          type: "Marriage License",
          pages: 40
        }
      ]
    })

    // assert
    expect(sut.items).toEqual(expected)

  })



  test('should print the output data', () => {

    const spy = jest.spyOn(console, 'log')
    
    mappingFeeChallenge([{
      order_number: '20230520000003',
      items: [
        { type: 'Marriage License', price: 50 },
        { type: 'Marriage License', price: 147.5 }
      ],
      total: 197.5
    }])

    expect(spy).toHaveBeenCalled()

  })

})
