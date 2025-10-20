import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../pages/Footer";
import { motion } from "framer-motion";
import { Users, UserPlus, UserCog, Clock, Trash2, Edit } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminPanel() {
  const [view, setView] = useState("dashboard");
  const [surveyors, setSurveyors] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialSurveyorState = {
    name: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    address: "",
    companyName: "",
    companyAddress: "",
    licenseNumber: "",
    experience: "",
    price: "",
    education: "",
    training: "",
    profileImage: null,
  };

  const initialConsultantState = {
    name: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    education: "",
    experience: "",
    price: "",
    licenseNumber: "",
    profileImage: null,
  };

  const [newSurveyor, setNewSurveyor] = useState(initialSurveyorState);
  const [newConsultant, setNewConsultant] = useState(initialConsultantState);

  const [editSurveyorId, setEditSurveyorId] = useState(null);
  const [editConsultantId, setEditConsultantId] = useState(null);

  const stats = [
    { title: "Total Surveyors", value: surveyors.length, icon: <Users size={28} />, color: "#7ED957" },
    { title: "Total Consultants", value: consultants.length, icon: <UserCog size={28} />, color: "#7ED957" },
    { title: "Total Users", value: 0, icon: <UserPlus size={28} />, color: "#7ED957" },
    { title: "Pending Requests", value: 0, icon: <Clock size={28} />, color: "#7ED957" },
  ];

  useEffect(() => {
    fetchSurveyors();
    fetchConsultants();
  }, []);

  const fetchSurveyors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/surveyors");
      setSurveyors(res.data);
    } catch (err) {
      toast.error("Error fetching surveyors");
    } finally {
      setLoading(false);
    }
  };

  const fetchConsultants = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/admin/consultants");
      setConsultants(res.data);
    } catch (err) {
      toast.error("Error fetching consultants");
    } finally {
      setLoading(false);
    }
  };

  // ================= Add / Edit Surveyor =================
  const submitSurveyor = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(newSurveyor).forEach((key) => {
        formData.append(key, newSurveyor[key] !== null ? newSurveyor[key] : "");
      });

      if (editSurveyorId) {
        await axios.put(`http://localhost:5000/api/admin/update-surveyor/${editSurveyorId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Surveyor updated successfully");
        setEditSurveyorId(null);
      } else {
        await axios.post("http://localhost:5000/api/admin/add-surveyor", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Surveyor added successfully");
      }

      setNewSurveyor(initialSurveyorState);
      fetchSurveyors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving surveyor");
    } finally {
      setLoading(false);
    }
  };

  const editSurveyor = (surveyor) => {
    setEditSurveyorId(surveyor._id);
    setNewSurveyor({
      ...surveyor,
      profileImage: null,
    });
  };

  const deleteSurveyor = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
      toast.success("Surveyor deleted successfully");
      fetchSurveyors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting surveyor");
    } finally {
      setLoading(false);
    }
  };

  // ================= Add / Edit Consultant =================
  const submitConsultant = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(newConsultant).forEach((key) => {
        formData.append(key, newConsultant[key] !== null ? newConsultant[key] : "");
      });

      if (editConsultantId) {
        await axios.put(`http://localhost:5000/api/admin/update-consultant/${editConsultantId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Consultant updated successfully");
        setEditConsultantId(null);
      } else {
        await axios.post("http://localhost:5000/api/admin/add-consultant", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Consultant added successfully");
      }

      setNewConsultant(initialConsultantState);
      fetchConsultants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving consultant");
    } finally {
      setLoading(false);
    }
  };

  const editConsultant = (consultant) => {
    setEditConsultantId(consultant._id);
    setNewConsultant({
      ...consultant,
      profileImage: null,
    });
  };

  const deleteConsultant = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/admin/delete/${id}`);
      toast.success("Consultant deleted successfully");
      fetchConsultants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting consultant");
    } finally {
      setLoading(false);
    }
  };

  // ================= Render Forms =================
  const renderSurveyorForm = () => (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{editSurveyorId ? "Edit Surveyor" : "Add New Surveyor"}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(initialSurveyorState).map((key) =>
          key === "profileImage" ? (
            <input
              key={key}
              type="file"
              accept="image/*"
              onChange={(e) => setNewSurveyor({ ...newSurveyor, profileImage: e.target.files[0] })}
            />
          ) : (
            <input
              key={key}
              type={key === "password" ? "password" : key === "price" ? "number" : "text"}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={newSurveyor[key]}
              onChange={(e) => setNewSurveyor({ ...newSurveyor, [key]: e.target.value })}
              className="border p-2 rounded-md focus:outline-[#7ED957]"
            />
          )
        )}
      </div>
      <button
        onClick={submitSurveyor}
        className="bg-[#7ED957] text-black px-4 py-2 rounded-lg mt-4 font-semibold hover:bg-[#6dc44e] transition"
      >
        {editSurveyorId ? "Update Surveyor" : "Add Surveyor"}
      </button>
    </div>
  );

  const renderConsultantForm = () => (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{editConsultantId ? "Edit Consultant" : "Add New Consultant"}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(initialConsultantState).map((key) =>
          key === "profileImage" ? (
            <input
              key={key}
              type="file"
              accept="image/*"
              onChange={(e) => setNewConsultant({ ...newConsultant, profileImage: e.target.files[0] })}
            />
          ) : (
            <input
              key={key}
              type={key === "password" ? "password" : key === "price" ? "number" : "text"}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={newConsultant[key]}
              onChange={(e) => setNewConsultant({ ...newConsultant, [key]: e.target.value })}
              className="border p-2 rounded-md focus:outline-[#7ED957]"
            />
          )
        )}
      </div>
      <button
        onClick={submitConsultant}
        className="bg-[#7ED957] text-black px-4 py-2 rounded-lg mt-4 font-semibold hover:bg-[#6dc44e] transition"
      >
        {editConsultantId ? "Update Consultant" : "Add Consultant"}
      </button>
    </div>
  );

  // ================= Render Table =================
  const renderTable = (data, type) => (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Profile</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-3">
                {item.profileImage ? (
                  <img
                    src={`http://localhost:5000/uploads/${item.profileImage}`}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                )}
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.email}</td>
              <td className="p-3">{item.mobile}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => (type === "surveyor" ? editSurveyor(item) : editConsultant(item))}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition flex items-center gap-1"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => (type === "surveyor" ? deleteSurveyor(item._id) : deleteConsultant(item._id))}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-[#151515]">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-[#2F2C2C] text-white flex flex-col p-4">
          <h2 className="text-2xl font-bold mb-6 text-[#7ED957]">Admin Panel</h2>
          {["dashboard", "surveyors", "consultants", "pending"].map((item) => (
            <button
              key={item}
              className={`text-left mb-3 px-3 py-2 rounded-md hover:bg-[#7ED957] hover:text-black ${view === item ? "bg-[#7ED957] text-black" : ""}`}
              onClick={() => setView(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {loading && <div className="text-center py-4 text-gray-700 font-semibold">Loading...</div>}

          {view === "dashboard" && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600">{s.title}</h3>
                      <p className="text-2xl font-bold text-[#151515]">{s.value}</p>
                    </div>
                    <div className="p-3 rounded-full" style={{ backgroundColor: s.color + "33", color: s.color }}>
                      {s.icon}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === "surveyors" && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-semibold mb-6">Surveyors Management</h2>
              {renderSurveyorForm()}
              {renderTable(surveyors, "surveyor")}
            </motion.div>
          )}

          {view === "consultants" && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-semibold mb-6">Consultants Management</h2>
              {renderConsultantForm()}
              {renderTable(consultants, "consultant")}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
