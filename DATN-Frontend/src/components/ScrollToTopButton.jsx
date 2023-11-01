import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Kiểm tra và cập nhật trạng thái của nút khi scroll
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.pageYOffset > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  // Xử lý sự kiện click để cuộn lên đầu trang
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && (
        <CustomButton
          IconButton={MdOutlineKeyboardArrowUp}
          func={handleScrollToTop}
          color="white"
          size={30}
          style={{
            width: 35,
            height: 35,
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: 8,
            filter: "blur(0.5px)",
            border: "1px solid #dee2e6",
            textAlign: "center",
          }}
          id="scroll"
        />
      )}
    </>
  );
};

export default ScrollToTopButton;
