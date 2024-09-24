import { IMAGES } from "../constants";

export const ONBOARDING_DATA = [
    {
        image:IMAGES.car1,
        title:'Endless Option',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    {
        image:IMAGES.car2,
        title:'Go Like A Pro',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
    {
        image:IMAGES.car3,
        title:'Get Out Of The Ordinary',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
    },
] 

export const data = {
    categories: [
        { id: '1', name: 'Sedans', icon: IMAGES.car4 },
        { id: '2', name: 'SUVs', icon: IMAGES.car5},
        { id: '3', name: 'Trucks', icon:IMAGES.car6 },
        { id: '3', name: 'Trucks', icon:IMAGES.car7 },
        { id: '3', name: 'Trucks', icon:IMAGES.car8 },
        { id: '3', name: 'Trucks', icon:IMAGES.car4 },
        { id: '3', name: 'Trucks', icon:IMAGES.car6 },
        { id: '3', name: 'Trucks', icon:IMAGES.car7 },
        // Add more categories here
    ],
    carsForRent: [
        { id: '1', name: 'Ford Truck 2021', price: 'AED 7,200', img: IMAGES.truck, date:2021 ,color:'White',status:'Automatic' },
        { id: '2', name: 'Mercedes Benz', price: 'AED 7,200', img: IMAGES.car2, date:2023 ,color:'Red',status:'Automatic' },
        { id: '3', name: 'Mercedes Benz', price: 'AED 7,200', img: IMAGES.car1,date:2022 ,color:'Black',status:'Automatic' },
        { id: '3', name: 'Mercedes Benz', price: 'AED 7,200', img: IMAGES.car4,date:2022 ,color:'Black',status:'Automatic' },
        { id: '3', name: 'Mercedes Benz', price: 'AED 7,200', img: IMAGES.car7,date:2022 ,color:'Black',status:'Automatic' },
    ],
    topRatedCars: [
        { id: '1', name: 'Car 1', img: IMAGES.car1, rating: '4.9' },
        { id: '2', name: 'Car 2', img: IMAGES.car2, rating: '4.9' },
        { id: '2', name: 'Car 2', img: IMAGES.car2, rating: '4.9' },
        { id: '2', name: 'Car 2', img: IMAGES.car2, rating: '4.9' },
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
    { label: "GCC", value: "1" },
    { label: "GCC", value: "2" },
    { label: "ACC", value: "3" },
    { label: "BCC", value: "4" },
  ];
  export const fuekData = [
    { label: "Diesel", value: "1" },
    { label: "Petrol", value: "2" },
    { label: "Diesel", value: "3" },
  ];
  export const munalData = [
    { label: "Manual", value: "1" },
    { label: "Automatic", value: "2" },
  ];
  export const userData = [
    { label: "User", value: "1" },
    { label: "UnUser", value: "2" },
  ];
  export const dealData = [
    { label: "Fair Dea", value: "1" },
    { label: "Fair Dea", value: "2" },
  ];