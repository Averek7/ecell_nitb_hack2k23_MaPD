import { body, validationResult } from 'express-validator';
import log from '../../log.js';
import { register, login, checkEmail, userInfoDb } from '../db/auth.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

const salt = bcrypt.genSaltSync(10);
const secret = "dhruvganduhai"

const regis = async (req, res) => {
    const errors = validationResult(req);

    const { email, password, name, role, coordinateX, coordinateY } = req.body;


    try {
        const [c] = await checkEmail({email});

        console.log(c);

        if (c[0].count !== 0) {
            return res.status(400).json({
                message: "email already exsist"
            })
        }

        var hashedPassword = await bcrypt.hashSync(password, salt);

        console.log(hashedPassword);

        const [r] = await register({ name, email, password: hashedPassword, role, coordinateX, coordinateY} );
        
        console.log("r: ", r.insertId );
        const [userInfo] = await userInfoDb({ id: r.insertId });

        console.log(userInfo);

        const token = jwt.sign({
            userId: userInfo[0].userId,
            role: userInfo[0].role
          }, secret, { expiresIn: '30d' });

        return res.status(200).json({
            message: 'success',
            token
        })
    } catch (err) {
        log.error({ error: err }, '[register][error]');

        return res.status(500).status({
            message: "INTERNAL SERVER ERROR",
        })
    }
}

const logi = async(req, res) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    console.log({ email, password });

    try {
        const [r] = await login({email});
        const s = r[0];
        console.log(s);
        let b = await bcrypt.compareSync(password, s.password);
        console.log(b)
        if (b) {
            log.debug({ s }, '[login][connector]');
            const token = jwt.sign({
                userId: s.userId,
                role: s.role
              }, secret, { expiresIn: '30d' });    
            return res.status(200).json({
                message: 'success',
                token
            })
        } else {
            console.log("false");
            log.error({ error: 'invalid password' });

            return res.status(400).json({
                message: "Invalid Password"
            })
        }
    } catch (err) {
        log.error({error: err}, '[login][error]')

        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const verifyToken = async(req, res, next) => {
    const token = req.headers['token'];
  // const token= authHeader && authHeader.split(' ')[1]

  console.log(req.headers);

  console.log('token: ', token);

  if (!token) {
    return res.status(401).json({ error: 'token is not present' });
  }

  jwt.verify(token, secret, (err, payload) => {
    if (err || !payload) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    log.debug({ payload }, ['jwt verification']);
    console.log(payload)

    req.user = payload;
    req.userId = payload.userId;
    req.role = payload.role;
    req.user.url = req.originalUrl;
    return next();
  });
}

export { regis, logi, verifyToken };