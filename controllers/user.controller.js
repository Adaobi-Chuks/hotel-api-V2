const UserService = require('../services/user.service');
const {validateUser} = require("../validators/user.validator");
const bcrypt = require("bcrypt");
const { editUserById } = require('../services/user.service');

class UserController {

    //create user
    async createUser(req, res) {

        //checks if req fields are valid
        const {error, data} = await validateUser(req.body);

        if(error) {
            let errorMessage = [];    
            error.details.forEach(detail => {
                errorMessage.push(detail.message);
            })
            return res.status(403)
            .send({
                message: errorMessage,
                success: false
            });
        }

        //checks if another user with email exists
        if (await UserService.userExists(data.email)) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                message: 'user already exist',
                success: false
            });
        }

        //create a user if the email doesn't exist
        const createdUser = await UserService.addUser(data);
        const token = UserService.generateAuthToken();
        return res.header("token", token).status(201)
            .send({
                message: 'user created',
                success: true,
                data: {createdUser, token}
            });
    }

    async getUsers(req, res) {
        const users = await UserService.getAllUsers();
        res.status(200).send({
          success: true,
          message: 'users list',
          data: users
        });
    }

    async getUserById(req, res) {
        const user = await UserService.findById(req.params.id);
    
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'user not found'
          });
        }

        res.status(200).send({
          success: true,
          message: 'user details fetched',
          data: user
        });
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const data = req.body;
        const user = await UserService.findById(id);
        if(!user) return res.status(404).json({
            message: "Invalid id",
            success: false
        })
        // Fetching existing book title
        if(data.email){
            const existingRoomEmail  = await UserService.find(data.email)
            if(existingRoomEmail){
                if(existingRoomEmail._id.toString() !== id){
                    return res.status(403).json({
                        success: false,
                        message: "Duplicate email"
                    })
                }
            }
        }
        const updatedUser = await editUserById(id, data)
        return res.status(200).json({
            success: true,
            message: "Update successful",
            data: updatedUser
        })
    }
    
    async deleteUserById(req, res) {
        const id = req.params.id;
        //check to see if a roomtype with id exists
        const userToDelete = await UserService.findById({_id: id});
        //deletes the roomtype if the id exist
        if(userToDelete) {
            await UserService.deleteUserById(id);
            return res.status(201).send({
                message: 'Deleted',
                success: true,
                data: userToDelete
            });
        }
        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: "Invalid id"
            });   
    }
    
    async login(req, res) {
        const user = await UserService.find(req.body.email);
        if (!user) return res.status(400).send({ success: false, message: 'Invalid email' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send({ success: false, message: 'Invalid password or email' });

        const token = UserService.generateAuthToken(user);

        res.header('token', token).status(200).send({
            success: true,
            message: 'login success',
            data: { user, token }
        });
    }

}
module.exports = new UserController();