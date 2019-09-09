// Models
import User from '../models/User';

class UsersClass {

    // Get user by email
    async getUserByEmail(email: string) {
        
       return User.findOne({ email: email });
     
    }

    // Add new user
    async register(name: string, email: string, password: string) {
        
       return User.create({ name: name, email: email, password: password });

    }

    // Get user by id
    async getUserByID(_id: string) {

        return User.findById(_id);

    }

    // Get all Strava authenticated users
    async getStravaUsers() {
        
        return User.where("stravaUserID").ne("");
    
    }   
}

export default new UsersClass();