const mongoose = require("mongoose");

// Function to generate a custom ID (2 characters from userName + 2 digits from userEmail)
function generateCustomId(userName, userEmail) {
  // Use the first 2 characters of userName and the last 2 digits of userEmail
  const userNamePart = userName.substring(0, 2).toUpperCase();  // First two characters of the userName
  const userEmailPart = userEmail.replace(/[^\d]/g, '').slice(-2);  // Last two digits of the userEmail (remove non-digits)
  
  // If there are no digits in userEmail, fall back to a default number (e.g., '00')
  const digits = userEmailPart.length === 2 ? userEmailPart : '00';

  return userNamePart + digits;  // Combine both parts to form the ID
}

// Define the User schema
const UserSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    default: function() {
      // Generate the ID based on userName and userEmail fields
      return generateCustomId(this.userName, this.userEmail); 
    }
  },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
