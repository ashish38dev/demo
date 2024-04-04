import React, { useEffect, useState } from "react";
import "./dashboard.css";
import toast from "react-hot-toast";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Dashboard = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    ids: [],
    date: "",
    time: "",
    comment: ""
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/employee/getemployee"
      );
      
      if (res.data.success === false) {
        return toast.error("no data is coming from server");
      }
      if (res.data.success) {
        setEmployee(res.data.employee);
      }
    } catch (error) {
      toast.error("server error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleCheckboxChange = (id) => {
    const isSelected = selectedItems.includes(id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      setFormData((prevFormData) => ({
        ...prevFormData,
        ids: prevFormData.ids.filter((itemId) => itemId !== id),
      }));
    } else {
      setSelectedItems([...selectedItems, id]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        ids: [...prevFormData.ids, id],
      }));
    }
  };
  

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const handleSchedule = async (e) => {
    e.preventDefault()
    try {
      setFormData({...formData, ids: selectedItems})
      const res = await axios.post(
        "http://localhost:8080/api/admin/schedule",
        formData
      )
      if (res.data?.success === false && res.data?.err) {
        res.data?.err.map((err) => (
          toast.error(err)
          ))
        }
      if (res.data.success && res.data.message ) {
        toast.success(res.data.message)
        handleClose()
        setSelectedItems([])
      }
    } catch (error) {
      toast.error("server error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item._id)}
                  checked={selectedItems.includes(item._id)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {selectedItems.length ? (
          <div
            className="button"
            onClick={handleOpen}
            style={{ width: "100px", marginTop: "10px" }}
          >
            Schedule Time
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Employee Schedule
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={(e) => handleSchedule(e)}>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    placeholder="Select Date"
                    min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
                    value={formData.date}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={formData.time}
                    onChange={e => handleChange(e)}
                    min={getCurrentTime()} // Set min attribute to current time
                  />
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea
                    name="comment"
                    className="form-control"
                    value={formData.comment}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Schedule Time
                </button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
