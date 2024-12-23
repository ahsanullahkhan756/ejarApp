import { IMAGES } from "../constants";

export const ONBOARDING_DATA = [
    {
        image:IMAGES.car3,
        title:'Endless Option',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    {
        image:IMAGES.car3,
        title:'Go Like A Pro',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    {
        image:IMAGES.truck,
        title:'Get Out Of The Ordinary',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
] 

export const data = {
    categories: [
        { id: '1', name: 'Sedans', icon: IMAGES.car4 },
        { id: '2', name: 'SUVs', icon: IMAGES.car5},
        { id: '3', name: 'Trucks', icon:IMAGES.car6 },
        { id: '3', name: 'Coupes', icon:IMAGES.car7 },
        { id: '3', name: 'Convertibles', icon:IMAGES.car8 },
        { id: '3', name: 'Hatchbacks', icon:IMAGES.car4 },
        { id: '3', name: 'EVs', icon:IMAGES.car6 },
        { id: '3', name: 'Sports Cars', icon:IMAGES.car7 },
        // Add more categories here
    ],
    carsForRent: [
        { id: '1', name: 'Ford Truck 2021', price: 'AED 7,200/day', img: IMAGES.truck, date:2021 ,color:'White',status:'Automatic' },
        { id: '2', name: 'Mercedes Benz', price: 'AED 5,200/day', img: IMAGES.car2, date:2023 ,color:'Red',status:'Automatic' },
        { id: '3', name: 'Mercedes Benz', price: 'AED 9,200/day', img: IMAGES.car3,date:2022 ,color:'Black',status:'Automatic' },
    ],
    topRatedCars: [
        { id: '1', name: 'Car 1', img: IMAGES.truck, rating: '4.9' },
        { id: '2', name: 'Car 2', img: IMAGES.car2, rating: '4.9' },
        { id: '3', name: 'Car 3', img: IMAGES.car3, rating: '4.9' },
        { id: '4', name: 'Car 4', img: IMAGES.car1, rating: '4.9' },
    ],
    companies: [
        { id: '1', name: 'Thrifty', logo: 'https://example.com/thrifty.png' },
        { id: '2', name: 'Sixt', logo: 'https://example.com/sixt.png' },
        // Add more companies here
    ],
    reviews: [
        { id: '1', name: 'Rolem Ipsum', rating: '4.9', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
    ]
};

export const NOTIFICATION_DATA = [
    {
      title: 'Today',
      data: ['Suzuki', 'Hertz', 'SUVs'],
      des:'Torem ipsum dolor sit amet, consectetur'
    },
    {
      title: 'Yesterday',
      data: ['Trucks', 'Sports Cars', 'Convertibles'],
      des:'Torem ipsum dolor sit amet, consectetur'

    },
  ];
  export const spaceData = [
    { label: "GCC", value: "GCC" },
    { label: "GCC", value: "GCC" },
    { label: "ACC", value: "ACC" },
    { label: "BCC", value: "BCC" },
  ];
  export const fuekData = [
    { label: "Diesel", value: "Diesel" },
    { label: "Petrol", value: "Petrol" },
    { label: "Diesel", value: "Diesel" },
  ];
  export const munalData = [
    { label: "Manual", value: "Manual" },
    { label: "Automatic", value: "Automatic" },
  ];
  export const userData = [
    { label: "User", value: "User" },
  ];
  export const dealData = [
    { label: "Fair Dea", value: "Fair Dea" },
  ];
  export const cityData = [
    { label: "Dubai", value: "Dubai" },
    { label: "Abu Dhabi", value: "Abu Dhabi" },
    { label: "Sharjah", value: "Sharjah" },
    { label: "Ras Al Khaimah", value: "Ras Al Khaimah" },
  ];
  export const country = [
    { label: "Dubai", value: "1" },
    { label: "Saudia Arabia", value: "2" },
    { label: "USA", value: "2" },
    { label: "UK", value: "2" },
  ];
  export const gender = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ];