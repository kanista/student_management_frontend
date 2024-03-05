import ExternalAPI from "../Const/ExternalAPI";
import axios from "axios";

const addStudent = async (student) => {
    try {
        const response = await axios.post(ExternalAPI.ADD_STUDENT, student);
        console.log(response)
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

const getAllStudents = async () => {
    try {
        const response = await axios.get(ExternalAPI.GET_ALL_STUDENTS);
        console.log(response)
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}


// const getAllStudents = async (page = 1, pageSize = 10) => {
//     try {
//         const response = await axios.get(ExternalAPI.GET_ALL_STUDENTS, {
//             params: {
//                 page,
//                 pageSize
//             }
//         });
//         console.log(response)
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// }

const getStudent = async (id) => {
    try {
        const response = await axios.get(ExternalAPI.GET_STUDENT + id);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error.response)
        throw error.response ? error.response.data : error.message;
    }
}

const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(ExternalAPI.DELETE_STUDENT + id);
        console.log(response)
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

const updateStudent = async (id, student) => {
    try {
        const response = await axios.put(ExternalAPI.UPDATE_STUDENT + id, student);
        console.log(response)
        return response;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

export default {addStudent, getAllStudents, getStudent, deleteStudent, updateStudent}