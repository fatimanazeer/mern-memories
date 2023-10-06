import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password} = req.body;

    try {
        const existingUser = await User.findOne({ email })
        
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credential"})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test")
        res.status(200).json({ result: existingUser, token})
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }
} 

export const signup = async (req, res) => {

    
    const { email, password, confirmPassword, firstName, lastName} = req.body;
    
    try {
        const existingUser = await User.findOne({ email })
        console.log("existingUser", existingUser);
        
        if(existingUser) return res.status(400).json({ message: 'user already exist'})

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match."})

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`})

        console.log(result);

        const token = jwt.sign({ email: result.email, id: result._id }, "test")

        res.status(200).json({ result, token})


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong.'})

    }
}


/**
 * {"userInfo":{"sub":"107060800512597226423","name":"fatima sangrah","given_name":"fatima","family_name":"sangrah","picture":"https://lh3.googleusercontent.com/a/AAcHTtf7OowF5gS_dVEZcGsdflTNaNkDvWOi5XpbJmvgNqdh=s96-c","email":"factoombatool@gmail.com","email_verified":true,"locale":"en-GB"},"access_token":"ya29.a0AfB_byBtrsWWQMOWWoVAHHJ6BLzGvGQJdb7nThd01VM-oCpEr8asviPmss26AdZrGSxlgpbrvwz1Fqm-Ap_xLU2z9vniGE6Gcs3aOlIIM3i1IBKnwCXLIVnF1FbOjlQCMkKX33Nl-MeDC1A5cKRzCz7n3TBpzgaCgYKATQSARASFQHsvYlsF0tTTMeU2AP46f2d5qE4jg0165"}
 */