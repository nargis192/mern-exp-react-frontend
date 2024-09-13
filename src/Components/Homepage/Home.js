import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../Homepage/Home.css";

const Home = (userId) => {

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState([]);
  const [expid, setExpid] = useState(null); // Initialize expid as null

  // Fetch all expenses from the backend
  const getData = async () => {
    
      try {
      
        const res = await axios.get(`https://mern-exp-app.onrender.com`);
        setData(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error while getting expenses:", error);
      
    }
   
  }

  // Add a new expense
  const add = async () => {
    try {
      const res = await axios.post("https://mern-exp-app.onrender.com/save", { topic, description, amount });
      if (res.status === 201) {
        setData([...data, res.data]);
        setTopic("");
        setDescription("");
        setAmount("");
        
      } else {
        alert("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Update an existing expense
  const update = async () => {
    try {
      // Make a request to update the expense in the backend
      await axios.post("https://mern-exp-app.onrender.com/update", { _id: expid, topic, description, amount });

      // Update the data array by replacing the updated expense in the list
      const updatedData = data.map(item =>
        item._id === expid ? { ...item, topic, description, amount } : item
      );

      // Set the updated data to the state
      setData(updatedData);

      // Reset form fields after update
      setTopic("");
      setDescription("");
      setAmount("");
      setExpid(null); // Reset the expid after update
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deletefunc = async (expid) => {
    try {
      // Make a request to delete the expense in the backend
      await axios.post("https://mern-exp-app.onrender.com/delete", { _id: expid });

      // Update the data array by filtering out the deleted expense from the list
      const updatedData = data.filter(item => item._id !== expid);

      // Set the updated data to the state
      setData(updatedData);

      // Reset form fields if you had the deleted expense selected
      setTopic("");
      setDescription("");
      setAmount("");
      setExpid(null); // Reset the expid after deletion
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };




  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
   
      <div className="Container">
        <div className="Upper">
        <div>
       
        
      </div>
          <div className="heading">
            <div>Expense Tracker</div>
          </div>
          <div className="Content">
            <div className="inputs">
              <div className="input1">
                <label>Expense: </label>
                <input
                  type="text"
                  placeholder="Please enter Expense type"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="input1">
                <label>Description: </label>
                <input
                  type="text"
                  placeholder="Please enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="input1">
                <label>Amount: </label>
                <input
                  type="number"
                  placeholder="Please enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="button">
              {expid ? (
                <button onClick={update}>Update Expense</button>
              ) : (
                <button onClick={add}>Add Expense</button>
              )}
            </div>
          </div>
        </div>
        <div className="lower">
          <h1 className="heading">List of Expenses</h1>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, index) => (
                <tr key={index}>
                  <td className='topic'>{e.topic}</td>
                  <td className='description'>{e.description}</td>
                  <td className='amount' >{e.amount}</td>
                  <td className='edit'>
                    <FaRegEdit className="edit-icon"
                      onClick={() => {
                        setExpid(e._id);
                        setTopic(e.topic);
                        setDescription(e.description);
                        setAmount(e.amount);
                      }}
                    />
                    <MdDelete className="delete-icon" onClick={() => deletefunc(e._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
        </div>

      </div>

         
    </div>
    
  )
}

export default Home