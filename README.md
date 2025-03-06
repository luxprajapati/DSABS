# DSABS [Doctor search & Appointment Booking system]

Doctor search & Appointment Booking system is a fully functional Booking Platform that enables patients to search doctor by the specialization of the doctor. Doctor can create there profile and the doctor can create slot for appointement so the patients search doctor and they find the slot and if patient want to book the slot then they can book that slot.The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

## Introduction

The Doctor Appointment Booking System is a MERN stack-based web application designed to streamline the process of scheduling and managing doctor appointments. This platform provides an intuitive and user-friendly experience for both patients and doctors, enabling seamless appointment booking, availability management, and real-time notifications.

The system ensures efficient role-based authentication, allowing doctors to set their availability and manage appointments, while patients can search for doctors, book consultations, and receive email notifications for confirmations or cancellations.

## System Architecture

The Doctor Appointment Booking System platform consists of three main components: the front-end, the back-end, and the database. The platform follows a client-server architecture, with the front-end serving as the client and the back-end and database serving as the server.

### Front-end

The front-end of the platform is built using ReactJS, which allows for the creation of dynamic and responsive user interfaces, crucial for providing an engaging learning experience to students. The front-end communicates with the back-end using RESTful API calls.

#### Front End Pages

For Patients:

- **Booked Appointments:** A patients can find the doctor and they can booked appointment with the doctor.
- **Search Doctor:** A patients can search the doctor by there specialization like there is a doctor who has done specialization  in Dermatologist then patient can search the doctor with that.
- **View Doctor Information:** Patients are allowed to view the doctor detail like specialization, city, consultation location etc.
- **User Edit Details:** Allows patients to edit their account details.

For Doctors:

- **Dashboard:** Offers an overview of the there Appointments with the patients.
- **Profile Update:** Doctor are allowed to update there profile and change the location for there consultation.
- **Slot Creation:** Allows Doctors to create a slot for future, such that Patients can booked the slots.

#### Front-end Tools and Libraries

To build the front-end, we use frameworks and libraries such as `ReactJS`, `CSS`, and `Tailwind` for styling, and `Redux` for state management.

### Back-end

The back-end of the platform is built using NodeJS and ExpressJS, providing APIs for the front-end to consume. These APIs include functionalities such as user authentication, course creation, and course consumption. The back-end also handles the logic for processing and storing the course content and user data.

#### Back-end Features

- **User Authentication and Authorization:** Patients and Doctors can sign up and log in to the platform using their email addresses and passwords. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- **Doctor Profile Management :** Doctors can set their specialization, experience, and working hours.
- **Search & Filters:** Patients can find doctors by specialization, name, and location.
- **Concurrency Handling:** Prevents double bookings using MongoDB transactions.
- **Email Notifications:** Sends appointment confirmation/cancellation emails via Nodemailer.

#### Back-end Frameworks, Libraries, and Tools

The back-end of CodeNotion uses various frameworks, libraries, and tools to ensure its functionality and performance, including:

- **Node.js:** Used as the primary framework for the back-end.
- **Express.js:** Used as a web application framework, providing a range of features and tools for building web applications.
- **MongoDB:** Used as the primary database, providing a flexible and scalable data storage solution.
- **JWT (JSON Web Tokens):** Used for authentication and authorization, providing a secure and reliable way to manage user credentials.
- **Bcrypt:** Used for password hashing, adding an extra layer of security to user data.
- **Mongoose:** Used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.

#### Data Models and Database Schema

The back-end of CodeNotion uses several data models and database schemas to manage data, including:

- **User Schema:** Includes fields such as firstName, lastName, email, password, etc. for each patients.
- **Profile Schema:** Includes fields such as specilization, city, state, additionaldetails, etc for each doctor.


### Database

The database for the platform is built using MongoDB, a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the course content, user data, and other relevant information related to the platform.

### Architecture Diagram

Below is a high-level diagram that illustrates the architecture of the CodeNotion EdTech platform:

![Architecture](images/architecture.png)

## Installation

1. Clone the repository: `git clone https://github.com/luxprajapati/DSABS.git`
2. Navigate to the project directory: `cd DSABS`
3. Install dependencies: `npm install`

## Contact

For any inquiries or support, please contact us at luxprajapati81@gmail.com.
