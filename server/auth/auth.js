export const verifyToken=(req,res,next)=>{
   const authheader=req.headers.authorization;
   if(!authheader){
    return res.status(401).json({message:"No token Found"})
   }
   const token=authheader.split(" ")[1];
   try {
      req.user=jwt.verify(token,process.env.JWT_SECRET)
      next()
   } catch (error) {
      res.status(403).json({message:"Invalid token"})
   }
}
