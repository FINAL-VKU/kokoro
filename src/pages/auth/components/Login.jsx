import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import {getUserByToken, login} from "../../../apis/authApi";
import {STORAGE} from "../../../utils/storage";
import {authApis, getUserByToken} from "../../../apis/authApi";
import {useDispatch} from "react-redux";
import {loginWeb} from "../../../context/userSlice";
import {logoName} from "../../../assets";



const schema = yup.object({
  email: yup.string().required("Email field is required.").email("Please enter a valid e-mail."),
  password: yup.string().required("Password field is required.")
})

export function Login() {
  const navigate = useNavigate()
    const dispatch = useDispatch();
  const { register,
    handleSubmit : onSubmit,
    formState: { errors }
  } = useForm({resolver: yupResolver(schema)});

  const handleSubmit = (values) => {
    // console.log(data);
    // navigate("/u")
    return authApis.login(values.email, values.password)
        .then((res) => {
            dispatch(loginWeb({user: res?.user}));
          localStorage.setItem(STORAGE.token, res?.token)
          navigate("/home")
          return getUserByToken()
        })
        .catch((err) => {
        })
  }

  return (
      <div className="w-100 h-100 flex flex-column justify-content-center items-center"
      >
              <img alt='Logo' src={logoName} className="w-[340px] h-[60px] mb-2"/>
          <form onSubmit={onSubmit(handleSubmit)}
                className="flex h-[calc(100vh-95px)] flex-col justify-center items-center outline-none position-relative"
                style={{backgroundColor: "white", height: "400px", width: "400px", borderRadius: 40}}
          >

              <p className="place-self-start font-semibold text-base text-[#FF69B4] mx-12">Welcome Back! Take a Deep
                  Breath.</p>

              <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className={errors.email ? "block peer rounded-[5px] h-[2.5rem] px-2 border-2 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]" : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] h-[2.5rem] px-2 border-2 mt-0 focus:outline-none focus:ring-1"}
                  style={{width: "80%"}}
              />
              <span className="place-self-start text-[14px] text-[#C93B32]">
            {errors.email?.message}
        </span>

              <input
                  {...register("password")}
                  type="password"
                  placeholder="password"
                  className={errors.password ? "block peer rounded-[5px] h-[2.5rem] px-2 border-2 mt-5 border-[#C93B32] focus:outline-none focus:border-[#C93B32]  focus:ring-1 focus:ring-[#C93B32]" : "block peer rounded-[5px] border-[#AEBBCD] w-[25rem] h-[2.5rem] px-2 border-2 mt-5 focus:outline-none focus:ring-1"}
                  style={{width: "80%"}}
              />
              <span className="place-self-start text-[14px] text-[#C93B32]">
            {errors.password?.message}
        </span>
              <button
                  type="submit"
                  className={`rounded-full bg-[#FF69B4] text-[#F5F7FF] p-3 mt-4 hover:bg-[#2347C5]`}
                  style={{width: "80%"}}
              >
                  SIGN IN
              </button>
          </form>
      </div>

  )
}
