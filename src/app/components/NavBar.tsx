// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaHome, FaDumbbell, FaArrowDown, FaRunning } from "react-icons/fa";

// export default function NavBar() {
//   const [value, setValue] = useState(0);
//   const router = useRouter();

// //   value: 現在選択されているナビゲーションのインデックス（0=/push, 1=/pull, 2=/leg）
//   const handleClick = (index: number) => {
//     setValue(index);
//     switch (index) {
//       case 0:
//         router.push("/");
//         break;
//       case 1:
//         router.push("/push");
//         break;
//       case 2:
//         router.push("/pull");
//         break;
//       case 3:
//         router.push("/leg");
//         break;
//       default:
//         break;
//     }
//   };

//   const navItems = [
//     { label: "Home", icon: <FaHome className="w-5 h-5" /> },
//     { label: "Push", icon: <FaDumbbell className="w-5 h-5" /> },
//     { label: "Pull", icon: <FaArrowDown className="w-5 h-5" /> },
//     { label: "Leg", icon: <FaRunning className="w-5 h-5" /> },
//   ];

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white">
//       <ul className="flex justify-around items-center py-2">
//         {navItems.map((item, index) => (
//           <li
//             key={item.label}
//             onClick={() => handleClick(index)}
//             className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
//               value === index ? "text-blue-600" : "text-gray-500"
//             }`}
//           >
//             {item.icon}
//             <span className="text-xs mt-1">{item.label}</span>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

"use client";

import { useRouter, usePathname } from "next/navigation";
import { FaHome, FaDumbbell, FaArrowDown, FaRunning } from "react-icons/fa";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 現在のパスを取得

  const navItems = [
    { label: "Home", path: "/", icon: <FaHome className="w-5 h-5" /> },
    { label: "Push", path: "/push", icon: <FaDumbbell className="w-5 h-5" /> },
    { label: "Pull", path: "/pull", icon: <FaArrowDown className="w-5 h-5" /> },
    { label: "Leg", path: "/leg", icon: <FaRunning className="w-5 h-5" /> },
  ];

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white">
      <ul className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <li
            key={item.label}
            onClick={() => handleClick(item.path)}
            className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
              pathname === item.path ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
