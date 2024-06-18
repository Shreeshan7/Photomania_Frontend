// import React from "react";
// import { RxAvatar } from "react-icons/rx";

// import Modal from "./Modal";

// interface Post {
//   id: number;
//   imageUrl: string;
//   caption: string;
// }

// interface SinglePostModalProps {
//   postdetails: Post | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const SinglePostModal: React.FC<SinglePostModalProps> = ({ postdetails, isOpen, onClose }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Post Details">
//       <div className="flex flex-col items-center">
//         <img
//           src={`http://localhost:8000/${postdetails?.imageUrl.replace("public\\uploads\\", "uploads/")}`}
//           alt="Post Image"
//           className="h-[300px] w-full rounded-lg"
//         />
//         <div className="flex border-2 gap-10 rounded-lg mt-2 p-2 pb-4">
//           <div className="text-4xl pl-4 pt-2">
//             <RxAvatar />
//           </div>
//           {postdetails?.caption}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default SinglePostModal;
