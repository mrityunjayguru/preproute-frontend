"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import {
  createUser,
  getUsers,
  handleSetUpdateUser,
  handleUpdateUserData,
} from "@/api/Users";
import { decrypt } from "@/Utils/Crypto";

interface IUserForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const UserForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const updateUser = useSelector((state: any) => state?.user?.updateuser);

  const [formData, setFormData] = useState<IUserForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Fetch users initially
  const fetchUsers = async () => {
    await dispatch(getUsers({}));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Populate form when editing a user (✅ fixed async issue)
  useEffect(() => {
    const loadUserData = async () => {
      if (updateUser && updateUser._id) {
        const decryptedPass = updateUser.password
          ? await decrypt(updateUser.password)
          : "";

        setFormData({
          name: updateUser.username || "",
          email: updateUser.email || "",
          phone: updateUser.phone || "",
          password: decryptedPass,
        });
        setEditingId(updateUser._id);
      }
    };

    loadUserData(); // ✅ call inner async function
  }, [updateUser]);

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle add or update user
  const handleAddOrUpdate = async () => {
    const { name, email, phone, password } = formData;
    if (!name || !email || !phone || (!editingId && !password)) {
      alert("Please fill all required fields.");
      return;
    }

    const payload: any = { username: name, email, phone };
    if (!editingId) payload.password = password;

    try {
      if (editingId) {
        await dispatch(handleSetUpdateUser({ id: editingId, ...payload }));
      } else {
        await dispatch(createUser(payload));
      }

      dispatch(handleUpdateUserData(null));
      await fetchUsers();
      router.push("/dashboard/users");

      setFormData({ name: "", email: "", phone: "", password: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className=" px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-y-6 max-w-xl gap-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label className="font-dm-sans text-md font-medium">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label className="font-dm-sans text-md font-medium">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter User Email"
            value={formData.email}
            onChange={handleChange}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label className="font-dm-sans text-md font-medium">Phone</Label>
          <Input
            name="phone"
            type="text"
            placeholder="Enter Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <Label className="font-dm-sans text-md font-medium">Password</Label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="max-w-md px-4 py-2 border border-[#D0D5DD] rounded-[2px] font-dm-sans font-normal focus:ring-none pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center w-full md:col-span-2 mt-2">
          <Button
            onClick={handleAddOrUpdate}
    
            className="h-10 bg-[#FF5635] text-white px-10 font-normal font-poppins cursor-pointer w-fit rounded-[4px]"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
