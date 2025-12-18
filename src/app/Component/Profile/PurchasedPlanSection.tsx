import React from "react";
interface Exam {
  _id: string;
  examname: string;
  fullExamduration: number;
}

interface Plan {
  title: string;
  price: string;
}

interface PurchaseDetail {
  orderId: string;
  amount: number;
  updatedAt: string;
  plan: Plan;
  exams: Exam[];
}

interface UserData {
  purchaseDetails?: PurchaseDetail[];
}

interface Props {
  user: UserData | null;
}

export default function PurchasedPlanSection({ user }: Props) {
  if (!user?.purchaseDetails?.length) return null;

  return (
    <>
      {user.purchaseDetails.map((purchase, index) => (
        <div
          key={purchase.orderId}
          className="mt-10 p-5 bg-white rounded-2xl border border-orange-200 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-[#FF5635] mb-3">
            Purchased Plan #{index + 1}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Plan Title:</strong> {purchase.plan?.title}
            </p>

            <p>
              <strong>Price:</strong> ₹{purchase.plan?.price}
            </p>

            <p>
              <strong>Purchased On:</strong>{" "}
              {new Date(purchase.updatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* 📚 Purchased Exams */}
          {purchase.exams?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-[#FF5635] mb-2">
                Valid Up To Exam Day
              </h3>

              {/* <ul className="space-y-3">
                {purchase.exams.map((exam) => (
                  <li
                    key={exam._id}
                    className="p-4 bg-orange-50 rounded-xl border border-orange-100"
                  >
                    <p className="text-lg font-medium text-gray-800">
                      {exam.examname}
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration: {exam.fullExamduration} mins
                    </p>
                  </li>
                ))}
              </ul> */}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
