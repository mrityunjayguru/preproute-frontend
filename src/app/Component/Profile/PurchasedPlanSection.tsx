import React from "react";

interface Exam {
  _id: string;
  examname: string;
  fullExamduration: number;
  sections?: any[];
}

interface PlanDetails {
  title: string;
  price: number;
}

interface PurchaseDetail {
  updatedAt: string;
}

interface UserData {
  PlanDetails?: PlanDetails;
  PurchaseDetail?: PurchaseDetail;
  PurchasedExams?: Exam[];
}

interface Props {
  user: UserData | null;
}

export default function PurchasedPlanSection({ user }: Props) {
  console.log(user,"useruseruseruseruser")
  return (
    <>
      {/* 📘 Purchased Plan Details */}
      {user?.PlanDetails && (
        <div className="mt-10 p-5 bg-white rounded-2xl border border-orange-200 shadow-sm">
          <h2 className="text-xl font-semibold text-[#FF5635] mb-3">
             Purchased Plan
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Plan Title:</strong> {user.PlanDetails?.title}
            </p>

            <p>
              <strong>Price:</strong> ₹{user.PlanDetails?.price}
            </p>

            <p>
              <strong>Purchased On:</strong>{" "}
              {user?.PurchaseDetail?.updatedAt
                ? new Date(user.PurchaseDetail.updatedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* 📚 Purchased Exams List */}
          <div className="mt-5">
            <h3 className="text-lg font-semibold text-[#FF5635] mb-2">
              <strong>Validity</strong> <span>Till Exam</span>
            </h3>

            {/* {user?.PurchasedExams?.length ? (
              <ul className="space-y-3">
                {user.PurchasedExams.map((exam: Exam) => (
                  <li
                    key={exam._id}
                    className="p-4 bg-orange-50 rounded-xl border border-orange-100"
                  >
                    <p className="text-lg font-medium text-gray-800">
                      {exam.examname}
                    </p>

                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No exams purchased yet.</p>
            )} */}
          </div>
        </div>
      )}
    </>
  );
}
