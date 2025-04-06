import jwtDecode from "jwt-decode"; // Install: npm install jwt-decode

const getStudentId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id; // Ensure the backend includes studentId in the token
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};