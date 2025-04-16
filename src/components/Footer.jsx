const Footer = () => {
  return (
    <div className="bg-green-200 dark:bg-green-950 text-center text-sm py-4 mt-10 border-t border-green-400 dark:border-green-800">
      <p className="mb-2 text-green-700 dark:text-green-200">
        Developed by <span className="font-bold text-green-600 dark:text-green-300">QUANTUM CODERS</span> — For <span className="font-bold text-green-600 dark:text-green-300">HackXelerate 2025</span> 🌿
      </p>
      <p className="text-xs text-green-600 dark:text-green-400">
        &copy; {new Date().getFullYear()} QUANTUM CODERS. All Rights Reserved.
      </p>
      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
        Team Members: 
        <span className="font-semibold text-green-700 dark:text-green-300"> Naveen G R, Raguram A G, Kishanth P, Santhosh P, Poovarasan S</span>
      </p>
    </div>
  );
};

export default Footer;
