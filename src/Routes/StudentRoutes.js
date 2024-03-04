import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Component/Home";
import StudentRegistrationForm from "../Component/StudentRegistrationForm";
import ViewStudentDetails from "../Component/ViewStudentDetails";
import EditStudentForm from "../Component/EditStudentForm";
import NavBar from "../Component/NavBar";

const StudentRoutes = () => {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/register_student" element={<StudentRegistrationForm/>}/>
                <Route exact path="/view/:id" element={<ViewStudentDetails/>}/>
                <Route exact path="/edit/:id" element={<EditStudentForm/>}/>
            </Routes>
        </Router>
    )
}

export default StudentRoutes;
