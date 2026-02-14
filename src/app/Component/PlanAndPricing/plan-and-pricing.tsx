import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import IMPT from "./_components/impt/IMPT";
import CUPT from "./_components/cupt/CUPT";

function Plan() {
  return (
    <section className="min-h-screen w-full  bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28">
        <div className="py-8 sm:py-12 md:py-16 text-center w-full">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-poppins text-[#FF5635] px-2">
              Plans and Pricing
            </h2>
            <p className="text-[#333333] text-xs my-3 sm:text-sm md:text-base max-w-2xl mx-auto text-dm-sans sm:mt-3 px-4">
              Practice mock exams from multiple colleges and prepare with
              confidence.
            </p>
            <div className="flex justify-center items-center mt-3 mb-10 w-full">
              <Tabs
                defaultValue="ipmat"
                className="w-full flex flex-col items-center"
              >
                <TabsList className="flex w-full justify-center items-center rounded-full  px-1 py-1 max-w-[400px] h-auto">
                  <TabsTrigger
                    value="ipmat"
                    className="
        w-1/2 rounded-full text-lg font-medium text-[#585859] px-4 py-3
        data-[state=active]:bg-[#FF5635]
        data-[state=active]:text-white
        cursor-pointer
        transition-all
      "
                  >
                    IPMAT
                  </TabsTrigger>

                  <TabsTrigger
                    value="cuet"
                    className="
        w-1/2 rounded-full text-lg font-medium text-[#585859] px-4 py-3
        data-[state=active]:bg-[#FF5635]
        data-[state=active]:text-white
        cursor-pointer
        transition-all
      "
                  >
                    CUET
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ipmat" className="mt-4 w-full">
                  <IMPT />
                </TabsContent>

                <TabsContent value="cuet" className="mt-4 w-full">
                  <CUPT />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Plan;
