import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { useRouter } from "next/router";

const iconSteps = [
  {
    path: "ETAPA 1",
    icon: RiNumber1,
  },
  {
    path: "ETAPA 2",
    icon: RiNumber2,
  },
  {
    path: "ETAPA 3",
    icon: RiNumber3,
  },
  {
    path: "ETAPA 4",
    icon: RiNumber4,
  },
];

function CheckoutWizard({ activeStep = 0 }) {

  const router = useRouter();

  return (
    <div className="my-2 grid grid-cols-4 gap-x-5">
      {iconSteps.map((step, index) => (
        <div
          key={step.path}
          className={`flex-1 border-b-[1px] w-full col-span-1 flex justify-center text-xl 
                        ${index <= activeStep
              ? "border-green-600 text-blue-600"
              : "border-red-400 text-red-400"
            }
         `}
        >
          <h4
            onClick={() => router.push(`/${step.path}`)}
            className="cursor-pointer bg-white w-fit rounded-full p-3 flex flex-col items-center"
          >
                      <i>
              {index == activeStep ? (
                <AiOutlineLoading className="rotate" />
              ) : (
                <step.icon />
              )}
            </i>
          </h4>
        </div>
      ))}
    </div>
  );
}

export default CheckoutWizard;
