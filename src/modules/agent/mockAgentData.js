// src/modules/agent/mockAgentData.js

export const availableTools = [
  {
    name: "fetch_weather",
    description: "Retrieves real-time weather conditions for a given city.",
    parameters: { type: "object", properties: { city: "string" } }
  },
  {
    name: "book_ticket",
    description: "Reserves a travel ticket to a destination if conditions are met.",
    parameters: { type: "object", properties: { destination: "string", type: "flight | train" } }
  },
  {
    name: "currency_converter",
    description: "Converts amounts between USD, INR, and EUR using live rates.",
    parameters: { type: "object", properties: { amount: "number", to: "string" } }
  }
];

export const agentQueries = [
  {
    id: "query_1",
    text: "Is it raining in Hampi? If it's clear, book a flight there.",
    steps: [
      {
        step: 1,
        type: "thought",
        message: "The user wants to know the weather in Hampi and potentially book a flight. I need to check the weather first using fetch_weather.",
        toolCall: null
      },
      {
        step: 2,
        type: "tool_call",
        message: "Calling external API...",
        toolCall: { name: "fetch_weather", args: { city: "Hampi" } }
      },
      {
        step: 3,
        type: "observation",
        message: "Tool Output received.",
        toolOutput: { status: "Clear", temp: "28°C", humidity: "45%" }
      },
      {
        step: 4,
        type: "thought",
        message: "The weather in Hampi is Clear (sunny). The condition to book a flight is met. I will now call the book_ticket tool.",
        toolCall: null
      },
      {
        step: 5,
        type: "tool_call",
        message: "Executing booking reservation system...",
        toolCall: { name: "book_ticket", args: { destination: "Hampi", type: "flight" } }
      },
      {
        step: 6,
        type: "observation",
        message: "Tool Output received.",
        toolOutput: { booking_id: "HAM-99281", status: "Confirmed", class: "Economy" }
      },
      {
        step: 7,
        type: "final_answer",
        message: "I verified that the weather in Hampi is currently Clear and 28°C. As requested, I have successfully booked your flight! Your booking ID is HAM-99281.",
        toolCall: null
      }
    ]
  },
  {
    id: "query_2",
    text: "Convert $150 USD to INR and tell me if I can afford a 12,000 INR camera lens.",
    steps: [
      {
        step: 1,
        type: "thought",
        message: "I need to convert $150 USD to INR to evaluate if the user has enough money for a 12,000 INR purchase.",
        toolCall: null
      },
      {
        step: 2,
        type: "tool_call",
        message: "Calculating live conversion rate...",
        toolCall: { name: "currency_converter", args: { amount: 150, to: "INR" } }
      },
      {
        step: 3,
        type: "observation",
        message: "Tool Output received.",
        toolOutput: { exchange_rate: 83.5, total_inr: 12525 }
      },
      {
        step: 4,
        type: "final_answer",
        message: "Converting $150 USD gives you approximately 12,525 INR (at an exchange rate of 83.5). Since your budget (12,525 INR) is higher than the cost of the camera lens (12,000 INR), yes, you can afford it!",
        toolCall: null
      }
    ]
  }
];