import React, { useState, useEffect } from "react";
import { LuFileInput } from "react-icons/lu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LeaveApplicationModal = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [hodApproval, setHodApproval] = useState("Pending");
  const [hrApproval, setHrApproval] = useState("Pending");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    const storedDepartment = localStorage.getItem("department");
    if (storedDepartment) setDepartment(storedDepartment);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const leaveApplication = {
      fullname,
      username,
      jobTitle,
      department,
      leaveType,
      startDate,
      endDate,
      reason,
      hodApproval,
      hrApproval,
    };

    try {
      await axios.post("http://localhost:3001/leave-applications", leaveApplication, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Leave application submitted successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Error submitting leave application. Please try again.");
      console.error("Submission error:", error);
    }
  };

  if (!showModal) return null;

  const styles = {
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "10px",
      width: "1000px",
      maxHeight: "90vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      textAlign: "left"
    }
  };

  return (
    <div>
      <ToastContainer />
      <div style={styles.modalBackdrop} onClick={() => setShowModal(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h5 className="mb-3">
            <b><LuFileInput /> &nbsp;LEAVE APPLICATION FORM</b>
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Full Name</b></label>
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Username</b></label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Job Title</b></label>
                <input
                  type="text"
                  className="form-control"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Department</b></label>
                <input
                  type="text"
                  className="form-control"
                  value={department}
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Leave Type</b></label>
                <select
                  className="form-control"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                >
                  <option value="">-- Select Leave Type --</option>
                  <option value="Annual">Annual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Maternity">Maternity Leave</option>
                  <option value="Paternity">Paternity Leave</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Start Date</b></label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>End Date</b></label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Reason for Leave</b></label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12 text-center mb-3">
                <label className="form-label mb-0"><b>APPROVALS</b></label>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Head of Department</b></label>
                <button type="button" className="btn btn-secondary w-100" disabled>
                  {hodApproval}
                </button>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label"><b>HR</b></label>
                <button type="button" className="btn btn-secondary w-100" disabled>
                  {hrApproval}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-danger w-100"><b>SUBMIT APPLICATION</b></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationModal;
