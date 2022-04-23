import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import env from "dotenv";
import User from "../models/User.js";
env.config();

const GooglePassport = () => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("google profile : ", profile);
        try {
          const exUser = await User.findOne({
            // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
            where: { email: profile.profile._json.email },
          });
          // 이미 가입된 구글 프로필이면 성공
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await User.create({
              email: profile._json.email,
              nickName: profile.displayName,
              img: profile.photos[0].value,
            });

            console.log(profile.email);

            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

export default GooglePassport;
