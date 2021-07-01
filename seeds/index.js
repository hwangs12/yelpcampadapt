const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

//connects mongoose and js to mongodb 
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 =Math.floor(Math.random() * 1000)
        const camp = new Campground ({
            author: '60d47d72c084ea3e0c9029cc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type : "Point", 
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/honeyiamhome/image/upload/v1624977939/YelpCamp/elkqphsomdeabcuoxsi3.jpg',
                filename: 'YelpCamp/elkqphsomdeabcuoxsi3'
                },
                {
                url: 'https://res.cloudinary.com/honeyiamhome/image/upload/v1624940480/YelpCamp/lng8rl3yvqq5d3ogaas2.jpg',
                filename: 'YelpCamp/lng8rl3yvqq5d3ogaas2'
                }
            ],
            description: 'campcapmcampcmpampcmpacmpmacpmacpmacp!!!',
            price: `${random1000}`
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})