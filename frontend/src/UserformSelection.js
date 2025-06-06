import React, { useState, useEffect } from 'react';
import { IoCreate } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

import { GrCloudSoftware } from "react-icons/gr";
import { SiBmcsoftware, SiEsotericsoftware } from "react-icons/si";
import { LuFileInput } from "react-icons/lu";

import { FaInternetExplorer, FaWarehouse, FaUserCheck } from "react-icons/fa";

import { IoLaptopSharp } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";

import { TbDeviceIpadHorizontalDown } from "react-icons/tb";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVpnLock } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { SiFormstack } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


import IvendModal from "./UserformsModals/leaveForm";

import image1 from './images/colcom.jpg';



const UserformSelection = () => {




  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal8, setShowModal8] = useState(false);
    const [showModal9, setShowModal9] = useState(false);

      const [username, setUsername] = useState('');


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);



  const styles = {
    dashboardContent: { padding: '2rem' },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      gap: '0.5rem',
    },
    icon: {
      fontSize: '1.5rem',
      color: '#007bff',
    },
    modalBackdrop: {
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      width: '900px',
      maxHeight: '90vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left', // Align content to the left
    },
    closeButton: {
      marginTop: '1rem',
    },
  };
 const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <div>
        <nav className="navbar navbar-light bg-white border-bottom shadow-lg p-1 mb-0 rounded">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <img
        src={image1}
        alt="Login Icon"
        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
      />
      <span className="ms-2 fw-bold text-dark">USERS DASHBOARD</span>
    </div>
    <div className="text-dark">
      <h5 className="mb-0"><i>Welcome {username}</i></h5>
    </div>
  </div>
</nav>


             <div className="d-flex justify-content-end">
          <button onClick={handleBack} className="btn btn-primary">
              <b><IoMdArrowRoundBack /> Back</b>
          </button>
          <button className="btn btn-danger" onClick={() => {
            localStorage.clear();
            navigate('/');
          }}>
           <b> <IoLogOutSharp />Logout</b>
          </button>
        </div>

      <div style={styles.dashboardContent}>
        <div className="row row-cols-1 row-cols-md-4 g-4">

         <div className="col">
      <div
        className="card shadow-lg rounded"
        onClick={() => navigate("/FormmanagementUsers")}
        style={{ cursor: 'pointer' }} // Optional: show pointer cursor on hover
      >
        <div className="card-body">
          <div style={styles.cardHeader}>
            <SiFormstack style={styles.icon} />
            <h5 className="card-title">USER LEAVE MODULE</h5>
          </div>
          <p className="card-text">check the status of your form</p>
        </div>
      </div>
    </div>



          <div className="col">
            <div className="card shadow-lg rounded" onClick={() => setShowModal1(true)}>
              <div className="card-body">
                <div style={styles.cardHeader}>
                  <GrCloudSoftware style={styles.icon} />
                  <h5 className="card-title">LEAVE APPLICATION FORM </h5>
                </div>
                <p className="card-text">user access form</p>
              </div>
            </div>
          </div>

    


        </div>
      </div>

      {/* IVEND MODAL */}
      {showModal1 && (

        <IvendModal />

      )}

      



      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Colcom Foods Private Limited. All rights reserved.
      </footer>
    </div>
  );
};

export default UserformSelection;
