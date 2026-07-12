import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  if (!userData) return <div className="text-white p-10">Loading profile...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white p-6">
      <div className="bg-[#111] p-8 rounded-3xl border border-white/10 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="space-y-4">
          <p><span className="text-gray-400">Name:</span> {userData.firstName} {userData.lastName}</p>
          <p><span className="text-gray-400">Email:</span> {userData.email}</p>
          <p><span className="text-gray-400">Profession:</span> {userData.profession}</p>
        </div>
      </div>
    </div>
  );
}