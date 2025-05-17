import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("patientToken");
      const { data } = await axios.get(
        "https://hospital-assignment-backend.onrender.com/api/v1/user/doctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const selectedDoctor = doctors.find(
        (doc) => doc._id === selectedDoctorId
      );

      if (!selectedDoctor) {
        toast.error("Please select a doctor");
        return;
      }

      const { firstName: doctorFirstName, lastName: doctorLastName } =
        selectedDoctor;

      const token = localStorage.getItem("patientToken");
      const { data } = await axios.post(
        "https://hospital-assignment-backend.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: Boolean(hasVisited),
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setSelectedDoctorId("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to make appointment");
    }
  };

  return (
    <div className="container my-5 p-5">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-3xl font-bold text-blue-700 mb-3">Appointment Form</h2>
        <p className="text-gray-600 mb-4">Fill the form to book your appointment.</p>

        <form onSubmit={handleAppointment}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName" className="form-label text-blue-600">First Name</label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="lastName" className="form-label text-blue-600">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="form-control"
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="email" className="form-label text-blue-600">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="phone" className="form-label text-blue-600">Mobile Number</label>
              <input
                id="phone"
                type="number"
                className="form-control"
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="nic" className="form-label text-blue-600">NIC</label>
              <input
                id="nic"
                type="number"
                className="form-control"
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="dob" className="form-label text-blue-600">Date of Birth</label>
              <input
                id="dob"
                type="date"
                className="form-control"
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="gender" className="form-label text-blue-600">Gender</label>
              <select
                id="gender"
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="appointmentDate" className="form-label text-blue-600">Appointment Date</label>
              <input
                id="appointmentDate"
                type="date"
                className="form-control"
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="department" className="form-label text-blue-600">Department</label>
              <select
                id="department"
                className="form-select"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setSelectedDoctorId("");
                }}
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
              >
                {departmentsArray.map((dept, idx) => (
                  <option value={dept} key={idx}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label htmlFor="doctor" className="form-label text-blue-600">Doctor</label>
              <select
                id="doctor"
                className="form-select"
                value={selectedDoctorId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedDoctorId(id);
                  const selected = doctors.find((doc) => doc._id === id);
                  if (selected) {
                    setDoctorFirstName(selected.firstName);
                    setDoctorLastName(selected.lastName);
                  }
                }}
                style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                disabled={!department}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doc) => doc.doctorDepartment === department)
                  .map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.firstName} {doc.lastName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="form-label text-blue-600">Address</label>
            <textarea
              id="address"
              className="form-control"
              rows={5}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-4">
            <input
              id="hasVisited"
              type="checkbox"
              className="form-check-input"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
            />
            <label className="form-check-label text-gray-700" htmlFor="hasVisited">
              Have you visited before?
            </label>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-0"
            >
              Get Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;

