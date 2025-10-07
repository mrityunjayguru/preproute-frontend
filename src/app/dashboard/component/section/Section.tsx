import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  section: Yup.string().required("section name is required"),
});

function Section() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data:any) => {
    console.log(data);
    alert("Form submitted successfully ✅");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">section Name</label>
        <input
          type="text"
          placeholder="Enter your section name"
          {...register("section")}
          className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-[#585859] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.section && (
          <p className="text-red-500 text-sm">{errors.section.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Submit
      </button>
    </form>
  );
}

export default Section;
