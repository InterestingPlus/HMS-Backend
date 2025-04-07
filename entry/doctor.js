const Doctor = require("../models/doctor.model");

// Doctor.create({
//   username: "", // Email
//   password: "",
//   name: "",
//   age: 0,
//   gender: "", // "male" / "female"
//   specialization: "",
//   contact: 1234567890,
//   address: {
//     country: "", // "India"
//     state: "", // "Gujarat"
//     city: "", // "Ahmedabad"
//   },
//   availability: [
//     {
//       Monday: ["00:00"], // 24 hour Format
//       Tuesday: ["00:00"], // 24 hour Format
//       Wednesday: ["00:00"], // 24 hour Format
//       Thursday: ["00:00"], // 24 hour Format
//       Friday: ["00:00"], // 24 hour Format
//       Saturday: ["00:00"], // 24 hour Format
//       Sunday: ["00:00"], // 24 hour Format
//     },
//   ],
//   consultationCharge: 0, // Appointment Fee
// });

module.exports.insertDoctors = () => {
  Doctor.create([
    {
      username: "drsharma123@gmail.com",
      password: "pass123",
      name: "Rajesh Sharma",
      age: 45,
      gender: "male",
      specialization: "Cardiologist",
      contact: 9876543210,
      address: {
        country: "India",
        state: "Maharashtra",
        city: "Mumbai",
      },
      availability: [
        {
          Monday: ["09:00", "15:00"],
          Tuesday: ["10:00", "16:00"],
          Wednesday: ["09:30", "14:30"],
          Thursday: ["11:00", "17:00"],
          Friday: ["10:00", "16:30"],
          Saturday: ["09:00", "12:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 1000,
    },
    {
      username: "drpatel456@gmail.com",
      password: "pass123",
      name: "Sneha Patel",
      age: 38,
      gender: "female",
      specialization: "Dermatologist",
      contact: 9123456789,
      address: {
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
      },
      availability: [
        {
          Monday: ["10:00", "14:00"],
          Tuesday: ["11:00", "15:00"],
          Wednesday: ["10:30", "16:30"],
          Thursday: ["09:30", "12:30"],
          Friday: ["11:00", "17:00"],
          Saturday: ["09:00", "13:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 800,
    },
    {
      username: "drkhan789@gmail.com",
      password: "pass123",
      name: "Imran Khan",
      age: 50,
      gender: "male",
      specialization: "Orthopedic Surgeon",
      contact: 9234567890,
      address: {
        country: "India",
        state: "Delhi",
        city: "New Delhi",
      },
      availability: [
        {
          Monday: ["08:00", "13:00"],
          Tuesday: ["10:00", "14:00"],
          Wednesday: ["09:00", "15:00"],
          Thursday: ["12:00", "18:00"],
          Friday: ["09:30", "13:30"],
          Saturday: ["10:00", "12:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 1200,
    },
    {
      username: "drjoshi567@gmail.com",
      password: "pass123",
      name: "Priya Joshi",
      age: 42,
      gender: "female",
      specialization: "Pediatrician",
      contact: 9345678901,
      address: {
        country: "India",
        state: "Karnataka",
        city: "Bangalore",
      },
      availability: [
        {
          Monday: ["09:30", "14:30"],
          Tuesday: ["10:00", "15:00"],
          Wednesday: ["09:00", "13:00"],
          Thursday: ["10:30", "16:00"],
          Friday: ["11:00", "17:30"],
          Saturday: ["08:30", "12:30"],
          Sunday: [],
        },
      ],
      consultationCharge: 700,
    },
    {
      username: "drmehta234@gmail.com",
      password: "pass123",
      name: "Ankit Mehta",
      age: 35,
      gender: "male",
      specialization: "Dentist",
      contact: 9456789012,
      address: {
        country: "India",
        state: "Rajasthan",
        city: "Jaipur",
      },
      availability: [
        {
          Monday: ["10:00", "13:00"],
          Tuesday: ["09:30", "12:30"],
          Wednesday: ["10:00", "14:00"],
          Thursday: ["09:00", "12:00"],
          Friday: ["10:30", "15:00"],
          Saturday: ["10:00", "13:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 500,
    },

    {
      username: "dr.rajeshsharma@gmail.com",
      password: "pass123",
      name: "Rajesh Sharma",
      age: 45,
      gender: "male",
      specialization: "Cardiologist",
      contact: 9876543210,
      address: {
        country: "India",
        state: "Maharashtra",
        city: "Mumbai",
      },
      availability: [
        {
          Monday: ["09:00", "12:00", "15:00", "18:00"],
          Tuesday: ["10:00", "13:00", "16:00", "19:00"],
          Wednesday: ["09:30", "12:30", "14:00", "17:00"],
          Thursday: ["11:00", "14:00", "17:00", "20:00"],
          Friday: ["10:00", "13:00", "16:00", "19:00"],
          Saturday: ["09:00", "12:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 1000,
    },
    {
      username: "dr.snehapatel@gmail.com",
      password: "pass123",
      name: "Sneha Patel",
      age: 38,
      gender: "female",
      specialization: "Dermatologist",
      contact: 9123456789,
      address: {
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
      },
      availability: [
        {
          Monday: ["10:00", "13:00", "16:00", "19:00"],
          Tuesday: ["09:30", "12:30", "14:30", "17:30"],
          Wednesday: ["10:30", "13:30", "15:00", "18:00"],
          Thursday: ["09:30", "12:30", "15:00", "17:30"],
          Friday: ["11:00", "14:00", "17:00", "20:00"],
          Saturday: ["09:00", "12:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 800,
    },
    {
      username: "dr.imrankhan@gmail.com",
      password: "pass123",
      name: "Imran Khan",
      age: 50,
      gender: "male",
      specialization: "Orthopedic Surgeon",
      contact: 9234567890,
      address: {
        country: "India",
        state: "Delhi",
        city: "New Delhi",
      },
      availability: [
        {
          Monday: ["08:00", "12:00", "14:00", "18:00"],
          Tuesday: ["09:30", "12:30", "15:30", "19:30"],
          Wednesday: ["08:00", "12:00", "13:30", "16:30"],
          Thursday: ["12:00", "15:00", "17:00", "20:00"],
          Friday: ["09:30", "12:30", "14:30", "18:00"],
          Saturday: ["10:00", "12:30"],
          Sunday: [],
        },
      ],
      consultationCharge: 1200,
    },
    {
      username: "dr.priyajoshi@gmail.com",
      password: "pass123",
      name: "Priya Joshi",
      age: 42,
      gender: "female",
      specialization: "Pediatrician",
      contact: 9345678901,
      address: {
        country: "India",
        state: "Karnataka",
        city: "Bangalore",
      },
      availability: [
        {
          Monday: ["09:00", "12:00", "14:00", "17:00"],
          Tuesday: ["10:00", "13:00", "15:00", "18:00"],
          Wednesday: ["09:30", "12:30", "14:30", "17:30"],
          Thursday: ["10:30", "13:30", "16:00", "19:00"],
          Friday: ["11:00", "14:00", "17:00", "20:00"],
          Saturday: ["08:30", "12:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 700,
    },
    {
      username: "dr.ankitmehta@gmail.com",
      password: "pass123",
      name: "Ankit Mehta",
      age: 35,
      gender: "male",
      specialization: "Dentist",
      contact: 9456789012,
      address: {
        country: "India",
        state: "Rajasthan",
        city: "Jaipur",
      },
      availability: [
        {
          Monday: ["09:00", "11:00", "14:00", "16:00"],
          Tuesday: ["10:00", "12:00", "15:00", "17:00"],
          Wednesday: ["09:30", "11:30", "14:30", "16:30"],
          Thursday: ["10:30", "12:30", "15:30", "17:30"],
          Friday: ["11:00", "13:00", "16:00", "18:00"],
          Saturday: ["10:00", "12:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 500,
    },
    {
      username: "dr.amitverma@gmail.com",
      password: "pass123",
      name: "Amit Verma",
      age: 47,
      gender: "male",
      specialization: "Neurologist",
      contact: 9871234560,
      address: {
        country: "India",
        state: "Uttar Pradesh",
        city: "Lucknow",
      },
      availability: [
        {
          Monday: ["08:30", "12:30", "14:00", "17:30"],
          Tuesday: ["09:00", "13:00", "15:00", "18:00"],
          Wednesday: ["08:00", "12:00", "14:00", "17:00"],
          Thursday: ["10:00", "14:00", "16:00", "19:00"],
          Friday: ["09:30", "13:30", "15:30", "18:30"],
          Saturday: ["09:00", "12:00"],
          Sunday: [],
        },
      ],
      consultationCharge: 1300,
    },
  ])
    .then(() => {
      console.log(
        "Doctors have been successfully created and added to the database."
      );
    })
    .catch((error) => {
      console.error("Error adding doctors:", error);
    });
};
