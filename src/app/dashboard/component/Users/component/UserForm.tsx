"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  createUser,
  getUsers,
  handleSetUpdateUser,
  handleUpdateUserData,
} from "@/api/Users";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";

interface IUserForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<IUserForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const updateUser:any = useSelector((state:any)=>state?.user?.updateuser); // Replace with: useSelector((state: any) => state.user.updateUser)
console.log(updateUser,"updateUserupdateUser")
  // Fetch users initially
  const fetchUsers = async () => {
    const payload:any={}
    await dispatch(getUsers(payload));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Populate form when editing a user
  useEffect(() => {
    if (updateUser && updateUser._id) {
      setFormData({
        name: updateUser.username || "",
        email: updateUser.email || "",
        phone: updateUser.phone || "",
        password: "", // keep empty for security
      });
      setEditingId(updateUser._id);
    }
  }, [updateUser?._id]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleAddOrUpdate = async () => {
    const { name, email, phone, password } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      (!editingId && !password.trim())
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const payload: any = { username:name, email, phone };
    if (!editingId) payload.password = password;

    try {
      if (editingId) {
        const payload2:any={ id: editingId, ...payload }
        await dispatch(handleSetUpdateUser(payload2));
      } else {
        await dispatch(createUser(payload));
      }
      const data:any=null
      dispatch(handleUpdateUserData(data));
      await fetchUsers();

      // Reset form
      setFormData({ name: "", email: "", phone: "", password: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="  p-6 rounded-lg mb-6 ">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "Update User" : "Create User"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Name */}
        <div>
          <Label className="mb-2 block">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <Label className="mb-2 block">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div>
          <Label className="mb-2 block">Phone</Label>
          <Input
            name="phone"
            type="text"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Password (only for create) */}
        {!editingId && (
          <div className="relative">
            <Label className="mb-2 block">Password</Label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        )}

        {/* Submit */}
        <div className="flex items-end w-full md:col-span-2">
          <Button
            onClick={handleAddOrUpdate}
            variant="orange"
            className="w-full h-10"
          >
            {editingId ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
