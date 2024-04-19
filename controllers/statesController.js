const State = require('../model/State');
const path = require('path');
const fs = require('fs'); // Import the file system module

/*
const getAllStates = async (req, res) => {
    const states = await State.find();
    if(!states) return res.status(204).json({ 'message': 'No state found.'});
    res.json(states);
}
*/


const getAllStates = (req, res) => {
    // Resolve the absolute path to the states.json file
    const filePath = path.resolve(__dirname, '../model/states.json');

    // Read the contents of the states.json file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ 'message': 'Error reading states.json file.' });
        }
        
        try {
            // Parse the JSON data
            const statesData = JSON.parse(data);
            res.json(statesData); // Send the JSON data as the response
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).json({ 'message': 'Error parsing states.json file.' });
        }
    });
}

/*
const createNewEmployee = async (req, res) => {
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({ 'message': 'First and last names are required.'});
    }

   try{
    const result = await Employee.create({
        firstname: req.body.firstname, 
        lastname: req.body.lastname
    });

    res.status(201).json(result);
   } catch(err){
    console.error(err);
   }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({ 'message': 'id parameter is required.'});
    }


    const employee = await Employee.findOne({_id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No Employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({ 'message': 'id parameter is required.'});
    }
    const employee = await Employee.findOne({_id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No Employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne({_id: req.body.id });
    res.json(result);
}
*/

const getState = (req, res) => {
    const stateCode = req.params.code; // Extract the state code parameter from the request URL
    if (!stateCode) {
        return res.status(400).json({ 'message': 'State code parameter is required.' });
    }

    // Resolve the absolute path to the states.json file
    const filePath = path.resolve(__dirname, '../model/states.json');

    // Read the contents of the states.json file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ 'message': 'Error reading states.json file.' });
        }

        try {
            // Parse the JSON data
            const statesData = JSON.parse(data);

            // Find the state with the matching code
            const state = statesData.find(state => state.code === stateCode);

            if (!state) {
                return res.status(204).json({ "message": `No state matches code ${stateCode}.` });
            }

            res.json(state); // Send the state data as the response
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).json({ 'message': 'Error parsing states.json file.' });
        }
    });
}

module.exports = {
    getAllStates,
    //createNewEmployee,
    //updateEmployee,
    //deleteEmployee,
    getState
}