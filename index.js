    require('dotenv').config();

const express = require('express');
const connectToMongoDB = require('./src/config/config');
const routers= require('./src/routes/route');
const authenticateToken=require('./src/utils/jwtAuthentication/jwtAuthentication');
const publicRoutes=require('./src/routes/public/public');
const COMMON_MESSAGE  = require('./src/common/lang/lang');
const cors=require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

connectToMongoDB();

app.use(express.json());

app.get('/version',(req,res)=>{
    res.send({
        version:"0.0.1 - beta version"
    })
});



const logRoute = (req, res, next) => {
    console.log(`Route: ${req.path}`);
    next();
  };
  

  app.use('/public', logRoute, publicRoutes);
  app.use('/v1', authenticateToken, logRoute, routers);

  

app.use((err, req, res, next) => {
    if (! err) {
        return next();
    }
    res.send({ statusCode:500, success:false,message:COMMON_MESSAGE.ERROR.SERVER_ERROR });
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
