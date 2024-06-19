import React, { useState } from "react";
import "./styles.css";
import { Box, Divider, Button } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";
import Modal from "react-modal";
import success from "../assets/success.jpg";
import robot from "../assets/robot.jpg";
let options = [
  { name: "Ravi", id: 1 },
  { name: "Ram", id: 2 },
  { name: "Vishal Raj", id: 3 },
  { name: "Rahhul Raj", id: 4 },
];
const MainComponent = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    firstName: "",
    dateOfBirth: "",
    mobileNo: "",
    emailId: "",
    addressOne: "",
    addressTwo: "",
    approvers: [],
  });
  const [currentStep, setCurrentStep] = useState("step1");
  const [currentSubStep, setCurrentSubStep] = useState("substep1");
  const [optionalAddressList, setOptionalAddressList] = useState([]);
  const [optionalPayApprovers, setOptionalPayApprovers] = useState([]);
  const handleOptionalPayApprovers = () => {
    setOptionalPayApprovers([...optionalPayApprovers, "newapprover"]);
  };

  const handleAdditionAddress = () => {
    setOptionalAddressList([
      ...optionalAddressList,
      { addressOne: "", addressTwo: "" },
    ]);
  };
  const handleAdditionAddressDeletion = (indexPassed) => {
    setOptionalAddressList(
      optionalAddressList.filter((e, index) => index !== indexPassed)
    );
  };
  const onSelect = (selectedList, selectedItem) => {
    setUserData({ ...userData, approvers: selectedList });
  };

  const onRemove = (selectedList, removedItem) => {
    setUserData({ ...userData, approvers: selectedList });
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const validate = () => {
    let tempErrors = {};

    if (!userData.firstName.trim()) tempErrors.firstName = "Name is required";
    if (!userData.dateOfBirth)
      tempErrors.dateOfBirth = "Date of birth is required";

    setErrors(tempErrors);
    console.log(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateContact = () => {
    let tempErrors = {};

    if (!userData.emailId) {
      tempErrors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.emailId)) {
      tempErrors.emailId = "Email is invalid";
    }
    if (!userData.mobileNo) {
      tempErrors.mobileNo = "Phone number is required";
    } else if (!/^\d{10}$/.test(userData.mobileNo)) {
      tempErrors.mobileNo = "Phone number must be 10 digits";
    }

    setErrors(tempErrors);
    console.log(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBasicDetails = () => {
    if (validate()) {
      console.log("entered");
      setCurrentStep("step1");
      setCurrentSubStep("substep2");
      setErrors({});
    }
  };
  const handleContactDetails = () => {
    if (validateContact()) {
      setCurrentStep("step2");
    }
  };
  const showMap = (levelName) => {
    return (
      <div className="bar-one">
        <input id="general" checked type="radio" />
        <label>General Details</label>
        <div className="column-divider">
          <Divider
            className={
              levelName == "step2" || levelName == "step3"
                ? "divider-active"
                : "divider-inactive"
            }
          />
        </div>
        <input
          htmlFor="address"
          checked={levelName == "step2" || levelName == "step3" ? true : false}
          type="radio"
        />
        <label>Address </label>
        <div className="column-divider">
          <Divider
            className={
              levelName == "step3" ? "divider-active" : "divider-inactive"
            }
          />
        </div>
        <input htmlFor="payconfig" type="radio" />
        <label>Pay configuration </label>
      </div>
    );
  };

  const showProgress = () => {
    return (
      <div className="bar-two">
        {currentStep == "step1" ? (
          <>
            {currentSubStep == "substep1" ? (
              <div className="row-divider">
                <Divider className="row-divider-active" />

                <Divider className="row-divider-inactive" />
              </div>
            ) : (
              <div className="row-divider">
                <Divider className="row-divider-inactive" />

                <Divider className="row-divider-active" />
              </div>
            )}
          </>
        ) : null}
      </div>
    );
    // switch (progressLevel) {
    //   case "step1":
    //     return <p>bar2</p>;
    //   case "step2" || "step3":
    //     return <p>bar2</p>;

    //   default:
    //     return <></>;
    // }
  };
  const showInputs = (steplevel, subStepLevel) => {
    switch (steplevel) {
      case "step1":
        if (subStepLevel == "substep1") {
          return (
            <>
              <Box
                sx={{
                  width: "40vw",

                  backgroundColor: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  m: 2,
                  p: 2,
                  marginTop: "8vh",
                }}
              >
                <div>
                  <h3 className="heading-style">Basic Details</h3>
                  <div className="main-input-div">
                    <div className="input-field">
                      <label className="label-style">First Name</label>
                      <input
                        value={userData.firstName}
                        placeholder="Enter first name"
                        type="text"
                        className="input-style"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input-field">
                      <label className="label-style">Date of Birth</label>
                      <input
                        value={userData.dateOfBirth}
                        placeholder="mm.dd.yyy"
                        type="date"
                        className="input-style"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="error-div-style">
                    {errors.firstName && (
                      <p className="error-color">{errors.firstName}</p>
                    )}
                    {errors.dateOfBirth && (
                      <p className="error-color">{errors.dateOfBirth}</p>
                    )}
                  </div>
                </div>
              </Box>
              <div className="button-style">
                <Button
                  variant="contained"
                  style={{ width: "50px" }}
                  color="primary"
                  onClick={() => handleBasicDetails()}
                >
                  Next
                </Button>
              </div>
            </>
          );
        } else {
          return (
            <>
              <Box
                sx={{
                  width: "40vw",

                  backgroundColor: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  m: 2,
                  p: 2,
                  marginTop: "8vh",
                }}
              >
                <div>
                  <h3 className="heading-style">Contact Details</h3>
                  <div className="main-input-div">
                    <div className="input-field">
                      <label className="label-style">Email Id</label>
                      <input
                        value={userData.emailId}
                        placeholder="Enter Email Id"
                        type="email"
                        className="input-style"
                        onChange={(e) =>
                          setUserData({ ...userData, emailId: e.target.value })
                        }
                      />
                    </div>
                    <div className="input-field">
                      <label className="label-style">Mobile Number</label>
                      <input
                        value={userData.mobileNo}
                        placeholder="Enter mobile number"
                        type="number"
                        className="input-style"
                        onChange={(e) =>
                          setUserData({ ...userData, mobileNo: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="error-div-style">
                    {errors.emailId && (
                      <p className="error-color">{errors.emailId}</p>
                    )}
                    {errors.mobileNo && (
                      <p className="error-color">{errors.mobileNo}</p>
                    )}
                  </div>
                </div>
              </Box>
              <div className="button-style">
                <Button
                  variant="contained"
                  style={{ width: "50px" }}
                  color="primary"
                  onClick={() => handleContactDetails()}
                >
                  Next
                </Button>
              </div>
            </>
          );
        }
      case "step2":
        return (
          <>
            <Box
              sx={{
                width: "40vw",

                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                m: 2,
                p: 2,
                marginTop: "8vh",
                boxSizing: "content-box",
              }}
            >
              <div>
                <h3>Address</h3>
                <div className="main-input-div">
                  <div className="input-field">
                    <label className="label-style">Address Line 1</label>
                    <input
                      value={userData.addressOne}
                      placeholder="Enter Address Line 1"
                      type="text"
                      className="input-style"
                      onChange={(e) =>
                        setUserData({ ...userData, addressOne: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-field">
                    <label className="label-style">Address Line 2</label>
                    <input
                      value={userData.addressTwo}
                      placeholder="Enter Address Line 2"
                      type="text"
                      className="input-style"
                      onChange={(e) =>
                        setUserData({ ...userData, addressTwo: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    variant="contained"
                    style={{ width: "3px", height: "10px" }}
                    onClick={handleAdditionAddress}
                  >
                    +
                  </Button>
                </div>
                {optionalAddressList.map((eachAddress, index) => {
                  return (
                    <div className="main-input-div">
                      <div className="input-field">
                        <label className="label-style">Address Line 1</label>
                        <input
                          placeholder="Enter Address Line 1"
                          type="text"
                          className="input-style"
                        />
                      </div>
                      <div className="input-field">
                        <label className="label-style">Address Line 2</label>
                        <input
                          placeholder="Enter Address Line 2"
                          type="text"
                          className="input-style"
                        />
                      </div>
                      <Button
                        variant="contained"
                        style={{ width: "3px", height: "10px" }}
                        color="warning"
                        onClick={() => handleAdditionAddressDeletion(index)}
                      >
                        -
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Box>
            <div className="button-style">
              <Button
                variant="contained"
                style={{ width: "50px" }}
                color="primary"
                onClick={() => {
                  setCurrentStep("step3");
                }}
              >
                Next
              </Button>
            </div>
          </>
        );
      case "step3":
        return (
          <>
            <Box
              sx={{
                width: "40vw",

                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                m: 2,
                p: 2,
                marginTop: "8vh",
              }}
            >
              <div>
                <h3>Pay Configuration</h3>
                <Multiselect
                  options={options}
                  selectedValues={userData.approvers}
                  displayValue="name"
                  onSelect={onSelect}
                  onRemove={onRemove}
                />

                {optionalPayApprovers.map((e) => (
                  <>
                    <br />
                    <Multiselect options={options} displayValue="name" />
                  </>
                ))}
                <Button
                  variant="contained"
                  style={{ width: "100%", marginTop: "35px" }}
                  onClick={handleOptionalPayApprovers}
                >
                  Add New level
                </Button>
              </div>
            </Box>
            <div className="button-style">
              <Button
                variant="contained"
                style={{ width: "50px" }}
                color="primary"
                onClick={() => {
                  setIsOpen(true);
                  setCurrentStep("step1");
                  setCurrentSubStep("substep1");
                  setOptionalPayApprovers([]);
                  setUserData({
                    firstName: "",
                    dateOfBirth: "",
                    mobileNo: "",
                    emailId: "",
                    addressOne: "",
                    addressTwo: "",
                    approvers: [],
                  });
                }}
              >
                Finish
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      {modalIsOpen ? (
        <div className="modal-cont">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="modal-style"
          >
            <div className="modal-content">
              <Box
                component="img"
                sx={{
                  height: 50,
                  width: 50,
                  borderRadius: "50%",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  ml: 2,
                }}
                alt="success"
                src={success}
              />
              <p className="congrats">Congratulations</p>
              <p className="invite">
                Invite Link successfully sent to Rahul Raj
              </p>
              <Button
                variant="contained"
                style={{ width: "50px" }}
                color="primary"
                onClick={closeModal}
              >
                Okay
              </Button>
            </div>
          </Modal>
        </div>
      ) : (
        <>
          {showMap(currentStep)}
          {showProgress()}
          {showInputs(currentStep, currentSubStep)}
          <div className="robot">
            <Box
              component="img"
              sx={{
                width: 50,
                borderRadius: "50%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                ml: 2,
              }}
              alt="success"
              src={robot}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainComponent;
