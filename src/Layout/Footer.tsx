export const Footer=()=>{
    return(
           <footer className="w-full bg-transparent py-4 text-xs text-gray-500 z-20">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
            A product of <a href="https://brilliovate.in" className="text-red-500">Brilliovate Pvt. Ltd.</a> All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Refund Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    )
}