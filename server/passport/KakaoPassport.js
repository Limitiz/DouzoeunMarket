import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import env from "dotenv";
import User from "../models/User.js";
env.config();

const KakaoPassport = () => {
  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: "",
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const exUser = await User.findOne({
            where: { nickName: profile.displayName },
          });
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              displayName: profile.displayName,
              img: profile._json.properties.profile_image,
              id: profile.id,
              provider: "kakao",
            });
            console.log(newUser);
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};

export default KakaoPassport;
