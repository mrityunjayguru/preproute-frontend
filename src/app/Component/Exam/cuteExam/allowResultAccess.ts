"use server";

import { cookies } from "next/headers";

// ✅ Allow access to /Exam/userExam
export async function allowExamAccess() {
  const cookieStore = await cookies();
  cookieStore.set("exam_permission", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

// ✅ Allow access to /Exam/result
export async function allowResultAccess() {
  const cookieStore = await cookies();

  cookieStore.set("exam_result_access", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  // ❌ Remove exam access after submit
  cookieStore.delete("exam_permission");
}

// ✅ Remove result access (FIXED)
export async function removeResultAccess() {
  const cookieStore = await cookies();
   cookieStore.delete("exam_permission");
}
