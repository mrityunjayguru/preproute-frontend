import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const router = useRouter()
  const handleChangeRoute=(page:any)=>{
  router.push(`${page}`)
}
return (
    <nav className="bg-[#fff] fixed top-0 left-0 w-full z-50  h-16 flex items-center justify-between px-6 shadow-md">
      {/* Logo */}
      <span className="text-xl font-bold">
        the<span className="textorange">prep</span>route
      </span>

      {/* Navigation Links */}
      <div className="flex gap-x-8 text-sm text-[#000000]">
        <a  onClick={()=>handleChangeRoute('home')} className="cursor-pointer">
          Dashboard
        </a>
          <a  onClick={()=>handleChangeRoute('setupexam')} className="hover:textorange cursor-pointer">
          Setup Exam
        </a>
        <a  onClick={()=>handleChangeRoute('exam')} className="hover:textorange cursor-pointer">
          Create Exam
        </a>
        <a  className="hover:textorange cursor-pointer" >
          Create Account
        </a>
        <a  className="hover:textorange cursor-pointer">
          Analytics
        </a>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-x-2 text-[#000000]">
        <span className="text-sm">Operator One</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/path/to/your/image.png" alt="Operator One" />
              <AvatarFallback>OP</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}