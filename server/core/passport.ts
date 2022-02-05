import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github'
import {User} from '../../models'

passport.use(
    'github',
    new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/github/callback'
},
 async (accessToken, refreshToken, profile,cb) => {
     try {
        const obj = {
            fullname: profile.displayName,
            avatarUrl: profile.photos?.[0].value,
            isActive: 0,
            username: profile.username,
            phone:'',
        }
         const findUser = await User.findOne({
             where: {
                 username: obj.username
             }
         })
         if(!findUser){
             
             const user = await User.create(obj)          
             return cb(null,user.toJSON())
         }
         cb(null, findUser)
         
     } catch (error) {
        cb(error)     
     }
}
))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        err ? done(err)
        : done(null,user)
    })
})

export {passport}