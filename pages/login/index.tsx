import Image from "next/image";
import Link from "next/link";
import iconLogo from "@/public/icons/logo_panda.svg";
import textLogo from "@/public/icons/logo_text.svg";
import iconVisible from "@/public/icons/icon_visible.svg";
import iconInvisible from "@/public/icons/icon_invisible.svg";
import { useForm } from "react-hook-form";
import { FormEvent, useState } from "react";
import { LoginRequestBody } from "@/types";
import instance from "@/lib/axios";
import { useRouter } from "next/router";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequestBody>();

  const router = useRouter();

  const login = async (formData: LoginRequestBody) => {
    try {
      const res = await instance.post("/auth/signIn", formData);
      const accessToken = res.data?.accessToken;
      localStorage.setItem("accessToken", accessToken);
      if (accessToken) {
        router.push("/");
      }
    } catch (e) {
      console.error("failed to login", e);
    }
  };

  return (
    <div className="w-[640px] mx-auto">
      <Link href={"/"} className="flex gap-4 justify-center mb-12">
        <Image src={iconLogo} width={104} height={104} alt="판다마켓로고" />
        <Image src={textLogo} width={266} height={90} alt="판다마켓로고" />
      </Link>
      <div className="flex flex-col gap-6">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(login)}>
          <label className="text-lg font-bold" htmlFor="email">
            이메일
          </label>
          <input
            className="w-full h-14"
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            {...register("email")}
          />
          <label className="text-lg font-bold" htmlFor="password">
            비밀번호
          </label>
          <div className="w-full relative">
            <input
              className="w-full h-14"
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
            />
            <Image
              className="absolute right-6 inset-y-0 my-auto"
              src={iconInvisible}
              width={24}
              height={24}
              alt="비밀번호보기버튼"
            />
          </div>
          <button
            className="w-full h-14 bg-gray-100 rounded-full"
            type="submit"
            disabled={isSubmitting}
          >
            로그인
          </button>
        </form>
        <div className="w-full h-16 px-6 flex justify-between items-center bg-[#E6F2FF] rounded-box">
          <p className="text-base font-medium">간편로그인하기</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white rounded-full">구글</button>
            <button className="w-10 h-10 bg-yellow-300 rounded-full">
              카카
            </button>
          </div>
        </div>
        <p className="text-base font-medium mx-auto">
          판다마켓이 처음이신가요? <Link href="/login">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
